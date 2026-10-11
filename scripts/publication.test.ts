import test from "node:test";
import assert from "node:assert/strict";
import { selectPublicFiles, PublicationEntrySchema } from "./build-site";
test("pending public material blocks release and has an explicit local review behavior", () => {
  const entries = [
    PublicationEntrySchema.parse({
      path: "pages/internal.html",
      decision: "pending",
      reviewAction: "exclude",
      reason: "Needs decision",
      evidence: "docs/HANDOFF.md",
    }),
  ];
  assert.throws(() => selectPublicFiles(entries, "release"), /Unresolved/);
  assert.deepEqual(selectPublicFiles(entries, "review"), []);
});
test("publication paths cannot escape the public directory", () => {
  assert.equal(
    PublicationEntrySchema.safeParse({
      path: "../.env",
      decision: "include",
      reviewAction: "include",
      reason: "fixture",
      evidence: "fixture",
    }).success,
    false
  );
});

test("publication paths reject absolute paths, globs and duplicate dispositions", () => {
  const base = {
    decision: "include",
    reviewAction: "include",
    reason: "fixture",
    evidence: "fixture",
  };
  for (const path of [
    "/tmp/private",
    "pages/*.html",
    "pages/?.html",
    "pages/[ab].html",
    "pages/./a.html",
    "pages\\a.html",
  ])
    assert.equal(
      PublicationEntrySchema.safeParse({ ...base, path }).success,
      false,
      path
    );
  const entry = PublicationEntrySchema.parse({ ...base, path: "pages/a.html" });
  assert.throws(
    () => selectPublicFiles([entry, entry], "release"),
    /Duplicate/
  );
});
