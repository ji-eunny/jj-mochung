"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// pdfjs worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfBackgroundProps {
  /** public 폴더 기준 PDF 경로 (예: "/pdf/invitation.pdf") */
  pdfUrl: string;
  /** 렌더링할 페이지 번호 (기본값: 1) */
  pageNumber?: number;
  children?: React.ReactNode;
}

/**
 * PDF를 배경으로 렌더링하는 컴포넌트
 * 부모 컨테이너 크기에 맞게 자동으로 PDF를 스케일링합니다.
 */
export default function PdfBackground({
  pdfUrl,
  pageNumber = 1,
  children,
}: PdfBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(440);
  const [isLoaded, setIsLoaded] = useState(false);

  // 컨테이너 크기 감지
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(container);
    setContainerWidth(container.offsetWidth);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* PDF 배경 레이어 */}
      <div className="absolute inset-0 z-0">
        <Document
          file={pdfUrl}
          loading={
            <div className="flex h-full items-center justify-center bg-wedding-cream">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-wedding-rose border-t-transparent" />
            </div>
          }
          error={
            <div className="flex h-full items-center justify-center bg-wedding-cream text-sm text-muted-foreground">
              PDF를 불러올 수 없습니다.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onRenderSuccess={() => setIsLoaded(true)}
            className="!block"
          />
        </Document>
      </div>

      {/* 콘텐츠 레이어 */}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
