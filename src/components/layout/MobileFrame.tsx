"use client";

import { useEffect, useState } from "react";

/**
 * 모바일 청첩장 기본 프레임
 * - 440×950 고정 캔버스를 화면 크기에 맞춰 균일하게 scale (contain)
 * - 스냅 스크롤 없이 일반 세로 스크롤
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

      // 전체가 잘리지 않도록 fit (확대되어 잘리는 cover 방식 사용 안 함)
      const fit = Math.min(vw / BASE_W, vh / BASE_H);
      setScale(mobile ? fit : Math.min(fit, 1));
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
            relative h-full w-full overflow-y-auto
            scrollbar-hide
            ${isMobile ? "" : "rounded-2xl shadow-2xl"}
          `}
          data-scroll-root
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
