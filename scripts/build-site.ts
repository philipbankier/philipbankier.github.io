import { z } from "zod";
export const PublicationEntrySchema = z
  .object({
    path: z
      .string()
      .min(1)
      .regex(/^[A-Za-z0-9_./-]+$/)
      .refine(
        p =>
          !p.startsWith("/") &&
          !p.includes("\\") &&
          p.split("/").every(part => part && part !== "." && part !== "..")
      ),
    decision: z.enum(["include", "exclude", "pending"]),
    reviewAction: z.enum(["include", "exclude"]),
    reason: z.string().min(1),
    evidence: z.string().min(1),
  })
  .strict();
export type PublicationEntry = z.infer<typeof PublicationEntrySchema>;
export function selectPublicFiles(
  entries: PublicationEntry[],
  mode: "review" | "release"
): string[] {
  if (new Set(entries.map(e => e.path)).size !== entries.length)
    throw new Error("Duplicate publication paths");
  const pending = entries.filter(e => e.decision === "pending");
  if (mode === "release" && pending.length)
    throw new Error(
      `Unresolved publication decisions: ${pending.map(e => e.path).join(", ")}`
    );
  return entries
    .filter(
      e =>
        e.decision === "include" ||
        (mode === "review" &&
          e.decision === "pending" &&
          e.reviewAction === "include")
    )
    .map(e => e.path);
}

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { build } from "vite";
import { reports, site } from "../client/src/content/site";
import { reviewedWriting } from "../client/src/content/writing";
import { HomePropsSchema } from "../client/src/content/contracts";
import { resolveWriting } from "./newsletter";
import { assertFileInventory, listFiles, replaceSlot } from "./html";
import { homeHead, notFoundHead, reportHead } from "./metadata";
import { verifyArtifact } from "./check-built";

export async function buildSite(mode: "review" | "release"): Promise<void> {
  const root = process.cwd();
  const source = path.join(root, "client/public");
  const destination = path.join(root, "dist/public");
  const entries = z
    .array(PublicationEntrySchema)
    .parse(JSON.parse(await readFile("scripts/publication.json", "utf8")));
  assertFileInventory(
    await listFiles(source),
    entries.map(e => e.path)
  );
  const included = selectPublicFiles(entries, mode);
  const pending = entries
    .filter(e => e.decision === "pending")
    .map(e => e.path);
  if (mode === "review")
    console.log("Local review mode; pending decisions:", pending);
  const visibleReports = reports.filter(r =>
    included.includes(r.path.slice(1))
  );
  const writing = await resolveWriting(reviewedWriting);
  console.log(
    `Writing source: ${writing.source}; checked ${writing.snapshot.fetchedAt}`
  );
  const props = HomePropsSchema.parse({ writing, reports: visibleReports });
  await build({ build: { copyPublicDir: false } });
  const template = await readFile(path.join(destination, "index.html"), "utf8");
  const emitted = (await listFiles(destination)).filter(
    file => file !== "index.html"
  );
  await build({
    build: {
      ssr: path.join(root, "client/src/entry-server.tsx"),
      outDir: path.join(root, "build/render"),
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-server.js" } },
    },
  });
  const renderer = await import(
    pathToFileURL(path.join(root, "build/render/entry-server.js")).href
  );
  for (const file of included) {
    const target = path.join(destination, file);
    await mkdir(path.dirname(target), { recursive: true });
    const report = visibleReports.find(r => r.path === `/${file}`);
    if (report)
      await writeFile(
        target,
        replaceSlot(
          await readFile(path.join(source, file), "utf8"),
          "head",
          reportHead(report)
        )
      );
    else await copyFile(path.join(source, file), target);
  }
  await writeFile(
    path.join(destination, "index.html"),
    replaceSlot(
      replaceSlot(template, "head", homeHead()),
      "body",
      renderer.renderHome(props)
    )
  );
  const notFound = replaceSlot(
    replaceSlot(template, "head", notFoundHead()),
    "body",
    renderer.renderNotFound()
  );
  await writeFile(path.join(destination, "404.html"), notFound);
  await mkdir(path.join(destination, "404"), { recursive: true });
  await writeFile(path.join(destination, "404/index.html"), notFound);
  const urls = [
    `${site.origin}/`,
    ...visibleReports.map(r => site.origin + r.path),
  ];
  await writeFile(
    path.join(destination, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `<url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`
  );
  const expectedFiles = [
    ...emitted,
    ...included,
    "index.html",
    "404.html",
    "404/index.html",
    "sitemap.xml",
  ].sort();
  await verifyArtifact(destination, expectedFiles);
  const hashes = Object.fromEntries(
    await Promise.all(
      expectedFiles.map(async file => [
        file,
        createHash("sha256")
          .update(await readFile(path.join(destination, file)))
          .digest("hex"),
      ])
    )
  );
  const receipt = {
    mode,
    sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim(),
    dirty: Boolean(
      execFileSync("git", ["status", "--porcelain"], {
        encoding: "utf8",
      }).trim()
    ),
    included,
    excluded: entries.filter(e => !included.includes(e.path)).map(e => e.path),
    pending,
    expectedFiles,
    hashes,
    writing,
    checks: { artifact: "passed" },
  };
  await mkdir("build", { recursive: true });
  await writeFile(
    "build/release-receipt.json",
    JSON.stringify(receipt, null, 2) + "\n"
  );
  console.log(
    `Verified ${expectedFiles.length} public files; receipt: build/release-receipt.json`
  );
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== "--review"))
    throw new Error("Usage: scripts/build [--review]");
  await buildSite(args.includes("--review") ? "review" : "release");
}
