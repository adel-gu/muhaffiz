import { quranClient, localQuranClient } from '@/lib/quran-foundation-api';
import { ChapterId, VerseKey } from '@quranjs/api';
import { unstable_cache } from 'next/cache';

// The Quran structure doesn't change, so this should be cached forever (or for a year).
export const getChapters = unstable_cache(
  async () => {
    return await quranClient.chapters.findAll();
  },
  ['all-chapters'], // Cache Key
  { revalidate: false, tags: ['chapters'] },
);

export const getReciters = unstable_cache(
  async () => {
    const recitations = await quranClient.resources.findAllRecitations();
    return recitations.sort((a, b) => Number(a.id ?? 0) - Number(b.id ?? 0));
  },
  ['all-reciters'],
  { revalidate: 604800, tags: ['reciters'] },
);

export const getVerses = unstable_cache(
  async (chapterId: ChapterId, startVerse: number, endVerse: number) => {
    const keys = [] as VerseKey[];
    for (let v = startVerse; v <= endVerse; v++) {
      keys.push(`${chapterId}:${v}` as VerseKey);
    }

    const verses = await Promise.all(
      keys.map((key) =>
        quranClient.verses.findByKey(key, {
          words: true,
          fields: { textUthmani: true },
        }),
      ),
    );

    return verses;
  },
  ['verses-range'],
  { revalidate: 86400, tags: ['selected-verses'] },
);

export const getVersesAudio = unstable_cache(
  async ({ chapterId, recitationId }: { chapterId: string; recitationId: string }) => {
    return await localQuranClient.findChapterRecitationById(chapterId, recitationId);
  },
  ['verses-audio'],
  { revalidate: 604800, tags: ['selected-verses-audio'] },
);
