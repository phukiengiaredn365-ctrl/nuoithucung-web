export type Category =
  | "cho"
  | "meo"
  | "pet-tech"
  | "cham-soc"
  | "dinh-duong"
  | "huan-luyen"
  | "suc-khoe"
  | "cong-dong"
  | "tin-tuc"
  | "su-kien"
  | "deep-reading";

export type CategoryMeta = {
  slug: Category;
  label: string;
  tone: "teal" | "brown" | "orange" | "yellow";
};

export type Author = {
  name: string;
  avatarUrl: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  imageAlt?: string;
  category: Category;
  author: Author;
  date: string; // ISO or display
  displayDate?: string; // pretty VN date e.g. "20 Thg 5, 2024"
  featured?: boolean;
  readMinutes?: number;
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt?: string;
  author: Author;
  videoUrl?: string;
  productSlugs?: string[];
};

export type Product = {
  slug: string;
  name: string;
  imageUrl: string;
  priceVnd: number;
  salePriceVnd?: number;
  affiliateUrl: string; // canonical https fallback
  shopeeAppUrl?: string; // deep link for Shopee app
  tiktokAppUrl?: string;
  rating?: number;
  badge?: "new" | "sale" | "hot";
};

export type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};
