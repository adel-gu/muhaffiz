import Link from 'next/link';
import { ChapterId } from '@quranjs/api';
import { getChapters } from '@/lib/quran-foundation-api/data';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const chapters = await getChapters();
  const { surah, start, end, reps } = await props.searchParams;

  const totalVerses = Number(end) - Number(start) + 1;
  const totalCycles = Number(reps) * (totalVerses + 1);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle2 className="h-14 w-14 text-primary" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 mb-2">
          Alhamdulillah! Session Complete.
        </h1>

        {/* Stats */}
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border-primary/30 dark:border-primary/40 bg-card/50">
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-base font-medium">Surah</p>
                <p className="text-primary text-2xl font-bold leading-tight">
                  {chapters.find((chapter) => chapter.id == (surah as ChapterId))?.nameSimple}
                </p>
                <p>{chapters.find((chapter) => chapter.id == (surah as ChapterId))?.nameArabic}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 dark:border-primary/40 bg-card/50">
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-base font-medium">Verses</p>
                <p className="text-primary text-2xl font-bold leading-tight">{totalVerses}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 dark:border-primary/40 bg-card/50">
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-base font-medium">Cycles</p>
                <p className="text-primary text-2xl font-bold leading-tight">{totalCycles}</p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 dark:border-primary/40 bg-card/50">
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-base font-medium">Focus Score</p>
                <p className="text-primary text-2xl font-bold leading-tight">High</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm mt-10">
          <Button className="h-12 text-base font-bold" asChild>
            <Link href="/">Return Home</Link>
          </Button>

          <Button variant="outline" className="h-12 text-base font-bold" asChild>
            <Link href="/memorization/settings">Start a new session</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
