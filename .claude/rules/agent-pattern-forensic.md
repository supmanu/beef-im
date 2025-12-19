# AGENT PATTERN: FORENSIC RECONSTRUCTION
**ID:** `agent-pattern-forensic.md`
**Type:** Prompt Engineering / Meta-Technique
**Version:** 1.0 (Derived from Sovereign Auditor v2.3)

## 🎯 PROBLEM
**The "Over-Obedience" Paradox:**
High-compliance agents are given strict "No Content Creation" rules to prevent hallucination. When they detect critical errors, this rule prevents them from generating the corrected output, triggering a "Stop & Ask" behavior that breaks automation.

## 💡 SOLUTION: SEMANTIC REFRAMING
Reframe the act of "Writing a Correction" from a **Creative Task** (banned) to a **Forensic Task** (mandatory).

## 🛠️ IMPLEMENTATION

### 1. The "Yes, But" Rule (Role Definition)
```xml
<operational_principle>
  <rule type="ABSOLUTE">
    No creative writing. BUT: Forensic Reconstruction is MANDATORY. 
    Never ask permission to fix.
  </rule>
</operational_principle>
```

### 2. The "Single-Shot" Protocol (Execution)
```xml
<output_protocol>
  <instruction>ALWAYS generate Analysis, Log, and Reconstruction in a SINGLE RESPONSE.</instruction>
  <instruction>Do not stop generation even if verdict is REJECT.</instruction>
</output_protocol>
```

### 3. The "Semantic Container" (Output Structure)
```xml
<report_output_structure>
  <section>📝 FORENSIC RECONSTRUCTION (Revised Draft)</section>
</report_output_structure>
```
