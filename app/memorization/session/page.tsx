import { Header } from '@/components/session/header';
import { QuranScript } from '@/components/session/quran-script';
import { Progress } from '@/components/session/progress';
import { getVerses } from '@/lib/quran-foundation-api/data';

export default async function page() {
  const verses = await getVerses('2', 1, 7);
  return (
    <main>
      <Header />
      <div>
        <Progress />
        <QuranScript verses={verses} />
      </div>
      <div>ACTIONS</div>
    </main>
  );
}
