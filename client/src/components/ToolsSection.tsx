/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Tools: grid of tool cards with logo, description, CTA
   Affiliate links clearly labeled
   ========================================================== */

import { useEffect, useRef } from "react";

// ✏️ EDIT THIS ARRAY to add/remove tools
const TOOLS = [
  {
    name: "ElevenLabs",
    category: "Voice AI",
    description: "The best AI voice generation I've used. Incredibly realistic voices for agents, products, and content.",
    url: "https://try.elevenlabs.io/i0307e6mykcz",
    affiliate: true,
    emoji: "🎙️",
    cta: "Try ElevenLabs",
  },
  {
    name: "Cursor",
    category: "AI Code Editor",
    description: "My daily driver for coding. The AI pair programmer that actually understands your codebase.",
    url: "https://cursor.sh",
    affiliate: false,
    emoji: "⌨️",
    cta: "Get Cursor",
  },
  {
    name: "Linear",
    category: "Project Management",
    description: "The cleanest issue tracker for product teams. Fast, opinionated, and built for builders.",
    url: "https://linear.app",
    affiliate: false,
    emoji: "📐",
    cta: "Try Linear",
  },
  {
    name: "Perplexity",
    category: "AI Research",
    description: "My go-to for quick research. Replaces most Google searches with cited, conversational answers.",
    url: "https://perplexity.ai",
    affiliate: false,
    emoji: "🔍",
    cta: "Try Perplexity",
  },
  {
    name: "Vercel",
    category: "Deployment",
    description: "Zero-config deployment for frontend projects. Ships in seconds, scales automatically.",
    url: "https://vercel.com",
    affiliate: false,
    emoji: "▲",
    cta: "Deploy on Vercel",
  },
  {
    name: "Notion",
    category: "Knowledge Base",
    description: "Where all my thinking, docs, and company knowledge lives. Flexible enough for anything.",
    url: "https://notion.so",
    affiliate: false,
    emoji: "📓",
    cta: "Try Notion",
  },
];

function ToolCard({ tool, delay }: { tool: typeof TOOLS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
      className="group bg-white rounded-xl border border-[#E8ECF0] p-5 card-lift flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F8FAFC] border border-[#E8ECF0] flex items-center justify-center text-lg flex-shrink-0">
            {tool.emoji}
          </div>
          <div>
            <h3 className="font-display font-semibold text-[14px] text-[#0F1923]">{tool.name}</h3>
            <p className="text-[11px] text-[#94A3B8] font-mono">{tool.category}</p>
          </div>
        </div>
        {tool.affiliate && (
          <span className="pill pill-amber text-[9px]">Affiliate</span>
        )}
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#64748B] leading-relaxed flex-1 mb-4">{tool.description}</p>

      {/* CTA */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold font-display text-blue-600 hover:text-blue-700 transition-colors group/link"
      >
        {tool.cta}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/link:translate-x-0.5">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </a>
    </div>
  );
}

export default function ToolsSection() {
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

  return (
    <section id="tools" className="py-24 bg-white">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">Tools I Like</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <h2 className="font-display font-bold text-[#0F1923] text-3xl md:text-4xl">
            My stack
          </h2>
          <p className="text-[15px] text-[#64748B] mt-2 max-w-lg">
            Tools I actually use and recommend. Some links are affiliate — marked clearly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
