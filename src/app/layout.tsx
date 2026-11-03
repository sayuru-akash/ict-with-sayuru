import type { Viewport } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import "./fonts.css";
import "./globals.css";
import { SITE_JSON_LD, ROOT_METADATA } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563eb",
  colorScheme: "light",
};

export const metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si-LK">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preload" as="font" href="/fonts/Sinhala_Sangam_MN/SinhalaSangamMN-Bold.woff2" type="font/woff2" crossOrigin="anonymous" />
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
        <StructuredData data={SITE_JSON_LD} />
      </head>
      <body>
        <AuthProvider>
          <Toaster
            position="top-center"
            expand={false}
            visibleToasts={4}
            gap={8}
            toastOptions={{
              classNames: {
                toast:
                  "di-toast group !font-sans !rounded-full !border !border-white/[0.08] !bg-zinc-900/95 !backdrop-blur-2xl !text-white !shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.04)] !px-5 !py-3 !gap-3 !w-auto !min-w-[200px] !max-w-[360px]",
                title:
                  "!text-[13px] !font-semibold !text-white !leading-snug",
                description: "!text-[11px] !text-zinc-400 !leading-snug",
                icon: "!mt-0 !shrink-0",
                closeButton:
                  "!rounded-full !bg-white/10 !border-white/10 !text-white",
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
