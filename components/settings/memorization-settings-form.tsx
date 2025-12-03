'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputNumElement } from '@/components/settings/input-num-element';
import { SelectElement, SelectOption } from '@/components/settings/select-element';

const CHAPTERS = [
  {
    id: 1,
    nameSimple: 'Al-Fatihah',
    nameArabic: 'الفاتحة',
    translatedName: { name: 'The Opener' },
    versesCount: 7,
  },
  {
    id: 2,
    nameSimple: 'Al-Baqarah',
    nameArabic: 'البقرة',
    translatedName: { name: 'The Cow' },
    versesCount: 286,
  },
  {
    id: 3,
    nameSimple: "Ali 'Imran",
    nameArabic: 'آل عمران',
    translatedName: { name: 'Family of Imran' },
    versesCount: 200,
  },
  {
    id: 18,
    nameSimple: 'Al-Kahf',
    nameArabic: 'الكهف',
    translatedName: { name: 'The Cave' },
    versesCount: 110,
  },
];

const RECITERS = [
  {
    id: 1,
    reciterName: 'Mishary Rashid Alafasy',
    style: 'Murattal',
    translatedName: { name: 'Mishary Rashid Alafasy' },
  },
  {
    id: 2,
    reciterName: 'AbdulBaset AbdulSamad',
    style: 'Murattal',
    translatedName: { name: 'AbdulBaset AbdulSamad' },
  },
  {
    id: 3,
    reciterName: 'Mahmoud Khalil Al-Hussary',
    style: 'Muallim',
    translatedName: { name: 'Mahmoud Khalil Al-Hussary' },
  },
];

export function MemorizationSettingsForm() {
  const router = useRouter();

  // Form State
  const [surah, setSurah] = React.useState<string>('1');
  const [startAyah, setStartAyah] = React.useState<number>(1);
  const [endAyah, setEndAyah] = React.useState<number>(5);
  const [reciter, setReciter] = React.useState<string>('1');
  const [repetitions, setRepetitions] = React.useState<number>(3);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Data Transformation: Convert raw data to SelectOption[]
  const surahOptions: SelectOption[] = React.useMemo(
    () =>
      CHAPTERS.map((c) => ({
        value: c.id.toString(),
        label: `${c.id}. ${c.nameSimple}`,
        subLabel: c.translatedName.name,
        meta: c.nameArabic,
      })),
    [],
  );

  const reciterOptions: SelectOption[] = React.useMemo(
    () =>
      RECITERS.map((r) => ({
        value: r.id.toString(),
        label: r.reciterName,
        subLabel: r.style,
      })),
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build Query Params
    const params = new URLSearchParams({
      surah,
      start: startAyah.toString(),
      end: endAyah.toString(),
      reciter,
      reps: repetitions.toString(),
    });

    const url = new URL("/memorize/session")

    // Simulate a brief delay for better UX
    setTimeout(() => {
      router.push(`/memorize/session?${params.toString()}`);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
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
                onValueChange={setStartAyah}
              />
              <InputNumElement
                id="end-ayah"
                label="End Ayah"
                value={endAyah}
                onValueChange={setEndAyah}
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
        type="submit"
        disabled={isSubmitting}
        className="py-6 text-lg font-bold tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">Loading...</span>
        ) : (
          <span className="flex items-center gap-2">Start Session</span>
        )}
      </Button>
    </form>
  );
}
