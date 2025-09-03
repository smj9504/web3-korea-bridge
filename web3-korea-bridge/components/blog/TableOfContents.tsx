'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const t = useTranslations('blog.post');
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const extractHeadings = () => {
      const regex = /^(#{1,3})\s+(.+)$/gm;
      const matches = [...content.matchAll(regex)];
      
      return matches.map((match, index) => ({
        id: `heading-${index}`,
        text: match[2],
        level: match[1].length,
      }));
    };

    setHeadings(extractHeadings());
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        {t('tableOfContents')}
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className={cn(
              'block text-left w-full text-sm transition-all hover:text-primary',
              heading.level === 1 && 'font-semibold',
              heading.level === 2 && 'pl-4',
              heading.level === 3 && 'pl-8 text-xs',
              activeId === heading.id
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
}