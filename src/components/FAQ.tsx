import type { FaqItem } from "@/lib/data";

interface FAQProps {
  items: FaqItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <section className="bg-gray-light py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
          {title}
        </h2>
        <dl className="mt-10 space-y-6">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-beige-dark/60 bg-white p-6"
            >
              <dt className="text-base font-semibold text-navy">
                {item.question}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-navy/70">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
