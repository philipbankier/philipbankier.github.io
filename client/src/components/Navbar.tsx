import { site } from "../content/site";
export default function Navbar() {
  return (
    <header className="topbar">
      <a className="wordmark" href="#top">
        {site.name}
      </a>
      <nav className="nav" aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
        <a href="#library">Library</a>
        <a href="#code">Code</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
