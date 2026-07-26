"use client";

import { assetPath } from "@/lib/asset";

interface SectionProps {
  /** public 기준 배경 이미지 경로 (예: "/images/back1.jpg") */
  bgImage?: string;
  /** @deprecated 모든 배경을 첫 진입 시 미리 로드하므로 무시됨 */
  priority?: boolean;
  /** 섹션 하단 구분선 (기본: 표시, 마지막 섹션만 false) */
  showDivider?: boolean;
  bgClassName?: string;
  children?: React.ReactNode;
}

function SectionBackground({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={assetPath(src)}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}

export default function Section({
  bgImage,
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
      {bgImage && <SectionBackground src={bgImage} />}

      <div className="relative z-10 h-full w-full">{children}</div>

      {/* 배경 위에 얹는 구분선 — 섹션 바닥 경계에 맞춤 */}
      {showDivider && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex translate-y-[3px] justify-center leading-none"
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
