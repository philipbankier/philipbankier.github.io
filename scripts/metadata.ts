import { site } from "../client/src/content/site";
import type { ReportRecord } from "../client/src/content/contracts";
export function homeGraph() {
  const root = `${site.origin}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${root}#website`,
        url: root,
        name: site.name,
      },
      {
        "@type": "ProfilePage",
        "@id": `${root}#webpage`,
        url: root,
        name: site.name,
        inLanguage: "en",
        isPartOf: { "@id": `${root}#website` },
        mainEntity: { "@id": `${root}#person` },
      },
      {
        "@type": "Person",
        "@id": `${root}#person`,
        name: site.name,
        url: root,
        description: site.bio,
        sameAs: [...site.sameAs],
        affiliation: {
          "@type": "Organization",
          name: site.company.name,
          url: site.company.url,
        },
        image: {
          "@type": "ImageObject",
          url: `${site.origin}/assets/img/portrait-1122.webp`,
          caption: "Illustrated portrait of Philip Bankier",
          width: 1122,
          height: 1402,
        },
      },
    ],
  };
}
export function reportGraph(report: ReportRecord) {
  const url = site.origin + report.path;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: report.title,
        inLanguage: "en",
        isPartOf: { "@id": `${site.origin}/#website` },
        mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: report.title,
        description: report.summary,
        inLanguage: "en",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        ...(report.revisedOn ? { dateModified: report.revisedOn } : {}),
        citation: report.citations.map(url => ({
          "@type": "CreativeWork",
          url,
        })),
      },
    ],
  };
}
export function jsonLd(value: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")}</script>`;
}
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );
const meta = (key: string, value: string, property = false) =>
  `<meta ${property ? "property" : "name"}="${key}" content="${escapeHtml(value)}">`;
export function homeHead(): string {
  const root = `${site.origin}/`;
  const image = `${site.origin}/assets/img/social-card.jpg`;
  return [
    `<title>${escapeHtml(site.name)}</title>`,
    meta("description", site.description),
    meta(
      "google-site-verification",
      "PH9zdRh-yeRpi21zVmiOO13jL9k4pW2fJ-N2RXpBpxQ"
    ),
    `<link rel="canonical" href="${root}">`,
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">',
    meta("theme-color", "#d3dbd4"),
    meta("og:type", "website", true),
    meta("og:site_name", site.name, true),
    meta("og:title", site.name, true),
    meta("og:description", site.description, true),
    meta("og:url", root, true),
    meta("og:image", image, true),
    meta("og:image:width", "1200", true),
    meta("og:image:height", "630", true),
    meta("og:image:alt", "Philip Bankier, work and writing", true),
    meta("twitter:card", "summary_large_image"),
    jsonLd(homeGraph()),
  ].join("\n");
}
export function reportHead(report: ReportRecord): string {
  const url = site.origin + report.path;
  return [
    `<title>${escapeHtml(report.title)} | Philip Bankier</title>`,
    meta("description", report.summary),
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    meta("og:type", "article", true),
    meta("og:title", report.title, true),
    meta("og:description", report.summary, true),
    meta("og:url", url, true),
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    jsonLd(reportGraph(report)),
  ].join("\n");
}
export function notFoundHead(): string {
  return '<title>Page not found | Philip Bankier</title>\n<meta name="robots" content="noindex">\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">';
}
