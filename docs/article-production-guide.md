# Article Production Guide — Two Methods
**Version:** 1.2 | **Updated:** March 29, 2026
**Purpose:** Step-by-step reference for producing articles. Now includes `/publish` for zero-touch CMS publishing.

---

## Claude Code Skills (NEW — Phase VI Complete)

These skills are now available as slash commands in Claude Code CLI when working inside the `nerd-with-nart` directory:

| Command | What It Does | Agent |
|---------|-------------|-------|
| `/architect [topic] [mode]` | Generate a GSB-Kane Blueprint | Agent 1 |
| `/performer [blueprint]` | Execute blueprint into Thai article | Agent 2 |
| `/hybrid [topic] [mode]` | One-shot: Blueprint + Write in single pass | All-in-one |
| `/auditor [article]` | Run 6-point compliance audit | Agent 3 |
| `/produce-article [topic] [mode]` | Full pipeline: Architect → Performer → Auditor | All 3 agents |
| `/publish [path.md] [--draft]` | Publish .md file directly to Payload CMS | Publishing |
| `/seed [raw idea]` | Capture raw idea as structured seed file | Intake |

**How they work:** Each skill auto-injects the relevant pillar files (voice-dna, constitution, terminology, etc.) into the prompt using shell preprocessing. No manual copy-paste needed.

**`/publish` workflow:** Converts markdown → Lexical JSON, resolves categories and cover images, creates/updates article in Payload via Local API. No manual copy-paste into the admin UI.

**Location:** `.claude/skills/{architect,performer,hybrid,auditor,produce-article,publish,seed}/SKILL.md`

### End-to-End Pipeline (Zero Manual Steps)

```
/seed [raw idea]                              ← capture to Obsidian
/produce-article [topic] [mode]               ← full 3-agent pipeline
(save approved output as .md with frontmatter)
/publish nerd/output/article-slug.md          ← directly to Payload CMS
```

### Mastra AI Status

**Note (March 29, 2026):** Mastra RAG (`nerd_brain` PgVector) is confirmed **non-core** — it was exploratory for token optimization research. The file-based `.md` knowledge system (Obsidian + `.claude/rules/`) is the battle-tested production workflow. Mastra Method 2 below remains documented for reference but is not required for article production.

---

## Quick Comparison

| Aspect | Method 1: Classic (File-Based) | Method 2: Mastra AI (Vector DB) |
|--------|-------------------------------|--------------------------------|
| **Token Cost** | HIGH (~50-70K tokens per article) | LOW (~5-10K tokens per article) |
| **Quality** | Battle-tested, predictable | Depends on retrieval quality |
| **Setup** | Copy-paste pillar files into prompt | Agent has vector search tools |
| **Best For** | High-stakes content, fine-tuning | Daily production, scaling |
| **Where** | Any AI chat (Cherry Studio, Claude, etc.) | Mastra agents (CLI, MCP, API) |
| **Knowledge** | Full pillar files in context | Chunked retrieval from `nerd_brain` |

---

## Shared Prerequisites

Both methods use the same **3-Agent Pipeline**:

```
Agent 1: ARCHITECT (Blueprint)    → Gemini
Agent 2: PERFORMER (Writing)      → Claude
Agent 3: AUDITOR (Compliance)     → Gemini
```

### Content Modes

| Mode | Length | Use Case | Frequency |
|------|--------|----------|-----------|
| **S** (Quick) | 150-300 words | Social media posts | 5x/week |
| **A** (Analysis) | 600-1,000 words | Deep dives | 2x/week |
| **B** (Pillar) | 1,500-2,000 words | Authority pieces | As needed |
| **C** (Epic) | 2,500-3,500 words | Multi-week series | Monthly |

### Key File Locations (Sovereign Knowledge)

