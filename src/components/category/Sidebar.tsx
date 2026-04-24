import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import ProductCard from "@/components/ui/ProductCard";
import type { Post, Product } from "@/lib/types";
import type { MenuItem } from "@/lib/types";

export default function Sidebar({
  popular,
  featuredProduct,
  otherCategories,
}: {
  popular: Post[];
  featuredProduct: Product;
  otherCategories: MenuItem[];
}) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="font-serif text-xl font-bold text-brand-brown">
          Bài viết nổi bật
        </h3>
        <ul className="mt-4 space-y-4">
          {popular.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/bai-viet/${p.slug}`}
                className="group flex gap-3"
              >
                <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                  <Image
                    src={p.imageUrl}
                    alt={p.imageAlt ?? p.title}
                    fill
                    sizes="96px"
                    className="object-cover transition group-hover:scale-[1.05]"
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <Tag category={p.category} className="self-start" />
                  <span className="font-serif text-sm font-semibold leading-snug text-brand-brown line-clamp-3 group-hover:text-brand-teal">
                    {p.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-serif text-xl font-bold text-brand-brown">
          Sản phẩm được yêu thích
        </h3>
        <div className="mt-4">
          <ProductCard product={featuredProduct} source="sidebar" />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl font-bold text-brand-brown">
          Danh mục khác
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          {otherCategories.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex items-center justify-between rounded-lg border border-ink-100 px-4 py-3 text-ink-700 transition hover:border-brand-teal hover:text-brand-teal"
              >
                <span>{c.label}</span>
                <ArrowRight className="h-4 w-4 text-ink-300 transition group-hover:text-brand-teal" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
