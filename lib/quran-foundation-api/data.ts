import quranClient from '@/lib/quran-foundation-api';
import { cache } from 'react';

export const getChapters = cache(async () => {
  return await quranClient.chapters.findAll();
});

export const getReciters = cache(async () => {
  const recitations = await quranClient.resources.findAllRecitations();
  return recitations.sort((a, b) => Number(a.id ?? 0) - Number(b.id ?? 0));
});
