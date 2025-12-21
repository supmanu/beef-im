# 🚀 Nerd with Nart: Financial Strategy Platform (Phase F-Lite)

**Sovereign AI Architecture for Financial Intelligence.**

This repository hosts the "Nerd with Nart" platform, a hybrid system combining a high-performance **Payload CMS** website (The Body) with a **Mastra/Google Gemini** cognitive layer (The Brain).

---

## 🏗️ System Architecture (The "Dual-Mapping" Protocol)

Our system is "Sovereign" — meaning it owns its data (Neon Postgres) and its memory (Postgres Vector Store).

### 1. The Body (Frontend & CMS)
*   **Framework:** Next.js 15.5.9 (App Router)
*   **CMS:** Payload 3.0 (Self-Hosted, Embedded)
*   **Database:** Neon Postgres (via `DATABASE_URI`)
*   **Storage:** Cloudflare R2 (S3-Compatible)
*   **Styling:** Tailwind CSS v3.4 (Teal Protocol)

### 2. The Brain (AI Agent System)
*   **Core:** Mastra Agent Framework
*   **Model:** Google Gemini 3 Flash (`gemini-3-flash`)
*   **Memory:** `@mastra/memory` (PostgresStore via `DATABASE_URL`)
*   **RAG:** `searchNerdBrain` tool (Pinecone/Neon Hybrid)
*   **Identity:** "Nerd with Nart" (Dual-Voice: Quant + Advocate)

---

## ⚡ Quick Start (Forensic Workbench)

We are currently in **Phase F-Lite**, utilizing **Cherry Studio** as our primary interface for the Mastra agents.

### 1. Environment Setup (.env)
**⚠️ CRITICAL RULE:** You must have **BOTH** keys pointing to your Neon DB.

```env
# PAYLOAD CMS (The Body)
DATABASE_URI="postgres://..."

# MASTRA AGENTS (The Brain)
DATABASE_URL="postgres://..."

# AI KEYS
GOOGLE_GENERATIVE_AI_API_KEY="AIza..."
```

### 2. Run the System
```bash
# Install dependencies
npm install

# Start the Hybrid Server (Next.js + Payload + API)
npm run dev
# -> http://localhost:3000
```

### 3. Interacting with the Avatar
The Avatar (`nart-avatar.ts`) is currently accessible via:
1.  **Terminal Scripts:** `npm run verify-avatar` (Turing Test)
2.  **Local R&D (Cherry Studio):**
    *   **Server Type:** StdIO
    *   **Command:** `npx`
    *   **Args:** `tsx scripts/mastra-mcp.ts`
    *   **Exposed Tools:** `nartAvatar` (Search)

---

## 📂 Key Directories

*   `nerd/`: **The Brain.** Contains agent rules, system state, and pillars.
*   `nerd/agents/`: **The Persona.** (`nart-avatar.ts` lives here).
*   `app/(site)/`: **The Face.** Public website pages.
*   `app/(payload)/`: **The Control Room.** CMS Admin panel.
*   `mastra/`: **The Tools.** Agent tool definitions (`search_nerd_brain.ts`).

---

## 📅 DECISION LOG

### Dec 21, 2025: PROTOCOL F-LITE (Forensic Pivot)
**Decided to:** Utilize Cherry Studio as the "Step 0 Forensic Lab" and bypass the immediate construction of a custom Next.js Chat UI.
**Reason:** To accelerate content creation for the Jan 5 launch by focusing on Intelligence R&D (Mastra + MCP) rather than frontend engineering.
**Status:** Phase E (Core) is stable. Moving to Phase F-Lite (MCP Bridge).

### Dec 21, 2025: ENV STABILIZATION
**Action:** Enforced "Dual-Mapping Law" for `.env`.
**Result:** Fixed `ECONNREFUSED` crash. `DATABASE_URI` and `DATABASE_URL` are now mandatory co-existing keys.
