/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Hero: asymmetric layout — text left 55%, photo right 40%
   Background: subtle node-graph image, cool white base
   ========================================================== */

import { useEffect, useRef } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028996532/UU4EAPRpsj4UbnDgByzebM/hero-bg-4udNRZm7M8aJEkd2KNSdH7.webp";
const HEADSHOT = "https://philipbankier.com/assets/img/profile.jpg";
// Fallback: if the above 404s, swap to a placeholder or hosted CDN URL

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100");
          el.classList.remove("opacity-0", "translate-y-4");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBFC]/95 via-[#FAFBFC]/80 to-[#FAFBFC]/30 pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-0">
          {/* Left: Text */}
          <div
            ref={containerRef}
            className="flex-1 max-w-2xl opacity-0 translate-y-4 transition-all duration-700 ease-out"
          >
            {/* Status pill */}
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 pill pill-green">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for select projects
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display font-bold text-[#0F1923] leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>
              Philip Bankier
            </h1>

            {/* Tagline */}
            <p className="font-display font-light text-[#0F1923]/70 mb-6 leading-snug"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
              Building AI agents that{" "}
              <span className="gradient-text font-medium">manage your AI agents.</span>
            </p>

            {/* Bio summary */}
            <p className="text-[15px] text-[#64748B] leading-relaxed max-w-xl mb-8 font-[350]">
              Nearly a decade founding, building, and scaling startups — from first commit through acquisition.
              Now focused on the meta-layer: autonomous AI systems that orchestrate your tools, workflows, and agents
              so you can operate at the speed of thought.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://autopilotai.live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[13px] font-semibold font-display hover:opacity-90 transition-opacity shadow-md shadow-blue-500/20"
              >
                Try Autopilot
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="https://kairoxai.live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8ECF0] bg-white/80 text-[#0F1923] text-[13px] font-semibold font-display hover:border-blue-300 hover:bg-white transition-all"
              >
                KairoxAI
              </a>
              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8ECF0] bg-white/80 text-[#64748B] text-[13px] font-medium hover:text-[#0F1923] hover:border-[#CBD5E1] transition-all"
              >
                Get in touch
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8">
              <a href="https://twitter.com/philipbankier" target="_blank" rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#0F1923] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com/philipbankier" target="_blank" rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#0F1923] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/philip-bankier/" target="_blank" rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#0F1923] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://thelivingedge.substack.com/" target="_blank" rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#0F1923] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </a>
              <a href="mailto:philip@kairoxai.live"
                className="text-[#94A3B8] hover:text-[#0F1923] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hidden lg:flex lg:w-[38%] justify-end items-center">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-2xl border border-blue-200/50 opacity-60" />
              <div className="absolute -inset-6 rounded-2xl border border-blue-100/30 opacity-40" />
              <img
                src={HEADSHOT}
                alt="Philip Bankier"
                className="relative w-56 h-56 object-cover rounded-2xl shadow-xl shadow-slate-200/60 grayscale-[15%]"
                style={{ filter: "grayscale(10%) contrast(1.02)" }}
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3 py-2 shadow-lg border border-[#E8ECF0]">
                <p className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider">Co-Founder</p>
                <p className="font-display font-semibold text-[13px] text-[#0F1923]">KairoxAI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="mono-meta">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#94A3B8] to-transparent" />
        </div>
      </div>
    </section>
  );
}
