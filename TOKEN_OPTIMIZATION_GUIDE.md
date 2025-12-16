# 💰 Token Optimization Guide (Dual-Brain Architecture)

**For: Nerd with Nart Project**  
**System:** Antigravity IDE  
**Last Updated:** December 16, 2025

This guide details the operational strategy for maximizing productivity while minimizing costs by leveraging the specific strengths of Agent 2A (Gemini 3 Pro) and Agent 2B (Claude Sonnet 4.5).

---

## 1. Token Economics & Model Architecture

Understanding the cost and capability profile of each model is key to efficient operation.

| Feature | **Gemini 3 Pro (Agent 2A)** | **Claude Sonnet 4.5 (Agent 2B)** | **Claude Opus 4.5 (Special)** |
| :--- | :--- | :--- | :--- |
| **Role** | **The Heavy Lifter** | **The Precision Engineer** | **The Strategist** |
| **Cost** | Free / High Limits | Monthly Cap / API Costs | High Cost / Low Limits |
| **Context** | 2M Tokens (Massive) | 200k Tokens | 200k Tokens |
| **Best For** | Bulk coding, refactoring, drafts, reading chunks | Complex logic, types, final polish, memory | High-level architecture, critical decisions |
| **Availability**| Antigravity Chat (Default) | Extension + Antigravity (Select) | Antigravity (Select) |

### The "Generous" Advantage
Gemini 3 Pro in Antigravity offers a "very generous" usage tier. This means you can burn tokens on context-heavy tasks (like reading entire documentation suites or refactoring large directories) without impacting your limited Claude Pro quota.

---

## 2. Usage Scenarios & Decision Matrix

### ✅ Use Gemini 3 Pro (Agent 2A) When:
- **Starting a new feature:** "Scaffold the entire directory structure for the new dashboard."
- **Bulk Refactoring:** "Update all 50 files to use the new `Button` component."
- **Reading Documentation:** "Read these 5 PDFs and summarize the key API endpoints."
- **Drafting Content:** "Write a comprehensive README for the project."
- **Exploratory Coding:** "Try 3 different ways to implement this sort function."

### ✅ Use Claude Sonnet 4.5 (Agent 2B) When:
- **Debugging TypeScript:** "Fix this complex generic type inference error."
- **React Hooks Logic:** "Why is this `useEffect` causing an infinite loop?"
- **Memory Commits:** **REQUIRED** for writing to MCP Memory Server.
- **Final Polish:** "Review this code for security vulnerabilities."
- **Quick Fixes:** "Update the regex to exclude .gif files."

### ✅ Use Claude Opus 4.5 When:
- **System Design:** "Design the schema for the new multi-tenant architecture."
- **Critical Review:** "Audit this authentication flow for any logical gaps."

---

## 3. Workflow: The Antigravity "Tab-Switch"

Both agents run inside the **same Antigravity IDE**. You do not need to switch windows, just tabs.

### Operations Flow
1.  **Preparation (Gemini 3 Pro):**
    - Open Agent 2A tab.
    - "Read the entire codebase and map out dependencies." (High token usage, zero cost).
2.  **Execution (Gemini 3 Pro):**
    - "Generate the boilerplate for all 10 components."
    - "Refactor the file structure."
3.  **Precision Check (Claude Sonnet 4.5):**
    - Open Agent 2B tab (or switch model in Agent 2A tab).
    - "Check this specific file for logical errors."
4.  **Strategic Save (Claude Sonnet 4.5):**
    - In Agent 2A tab, switch model selector to **Claude Sonnet 4.5**.
    - "Save to MCP Memory: Completed Phase H..."

---

## 4. Cost Breakdown & Savings Calculation

**Scenario:** Implementing a full Admin Dashboard (4 hours work)

### ❌ The Expensive Way (Claude Only)
- **Activity:** 4 hours of heavy context loading, re-reading files, generating boilerplate.
- **Cost:** ~40-60% of daily/weekly Claude Pro limit.
- **Risk:** Hitting cap mid-work, forced to wait or pay API overages.

### ✅ The Optimized Way (Dual-Brain)
- **Step 1 (3.5 hours):** Gemini 3 Pro does all the scaffolding, file creation, and basic logic.
    - **Cost:** $0 / 0 Quota.
- **Step 2 (30 mins):** Claude Sonnet 4.5 reviews the code, fixes complex bugs, and updates memory.
    - **Cost:** Minimal (~5-10% quota).
- **Result:** Same output, **90% quota savings**.

---

## 5. Troubleshooting Common Scenarios

**Q: Gemini made a halluncination in the imported library name.**
*   **Fix:** Don't argue. Switch to Claude for a quick "Fix imports in this file" command. Claude's training data is often more precise for specific library versions.

**Q: I'm out of Claude tokens but need to save to Memory.**
*   **Fix:** Draft the memory update using Gemini ("Draft a memory commit message..."). Then, wait for quota or use the Developer API fallback if critical. *Note: Only Claude tools are authorized for the final MCP commit.*

**Q: Context window is full.**
*   **Fix:** Since Gemini has a massive context window (2M), this rarely happens. If it does, run `/clear` or `task_boundary` to reset. This is a huge advantage over Claude's smaller window.

---

## 6. Memory Bridge Protocols

**The "Save?"** command is the bridge between the free labor of Gemini and the long-term memory managed by Claude.

1.  **Do the work** with Gemini 3 Pro.
2.  **Verify** the work handles correctly.
3.  **Switch Model** to Claude Sonnet 4.5 (in the same chat).
4.  **Prompt:**
    ```text
    Remember: [Summary of work]
    - [Key Decision 1]
    - [Key Decision 2]
    
    Project: Nerd with Nart
    ```
5.  **Confirm:** Ensure the tool `mcp_memory_add_observations` triggers successfully.

---

## 7. Advanced: Mixed Sessions

For complex debugging, you can use a "pincer movement":
1.  **Left Tab (Gemini):** "Read these 50 log files and find the error pattern." (Scanning huge data).
2.  **Right Tab (Claude):** "Here is the error pattern found by Gemini. Fix the code logic." (High reasoning).

**Rule of Thumb:** Use Gemini for *Breadth* (reading lots of files, writing lots of lines). Use Claude for *Depth* (understanding complex relationships, distinct logic).
