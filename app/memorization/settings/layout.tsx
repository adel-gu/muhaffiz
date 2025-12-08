export const metadata = {
  title: 'Memorization Settings',
  description:
    'Choose your Surah, ayah range, reciter, and cycles to begin a structured Quran memorization session.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-12 bg-background">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Memorization Settings
        </h1>
        <p className="text-muted-foreground">Configure your Hifz session settings below.</p>
      </div>
      {children}
    </main>
  );
}
