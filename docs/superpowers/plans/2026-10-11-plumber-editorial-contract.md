# Plumber editorial contract

This is part of the [implementation plan](2026-10-11-plumber-implementation.md). It defines the corrections required before the four library reports can be promoted by the new homepage. It is a repair brief, not evidence that repairs have happened.

## Editorial boundary

Keep each report's title, original document date and existing URL. Add “Revised [the actual revision date]” when the revision is made. Document dates are not verified first-publication dates. Do not turn an April or May label into an invented day or timestamp.

Reduce unsupported material. Every retained factual assertion needs a directly relevant primary source beside the assertion or in a linked source note. Record the source URL, checked date and supported wording in `docs/content-review.md`. A bibliography alone does not support a whole report. Remove unsupported rankings, commercial figures, allegations, universal conclusions and quantitative gains. Do not spend this release reconstructing every historical statistic. Preserve removed material in Git history, not a second public page.

These are substantive reductions, especially in the roundup. They are included in the plan for approval. Editing local copies does not resolve the separate publication decisions for the Playbook, internal operational report, tracker or unlisted image.

## Homepage corrections

Use the approved standalone reference at `design-options/plumber-refined/index.html`, with these changes required by the report repairs:

| Item                 | Final copy or treatment                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Roundup description  | “Selected agent-tool and model announcements from April 2026, with links to the original announcements.”     |
| Taste description    | “Selected approaches to personalizing AI writing, with evaluation questions and primary sources.”            |
| Mobile description   | “A field guide to Android and iOS automation tools and their documented setup requirements.”                 |
| Playbook description | “A field brief comparing agent architectures and deployment tradeoffs, with sections on context and memory.” |
| Writing fallback     | “Writing checked [the snapshot's original fetch date].” Show this only when using the reviewed fallback.     |
| Old anchors          | `#ledger` reaches Selected work; `#open-source` reaches Code.                                                |

Keep the approved hero, project descriptions, eight repository descriptions and contact copy exactly as specified. Do not restore “Personal drawing set,” “AI Founder & Tinkerer,” “AI Founder · Builder · Analyst,” drawing numbers or unexplained studio labels. Keep the section title Code because a public repository is not necessarily open source. Do not label PromptCache a Kairox product; its current public footer credits Metaportal.

## Task 4 contract: Agent Playbook

File: `client/public/pages/agent-playbook.html`. Original document date: April 24, 2026. The current source line numbers below are navigation aids; locate the quoted text again before editing.

| Existing material                                                                                                                       | Required change                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Opening at 516–519, including “Harnesses now matter more than models,” “fastest-growing,” “moved entirely” and the Karpathy attribution | Replace the paragraph with “A field brief on agent architectures and the tradeoffs in context and memory design.”                                                                                                                                                                                          |
| Stat strip at 528–550: `247K★`, `95.6K★`, `94.87%`, `€15M`                                                                              | Delete the strip and its now-unused styling. Do not replace the numbers.                                                                                                                                                                                                                                   |
| “Mixing them produces the incoherent ‘ChatGPT wrapper with Redis’ products…”                                                            | Replace with “These patterns illustrate different ways to host and connect agents. The right choice depends on the work and deployment constraints.”                                                                                                                                                       |
| Framework prices, channel guarantees, provider/model counts, npm downloads and weekend delivery promises at 571–610                     | Delete. Retain named frameworks as documented examples, each linked to its own documentation.                                                                                                                                                                                                              |
| `13.7K`, `~70% of cost`, `~100K to 2–5K tokens`, `9+ concurrent tasks`, `$0.60/day` and the production-cost block                       | Delete. Use “Measure cost and concurrency on the workload you intend to run.”                                                                                                                                                                                                                              |
| “Observer/Reflector · 5–40× ratio”                                                                                                      | Replace with “Observation and reflection.”                                                                                                                                                                                                                                                                 |
| Memory leaderboard and superiority claims at 843–925                                                                                    | Remove the leaderboard, thresholds and claimed production results. Use “Mastra’s Observational Memory uses observation and reflection to condense message history. Evaluate retained facts and retrieval quality on your own conversations.” Any retained example must say “Illustrative observation log.” |
| “standard threat model,” “No guardrail product…,” “Any agent…” and “only structural mitigations”                                        | Use “A threat model to consider” and “Mitigations to evaluate.” Remove categorical effectiveness claims and unverified incident examples.                                                                                                                                                                  |
| Managed-service ranking, funding/stars and latency annotations at 1100–1109                                                             | Delete.                                                                                                                                                                                                                                                                                                    |
| Regulatory timeline and Practical consequence panel at 1117–1206                                                                        | Remove both. Use “Before publishing agent-generated material, check the rules that apply to the service and jurisdiction.” Link the official text without interpreting it as a universal obligation.                                                                                                       |
| Framework scoring matrix at 1221–1281                                                                                                   | Replace scores, counts, licensing/status claims and best-for verdicts with columns Framework, Documented deployment pattern, Documentation. Only retain rows verified from primary documentation.                                                                                                          |
| Model superiority, `40×`, “for the first time,” and “forces every production social agent…” at 1298–1313                                | Replace takeaways with “Evaluate the complete system on representative tasks.” and “Check what survives memory compression before relying on it.” Remove the regulatory prediction.                                                                                                                        |
| “Field Brief No. 04,” font-family credit and invented series metadata                                                                   | Remove unless an actual series is evidenced. Keep the title and document date.                                                                                                                                                                                                                             |
| “Internal // Research & Planning” and “Internal use”                                                                                    | Publication gate. After explicit permission to publish the corrected brief, use “Research brief” and “Originally issued April 24, 2026.” Do not mistake removing the labels for permission.                                                                                                                |

Primary references for retained subjects:

- [Mastra Observational Memory documentation](https://github.com/mastra-ai/mastra/blob/main/docs/src/content/en/docs/memory/observational-memory.mdx)
- [OpenClaw source and documentation](https://github.com/openclaw/openclaw)
- [Hermes Agent source and documentation](https://github.com/NousResearch/hermes-agent)
- [Mastra documentation](https://mastra.ai/docs)
- [The lethal trifecta discussion](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), attributed as the author's threat-model discussion, not a verified incident catalogue
- [Official Article 50 text](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50)

## Task 5 contract: April roundup

File: `client/public/pages/april-2026-ai-agent-roundup.html`. Original compilation date: April 25, 2026.

Replace the oversized unsourced report with a shorter sourced April edition. The opening is “Selected agent-tool announcements from April 2026, with links to the original announcements.” Retain this chronology, with a source link in every row:

| Date           | Exact description                                                                                | Primary source                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| April 2, 2026  | Cursor announced its Agents Window for working with agents across repositories and environments. | [Cursor announcement](https://forum.cursor.com/t/cursor-3-new-cursor-interface/156506)                          |
| April 3, 2026  | Microsoft announced Agent Framework 1.0 for .NET and Python.                                     | [Microsoft announcement](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/) |
| April 16, 2026 | Anthropic introduced Claude Opus 4.7.                                                            | [Anthropic announcement](https://www.anthropic.com/news/claude-opus-4-7)                                        |
| April 23, 2026 | OpenAI introduced GPT-5.5.                                                                       | [OpenAI announcement](https://openai.com/index/introducing-gpt-5-5/)                                            |

These dates describe the linked announcements. Microsoft's version history dates the release April 2, so retain “announced” for April 3. OpenAI records API availability on April 24; do not imply an April 23 API launch. Reopen the exact sources during execution and retain only what their text supports.

Remove the “120+ SOURCES” and “15 PROJECTS DEEP-DIVED” badges, metric cards and footer claims. Remove the leaderboard, estimated scores, pricing, commercial metrics, community percentages, retirement instructions and budget tiers. Remove the MemPalace/GBrain allegations and their repeated references. Remove the leak-interpretation section, security-incident counts and related allegations. Remove every remaining unsupported news item and its navigation entry.

End with: “Choose tools against a representative task. Check the current documentation, evaluate failure handling, and record the cost of a completed workflow.”

Replace script-driven tabs with ordinary section links and always-visible sections. Replace runtime Tailwind CDN styling with a small local stylesheet, `client/public/assets/css/reports.css`, used by this shortened document. Do not add a second Tailwind compiler for the old document. Keep the original AI-tool credit as a historical production note if its exact wording is retained; do not convert it into Philip's byline or put an AI model in a Person node. No Article author field is required without verified human authorship.

## Task 6 contract: Taste landscape

File: `client/public/pages/taste-landscape.html`. Original document date: April 2026.

Replace the scatterplot entirely. Its effectiveness/accessibility values are hardcoded without a measurement method; reversing labels would leave an invented ranking. Remove the point data and chart scripts after replacing the plot with a semantic table:

| Method                        | What changes                                                 | What must be evaluated                                                   | Primary source                                                                                                     |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Prompt optimization with GEPA | Proposes and evaluates prompt changes using feedback.        | Improvement against a held-out baseline; preserve instruction following. | [DSPy GEPA documentation](https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/GEPA/overview.md) |
| Context playbooks with ACE    | Revises context through generation, reflection and curation. | Whether the playbook preserves the author's choices on unseen examples.  | [ACE paper](https://arxiv.org/abs/2510.04618)                                                                      |
| Model activation steering     | Changes selected model activations during inference.         | Personal writing-style transfer requires its own evaluation.             | [Persona-vector research](https://www.anthropic.com/research/persona-vectors)                                      |

The last source studies model character traits; it does not establish reliable transfer of an individual writer's voice. Keep that distinction in the text. Other methods can remain only when the executor records a directly supporting primary source; otherwise remove them from the factual comparison and navigation. Prompting versus retrieval may remain as a proposed comparison, not as an established ranking.

| Existing claim                                                                                                 | Replacement or removal                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “every approach” / “Every technique”                                                                           | “Selected approaches.”                                                                                                                                                                         |
| Universal steering gains and sample counts                                                                     | “Activation steering changes selected model activations during inference. Applying it to personal writing style would require a separate evaluation.”                                          |
| ACE improvement guarantees                                                                                     | “ACE treats context as a playbook revised through generation, reflection and curation. Its application to personal writing style remains a proposed experiment.”                               |
| Persona correlations and automatic personal-style transfer                                                     | “Anthropic’s persona-vector research studies model character traits. It does not establish reliable transfer of an individual writer’s voice.”                                                 |
| “GEPA > HAND-WRITTEN PROMPTS, ALWAYS,” “strictly better” and guaranteed improvements                           | “GEPA uses feedback to propose and evaluate prompt changes. Compare the result with a held-out baseline.”                                                                                      |
| Sleep-time gains, portability guarantees, “nobody has assembled this”                                          | Delete. Use “Combining these techniques is a design hypothesis. A useful evaluation would test whether the combination preserves the author’s choices.”                                        |
| Fixed sample thresholds and numerical comparisons                                                              | Delete. Describe evaluation risks: insufficient examples, interference between changes, loss of instruction following.                                                                         |
| Cost and completion-time estimates                                                                             | Delete. Use “Start with examples you have permission to use and define what a successful result preserves. Compare prompting with retrieval before adding training or model-internal changes.” |
| Unsupported business case studies, quotations, numerical taste partitions and universal cognitive explanations | Delete. Retain only claims receiving a direct primary citation in this pass.                                                                                                                   |
| Percentage of taste captured                                                                                   | “This report does not establish a percentage of personal taste that any method captures. Editorial judgment should be evaluated separately from surface style.”                                |
| Name/year source string                                                                                        | Replace with relevant, clickable primary references beside retained claims.                                                                                                                    |

Replace the main expander and retained subsections with native `details`/`summary`. Keep all detail content in HTML. Remove their custom click handlers, chart hover labels and script-only content. Do not leave links to removed sections.

## Task 7 contract: Mobile agent nodes

File: `client/public/pages/mobile-agent-nodes.html`. Original document date: May 2026. Current technical revision gets its own actual date.

| Existing material                                                                      | Final treatment                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accessibility superiority claims                                                       | “Accessibility trees can provide element labels and structure. Their completeness varies by app, so screenshots and observed results still matter.”                                                                            |
| “All tools…integrate…”                                                                 | “Host requirements and agent integrations depend on the selected tool.”                                                                                                                                                        |
| PhoneAgent blanket compatibility                                                       | “PhoneAgent is an experimental project with an Android bridge and an XCTest-based iOS bridge. Its README documents support for physical devices and simulators; reliability varies by app.” Remove blanket Linux-host support. |
| agent-device capability claims                                                         | “agent-device supports Android and iOS automation. Physical iOS setup requires the documented Xcode, pairing and signing steps; supported commands vary by target.”                                                            |
| DroidRun/Mobilerun Android-only marks                                                  | Distinguish the local framework from its hosted service. Current framework docs include iOS through mobilerun-ios and WebDriverAgent. Do not reuse archived ios-portal instructions.                                           |
| “Quick setup, same for all tools”                                                      | “Follow the selected tool’s setup guide.”                                                                                                                                                                                      |
| Unverified installation commands                                                       | Remove; link the official setup guide.                                                                                                                                                                                         |
| “physical path works fine,” self-contained Termux recipe and universal platform matrix | Remove. Use tool-specific documented host requirements and supported-target links.                                                                                                                                             |
| Recommendation ranking and decision-tree claims                                        | Remove unsupported ordering and universal suitability claims. Present evaluation questions instead.                                                                                                                            |
| “5–15 minutes to first tap”                                                            | “Setup checklist.”                                                                                                                                                                                                             |
| Four checked checkboxes                                                                | Start unchecked. First test: “Open Settings and read the device’s OS version.” Do not instruct a configuration change as the first test.                                                                                       |
| Footer compatibility/pricing claims                                                    | “Compatibility and pricing depend on the selected tool. Technical notes reviewed [actual date].”                                                                                                                               |

Primary references:

- [PhoneAgent README](https://github.com/rounak/PhoneAgent)
- [agent-device installation](https://oss.callstack.com/agent-device/docs/installation)
- [agent-device command support](https://github.com/callstack/agent-device/blob/main/website/docs/docs/commands.md)
- [Mobilerun device setup](https://docs.mobilerun.ai/framework/guides/device-setup)

Documentation review is not physical-device acceptance. No host inspection, installation or device actions are included in this task.

## Shared report acceptance

Each report needs a `main` landmark, one primary heading, a Back to Library link to `/#library`, and keyboard-visible focus. Decorative SVGs use `aria-hidden="true"`; retained informational diagrams need visible text equivalents. Tables need captions and scoped headers. Wrap genuinely wide tables in labelled overflow regions rather than overflowing the page.

Use at least 16px body copy and 14px substantive metadata on phone layouts. Taste and Mobile currently use `#7A6F63` for small text on dark backgrounds, yielding about 3.46–4.06:1 contrast. Use the existing `#B5A999` for that content and verify the rendered foreground/background pairs meet 4.5:1. Preserve useful report character; do not apply the homepage's decorative wheel or simulated drawing labels to reports.

Checklist layout example:

```html
<fieldset class="setup-checklist">
  <legend>Setup checklist</legend>
  <label><input type="checkbox"> Read the selected tool’s setup guide.</label>
  <label><input type="checkbox"> Confirm its host and device requirements.</label>
  <label><input type="checkbox"> Complete the documented device pairing.</label>
  <label><input type="checkbox"> Open Settings and read the device’s OS version.</label>
</fieldset>
```

```css
.setup-checklist { display: grid; gap: 1rem; grid-template-columns: 1fr; }
.setup-checklist label { display: flex; align-items: flex-start; gap: .75rem; }
.setup-checklist input { margin-top: .3em; }
@media (min-width: 48rem) { .setup-checklist { grid-template-columns: 1fr 1fr; } }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
}
```

Check each repaired document at 375px and 1920px, keyboard-only, 200% text zoom, with JavaScript disabled and third-party fonts blocked. A source audit or successful HTML parse does not substitute for these browser checks.
