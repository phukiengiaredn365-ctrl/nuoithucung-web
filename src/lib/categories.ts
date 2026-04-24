import type { Category, CategoryMeta } from "./types";

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  cho: { slug: "cho", label: "Chó", tone: "teal" },
  meo: { slug: "meo", label: "Mèo", tone: "teal" },
  "pet-tech": { slug: "pet-tech", label: "Pet Tech", tone: "teal" },
  "cham-soc": { slug: "cham-soc", label: "Chăm sóc", tone: "teal" },
  "dinh-duong": { slug: "dinh-duong", label: "Dinh dưỡng", tone: "teal" },
  "huan-luyen": { slug: "huan-luyen", label: "Huấn luyện", tone: "teal" },
  "suc-khoe": { slug: "suc-khoe", label: "Sức khỏe", tone: "teal" },
  "cong-dong": { slug: "cong-dong", label: "Cộng đồng", tone: "teal" },
  "tin-tuc": { slug: "tin-tuc", label: "Tin tức", tone: "teal" },
  "su-kien": { slug: "su-kien", label: "Sự kiện", tone: "teal" },
  "deep-reading": { slug: "deep-reading", label: "Deep Reading", tone: "teal" },
};

export function categoryLabel(c: Category): string {
  return CATEGORY_META[c]?.label ?? c;
}
