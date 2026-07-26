/** 사이트·공유 미리보기 설정 (카톡/SNS Open Graph) */
export const SITE = {
  /** 사이트 주소 (og:url, 절대 경로 이미지용) */
  url: "https://jaehoon-jieun.love",
  /** 브라우저 탭·공유 제목 */
  title: "장재훈 ♥ 김지은 결혼합니다",
  /** 공유 시 보이는 설명 문구 */
  description: "2027년 2월 13일 오전 10시 50분 · 까사그랑데",
  /**
   * 공유 미리보기 이미지 (public 기준 경로)
   * - 권장: 가로형 JPG/PNG, 최소 200×200 (카톡은 800×400 이상 권장)
   */
  ogImage: "/images/01.jpg",
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