| File | Path | Purpose |
|------|------|---------|
| Voice DNA | `nerd/pillars/voice-dna.md` | Core identity & personality |
| Constitution | `nerd/pillars/constitution.md` | Brand laws & banned terms |
| Content Engine | `nerd/pillars/content-engine.md` | Frameworks & structures |
| Framework Deep Dive | `nerd/pillars/framework-deep-dive.md` | Research protocol |
| NHES VII Data | `nerd/pillars/data-nhes-vii.md` | Thai health benchmarks |
| Terminology | `nerd/pillars/data-terminology.md` | 35 verified Thai terms |
| Thai Handshake | `nerd/pillars/data-thai-handshake-exceptions.md` | Formatting rules |
| Bridge Lab | `nerd/pillars/tech-bridge-lab.md` | 25 analogy bridges |
| Citation Templates | `nerd/pillars/data-citation-template.md` | Source citation format |
| Architect Instructions | `nerd/agents/instruction-architect.md` | Agent 1 system prompt |
| Performer Instructions | `nerd/agents/instruction-performer.md` | Agent 2 system prompt |
| Auditor Instructions | `nerd/agents/instruction-sovereign-auditor.md` | Agent 3 system prompt |
| Proposal Logic | `nerd/pillars/data-proposal-logic.md` | Insurance proposal decisions |

---

## METHOD 1: CLASSIC (File-Based, Full Context)

### Overview
Every pillar file is loaded in full — no chunking, no retrieval gaps. Expensive but guaranteed quality.

**Two ways to execute Method 1:**

| Option | Platform | How |
|--------|----------|-----|
| **A: Claude Code Skills** | Claude Code CLI | `/architect`, `/performer`, `/auditor` (auto-loads files) |
| **B: Manual Copy-Paste** | Cherry Studio / Any AI chat | Attach pillar files manually to each prompt |

**Option A is now the recommended way** — it does the same thing as manual copy-paste but automates the file injection via Claude Code skills.

### Step 1: Architect Blueprint (Agent 1)

**Platform:** Cherry Studio / Claude / Gemini (any chat with file upload)
**Model:** Gemini 2.5 Pro or Claude Opus (reasoning models preferred)

**Files to attach/paste into the system prompt:**
1. `instruction-architect.md` — Agent 1 system prompt
2. `voice-dna.md` — Identity & philosophy
3. `framework-deep-dive.md` — Research protocol
4. `data-nhes-vii.md` — Health benchmarks
5. `data-terminology.md` — Verified terms
6. `content-engine.md` — Mode structures (optional, for length calibration)

**User prompt:**
```
Topic: [Your topic here]
Mode: [S / A / B / C]

Create a GSB-Kane Strategic Blueprint for this topic.
Find the Paradox — what do people wrongly believe vs what reality shows?
```

**Expected output:** A structured blueprint with:
- Core Contradiction (The Lie vs The Truth)
- Sinek Hook (specific person/avatar, NOT a statistic)
- Archetype (1: Uncomfortable Truth / 2: Hidden Cost / 3: Simple Swap)
- Narrative Arc (Hook → Context → Mechanism → Pivot → Solution → Close)
- Data anchors (NHES VII citations, regulatory references)

### Step 2: Performer Execution (Agent 2)

**Platform:** Cherry Studio / Claude (Claude preferred for Thai writing quality)
**Model:** Claude Sonnet 4.5+ (writing quality matters here)

**Files to attach/paste into the system prompt:**
1. `instruction-performer.md` — Agent 2 system prompt
2. `voice-dna.md` — Identity & tone
3. `constitution.md` — Brand laws & bans
4. `data-thai-handshake-exceptions.md` — Thai/English formatting rules
5. `tech-bridge-lab.md` — Analogy bridges
6. `data-terminology.md` — Verified Thai terms
7. `data-nhes-vii.md` — Health benchmarks
8. `data-citation-template.md` — Citation format

**User prompt:**
```
Here is the Architect Blueprint:

[Paste the full blueprint from Step 1]

Execute this blueprint as a Mode [S/A/B/C] article.
Follow all compliance rules in the performer instructions.
```

