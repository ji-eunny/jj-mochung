"use client";

import { useEffect, useId, useRef, useState } from "react";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/FadeInUp";
import { assetPath } from "@/lib/asset";

const YT_VIDEO_ID = "QJ4fmVJOuxU";

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  mute: () => void;
  setVolume: (n: number) => void;
  destroy: () => void;
}

function loadYouTubeAPI(): Promise<NonNullable<Window["YT"]>> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    } else {
      const id = window.setInterval(() => {
        if (window.YT?.Player) {
          window.clearInterval(id);
          resolve(window.YT);
        }
      }, 50);
    }
  });
}

/** 섹션 1: 커버 (메인 타이틀) */
export default function Section01Cover() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const startingRef = useRef(false);
  const reactId = useId().replace(/:/g, "");
  const playerId = `yt-bgm-${reactId}`;

  useEffect(() => {
    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      readyRef.current = false;
    };
  }, []);

  const toggleBgm = async () => {
    // 준비된 플레이어가 있으면 play/pause 토글
    if (playerRef.current && readyRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    // 로딩 중이면 무시
    if (startingRef.current) return;
    startingRef.current = true;

    try {
      const YT = await loadYouTubeAPI();
      const host = document.getElementById(playerId);
      if (!host) {
        startingRef.current = false;
        return;
      }

      // 준비 전에는 playerRef에 넣지 않음 (unMute is not a function 방지)
      new YT.Player(host, {
        videoId: YT_VIDEO_ID,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            playerRef.current = event.target;
            readyRef.current = true;
            startingRef.current = false;
            event.target.unMute();
            event.target.setVolume(60);
            event.target.playVideo();
            setIsPlaying(true);
          },
          onError: () => {
            startingRef.current = false;
            readyRef.current = false;
            playerRef.current = null;
            setIsPlaying(false);
          },
        },
      });
    } catch {
      startingRef.current = false;
    }
  };

  return (
    <Section bgImage="/images/back1.jpg" priority>
      {/* 숨김 YouTube 플레이어 호스트 */}
      <div
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <div id={playerId} />
      </div>

      <div className="flex w-full justify-end pr-2 pt-2">
        <button
          type="button"
          onClick={toggleBgm}
          aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
          className="flex items-center gap-1"
        >
          <span className="text-2xl">BGM</span>
          <img
            src={
              isPlaying
                ? assetPath("/images/speaker-on.svg")
                : assetPath("/images/speaker-off.svg")
            }
            alt=""
            className="h-12 w-12"
          />
        </button>
      </div>

      <img
        src={assetPath("/images/star.png")}
        alt="star"
        width={40}
        height={40}
        className="absolute top-80 right-10"
        style={{ rotate: "-15deg" }}
      />
      <img
        src={assetPath("/images/star.png")}
        alt="star"
        width={30}
        height={30}
        className="absolute bottom-20 left-15"
        style={{ rotate: "-15deg" }}
      />
      <img
        src={assetPath("/images/star.png")}
        alt="star"
        width={40}
        height={40}
        className="absolute bottom-30 left-5"
        style={{ rotate: "-15deg" }}
      />
      <img
        src={assetPath("/images/star.png")}
        alt="star"
        width={30}
        height={30}
        className="absolute top-90 right-15"
        style={{ rotate: "-15deg" }}
      />

      <FadeInUp delay={0.2}>
        <motion.div
          className="mt-86 mx-12"
          animate={{ rotate: [0, -5, 5, -5, 5, 0, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.15, 0.3, 0.45, 0.6, 0.72, 1],
          }}
        >
          <img src={assetPath("/images/main.jpg")} alt="main" className="object-cover" />
        </motion.div>
      </FadeInUp>
      <FadeInUp delay={0.4}>
        <div className="text-center mt-5 text-xl font-bold">
          <p>2027. 02. 13 AM 10:50</p>
          <p>까사그랑데</p>
        </div>
      </FadeInUp>
    </Section>
  );
}
