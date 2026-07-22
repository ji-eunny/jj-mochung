"use client";

import Section from "@/components/layout/Section";
import { SendHorizonal } from "lucide-react";

async function handleShare() {
  const shareData = {
    title: "장재훈 ♥ 김지은 결혼합니다",
    text: "2027년 2월 13일 오전 10시 50분\n까사그랑데 서울 광진구 능동로 87",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // 사용자가 공유 취소한 경우 무시
    }
  } else {
    // 미지원 브라우저 - URL 클립보드 복사 fallback
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  }
}

/** 섹션 7: 마무리 */
export default function Section07Closing() {
  return (
    <Section pdfUrl="/pdf/back7.pdf">
      <div className="flex flex-col justify-center items-center mt-30">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-[#FD8A69] text-2xl">CAST</p>
          <div className="flex gap-10">
            <div className="flex flex-col justify-center items-center gap-2"><p>신랑</p><p>신부</p></div>
            <div className="flex flex-col justify-center items-center gap-2"><p>장재훈</p><p>김지은</p></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-6">
          <p className="text-[#FD8A69] text-2xl">SUPPORTING</p>
          <div className="flex gap-10">
            <div className="flex flex-col justify-center items-center gap-2"><p>아빠&nbsp;&nbsp;&nbsp; 장석균</p><p>아빠&nbsp;&nbsp;&nbsp; 김동기</p></div>
            <div className="flex flex-col justify-center items-center gap-2"><p>엄마&nbsp;&nbsp;&nbsp; 유상아</p><p>엄마&nbsp;&nbsp;&nbsp; 현경희</p></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-6">
          <p className="text-[#FD8A69] text-2xl">MUSIC</p>
            <div className="flex flex-col justify-center items-center gap-2"><p>검정치마 - Big Love</p></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-6">
          <p className="text-[#FD8A69] text-2xl">SPECIAL THANKS TO</p>
            <div className="flex flex-col justify-center items-center gap-2"><p>하객 여러분</p></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 mt-6">
          <p className="text-[#FD8A69] text-2xl">MADE BY</p>
            <div className="flex flex-col justify-center items-center gap-2"><p>지은, 재훈</p></div>
        </div>
      </div>

<div className="flex justify-center items-center mt-12">
      <button
          onClick={handleShare}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-4"
        >
          {/* tape 배경만 투명도 조절 */}
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/tape.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              opacity: 0.6,
            }}
          />
          <SendHorizonal size={24} color="#000000" className="relative z-10" />
          <span className="relative z-10 font-bold">공유하기</span>
        </button>
        </div>
    </Section>
  );
}
