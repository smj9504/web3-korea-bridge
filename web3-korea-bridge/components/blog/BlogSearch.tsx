'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export function BlogSearch({ onSearch, defaultValue = '' }: BlogSearchProps) {
  const [query, setQuery] = useState(defaultValue);
  const t = useTranslations('blog.search');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
        >
          <div className="flex items-center justify-center">
            <Search className="w-4 h-4 mr-2" />
            <span>{t('button')}</span>
          </div>
        </Button>
      </div>
    </form>
  );
}