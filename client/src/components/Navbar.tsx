/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Navbar: fixed top, backdrop-blur appears after scroll,
   left-anchored name, right-anchored nav links
   ========================================================== */

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Writing", href: "#writing" },
  { label: "Library", href: "#library" },
  { label: "Open Source", href: "#open-source" },
  // { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0D11]/85 backdrop-blur-md border-b border-[#1E242E]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo / Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-editorial italic text-[19px] text-[#EDEBE4] hover:opacity-70 transition-opacity"
        >
          Philip Bankier
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-[13px] font-medium text-[#98A1B3] hover:text-[#EDEBE4] transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://actrun.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-90 transition-opacity shadow-sm"
          >
            Try ActRun
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#EDEBE4] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#EDEBE4] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#EDEBE4] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B0D11] border-t border-[#1E242E] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-[14px] font-medium text-[#98A1B3] hover:text-[#EDEBE4] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://actrun.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit px-4 py-2 rounded-lg text-[12px] font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white"
          >
            Try ActRun
          </a>
        </div>
      )}
    </header>
  );
}
