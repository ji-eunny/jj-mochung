"use client";

import { useEffect, useState } from "react";

/**
 * 모바일 청첩장 프레임
 * - iPhone 17 Pro(~402) · Pro Max(~440)까지: 화면 가로·세로 꽉 채움
 * - 그보다 큰 화면: 최대 440px 폭 + 양쪽 여백
 * - 한 섹션 = 한 화면 높이
 * - 카톡 인앱 브라우저: visualViewport 높이·offset 반영
 */

/** 이 너비까지는 좌우 여백 없이 풀블리드 (iPhone 17 Pro Max CSS width) */
const PHONE_MAX_W = 440;

export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const [frameH, setFrameH] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [isPhone, setIsPhone] = useState(true);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vv = window.visualViewport;
      const vh = Math.round(vv?.height ?? window.innerHeight);
      const top = Math.round(vv?.offsetTop ?? 0);
      setIsPhone(vw <= PHONE_MAX_W);
      setFrameH(vh);
      setOffsetTop(top);
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

  const height = frameH > 0 ? frameH : undefined;

  return (
    <div
      className={`fixed inset-x-0 flex justify-center overflow-hidden ${
        isPhone ? "bg-wedding-cream" : "bg-neutral-300"
      }`}
      style={{
        top: offsetTop,
        height: height ?? "100dvh",
      }}
    >
      <div
        data-scroll-root
        className={`
          relative h-full w-full overflow-y-auto overflow-x-hidden
          overscroll-y-contain scrollbar-hide
          ${isPhone ? "" : "max-w-[440px] shadow-2xl"}
        `}
        style={{
          ["--frame-h" as string]: height ? `${height}px` : "100dvh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
}
