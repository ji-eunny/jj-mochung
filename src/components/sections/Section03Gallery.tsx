"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import Section from "@/components/layout/Section";
import FadeInUp from "../ui/FadeInUp";
import GalleryLightbox from "../ui/GalleryLightbox";
import { assetPath } from "@/lib/asset";
import { GALLERY_ITEMS, galleryPosition, type GalleryItem } from "@/lib/gallery";

/**
 * film_frame_single.svg viewBox: 0 0 1200 1200
 * - 필름 몸체: x=62 y=62 w=1076 h=1076 rx=18
 * - 사진 영역: x=78 y=114 w=1044 h=972 rx=18
 */
const VB = 1200;
const FRAME_W = 480;
const FRAME_H = 480;

const SIDE_PAD = (62 / VB) * FRAME_W;
const CORNER_R = (18 / VB) * FRAME_W;
const OVERLAP = SIDE_PAD * 2 + CORNER_R;
const FRAME_STEP = FRAME_W - OVERLAP;

const IMG_LEFT = (78 / VB) * FRAME_W;
const IMG_TOP = (114 / VB) * FRAME_H;
const IMG_W = (1044 / VB) * FRAME_W;
const IMG_H = (972 / VB) * FRAME_H;
const IMG_RADIUS = (18 / VB) * FRAME_H;

/** 한 세트 길이 (무한 루프 단위) */
const LOOP_W = FRAME_STEP * GALLERY_ITEMS.length;
/** 자동 스크롤: LOOP_W 를 140초에 한 바퀴 */
const AUTO_SPEED = LOOP_W / 140000; // px / ms
/** 탭 복귀 등으로 delta가 커져도 한 프레임 점프 방지 */
const MAX_DELTA = 32;

const FRAME_SVG = assetPath("/images/film_frame_final.svg");

/** 필름 한 칸 + 사진 */
function FilmFrame({
  item,
  onClick,
  eager,
}: {
  item: GalleryItem;
  onClick: () => void;
  eager?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex-shrink-0 cursor-grab border-0 bg-transparent p-0 text-left active:cursor-grabbing"
      style={{
        width: FRAME_W,
        height: FRAME_H,
        marginRight: -OVERLAP,
        contain: "layout paint style",
      }}
      aria-label="사진 크게 보기"
    >
      <div
        style={{
          position: "absolute",
          left: IMG_LEFT,
          top: IMG_TOP,
          width: IMG_W,
          height: IMG_H,
          borderRadius: IMG_RADIUS,
          overflow: "hidden",
        }}
      >
        <img
          src={item.src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: galleryPosition(item),
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>

      <img
        src={FRAME_SVG}
        alt=""
        aria-hidden
        draggable={false}
        style={{
          position: "relative",
          width: FRAME_W,
          height: FRAME_H,
          display: "block",
          objectFit: "fill",
          pointerEvents: "none",
        }}
      />
    </button>
  );
}

/** 자동 스크롤 + 손으로 드래그 (GPU 합성 최적화) */
function FilmStrip({ onSelect }: { onSelect: (index: number) => void }) {
  // 3세트 → 양방향 드래그해도 끊김 없음 (가운데 세트에서 시작)
  const frames = [...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS];
  const x = useMotionValue(-LOOP_W);
  const dragging = useRef(false);
  const moved = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  // 화면에 보일 때만 애니 → 백그라운드 탭/다른 섹션에서 프레임 낭비·스파이크 감소
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { root: null, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wrapX = (v: number) => {
    let next = v;
    while (next <= -2 * LOOP_W) next += LOOP_W;
    while (next > 0) next -= LOOP_W;
    return next;
  };

  useAnimationFrame((_, delta) => {
    if (!isActive || dragging.current) return;
    const d = Math.min(delta, MAX_DELTA);
    x.set(wrapX(x.get() - AUTO_SPEED * d));
  });

  return (
    <div
      ref={rootRef}
      className="w-full overflow-hidden"
      style={{
        touchAction: "pan-x",
        // 스크롤 영역 자체도 레이어로 승격
        transform: "translateZ(0)",
      }}
    >
      <motion.div
        className="flex w-max cursor-grab active:cursor-grabbing"
        style={{
          x,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          dragging.current = true;
          moved.current = false;
        }}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 6) moved.current = true;
        }}
        onDragEnd={() => {
          x.set(wrapX(x.get()));
          window.setTimeout(() => {
            dragging.current = false;
            moved.current = false;
          }, 0);
        }}
      >
        {frames.map((item, i) => (
          <FilmFrame
            key={`${item.src}-${i}`}
            item={item}
            // 첫 세트 + 양옆 일부는 즉시 로드 (스크롤 중 lazy 로딩 버벅임 방지)
            eager={i < GALLERY_ITEMS.length + 4}
            onClick={() => {
              if (moved.current) return;
              onSelect(i % GALLERY_ITEMS.length);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** 섹션 3: 갤러리 */
export default function Section03Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const openAt = (index: number) => {
    setDirection(0);
    setOpenIndex(index);
  };

  const changeIndex = (nextIndex: number, dir: number) => {
    setDirection(dir);
    setOpenIndex(nextIndex);
  };

  return (
    <Section bgImage="/images/back3.jpg">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-24 font-bold">사진첩</div>
      </FadeInUp>
      <div className="w-full mt-24 relative">
        <FilmStrip onSelect={openAt} />
        <p className="text-right mr-5">사진을 클릭하거나, 드래그 해 보세요.</p>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <GalleryLightbox
            images={GALLERY_ITEMS}
            index={openIndex}
            direction={direction}
            onClose={() => setOpenIndex(null)}
            onChange={changeIndex}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
