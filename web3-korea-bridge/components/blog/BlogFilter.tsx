'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface BlogFilterProps {
  categories: BlogPost['category'][];
  activeCategory: BlogPost['category'] | 'all';
  onCategoryChange: (category: BlogPost['category'] | 'all') => void;
  sortBy: 'latest' | 'popular' | 'featured';
  onSortChange: (sort: 'latest' | 'popular' | 'featured') => void;
}

export function BlogFilter({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: BlogFilterProps) {
  const t = useTranslations('blog');

  const allCategories: (BlogPost['category'] | 'all')[] = ['all', ...categories];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          {t('categories.all')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={cn(
                'transition-all',
                activeCategory === category && 'shadow-md'
              )}
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          {t('filters.sortBy')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {(['latest', 'popular', 'featured'] as const).map((sort) => (
            <Button
              key={sort}
              variant={sortBy === sort ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onSortChange(sort)}
              className={cn(
                'transition-all',
                sortBy === sort && 'bg-secondary'
              )}
            >
              {t(`filters.${sort}`)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}