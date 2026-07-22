"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  /** 글자당 딜레이 (ms), 기본 80ms */
  delay?: number;
  /** 시작 전 대기 시간 (ms), 기본 0ms */
  startDelay?: number;
  className?: string;
}

/**
 * 타자기 효과 컴포넌트
 * - IntersectionObserver로 화면에 진입하면 자동 시작
 * - 한 글자씩 순서대로 출력
 */
export default function Typewriter({
  text,
  delay = 80,
  startDelay = 0,
  className,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  // 화면 진입 감지
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 타자 효과
  useEffect(() => {
    if (!started) return;

    let i = 0;
    setDisplayed("");

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, delay);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [started, text, delay, startDelay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {/* 커서 깜빡임 */}
      {displayed.length < text.length && started && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