**Pre-submission checklist (Agent 2 should self-verify):**
- [ ] Tone correct? (T1: Benevolent Teacher for standard articles)
- [ ] No meta-labels? (No "Hook:", "Bridge:", "Act I:")
- [ ] Headers in pure Thai? (No English sub-headers)
- [ ] NHES VII stats used (not outdated NHES 6)?
- [ ] Watermark count correct? (S=1, A=3, B=4, C=5)
- [ ] Thai-First ratio >= 85%?
- [ ] Correct spelling: นาถ (not นาท)?
- [ ] Footer matches template: `📊 บทวิเคราะห์โดย: เนิร์ดกับนาถ (Nerd with Nart)`
- [ ] No "พี่" (Pi) self-reference?
- [ ] No English headers in production output?

### Step 3: Sovereign Auditor (Agent 3)

**Platform:** Cherry Studio / Gemini (compliance verification)
**Model:** Gemini 2.5 Pro (analytical/thinking model)

**Files to attach/paste:**
1. `instruction-sovereign-auditor.md` — Agent 3 system prompt
2. `constitution.md` — Laws to verify against
3. `data-nhes-vii.md` — Benchmark verification
4. `data-terminology.md` — Term verification

**User prompt:**
```
AUDIT this article for compliance:

[Paste the full article from Step 2]

Run the 6-Point Compliance Audit:
1. OIC Compliance (waiting periods, guaranteed renewal)
2. Revenue Code Tax Rules (annuity limits, hold requirements)
3. PDPA Privacy (no child full names)
4. SEC Investment Disclaimers (risk warnings)
5. FDA Health Claims (no "cure" claims)
6. Brand Constitution Compliance (banned terms, identity rules)
```

**Expected output:** PASS or REJECT with specific violations and a forensic reconstruction (corrected version) if rejected.

### Step 4: Publish

1. Copy the final approved article
2. Go to Payload CMS Admin: `https://[your-domain]/admin`
3. Create new Article:
   - Title (Thai)
   - Slug (auto-generated or manual)
   - Published Date
   - Cover Image (upload to R2)
   - Category (select from: Deep Dive, Quick Magnet, News, Case Study)
   - Content (paste into Lexical editor)
4. Set status to Published
5. Article appears at `/articles/[slug]`

---

## METHOD 2: MASTRA AI (Vector DB + Agent Pipeline)

### Overview
The Mastra agents use `searchNerdBrain` (vector search) to retrieve relevant knowledge chunks on demand, rather than loading full files into context. Voice DNA is still injected statically for identity consistency.

### Current System State (March 2026)

| Component | Status |
|-----------|--------|
| Vector DB (`nerd_brain`) | **231 rows** across 32 files |
| Embedding Model | `gemini-embedding-001` (3072 dims) |
| Vector Index | None (sequential scan, ~100ms on 231 rows) |
| Nart Avatar Agent | Gemini 2.5 Flash + `searchNerdBrain` + `calculatePremium` |
| CTO Conductor Agent | Gemini 2.5 Pro + `searchNerdBrain` + `askNartAvatar` |
| MCP Server | Available via `scripts/mastra-mcp.ts` (Cherry Studio StdIO) |

### What's Loaded Statically vs Retrieved

| Knowledge | Loading Method | Why |
|-----------|---------------|-----|
| Voice DNA | **Static** (full file in system prompt) | Identity must be 100% consistent |
| Constitution (summary) | **Static** (5-line summary in prompt) | Core rules always present |
| Negative Constraints | **Static** (5 hard rules in prompt) | No "พี่", no English headers, etc. |
| Constitution (full) | **Vector search** | Retrieved when compliance questions arise |
| Content Engine | **Vector search** | Retrieved when writing structure needed |
| NHES VII Data | **Vector search** | Retrieved when health stats needed |
| Terminology | **Vector search** | Retrieved when term verification needed |
| Bridge Lab | **Vector search** | Retrieved when analogies needed |
| Proposal Logic | **Vector search** | Retrieved for insurance proposals |
| AIA Brochures | **Vector search** | Retrieved for product details |
| Premium Rates | **Tool** (`calculatePremium`) | Deterministic CSV lookup, not vector |

