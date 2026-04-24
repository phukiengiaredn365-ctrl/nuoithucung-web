import type { MenuItem } from "./types";

/**
 * Symmetrical top-nav per SRS §2. The dog + cat mega-menus share the
 * same 5 categories so users form a consistent mental model of the site.
 *
 * Sub-item hrefs intentionally use hash anchors on the parent category
 * route rather than nested subroutes, so they work today against the
 * single parent `page.tsx` for each category and degrade gracefully
 * once WPGraphQL subcategory fetchers are wired up.
 */
export const PRIMARY_MENU: MenuItem[] = [
  {
    label: "Góc Cún Cưng",
    href: "/goc-cun-cung",
    children: [
      { label: "Dinh dưỡng", href: "/goc-cun-cung#dinh-duong" },
      { label: "Sức khỏe", href: "/goc-cun-cung#suc-khoe" },
      { label: "Vệ sinh", href: "/goc-cun-cung#ve-sinh" },
      { label: "Huấn luyện", href: "/goc-cun-cung#huan-luyen" },
      { label: "Phụ kiện", href: "/goc-cun-cung#phu-kien" },
    ],
  },
  {
    label: "Góc Mèo Cưng",
    href: "/goc-meo-cung",
    children: [
      { label: "Dinh dưỡng", href: "/goc-meo-cung#dinh-duong" },
      { label: "Sức khỏe", href: "/goc-meo-cung#suc-khoe" },
      { label: "Vệ sinh", href: "/goc-meo-cung#ve-sinh" },
      { label: "Huấn luyện", href: "/goc-meo-cung#huan-luyen" },
      { label: "Phụ kiện", href: "/goc-meo-cung#phu-kien" },
    ],
  },
  {
    label: "Pet Tech",
    href: "/pet-tech",
    children: [
      { label: "Ăn uống thông minh", href: "/pet-tech#an-uong-thong-minh" },
      { label: "Vệ sinh tự động", href: "/pet-tech#ve-sinh-tu-dong" },
      { label: "Giám sát", href: "/pet-tech#giam-sat" },
    ],
  },
  {
    label: "Cẩm nang",
    href: "/cam-nang",
    children: [
      { label: "Mẹo nuôi Pet", href: "/cam-nang#meo-nuoi-pet" },
      { label: "Tin tức", href: "/cam-nang#tin-tuc" },
    ],
  },
  {
    label: "Săn Deal",
    href: "/san-deal",
    children: [
      { label: "Mã giảm giá", href: "/san-deal#ma-giam-gia" },
      { label: "Flash Sale", href: "/san-deal#flash-sale" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" as const },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" as const },
  { label: "TikTok", href: "https://tiktok.com/", icon: "music" as const },
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" as const },
];
