import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Card 1: Content Selection Skeleton */}
      <Card className="rounded-xl shadow-sm border-none">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Surah Select Skeleton */}
            <div className="flex flex-col flex-1 gap-2">
              <Skeleton className="h-5 w-16" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Select Trigger */}
            </div>

            {/* Ayah Range Skeletons */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-20" /> {/* Label */}
                <Skeleton className="h-10 w-20" /> {/* Input */}
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-20" /> {/* Label */}
                <Skeleton className="h-10 w-20" /> {/* Input */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Preferences Skeleton */}
      <Card className="rounded-xl shadow-sm border-none">
        <CardHeader>
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Reciter Select Skeleton */}
            <div className="flex flex-col flex-1 gap-2">
              <Skeleton className="h-5 w-16" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Select Trigger */}
            </div>

            {/* Repetitions Skeleton */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-20" /> {/* Input */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button Skeleton */}
      <Skeleton className="h-14 w-full rounded-md shadow-lg" />
    </div>
  );
}
