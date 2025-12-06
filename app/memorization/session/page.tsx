import { ChapterId } from '@quranjs/api';
import { getVerses, getVersesAudio } from '@/lib/quran-foundation-api/data';

import { Header } from '@/components/session/header';
import { QuranScript } from '@/components/session/quran-script';
import { Progress } from '@/components/session/progress';
import { Actions } from '@/components/session/actions';

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

  return (
    <main>
      <Header />
      <div>
        <Progress />
        <QuranScript verses={verses} />
      </div>
      <Actions audio={versesAudio} range={range} />
    </main>
  );
}
