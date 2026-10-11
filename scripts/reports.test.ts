import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse, type DefaultTreeAdapterMap } from "parse5";
import { reports } from "../client/src/content/site";

type Node = DefaultTreeAdapterMap["node"];
type Element = DefaultTreeAdapterMap["element"];
function elements(node: Node): Element[] {
  return [
    ...("tagName" in node ? [node] : []),
    ...("childNodes" in node ? node.childNodes.flatMap(elements) : []),
  ];
}
const attr = (node: Element, name: string) => node.attrs.find(a => a.name === name)?.value;
for (const path of ["/pages/agent-playbook.html", "/pages/april-2026-ai-agent-roundup.html", "/pages/taste-landscape.html", "/pages/mobile-agent-nodes.html"]) {
  test(`${path} keeps navigation, comparison and revision usable without scripts`, () => {
    const html = readFileSync(`client/public${path}`, "utf8");
    const nodes = elements(parse(html));
    const record = reports.find(report => report.path === path)!;
    assert.equal(nodes.filter(n => n.tagName === "main").length, 1);
    assert.equal(nodes.filter(n => n.tagName === "h1").length, 1);
    assert.ok(nodes.some(n => n.tagName === "a" && attr(n, "href") === "/#library"));
    assert.ok(record.revisedOn);
    assert.ok(nodes.some(n => n.tagName === "time" && attr(n, "datetime") === record.revisedOn));
    assert.equal(html.split("<!--site-head-->").length, 2);
    assert.ok(nodes.every(n => n.tagName !== "script"));
    assert.ok(nodes.every(n => n.attrs.every(a => !a.name.startsWith("on"))));
    for (const citation of record.citations)
      assert.ok(nodes.some(n => n.tagName === "a" && attr(n, "href") === citation), citation);
    for (const table of nodes.filter(n => n.tagName === "table")) {
      assert.ok(elements(table).some(n => n.tagName === "caption"));
      assert.ok(elements(table).filter(n => n.tagName === "th").every(n => attr(n, "scope")));
    }
    const ids = new Set(nodes.map(n => attr(n, "id")).filter(Boolean));
    for (const link of nodes.filter(n => attr(n, "href")?.startsWith("#")))
      assert.ok(ids.has(attr(link, "href")!.slice(1)), "section link target exists");
  });
}

test("taste disclosures expose their content as native HTML", () => {
  const nodes = elements(parse(readFileSync("client/public/pages/taste-landscape.html", "utf8")));
  const details = nodes.filter(n => n.tagName === "details");
  assert.ok(details.length > 0);
  for (const disclosure of details) {
    assert.ok(disclosure.childNodes.some(n => "tagName" in n && n.tagName === "summary"));
    assert.ok(elements(disclosure).some(n => n.tagName === "p"));
  }
});

test("mobile setup checklist starts unchecked and has usable native labels", () => {
  const nodes = elements(parse(readFileSync("client/public/pages/mobile-agent-nodes.html", "utf8")));
  const fieldset = nodes.find(n => n.tagName === "fieldset");
  assert.ok(fieldset);
  const labels = elements(fieldset).filter(n => n.tagName === "label");
  assert.equal(labels.length, 4);
  for (const label of labels) {
    const input = elements(label).find(n => n.tagName === "input");
    assert.ok(input);
    assert.equal(attr(input, "type"), "checkbox");
    assert.equal(attr(input, "checked"), undefined);
    assert.equal(attr(input, "disabled"), undefined);
  }
});
