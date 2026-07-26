"use client";

import { useEffect } from "react";
import { assetPath } from "@/lib/asset";
import { SECTION_BACKGROUNDS } from "@/lib/site";

/**
 * 첫 진입 시 모든 섹션 배경을 미리 받아 두어
 * 스크롤할 때 배경이 늦게 뜨지 않게 함
 */
export default function BackgroundPreloader() {
  useEffect(() => {
    SECTION_BACKGROUNDS.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = assetPath(src);
    });
  }, []);

  return null;
}
