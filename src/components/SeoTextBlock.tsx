interface SeoTextBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SeoTextBlock({ title, children, className = "" }: SeoTextBlockProps) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
        <div className="prose-navy mt-6 space-y-4 text-base leading-relaxed text-navy/80">
          {children}
        </div>
      </div>
    </section>
  );
}
