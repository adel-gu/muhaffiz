import { useState, useEffect } from 'react';

export type Phase = 'FAMILIARIZATION' | 'MEMORIZATION' | 'COMPLETE';
type MemorizationMode = 'INDIVIDUAL' | 'CUMULATIVE';

interface UseMemorizationProps {
  targetReps: number;
  totalVerses: number;
  onComplete?: () => void;
}

export function useMemorization({ targetReps, totalVerses, onComplete }: UseMemorizationProps) {
  const [phase, setPhase] = useState<Phase>('FAMILIARIZATION');
  const [currentReps, setCurrentReps] = useState(0);

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [mode, setMode] = useState<MemorizationMode>('INDIVIDUAL');
  const [hidden, setHidden] = useState(false);

  const startHiding = () => setHidden(true);
  const showText = () => setHidden(false);

  useEffect(() => {
    if (phase === 'COMPLETE' && onComplete) {
      onComplete();
    }
  }, [phase, onComplete]);

  const advance = () => {
    if (phase === 'FAMILIARIZATION') {
      const next = currentReps + 1;

      if (next >= targetReps) {
        setPhase('MEMORIZATION');
        setCurrentReps(0);
        setHidden(true);
      } else {
        setCurrentReps(next);
      }
      return;
    }

    if (phase === 'MEMORIZATION') {
      const next = currentReps + 1;

      if (next < targetReps) {
        setCurrentReps(next);
        return;
      }

      // completed this repetition cycle
      setCurrentReps(0);

      if (mode === 'INDIVIDUAL') {
        setMode('CUMULATIVE');
        return;
      }

      if (mode === 'CUMULATIVE') {
        const nextAyah = currentAyahIndex + 1;

        if (nextAyah >= totalVerses) {
          setPhase('COMPLETE');
          return;
        }

        setCurrentAyahIndex(nextAyah);
        setMode('INDIVIDUAL');
      }
    }
  };

  return {
    phase,
    mode,
    hidden,
    currentReps,
    targetReps,
    currentAyahIndex,
    isComplete: phase === 'COMPLETE',
    actions: {
      advance,
      startHiding,
      showText,
    },
  };
}
