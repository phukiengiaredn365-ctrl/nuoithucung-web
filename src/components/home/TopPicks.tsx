import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

export default function TopPicks({ products }: { products: Product[] }) {
  return (
    <section
      aria-labelledby="top-picks-heading"
      className="bg-brand-azure/60"
    >
      <div className="container-page py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="eyebrow">Top Pick</p>
            <h2
              id="top-picks-heading"
              className="mt-2 font-serif text-[32px] font-bold leading-[1.1] text-brand-brown"
            >
              Top 10 món đồ Boss cần trong tháng này
            </h2>
            <p className="mt-3 text-sm text-ink-500">
              Được chọn lọc bởi PetCare Team
            </p>
            <Link
              href="/san-deal"
              className="btn-ghost mt-5 text-brand-teal"
            >
              Xem tất cả sản phẩm <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {products.slice(0, 5).map((p) => (
                <ProductCard key={p.slug} product={p} source="home" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
