"use client";

import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

/** 섹션 1: 커버 (메인 타이틀) */
export default function Section01Cover() {
  return (
    <Section pdfUrl="/pdf/back1.pdf">
      <div className="text-right mr-5 mt-5">
        <span>BGM</span>
        <button className="ml-2">ON</button>
      </div>
      <motion.div
        className="mt-75 mx-12"
        animate={{ x: [0, -8, 8, -8, 8, 0, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.72, 1],
        }}
      >
        <img src="/images/main.png" alt="main" className="object-cover" />
      </motion.div>
      <div className="text-center mt-5 text-xl font-bold">
        <p>2027. 02. 13 AM 10:50</p>
        <p>까사그랑데</p>
      </div>
    </Section>
  );
}
