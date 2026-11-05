import { HomePage } from "@/components/HomePage";
import { StructuredData } from "@/components/StructuredData";
import { HOME_JSON_LD } from "@/lib/seo";

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-shape-mobile.webp"
        media="(max-width: 1279px)"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-shape.webp"
        media="(min-width: 1280px)"
        fetchPriority="low"
      />
      <link
        rel="preload"
        as="image"
        href="/images/sayuru-amarasinghe-1024.avif"
        type="image/avif"
        imageSrcSet="/images/sayuru-amarasinghe-480.avif 480w, /images/sayuru-amarasinghe-768.avif 768w, /images/sayuru-amarasinghe-1024.avif 1024w"
        imageSizes="(min-width: 1280px) 516px, (min-width: 468px) 420px, calc(100vw - 48px)"
        fetchPriority="high"
      />
      <StructuredData data={HOME_JSON_LD} />
      <HomePage />
    </>
  );
}
