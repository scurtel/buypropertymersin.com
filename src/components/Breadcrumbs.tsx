import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-light py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-muted">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <span className="text-beige-dark">/</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-navy">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-gold">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
