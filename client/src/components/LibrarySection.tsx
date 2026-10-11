import type { ReportRecord } from "../content/contracts";
export default function LibrarySection({
  reports,
}: {
  reports: ReportRecord[];
}) {
  return (
    <section className="section" id="library" aria-labelledby="library-heading">
      <div className="section-head">
        <h2 id="library-heading">Research library</h2>
      </div>
      <p className="library-intro">Research notes from April and May 2026.</p>
      <ul className="library-list">
        {reports.map(report => (
          <li key={report.path}>
            <a className="report" href={report.path}>
              <span className="date">{report.originalDateLabel}</span>
              <h3>
                {report.title}{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <p>{report.summary}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
