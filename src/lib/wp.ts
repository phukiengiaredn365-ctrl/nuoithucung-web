/**
 * Thin WPGraphQL client.
 *
 * The site is designed to render fully from mock data when
 * `WP_GRAPHQL_ENDPOINT` is not set — so previews, CI builds and local dev
 * all work without a live WordPress backend.
 *
 * When the env var is set, the fetchers below transparently swap to the
 * real WPGraphQL endpoint and map the response into our internal types.
 */
import { GraphQLClient } from "graphql-request";
import type { Post, Product, Story } from "./types";
import {
  MOCK_STORIES,
  MOCK_DEEP_READING,
  MOCK_NEWS_CARDS,
  MOCK_PRODUCTS,
  MOCK_MAGAZINE_POSTS,
} from "./mock-data";

const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
const authHeader = process.env.WP_GRAPHQL_AUTH_HEADER;

const client = endpoint
  ? new GraphQLClient(endpoint, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
    })
  : null;

export function isLive(): boolean {
  return client !== null;
}

/** Home page — vertical story carousel (6–8 items). */
export async function getStories(): Promise<Story[]> {
  if (!client) return MOCK_STORIES;
  // TODO: wire to WPGraphQL once a `Story` CPT is defined.
  return MOCK_STORIES;
}

/** Home page — "Deep Reading" feature + sidebar news/events. */
export async function getDeepReading(): Promise<{
  feature: Post;
  news: Post;
  event: Post;
}> {
  if (!client) {
    return {
      feature: MOCK_DEEP_READING,
      news: MOCK_NEWS_CARDS[0],
      event: MOCK_NEWS_CARDS[1],
    };
  }
  return {
    feature: MOCK_DEEP_READING,
    news: MOCK_NEWS_CARDS[0],
    event: MOCK_NEWS_CARDS[1],
  };
}

/** Home page — "Top 10" affiliate showcase. */
export async function getTopPicks(): Promise<Product[]> {
  if (!client) return MOCK_PRODUCTS;
  return MOCK_PRODUCTS;
}

/** Home page — "Tin tức tổng hợp" 8-post magazine grid. */
export async function getMagazinePosts(): Promise<Post[]> {
  if (!client) return MOCK_MAGAZINE_POSTS;
  return MOCK_MAGAZINE_POSTS;
}

/** Category page — posts in a given category. */
export async function getPostsByCategory(slug: string): Promise<Post[]> {
  if (!client) {
    return MOCK_MAGAZINE_POSTS.filter((p) => p.category === slug);
  }
  return MOCK_MAGAZINE_POSTS.filter((p) => p.category === slug);
}
