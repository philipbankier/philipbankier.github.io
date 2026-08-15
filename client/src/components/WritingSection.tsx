/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Writing: tabbed section — Personal Substack + ActRun Substack
   Cards: minimal editorial style with date, title, excerpt
   ========================================================== */

import { useEffect, useRef, useState } from "react";

const PERSONAL_POSTS = [
  {
    title: "Last Week In Multimodal AI #47: RL Takes the Wheel",
    excerpt: "Your Weekly Multimodal AI Roundup (Feb 23 – Mar 2)",
    date: "Mar 3, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "Multimodal AI",
  },
  {
    title: "Last Week In Multimodal AI #46: Thinking in Pixels",
    excerpt: "Your Weekly Multimodal AI Roundup (Feb 16 – 23)",
    date: "Feb 23, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "Multimodal AI",
  },
  {
    title: "The Living Edge Spotlight #1: Mechanistic Interpretability",
    excerpt: "Mechanistic Interpretability: From Lab Curiosity to the Next Layer of the AI Stack",
    date: "Feb 8, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "Deep Dive",
  },
  {
    title: "Last Week In AI Agents #3: From Mars to Moltbook",
    excerpt: "Quick Hits (TL;DR) — your weekly agentic intelligence digest",
    date: "Feb 6, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "AI Agents",
  },
  {
    title: "Last Week In AI Agents #2: Power Without Guardrails",
    excerpt: "Your weekly dose of agentic intelligence (Jan 22–29)",
    date: "Jan 29, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "AI Agents",
  },
  {
    title: "Last Week In Multimodal AI #45: No More Turn-Taking",
    excerpt: "Your Weekly Multimodal AI Roundup (Feb 10 – 17)",
    date: "Feb 17, 2026",
    url: "https://thelivingedge.substack.com/",
    tag: "Multimodal AI",
  },
];

const ACTRUN_POSTS = [
  {
    title: "Last Week In Agentic AI #6: Platforms, Pentagon, and Parallel Plays",
    excerpt: "Major tech giants simultaneously transition to autonomous agent platforms. A week of record-breaking funding and policy shifts.",
    date: "Mar 1, 2026",
    url: "https://substack.com/@autopiloteverything",
    tag: "Agentic AI",
  },
  {
    title: "Last Week In Agentic AI #5: Speed, Skills, and Silicon Sociology",
    excerpt: "The agentic AI landscape accelerates — new capabilities, new players, new implications.",
    date: "Feb 21, 2026",
    url: "https://substack.com/@autopiloteverything",
    tag: "Agentic AI",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Multimodal AI": "pill-blue",
  "AI Agents": "pill-green",
  "Deep Dive": "pill-amber",
  "Agentic AI": "pill-blue",
};

function PostCard({ post, delay }: { post: typeof PERSONAL_POSTS[0]; delay: number }) {
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
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
      className="group block bg-[#10131A] rounded-xl border border-[#1E242E] p-5 hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-250"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`pill ${TAG_COLORS[post.tag] || "pill-blue"} flex-shrink-0`}>{post.tag}</span>
        <span className="mono-meta text-[11px] flex-shrink-0">{post.date}</span>
      </div>
      <h3 className="font-semibold text-[14px] text-[#EDEBE4] leading-snug mb-1.5 group-hover:text-blue-300 transition-colors">
        {post.title}
      </h3>
      <p className="text-[12.5px] text-[#94A3B8] leading-relaxed line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center gap-1 mt-3 text-[12px] text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Read more
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

export default function WritingSection() {
  const [activeTab, setActiveTab] = useState<"personal" | "actrun">("personal");
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

  const posts = activeTab === "personal" ? PERSONAL_POSTS : ACTRUN_POSTS;
  const subUrl = activeTab === "personal"
    ? "https://thelivingedge.substack.com/"
    : "https://substack.com/@autopiloteverything";

  return (
    <section id="writing" className="py-24 bg-[#0B0D11]">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label"><span className="num">01</span>Writing</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-editorial text-[#EDEBE4] text-4xl md:text-5xl">From the <em>lab</em></h2>
              <p className="text-[15px] text-[#98A1B3] mt-2">Weekly dispatches on AI, agents, and what's coming next.</p>
            </div>
            <a
              href={subUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
            >
              Subscribe on Substack
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[#10131A] rounded-lg p-1 w-fit mb-8 border border-[#1E242E]">
            {[
              { id: "personal", label: "The Living Edge", sub: "Personal" },
              { id: "actrun", label: "The Agentic Edge", sub: "ActRun" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "personal" | "actrun")}
                className={`px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#1E2530] text-[#EDEBE4] border border-[#2A3240]"
                    : "text-[#98A1B3] hover:text-[#EDEBE4]"
                }`}
              >
                <span className="font-display font-semibold">{tab.label}</span>
                <span className="ml-1.5 mono-meta text-[10px]">{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <PostCard key={post.title} post={post} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
