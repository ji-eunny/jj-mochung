"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  /** 글자당 딜레이 (ms) */
  delay?: number;
  /** 외부에서 시작 신호를 받는 경우 (true가 되면 startDelay 후 타이핑 시작) */
  triggered?: boolean;
  /** triggered 이후 대기 시간 (ms) */
  startDelay?: number;
  className?: string;
}

/**
 * 타자기 효과 컴포넌트
 * - triggered prop으로 외부에서 시작 시점 제어
 */
export default function Typewriter({
  text,
  delay = 80,
  triggered = false,
  startDelay = 0,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // triggered 꺼지면 초기화
    if (!triggered) {
      setStarted(false);
      setDisplayed("");
      return;
    }

    const startTimeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimeout);
  }, [triggered, startDelay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [started, text, delay]);

  return (
    /* 실제 텍스트를 invisible로 렌더링해 높이 확보, 위에 타이핑 텍스트 오버레이 */
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="invisible whitespace-pre-wrap">{text}</span>
      <span className="absolute left-0 top-0 whitespace-pre-wrap">
        {displayed}
        {started && displayed.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </span>
    </span>
  );
}
