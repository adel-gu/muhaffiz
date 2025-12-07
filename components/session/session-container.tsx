'use client';

import { Verse } from '@quranjs/api';
import { ChapterRecitationWithSegments } from '@/lib/quran-foundation-api/local-client';

import { useMemorization } from '@/hooks/use-memorization';
import { QuranScript } from '@/components/session/quran-script';
import { AudioPlayer } from '@/components/session/audio-player';
import { Button } from '@/components/ui/button';

interface SessionContainerProps {
  verses: Verse[];
  audioData: ChapterRecitationWithSegments;
  range: { from: number; to: number };
  reps: number;
}

export function SessionContainer({ verses, audioData, range, reps }: SessionContainerProps) {
  // 1. Init Engine
  const engine = useMemorization({
    targetReps: reps,
    totalVerses: verses.length,
  });

  return (
    <main className="flex flex-col pb-10">
      <div className="container mx-auto px-4 py-8 space-y-8 flex-1">
        {/* STATUS INDICATOR (Temporary, to show reps counting) */}
        <div className="text-center p-4 bg-muted/20 rounded-lg border">
          <p className="text-lg font-medium">
            Phase: <span className="text-primary">{engine.phase}</span>
          </p>
          {!engine.isComplete && (
            <p className="text-sm text-muted-foreground">
              Repetition: {engine.currentReps} / {engine.targetReps}
            </p>
          )}
        </div>

        {/* SCRIPT */}
        <QuranScript
          verses={verses}
          phase={engine.phase}
          hidden={engine.hidden}
          mode={engine.mode}
          currentAyahIndex={engine.currentAyahIndex}
        />
      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex items-center justify-center gap-4">
        {/* Existing Audio Player */}
        <AudioPlayer audio={audioData} range={range} />

        {/* THE ADVANCE BUTTON */}
        <Button
          size="lg"
          onClick={engine.actions.advance}
          disabled={engine.isComplete}
          className="min-w-[150px]"
        >
          {engine.phase === 'FAMILIARIZATION'
            ? 'Mark Repetition'
            : engine.phase === 'MEMORIZATION'
              ? 'I Recited It'
              : 'Done'}
        </Button>
      </div>
    </main>
  );
}
