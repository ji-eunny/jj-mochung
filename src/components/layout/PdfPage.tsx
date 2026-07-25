"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { assetPath } from "@/lib/asset";

// CDN 대신 같은 출처 worker (카카오/인앱 브라우저 차단 방지)
pdfjs.GlobalWorkerOptions.workerSrc = assetPath("/pdf.worker.min.mjs");

interface PdfPageProps {
  pdfUrl: string;
  bgClassName?: string;
}

/** PDF 한 페이지를 컨테이너 높이에 꽉 차게 렌더링 (클라이언트 전용) */
export default function PdfPage({
  pdfUrl,
  bgClassName = "bg-wedding-cream",
}: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(950);
  const [visible, setVisible] = useState(false);
  const [dpr, setDpr] = useState(2);
  const resolvedUrl = assetPath(pdfUrl);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 2, 3));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className={`absolute inset-0 ${bgClassName}`} />

      <div
        className="relative transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Document file={resolvedUrl} loading={null} error={null}>
          <Page
            pageNumber={1}
            height={height}
            devicePixelRatio={dpr}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="!block"
            onRenderSuccess={() => setVisible(true)}
          />
        </Document>
      </div>
    </div>
  );
}
