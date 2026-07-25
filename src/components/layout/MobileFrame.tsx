"use client";

import { useEffect, useState } from "react";

/**
 * 모바일 청첩장 기본 프레임
 * - 440×950 고정 캔버스를 화면 크기에 맞춰 균일하게 scale
 * - 모바일: cover (화면 꽉 채움, 양옆 회색 레터박스 제거)
 * - PC: contain + max 1 (디자인 크기 유지, 가운데 정렬)
 */

const BASE_W = 440;
const BASE_H = 950;

export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);

      const widthScale = vw / BASE_W;
      const heightScale = vh / BASE_H;

      if (mobile) {
        // 화면을 꽉 채움 (양옆/위아래 빈 여백 최소화)
        setScale(Math.max(widthScale, heightScale));
      } else {
        // PC: 전체가 보이도록 fit, 원본보다 크게는 안 키움
        setScale(Math.min(widthScale, heightScale, 1));
      }
    };

    compute();
    window.addEventListener("resize", compute);
    window.visualViewport?.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.visualViewport?.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-hidden ${
        isMobile ? "bg-wedding-cream" : "bg-neutral-300"
      }`}
    >
      <div
        className="flex-shrink-0"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          className={`
            relative h-full w-full overflow-y-scroll
            snap-y snap-mandatory
            scrollbar-hide
            ${isMobile ? "" : "rounded-2xl shadow-2xl"}
          `}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
