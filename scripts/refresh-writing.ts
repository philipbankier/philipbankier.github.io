import { mkdir, writeFile } from "node:fs/promises";
import { fetchWriting } from "./newsletter";
const snapshot = await fetchWriting();
await mkdir("build", { recursive: true });
await writeFile(
  "build/writing-candidate.json",
  JSON.stringify(snapshot, null, 2) + "\n"
);
await writeFile(
  "build/writing-refresh-receipt.json",
  JSON.stringify(
    {
      source: "fresh",
      feedUrl: snapshot.feedUrl,
      fetchedAt: snapshot.fetchedAt,
      articles: snapshot.posts.map(p => p.url),
    },
    null,
    2
  ) + "\n"
);
console.log(
  "Fresh candidate saved to build/writing-candidate.json. Review before replacing the tracked snapshot."
);
