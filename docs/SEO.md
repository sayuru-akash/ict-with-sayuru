# Search visibility plan

Reviewed on 5 November 2026. Target site: <https://ict.sayuru.me>.

The objective is qualified organic enquiries for ICT classes in Sri Lanka and recognition of Sayuru Amarasinghe's name. First position is an ambition, not an outcome a code change can guarantee. No keyword-volume, Search Console, backlink or ranking dataset was available for this audit.

## Search intent and destination

| Search intent | Destination | Information visitors can find |
| --- | --- | --- |
| ICT classes Sri Lanka, online ICT classes, ICT පන්ති | `/` | A/L and O/L choices, teacher, experiences, current class enquiries |
| A/L ICT classes online, 2027 A/L ICT, 2028 A/L ICT, උසස් පෙළ ICT | `/al-ict` | Exam years, theory/revision/paper approach, timetable and fee enquiries |
| O/L ICT classes online, සාමාන්‍ය පෙළ ICT | `/ol-ict` | Regular class enquiries, comparison with the focused plan, revision guidance |
| O/L ICT 20 Day Plan, 20 Day F to A Plan | `/ol-20-day-plan` | Duration, Rs. 3,000 full fee, 8 notes, 5 years of papers, campaign registration |
| Sayuru Amarasinghe, Sayuru ICT, සයුරු අමරසිංහ | `/about-sayuru-amarasinghe` | Stated qualifications, ongoing MSc, professional role, teaching and contacts |
| Best ICT class in Sri Lanka | Homepage and relevant programme page | Help the visitor assess programme fit using real information; don't manufacture an independent ranking |

These are intent targets, not measured keyword rankings or separate pages for every phrase. Do not create near-identical city pages for an online service, repeat keywords in every heading, buy backlinks, invent awards/results or add a hidden block of search terms.

## Implemented in the repository

- Four static, server-rendered detail pages with useful copy in the initial HTML, programme-specific questions and visible registration links.
- Unique titles, descriptions, canonical URLs and social previews for all eight public pages. The homepage uses bilingual metadata and visibly identifies the exam levels and Sri Lanka.
- Homepage and footer links expose each detail page. Navigation section links on inner pages point to real homepage fragments, even without JavaScript.
- A linked identity graph for the teacher, educational organization and website. The teacher's canonical profile URL is the dedicated about page.
- Homepage A/L and O/L course entities point to their dedicated pages. Each course page describes its own course; the plan alone publishes its confirmed offer. The about page uses `AboutPage` with the teacher as its main entity. Breadcrumbs match visible navigation.
- The reading MSc stays out of awarded-credential markup. Review wording stays unchanged; no review stars, aggregate ratings or FAQ rich-result claims were added.
- All public pages appear in the XML sitemap. Content revision dates are maintained per page group; unchanged policies retain their prior dates.
- Auth callback remains crawler-readable with `noindex`. Unknown URLs return a real 404 with `noindex`. Tracking parameters do not change the canonical.
- Responsive local AVIF/WebP images have intrinsic sizes. Homepage-only image preloads moved from the global layout to the homepage, avoiding unnecessary hero downloads on inner pages.
- A keyboard skip link leads to main content. Native question disclosures work without client JavaScript.
- The HTTP SEO gate now checks eight routes, route-specific schema, course fees, canonical handling, crawlable links, noindex and 404 behavior.

`Course` is descriptive schema. It does not promise a Google rich result. This implementation does not add a course-list carousel or use the retired Course Info feature as a ranking tactic.

## Retained owner decisions

The automatic illustrated 20 Day Plan ad still opens after four seconds, once per session, on all public pages. The owner explicitly chose to keep the full ad on 5 November 2026 after being offered a compact alternative. Its artwork, WhatsApp destination and reopening button are preserved. Google recommends smaller banners that leave content accessible, so the automatic overlay is a known page-experience tradeoff. Do not hide it only from crawlers or search visitors.

The existing Sinhala number-one headline is owner-approved marketing copy. It is not evidence of first position in Google or an independently audited national ranking. Do not extend it into invented awards or structured-data claims.

The supplied student experiences retain their exact references to CCA, data study and internships. They are general experiences, not verified claims about these particular A/L or O/L classes. Do not convert them into programme-specific endorsements or ratings.

Some inherited FAQ/policy copy refers to a future LMS/payment system. The current frontend does not implement that platform. Keep this limitation visible in the repository and obtain owner decisions before changing approved policy copy.

## Live baseline, before these changes

Read-only requests on 5 November 2026 confirmed:

| Check | Observed result |
| --- | --- |
| HTTPS homepage | HTTP 200, indexable, previous homepage title and canonical |
| HTTP homepage | Followed a redirect to HTTPS successfully |
| `robots.txt` | Allows public crawling, disallows API, declares the sitemap |
| `sitemap.xml` | The four previous public pages |
| Unknown URL | HTTP 404 and `noindex` |

This confirms basic serving behavior, not Google indexing, rich-result eligibility or rankings. The repository's new pages require deployment before Google can see them.

## Publish and validate

