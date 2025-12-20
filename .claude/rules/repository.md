# Repository Management & Semantic Sovereignty

## Semantic Naming Convention (v2.0)
- **Rule:** All core files in `/nerd/pillars/` and `/nerd/agents/` must use semantic, version-less filenames.
- **Reference:** See `nerd/SYSTEM_MANIFEST_v1_0.md` for the Sovereign Source of Truth.
- **Goal:** Maintain stable internal references across prompts, agents, and codebase.
- **Pattern:** `[concept].md` (e.g., `voice-dna.md` NOT `Voice_DNA_v5_2.md`).

## Internal Reference Management
- **Rule:** Use relative semantic links within markdown files.
- **Pattern:** `[Title](file:///nerd/pillars/concept.md)`.
- **Sync Protocol:** When a file is renamed, a global search and replace must be performed to update all internal references.

## Repository Hierarchy
- `/nerd/pillars/`: Sovereign identity, laws, and content frameworks.
- `/nerd/agents/`: Logic definitions for Architect, Performer, and Auditor.
- `/nerd/research/`: Deep Research data and transcripts.
- `.claude/rules/`: Tactical coding and operational patterns.
- `app/`, `components/`, `lib/`: Direct root access (FLAT structure).

## Project Architecture (Flat Root)
- **Rule:** The project uses a **FLAT ROOT** structure.
- **Constraint:** NO `/src` folder allowed. All application code lives in root-level directories (`/app`, `/components`, `/lib`, etc.).
- **Reasoning:** Simplified resolution for Payload 3.0 and Vercel edge alignments.

## The "Save" Protocol
- Triggered by "save" or "log" commands.
- **Step 1:** Scan session for new patterns/decisions.
- **Step 2:** Update `SYSTEM_STATE.md` (Timestamp, Status, Objectives).
- **Step 3:** Update `.claude/rules/*.md` with new tactical patterns.
- **Step 4:** Brief report to user.
