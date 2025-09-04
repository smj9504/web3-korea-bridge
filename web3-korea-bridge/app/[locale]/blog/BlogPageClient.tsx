'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPost } from '@/lib/blog-data';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogFilter } from '@/components/blog/BlogFilter';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogNewsletter } from '@/components/blog/BlogNewsletter';
import PageHeader from '@/components/ui/pageheader';
import { Container } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const POSTS_PER_PAGE = 9;

interface BlogPageClientProps {
  locale: 'en' | 'ko';
  initialData: {
    posts: BlogPost[];
    categories: BlogPost['category'][];
    featuredPost: BlogPost | undefined;
    totalPages: number;
    searchQuery: string;
    activeCategory: BlogPost['category'] | 'all';
    sortBy: 'latest' | 'popular' | 'featured';
    currentPage: number;
    totalItems: number;
  };
}

export function BlogPageClient({ locale, initialData }: BlogPageClientProps) {
  const t = useTranslations('blog');
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (key === 'page' && value === '1')) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset page when other filters change
    if ('q' in updates || 'category' in updates || 'sort' in updates) {
      params.delete('page');
    }

    const newUrl = `/${locale}/blog${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };

  const handleSearch = (query: string) => {
    updateSearchParams({ q: query });
  };

  const handleCategoryChange = (category: BlogPost['category'] | 'all') => {
    updateSearchParams({ category: category === 'all' ? null : category });
  };

  const handleSortChange = (sort: 'latest' | 'popular' | 'featured') => {
    updateSearchParams({ sort: sort === 'latest' ? null : sort });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  const handleClearFilters = () => {
    router.push(`/${locale}/blog`);
  };

  const {
    posts,
    categories,
    featuredPost,
    totalPages,
    searchQuery,
    activeCategory,
    sortBy,
    currentPage,
    totalItems
  } = initialData;

  return (
    <>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <Container className="py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <BlogSearch onSearch={handleSearch} defaultValue={searchQuery} />
        </div>

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              {t('search.resultsFor')} "{searchQuery}"
            </h2>
            <p className="text-muted-foreground mt-2">
              {totalItems === 0 
                ? t('search.noResults')
                : `${totalItems} ${t('pagination.articles')}`
              }
            </p>
          </div>
        )}

        {/* Featured Post (only show when not searching) */}
        {!searchQuery && featuredPost && currentPage === 1 && activeCategory === 'all' && (
          <div className="mb-12">
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <BlogFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={POSTS_PER_PAGE}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              {t('search.noResults')}
            </p>
            <Button
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20">
          <BlogNewsletter />
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('cta.description')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button 
                size="lg" 
                className="group"
                rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              >
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}