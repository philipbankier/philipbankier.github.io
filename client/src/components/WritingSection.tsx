import type { WritingResult } from "../content/contracts";
import { site } from "../content/site";
import { formatDate } from "../content/writing";
export default function WritingSection({
  writing,
}: {
  writing: WritingResult;
}) {
  return (
    <section className="section" id="writing" aria-labelledby="writing-heading">
      <div className="section-head">
        <h2 id="writing-heading">Writing</h2>
      </div>
      <div className="writing">
        <div className="newsletter">
          <h3>{site.newsletter.name}</h3>
          <p>My newsletter on multimodal AI.</p>
          <a
            className="text-link"
            href={site.newsletter.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on Substack{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <div>
          <ul className="posts">
            {writing.snapshot.posts.map(post => (
              <li key={post.url}>
                <a
                  className="post"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3>
                    {post.title}{" "}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </h3>
                </a>
              </li>
            ))}
          </ul>
          {writing.source === "fallback" && (
            <p className="writing-checked">
              Writing checked {formatDate(writing.snapshot.fetchedAt)}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
