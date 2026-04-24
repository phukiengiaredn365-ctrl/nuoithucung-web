import CategoryHero from "@/components/category/CategoryHero";
import FeaturedPost from "@/components/category/FeaturedPost";
import PostGrid from "@/components/category/PostGrid";
import Sidebar from "@/components/category/Sidebar";
import { MOCK_MAGAZINE_POSTS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { PRIMARY_MENU } from "@/lib/menu";

const FILTERS = [
  { slug: "dinh-duong", label: "Dinh dưỡng" },
  { slug: "suc-khoe", label: "Sức khỏe" },
  { slug: "ve-sinh", label: "Vệ sinh" },
  { slug: "huan-luyen", label: "Huấn luyện" },
  { slug: "phu-kien", label: "Phụ kiện" },
];

export const metadata = {
  title: "Góc Mèo Cưng — Dinh dưỡng, Sức khỏe, Huấn luyện",
  description:
    "Kiến thức chăm Boss mèo từ A–Z: pate, nhà vệ sinh, hành vi, khám bệnh.",
};

export default function GocMeoCungPage() {
  const meoPosts = MOCK_MAGAZINE_POSTS.filter((p) =>
    ["meo", "dinh-duong", "cham-soc", "huan-luyen", "suc-khoe"].includes(
      p.category
    )
  );
  const featured = meoPosts[0] ?? MOCK_MAGAZINE_POSTS[1];
  const popular = MOCK_MAGAZINE_POSTS.slice(0, 4);
  const otherCategories = PRIMARY_MENU.filter(
    (m) => m.href !== "/goc-meo-cung"
  ).map((m) => ({ ...m, children: undefined }));

  return (
    <>
      <CategoryHero
        title="Góc Mèo Cưng"
        description="Chăm Boss mèo đúng cách — từ chuyện ăn, ngủ, vệ sinh đến những hành vi kỳ lạ thường gặp."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Góc Mèo Cưng" },
        ]}
        filters={FILTERS}
        baseHref="/goc-meo-cung"
      />

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-10 lg:col-span-2">
          <FeaturedPost post={featured} />
          <PostGrid posts={meoPosts.slice(0, 6)} />
        </div>
        <Sidebar
          popular={popular}
          featuredProduct={MOCK_PRODUCTS[2]}
          otherCategories={otherCategories}
        />
      </div>
    </>
  );
}
