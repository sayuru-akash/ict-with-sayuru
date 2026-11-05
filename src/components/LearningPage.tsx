import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import {
  LEARNING_PAGES,
  type LearningPage as PageContent,
} from "@/lib/learning-pages";
import { learningPageJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const textLink =
  "font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-500";

// Content stays in the server-rendered HTML. Only the shared navigation is interactive.
export function LearningPage({ page }: { page: PageContent }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StructuredData data={learningPageJsonLd(page)} />
      <Navbar />
      <main
        id="main-content"
        lang="en-LK"
        className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-8 sm:pt-36"
      >
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-700">
              {page.label}
            </li>
          </ol>
        </nav>
        <header className="grid items-center gap-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-bold tracking-widest text-blue-700 uppercase">
              Sayuru ICT · Online learning
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {page.heading}
            </h1>
            <p lang="si" className="mt-5 text-xl leading-relaxed text-blue-800">
              {page.sinhala}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              {page.intro}
            </p>
            <a
              href={page.enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              {page.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          {page.isPlan ? (
            <picture>
              <source
                type="image/avif"
                srcSet="/images/20-day-plan-promo-480.avif 480w, /images/20-day-plan-promo.avif 960w"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 360px, calc(100vw - 88px)"
              />
              <img
                src="/images/20-day-plan-promo.webp"
                width={960}
                height={640}
                alt=""
                fetchPriority="high"
                className="mx-auto h-auto w-full max-w-[360px]"
              />
            </picture>
          ) : (
            <picture>
              <source
                type="image/avif"
                srcSet="/images/sayuru-amarasinghe-profile-480.avif 480w, /images/sayuru-amarasinghe-profile-768.avif 768w"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 360px, calc(100vw - 88px)"
              />
              <img
                src="/images/sayuru-amarasinghe-profile-480.webp"
                srcSet="/images/sayuru-amarasinghe-profile-480.webp 480w, /images/sayuru-amarasinghe-profile-768.webp 768w"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 360px, calc(100vw - 88px)"
                width={1071}
                height={1071}
                alt="Sayuru Amarasinghe, online A/L and O/L ICT teacher"
                fetchPriority="high"
                className="mx-auto h-auto w-full max-w-[360px] rounded-2xl shadow-lg shadow-blue-900/10"
              />
            </picture>
          )}
        </header>
        <dl className="my-8 grid gap-4 sm:grid-cols-3">
          {page.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {fact.label}
              </dt>
              <dd className="mt-2 font-bold text-slate-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            {page.sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-slate-100 py-7 first:pt-3"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <section className="py-8" aria-labelledby="programme-questions">
              <h2
                id="programme-questions"
                className="text-2xl font-bold tracking-tight"
              >
                Questions before you join
              </h2>
              <div className="mt-5 space-y-3">
                {page.questions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-200 px-5 py-4"
                  >
                    <summary className="cursor-pointer font-semibold leading-6 text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                      {item.question}
                    </summary>
                    <p className="mt-3 leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>
          <aside
            aria-label="Teacher and programme links"
            className="space-y-6 lg:pt-3"
          >
            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-lg font-bold">Your ICT teacher</h2>
              <p className="mt-3 font-semibold">{SITE.name}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {SITE.qualifications.map((value) => (
                  <li key={value}>{value}</li>
                ))}
                <li>{SITE.role}</li>
              </ul>
              {!page.isProfile && (
                <Link
                  href="/about-sayuru-amarasinghe"
                  className={`mt-4 inline-block text-sm ${textLink}`}
                >
                  Read the teacher profile
                </Link>
              )}
            </div>
            <nav
              aria-label="Explore ICT classes"
              className="rounded-2xl border border-blue-100 p-6"
            >
              <h2 className="text-lg font-bold">Explore ICT classes</h2>
              <ul className="mt-4 space-y-4 text-sm">
                {LEARNING_PAGES.filter((other) => other.path !== page.path).map(
                  (other) => (
                    <li key={other.path}>
                      <Link href={other.path} className={textLink}>
                        {other.label}
                      </Link>
                    </li>
                  ),
                )}
                <li>
                  <Link href="/#flow" className={textLink}>
                    All online class options
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className={textLink}>
                    Student experiences
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        <section
          className="mt-4 rounded-3xl bg-blue-600 p-6 text-white sm:p-8"
          aria-label="Class enquiries"
        >
          <h2 className="text-2xl font-bold">
            Ready to discuss your ICT class?
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-blue-50">
            Contact us with your exam year and learning needs. Confirm the
            timetable, fee and joining instructions for your chosen programme.
          </p>
          <a
            href={page.enquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          >
            {page.cta}
          </a>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="underline underline-offset-4"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="break-all underline underline-offset-4"
            >
              {SITE.email}
            </a>
          </p>
          <p className="mt-5 text-xs leading-6 text-white">
            Before registering, read our{" "}
            <Link
              href="/terms-and-conditions"
              className="underline underline-offset-4"
            >
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/refund-policy"
              className="underline underline-offset-4"
            >
              refund policy
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
