# 🏛️ MELKOR OS: MEMORY ARCHITECTURE v1.0
## The Three-Layer Cognitive Hierarchy

**Created:** December 23, 2025  
**Applies To:** All Agents (2A, 2B, and specialized)  
**Status:** 🟢 ACTIVE

---

## ARCHITECTURAL OVERVIEW

Melkor OS operates on a **Three-Layer Memory Hierarchy**. Each layer serves a distinct cognitive function, and agents must understand when to access which layer.

```
┌─────────────────────────────────────────────────────────────────┐
│                    MEMORY HIERARCHY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   LAYER 1: STRATEGIC MEMORY (The "Will")                        │
│   ├── Long-term project goals                                   │
│   ├── Irreversible decisions                                    │
│   └── Cross-department coordination                             │
│                                                                 │
│   LAYER 2: FORENSIC VAULT (The "Evidence")                      │
│   ├── Original source PDFs                                      │
│   ├── Multimodal verification capability                        │
│   └── Final authority on policy details                         │
│                                                                 │
│   LAYER 3: KNOWLEDGE LIBRARY (The "Knowledge")                  │
│   ├── Cleaned markdown summaries                                │
│   ├── Fast text retrieval                                       │
│   └── Database seeding source                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## LAYER 1: STRATEGIC MEMORY (The "Will")

### Location
```
Melkor-OS/memory/STRATEGIC_MEMORY_LOG.md
```

### Purpose
- Tracks project vision, milestones, and high-level state
- Records irreversible architectural decisions
- Provides context continuity across sessions
- Enables cross-department coordination

### Access Pattern
| Agent | Permission | Use Case |
|-------|------------|----------|
| Agent 2A | Read/Write | Log strategic decisions |
| Agent 2B | Read/Write | Log strategic decisions |
| CTO Agents | Read/Write | Architectural planning |
| Production Agents | Read Only | Context awareness |

### Update Protocol
```markdown
## [DATE]: [Decision Title]
**Agent:** [Which agent made this entry]
**Impact:** [High/Medium/Low]

### Decision
[What was decided]

### Rationale
[Why this decision was made]

### Locked-In Status
- [ ] Temporary (can be reversed)
- [x] Permanent (never revert)
```

---

## LAYER 2: FORENSIC VAULT (The "Evidence")

### Location
```
URIs stored in: departments/nerd-with-nart/nerd/vault-manifest.json
PDFs stored in: departments/nerd-with-nart/nerd/references/brochures/pdfs/
```

### Purpose
- Original source-of-truth AIA policy PDFs
- Enables multimodal verification (AI can "see" the document)
- Final authority when markdown and memory disagree
- Forensic cross-referencing for complex queries

### Access Pattern
| Agent | Permission | Use Case |
|-------|------------|----------|
| Agent 2A | Read | Policy verification |
| Agent 2B | Read | Policy verification |
| Proposal Generator | Read | Quote validation |
| Sovereign Auditor | Read | Compliance checking |

### Access Method
```typescript
// Agents access via Google Gemini File API
// URI format: https://generativelanguage.googleapis.com/v1beta/files/{fileId}

// Example: Query the Master PDF
const masterPdfUri = "https://generativelanguage.googleapis.com/v1beta/files/2y22yl0raf9d";
```

### Authority Rule
```
⚠️ CONFLICT RESOLUTION:
If the Knowledge Library (markdown) and the Forensic Vault (PDF) disagree,
the PDF is the FINAL AUTHORITY.
```

### Expiry Warning
```
Google File API URIs may expire after 48 hours of inactivity.
If URIs become invalid, re-run: npx tsx scripts/setup-vault.ts
```

---

## LAYER 3: KNOWLEDGE LIBRARY (The "Knowledge")

### Location
```
departments/nerd-with-nart/nerd/references/brochures/library/
```

### Purpose
- Cleaned, structured markdown summaries of policies
- Optimized for fast text retrieval
- Source for vector database seeding (nerd_brain)
- Human-readable reference

### Structure
```
nerd/references/brochures/
├── library/           # Cleaned markdown (FINAL)
│   ├── aia-multi-pay-ci-plus-th.md
│   ├── aia-hb-extra-en.md
│   └── aia-benefits-plus-2025.md
├── assets/            # Images for markdown files
│   └── aia-multi-pay-ci-plus/
├── raw/               # Staging for new scans (TEMPORARY)
└── pdfs/              # Original PDFs (FORENSIC SOURCE)
```

### Access Pattern
| Agent | Permission | Use Case |
|-------|------------|----------|
| Agent 2A | Read/Write | Cleaning and formatting |
| Agent 2B | Read/Write | Cleaning and formatting |
| nerd_brain | Read | Vector embedding source |
| Production Agents | Read | Fast policy lookup |

### Processing Pipeline
```
PDF (Original)
    ↓
External Converter (PDF → Markdown)
    ↓
raw/ folder (Dirty markdown)
    ↓
Brochure Cleaner Agent (instruction-brochure-cleaner.md)
    ↓
library/ folder (Clean markdown)
    ↓
nerd_brain (Vector embeddings)
```

---

## QUERY DECISION TREE

When an agent receives a policy question:

```
START
  │
  ├─ Is this a SIMPLE factual query?
  │   YES → Search nerd_brain (Vector DB)
  │         └─ Found? → Return answer
  │         └─ Not found? → Continue ↓
  │
  ├─ Is this a DETAILED policy query?
  │   YES → Search library/ (Markdown)
  │         └─ Found? → Return answer
  │         └─ Not found? → Continue ↓
  │
  ├─ Is this a FORENSIC verification query?
  │   YES → Access Vault (PDF via URI)
  │         └─ Use File Search tool
  │         └─ Cite page/section
  │
  └─ Is there a CONFLICT between sources?
      YES → Vault (PDF) is FINAL AUTHORITY
```

---

## CROSS-LAYER INTEGRITY RULES

### Rule 1: Single Source of Truth
Each layer has a specific authority domain. Do not mix authorities.

### Rule 2: Escalation Path
Always start with the fastest layer (Vector DB) and escalate to slower layers only when needed.

### Rule 3: Conflict Resolution
```
Vector DB < Markdown Library < PDF Vault
(Fastest)                      (Authoritative)
```

### Rule 4: Update Propagation
When a PDF is updated:
1. Re-upload to Vault (new URI)
2. Re-clean markdown to library/
3. Re-embed to nerd_brain

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Dec 23, 2025 | Initial architecture documentation |

---

*MEMORY ARCHITECTURE v1.0*  
*"Three layers, one truth."*
