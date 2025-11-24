import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for FeaturesGrid component
 * Displays while lazy-loaded component is loading
 */
export function FeaturesGridSkeleton() {
  return (
    <section className="bg-white py-12 sm:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading Skeleton */}
        <div className="text-center mb-8 sm:mb-16">
          <Skeleton className="h-8 sm:h-10 w-3/4 max-w-[600px] mx-auto mb-4" />
          <Skeleton className="h-5 w-1/2 max-w-[400px] mx-auto" />
        </div>

        {/* Features Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
              <Skeleton className="h-8 w-8 mb-4 rounded" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>

        {/* CTA Section Skeleton */}
        <div className="mt-8 sm:mt-12 text-center">
          <Skeleton className="h-5 w-48 mx-auto mb-4" />
          <Skeleton className="h-12 w-48 mx-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
}

/**
 * Loading skeleton for SocialProofCTA component
 * Displays while lazy-loaded component is loading
 */
export function SocialProofSkeleton() {
  return (
    <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-12 sm:py-20 px-4">
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Testimonial Card Skeleton */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-12 rounded-2xl mb-8 sm:mb-12">
          <Skeleton className="h-10 w-10 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-[700px] mx-auto mb-3 bg-white/20" />
          <Skeleton className="h-6 w-5/6 max-w-[600px] mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-4 w-48 mx-auto mb-2 bg-white/20" />
          <Skeleton className="h-4 w-40 mx-auto mb-4 bg-white/20" />
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 bg-white/20" />
            ))}
          </div>
        </div>

        {/* Main CTA Skeleton */}
        <Skeleton className="h-10 w-3/4 max-w-[500px] mx-auto mb-4 bg-white/20" />
        <Skeleton className="h-6 w-1/2 max-w-[400px] mx-auto mb-8 bg-white/20" />
        
        {/* Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 max-w-md sm:max-w-none mx-auto">
          <Skeleton className="h-14 w-full sm:w-48 bg-white/20 rounded-lg" />
          <Skeleton className="h-14 w-full sm:w-48 bg-white/20 rounded-lg" />
        </div>

        {/* Trust Indicators Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4">
              <Skeleton className="h-6 w-6 bg-white/20" />
              <Skeleton className="h-4 w-24 bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
