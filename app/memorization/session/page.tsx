import { ChapterId } from '@quranjs/api';
import { getVerses, getVersesAudio } from '@/lib/quran-foundation-api/data';

import { Header } from '@/components/session/header';
import { SessionContainer } from '@/components/session/session-container';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const { surah, start, end, reciter, reps } = await props.searchParams;

  const verses = await getVerses(surah as ChapterId, Number(start), Number(end));
  const versesAudio = await getVersesAudio({
    chapterId: `${surah}`,
    recitationId: reciter as string,
  });

  const timestamps = versesAudio.timestamps;

  const startTs = timestamps.find((t) => t.verse_key === `${surah}:${start}`);
  const endTs = timestamps.find((t) => t.verse_key === `${surah}:${end}`);

  const range = {
    from: startTs?.timestamp_from ?? 0,
    to: endTs?.timestamp_to ?? Infinity,
  };

  const repsCount = reps ? Number(reps) : 10;

  return (
    <div>
      <Header />
      <SessionContainer verses={verses} audioData={versesAudio} range={range} reps={repsCount} />
    </div>
  );
}
