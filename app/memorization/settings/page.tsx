import { Suspense } from 'react';

import { MemorizationSettingsForm } from '@/components/shared/memorization-settings-form';
import { getChapters, getReciters } from '@/lib/quran-foundation-api/data';

export const metadata = {
  title: 'Memorization Settings',
  description:
    'Choose your Surah, ayah range, reciter, and cycles to begin a structured Quran memorization session.',
};

export default async function page() {
  const [chapters, reciters] = await Promise.all([getChapters(), getReciters()]);

  return (
    <Suspense>
      <MemorizationSettingsForm chapters={chapters} reciters={reciters} />
    </Suspense>
  );
}
