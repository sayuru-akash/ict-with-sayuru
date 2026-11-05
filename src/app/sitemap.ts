import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { LEARNING_PAGES } from "@/lib/learning-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  // Content dates, not build dates. Keep unchanged policies on their actual revision date.
  const learningUpdated = new Date("2026-11-05T00:00:00+05:30");
  const policyUpdated = new Date("2026-11-03T00:00:00+05:30");
  return [
    { url: `${SITE.url}/`, lastModified: learningUpdated, images: [`${SITE.url}${SITE.profilePortrait}`, `${SITE.url}/images/sayuru-amarasinghe-social.webp`] },
    ...LEARNING_PAGES.map(page => ({ url: `${SITE.url}${page.path}`, lastModified: learningUpdated })),
    { url: `${SITE.url}/privacy-policy`, lastModified: policyUpdated },
    { url: `${SITE.url}/refund-policy`, lastModified: policyUpdated },
    { url: `${SITE.url}/terms-and-conditions`, lastModified: policyUpdated },
  ];
}
