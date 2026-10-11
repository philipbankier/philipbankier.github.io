import { repositories } from "../content/site";
export default function OpenSourceSection() {
  return (
    <section className="section" id="code" aria-labelledby="code-heading">
      <span id="open-source" aria-hidden="true" />
      <div className="section-head">
        <h2 id="code-heading">Code</h2>
        <a
          className="text-link"
          href="https://github.com/philipbankier?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          All repositories <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ul className="code-list">
        {repositories.map(repo => (
          <li key={repo.url}>
            <a
              className="repo-link"
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>
                {repo.name}{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <p>{repo.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
