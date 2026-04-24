import StoryCarousel from "@/components/home/StoryCarousel";
import DeepReading from "@/components/home/DeepReading";
import TopPicks from "@/components/home/TopPicks";
import TinTucTongHop from "@/components/home/TinTucTongHop";
import {
  getDeepReading,
  getMagazinePosts,
  getStories,
  getTopPicks,
} from "@/lib/wp";

// ISR every 5 min on standalone; disabled under `output: "export"` (Apache
// shared hosting) because static export has no server to revalidate on.
export const revalidate =
  process.env.NEXT_OUTPUT === "export" ? false : 300;

export default async function HomePage() {
  const [stories, deep, products, posts] = await Promise.all([
    getStories(),
    getDeepReading(),
    getTopPicks(),
    getMagazinePosts(),
  ]);

  return (
    <>
      <StoryCarousel stories={stories} />
      <DeepReading
        feature={deep.feature}
        news={deep.news}
        event={deep.event}
      />
      <TopPicks products={products} />
      <TinTucTongHop posts={posts} />
    </>
  );
}
