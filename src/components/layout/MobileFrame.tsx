"use client";

/**
 * 모바일 청첩장 기본 프레임
 * - 모바일: 화면 꽉 참, 섹션마다 스냅 스크롤
 * - 패드/PC: max 440×950 센터 정렬, 내부 스크롤
 */
export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* PC/패드 배경 */
    <div className="flex min-h-screen w-full items-start justify-center bg-neutral-300 md:items-center md:py-8">
      {/*
       * 스크롤 컨테이너
       * - 모바일: 뷰포트 전체, 스냅 스크롤
       * - PC/패드: 440×950 고정 박스, 내부 스냅 스크롤
       */}
      <div
        className="
          relative w-full overflow-y-scroll
          snap-y snap-mandatory
          /* 모바일 */
          h-screen
          /* PC/패드 */
          md:h-[950px] md:max-w-[440px] md:rounded-2xl md:shadow-2xl
          /* 스크롤바 숨김 */
          scrollbar-hide
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
