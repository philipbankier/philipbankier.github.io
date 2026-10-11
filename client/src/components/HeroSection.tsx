import { site, projects } from "../content/site";
export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="name">
      <div className="hero-copy">
        <h1 id="name">
          <span>Philip</span>{" "}
          <span>Bankier</span>
        </h1>
        <p className="bio">
          Co-founder of{" "}
          <a href={site.company.url} target="_blank" rel="noopener noreferrer">
            {site.company.name}
          </a>
          .<br />
          Building{" "}
          <a href={projects[0].url} target="_blank" rel="noopener noreferrer">
            ActRun
          </a>{" "}
          and writing{" "}
          <a
            href={site.newsletter.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.newsletter.name}
          </a>
          .
        </p>
        <div className="hero-actions">
          <a className="view-work" href="#work">
            <svg className="wheel" viewBox="0 0 80 80" aria-hidden="true">
              <circle
                cx="40"
                cy="40"
                r="31"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M40 9v62M9 40h62"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                cx="40"
                cy="40"
                r="8"
                fill="var(--paper)"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span>
              View work <span aria-hidden="true">↓</span>
            </span>
          </a>
          <a className="text-link" href={`mailto:${site.email}`}>
            Write to me{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
      <figure className="portrait">
        <img
          src="/assets/img/portrait-640.webp"
          srcSet="/assets/img/portrait-320.webp 320w, /assets/img/portrait-640.webp 640w, /assets/img/portrait-960.webp 960w, /assets/img/portrait-1122.webp 1122w"
          sizes="(max-width: 700px) 58vw, (max-width: 1050px) 340px, 418px"
          width={1122}
          height={1402}
          fetchPriority="high"
          alt="Illustrated portrait of Philip Bankier"
        />
      </figure>
    </section>
  );
}
