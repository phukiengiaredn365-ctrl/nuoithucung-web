import CategoryHero from "@/components/category/CategoryHero";
import ProductCard from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const FILTERS = [
  { slug: "ma-giam-gia", label: "Mã giảm giá" },
  { slug: "flash-sale", label: "Flash Sale" },
];

export const metadata = {
  title: "Săn Deal — Mã giảm giá & Flash Sale cho thú cưng",
  description:
    "Deal hot, mã giảm giá và Flash Sale được PetCare Team cập nhật liên tục.",
};

export default function SanDealPage() {
  const products = [
    ...MOCK_PRODUCTS,
    ...MOCK_PRODUCTS.map((p) => ({
      ...p,
      slug: `${p.slug}-2`,
      badge: "sale" as const,
    })),
  ];

  return (
    <>
      <CategoryHero
        title="Săn Deal"
        description="Mã giảm giá và Flash Sale được PetCare Team cập nhật mỗi ngày. Link affiliate đã gắn sẵn để Sen mua với giá tốt nhất."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Săn Deal" },
        ]}
        filters={FILTERS}
        baseHref="/san-deal"
      />

      <div className="container-page py-10 md:py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} source="category" />
          ))}
        </div>
      </div>
    </>
  );
}
