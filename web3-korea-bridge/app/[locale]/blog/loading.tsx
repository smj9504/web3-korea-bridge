import PageHeader from '@/components/ui/pageheader';
import { Container } from '@/components/layout/main-layout';
import { BlogCardSkeleton } from '@/components/ui/skeleton';

export default function BlogLoading() {
  return (
    <>
      <PageHeader
        badge="Loading..."
        title="Blog"
        subtitle="Loading articles..."
      />

      <Container className="py-12">
        {/* Search Bar Skeleton */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* Featured Post Skeleton */}
        <div className="mb-12">
          <div className="h-80 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 flex gap-4">
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 w-24 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 w-20 bg-muted rounded-md animate-pulse"></div>
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </>
  );
}