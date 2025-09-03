'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    label: string;
    count: number;
  }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  locale: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  locale,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isKorean = locale === 'ko';

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium">{isKorean ? '카테고리 필터' : 'Filter by Category'}</span>
      </button>

      {/* Filter Options */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-2`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {isKorean ? '카테고리' : 'Categories'}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            {isKorean ? '전체' : 'All'}
            <span className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-white/20">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </span>
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              {category.label}
              {category.count > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-white/20">
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeCategory !== 'all' && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{isKorean ? '필터 적용됨:' : 'Filtered by:'}</span>
          <span className="font-medium text-primary-600 dark:text-primary-400">
            {categories.find(cat => cat.id === activeCategory)?.label}
          </span>
          <button
            onClick={() => onCategoryChange('all')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline text-xs"
          >
            {isKorean ? '초기화' : 'Clear'}
          </button>
        </div>
      )}
    </div>
  );
}