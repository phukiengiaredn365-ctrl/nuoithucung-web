import PostCard from "@/components/ui/PostCard";
import type { Post } from "@/lib/types";

export default function PostGrid({
  posts,
  title = "Bài viết mới nhất",
}: {
  posts: Post[];
  title?: string;
}) {
  return (
    <section aria-label={title}>
      <h2 className="font-serif text-2xl font-bold text-brand-brown">
        {title}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
