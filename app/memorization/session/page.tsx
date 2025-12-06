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

  console.log('VersesAudio: ', versesAudio);

  return (
    <main>
      <Header />
      <div>
        <Progress />
        <QuranScript verses={verses} />
      </div>
      <Actions audio={versesAudio} />
    </main>
  );
}
