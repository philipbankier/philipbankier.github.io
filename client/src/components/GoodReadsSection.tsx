/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Good Reads: curated papers, articles, and links
   Editable data array — Philip can add/remove items
   ========================================================== */

import { useEffect, useRef } from "react";

// ✏️ EDIT THIS ARRAY to add/remove good reads
const GOOD_READS = [
  {
    title: "Attention Is All You Need",
    source: "Google Research",
    type: "Paper",
    description: "The foundational transformer architecture paper that changed everything in AI.",
    url: "https://arxiv.org/abs/1706.03762",
    year: "2017",
  },
  {
    title: "Agents",
    source: "Lilian Weng / OpenAI",
    type: "Article",
    description: "A comprehensive overview of LLM-powered autonomous agents, their components, and design patterns.",
    url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
    year: "2023",
  },
  {
    title: "The Bitter Lesson",
    source: "Rich Sutton",
    type: "Essay",
    description: "Why general methods that leverage computation always win in the long run — a must-read for anyone building AI.",
    url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
    year: "2019",
  },
  {
    title: "Situational Awareness",
    source: "Leopold Aschenbrenner",
    type: "Essay",
    description: "A detailed analysis of the trajectory toward AGI and what it means for the world.",
    url: "https://situational-awareness.ai/",
    year: "2024",
  },
  {
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    source: "Princeton / Google",
    type: "Paper",
    description: "The paper that introduced the ReAct prompting pattern foundational to modern AI agents.",
    url: "https://arxiv.org/abs/2210.03629",
    year: "2022",
  },
  {
    title: "The Anatomy of Autonomy",
    source: "a16z",
    type: "Article",
    description: "How AI agents are reshaping software architecture and the enterprise stack.",
    url: "https://a16z.com/",
    year: "2024",
  },
];

const TYPE_COLORS: Record<string, string> = {
  Paper: "pill-blue",
  Article: "pill-green",
  Essay: "pill-amber",
};

function ReadCard({ read, delay }: { read: typeof GOOD_READS[0]; delay: number }) {
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
      href={read.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
      className="group flex gap-4 p-4 rounded-xl border border-[#E8ECF0] bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200"
    >
      {/* Left: year */}
      <div className="flex-shrink-0 w-10 pt-0.5">
        <span className="mono-meta text-[10px]">{read.year}</span>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`pill ${TYPE_COLORS[read.type] || "pill-blue"}`}>{read.type}</span>
          <span className="text-[11px] text-[#94A3B8] font-mono truncate">{read.source}</span>
        </div>
        <h3 className="font-display font-semibold text-[13.5px] text-[#0F1923] leading-snug mb-1 group-hover:text-blue-600 transition-colors">
          {read.title}
        </h3>
        <p className="text-[12px] text-[#94A3B8] leading-relaxed line-clamp-2">{read.description}</p>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </div>
    </a>
  );
}

export default function GoodReadsSection() {
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
    <section id="reads" className="py-24 bg-[#FAFBFC]">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">Good Reads</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <h2 className="font-display font-bold text-[#0F1923] text-3xl md:text-4xl">
            Worth your time
          </h2>
          <p className="text-[15px] text-[#64748B] mt-2 max-w-lg">
            Papers, essays, and articles I keep coming back to. Curated, not comprehensive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {GOOD_READS.map((read, i) => (
            <ReadCard key={read.title} read={read} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
