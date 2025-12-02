import { Language, QuranClient } from '@quranjs/api';

const quranClient = new QuranClient({
  clientId: process.env.QURAN_CLIENT_ID!,
  clientSecret: process.env.QURAN_CLIENT_SECRET!,
  defaults: {
    language: Language.ENGLISH,
  },
});

export default quranClient;
