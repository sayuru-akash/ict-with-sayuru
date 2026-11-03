import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";

export const HOME_TITLE = "Sayuru Amarasinghe | A/L & O/L ICT Online පන්ති";
export const HOME_DESCRIPTION = "Online A/L සහ O/L ICT පන්ති සයුරු අමරසිංහ සමඟ. Theory, revision සහ past papers ඉගෙනගන්න. Join Sayuru Amarasinghe's online ICT classes in Sri Lanka.";
const SOCIAL_IMAGE = "/images/sayuru-amarasinghe-social.webp";

export function pageMetadata(title: string, description: string, path: string, locale = "en_LK"): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: {} },
    openGraph: {
      type: "website", locale, siteName: SITE.name, url, title, description,
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Sayuru Amarasinghe, online A/L and O/L ICT classes in Sri Lanka" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [SOCIAL_IMAGE] },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMetadata(HOME_TITLE, HOME_DESCRIPTION, "/", "si_LK"),
  applicationName: SITE.shortName,
  category: "education",
  authors: [{ name: SITE.name, url: `${SITE.url}/#about-teacher` }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/logos/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logos/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logos/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, title: SITE.shortName, statusBarStyle: "default" },
};

const organizationId = `${SITE.url}/#organization`;
const personId = `${SITE.url}/#teacher`;
const websiteId = `${SITE.url}/#website`;

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization", "@id": organizationId,
      name: SITE.name, alternateName: ["Sayuru ICT", "සයුරු අමරසිංහ ICT"],
      url: `${SITE.url}/`,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logos/android-chrome-512x512.png`, width: 512, height: 512 },
      image: `${SITE.url}${SOCIAL_IMAGE}`,
      description: "Online G.C.E. Advanced Level and Ordinary Level ICT classes with Sayuru Amarasinghe in Sri Lanka.",
      email: SITE.email, telephone: SITE.phoneHref,
      sameAs: [SITE.facebook],
      areaServed: { "@type": "Country", name: "Sri Lanka" },
      contactPoint: {
        "@type": "ContactPoint", contactType: "Class registration", telephone: SITE.phoneHref,
        email: SITE.email, url: SITE.whatsapp, areaServed: "LK", availableLanguage: ["Sinhala", "English"],
      },
      founder: { "@id": personId },
    },
    {
      "@type": "Person", "@id": personId,
      name: SITE.name, alternateName: "සයුරු අමරසිංහ",
      jobTitle: ["ICT Lecturer", "CEO at Codezela Technologies"],
      image: `${SITE.url}${SITE.profilePortrait}`,
      url: `${SITE.url}/#about-teacher`,
      description: `${SITE.qualifications.join(". ")}. ${SITE.role}.`,
      hasCredential: { "@type": "EducationalOccupationalCredential", name: SITE.qualifications[0], credentialCategory: "degree" },
      knowsAbout: ["Information and Communication Technology", "Software Engineering", "Cyber Security"],
      sameAs: [SITE.facebook],
      worksFor: { "@type": "Organization", name: "Codezela Technologies", url: "https://codezela.com" },
    },
    {
      "@type": "WebSite", "@id": websiteId,
      name: SITE.name, alternateName: SITE.shortName, url: `${SITE.url}/`,
      description: HOME_DESCRIPTION, publisher: { "@id": organizationId }, inLanguage: ["si-LK", "en-LK"],
    },
  ],
};

export const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage", "@id": `${SITE.url}/#webpage`, url: `${SITE.url}/`,
      name: HOME_TITLE, description: HOME_DESCRIPTION,
      isPartOf: { "@id": websiteId }, about: { "@id": personId },
      inLanguage: ["si-LK", "en-LK"],
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE.url}${SOCIAL_IMAGE}`, width: 1200, height: 630 },
      mainEntity: [{ "@id": `${SITE.url}/#al-ict` }, { "@id": `${SITE.url}/#ol-ict` }],
    },
    ...[
      { id: "al-ict", name: "G.C.E. A/L ICT Online Classes", level: "G.C.E. Advanced Level", description: "Online A/L ICT theory, revision and past-paper classes with Sayuru Amarasinghe for 2027 and 2028 students in Sri Lanka. Enquire about the timetable." },
      { id: "ol-ict", name: "G.C.E. O/L ICT Online Classes", level: "G.C.E. Ordinary Level", description: `Online O/L ICT classes with Sayuru Amarasinghe, including the ${PLAN.durationDays} Day Plan with ${PLAN.shortNotes} short notes, special theory sessions and ${PLAN.pastPaperYears} years of past-paper practice. Full 20 Day Plan fee: Rs. ${PLAN.fee.toLocaleString("en-LK")}.` },
    ].map(course => ({
      "@type": "Course", "@id": `${SITE.url}/#${course.id}`, url: `${SITE.url}/#${course.id}`,
      name: course.name, description: course.description, educationalLevel: course.level,
      teaches: "Information and Communication Technology",
      provider: { "@id": organizationId }, inLanguage: ["si-LK", "en-LK"],
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", instructor: { "@id": personId } },
    })),
  ],
};

export function legalPageJsonLd(title: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}${path}#webpage`, url: `${SITE.url}${path}`, name: title,
    isPartOf: { "@id": websiteId }, inLanguage: "en-LK",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: title, item: `${SITE.url}${path}` },
      ],
    },
  };
}
