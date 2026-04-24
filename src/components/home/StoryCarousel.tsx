"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Story } from "@/lib/types";

export default function StoryCarousel({ stories }: { stories: Story[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  function scrollBy(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-story-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section aria-label="Story carousel" className="relative">
      <div className="container-page">
        <div className="relative">
          <div
            ref={scrollerRef}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-5 sm:gap-4"
          >
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>

          <button
            type="button"
            aria-label="Story trước"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className="absolute left-[-6px] top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-700 shadow-lift transition disabled:opacity-0 md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Story kế tiếp"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className="absolute right-[-6px] top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-700 shadow-lift transition disabled:opacity-0 md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <a
      data-story-card
      href={`#story-${story.id}`}
      aria-label={`Mở story: ${story.title}`}
      className="group relative aspect-[9/16] w-[44vw] shrink-0 snap-start overflow-hidden rounded-xl bg-ink-200 shadow-card sm:w-[30vw] md:w-[22vw] lg:w-[180px]"
    >
      <Image
        src={story.imageUrl}
        alt={story.imageAlt ?? story.title}
        fill
        sizes="(min-width: 1024px) 180px, (min-width: 768px) 22vw, 44vw"
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-brand-brown">
        <Play className="h-3.5 w-3.5 translate-x-[1px]" />
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 text-white">
        <Image
          src={story.author.avatarUrl}
          alt={story.author.name}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover ring-2 ring-white/90"
        />
        <div className="leading-tight">
          <p className="text-[12px] font-semibold">{story.title}</p>
          <p className="text-[11px] text-white/85">{story.subtitle}</p>
        </div>
      </div>
    </a>
  );
}
