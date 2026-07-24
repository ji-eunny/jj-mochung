"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { assetPath } from "@/lib/asset";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  const resolvedUrl = assetPath(pdfUrl);

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
