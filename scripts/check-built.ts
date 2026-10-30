import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { DOMParser } from "@xmldom/xmldom";
import { reports, site } from "../client/src/content/site";
import { homeGraph, reportGraph } from "./metadata";
import {
  assertFileInventory,
  assertStaticDocument,
  attribute,
  inspect,
  listFiles,
  textContent,
} from "./html";

export async function verifyArtifact(
  directory: string,
  expectedFiles: string[]
): Promise<void> {
  const actualFiles = await listFiles(directory);
  assertFileInventory(actualFiles, expectedFiles);
  const files = new Set(actualFiles);
  assert.ok(
    !actualFiles.some(file => /\.(?:m?js|tsx?)$/.test(file)),
    "No executable bundles in public output"
  );
  const visibleReports = reports.filter(report =>
    files.has(report.path.slice(1))
  );
  const pages = [
    "index.html",
    "404.html",
    "404/index.html",
    ...visibleReports.map(r => r.path.slice(1)),
  ];
  const htmlByFile = new Map(
    await Promise.all(
      pages.map(
        async file =>
          [file, await readFile(path.join(directory, file), "utf8")] as const
      )
    )
  );
  function localTarget(value: string, from: string) {
    if (/^(?:mailto:|tel:)/i.test(value)) return;
    const url = new URL(value, `${site.origin}/${from}`);
    assert.ok(
      ["https:", "http:"].includes(url.protocol),
      `Unexpected URL protocol: ${from}`
    );
    if (url.origin !== site.origin) return;
    const pathname = decodeURIComponent(url.pathname).slice(1);
    const target =
      !pathname || pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    assert.ok(files.has(target), `Missing local target ${value} in ${from}`);
    if (url.hash) {
      const html = htmlByFile.get(target);
      assert.ok(html, `Anchor links require a reviewed HTML page: ${target}`);
      assert.ok(
        inspect(html).some(
          n => attribute(n, "id") === decodeURIComponent(url.hash.slice(1))
        ),
        `Missing anchor ${value} in ${from}`
      );
    }
  }
  for (const [file, html] of htmlByFile) {
    const kind = file.startsWith("404")
      ? "404"
      : file === "index.html"
        ? "home"
        : "report";
    assertStaticDocument(html, kind);
    const nodes = inspect(html);
    const ids = nodes.map(n => attribute(n, "id")).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
    for (const node of nodes) {
      for (const key of ["href", "src"]) {
        const value = attribute(node, key);
        if (value) localTarget(value, file);
      }
      for (const key of ["srcset", "imagesrcset"]) {
        const value = attribute(node, key);
        for (const candidate of value?.split(",") ?? [])
          localTarget(candidate.trim().split(/\s+/)[0], file);
      }
    }
    const scripts = nodes.filter(n => n.tagName === "script");
    const canonical = nodes.find(
      n => n.tagName === "link" && attribute(n, "rel") === "canonical"
    );
    const main = nodes.find(n => n.tagName === "main")!;
    const title = nodes.find(n => n.tagName === "title")!;
    const heading = nodes.find(n => n.tagName === "h1")!;
    if (kind === "404") {
      assert.equal(scripts.length, 0);
      assert.ok(
        nodes.some(n => n.tagName === "a" && attribute(n, "href") === "/")
      );
      assert.notEqual(html, htmlByFile.get("index.html"));
      continue;
    }
    assert.equal(scripts.length, 1, `${file}: one schema graph`);
    const graph = JSON.parse(textContent(scripts[0]));
    assert.doesNotMatch(
      JSON.stringify(graph),
      /"(?:author|publisher|datePublished)"/
    );
    assert.equal(
      attribute(canonical!, "href"),
      kind === "home" ? `${site.origin}/` : `${site.origin}/${file}`
    );
    if (kind === "home") {
      assert.deepEqual(graph, homeGraph());
      const bio = nodes.find(n => attribute(n, "class") === "bio")!;
      const visibleBio = bio
        .childNodes!.filter(n => n.tagName === "p")
        .map(n => textContent(n))
        .join(" ");
      const person = graph["@graph"].find(
        (node: { "@type": string }) => node["@type"] === "Person"
      );
      assert.ok(person, "Homepage schema must identify a person");
      assert.equal(
        person.description,
        visibleBio,
        "Schema must match the visible bio"
      );
      for (const [key, value] of [
        ["name", "description"],
        ["property", "og:description"],
      ]) {
        const description = nodes.find(
          n => n.tagName === "meta" && attribute(n, key) === value
        )!;
        assert.equal(attribute(description, "content"), site.description);
      }
      assert.equal(textContent(title), site.name);
      assert.equal(
        textContent(heading).replace(/\s/g, ""),
        site.name.replace(/\s/g, "")
      );
      for (const id of [
        "main",
        "work",
        "writing",
        "library",
        "code",
        "contact",
        "ledger",
        "open-source",
      ])
        assert.ok(ids.includes(id), `Missing section ${id}`);
      const linkedReports = nodes
        .filter(
          n =>
            n.tagName === "a" &&
            reports.some(r => r.path === attribute(n, "href"))
        )
        .map(n => attribute(n, "href"));
      assert.deepEqual(
        linkedReports,
        visibleReports.map(r => r.path)
      );
      const posts = nodes.filter(
        n =>
          n.tagName === "a" &&
          attribute(n, "href")?.startsWith(
            "https://thelivingedge.substack.com/p/"
          )
      );
      assert.equal(new Set(posts.map(n => attribute(n, "href"))).size, 3);
      assert.doesNotMatch(
        html,
        /localhost|127\.0\.0\.1|mailai\.live|autopilotai\.live|Personal drawing set|AI Founder.*Tinkerer|Field Brief No\./i
      );
    } else {
      const report = visibleReports.find(r => r.path === `/${file}`)!;
      assert.deepEqual(graph, reportGraph(report));
      assert.equal(textContent(heading), report.title);
      assert.equal(textContent(title), `${report.title} | Philip Bankier`);
      assert.ok(
        report.revisedOn && report.citations.length,
        `${file}: editorial review incomplete`
      );
      assert.ok(
        nodes.some(
          n =>
            n.tagName === "time" &&
            attribute(n, "datetime") === report.revisedOn
        )
      );
      assert.ok(textContent(main).length > 500, `${file}: report body missing`);
      for (const citation of report.citations)
        assert.ok(
          nodes.some(
            n => n.tagName === "a" && attribute(n, "href") === citation
          ),
          `${file}: citation missing`
        );
    }
  }
  assert.equal(htmlByFile.get("404.html"), htmlByFile.get("404/index.html"));
  for (const file of actualFiles.filter(file => file.endsWith(".css"))) {
    const css = await readFile(path.join(directory, file), "utf8");
    for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      if (match[1].startsWith("data:") || match[1].startsWith("#")) continue;
      assert.ok(
        !/^https?:/.test(match[1]),
        "Styles must not depend on external assets"
      );
      localTarget(match[1], file);
    }
    assert.doesNotMatch(css, /@import\s+["']/i, "CSS imports must be bundled");
  }
  assert.equal(
    await readFile(path.join(directory, "CNAME"), "utf8"),
    "philipbankier.com\n"
  );
  const sitemap = await readFile(path.join(directory, "sitemap.xml"), "utf8");
  const xml = new DOMParser().parseFromString(sitemap, "application/xml");
  const locations = Array.from(xml.getElementsByTagName("loc")).map(
    n => n.textContent
  );
  assert.deepEqual(locations, [
    `${site.origin}/`,
    ...visibleReports.map(r => site.origin + r.path),
  ]);
  assert.equal(xml.getElementsByTagName("lastmod").length, 0);
  assert.equal(
    await readFile(path.join(directory, "robots.txt"), "utf8"),
    `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`
  );
  for (const width of [320, 640, 960, 1122]) {
    const file = path.join(directory, `assets/img/portrait-${width}.webp`);
    const info = await sharp(file).metadata();
    assert.equal(info.width, width);
    assert.ok(Math.abs(info.height! - (width * 1402) / 1122) <= 1);
    assert.ok(
      (await stat(file)).size <= 250 * 1024,
      "Portrait exceeds byte budget"
    );
  }
  const social = path.join(directory, "assets/img/social-card.jpg");
  const card = await sharp(social).metadata();
  assert.equal(card.width, 1200);
  assert.equal(card.height, 630);
  assert.ok((await stat(social)).size <= 300 * 1024);
  assert.ok(files.has("favicon.svg") && files.has("favicon-32.png"));
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const receipt = JSON.parse(
    await readFile("build/release-receipt.json", "utf8")
  );
  await verifyArtifact("dist/public", receipt.expectedFiles);
  for (const file of receipt.expectedFiles) {
    const hash = createHash("sha256")
      .update(await readFile(path.join("dist/public", file)))
      .digest("hex");
    assert.equal(
      hash,
      receipt.hashes[file],
      `Output changed after build: ${file}`
    );
  }
  console.log("Static artifact and recorded output hashes verified");
}
