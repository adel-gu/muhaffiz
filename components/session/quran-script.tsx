'use client';

import localFont from 'next/font/local';

import { Verse } from '@quranjs/api';
import { cn } from '@/lib/utils';
import { playWordAudio } from '@/lib/quran-foundation-api/data';

const quranFont = localFont({
  src: '../../public/fonts/UthmanicHafs_V22.woff2',
  display: 'swap',
});

interface QuranScriptProps {
  verses: Verse[];
}

export function QuranScript({ verses }: QuranScriptProps) {
  console.log('verses: ', verses);
  return (
    <div
      dir="rtl"
      className={cn(
        quranFont.className,
        'flex flex-wrap items-center justify-center gap-y-6 text-center leading-[3] text-gray-800 p-6',
      )}
    >
      {verses.map((verse) => (
        <div key={verse.id}>
          <span>
            {verse.textUthmani?.split(' ').map((word, index) => (
              <span
                key={`${word}`}
                onClick={() =>
                  verse.words?.[index]?.audioUrl && playWordAudio(verse.words[index].audioUrl)
                }
                className="group relative mx-0.5 inline-block cursor-pointer
                  transition-colors duration-200 hover:text-primary
                  text-3xl md:text-4xl"
              >
                {word}
              </span>
            ))}
          </span>
          <span
            className="text-primary mx-1 inline-flex items-center justify-center font-sans text-4xl"
            aria-label={`End of verse ${verse.verseNumber}`}
          >
            <span className={cn(quranFont.className, 'relative')}>
              &#x06DD;
              <span className="absolute left-1/2 top-[calc(50%+2px)] -translate-x-1/2 -translate-y-1/2 text-[0.4em]">
                {verse.verseNumber}
              </span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
