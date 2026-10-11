import { site } from "../content/site";
export default function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div>
        <h2 id="contact-heading">Get in touch.</h2>
        <p>For projects and collaborations.</p>
      </div>
      <a className="text-link" href={`mailto:${site.email}`}>
        {site.email}{" "}
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    </section>
  );
}