1. Deploy the reviewed commit through the owner's normal Vercel workflow. Keep `NEXT_PUBLIC_SITE_URL` set to `https://ict.sayuru.me` (or use its matching default). Avoid indexing a competing custom staging domain; Vercel deployment protection can keep previews private.
2. Run `npm run check:seo -- https://ict.sayuru.me` after deployment. Check that the four new routes return HTTP 200 and that the sitemap lists eight public pages.
3. Verify the domain in Google Search Console. Use the owner's DNS verification or the optional `GOOGLE_SITE_VERIFICATION` HTML token. Neither ownership nor a token can be fabricated in the repository.
4. Submit `https://ict.sayuru.me/sitemap.xml` in Search Console. Inspect the homepage and four new pages using URL Inspection, including Google's selected canonical and rendered content. Request indexing for the new pages. Submission is not an indexing guarantee.
5. Use Google's Rich Results Test for supported features such as breadcrumbs, and the Schema.org validator for the wider semantic graph. Resolve actual errors, but do not invent extra properties to obtain a badge.
6. Test the deployed pages with PageSpeed Insights. Monitor mobile field LCP, INP and CLS in Search Console when enough real-user data exists. A local Lighthouse score is a lab diagnostic, not proof of field Core Web Vitals.
7. Check Page Indexing, Manual Actions and Security Issues. Investigate excluded intended pages or unexpected indexed duplicates before generating more content.

No deploy, DNS edit, Search Console submission or external account change is included in this repository update.

## Build authority with evidence

- Keep the same name, website URL, email, phone and profile details across owner-controlled public profiles. Link to the relevant class page from genuine Facebook posts and Codezela pages where appropriate.
- Publish original teaching resources that students can use: worked questions, explanations of common mistakes and short lesson previews. Have Sayuru review subject matter and show an actual author/reviewer and meaningful revision date. Avoid a volume target that encourages generic or unchecked articles.
- Add confirmed timetable, medium of instruction, lesson samples, material access and fees to the relevant page when the owner supplies them. Do not guess these details or copy a competitor's promises.
- Ask for genuine programme-specific feedback with permission to publish. Add results only if the owner later authorizes a results section and supplies evidence. The removed results section stays removed.
- Earn relevant links through useful resources and legitimate collaborations. Do not buy links or exchange unrelated sitewide keyword links.

## Measure progress

In Search Console, use a Sri Lanka country filter and compare equivalent periods. Separate branded queries (Sayuru's name and variants) from non-branded A/L and O/L class queries. Track impressions, clicks, CTR, the pages receiving those clicks and enquiry quality. Average position is contextual and should not be treated as a universal rank for every person.

Review indexing after publication, then compare the first meaningful 28-day period with subsequent periods. Improve pages with relevant impressions but weak engagement or missing answers. Allow for exam seasonality and data volume. Track WhatsApp enquiries through the team's existing process; link clicks alone do not prove an enrolment.

## Local verification, 5 November 2026

The production build ran at `http://127.0.0.1:3107`. The Browser plugin was not available; browser QA used a named Playwright CLI session. The preview remains running at the owner's request; the test browser is closed at handoff.

| Check | Result |
| --- | --- |
| Lint, TypeScript and production build | Passed; all four detail pages are statically generated |
| HTTP SEO gate | Eight public pages, auth noindex, sitemap, robots, social assets, canonicals, schema and genuine 404 passed |
| Rendered page identity, content and framework overlay | Correct titles and content; no framework error overlay |
| Responsive content and images | All four detail pages passed at 320, 390, 768 and 1440 CSS pixels; no horizontal overflow or broken images |
| Interaction | Questions open/close; linked A/L to O/L to plan to home classes; mobile menu returns to home FAQs; logo returns home |
| Promotion and registration | Full automatic ad retained on the new plan page; campaign and enquiry hrefs checked; no message sent |
| JavaScript disabled | Plan content and native question disclosure remained usable |
| Console and local network | No browser runtime errors or failed local requests; the inherited TGS player emits its Lit deprecation warning when homepage animations load |
| Documentation and patch | Markdown checks and `git diff --check` passed |

Lighthouse 13.6.0, default mobile simulated throttling, local production build:

| Page | SEO | Accessibility | Best practices | Performance | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage | 100 | 100 | 100 | 87 | 4.1 s | 0 | 40 ms |
| O/L detail page | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |

The final audited pages had no failing accessibility audit entries. Small-text contrast and accessible link names found in earlier runs were corrected. Lighthouse scores vary with the machine and simulated conditions. The homepage's simulated LCP exceeds Google's 2.5 s good threshold; prioritize deployed field measurement and further loading work if that persists. These results are not proof of live Core Web Vitals, Google indexing, a universal ranking or complete accessibility compliance.

The content dates, credentials, programme values, original photographs, owner-supplied review JSON and campaign destination were preserved. No dependencies were changed. Existing dated dependency-audit notes remain historical; a new dependency/security audit was outside this SEO change.

Real captures are in `docs/screenshots/seo-programme-page.png` and `docs/screenshots/seo-mobile-class.png`. Temporary browser and Lighthouse artifacts were kept outside the repository in `/tmp/ict-seo-20261105/`.

## Primary references

Guidance consulted on 5 November 2026:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Interstitials and dialogs](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Getting started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
