import PageHeader from '@/components/ui/pageheader';
import { Container } from '@/components/layout/main-layout';
import { NewsCardSkeleton } from '@/components/ui/skeleton';

export default function NewsLoading() {
  return (
    <>
      <PageHeader
        badge="Loading..."
        title="News"
        subtitle="Loading latest news..."
      />

      <Container className="py-12">
        {/* Search and Filter Skeletons */}
        <div className="mb-8 flex gap-4 justify-between">
          <div className="h-10 w-80 bg-muted rounded-lg animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Featured News Skeleton */}
        <div className="mb-12">
          <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* News Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </>
  );
}