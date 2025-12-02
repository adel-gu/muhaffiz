import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/home/FeatureCard';
import { BookOpen, ArrowRight, Ear, EyeOff, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex h-full grow flex-col max-w-7xl mx-auto w-full">
      <main className="grow flex flex-col items-center justify-center">
        {/* --- Hero Section --- */}
        <section className="w-full px-4 py-20 md:py-32 flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="p-2 bg-secondary rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Muhaffiz</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Memorize the Quran, <br className="hidden sm:block" />
              <span className="text-primary">Ayah by Ayah.</span>
            </h1>
            <h2 className="text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
              A structured loop of <span className="font-semibold text-foreground">Listening</span>,{' '}
              <span className="font-semibold text-foreground">Reading</span>, and{' '}
              <span className="font-semibold text-foreground">Hidden Recall</span>. No distractions,
              just you and the verses.
            </h2>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <Button
              className="py-6 px-12 text-lg rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 group"
              asChild
            >
              <Link href="/setup">
                Start Memorization Session
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Powered by Quran.Foundation Audio & Text
            </p>
          </div>
        </section>

        {/* --- Methodology Grid --- */}
        <section className="w-full px-4 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Ear className="h-6 w-6 text-primary" />}
              title="Familiarization"
              description="Immerse yourself in the sound and rhythm. Listen to the verses repeatedly to build a strong auditory foundation."
            />

            <FeatureCard
              icon={<EyeOff className="h-6 w-6 text-primary" />}
              title="Hidden Recall"
              description="After reading, the text is hidden. Challenge yourself to recite from memory, strengthening your active recall ability."
            />

            <FeatureCard
              icon={<Layers className="h-6 w-6 text-primary" />}
              title="Cumulative Stacking"
              description="Solidify your progress. Our system intelligently reintroduces previous verses to ensure long-term retention."
            />
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Built for the Ummah. &copy; {new Date().getFullYear()} Muhaffiz
        </p>
      </footer>
    </div>
  );
}
