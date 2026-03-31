/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Contact: split layout — left copy, right form
   Form uses mailto fallback (static site compatible)
   ========================================================== */

import { useEffect, useRef, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "Twitter / X",
    handle: "@philipbankier",
    url: "https://twitter.com/philipbankier",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "philip-bankier",
    url: "https://www.linkedin.com/in/philip-bankier/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Substack",
    handle: "The Living Edge",
    url: "https://thelivingedge.substack.com/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "philipbankier",
    url: "https://github.com/philipbankier",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name} via philipbankier.com`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:philip@kairoxai.live?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFBFC]">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">Contact</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <h2 className="font-display font-bold text-[#0F1923] text-3xl md:text-4xl leading-tight mb-4">
              Let's build<br />
              <span className="gradient-text">something great.</span>
            </h2>
            <p className="text-[15px] text-[#64748B] leading-relaxed mb-8">
              Whether you're exploring a collaboration, have a question about AI agents, or just want to connect —
              I'm always happy to hear from builders and founders.
            </p>

            {/* Social links */}
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8ECF0] flex items-center justify-center text-[#64748B] group-hover:text-blue-600 group-hover:border-blue-200 transition-all">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#0F1923] group-hover:text-blue-600 transition-colors">{link.name}</p>
                    <p className="text-[11px] text-[#94A3B8] font-mono">{link.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#64748B] mb-1.5 font-mono uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8ECF0] bg-white text-[14px] text-[#0F1923] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#64748B] mb-1.5 font-mono uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E8ECF0] bg-white text-[14px] text-[#0F1923] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#64748B] mb-1.5 font-mono uppercase tracking-wider">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E8ECF0] bg-white text-[14px] text-[#0F1923] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[13px] font-semibold font-display hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20"
            >
              Send Message
            </button>
            <p className="text-[11px] text-[#94A3B8] text-center font-mono">
              Opens your email client · philip@kairoxai.live
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
