# 🧩 DESIGN PATTERN: FORENSIC RECONSTRUCTION (FR)
**ID:** `pattern-forensic-reconstruction.md`
**Type:** Prompt Engineering / Meta-Technique
**Version:** 1.0 (Derived from Sovereign Auditor v2.3)

## 🎯 PROBLEM
**The "Over-Obedience" Paradox:**
High-compliance agents (auditors, validators) are often given strict "No Content Creation" rules to prevent hallucination or scope creep. However, when they detect critical errors, this rule prevents them from generating the corrected output, leading to a "Stop & Ask" behavior that breaks automation pipelines.

## 💡 SOLUTION: SEMANTIC REFRAMING
Reframe the act of "Writing a Correction" from a **Creative Task** (which is banned) to a **Forensic Task** (which is mandatory).

By calling it **"Forensic Reconstruction"** or **"Integrity Restoration,"** we bypass the model's refusal trigger because it perceives the action as *cleaning up a crime scene*, not *writing a novel*.

## 🛠️ IMPLEMENTATION (Universal Builder v7.0)

### 1. The "Yes, But" Rule (Role Definition)
Replace the absolute ban with a conditional mandate.

```xml
<operational_principle>
  <!-- OLD: -->
  <!-- <rule type="ABSOLUTE">No content creation.</rule> -->
  
  <!-- NEW (Pattern FR): -->
  <rule type="ABSOLUTE">
    No creative writing. BUT: Forensic Reconstruction is MANDATORY. 
    Never ask permission to fix.
  </rule>
</operational_principle>
```

### 2. The "Single-Shot" Protocol (Execution)
Explicitly forbid the "Stop & Ask" behavior.

```xml
<output_protocol>
  <instruction>ALWAYS generate Analysis, Log, and Reconstruction in a SINGLE RESPONSE.</instruction>
  <instruction>Do not stop generation even if verdict is REJECT.</instruction>
</output_protocol>
```

### 3. The "Semantic Container" (Output Structure)
Provide a named container for the output that reinforces the framing.

```xml
<report_output_structure>
  <section>📊 ANALYSIS</section>
  <section>🚨 CRITICAL ISSUES</section>
  <!-- The Semantic Container -->
  <section>📝 FORENSIC RECONSTRUCTION (Revised Draft)</section>
</report_output_structure>
```

## 🔄 APPLICABLE DOMAINS
*   **Legal/Compliance:** "Compliance Translation" (Auditor -> Fixer)
*   **Code Review:** "Diagnostic Patch" (Linter -> Auto-Fixer)
*   **Data Validation:** "Integrity Restoration" (Validator -> Cleaner)

## 🏆 SUCCESS METRICS (Source: Auditor v2.3 Stress Test)
*   **Zero friction:** Model moves from "Reject" to "Fix" instantly.
*   **High accuracy:** Logic overrides the "politeness" filter.
*   **Context retention:** Fixes maintain strict constraints (no hallucinations).
