import reportData from "./reports.json";
import { ReportsSchema } from "./contracts";

const company = { name: "Kairox AI", url: "https://kairoxai.live/" } as const;
const newsletter = {
  name: "The Living Edge",
  url: "https://thelivingedge.substack.com/",
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
const introduction = [
  [
    "I’m a co-founder of ",
    { text: company.name, href: company.url },
    ", building ",
    { text: projects[0].name, href: projects[0].url },
    ". I’m interested in what it takes for AI agents to follow a task through to completion.",
  ],
  [
    "My background spans software development, DevOps, analysis and developer relations. I tinker daily, and I share some of that work here as it takes shape.",
  ],
  [
    "I also write ",
    { text: newsletter.name, href: newsletter.url },
    ", my newsletter on multimodal AI.",
  ],
] as const;
const introductionText = introduction.map(paragraph =>
  paragraph.map(part => (typeof part === "string" ? part : part.text)).join("")
);
export const site = {
  origin: "https://philipbankier.com",
  name: "Philip Bankier",
  introduction,
  description: introductionText[0],
  bio: introductionText.join(" "),
  email: "philip@kairoxai.live",
  contact: {
    heading: "Let’s compare notes.",
    invitation:
      "If something here connects with what you’re working on, send me a note. I’m happy to compare approaches or talk through a problem you’re still figuring out.",
  },
  company,
  newsletter,
  sameAs: ["https://github.com/philipbankier"],
} as const;
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
