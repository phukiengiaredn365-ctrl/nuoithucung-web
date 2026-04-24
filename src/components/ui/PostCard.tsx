import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import type { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="card group overflow-hidden transition hover:shadow-lift">
      <Link href={`/bai-viet/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <Tag category={post.category} />
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-ink-400">{post.displayDate}</p>
          <h3 className="mt-1.5 font-serif text-[17px] font-semibold leading-snug text-brand-brown line-clamp-3">
            {post.title}
          </h3>
        </div>
      </Link>
      <div className="flex items-center gap-2 border-t border-ink-100 px-4 py-3 text-xs text-ink-500">
        <Image
          src={post.author.avatarUrl}
          alt={post.author.name}
          width={24}
          height={24}
          className="h-6 w-6 rounded-full object-cover"
        />
        <span>{post.author.name}</span>
      </div>
    </article>
  );
}
