interface MainLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function MainLayout({ children, locale }: MainLayoutProps) {
  // Header and Footer are already rendered in the root layout
  // This component just wraps the children content
  return (
    <div className="flex-1">
      {children}
    </div>
  );
}