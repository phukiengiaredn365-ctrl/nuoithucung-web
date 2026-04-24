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

export const revalidate = 300; // ISR — 5 min

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
