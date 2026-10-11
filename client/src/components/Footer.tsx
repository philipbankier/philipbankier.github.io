import { site } from "../content/site";
export default function Footer() {
  return (
    <footer className="footer">
      <p>{site.name}</p>
      <a className="text-link" href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
