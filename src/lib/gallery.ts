import { assetPath } from "@/lib/asset";

/**
 * 갤러리 사진 설정
 *
 * `position` 으로 필름/팝업에 보이는 영역을 정합니다. (CSS object-position)
 * - "center top"     위쪽 위주 (기본) — 위는 보이고 아래가 잘림
 * - "center center" 가운데
 * - "center bottom"  아래쪽 위주
 * - "left center" / "right center"
 * - "50% 20%"        가로 50%, 세로 위에서 20% 지점
 */
export type GalleryItem = {
  src: string;
  /** 기본값: center top */
  position?: string;
};

const DEFAULT_POSITION = "center top";

function photo(path: string, position: string = DEFAULT_POSITION): GalleryItem {
  return { src: assetPath(path), position };
}

/** 01~25 + 기존 img1~14 */
export const GALLERY_ITEMS: GalleryItem[] = [
  // 예: photo("/images/01.jpg", "center top"),
  ...Array.from({ length: 25 }, (_, i) =>
    photo(`/images/${String(i + 1).padStart(2, "0")}.jpg`),
  ),
  ...Array.from({ length: 14 }, (_, i) => photo(`/images/img${i + 1}.jpg`)),
];

export function galleryPosition(item: GalleryItem): string {
  return item.position ?? DEFAULT_POSITION;
}
