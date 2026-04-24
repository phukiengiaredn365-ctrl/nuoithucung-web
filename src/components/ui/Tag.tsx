import { categoryLabel } from "@/lib/categories";
import type { Category } from "@/lib/types";

export type TagTone = "teal" | "brown" | "orange" | "yellow";

const TONE: Record<TagTone, string> = {
  teal: "bg-brand-teal text-white",
  brown: "bg-brand-brown text-white",
  orange: "bg-brand-orange text-white",
  yellow: "bg-brand-yellow text-ink-900",
};

export default function Tag({
  category,
  label,
  tone = "teal",
  className = "",
}: {
  category?: Category;
  label?: string;
  tone?: TagTone;
  className?: string;
}) {
  const text = label ?? (category ? categoryLabel(category) : "");
  return <span className={`pill ${TONE[tone]} ${className}`}>{text}</span>;
}
