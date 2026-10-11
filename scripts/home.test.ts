import React from "react";
import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";
import NotFound from "../client/src/pages/NotFound";
import { reviewedWriting } from "../client/src/content/writing";
import { reports } from "../client/src/content/site";

test("homepage is complete before browser JavaScript runs", () => {
  const snapshot = structuredClone(reviewedWriting);
  snapshot.posts[0].title = '<img src=x onerror="alert(1)">';
  const html = renderToStaticMarkup(
    React.createElement(Home, {
      writing: { source: "fallback", snapshot, reason: "fixture" },
      reports,
    })
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
    assert.ok(html.includes(`id="${id}"`), id);
  for (const post of snapshot.posts) assert.ok(html.includes(post.url));
  assert.ok(html.includes("Writing checked"));
  assert.ok(html.includes("&lt;img"));
  assert.ok(!html.includes('<img src="x"'));
});
test("404 has a native recovery link", () => {
  const html = renderToStaticMarkup(React.createElement(NotFound));
  assert.match(html, /href="\/"/);
  assert.match(html, /Page not found/);
});
