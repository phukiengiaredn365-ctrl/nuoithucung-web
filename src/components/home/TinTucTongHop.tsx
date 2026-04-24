import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/ui/PostCard";
import type { Post } from "@/lib/types";

export default function TinTucTongHop({ posts }: { posts: Post[] }) {
  return (
    <section
      aria-labelledby="news-roundup-heading"
      className="container-page py-10 md:py-14"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Kiến thức &amp; Chia sẻ</p>
          <h2
            id="news-roundup-heading"
            className="mt-2 font-serif text-[34px] font-bold leading-[1.1] text-brand-brown"
          >
            Tin tức tổng hợp
          </h2>
        </div>
        <Link href="/cam-nang/tin-tuc" className="btn-ghost shrink-0">
          Xem tất cả bài viết <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 8).map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
