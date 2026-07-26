"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset";

interface SectionProps {
  /** public 기준 배경 이미지 경로 (예: "/images/back1.jpg") */
  bgImage?: string;
  /** 첫 화면 등 즉시 로드가 필요할 때 */
  priority?: boolean;
  /** 섹션 하단 구분선 (기본: 표시, 마지막 섹션만 false) */
  showDivider?: boolean;
  bgClassName?: string;
  children?: React.ReactNode;
}

/** 뷰포트 근처일 때만 배경 이미지 로드 */
function LazyBackground({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority || shouldLoad) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority, shouldLoad]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {shouldLoad && (
        <img
          src={assetPath(src)}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
          // 첫 섹션만 즉시, 나머지는 브라우저 lazy
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}

export default function Section({
  bgImage,
  priority = false,
  showDivider = true,
  bgClassName = "bg-wedding-cream",
  children,
}: SectionProps) {
  return (
    <div
      className={`
        relative flex-shrink-0
        w-full
        h-[var(--frame-h,950px)]
        min-h-[var(--frame-h,950px)]
        overflow-hidden
        ${bgClassName}
      `}
    >
      {bgImage && <LazyBackground src={bgImage} priority={priority} />}

      <div className="relative z-10 h-full w-full">{children}</div>

      {/* 배경 위에 얹는 구분선 — 섹션 맨 아래 끝선 */}
      {showDivider && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center leading-none"
          aria-hidden
        >
          <img
            src={assetPath("/images/black_crayon_divider.svg")}
            alt=""
            className="block w-[72%] select-none"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
