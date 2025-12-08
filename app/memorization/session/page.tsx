import { Suspense } from 'react';
import { Metadata } from 'next';

import { ChapterId } from '@quranjs/api';
import { getVerses, getVersesAudio } from '@/lib/quran-foundation-api/data';

import { SessionContainer } from '@/components/session/session-container';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }): Promise<Metadata> {
  const { surah, start, end } = await props.searchParams;

  const range = surah && start && end ? `Surah ${surah}: Ayah ${start}–${end}` : null;

  return {
    title: range ? `${range} Memorization Session` : 'Memorization Session',
    description: range
      ? `Memorize ${range} with structured repetition, cumulative recall, and audio recitations.`
      : 'Memorize Quran ayat with structured repetition, cumulative recall, and audio recitations.',
  };
}

export default async function page(props: { searchParams: SearchParams }) {
  const { surah, start, end, reciter, reps } = await props.searchParams;

  // Prevent crashing in case no params found
  const chapterId = (surah as ChapterId) || 1;
  const startAyah = Number(start) || 1;
  const endAyah = Number(end) || 10;
  const recitationId = (reciter as string) || '1';

  const [verses, versesAudio] = await Promise.all([
    getVerses(chapterId, startAyah, endAyah),
    getVersesAudio({
      chapterId: `${chapterId}`,
      recitationId: recitationId,
    }),
  ]);

  const timestamps = versesAudio.timestamps;

  const startTs = timestamps.find((t) => t.verse_key === `${surah}:${start}`);
  const endTs = timestamps.find((t) => t.verse_key === `${surah}:${end}`);

  const range = {
    from: startTs?.timestamp_from ?? 0,
    to: endTs?.timestamp_to ?? Infinity,
  };

  const repsCount = reps ? Number(reps) : 10;

  return (
    <Suspense>
      <SessionContainer verses={verses} audioData={versesAudio} range={range} reps={repsCount} />
    </Suspense>
  );
}
