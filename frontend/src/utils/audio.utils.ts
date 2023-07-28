"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const playAudio = (src: string) => {
  const audio = new Audio(src);
  audio.loop = true;
  audio.play();
  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
};

const useAudio = (src: string) => {
  const prevAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    prevAudio.current?.pause();
    prevAudio.current?.remove();
    prevAudio.current = new Audio(src);
    prevAudio.current.loop = true;
  }, [src]);

  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback((play: boolean) => {
    const currentAudio = prevAudio.current;
    if (!currentAudio) return;
    if (play) {
      currentAudio.play();
    } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setPlaying(play);
  }, []);

  return [playing, handlePlay] as const;
};

export { playAudio, useAudio };
