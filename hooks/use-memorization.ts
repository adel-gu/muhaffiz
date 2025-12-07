import { useState } from 'react';

export type Phase = 'FAMILIARIZATION' | 'MEMORIZATION' | 'COMPLETE';
type MemorizationMode = 'INDIVIDUAL' | 'CUMULATIVE';

interface UseMemorizationProps {
  targetReps: number;
  totalVerses: number;
}

export function useMemorization({ targetReps, totalVerses }: UseMemorizationProps) {
  const [phase, setPhase] = useState<Phase>('FAMILIARIZATION');
  const [currentReps, setCurrentReps] = useState(0);

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [mode, setMode] = useState<MemorizationMode>('INDIVIDUAL');
  const [hidden, setHidden] = useState(false); // Controls blur

  const startHiding = () => setHidden(true);
  const showText = () => setHidden(false);

  const advance = () => {
    if (phase === 'FAMILIARIZATION') {
      const next = currentReps + 1;
      if (next >= targetReps) {
        setPhase('MEMORIZATION');
        setCurrentReps(0);
        setHidden(true); // start blurred
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

      // reps achieved for this task → reset
      setCurrentReps(0);

      if (mode === 'INDIVIDUAL') {
        // Done memorizing one ayah → now cumulative recall for all up to this ayah
        setMode('CUMULATIVE');
        return;
      }

      if (mode === 'CUMULATIVE') {
        // Finished cumulative recall → move to next ayah
        const nextAyah = currentAyahIndex + 1;

        if (nextAyah >= totalVerses) {
          setPhase('COMPLETE');
          return;
        }

        setCurrentAyahIndex(nextAyah);
        setMode('INDIVIDUAL');

        return;
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
