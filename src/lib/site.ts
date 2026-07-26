/** 사이트·공유 미리보기 설정 (카톡/SNS Open Graph) */
export const SITE = {
  /** 사이트 주소 (og:url, 절대 경로 이미지용) */
  url: "https://jaehoon-jieun.love",
  /** 브라우저 탭·공유 제목 */
  title: "장재훈 ♥ 김지은 결혼합니다",
  /** 공유 시 보이는 설명 문구 */
  description: "2027. 02. 13 AM 10:50 · 까사그랑데",
  /**
   * 공유 미리보기 이미지 (public 기준 경로)
   * - 01.jpg 상단 위주로 자른 카톡용 가로형 (1200×630)
   */
  ogImage: "/images/og.jpg",
} as const;

/** 섹션 배경 — 첫 진입 시 전부 미리 로드 */
export const SECTION_BACKGROUNDS = [
  "/images/back1.jpg",
  "/images/back2.jpg",
  "/images/back3.jpg",
  "/images/back4.jpg",
  "/images/back5.jpg",
  "/images/back6.jpg",
  "/images/back7.jpg",
  "/images/back8.jpg",
] as const;
