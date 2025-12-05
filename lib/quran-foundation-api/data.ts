import quranClient from '@/lib/quran-foundation-api';
import { ChapterId } from '@quranjs/api';
import { cache } from 'react';

export const getChapters = cache(async () => {
  return await quranClient.chapters.findAll();
});

export const getReciters = cache(async () => {
  const recitations = await quranClient.resources.findAllRecitations();
  return recitations.sort((a, b) => Number(a.id ?? 0) - Number(b.id ?? 0));
});

export const getVerses = async (chapterId: ChapterId, startVerse: number, endVerse: number) => {
  const verses = await quranClient.verses.findByChapter(chapterId, {
    words: true,
    fields: {
      textUthmani: true,
    },
  });

  return verses.filter((verse) => verse.verseNumber >= startVerse && verse.verseNumber <= endVerse);
};
