import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Change this only when the public page content changes, rather than on every build.
  const lastModified = new Date("2026-11-03T00:00:00+05:30");
  return [
    { url: `${SITE.url}/`, lastModified, images: [`${SITE.url}/images/sayuru-amarasinghe-original.webp`, `${SITE.url}/images/sayuru-amarasinghe-social.webp`] },
    { url: `${SITE.url}/privacy-policy`, lastModified },
    { url: `${SITE.url}/refund-policy`, lastModified },
    { url: `${SITE.url}/terms-and-conditions`, lastModified },
  ];
}
