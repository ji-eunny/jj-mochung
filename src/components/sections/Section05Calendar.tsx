"use client";

import dynamic from "next/dynamic";
import Section from "@/components/layout/Section";
import FadeInUp from "@/components/ui/FadeInUp";

// SSR 비활성화 → Date.now() hydration 불일치 방지
const CountdownTimer = dynamic(() => import("@/components/ui/CountdownTimer"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center gap-6 px-6">
      {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span className="text-4xl font-bold tracking-tight">00</span>
          <span className="text-sm tracking-widest" style={{ color: "#E8845A" }}>{label}</span>
        </div>
      ))}
    </div>
  ),
});

/** 섹션 5: 결혼식까지 카운트다운 */
export default function Section05Calendar() {
  return (
    <Section bgImage="/images/back5.jpg">
      <FadeInUp delay={0.1}>
        <div className="text-center text-3xl mt-24 font-bold">결혼식까지</div>
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div className="mt-146">
          <CountdownTimer />
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div className="text-center mt-8 text-base text-black">
          2027. 02. 13 AM 10:50
        </div>
        <div className="text-center mt-2 text-base text-black">
          까사그랑데
        </div>
      </FadeInUp>
    </Section>
  );
}
