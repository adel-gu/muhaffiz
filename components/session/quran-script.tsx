'use client';

import localFont from 'next/font/local';

import { Verse } from '@quranjs/api';
import { playWordAudio, toArabicNumber } from '@/lib/quran-foundation-api/utils';
import { cn } from '@/lib/utils';

const quranFont = localFont({
  src: '../../public/fonts/UthmanicHafs_V22.woff2',
  display: 'swap',
});

interface QuranScriptProps {
  verses: Verse[];
}

export function QuranScript({ verses }: QuranScriptProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        quranFont.className,
        'flex flex-wrap items-center justify-center gap-y-6 text-center leading-[3] p-6',
      )}
    >
      {verses.map((verse) => (
        <div key={verse.verseKey}>
          {verse.textUthmani?.split(' ').map((word, index) => (
            <span
              key={`${verse.words?.[index]?.id}`}
              onClick={() =>
                verse.words?.[index]?.audioUrl && playWordAudio(verse.words[index].audioUrl)
              }
              className="group relative mx-[0.175rem] inline-block cursor-pointer
                  transition-colors duration-200 hover:text-primary
                  text-3xl md:text-4xl"
            >
              {word}
            </span>
          ))}
          <span
            className={cn('text-primary mx-1 text-4xl')}
            aria-label={`End of verse ${verse.verseNumber}`}
          >
            {toArabicNumber(verse.verseNumber)}
          </span>
        </div>
      ))}
    </div>
  );
}
