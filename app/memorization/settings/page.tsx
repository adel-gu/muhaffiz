import { Suspense } from 'react';

import { MemorizationSettingsForm } from '@/components/shared/memorization-settings-form';
import { getChapters, getReciters } from '@/lib/quran-foundation-api/data';

export default async function page() {
  const [rawChapters, rawReciters] = await Promise.all([getChapters(), getReciters()]);

  const chapterOptions = rawChapters.map((c) => ({
    value: c.id.toString(),
    label: `${c.id}. ${c.nameSimple}`,
    subLabel: c.translatedName.name,
    meta: c.nameArabic,
  }));

  const reciterOptions = rawReciters.map((r) => ({
    value: r.id!.toString(),
    label: `${r.id!}. ${r.reciterName!}`,
    subLabel: r.style!,
  }));

  return (
    <Suspense>
      <MemorizationSettingsForm
        chapters={rawChapters}
        formattedChapters={chapterOptions}
        formattedReciters={reciterOptions}
      />
    </Suspense>
  );
}
