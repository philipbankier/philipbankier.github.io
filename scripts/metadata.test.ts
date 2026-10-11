import test from "node:test";
import assert from "node:assert/strict";
import { homeGraph, reportGraph, jsonLd, notFoundHead } from "./metadata";
import { reports, site } from "../client/src/content/site";
test("profile graph describes the visible identity without unrelated sameAs links", () => {
  const graph = homeGraph()["@graph"];
  const person = graph.find(n => n["@type"] === "Person")!;
  assert.equal(person.description, site.bio);
  assert.deepEqual(person.sameAs, ["https://github.com/philipbankier"]);
  assert.ok(!JSON.stringify(graph).includes("datePublished"));
  assert.equal(graph.filter(n => n["@type"] === "ProfilePage").length, 1);
});
test("report schema does not infer authorship or publication from document dates", () => {
  for (const report of reports) {
    const encoded = JSON.stringify(reportGraph(report));
    assert.ok(!encoded.includes('"author"'));
    assert.ok(!encoded.includes('"datePublished"'));
    assert.ok(encoded.includes(report.path));
  }
  assert.ok(!notFoundHead().includes("canonical"));
  assert.ok(!notFoundHead().includes("application/ld+json"));
});
test("JSON-LD cannot close its script element", () => {
  const html = jsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal((html.match(/<script/g) ?? []).length, 1);
  assert.equal((html.match(/<\/script>/g) ?? []).length, 1);
  assert.ok(html.includes("\\u003c"));
});
