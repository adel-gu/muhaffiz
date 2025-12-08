import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background animate-in fade-in duration-500">
      <main className="flex flex-col pb-24 flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Status/Instruction Indicator Skeleton */}
          {/* Matches: p-4 bg-muted/20 rounded-lg border */}
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-muted/20 space-y-3">
            <Skeleton className="h-7 w-3/4 md:w-1/2 bg-primary/10" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Quran Script Skeleton */}
          {/* Simulating Right-to-Left Arabic text lines (text-3xl/4xl) */}
          <div className="space-y-6 pt-4" dir="rtl">
            <div className="flex flex-wrap gap-3 justify-start">
              {/* We use multiple skeletons to look like words/verses wrapping */}
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-[92%]" />
              <Skeleton className="h-10 w-[95%]" />
              <Skeleton className="h-10 w-[85%]" />
              <Skeleton className="h-10 w-[60%]" />
            </div>
          </div>
        </div>

        {/* Footer Actions Skeleton */}
        {/* Matches: fixed bottom-0 left-0 right-0 p-4 border-t */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex items-center justify-center gap-4">
          {/* Audio Player Button Placeholder */}
          <Skeleton className="h-10 w-10 rounded-md" />

          {/* Advance Button Placeholder */}
          <Skeleton className="h-11 w-[150px] rounded-md" />
        </div>
      </main>
    </div>
  );
}
