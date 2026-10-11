import { readdir } from "node:fs/promises";
import path from "node:path";
export function assertFileInventory(
  actual: string[],
  expected: string[]
): void {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const extra = actual.filter(p => !expectedSet.has(p));
  const missing = expected.filter(p => !actualSet.has(p));
  if (
    extra.length ||
    missing.length ||
    actualSet.size !== actual.length ||
    expectedSet.size !== expected.length
  )
    throw new Error(
      `File inventory mismatch; extra: ${extra.join(", ")}; missing: ${missing.join(", ")}`
    );
}
export function replaceSlot(
  html: string,
  slot: "head" | "body",
  value: string
): string {
  const marker = `<!--site-${slot}-->`;
  if (html.split(marker).length !== 2)
    throw new Error(`Expected one ${marker}`);
  return html.replace(marker, () => value);
}
import { parse } from "parse5";
type InspectNode = {
  nodeName: string;
  tagName?: string;
  namespaceURI?: string;
  attrs?: { name: string; value: string }[];
  childNodes?: InspectNode[];
  value?: string;
};
export function assertStaticDocument(
  html: string,
  kind: "home" | "report" | "404"
): void {
  const elements: InspectNode[] = [];
  const visit = (node: InspectNode) => {
    if (node.tagName) elements.push(node);
    node.childNodes?.forEach(visit);
  };
  visit(parse(html));
  const attr = (node: InspectNode, name: string) =>
    node.attrs?.find(a => a.name === name)?.value;
  for (const tag of ["main", "h1", "title"])
    if (
      elements.filter(
        e =>
          e.tagName === tag && e.namespaceURI === "http://www.w3.org/1999/xhtml"
      ).length !== 1
    )
      throw new Error(`Expected one ${tag}`);
  const canonicals = elements.filter(
    e => e.tagName === "link" && attr(e, "rel") === "canonical"
  );
  if (canonicals.length !== (kind === "404" ? 0 : 1))
    throw new Error("Wrong canonical count");
  for (const element of elements) {
    if (element.attrs?.some(a => a.name.startsWith("on")))
      throw new Error("Inline event handler");
    if (element.tagName === "script") {
      if (
        kind === "404" ||
        attr(element, "type") !== "application/ld+json" ||
        attr(element, "src")
      )
        throw new Error("Unexpected script");
      JSON.parse(element.childNodes?.map(n => n.value ?? "").join("") ?? "");
    }
    if (element.tagName === "link" && attr(element, "rel") === "modulepreload")
      throw new Error("Unexpected module preload");
  }
  if (html.includes("<!--site-") || html.includes("<!--dev-entry:"))
    throw new Error("Unfilled template marker");
  if (
    kind === "404" &&
    !elements.some(
      e =>
        e.tagName === "meta" &&
        attr(e, "name") === "robots" &&
        attr(e, "content")?.includes("noindex")
    )
  )
    throw new Error("404 must be noindex");
}

export async function listFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  async function walk(relative: string) {
    for (const entry of await readdir(path.join(directory, relative), {
      withFileTypes: true,
    })) {
      const name = path.posix.join(relative, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlink forbidden: ${name}`);
      if (entry.isDirectory()) await walk(name);
      else if (entry.isFile()) files.push(name);
      else throw new Error(`Unsupported file type: ${name}`);
    }
  }
  await walk("");
  return files.sort();
}
export function inspect(html: string): InspectNode[] {
  const nodes: InspectNode[] = [];
  function visit(node: InspectNode) {
    if (node.tagName) nodes.push(node);
    node.childNodes?.forEach(visit);
  }
  visit(parse(html));
  return nodes;
}
export const attribute = (node: InspectNode, name: string) =>
  node.attrs?.find(a => a.name === name)?.value;
export function textContent(node: InspectNode): string {
  return node.value ?? node.childNodes?.map(textContent).join("") ?? "";
}
