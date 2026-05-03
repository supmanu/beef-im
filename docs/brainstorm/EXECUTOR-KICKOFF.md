# beef.im — Executor Kickoff Prompt

**Purpose:** Paste the prompt block below into a fresh Sonnet 4.6 session, started in `~/Melkor-OS/departments/nerd-with-nart/`, to begin Phase 0 of the implementation plan.

**Recommended model:** Sonnet 4.6 for execution (Phases 0-3). Escalate to Opus 4.7 only if Sonnet hits a judgment-call wall (most likely on the WebGL shader rendering verification or financial logic in Phase 4 calculator port).

**Model routing update (2026-05-04):** Kimi K2.6, GLM-5.1, and DeepSeek V4 Pro via **OpenCode GO subscription** have been tested for a week on agentic execution tasks without the excessive token burn previously observed on direct API usage. They are now considered viable for execution work when accessed through OpenCode GO. Earlier concerns about prompt caching and 100×+ token burn applied to direct API routing, not the OpenCode GO pipeline. Use whichever model is available — Sonnet 4.6 remains the default, but Kimi K2.6/GLM-5.1/DeepSeek V4 Pro via OpenCode GO are acceptable alternatives.

---

## The prompt

```
I'm executing the approved implementation plan for beef.im.

CANONICAL PLAN (read first, in full, then keep it loaded):
docs/brainstorm/IMPLEMENTATION-PLAN-FINAL-opus47.md

That document is the source of truth. It supersedes the three earlier
LLM plans (final-glm, FINAL-deepseek, final-kimi) in the same directory —
do not consult those unless the final plan explicitly references them.

VISUAL CONTRACT (the layout we are protecting):
The current article layout — best seen on /experiment/ribeye-reverse-sear
on the live site, source at src/content/experiment/ribeye-reverse-sear.mdx
plus src/layouts/ArticleLayout.astro and the MDX components in
src/components/mdx/ — IS the gold standard. Cream parchment, 24px graph
grid, top-left format badge, margin notes on both sides, inline ScrapCard,
closing VerdictSeal stamp, footer block with date/author/volume/temperature/
mono ID. Every article must continue to look like that screenshot after
migration. Section §7 acceptance criterion explicitly checks this.

WHAT TO DO NOW: Phase 0 only. Stop after Phase 0 and wait for me to review
the preview deploy before touching Phase 1.

Phase 0 scope (per plan §4):
1. Create branch: feat/taxonomy-pivot
2. mkdir src/content/{insurance,meat,note}
3. git mv the 4 existing articles into the new collections per plan §4
4. Rewrite src/content.config.ts with the schema from plan §3
   (note: format is z.string().optional() — free-form badge, NOT an enum)
5. Update src/pages/[...slug].astro to query the three new collections
6. Update src/pages/index.astro to query the three new collections
7. Update src/layouts/ArticleLayout.astro to derive watermark from collection
8. Update src/components/NotebookEntry.astro to accept new props
9. Update src/components/Footer.astro for the third 'note' watermark variant
10. Create public/_redirects with the 4 article 301s + glob fallbacks
11. Run npm run build, then npm run dev, smoke-test every URL

OPERATING RULES (non-negotiable):
- This is a git submodule. Never check out, reset --hard, or clean
  uncommitted changes without explicit permission.
- Per-change approval: propose each substantive edit (especially CSS
  values, schema changes) before applying. Don't bundle multiple edits
  under a blanket "approved." User feedback memory:
  feedback_per_change_approval.md
- Stay on feat/taxonomy-pivot. Do not push to main. Do not merge.
- Use TaskCreate to track the 11 steps above. Mark in_progress when
  starting each, completed when done.
- After Phase 0 acceptance criteria are met (plan §4), commit the
  branch and report back. Do NOT auto-proceed to Phase 1.
- If anything in the plan is ambiguous given the actual codebase,
  ASK before improvising. The plan is the contract.

Existing context that auto-loads on session start:
- CLAUDE.md (department) covers brand laws, protected files, save protocol
- .claude/rules/ covers paradox architecture, content compliance, agent
  patterns, semantic versioning, repository structure
- Datacore session_start should fire automatically

Begin by reading the plan file in full, then the current state of the
files you'll be editing in Phase 0, then propose your first three steps.
```

---

## After Phase 0 — kickoff for Phase 1

When Phase 0 has shipped to a Cloudflare Pages preview URL and you've reviewed it green, paste this for the next phase:

```
Phase 0 reviewed and merged. Proceed to Phase 1 per plan §5.
Branch: feat/static-pages, off the latest main.
Stop after Phase 1 acceptance criteria are met. Do not auto-proceed
to Phase 1b. Same operating rules apply.
```

Same incrementing pattern for Phases 1b, 2, 3, 4 — name the phase, name the branch, restate the stop point.

---

## When to escalate to Opus 4.7

Sonnet 4.6 should handle ~95% of this plan. Escalate only when:

- The WebGL fragment shader (Phase 1b §6.4) renders wrong and Sonnet's debug iteration isn't converging within ~30 minutes
- The hand-drawn flourish SVG path or the three pillar mascots need creative judgment beyond what Sonnet produces (alternative: draw them in Figma/Affinity by hand — usually faster than coaxing the right SVG out of any model)
- The Phase 4 calculator port encounters a financial-logic edge case where being right matters more than being fast (COI projections, IRR comparisons)

Default behavior: Sonnet runs the plan, you review preview deploys, escalate only when stuck.
