"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { assetPath } from "@/lib/asset";

interface GalleryLightboxProps {
  images: string[];
  index: number;
  direction: number;
  onClose: () => void;
  onChange: (nextIndex: number, direction: number) => void;
}

const THUMB_W = 72;
const THUMB_GAP = 8;

export default function GalleryLightbox({
  images,
  index,
  direction,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const didCenterOnOpen = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트/인덱스 변경 시 선택 썸네일을 가운데로
  useEffect(() => {
    if (!mounted) return;

    const centerThumb = (smooth: boolean) => {
      const strip = thumbStripRef.current;
      const thumb = thumbRefs.current[index];
      if (!strip || !thumb) return;

      const stripRect = strip.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const delta =
        thumbRect.left +
        thumbRect.width / 2 -
        (stripRect.left + stripRect.width / 2);

      strip.scrollTo({
        left: strip.scrollLeft + delta,
        behavior: smooth ? "smooth" : "auto",
      });
    };

    // 팝업 직후: 레이아웃 안정화 뒤 즉시 중앙 정렬
    // 이후 화살표/썸네일 이동: 스무스 스크롤
    const smooth = didCenterOnOpen.current;
    const id = requestAnimationFrame(() => {
      centerThumb(smooth);
      didCenterOnOpen.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, [mounted, index]);

  // 배경 스크롤 잠금 + ESC / 키보드 화살표
  useEffect(() => {
    const scrollEl = document.querySelector(
      ".overflow-y-scroll"
    ) as HTMLElement | null;
    const prevOverflow = scrollEl?.style.overflowY;
    if (scrollEl) scrollEl.style.overflowY = "hidden";

    const prevBody = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const prev = (index - 1 + images.length) % images.length;
        onChange(prev, -1);
      }
      if (e.key === "ArrowRight") {
        const next = (index + 1) % images.length;
        onChange(next, 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (scrollEl) scrollEl.style.overflowY = prevOverflow ?? "";
      document.body.style.overflow = prevBody;
    };
  }, [index, images.length, onChange, onClose]);

  const goPrev = () => {
    onChange((index - 1 + images.length) % images.length, -1);
  };

  const goNext = () => {
    onChange((index + 1) % images.length, 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overscroll-none bg-neutral-600/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* 팝업 래퍼 — overflow visible 로 테이프가 잘리지 않음 */}
      <div
        className="relative z-10 w-[min(88vw,380px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 테이프 */}
        <img
          src={assetPath("/images/tape.png")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-30 w-24 -translate-x-1/2 -translate-y-[30%] rotate-[-4deg]"
        />

        {/* 카드 본체 */}
        <div className="relative mt-4 flex flex-col overflow-hidden rounded-sm bg-[#f7f4ef] shadow-2xl">
          {/* 메인 이미지 */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`gallery ${index + 1}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* X — 사진 맨 위 오른쪽 */}
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white"
            >
              <X size={16} strokeWidth={2} />
            </button>

            {/* 좌우 화살표 */}
            <button
              type="button"
              aria-label="이전 사진"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-1 text-black/80"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="다음 사진"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-1 text-black/80"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* 썸네일 스트립 */}
          <div
            ref={thumbStripRef}
            className="flex items-center overflow-x-auto py-3 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
              paddingLeft: `calc(50% - ${THUMB_W / 2}px)`,
              paddingRight: `calc(50% - ${THUMB_W / 2}px)`,
              gap: THUMB_GAP,
            }}
          >
            {images.map((src, i) => {
              const isActive = i === index;
              return (
                <button
                  key={src}
                  type="button"
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  onClick={() => onChange(i, i > index ? 1 : -1)}
                  className="relative flex-shrink-0 overflow-hidden transition-opacity"
                  style={{
                    width: THUMB_W,
                    height: THUMB_W * 1.15,
                    scrollSnapAlign: "center",
                    opacity: isActive ? 1 : 0.55,
                    outline: isActive ? "1.5px solid rgba(0,0,0,0.35)" : "none",
                    outlineOffset: 1,
                  }}
                >
                <img
                  src={src}
                  alt={`thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
