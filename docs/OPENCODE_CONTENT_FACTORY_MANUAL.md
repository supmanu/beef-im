# 🏭 THE SOVEREIGN CONTENT FACTORY: OPENCODE CLI MANUAL
## High-Velocity Production Guide for "Nerd with Nart"
**Engine Version:** v1.7.1 | **Architecture:** OpenCode CLI + Agent 2 Performer

---

## 🎯 THE MISSION
To produce **A++ Native Thai** financial content at scale, bypassing the "GUI Tax" of IDEs.
**We treat content as code:** Input → Engine → Output.

---

## 🛠️ SETUP & PRE-FLIGHT

### 1. Location Matters
Always navigate to the department folder first. This loads the correct "Brain."
```powershell
cd melkor-os/departments/nerd-with-nart
```

### 2. Know Your Brains (Models)
*   **MiniMax M2.1:** The "Speed Demon." Best for volume, flow, and natural Thai rhythm.
*   **DeepSeek Reasoner:** The "Logic Auditor." Best for complex math, controversy, and deep dives. Slow but precise.
*   **GLM-4.7:** The "Dark Horse." Good balance of instruction following and Thai fluency.

### 3. The "Clean Room" Protocol (Anti-Contamination)
Before starting a fresh batch of articles or a comparative model test, you must clear the workbench to prevent agents from "reading ahead" or copying old drafts.

**How to Run:**
```powershell
./scripts/reset-workbench.ps1
# If you get a permission error, use:
# powershell -ExecutionPolicy Bypass -File ./scripts/reset-workbench.ps1
```

**What it does:**
1.  Moves all files from `content/test-articles/` to `content/_draft_archive/`.
2.  Ensures the workbench is empty.

**When to use it:**
*   ✅ Before a new "Weekly Pack" batch.
*   ✅ Before comparing models (e.g., DeepSeek vs. Opus on the same topic).
*   ❌ **NOT** when iterating on a single draft you just generated.

---

## 🚀 EXECUTION PROTOCOLS

### 🔥 METHOD 1: THE ONE-SHOT (Production Standard)
**Best for:** Cleanest results, zero memory leaks, bulk creation.
**How:** Run this directly in PowerShell/Git Bash.

```powershell
# Syntax: opencode -m [MODEL] @performer "[INSTRUCTION]"

# Example:
opencode -m minimax/m2.1 @performer "Write a Mode A article about [TOPIC] using Tone T2 and save to content/articles/my-draft.md"
```

*   **Tip:** Use `Up Arrow` to recall the command and just change the topic. You can fire off 5 articles in 2 minutes.

### 🎭 METHOD 2: THE INTERACTIVE STUDIO (TUI)
**Best for:** Tinkering, chatting with the persona, or debugging instructions.
**How:**
1.  Type `opencode` (Enter).
2.  Type `/model` → Select your brain.
3.  Press `TAB` until **Performer** is highlighted.
4.  Type your prompt: `"Write an article about..."`

---

## ⚠️ CRITICAL DO's & DON'Ts

### ✅ DO:
*   **Use Files for Input:** If you have a huge blueprint, save it to `temp/blueprint.txt` and tell the agent: `"Read temp/blueprint.txt and write..."`
*   **Restart Often:** If using the TUI, `exit` and restart between major tasks to clear the context buffer.
*   **Trust the Alias:** Just type `@performer`. Never type the full path to the `.md` file.

### ❌ DON'T:
*   **Don't Nest Commands:** Never type `opencode` *inside* the OpenCode interface. It confuses the agent.
*   **Don't Copy-Paste Huge Text:** Pasting 2,000 words into the terminal can crash it. Use file handoffs.
*   **Don't Run 'Build' Tab:** The Build tab is for coding. It will try to scan your `node_modules`. Stick to the **Performer** tab.

---

## 🔮 FUTURE: BULK AUTOMATION PLAN

We are moving toward **"The Weekly Pack" Script**.
Instead of running commands manually, we will create a script (`generate-pack.ps1`) that:

1.  Reads a list of 5 topics from a text file.
2.  Loops through them.
3.  Fires 5 separate One-Shot OpenCode commands.
4.  Saves 5 drafts to `content/test-articles/`.

**Result:** You define 5 topics on Monday morning, run one script, and have 5 drafts ready for review by lunch.

---

*Verified by Gemini CTO v7.1*
