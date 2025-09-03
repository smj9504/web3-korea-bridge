import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section className={cn('py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white', className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {badge ? (
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 rounded-full backdrop-blur-sm">
              {badge}
            </span>
          ) : (
            <div className="mb-6 h-10"></div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}