### Step 1: Architect Blueprint (via CTO Conductor or Manual)

**Option A: CTO Conductor Agent (automated)**
```bash
cd departments/nerd-with-nart
npx tsx scripts/test-agent.ts
# Or via MCP in Cherry Studio
```

The CTO Conductor can:
- Search `nerd_brain` for context
- Delegate to Nart Avatar for content
- Verify compliance

**Option B: Manual with Mastra search (hybrid)**

Use any AI chat, but instead of attaching full files, query `searchNerdBrain` first:

```bash
# Test what the vector DB returns for your topic
node -e "
require('dotenv').config();
const pg = require('pg');
const { embed } = require('ai');
const { google } = require('@ai-sdk/google');
const client = new pg.Client(process.env.DATABASE_URL);
(async () => {
  await client.connect();
  const { embedding } = await embed({
    model: google.textEmbeddingModel('gemini-embedding-001'),
    value: '[YOUR TOPIC HERE]',
  });
  const vec = '[' + Array.from(embedding).join(',') + ']';
  const result = await client.query(
    'SELECT metadata FROM nerd_brain ORDER BY embedding <=> \$1::vector LIMIT 5',
    [vec]
  );
  result.rows.forEach((r, i) => {
    console.log((i+1) + '. ' + r.metadata.filename);
    console.log('   ' + (r.metadata.text || '').substring(0, 150));
  });
  await client.end();
})();
"
```

### Step 2: Nart Avatar Execution

**Option A: CLI Test**
```bash
cd departments/nerd-with-nart
npx tsx scripts/test-agent.ts
```

Edit `scripts/test-agent.ts` to change the prompt:
```typescript
const prompt = `
Here is a Blueprint:

[Paste blueprint]

Write a Mode A article following this blueprint.
Search for Content Engine structure and Constitution rules.
`;
```

**Option B: MCP via Cherry Studio**

1. Configure Cherry Studio MCP with StdIO transport:
   ```json
   {
     "command": "npx",
     "args": ["tsx", "scripts/mastra-mcp.ts"],
     "cwd": "/home/supmanu/Melkor-OS/departments/nerd-with-nart"
   }
   ```
2. Start a chat with `nart-avatar` or `cto-conductor`
3. The agent will automatically call `searchNerdBrain` when it needs knowledge

**Option C: CTO Conductor (Full Pipeline)**

The CTO Conductor can orchestrate the entire flow:
1. You give it a topic
2. It searches `nerd_brain` for strategic context
3. It delegates writing to `askNartAvatar`
4. It audits the output against constitutional rules
5. Returns the final article

```bash
# Modify test script to use CTO Conductor
node -e "
require('dotenv').config();
import { ctoConductor } from './nerd/agents/cto-conductor';

const result = await ctoConductor.generate([{
  role: 'user',
  content: 'Create a Mode A article about why term insurance is safer than whole life. Find the Paradox first, then delegate to Nart Avatar.'
}]);
console.log(result.text);
"
```

### Step 3: Manual Audit (Recommended)

Even with the CTO Conductor, run a manual audit for high-stakes content:

1. Copy the Mastra-generated article
2. Follow Method 1, Step 3 (Sovereign Auditor) with full file attachments
3. Compare output quality against Method 1 articles

### Step 4: Publish

Same as Method 1, Step 4 — paste into Payload CMS Lexical editor.

---

## Side-by-Side Testing Protocol

To compare both methods fairly:

### Test Plan

1. **Pick 3 topics** across different modes:
   - Mode S: Quick social post (e.g., "One number every Thai person should know")
   - Mode A: Analysis article (e.g., "Why term insurance is safer than whole life")
   - Mode B or C: Deep dive (e.g., "The hidden cost of hospital cash riders")

