/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Library: long-form artifacts published under /pages/
   Editable data array: add new artifacts here
   ========================================================== */

import { useEffect, useRef } from "react";

// ✏️ EDIT THIS ARRAY to add/remove artifacts
const ARTIFACTS = [
  {
    title: "The 2026 AI Agent Playbook",
    type: "Field Brief",
    date: "Apr 2026",
    description:
      "Agent frameworks in practice: deployment paradigms, context engineering, memory benchmarks, and a scoring matrix across the ecosystem.",
    url: "/pages/agent-playbook.html",
  },
  {
    title: "The April 2026 AI Agent Roundup",
    type: "Roundup",
    date: "Apr 2026",
    description:
      "A month in review across the AI agent ecosystem: model releases, terminal agents, platform launches, and security incidents.",
    url: "/pages/april-2026-ai-agent-roundup.html",
  },
  {
    title: "The Landscape of Taste Transfer",
    type: "Synthesis",
    date: "Apr 2026",
    description:
      "Mapping every technique for transferring a person's creative voice into an LLM, from prompting to activation steering.",
    url: "/pages/taste-landscape.html",
  },
  {
    title: "Mobile Devices as Agent Nodes",
    type: "Field Guide",
    date: "May 2026",
    description:
      "Using spare phones as automation nodes for agent fleets: tooling comparison, decision tree, and quick-start checklist.",
    url: "/pages/mobile-agent-nodes.html",
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Field Brief": "pill-blue",
  Roundup: "pill-green",
  Synthesis: "pill-amber",
  "Field Guide": "pill-blue",
};

function ArtifactCard({ artifact, delay }: { artifact: typeof ARTIFACTS[0]; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
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
    <a
      ref={ref}
      href={artifact.url}
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
      className="group block bg-[#10131A] rounded-xl border border-[#1E242E] p-5 hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-250"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`pill ${TYPE_COLORS[artifact.type] || "pill-blue"} flex-shrink-0`}>{artifact.type}</span>
        <span className="mono-meta text-[11px] flex-shrink-0">{artifact.date}</span>
      </div>
      <h3 className="font-semibold text-[14px] text-[#EDEBE4] leading-snug mb-1.5 group-hover:text-blue-300 transition-colors">
        {artifact.title}
      </h3>
      <p className="text-[12.5px] text-[#94A3B8] leading-relaxed line-clamp-3">{artifact.description}</p>
      <div className="flex items-center gap-1 mt-3 text-[12px] text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Read the artifact
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

export default function LibrarySection() {
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
    <section id="library" className="py-24 bg-[#0D1119]">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label"><span className="num">02</span>Library</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <div className="mb-8">
            <h2 className="font-editorial text-[#EDEBE4] text-4xl md:text-5xl">The <em>artifacts</em></h2>
            <p className="text-[15px] text-[#98A1B3] mt-2">
              Long-form research artifacts: briefs, syntheses, and field guides across domains.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARTIFACTS.map((artifact, i) => (
            <ArtifactCard key={artifact.url} artifact={artifact} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
