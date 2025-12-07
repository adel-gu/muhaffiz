import { BookOpen, Settings } from 'lucide-react';
import { getChapters, getReciters } from '@/lib/quran-foundation-api/data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { MemorizationSettingsForm } from '../shared/memorization-settings-form';
import Link from 'next/link';

export async function Header() {
  const [chapters, reciters] = await Promise.all([getChapters(), getReciters()]);

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
            <SheetTitle>Configure your Hifz session settings below.</SheetTitle>
            <SheetDescription>
              <MemorizationSettingsForm chapters={chapters} reciters={reciters} isDialog={true} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
