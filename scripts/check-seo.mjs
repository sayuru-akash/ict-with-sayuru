import assert from "node:assert/strict";

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/+$/, "");
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://ict.sayuru.me").replace(/\/+$/, "");
const learningRoutes = ["/al-ict", "/ol-ict", "/ol-20-day-plan", "/about-sayuru-amarasinghe"];
const routes = ["/", ...learningRoutes, "/privacy-policy", "/refund-policy", "/terms-and-conditions"];
const decode = value => value.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const titles = new Set();
const descriptions = new Set();

for (const route of routes) {
  const response = await fetch(`${base}${route}`, { headers: { "User-Agent": "Googlebot" } });
  assert.equal(response.status, 200, `${route} must return HTTP 200`);
  const html = await response.text();
  const head = html.match(/<head>(.*?)<\/head>/s)?.[1] || "";
  assert.equal([...head.matchAll(/<title>/g)].length, 1, `${route}: requires one document title`);
  const title = decode(head.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  assert(title.includes("Sayuru Amarasinghe"), `${route}: brand missing from title`);
  assert(!titles.has(title), `${route}: duplicate title`);
  titles.add(title);
  const metaTags = [...head.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = key => metaTags.filter(tag => tag.name === key || tag.property === key);
  assert.equal(meta("description").length, 1, `${route}: requires one description`);
  const description = meta("description")[0].content;
  assert(description.length > 50 && !descriptions.has(description), `${route}: description must be useful and unique`);
  descriptions.add(description);
  const links = [...head.matchAll(/<link\s[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonicals = links.filter(tag => tag.rel === "canonical");
  assert.equal(canonicals.length, 1, `${route}: requires one canonical`);
  assert.equal(new URL(canonicals[0].href).href, new URL(`${origin}${route}`).href);
  assert.equal(new URL(meta("og:url")[0]?.content).href, new URL(`${origin}${route}`).href);
  assert.equal(meta("og:title")[0]?.content, title);
  assert.equal(meta("twitter:title")[0]?.content, title);
  const imageUrl = meta("og:image")[0]?.content;
  assert(imageUrl?.startsWith(origin), `${route}: absolute social image required`);
  assert.equal((await fetch(`${base}${new URL(imageUrl).pathname}`)).status, 200);
  assert(!meta("robots").some(tag => /noindex/.test(tag.content)), `${route}: public page must be indexable`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${route}: requires one h1`);
  assert(!/pasindu|athukorala|94781262001/i.test(html), `${route}: obsolete identity found`);
  const objects = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(([, json]) => JSON.parse(json));
  const nodes = objects.flatMap(value => value["@graph"] || [value]);
  assert(nodes.some(node => node["@type"] === "Person" && node.name === "Sayuru Amarasinghe"));
  assert(!nodes.some(node => ["Review", "AggregateRating", "FAQPage"].includes(node["@type"])), `${route}: unexpected review, rating, or retired FAQ rich-result markup`);
  const courses = nodes.filter(node => node["@type"] === "Course");
  if (route === "/") {
    assert.equal(courses.length, 2, "Homepage must describe A/L and O/L courses");
    for (const id of ["al-ict", "ol-ict", "programmes", "testimonials", "ol-20-day-plan"]) assert(html.includes(`id="${id}"`), `Missing visible ${id} section`);
    assert(courses.some(course => course.educationalLevel.includes("Ordinary")));
    assert(/<a[^>]*href="#flow"[^>]*>\s*Join Online Classes/.test(html), "Hero join button must lead to the class section");
    const classSection = html.match(/<section id="flow"[\s\S]*?<\/section>/)?.[0] || "";
    const classTitles = [...classSection.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)].map(([, text]) => decode(text));
    assert.deepEqual(classTitles, ["O/L ICT 20 Day Plan", "2027 A/L ICT - Online", "2028 A/L ICT - Online", "O/L ICT - Online"], "Class cards must show the plan first and the three current enquiry options");
    assert(!classSection.includes("2026 A/L") && !classSection.includes("View Class"), "Retired A/L card and schedule controls must stay absent");
    assert(classSection.includes("Rs. 3,000"), "20 Day Plan must show the owner-supplied total fee");
    assert(!html.includes('id="results"') && !html.includes('href="#results"'), "Removed results section must stay absent");
    for (const path of learningRoutes) assert(html.includes(`href="${path}"`), `Homepage must link to ${path}`);
    assert(/A\/L.*O\/L/.test(title) && /ICT.*Sri Lanka/.test(title), "Homepage title must describe the exam levels and country");
  } else if (learningRoutes.includes(route)) {
    assert.equal(courses.length, route === "/about-sayuru-amarasinghe" ? 0 : 1, `${route}: only the relevant course belongs on its detail page`);
    assert(nodes.some(node => node["@type"] === "BreadcrumbList" && node.itemListElement?.length === 2));
    assert(html.includes('id="main-content" lang="en-LK"'), `${route}: primary language must be declared`);
    assert(!head.includes("/images/hero/hero-shape"), `${route}: homepage-only preloads must not leak onto detail pages`);
    assert(html.includes('href="/#programmes"'), `${route}: cross-route section links must be crawlable without JavaScript`);
    for (const course of courses) {
      assert.equal(course.url, `${origin}${route}`);
      assert.equal(course["@id"], `${origin}${route}#course`);
      assert(!course.hasCourseInstance.courseWorkload, "Programme calendar length must not be presented as study workload");
    }
    if (route === "/ol-20-day-plan") {
      assert.equal(courses[0].offers.price, 3000);
      assert.equal(courses[0].offers.priceCurrency, "LKR");
      assert.equal(courses[0].offers.url, "https://wa.link/1qdj47");
      assert(html.includes("8 short notes") && html.includes("5 years"), "Plan must include the owner-supplied study materials");
    } else {
      assert(courses.every(course => !course.offers), `${route}: don't invent fees for regular classes`);
    }
    if (route === "/about-sayuru-amarasinghe") assert(nodes.some(node => node["@type"] === "AboutPage" && node.mainEntity?.["@id"] === `${origin}/#teacher`));
  } else {
    assert.equal(courses.length, 0, `${route}: legal pages must not contain course markup`);
    assert(nodes.some(node => node["@type"] === "WebPage" && node.breadcrumb?.itemListElement?.length === 2));
  }
  const person = nodes.find(node => node["@type"] === "Person");
  assert.equal(person.url, `${origin}/about-sayuru-amarasinghe`);
  assert(!JSON.stringify(person.hasCredential).includes("MSc"), "Ongoing MSc must not be an awarded credential");
  assert(!metaTags.some(tag => tag.name === "keywords"), "Avoid keyword stuffing metadata");
  console.log(`PASS ${route}: title, description, canonical, social previews, headings, identity and structured data`);
}

const auth = await (await fetch(`${base}/auth/callback`, { headers: { "User-Agent": "Googlebot" } })).text();
assert([...auth.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => attributes(tag)).some(tag => tag.name === "robots" && /noindex/.test(tag.content)), "Auth callback must have noindex");
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const route of routes) assert(sitemap.includes(`<loc>${origin}${route}</loc>`));
assert(!sitemap.includes("/auth/"));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!robots.includes("Disallow: /auth"), "Crawlers must be able to read auth noindex");
console.log("PASS sitemap, robots and authentication indexing rules");

const missing = await fetch(`${base}/not-a-real-page-seo-check`);
assert.equal(missing.status, 404, "Unknown URLs must return a genuine 404");
assert((await missing.text()).includes('name="robots" content="noindex"'), "404 must be noindex");
const withQuery = await (await fetch(`${base}/ol-ict?utm_source=seo-check`)).text();
assert(withQuery.includes(`rel="canonical" href="${origin}/ol-ict"`), "Tracking parameters must not create a second canonical");
console.log("PASS genuine 404/noindex and tracking-parameter canonical");
