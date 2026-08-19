/* ==========================================================
   DESIGN: Editorial Ledger
   Open Source: selected public repos
   Editable data array: add, remove, or reorder projects here.
   Full list at github.com/philipbankier?tab=repositories
   ========================================================== */

import { useEffect, useRef } from "react";

const GITHUB_USER = "philipbankier";

// ✏️ EDIT THIS ARRAY to change which projects appear.
// `repo` is the GitHub repo name; the link is built from it.
const PROJECTS = [
  {
    repo: "awesome-agent-skills",
    title: "Awesome Agent Skills",
    language: "TypeScript",
    description:
      "A curated directory of skills, tools, and plugins for AI coding agents across every platform: MCP servers, Agent Skills, Cursor rules, and more.",
  },
  {
    repo: "codex-handoff-skill",
    title: "Codex Handoff Skill",
    language: "Shell",
    description:
      "Offloads coding plans to Codex CLI for execution, with an automated supervisor and judge loop.",
  },
  {
    repo: "tastekit",
    title: "Tastekit",
    language: "TypeScript",
    description:
      "Compile your taste into portable AI agent artifacts. One interview, 32+ runtimes.",
  },
  {
    repo: "brain-dump",
    title: "Brain Dump",
    language: "Shell",
    description:
      "Opinionated, encrypted backup for AI agent memory. Wraps restic.",
  },
  {
    repo: "agent-cli-skills",
    title: "Agent CLI Skills",
    language: "Shell",
    description:
      "The open-source skill library for AI CLI agents: Claude Code, Codex CLI, and Gemini CLI.",
  },
  {
    repo: "lex-the-computer",
    title: "Lex the Computer",
    language: "TypeScript",
    description:
      "Your personal AI computer. One command to deploy. An open-source Zo Computer alternative.",
  },
  {
    repo: "technical-visualizer",
    title: "Technical Visualizer",
    language: "Go",
    description:
      "Go CLI that builds source-backed technical visualization bundles.",
  },
  {
    repo: "riskradar",
    title: "RiskRadar",
    language: "Python",
    description:
      "Portfolio-level latent factor risk engine: composite heat score, position attribution, HMM regime detection, causal DAG, and a live dashboard.",
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "pill-blue",
  Shell: "pill-green",
  Python: "pill-amber",
  Go: "pill-blue",
};

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
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
      href={`https://github.com/${GITHUB_USER}/${project.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
      className="group flex flex-col bg-[#10131A] rounded-xl border border-[#1E242E] p-5 hover:border-blue-400/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-250"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`pill ${LANGUAGE_COLORS[project.language] || "pill-blue"} flex-shrink-0`}>
          {project.language}
        </span>
        <svg
          className="text-[#3A4453] group-hover:text-blue-300 transition-colors flex-shrink-0 mt-0.5"
          width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </div>
      <h3 className="font-semibold text-[14px] text-[#EDEBE4] leading-snug mb-1.5 group-hover:text-blue-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-[12.5px] text-[#98A1B3] leading-relaxed flex-1">{project.description}</p>
      <p className="mono-meta mt-3 group-hover:text-[#8FC2FF] transition-colors">
        {GITHUB_USER}/{project.repo}
      </p>
    </a>
  );
}

export default function OpenSourceSection() {
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
    <section id="open-source" className="py-24 bg-[#0B0D11]">
      <div className="container">
        <div
          ref={headerRef}
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label"><span className="num">04</span>Open Source</span>
            <div className="accent-line flex-1 max-w-[60px]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-editorial text-[#EDEBE4] text-4xl md:text-5xl">
                Built in the <em>open</em>
              </h2>
              <p className="text-[15px] text-[#98A1B3] mt-2 max-w-lg">
                Tools for agent builders, mostly. Selected projects from the public repos.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
            >
              All repositories
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.repo} project={project} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
