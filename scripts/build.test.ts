import test from "node:test";
import assert from "node:assert/strict";
import { assertFileInventory, assertStaticDocument, replaceSlot } from "./html";
import { homeHead, notFoundHead, jsonLd } from "./metadata";
const page = (head: string, body: string) =>
  `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`;
test("missing images, missing reports and unexpected public files fail inventory", () => {
  const expected = [
    "index.html",
    "assets/img/portrait-640.webp",
    "pages/taste-landscape.html",
  ];
  assert.throws(
    () => assertFileInventory(expected.slice(0, 1), expected),
    /missing/
  );
  assert.throws(
    () => assertFileInventory([...expected, "pages/internal.html"], expected),
    /extra/
  );
  assert.doesNotThrow(() =>
    assertFileInventory(expected, [...expected].reverse())
  );
});
test("a duplicate template slot cannot duplicate canonical or identity metadata", () => {
  assert.throws(
    () => replaceSlot("<!--site-head--><!--site-head-->", "head", homeHead()),
    /Expected one/
  );
});
test("an SPA shell or copied homepage cannot serve as the static 404", () => {
  assert.throws(() =>
    assertStaticDocument(
      page(homeHead(), '<div id="root"></div><script src="/app.js"></script>'),
      "home"
    )
  );
  assert.throws(() =>
    assertStaticDocument(
      page(homeHead(), "<main><h1>Philip Bankier</h1></main>"),
      "404"
    )
  );
  assert.doesNotThrow(() =>
    assertStaticDocument(
      page(
        notFoundHead(),
        '<main><h1>Page not found</h1><a href="/">Home</a></main>'
      ),
      "404"
    )
  );
});
test("escaped JSON-LD remains data while executable scripts fail", () => {
  const head =
    '<title>Fixture</title><link rel="canonical" href="https://philipbankier.com/">';
  assert.doesNotThrow(() =>
    assertStaticDocument(
      page(
        head + jsonLd({ name: "</script><script>alert(1)</script>" }),
        "<main><h1>Fixture</h1></main>"
      ),
      "home"
    )
  );
  assert.throws(
    () =>
      assertStaticDocument(
        page(head, "<main><h1>Fixture</h1><script>alert(1)</script></main>"),
        "home"
      ),
    /Unexpected script/
  );
});