2. **For each topic, produce two versions:**
   - Version A: Method 1 (Classic, full files in context)
   - Version B: Method 2 (Mastra AI, vector retrieval)

3. **Compare on these criteria:**

| Criterion | Weight | What to Check |
|-----------|--------|---------------|
| Factual Accuracy | 30% | Are NHES VII stats correct? Are regulatory rules accurate? |
| Voice Consistency | 25% | Does it sound like นาถ? Thai-First ratio? No "พี่"? |
| Structure Compliance | 20% | Correct mode structure? Right watermark count? Thai headers? |
| Depth of Analysis | 15% | Does it find the Paradox? Is the mechanism explained? |
| Efficiency | 10% | Token cost, time to produce, ease of workflow |

4. **Log results** in a comparison table:
   ```
   | Topic | Mode | Method | Accuracy | Voice | Structure | Depth | Tokens |
   |-------|------|--------|----------|-------|-----------|-------|--------|
   | Term vs Whole | A | Classic | 9/10 | 9/10 | 10/10 | 8/10 | ~60K |
   | Term vs Whole | A | Mastra | ?/10 | ?/10 | ?/10 | ?/10 | ~8K |
   ```

### What to Watch For (Known Risks)

**Method 2 (Mastra) potential weaknesses:**
- **Missing context:** Vector search may not return all relevant chunks for complex topics
- **Stale data:** If pillar files are updated but `sync-nerd.ts` hasn't been re-run
- **Chunking artifacts:** Large documents split awkwardly may lose context across chunk boundaries
- **Constitution gaps:** Only a 5-line summary is in static prompt; full rules require search

**Method 1 (Classic) potential weaknesses:**
- **Token cost:** 50-70K tokens per article is expensive at scale
- **Manual overhead:** Copy-pasting 7-8 files per agent step is tedious
- **Context window pressure:** Very large files may get truncated in smaller models

---

## Maintenance Commands

### Re-sync Vector DB (after updating pillar files)
```bash
cd departments/nerd-with-nart
npx tsx scripts/sync-nerd.ts
```

### Test Vector Search Quality
```bash
npx tsx scripts/test-brain.ts
```

### Test Full Agent Pipeline
```bash
npx tsx scripts/test-agent.ts
```

### Check Vector DB Status
```bash
node -e "
require('dotenv').config();
const pg = require('pg');
const c = new pg.Client(process.env.DATABASE_URL);
c.connect().then(async () => {
  const r = await c.query('SELECT COUNT(*) as rows FROM nerd_brain');
  const f = await c.query(\"SELECT COUNT(DISTINCT metadata->>'filename') as files FROM nerd_brain\");
  console.log(r.rows[0].rows + ' rows, ' + f.rows[0].files + ' files');
  await c.end();
});
"
```

### Start MCP Server (for Cherry Studio)
```bash
cd departments/nerd-with-nart
npx tsx scripts/mastra-mcp.ts
```

---

## Technical Reference

### Embedding Model
- **Model:** `gemini-embedding-001` (replaced deprecated `text-embedding-004`)
- **Dimensions:** 3072
- **Batch limit:** 100 items per API call (handled by sync script)
- **Vector index:** None (pgvector caps at 2000 dims; sequential scan on ~231 rows is ~100ms)

### Agent Models
- **Nart Avatar:** `gemini-2.5-flash` (speed + memory)
- **CTO Conductor:** `gemini-2.5-pro` (reasoning + oversight)
- **Performer (Classic):** Claude Sonnet 4.5+ (writing quality)
- **Auditor (Classic):** Gemini 2.5 Pro (analytical verification)

### Database
- **Provider:** Neon Postgres (serverless)
- **Table:** `nerd_brain` (231 rows, 32 files)
- **Schema:** `id`, `vector_id`, `embedding` (vector 3072), `metadata` (jsonb with `text`, `filename`, `type`)

---

*"The Classic method guarantees quality. The Mastra method promises scale. Test both, trust data."*
