'use client';

import localFont from 'next/font/local';

import { Verse } from '@quranjs/api';
import { playWordAudio, toArabicNumber } from '@/lib/quran-foundation-api/utils';
import { cn } from '@/lib/utils';
import { Phase } from '@/hooks/use-memorization';

const quranFont = localFont({
  src: '../../public/fonts/UthmanicHafs_V22.woff2',
  display: 'swap',
});

interface QuranScriptProps {
  verses: Verse[];
  phase: Phase;
  hidden: boolean;
  mode: 'INDIVIDUAL' | 'CUMULATIVE';
  currentAyahIndex: number;
}

export function QuranScript({ verses, phase, hidden, mode, currentAyahIndex }: QuranScriptProps) {
  console.log('Verses: ', verses);
  return (
    <div dir="rtl" className={cn(quranFont.className)}>
      {verses.map((verse, idx) => {
        const shouldBlur =
          phase === 'MEMORIZATION' &&
          hidden &&
          ((mode === 'INDIVIDUAL' && idx <= currentAyahIndex) ||
            (mode === 'CUMULATIVE' && idx <= currentAyahIndex));

        const shouldRecite =
          (phase === 'MEMORIZATION' && mode === 'INDIVIDUAL' && idx === currentAyahIndex) ||
          (mode === 'CUMULATIVE' && idx <= currentAyahIndex);
        return (
          <p
            key={verse.verseKey}
            className={cn(`${shouldRecite && 'bg-primary/10 py-2'}`, 'inline space-y-4')}
          >
            {verse.textUthmani?.split(' ').map((word, index) => (
              <span
                key={verse.words?.[index]?.id}
                onClick={() => {
                  const audio = verse.words?.[index]?.audioUrl;
                  if (audio) playWordAudio(audio);
                }}
                className={cn(
                  'mx-1 inline-block cursor-pointer transition-colors text-3xl md:text-4xl hover:text-primary',
                  shouldBlur && 'blur-sm',
                )}
              >
                {word}
              </span>
            ))}
            <span className="text-primary mx-1 text-4xl">{toArabicNumber(verse.verseNumber)}</span>
          </p>
        );
      })}
    </div>
  );
}
