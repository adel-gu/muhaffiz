import { quranClient, localQuranClient } from '@/lib/quran-foundation-api';
import { ChapterId, VerseKey } from '@quranjs/api';
import { cache } from 'react';

export const getChapters = cache(async () => {
  return await quranClient.chapters.findAll();
});

export const getReciters = cache(async () => {
  const recitations = await quranClient.resources.findAllRecitations();
  return recitations.sort((a, b) => Number(a.id ?? 0) - Number(b.id ?? 0));
});

export const getVerses = cache(
  async (chapterId: ChapterId, startVerse: number, endVerse: number) => {
    const keys = [] as VerseKey[];

    for (let v = startVerse; v <= endVerse; v++) {
      keys.push(`${chapterId}:${v}` as VerseKey);
    }

    const verses = await Promise.all(
      keys.map((key) =>
        quranClient.verses.findByKey(key, {
          words: true,
          fields: {
            textUthmani: true,
          },
        }),
      ),
    );

    return verses;
  },
);

export const getVersesAudio = cache(
  async ({ chapterId, recitationId }: { chapterId: string; recitationId: string }) => {
    const data = await localQuranClient.findChapterRecitationById(chapterId, recitationId);

    return data;
  },
);
