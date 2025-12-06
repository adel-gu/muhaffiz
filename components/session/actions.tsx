'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { ChapterRecitationWithSegments } from '@/lib/quran-foundation-api/local-client';

export function Actions({
  audio,
  range,
}: {
  audio: ChapterRecitationWithSegments;
  range: { from: number; to: number };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // When playback starts, force the audio to the "from" point
  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
    } else {
      el.currentTime = range.from / 1000; // timestamps are ms, audio wants seconds
      el.play();
    }
  };

  // Watch playback and stop at the "to" point
  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;

    const currentMs = el.currentTime * 1000;
    if (currentMs >= range.to) {
      el.pause();
      el.currentTime = range.from / 1000; // rewind to start of allowed range
      setIsPlaying(false);
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
