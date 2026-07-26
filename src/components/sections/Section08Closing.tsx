"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Section from "@/components/layout/Section";
import { SendHorizonal } from "lucide-react";
import { assetPath } from "@/lib/asset";

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
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  }
}

/** 섹션 7: 마무리 - 엔딩 크레딧 */
export default function Section08Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 진입할 때마다 처음부터 다시 재생
          controls.set({ y: "100%" });
          controls.start({
            y: "10%",
            transition: { duration: 20, ease: "linear" },
          });
        } else {
          // 섹션 벗어나면 초기 위치로 리셋
          controls.stop();
          controls.set({ y: "100%" });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <Section bgImage="/images/back8.jpg" showDivider={false}>
      {/* 크레딧 영역: overflow hidden으로 잘라냄 */}
      <div ref={sectionRef} className="relative h-[85%] overflow-hidden">
        <motion.div
          className="flex flex-col items-center gap-8 px-6"
          initial={{ y: "100%" }}
          animate={controls}
        >
          {/* 여백 - 처음엔 비어있다가 올라오는 효과 */}
          <div className="h-16" />

          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FD8A69] text-2xl tracking-widest">CAST</p>
            <div className="flex gap-10 mt-1">
              <div className="flex flex-col items-center gap-2">
                <p>신랑</p>
                <p>신부</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p>장재훈</p>
                <p>김지은</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FD8A69] text-2xl tracking-widest">SUPPORTING</p>
            <div className="flex flex-col items-center gap-2 mt-1">
              <p>아빠&nbsp;&nbsp;&nbsp; 장석균&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 엄마&nbsp;&nbsp;&nbsp; 유상아</p>
              <p>아빠&nbsp;&nbsp;&nbsp; 김동기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 엄마&nbsp;&nbsp;&nbsp; 현경희</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FD8A69] text-2xl tracking-widest">MUSIC</p>
            <p className="mt-1">검정치마 - Big Love</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FD8A69] text-2xl tracking-widest">SPECIAL THANKS TO</p>
            <p className="mt-1">하객 여러분</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[#FD8A69] text-2xl tracking-widest">MADE BY</p>
            <p className="mt-1">지은, 재훈</p>
          </div>

        </motion.div>
      </div>

      {/* 공유하기 버튼 - 고정 위치 */}
      <div className="flex justify-center items-center h-[15%]">
        <button
          onClick={handleShare}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-4"
        >
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${assetPath("/images/tape.png")})`,
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
