import { projects } from "../content/site";
export default function WorkSection() {
  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <span id="ledger" aria-hidden="true" />
      <div className="section-head">
        <h2 id="work-heading">Selected work</h2>
      </div>
      <ul className="work-list">
        {projects.map(project => (
          <li className="work-row" key={project.url}>
            <a
              className="work-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{project.name}</h3>
              <p>
                {project.description}
                <span className="project-domain">{project.domain}</span>
              </p>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
