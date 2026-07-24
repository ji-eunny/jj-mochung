"use client";

import dynamic from "next/dynamic";

// react-pdf는 브라우저 전용 API(DOMMatrix)를 사용 → SSR 완전 비활성화
const PdfPage = dynamic(() => import("./PdfPage"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-wedding-cream" />,
});

interface SectionProps {
  pdfUrl?: string;
  bgClassName?: string;
  children?: React.ReactNode;
}

export default function Section({
  pdfUrl,
  bgClassName = "bg-wedding-cream",
  children,
}: SectionProps) {
  return (
    <div
      className={`
        relative flex-shrink-0
        snap-start snap-always
        w-full
        h-[950px]
        overflow-hidden
        ${bgClassName}
      `}
    >
      {pdfUrl && <PdfPage pdfUrl={pdfUrl} bgClassName={bgClassName} />}

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
