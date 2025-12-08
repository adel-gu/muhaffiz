import { Suspense } from 'react';

import { BookOpen, Settings } from 'lucide-react';
import { getChapters, getReciters } from '@/lib/quran-foundation-api/data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { MemorizationSettingsForm } from '../shared/memorization-settings-form';
import Link from 'next/link';

export async function Header() {
  const [rawChapters, rawReciters] = await Promise.all([getChapters(), getReciters()]);

  const chapterOptions = rawChapters.map((c) => ({
    id: c.id,
    value: c.id.toString(),
    label: `${c.id}. ${c.nameSimple}`,
    subLabel: c.translatedName.name,
    meta: c.nameArabic,
    versesCount: c.versesCount,
  }));

  const reciterOptions = rawReciters.map((r) => ({
    value: r.id!.toString(),
    label: `${r.id!}. ${r.reciterName!}`,
    subLabel: r.style!,
  }));

  return (
    <header className="flex items-center justify-between border-b py-2 px-4">
      <div className="flex items-center gap-2 group cursor-default">
        <Button variant="link" asChild>
          <Link href="/">
            <div className="p-2 bg-secondary rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Muhaffiz</h2>
          </Link>
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Settings />
          </Button>
        </SheetTrigger>
        <SheetContent className="md:min-w-[600px] pt-6">
          <SheetHeader>
            <SheetTitle className="my-2">Configure your Hifz session settings below.</SheetTitle>
            <Suspense>
              <MemorizationSettingsForm
                formattedChapters={chapterOptions}
                formattedReciters={reciterOptions}
                isDialog={true}
              />
            </Suspense>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
