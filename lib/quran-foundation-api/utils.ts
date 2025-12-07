import type { Phase } from '@/hooks/use-memorization';

export const playWordAudio = (url: string | null) => {
  if (!url) return;
  const audio = new Audio(`https://audio.qurancdn.com/${url}`);
  audio.play();
};

export function toArabicNumber(num: number | string): string {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().replace(/\d/g, (d) => digits[parseInt(d)]);
}

interface InstructionParams {
  phase: Phase;
  mode: 'INDIVIDUAL' | 'CUMULATIVE';
  currentVerseNumber: number; // actual ayah number
  firstVerseNumber: number; // range.from
}

export function getMemorizationInstruction({
  phase,
  mode,
  currentVerseNumber,
  firstVerseNumber,
}: InstructionParams): string {
  if (phase === 'FAMILIARIZATION') {
    return 'Listen and follow the script.';
  }

  if (phase === 'MEMORIZATION') {
    if (mode === 'INDIVIDUAL') {
      return `Recite ayah ${currentVerseNumber} from memory.`;
    }

    if (mode === 'CUMULATIVE') {
      return `Recite ayat ${firstVerseNumber}–${currentVerseNumber} from memory.`;
    }
  }

  return 'Completed.';
}
