import CategoryHero from "@/components/category/CategoryHero";
import FeaturedPost from "@/components/category/FeaturedPost";
import PostGrid from "@/components/category/PostGrid";
import Sidebar from "@/components/category/Sidebar";
import { MOCK_DEEP_READING, MOCK_MAGAZINE_POSTS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { PRIMARY_MENU } from "@/lib/menu";

const FILTERS = [
  { slug: "an-uong-thong-minh", label: "Ăn uống thông minh" },
  { slug: "ve-sinh-tu-dong", label: "Vệ sinh tự động" },
  { slug: "giam-sat", label: "Giám sát" },
];

export const metadata = {
  title: "Pet Tech — Thiết bị thông minh cho thú cưng",
  description:
    "Review & so sánh thiết bị công nghệ cho thú cưng: máy lọc nước, khay vệ sinh tự động, camera giám sát.",
};

export default function PetTechPage() {
  const posts = MOCK_MAGAZINE_POSTS.filter((p) => p.category === "pet-tech");
  const featured = MOCK_DEEP_READING;
  const popular = MOCK_MAGAZINE_POSTS.slice(0, 4);
  const otherCategories = PRIMARY_MENU.filter(
    (m) => m.href !== "/pet-tech"
  ).map((m) => ({ ...m, children: undefined }));

  return (
    <>
      <CategoryHero
        title="Pet Tech"
        description="Công nghệ chăm Pet hiện đại — so sánh, review và hướng dẫn sử dụng dễ hiểu cho Sen không rành kỹ thuật."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Pet Tech" },
        ]}
        filters={FILTERS}
        baseHref="/pet-tech"
      />

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-10 lg:col-span-2">
          <FeaturedPost post={featured} />
          <PostGrid posts={posts.length ? posts : MOCK_MAGAZINE_POSTS.slice(0, 6)} />
        </div>
        <Sidebar
          popular={popular}
          featuredProduct={MOCK_PRODUCTS[0]}
          otherCategories={otherCategories}
        />
      </div>
    </>
  );
}
