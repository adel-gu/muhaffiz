import { MemorizationSettingsForm } from '@/components/shared/memorization-settings-form';
import { getChapters, getReciters } from '@/lib/quran-foundation-api/data';

export default async function page() {
  const [chapters, reciters] = await Promise.all([getChapters(), getReciters()]);

  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-12 bg-background">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Memorization Settings
        </h1>
        <p className="text-muted-foreground">Configure your Hifz session settings below.</p>
      </div>

      <MemorizationSettingsForm chapters={chapters} reciters={reciters} />
    </main>
  );
}
