'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Chapter } from '@quranjs/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { InputNumElement } from '@/components/settings/input-num-element';
import { SelectElement, SelectOption } from '@/components/settings/select-element';

interface MemorizationSettingsFormProps {
  chapters: Chapter[];
  formattedChapters: SelectOption[];
  formattedReciters: SelectOption[];
  isDialog?: boolean;
}

const RANGE_SIZE = 10;

export function MemorizationSettingsForm({
  chapters,
  formattedChapters,
  formattedReciters,
  isDialog = false,
}: MemorizationSettingsFormProps) {
  const searchParams = useSearchParams();

  // Form State
  const [surah, setSurah] = React.useState<string>(searchParams.get('surah') ?? '1');
  const chapterVerses = React.useMemo(() => {
    return chapters.find((c) => c.id === Number(surah))?.versesCount ?? 1;
  }, [surah, chapters]);

  const [startAyah, setStartAyah] = React.useState<number>(
    searchParams.has('start') ? Number(searchParams.get('start')) : 1,
  );
  const [endAyah, setEndAyah] = React.useState<number>(
    searchParams.has('end')
      ? Number(searchParams.get('end'))
      : chapterVerses < 10
        ? chapterVerses
        : 10,
  );
  const [reciter, setReciter] = React.useState<string>(searchParams.get('reciter') ?? '1');
  const [repetitions, setRepetitions] = React.useState<number>(
    searchParams.has('reps') ? Number(searchParams.get('reps')) : 10,
  );

  const params = new URLSearchParams({
    surah,
    start: startAyah.toString(),
    end: endAyah.toString(),
    reciter,
    reps: repetitions.toString(),
  });

  const handleStartChange = (val: number) => {
    const start = Math.max(1, Math.min(val, chapterVerses));

    // If end is too far → pull it back
    if (endAyah - start > RANGE_SIZE) {
      setStartAyah(start);
      setEndAyah(Math.min(start + RANGE_SIZE, chapterVerses));
      return;
    }

    // If start > end → push end forward
    if (start > endAyah) {
      setStartAyah(start);
      setEndAyah(start);
      return;
    }

    setStartAyah(start);
  };

  const handleEndChange = (val: number) => {
    let end = Math.max(val, startAyah);

    // Hard clamp to chapter max
    end = Math.min(end, chapterVerses);

    // Enforce range-size limit
    if (end - startAyah > RANGE_SIZE) {
      end = Math.min(startAyah + RANGE_SIZE, chapterVerses);
    }

    setEndAyah(end);
  };

  React.useEffect(() => {
    const s = searchParams.get('surah');
    const st = searchParams.get('start');
    const e = searchParams.get('end');
    const r = searchParams.get('reciter');
    const rep = searchParams.get('reps');

    if (s) setSurah(s);
    if (st) setStartAyah(Number(st));
    if (e) setEndAyah(Number(e));
    if (r) setReciter(r);
    if (rep) setRepetitions(Number(rep));
  }, [searchParams]);

  React.useEffect(() => {
    // Pull ayahs back into valid range when Surah changes
    setStartAyah((s) => Math.min(s, chapterVerses));
    setEndAyah((e) => {
      const safeEnd = Math.min(e, chapterVerses);
      if (safeEnd - startAyah > RANGE_SIZE) {
        return Math.min(startAyah + RANGE_SIZE, chapterVerses);
      }
      return safeEnd;
    });
  }, [chapterVerses, startAyah]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Card 1: Content Selection */}
      <Card className="rounded-xl shadow-sm border-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            What are we memorizing?
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <SelectElement
              id="surah-select"
              label="Surah"
              placeholder="Select Surah"
              value={surah}
              onChange={setSurah}
              options={formattedChapters}
            />

            <div className="flex gap-4">
              <InputNumElement
                id="start-ayah"
                label="Start Ayah"
                value={startAyah}
                onValueChange={handleStartChange}
              />
              <InputNumElement
                id="end-ayah"
                label="End Ayah"
                value={endAyah}
                onValueChange={handleEndChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Preferences */}
      <Card className="rounded-xl shadow-sm border-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <SelectElement
              id="reciter-select"
              label="Reciter"
              placeholder="Select Reciter"
              value={reciter}
              onChange={setReciter}
              options={formattedReciters}
            />
            <InputNumElement
              id="reps"
              label="Repetitions"
              value={repetitions}
              onValueChange={setRepetitions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Action */}
      {isDialog ? (
        <SheetClose asChild>
          <Button
            asChild
            className="py-6 text-lg font-bold tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
          >
            <Link href={`/memorization/session?${params.toString()}`}>Set settings</Link>
          </Button>
        </SheetClose>
      ) : (
        <Button
          asChild
          className="py-6 text-lg font-bold tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
        >
          <Link href={`/memorization/session?${params.toString()}`}>Set settings</Link>
        </Button>
      )}
    </div>
  );
}
