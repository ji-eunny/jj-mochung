"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2027-02-13T10:50:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-bold tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm tracking-widest" style={{ color: "#E8845A" }}>
        {label}
      </span>
    </div>
  );
}

/** 클라이언트 전용 카운트다운 타이머 (SSR 없음) */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-end gap-6 px-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
