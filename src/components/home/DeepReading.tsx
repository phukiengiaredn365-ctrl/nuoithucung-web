import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import type { Post } from "@/lib/types";

export default function DeepReading({
  feature,
  news,
  event,
}: {
  feature: Post;
  news: Post;
  event: Post;
}) {
  return (
    <section
      aria-labelledby="deep-reading-heading"
      className="container-page grid gap-4 py-8 md:grid-cols-3 lg:gap-6"
    >
      <h2 id="deep-reading-heading" className="sr-only">
        Deep Reading
      </h2>

      {/* Main feature */}
      <article className="card overflow-hidden md:col-span-2">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center gap-4 p-6 md:order-1 md:p-8">
            <Tag label="Deep Reading" />
            <Link
              href={`/bai-viet/${feature.slug}`}
              className="font-serif text-3xl font-bold leading-[1.15] text-brand-brown hover:text-brand-teal md:text-[34px]"
            >
              {feature.title}
            </Link>
            {feature.excerpt ? (
              <p className="text-sm leading-relaxed text-ink-500">
                {feature.excerpt}
              </p>
            ) : null}
            <div className="mt-1 flex items-center gap-2 text-xs text-ink-500">
              <Image
                src={feature.author.avatarUrl}
                alt={feature.author.name}
                width={26}
                height={26}
                className="h-[26px] w-[26px] rounded-full object-cover"
              />
              <span className="font-medium text-ink-700">
                {feature.author.name}
              </span>
              <span className="text-ink-300">•</span>
              <span>{feature.displayDate}</span>
            </div>
            <Link
              href={`/bai-viet/${feature.slug}`}
              className="btn-ghost mt-2 text-brand-teal"
            >
              Đọc tiếp <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 relative aspect-[4/3] md:order-2 md:aspect-auto">
            <Image
              src={feature.imageUrl}
              alt={feature.imageAlt ?? feature.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </article>

      {/* Sidebar — Tin tức + Sự kiện */}
      <div className="grid gap-4 md:col-span-1 lg:gap-6">
        <SidebarCard post={news} tagLabel="Tin tức" />
        <SidebarCard post={event} tagLabel="Sự kiện" />
      </div>
    </section>
  );
}

function SidebarCard({ post, tagLabel }: { post: Post; tagLabel: string }) {
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt ?? post.title}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3">
          <Tag label={tagLabel} />
        </div>
      </div>
      <div className="p-4">
        <Link
          href={`/bai-viet/${post.slug}`}
          className="font-serif text-lg font-semibold leading-snug text-brand-brown hover:text-brand-teal"
        >
          {post.title}
        </Link>
        <p className="mt-2 text-xs text-ink-400">{post.displayDate}</p>
      </div>
    </article>
  );
}
