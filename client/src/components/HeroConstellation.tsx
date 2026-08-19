/* ==========================================================
   DESIGN: Editorial Ledger
   Constellation: the hero backdrop as a quiet live graph.
   Nodes are real repos, artifacts, and products; hover pulls
   one into focus, click navigates. Hand-placed positions,
   slow drift, static under prefers-reduced-motion.
   Desktop only (hidden below lg).
   ========================================================== */

import { useEffect, useRef } from "react";

type Node = {
  label: string;
  url: string;
  kind: "product" | "repo" | "artifact" | "writing";
  x: number; // normalized 0..1
  y: number;
  showLabel?: boolean;
};

const NODES: Node[] = [
  { label: "ActRun", url: "https://actrun.ai", kind: "product", x: 0.80, y: 0.14, showLabel: true },
  { label: "Kairox AI", url: "https://kairoxai.live", kind: "product", x: 0.68, y: 0.34, showLabel: true },
  { label: "awesome-agent-skills", url: "https://github.com/philipbankier/awesome-agent-skills", kind: "repo", x: 0.60, y: 0.20, showLabel: true },
  { label: "riskradar", url: "https://github.com/philipbankier/riskradar", kind: "repo", x: 0.90, y: 0.08 },
  { label: "tastekit", url: "https://github.com/philipbankier/tastekit", kind: "repo", x: 0.94, y: 0.86 },
  { label: "codex-handoff-skill", url: "https://github.com/philipbankier/codex-handoff-skill", kind: "repo", x: 0.56, y: 0.56 },
  { label: "brain-dump", url: "https://github.com/philipbankier/brain-dump", kind: "repo", x: 0.62, y: 0.76 },
  { label: "agent-cli-skills", url: "https://github.com/philipbankier/agent-cli-skills", kind: "repo", x: 0.72, y: 0.90 },
  { label: "lex-the-computer", url: "https://github.com/philipbankier/lex-the-computer", kind: "repo", x: 0.86, y: 0.94 },
  { label: "technical-visualizer", url: "https://github.com/philipbankier/technical-visualizer", kind: "repo", x: 0.50, y: 0.36 },
  { label: "The 2026 AI Agent Playbook", url: "/pages/agent-playbook.html", kind: "artifact", x: 0.34, y: 0.10 },
  { label: "April 2026 Agent Roundup", url: "/pages/april-2026-ai-agent-roundup.html", kind: "artifact", x: 0.47, y: 0.16 },
  { label: "Taste Transfer", url: "/pages/taste-landscape.html", kind: "artifact", x: 0.20, y: 0.86 },
  { label: "Mobile Agent Nodes", url: "/pages/mobile-agent-nodes.html", kind: "artifact", x: 0.40, y: 0.90 },
  { label: "The Living Edge", url: "https://thelivingedge.substack.com/", kind: "writing", x: 0.09, y: 0.14 },
];

const KIND_COLOR: Record<Node["kind"], string> = {
  product: "143, 194, 255",
  repo: "154, 164, 178",
  artifact: "224, 195, 138",
  writing: "144, 200, 164",
};

const LINK_DIST = 0.26;
const HOVER_RADIUS = 26;

export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    let mouse: { x: number; y: number } | null = null;
    let hovered = -1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pos = (n: Node, t: number) => {
      // Slow figure-eight drift, a few px, phase from the node's base position
      const amp = reduced ? 0 : 6;
      const px = n.x * w + amp * Math.sin(t * 0.00022 + n.x * 17);
      const py = n.y * h + amp * Math.cos(t * 0.00019 + n.y * 23);
      return { px, py };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const pts = NODES.map((n) => pos(n, t));

      // Edges
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = (pts[i].px - pts[j].px) / w;
          const dy = (pts[i].py - pts[j].py) / h;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          const near = hovered === i || hovered === j;
          const alpha = (1 - d / LINK_DIST) * (near ? 0.32 : 0.10);
          ctx.strokeStyle = `rgba(122, 143, 176, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].px, pts[i].py);
          ctx.lineTo(pts[j].px, pts[j].py);
          ctx.stroke();
        }
      }

      // Nodes + labels
      ctx.font = "9px 'JetBrains Mono', monospace";
      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        const { px, py } = pts[i];
        const active = hovered === i;
        const rgb = KIND_COLOR[n.kind];
        const r = n.kind === "product" ? 3 : 2.4;

        if (active) {
          ctx.fillStyle = `rgba(${rgb}, 0.16)`;
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${rgb}, ${active ? 0.95 : 0.42})`;
        ctx.beginPath();
        ctx.arc(px, py, active ? r + 1 : r, 0, Math.PI * 2);
        ctx.fill();

        if (active || n.showLabel) {
          ctx.fillStyle = active ? "rgba(237, 235, 228, 0.92)" : "rgba(110, 119, 135, 0.75)";
          const tx = Math.min(px + 8, w - ctx.measureText(n.label).width - 6);
          ctx.fillText(n.label, tx, py - 8);
        }
      }
    };

    const frame = (t: number) => {
      draw(t);
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const hitTest = (mx: number, my: number, t: number) => {
      let best = -1;
      let bestD = HOVER_RADIUS;
      NODES.forEach((n, i) => {
        const { px, py } = pos(n, t);
        const d = Math.hypot(px - mx, py - my);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const t = performance.now();
      const prev = hovered;
      hovered = hitTest(mouse.x, mouse.y, t);
      canvas.style.cursor = hovered >= 0 ? "pointer" : "default";
      if (reduced && hovered !== prev) draw(t);
    };
    const onLeave = () => {
      hovered = -1;
      canvas.style.cursor = "default";
      if (reduced) draw(performance.now());
    };
    const onClick = () => {
      if (hovered < 0) return;
      const n = NODES[hovered];
      if (n.url.startsWith("/")) window.location.href = n.url;
      else window.open(n.url, "_blank", "noopener,noreferrer");
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(performance.now()); });
    ro.observe(canvas);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);
    if (reduced) draw(performance.now());
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hidden lg:block absolute inset-0 w-full h-full"
    />
  );
}
