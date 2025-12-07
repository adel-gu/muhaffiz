'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { ChapterRecitationWithSegments } from '@/lib/quran-foundation-api/local-client';

export function AudioPlayer({
  audio,
  range,
}: {
  audio: ChapterRecitationWithSegments;
  range: { from: number; to: number };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Track whether we've already "entered" the slice
  const hasStartedRef = useRef(false);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      return;
    }

    // Only jump to start *once*
    if (!hasStartedRef.current) {
      el.currentTime = range.from / 1000;
      hasStartedRef.current = true;
    }

    el.play();
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;

    const currentMs = el.currentTime * 1000;

    if (currentMs >= range.to) {
      // Stop and reset state (but NOT the hasStarted flag)
      el.pause();
      setIsPlaying(false);

      // Reset for next full replay of the slice
      hasStartedRef.current = false;
      el.currentTime = range.from / 1000;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <audio
        ref={audioRef}
        src={audio.audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Button onClick={togglePlay}>
        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
