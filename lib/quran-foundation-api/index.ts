import { Language, QuranClient } from '@quranjs/api';
import { getLocalQuranClient } from './local-client';

export const quranClient = new QuranClient({
  clientId: process.env.QURAN_CLIENT_ID!,
  clientSecret: process.env.QURAN_CLIENT_SECRET!,
  defaults: {
    language: Language.ENGLISH,
  },
});

export const localQuranClient = getLocalQuranClient();
