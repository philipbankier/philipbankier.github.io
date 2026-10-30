import { site } from "../content/site";
export default function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact-copy">
        <h2 id="contact-heading">{site.contact.heading}</h2>
        <p>{site.contact.invitation}</p>
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
