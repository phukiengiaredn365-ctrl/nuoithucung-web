import CategoryHero from "@/components/category/CategoryHero";
import FeaturedPost from "@/components/category/FeaturedPost";
import PostGrid from "@/components/category/PostGrid";
import Sidebar from "@/components/category/Sidebar";
import { MOCK_DEEP_READING, MOCK_MAGAZINE_POSTS, MOCK_PRODUCTS } from "@/lib/mock-data";
import { PRIMARY_MENU } from "@/lib/menu";

const FILTERS = [
  { slug: "meo-nuoi-pet", label: "Mẹo nuôi Pet" },
  { slug: "tin-tuc", label: "Tin tức" },
];

export const metadata = {
  title: "Cẩm nang — Mẹo nuôi Pet & Tin tức",
  description:
    "Tổng hợp mẹo hay, kiến thức và tin tức mới nhất trong cộng đồng nuôi thú cưng tại Việt Nam.",
};

export default function CamNangPage() {
  const featured = MOCK_DEEP_READING;
  const posts = MOCK_MAGAZINE_POSTS;
  const popular = MOCK_MAGAZINE_POSTS.slice(0, 4);
  const otherCategories = PRIMARY_MENU.filter(
    (m) => m.href !== "/cam-nang"
  ).map((m) => ({ ...m, children: undefined }));

  return (
    <>
      <CategoryHero
        title="Cẩm nang"
        description="Mẹo nuôi Pet, kiến thức cơ bản đến nâng cao, và tin tức mới nhất trong cộng đồng."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Cẩm nang" },
        ]}
        filters={FILTERS}
        baseHref="/cam-nang"
      />

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-10 lg:col-span-2">
          <FeaturedPost post={featured} />
          <PostGrid posts={posts.slice(0, 6)} />
        </div>
        <Sidebar
          popular={popular}
          featuredProduct={MOCK_PRODUCTS[3]}
          otherCategories={otherCategories}
        />
      </div>
    </>
  );
}
