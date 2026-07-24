"use client";

import { motion } from "framer-motion";

interface FadeInUpProps {
  children: React.ReactNode;
  /** 애니메이션 시작 딜레이 (초) */
  delay?: number;
  /** 올라오는 거리 (px) */
  distance?: number;
  className?: string;
}

/**
 * 화면 진입 시 아래에서 위로 페이드인 되는 래퍼 컴포넌트
 * framer-motion의 whileInView 사용 → 스크롤 나갔다 오면 다시 실행
 */
export default function FadeInUp({
  children,
  delay = 0,
  distance = 24,
  className,
}: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
