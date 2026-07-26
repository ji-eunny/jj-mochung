"use client";

import { useEffect, useState } from "react";

/**
 * 모바일 청첩장 프레임
 * - 디자인 캔버스: 440×950 고정
 * - contain scale 로 한 섹션이 화면에 딱 맞게 (잘림/과확대 없음)
 * - 폰: 가로 여백 최소화, 큰 화면: 양쪽 여백 + 카드 느낌
 * - 카톡 인앱: visualViewport 반영
 */

const BASE_W = 440;
const BASE_H = 950;

export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);
  const [offsetTop, setOffsetTop] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [isPhone, setIsPhone] = useState(true);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vv = window.visualViewport;
      const vh = Math.round(vv?.height ?? window.innerHeight);
      const top = Math.round(vv?.offsetTop ?? 0);

      // 440×950 전체가 보이도록 contain (가로·세로 중 더 작은 비율)
      const fit = Math.min(vw / BASE_W, vh / BASE_H);
      const phone = vw <= BASE_W;

      setIsPhone(phone);
      setScale(phone ? fit : Math.min(fit, 1));
      setOffsetTop(top);
      setViewportH(vh);
    };

    compute();
    window.addEventListener("resize", compute);
    window.visualViewport?.addEventListener("resize", compute);
    window.visualViewport?.addEventListener("scroll", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.visualViewport?.removeEventListener("resize", compute);
      window.visualViewport?.removeEventListener("scroll", compute);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 flex items-center justify-center overflow-hidden ${
        isPhone ? "bg-wedding-cream" : "bg-neutral-300"
      }`}
      style={{
        top: offsetTop,
        height: viewportH > 0 ? viewportH : "100dvh",
      }}
    >
      <div
        className="relative flex-shrink-0"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          data-scroll-root
          className={`
            relative h-full w-full overflow-y-auto overflow-x-hidden
            overscroll-y-contain scrollbar-hide
            ${isPhone ? "" : "rounded-2xl shadow-2xl"}
          `}
          style={{
            ["--frame-h" as string]: `${BASE_H}px`,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
