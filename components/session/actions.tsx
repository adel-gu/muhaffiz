'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, PauseIcon } from 'lucide-react';
import { ChapterRecitation } from '@quranjs/api';

export function Actions({ audio }: { audio: ChapterRecitation }) {
  const audioUrl = audio.audioUrl;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <Button onClick={togglePlay} variant="default">
        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
