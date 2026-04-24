/**
 * Affiliate "Last Click" helpers + Shopee / TikTok deep linking.
 *
 * The goal: on mobile, open the native app so the user completes the purchase
 * with the user's affiliate tag already credited. On desktop, fall back to the
 * regular https product URL.
 *
 * Last-click attribution is implemented by stamping a cookie + localStorage
 * entry on every product click, so the most recent referral wins even when
 * the user browses multiple posts before buying.
 */

export type AffiliateClickMeta = {
  productSlug: string;
  source: "home" | "category" | "post" | "sidebar" | "story";
  at: number;
};

const COOKIE_NAME = "ntc_lastclick";
const COOKIE_DAYS = 30;
const STORAGE_KEY = "ntc_lastclick_history";

export function recordLastClick(meta: AffiliateClickMeta) {
  if (typeof document === "undefined") return;
  try {
    const value = encodeURIComponent(JSON.stringify(meta));
    const expires = new Date(
      Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${COOKIE_NAME}=${value}; path=/; expires=${expires}; SameSite=Lax`;

    const prev: AffiliateClickMeta[] = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "[]"
    );
    prev.unshift(meta);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prev.slice(0, 20)));
  } catch {
    // Storage quota / privacy mode — swallow. Affiliate attribution is best-effort.
  }
}

function isMobileUA(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Given a product with optional shopee / tiktok deep links, pick the best
 * URL to navigate to. On mobile we prefer the app deep-link; on desktop we
 * always use the canonical https URL.
 */
export function resolveAffiliateUrl(product: {
  affiliateUrl: string;
  shopeeAppUrl?: string;
  tiktokAppUrl?: string;
}): string {
  if (!isMobileUA()) return product.affiliateUrl;
  return product.shopeeAppUrl ?? product.tiktokAppUrl ?? product.affiliateUrl;
}
