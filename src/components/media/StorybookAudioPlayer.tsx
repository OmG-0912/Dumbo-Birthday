"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Mic } from "lucide-react";

interface StorybookAudioPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const StorybookAudioPlayer: React.FC<StorybookAudioPlayerProps> = ({
  src,
  title = "Storybook Voice Keepsake",
  subtitle = "Recorded with affection",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [durationStr, setDurationStr] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTimeStr(formatTime(audio.currentTime));
      }
    };

    const updateDuration = () => {
      setDurationStr(formatTime(audio.duration || 0));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const targetPercent = parseFloat(e.target.value);
    const targetTime = (targetPercent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setProgress(targetPercent);
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border border-gold/30 bg-[#FAF7F2] shadow-sm ${className}`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#172D29] text-[#FDE08B] hover:bg-[#1E3B36] flex items-center justify-center transition-transform hover:scale-105 shadow-md shrink-0"
          aria-label={isPlaying ? "Pause voice keepsake" : "Play voice keepsake"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
        </button>

        {/* Title and Progress Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <Mic className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="font-serif text-sm font-semibold text-cocoa truncate">{title}</span>
            </div>
            <span className="text-[10px] text-cocoa/60 font-mono shrink-0 ml-2">
              {currentTimeStr} / {durationStr}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-[#B88B4A]"
            />
          </div>

          <p className="text-[11px] font-serif italic text-gold-deep mt-1 truncate">{subtitle}</p>
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="p-2 text-cocoa/60 hover:text-cocoa transition-colors shrink-0"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
