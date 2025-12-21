# 🍒 CHERRY STUDIO CONFIGURATION (Sovereign Mode)

## 1. 📂 KNOWLEDGE BASE (FILES)
**Recommendation: UPLOAD NOTHING (Zero-Upload Protocol).**

### 🛑 The "Split-Brain" Risk
Your Sovereign Brain (`nerd_brain` in Postgres) is the Single Source of Truth.
*   If you upload files to Cherry Studio, you create a **Secondary Brain**.
*   This causes conflicting answers.

**✅ Correct Approach:**
Rely 100% on the `nart-avatar` tool. It already has direct access to your vectors via `searchNerdBrain`.

---

## 2. 🤖 MODEL STRATEGY (Dec 2025)

You are running a **Hybrid Intelligence** setup.

### The Orchestrator (Cherry Studio)
*   **Option A: The Daily Driver (DeepSeek v3.2)**
    *   **Model:** `DeepSeek v3.2 Chat` (or `Reasoner` for complex queries).
    *   **Verdict:** ✅ **APPROVED.** DeepSeek's function-calling capability is excellent and highly cost-effective. It works perfectly with standard MCP tools.
    *   **Use Case:** General forensic analysis, drafting, and iterative testing.

*   **Option B: The Reference Standard (Gemini 3 Pro Preview)**
    *   **Model:** `Gemini 3 Pro Preview` (Free Tier).
    *   **Verdict:** ✅ **NATIVE ALIGNMENT.** Best for "Critical Chain" tasks where tool accuracy matters more than reasoning depth.
    *   **Use Case:** Final verification or when DeepSeek gets stuck on a tool parameter.

### The Agent (Mastra Backend)
*   **Role:** Executing the logic and retrieving RAG data.
*   **Current Setting:** `Gemini 3 Flash Preview` (Hardcoded in `nart-avatar.ts`).
*   **Why:** Speed and efficiency for high-volume RAG tasks.

---

## 3. 💬 SYSTEM PROMPT
**Copy/Paste this EXACTLY into your Model Settings:**

**Prompt Name:** `Nerd with Nart Interface`
**Instructions:**
```text
You are the interface for the "Nerd with Nart" Sovereign Brain.

Your primary capability is the [nart-avatar] MCP tool.
*   For ANY question regarding financial strategy, insurance mechanics, health statistics (NHES VII), or the "Nerd with Nart" identity, you MUST use the [nart-avatar] tool.
*   Do not attempt to answer from your own internal training data if the query is domain-specific.
*   Trust the tool's output as the "Sovereign Truth".

Tone: Professional, precise, and subservient to the data returned by the Avatar.
```

---

---

## 4. 🧠 MEMORY SETTINGS (Global)
This setting controls "Short-Term Context" (Remembering what you chatted about in Cherry Studio).

### 4.1 Configuration Recommendation
### 4.1 Configuration Recommendation
*   **LLM Model:** `DeepSeek V3 Chat` (Recommended).
    *   *Alternative:* `Gemini 3 Pro Preview` (Free).
    *   *Trade-off:* Gemini is free but has **Rate Limits**. Memory tasks run frequently in the background. If you hit the Gemini rate limit, memory syncing fails. DeepSeek is extremely cheap and safer for high-volume background tasks.
*   **Embedding Model:** `text-embedding-3-small` (OpenAI).
    *   *Why:* **Dimension Compatibility.**
    *   *Detail:* OpenAI defaults to **1536** dimensions, which is the Cherry Studio standard. Gemini defaults to **768**. Stick to OpenAI for "Plug-and-Play".

### 4.2 Conflict Check
*   **Cherry Memory:** Stores "Chat History".
*   **Mastra Memory:** Stores "Agent Facts" (Postgres).
*   **Verdict:** **Keep BOTH enabled.** They work in parallel.


---

## 5. 🚀 CONNECTION CHECKLIST
1.  **MCP Server:** "nerd-with-nart" (Active via StdIO)
2.  **Tools Enabled:** `nart-avatar` (Checked)
3.  **Active Model:** `Gemini 3 Pro Preview`

---

## 6. 🧠 CONCEPTS GUIDE (FAQ)

### Why `text-embedding-3-small`?
*   **Cost & Speed:** It is significantly cheaper and faster than "Large".
*   **Sufficiency:** For chat history, "Small" is already smarter than a human librarian. "Large" is overkill for personal memory and costs 5x more.
*   **Compatibility:** "Small" uses 1536 dimensions, which is the industry standard. "Large" can go up to 3072, which might break default settings in some apps.

### What is an "Embedding Model"?
Think of it as a **Translator**:
*   **Input:** "I love eating Pad Thai."
*   **Output:** `[0.1, -0.5, 0.9 ...]` (A list of 1536 numbers).
*   **Purpose:** It turns your words into **Coordinates** on a map. When you search for "Thai food", the AI looks for coordinates close to "Pad Thai". It's how the "Memory" finds relevant past conversations.

### Do I need OpenAI Credit?
*   **Yes:** OpenAI APIs are prepaid. You must maintain a positive balance (even $5 is enough for months of embeddings). If your balance hits $0, the memory feature will stop working.

