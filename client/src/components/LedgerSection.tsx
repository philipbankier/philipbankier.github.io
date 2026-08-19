/* ==========================================================
   DESIGN: Editorial Ledger
   Ledger: a running record of what actually shipped.
   PROTOTYPE: rows below are a real snapshot (fetched
   2026-08-18 from GitHub, /pages/ git history, Substack).
   The production version generates this array at build time
   and a scheduled rebuild keeps it current.
   ========================================================== */

import { useEffect, useRef } from "react";

type Entry = {
  date: string; // ISO, for sorting and the datetime attr
  shown: string; // what renders
  kind: "commit" | "artifact" | "post" | "site";
  text: string;
  url: string;
};

const ENTRIES: Entry[] = [
  { date: "2026-08-18", shown: "Aug 18", kind: "commit", text: "awesome-agent-skills: daily data sync (automated)", url: "https://github.com/philipbankier/awesome-agent-skills" },
  { date: "2026-08-18", shown: "Aug 18", kind: "site", text: "This site: foundation refresh, Library and Open Source sections", url: "https://github.com/philipbankier/philipbankier.github.io/pull/1" },
  { date: "2026-06-29", shown: "Jun 29", kind: "commit", text: "tastekit: release packages moved to the Kairox scope", url: "https://github.com/philipbankier/tastekit" },
  { date: "2026-06-26", shown: "Jun 26", kind: "commit", text: "codex-image-skill: visual craft system guidance", url: "https://github.com/philipbankier/codex-image-skill" },
  { date: "2026-06-20", shown: "Jun 20", kind: "commit", text: "codex-handoff-skill: 1.2.0, revamped handoff workflow", url: "https://github.com/philipbankier/codex-handoff-skill" },
  { date: "2026-05-28", shown: "May 28", kind: "commit", text: "technical-visualizer: content-rich handoff workflow", url: "https://github.com/philipbankier/technical-visualizer" },
  { date: "2026-05-24", shown: "May 24", kind: "commit", text: "brain-dump: restic prune output handled in JSON snapshots", url: "https://github.com/philipbankier/brain-dump" },
  { date: "2026-05-11", shown: "May 11", kind: "artifact", text: "Published: Mobile Devices as Agent Nodes, a field guide", url: "/pages/mobile-agent-nodes.html" },
  { date: "2026-04-25", shown: "Apr 25", kind: "artifact", text: "Published: The April 2026 AI Agent Roundup", url: "/pages/april-2026-ai-agent-roundup.html" },
  { date: "2026-04-25", shown: "Apr 25", kind: "artifact", text: "Published: The 2026 AI Agent Playbook, Field Brief No. 04", url: "/pages/agent-playbook.html" },
  { date: "2026-04-24", shown: "Apr 24", kind: "artifact", text: "Published: The Landscape of Taste Transfer", url: "/pages/taste-landscape.html" },
  { date: "2026-03-03", shown: "Mar 3", kind: "post", text: "The Living Edge: Last Week In Multimodal AI #47", url: "https://thelivingedge.substack.com/" },
];

const KIND_STYLE: Record<Entry["kind"], { pill: string; label: string }> = {
  commit: { pill: "pill-blue", label: "Commit" },
  site: { pill: "pill-blue", label: "Site" },
  artifact: { pill: "pill-amber", label: "Artifact" },
  post: { pill: "pill-green", label: "Post" },
};

export default function LedgerSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, listRef.current];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.05 });
    els.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ledger" className="py-24 bg-[#0D1119]">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label"><span className="num">01</span>Ledger</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-editorial text-[#EDEBE4] text-4xl md:text-5xl">
                What <em>shipped</em>
              </h2>
              <p className="text-[15px] text-[#98A1B3] mt-2 max-w-lg">
                A running record, rebuilt from the sources: commits, published artifacts, and posts.
              </p>
            </div>
            <p className="mono-meta flex-shrink-0">Snapshot · 2026-08-18</p>
          </div>
        </div>

        <div
          ref={listRef}
          className="border-t border-[#1E242E]"
          style={{ opacity: 0, transform: "translateY(14px)", transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s" }}
        >
          {ENTRIES.map((e) => {
            const k = KIND_STYLE[e.kind];
            const external = !e.url.startsWith("/");
            return (
              <a
                key={e.date + e.text}
                href={e.url}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-[64px_1fr] sm:grid-cols-[80px_92px_1fr_16px] items-center gap-x-4 py-3 border-b border-[#1E242E]/70 hover:bg-white/[0.02] transition-colors"
              >
                <time dateTime={e.date} className="mono-meta text-[11px] flex-shrink-0">{e.shown}</time>
                <span className={`pill ${k.pill} hidden sm:inline-flex w-fit`}>{k.label}</span>
                <span className="text-[13.5px] text-[#98A1B3] group-hover:text-[#EDEBE4] transition-colors truncate col-span-1">
                  {e.text}
                </span>
                <svg
                  className="hidden sm:block text-transparent group-hover:text-blue-300 transition-colors"
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
