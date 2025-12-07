'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import { Chapter, RecitationResource } from '@quranjs/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputNumElement } from '@/components/settings/input-num-element';
import { SelectElement, SelectOption } from '@/components/settings/select-element';
import Link from 'next/link';

interface MemorizationSettingsFormProps {
  chapters: Chapter[];
  reciters: RecitationResource[];
}

const RANGE_SIZE = 10;

export function MemorizationSettingsForm({ chapters, reciters }: MemorizationSettingsFormProps) {
  const searchParams = useSearchParams();

  // Form State
  const [surah, setSurah] = React.useState<string>(searchParams.get('surah') ?? '1');
  const [startAyah, setStartAyah] = React.useState<number>(
    searchParams.has('start') ? Number(searchParams.get('start')) : 1,
  );
  const [endAyah, setEndAyah] = React.useState<number>(
    searchParams.has('end') ? Number(searchParams.get('end')) : 5,
  );
  const [reciter, setReciter] = React.useState<string>(searchParams.get('reciter') ?? '1');
  const [repetitions, setRepetitions] = React.useState<number>(
    searchParams.has('reps') ? Number(searchParams.get('reps')) : 10,
  );

  // Data Transformation: Convert raw data to SelectOption[]
  const surahOptions: SelectOption[] = React.useMemo(
    () =>
      chapters.map((c) => ({
        value: c.id.toString(),
        label: `${c.id}. ${c.nameSimple}`,
        subLabel: c.translatedName.name,
        meta: c.nameArabic,
      })),
    [chapters],
  );

  const reciterOptions: SelectOption[] = React.useMemo(
    () =>
      reciters.map((r) => ({
        value: r.id!.toString(),
        label: `${r.id!}. ${r.reciterName!}`,
        subLabel: r.style!,
      })),
    [reciters],
  );

  const params = new URLSearchParams({
    surah,
    start: startAyah.toString(),
    end: endAyah.toString(),
    reciter,
    reps: repetitions.toString(),
  });

  const handleStartChange = (val: number) => {
    const start = Math.max(1, val);

    // If end is too far → pull it back
    if (endAyah - start > RANGE_SIZE) {
      setStartAyah(start);
      setEndAyah(start + RANGE_SIZE);
      return;
    }

    // If user makes start > end → push end forward
    if (start > endAyah) {
      setStartAyah(start);
      setEndAyah(start);
      return;
    }

    setStartAyah(start);
  };

  const handleEndChange = (val: number) => {
    let end = Math.max(val, startAyah);

    // If range exceeds RANGE_SIZE → pull end back
    if (end - startAyah > RANGE_SIZE) {
      end = startAyah + RANGE_SIZE;
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
              options={surahOptions}
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
              options={reciterOptions}
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
      <Button
        asChild
        className="py-6 text-lg font-bold tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
      >
        <Link href={`/memorization/session?${params.toString()}`}>Set settings</Link>
      </Button>
    </div>
  );
}
