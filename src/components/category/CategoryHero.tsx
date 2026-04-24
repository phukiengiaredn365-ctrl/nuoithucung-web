import Link from "next/link";
import { ChevronRight, PawPrint } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function CategoryHero({
  title,
  description,
  crumbs = [],
  filters,
  activeFilter,
  baseHref,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  filters?: { slug: string; label: string }[];
  activeFilter?: string;
  baseHref?: string;
}) {
  return (
    <section className="bg-brand-azure/60">
      <div className="container-page py-10 md:py-14">
        {crumbs.length ? (
          <nav aria-label="Breadcrumbs" className="text-xs text-ink-500">
            <ol className="flex flex-wrap items-center gap-1">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-brand-teal">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink-700">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <ChevronRight className="h-3 w-3 text-ink-300" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <h1 className="mt-4 flex items-center gap-3 font-serif text-4xl font-bold text-brand-brown md:text-5xl">
          {title}
          <PawPrint className="h-7 w-7 text-brand-orange" aria-hidden />
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-ink-500 md:text-base">
            {description}
          </p>
        ) : null}

        {filters?.length ? (
          <div className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto">
            {filters.map((f) => {
              const isActive = f.slug === activeFilter;
              const href = `${baseHref ?? ""}#${f.slug}`;
              return (
                <Link
                  key={f.slug}
                  id={f.slug}
                  href={href}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
                    isActive
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-ink-200 bg-white text-ink-700 hover:border-brand-teal hover:text-brand-teal"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
