/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   About: two-column — label left, content right
   Background: subtle warm-blue texture
   ========================================================== */

import { useEffect, useRef } from "react";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028996532/UU4EAPRpsj4UbnDgByzebM/about-texture-R4ZBwsrm4d7z9uQPTRXskQ.webp";

const WORK_HISTORY = [
  { company: "KairoxAI", role: "Co-Founder & CEO", period: "2024 – Present", url: "https://kairoxai.live" },
  { company: "Domino Labs", role: "Product & Engineering", period: "2022 – 2024", url: null },
  { company: "BlueBite", role: "Product Engineering", period: "2020 – 2022", url: null },
  { company: "Tail Network", role: "Full-Stack Engineering", period: "2019 – 2020", url: null },
  { company: "MetaPortal", role: "Product Development", period: "2018 – 2019", url: null },
];

function useScrollFadeUp(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useScrollFadeUp(leftRef as React.RefObject<HTMLElement>);
  useScrollFadeUp(rightRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(${ABOUT_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "top right",
      }}
    >
      <div className="absolute inset-0 bg-white/85 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">About</span>
          <div className="accent-line flex-1 max-w-[60px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          {/* Left: Summary stats */}
          <div
            ref={leftRef}
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <h2 className="font-display font-bold text-[#0F1923] text-3xl leading-tight mb-6">
              Building at the<br />
              <span className="gradient-text">intersection of AI</span><br />
              and human ambition.
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { value: "~10", label: "Years building" },
                { value: "5+", label: "Startups shipped" },
                { value: "2", label: "Acquisitions" },
                { value: "∞", label: "Agents deployed" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-[#E8ECF0]">
                  <p className="font-display font-bold text-2xl text-[#0F1923]">{stat.value}</p>
                  <p className="text-[12px] text-[#64748B] mt-0.5 font-mono uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio + work history */}
          <div
            ref={rightRef}
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s" }}
          >
            <div className="space-y-4 text-[15px] text-[#475569] leading-relaxed mb-12">
              <p>
                I've spent nearly a decade at the intersection of product, engineering, and early-stage company building —
                helping founders translate ambitious visions into software that ships, scales, and sells. From founding
                teams to acquisition, I've been in the room where the hard decisions happen.
              </p>
              <p>
                Today, I'm focused on something I believe is the next fundamental shift in how work gets done:
                <strong className="text-[#0F1923] font-medium"> AI agents that manage other AI agents.</strong> Not
                just automation — orchestration. Systems that reason, delegate, and execute across your entire stack
                while you focus on what only humans can do.
              </p>
              <p>
                At <a href="https://kairoxai.live" target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium">KairoxAI</a>, we're building that future —
                starting with <a href="https://autopilotai.live" target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium">Autopilot</a>, your 24/7 AI workforce.
              </p>
            </div>

            {/* Work history */}
            <div>
              <p className="section-label mb-4">Work History</p>
              <div className="space-y-0">
                {WORK_HISTORY.map((item, i) => (
                  <div
                    key={item.company}
                    className="flex items-center justify-between py-3.5 border-b border-[#F1F5F9] last:border-0"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <div>
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            className="font-display font-semibold text-[14px] text-[#0F1923] hover:text-blue-600 transition-colors">
                            {item.company}
                          </a>
                        ) : (
                          <span className="font-display font-semibold text-[14px] text-[#0F1923]">{item.company}</span>
                        )}
                        <p className="text-[12px] text-[#94A3B8]">{item.role}</p>
                      </div>
                    </div>
                    <span className="mono-meta text-[11px]">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
