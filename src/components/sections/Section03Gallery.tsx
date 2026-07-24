"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import FadeInUp from "../ui/FadeInUp";

/**
 * film_frame_single.svg viewBox: 0 0 1200 1200
 * - 필름 몸체: x=62 y=62 w=1076 h=1076 rx=18
 * - 사진 영역: x=78 y=114 w=1044 h=972 rx=18
 */
const VB = 1200;
const FRAME_W = 340;
const FRAME_H = 340; // 정사각 SVG

const SIDE_PAD = (62 / VB) * FRAME_W;
const CORNER_R = (18 / VB) * FRAME_W;
const OVERLAP = SIDE_PAD * 2 + CORNER_R;
const FRAME_STEP = FRAME_W - OVERLAP;

const IMG_LEFT = (78 / VB) * FRAME_W;
const IMG_TOP = (114 / VB) * FRAME_H;
const IMG_W = (1044 / VB) * FRAME_W;
const IMG_H = (972 / VB) * FRAME_H;
const IMG_RADIUS = (18 / VB) * FRAME_H;

const IMAGES = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
];

/** 필름 한 칸 + 사진 */
function FilmFrame({ imgSrc }: { imgSrc: string }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: FRAME_W,
        height: FRAME_H,
        marginRight: -OVERLAP,
        filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.32)) drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
      }}
    >
      {/* 사진 (투명 영역) */}
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
          src={imgSrc}
          alt="gallery"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* 필름 프레임 */}
      <img
        src="/images/film_frame_final.svg"
        alt="film"
        style={{
          position: "relative",
          width: FRAME_W,
          height: FRAME_H,
          display: "block",
          objectFit: "fill",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/** 왼쪽으로 무한 스크롤 */
function FilmStrip() {
  const frames = [...IMAGES, ...IMAGES];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={{ x: [0, -(FRAME_STEP * IMAGES.length)] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {frames.map((src, i) => (
          <FilmFrame key={`${src}-${i}`} imgSrc={src} />
        ))}
      </motion.div>
    </div>
  );
}

/** 섹션 3: 갤러리 */
export default function Section03Gallery() {
  return (
    <Section pdfUrl="/pdf/back2.pdf">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-14 font-bold">갤러리</div>
      </FadeInUp>
      <div className="w-full mt-60">
        <FilmStrip />
      </div>
    </Section>
  );
}
