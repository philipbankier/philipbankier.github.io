import reportData from "./reports.json";
import { ReportsSchema } from "./contracts";

export const site = {
  origin: "https://philipbankier.com",
  name: "Philip Bankier",
  description:
    "Philip Bankier, co-founder of Kairox AI. Explore his work and writing.",
  bio: "Co-founder of Kairox AI. Building ActRun and writing The Living Edge.",
  email: "philip@kairoxai.live",
  company: { name: "Kairox AI", url: "https://kairoxai.live/" },
  newsletter: {
    name: "The Living Edge",
    url: "https://thelivingedge.substack.com/",
  },
  sameAs: ["https://github.com/philipbankier"],
} as const;
export const projects = [
  {
    name: "ActRun",
    url: "https://actrun.ai",
    domain: "actrun.ai",
    description: "An AI workspace that connects to your apps.",
  },
  {
    name: "PromptCache",
    url: "https://promptcache.live",
    domain: "promptcache.live",
    description: "A directory for discovering and sharing AI prompts.",
  },
] as const;
export const repositories = [
  [
    "awesome-agent-skills",
    "A directory of skills and tools for AI coding agents.",
  ],
  [
    "tastekit",
    "Interviews you about how you want AI agents to work, then writes reusable instruction files.",
  ],
  ["codex-handoff-skill", "A skill for handing coding plans to Codex CLI."],
  ["brain-dump", "Backup tooling for AI agent memory, built around restic."],
  ["agent-cli-skills", "A skill library for AI command-line agents."],
  [
    "lex-the-computer",
    "A self-hosted workspace for AI chat and scheduled tasks.",
  ],
  [
    "technical-visualizer",
    "Turns code and technical documents into HTML visual drafts, with optional AI image generation.",
  ],
  ["riskradar", "Portfolio risk analysis and visualization."],
].map(([name, description]) => ({
  name,
  description,
  url: `https://github.com/philipbankier/${name}`,
}));
export const reports = ReportsSchema.parse(reportData);
