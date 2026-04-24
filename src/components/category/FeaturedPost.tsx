import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import type { Post } from "@/lib/types";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt ?? post.title}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute left-4 top-4">
          <Tag category={post.category} />
        </div>
      </div>
      <div className="p-6 md:p-8">
        <Link
          href={`/bai-viet/${post.slug}`}
          className="font-serif text-3xl font-bold leading-[1.15] text-brand-brown hover:text-brand-teal md:text-[32px]"
        >
          {post.title}
        </Link>
        {post.excerpt ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-500">
          <Image
            src={post.author.avatarUrl}
            alt={post.author.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="font-medium text-ink-700">{post.author.name}</span>
          <span className="text-ink-300">•</span>
          <span>{post.displayDate}</span>
        </div>
        <Link
          href={`/bai-viet/${post.slug}`}
          className="btn-ghost mt-5"
        >
          Đọc tiếp <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
