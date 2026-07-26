"use client";

import { useEffect } from "react";

/**
 * 확대(핀치/단축키) 및 우클릭 방지
 */
export default function InteractionGuard() {
  useEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault();

    // 핀치 줌 (iOS Safari gesture 이벤트)
    const preventGesture = (e: Event) => e.preventDefault();

    // 두 손가락 이상 터치 이동 시 줌 방지
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    // Ctrl/Cmd + 휠 줌 방지
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };

    // Ctrl/Cmd + (+/-/0) 줌 단축키 방지
    const preventKeyZoom = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "+" || e.key === "=" || e.key === "-" || e.key === "_" || e.key === "0") {
        e.preventDefault();
      }
    };

    // 이미지 드래그 방지
    const preventDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("gestureend", preventGesture, { passive: false });
    document.addEventListener("touchmove", preventMultiTouch, { passive: false });
    document.addEventListener("wheel", preventWheelZoom, { passive: false });
    document.addEventListener("keydown", preventKeyZoom);
    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
      document.removeEventListener("touchmove", preventMultiTouch);
      document.removeEventListener("wheel", preventWheelZoom);
      document.removeEventListener("keydown", preventKeyZoom);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  return null;
}
