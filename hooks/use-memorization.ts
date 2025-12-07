// src/hooks/use-memorization.ts
import { useState } from 'react';

export type Phase = 'FAMILIARIZATION' | 'MEMORIZATION' | 'COMPLETE';

interface UseMemorizationProps {
  targetReps: number; // e.g., 10 repetitions needed per phase
}

export function useMemorization({ targetReps }: UseMemorizationProps) {
  const [phase, setPhase] = useState<Phase>('FAMILIARIZATION');
  const [currentReps, setCurrentReps] = useState(0);

  // Helper to map Phase to the Step Number needed by your Progress component
  const currentStep = (() => {
    switch (phase) {
      case 'FAMILIARIZATION':
        return 1;
      case 'MEMORIZATION':
        return 2;
      case 'COMPLETE':
        return 3;
    }
  })();

  const advance = () => {
    // Logic: Increment Reps -> Check if Target Met -> Switch Phase

    if (phase === 'FAMILIARIZATION') {
      if (currentReps + 1 >= targetReps) {
        // Phase 1 Done -> Move to Phase 2
        setPhase('MEMORIZATION');
        setCurrentReps(0); // Reset counter for next phase
      } else {
        setCurrentReps((prev) => prev + 1);
      }
      return;
    }

    if (phase === 'MEMORIZATION') {
      if (currentReps + 1 >= targetReps) {
        // Phase 2 Done -> Complete
        setPhase('COMPLETE');
      } else {
        setCurrentReps((prev) => prev + 1);
      }
      return;
    }
  };

  return {
    phase,
    currentStep,
    currentReps,
    targetReps,
    isComplete: phase === 'COMPLETE',
    actions: {
      advance,
    },
  };
}
