import CategoryHero from "@/components/category/CategoryHero";
import FeaturedPost from "@/components/category/FeaturedPost";
import PostGrid from "@/components/category/PostGrid";
import Sidebar from "@/components/category/Sidebar";
import { MOCK_DEEP_READING, MOCK_MAGAZINE_POSTS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { PRIMARY_MENU } from "@/lib/menu";

const FILTERS = [
  { slug: "dinh-duong", label: "Dinh dưỡng" },
  { slug: "suc-khoe", label: "Sức khỏe" },
  { slug: "ve-sinh", label: "Vệ sinh" },
  { slug: "huan-luyen", label: "Huấn luyện" },
  { slug: "phu-kien", label: "Phụ kiện" },
];

export const metadata = {
  title: "Góc Cún Cưng — Dinh dưỡng, Sức khỏe, Huấn luyện",
  description:
    "Kiến thức, review và deal chọn lọc dành cho Sen nuôi cún cưng. Cập nhật mỗi tuần.",
};

export default function GocCunCungPage() {
  const posts = MOCK_MAGAZINE_POSTS.filter((p) =>
    ["cho", "dinh-duong", "cham-soc", "huan-luyen", "suc-khoe"].includes(
      p.category
    )
  );
  const featured = MOCK_DEEP_READING;
  const popular = MOCK_MAGAZINE_POSTS.slice(0, 4);
  const otherCategories = PRIMARY_MENU.filter(
    (m) => m.href !== "/goc-cun-cung"
  ).map((m) => ({ ...m, children: undefined }));

  return (
    <>
      <CategoryHero
        title="Góc Cún Cưng"
        description="Mọi thứ Sen cần biết để cún luôn khỏe, vui và ngoan — được tổng hợp và kiểm chứng bởi đội ngũ PetCare."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Góc Cún Cưng" },
        ]}
        filters={FILTERS}
        baseHref="/goc-cun-cung"
      />

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-10 lg:col-span-2">
          <FeaturedPost post={featured} />
          <PostGrid posts={posts.slice(0, 6)} />
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
