"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/layout/Section";
import Typewriter from "@/components/ui/Typewriter";
import FadeInUp from "../ui/FadeInUp";
import { assetPath } from "@/lib/asset";

const D = 70;       // 글자당 ms
const INIT = 500;   // 첫 시작 전 대기
const GAP = 900;    // 항목 사이(문장 → 다음 날짜) 대기
const DATE_GAP = 280; // 날짜 → 바로 다음 문장 대기

/** 이전 텍스트가 끝난 뒤 다음 시작 시점 계산 */
function next(prevStart: number, prevText: string, gap = GAP) {
  return prevStart + prevText.length * D + gap;
}

// 날짜 & 텍스트 선언
const date1 = "2018.05.26"; const t1 = "'우리'가 된 첫날";
const date2 = "2020.11.22"; const t2a = "이제는 헤어질 시간을"; const t2b = "세지 않아도 되는 날";
const date3 = "2024.02.16"; const t3 = "캠퍼스에서의 마지막 날";
const date4 = "2024.02.01"; const t4 = "기차표가 가장 소중하던 장거리연애 시절";
const date5 = "2026.01.20"; const t5 = "같은 집, 같은 일상";
const date6 = "2026.??.??"; const t6 = "평생을 약속한 날";

// 순차 딜레이 계산
const sd1  = INIT;
const st1  = next(sd1, date1, DATE_GAP);
const sd2  = next(st1, t1);
const st2a = next(sd2, date2, DATE_GAP);
const st2b = st2a + t2a.length * D + 200; // 줄바꿈 사이 짧은 간격
const sd3  = next(st2b, t2b);
const st3  = next(sd3, date3, DATE_GAP);
const sd4  = next(st3, t3);
const st4  = next(sd4, date4, DATE_GAP);
const sd5  = next(st4, t4);
const st5  = next(sd5, date5, DATE_GAP);
const sd6  = next(st5, t5);
const st6  = next(sd6, date6, DATE_GAP);

/** 섹션 4: 우리의 이야기 */
export default function Section04Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(false);
          // 다음 tick에 true로 설정해 Typewriter가 리셋되도록
          requestAnimationFrame(() => setTriggered(true));
        } else {
          setTriggered(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tw = (text: string, startDelay: number) => (
    <Typewriter text={text} delay={D} triggered={triggered} startDelay={startDelay} />
  );

  return (
    <Section bgImage="/images/back4.jpg">
      <div ref={sectionRef} className="h-full">
      <FadeInUp delay={0.1}>
        <div className="relative text-center text-3xl mt-10 font-bold">
          우리의 이야기
          <img
            src={assetPath("/images/yellow_spark_lines.svg")}
            alt=""
            className="absolute -top-12 right-10"
            width={160}
            height={160}
          />
        </div>
        </FadeInUp>

        <div className="mt-6 text-left p-14 pl-60">
          <p className="font-semibold">{tw(date1, sd1)}</p>
          <p>{tw(t1, st1)}</p>
        </div>

        <div className="text-right p-6 pr-62">
          <p className="font-semibold">{tw(date2, sd2)}</p>
          <p>{tw(t2a, st2a)}</p>
          <p>{tw(t2b, st2b)}</p>
        </div>

        <div className="text-left p-14 pl-60 w-full">
          <p className="font-semibold">{tw(date3, sd3)}</p>
          <p>{tw(t3, st3)}</p>
        </div>

        <div className="text-right p-8 pr-62 w-full">
          <p className="font-semibold">{tw(date4, sd4)}</p>
          <p>{tw(t4, st4)}</p>
        </div>

        <div className="text-left p-10 pl-60 w-full">
          <p className="font-semibold">{tw(date5, sd5)}</p>
          <p>{tw(t5, st5)}</p>
        </div>

        <div className="text-right p-10 pr-62 w-full">
          <p className="font-semibold">{tw(date6, sd6)}</p>
          <p>{tw(t6, st6)}</p>
        </div>
      </div>
    </Section>
  );
}
