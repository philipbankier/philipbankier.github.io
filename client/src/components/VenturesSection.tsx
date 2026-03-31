/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Ventures: large horizontal cards with dark imagery,
   KairoxAI (live) and Autopilot (coming soon)
   ========================================================== */

import { useEffect, useRef } from "react";

const KAIROX_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028996532/UU4EAPRpsj4UbnDgByzebM/kairoxai-card-LE9DLzMmRAHsUDGhe2E4NM.webp";
const AUTOPILOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028996532/UU4EAPRpsj4UbnDgByzebM/autopilot-card-f4WUQHhLU8yrM6kQfJgATM.webp";

const VENTURES = [
  {
    name: "KairoxAI",
    tagline: "Autonomous Agents, Human Expertise.",
    description:
      "AI-native SaaS products that put autonomous agents in the hands of modern teams. Designed by operators, powered by intelligence. Our first product, MailAI, is live — and Autopilot is next.",
    role: "Co-Founder",
    status: "Live",
    statusType: "green",
    url: "https://kairoxai.live",
    cta: "Visit KairoxAI",
    image: KAIROX_IMG,
    features: ["Inbox Intelligence & Triage", "Contextual Reply Drafting", "Autonomous Job Orchestration"],
  },
  {
    name: "Autopilot",
    tagline: "AI Autopilots That Run Your Work.",
    description:
      "Your 24/7 AI workforce. Autonomous agents that handle complex workflows across your entire stack — from research to execution. Manage your AI agents, tools, and processes from a single interface.",
    role: "Co-Founder & Builder",
    status: "Early Access",
    statusType: "amber",
    url: "https://autopilotai.live",
    cta: "Get Early Access",
    image: AUTOPILOT_IMG,
    features: ["24/7 Autonomous Monitoring", "Multi-Integration Automation", "Agent Orchestration Layer"],
  },
];

function useScrollFadeUp(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, delay]);
}

function VentureCard({ venture, delay }: { venture: typeof VENTURES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFadeUp(ref as React.RefObject<HTMLElement>, delay);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      className="group relative rounded-2xl overflow-hidden border border-[#E8ECF0] bg-white card-lift"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={venture.image}
          alt={venture.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/80 to-transparent" />
        {/* Name overlay */}
        <div className="absolute bottom-4 left-5">
          <h3 className="font-display font-bold text-white text-xl">{venture.name}</h3>
          <p className="text-white/60 text-[12px] font-mono mt-0.5">{venture.tagline}</p>
        </div>
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`pill ${venture.statusType === "green" ? "pill-green" : "pill-amber"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${venture.statusType === "green" ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
            {venture.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="pill pill-blue">{venture.role}</span>
        </div>

        <p className="text-[13.5px] text-[#64748B] leading-relaxed mb-4">{venture.description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {venture.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[12.5px] text-[#475569]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 flex-shrink-0">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-semibold font-display text-blue-600 hover:text-blue-700 transition-colors group/link"
        >
          {venture.cta}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/link:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function VenturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollFadeUp(headerRef as React.RefObject<HTMLElement>);

  return (
    <section id="ventures" className="py-24 bg-[#FAFBFC]">
      <div className="container">
        {/* Section header */}
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">Ventures</span>
          <div className="accent-line flex-1 max-w-[60px]" />
        </div>

        <div className="mb-12" style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}
          ref={(el) => {
            if (!el) return;
            const obs = new IntersectionObserver(([e]) => {
              if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
            }, { threshold: 0.1 });
            obs.observe(el);
          }}>
          <h2 className="font-display font-bold text-[#0F1923] text-3xl md:text-4xl">
            What I'm building
          </h2>
          <p className="text-[15px] text-[#64748B] mt-2 max-w-lg">
            Two bets on the agentic future — one company, two products, one mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VENTURES.map((venture, i) => (
            <VentureCard key={venture.name} venture={venture} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
