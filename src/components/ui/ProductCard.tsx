"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { recordLastClick, resolveAffiliateUrl } from "@/lib/affiliate";

function formatVnd(n: number) {
  // Vietnamese convention: "đ1.290.000"
  return `đ${n.toLocaleString("vi-VN")}`;
}

export default function ProductCard({
  product,
  source = "home",
}: {
  product: Product;
  source?: "home" | "category" | "post" | "sidebar" | "story";
}) {
  const price = product.salePriceVnd ?? product.priceVnd;

  function handleBuy(e: React.MouseEvent<HTMLAnchorElement>) {
    recordLastClick({
      productSlug: product.slug,
      source,
      at: Date.now(),
    });
    const url = resolveAffiliateUrl(product);
    // Compare against the raw source URL. `e.currentTarget.href` always
    // returns the resolved absolute URL, so comparing resolver output to it
    // would falsely trigger on relative hrefs like "#".
    if (url !== product.affiliateUrl) {
      e.preventDefault();
      window.location.href = url;
    }
  }

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square w-full overflow-hidden bg-brand-azure/40">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 160px, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
        {product.badge === "sale" ? (
          <span className="absolute left-2 top-2 rounded bg-brand-yellow px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ink-900">
            Sale
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-sm font-medium leading-snug text-ink-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-[#d0021b]">
          {formatVnd(price)}
        </p>
        <a
          href={product.affiliateUrl}
          onClick={handleBuy}
          target="_blank"
          rel="nofollow noopener sponsored"
          className="btn-primary mt-auto w-full whitespace-nowrap px-2 text-sm"
        >
          <ShoppingCart className="h-4 w-4 shrink-0" />
          Mua ngay
        </a>
      </div>
    </article>
  );
}
