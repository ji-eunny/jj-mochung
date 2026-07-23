"use client";

import { useEffect, useState } from "react";

/**
 * 모바일 청첩장 기본 프레임
 * - 440×950 고정 캔버스를 화면 크기에 맞춰 균일하게 scale
 * - 어떤 기기(아이폰 Pro / Pro Max)·PC에서도 배경과 텍스트의
 *   상대 위치·간격이 항상 동일하게 유지됨 (letterbox 방식)
 */

/** 디자인 기준 캔버스 크기 (이 비율/간격이 모든 화면에서 그대로 유지됨) */
const BASE_W = 440;
const BASE_H = 950;

export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      // 모바일 주소창 대응: visualViewport 우선
      const vh = window.visualViewport?.height ?? window.innerHeight;
      // 가로/세로 모두 들어오도록 fit, 디자인 크기(1)를 넘겨 확대하지 않음
      setScale(Math.min(vw / BASE_W, vh / BASE_H, 1));
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
    /* 화면 전체를 채우는 배경 + 캔버스 중앙 정렬 */
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-neutral-300">
      {/* 고정 크기 캔버스: layout 은 440×950, 화면에 맞춰 통째로 scale */}
      <div
        className="flex-shrink-0"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* 내부 스냅 스크롤 컨테이너 */}
        <div
          className="
            relative h-full w-full overflow-y-scroll
            snap-y snap-mandatory
            rounded-2xl shadow-2xl
            scrollbar-hide
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
