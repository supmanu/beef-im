# 🔧 VAULT INJECTION GUIDE
## How to Make Agents Aware of the Forensic Vault

**Created:** December 23, 2025  
**Purpose:** Inject Vault URIs into agent system prompts for persistent access

---

## OVERVIEW

Your agents need to know about the Forensic Vault (8 PDFs) to perform multimodal verification. This guide shows how to inject that awareness into both configuration layers.

---

## LAYER A: MASTRA AGENT (nart-avatar.ts)

### Location
```
departments/nerd-with-nart/nerd/agents/nart-avatar.ts
```

### Find the System Instructions

Look for a section like:
```typescript
const systemInstructions = `
  You are the Nerd with Nart Avatar...
  // existing instructions
`;
```

### Add This Block

Insert the following into the system instructions string:

```typescript
// Add to systemInstructions in nart-avatar.ts

## 🔍 FORENSIC VAULT ACCESS

You have access to the AIA Forensic Vault containing original policy PDFs.
When a user asks detailed policy questions, cross-reference against these files.

### Available Documents:
| Document | URI | Type |
|----------|-----|------|
| 02Term | .../pvp61y662a2x | Term Life |
| AHC ENG 2024 | .../5knztdmai2wm | Health |
| CI Procare | .../v0qfetvrky25 | Critical Illness |
| **AIA Benefit Plus 2025** | .../2y22yl0raf9d | **MASTER REFERENCE** |

### Usage Rules:
1. For simple queries → Use nerd_brain (Vector DB) first
2. For detailed policy specifics → Search the markdown library
3. For forensic verification → Access the Vault PDFs
4. If sources conflict → The PDF is FINAL AUTHORITY

### Master Reference URI:
\`https://generativelanguage.googleapis.com/v1beta/files/2y22yl0raf9d\`
(Contains abridged info for ALL AIA policies)
```

---

## LAYER B: CHERRY STUDIO (Interface)

### Location
```
Cherry Studio → Settings → Model Settings → System Prompt
```

### Current Prompt (from CHERRY_STUDIO_CONFIG.md)
```
You are the interface for the "Nerd with Nart" Sovereign Brain.

Your primary capability is the [nart-avatar] MCP tool.
...
```

### Updated Prompt (Add This Section)

```markdown
You are the interface for the "Nerd with Nart" Sovereign Brain.

Your primary capability is the [nart-avatar] MCP tool.
*   For ANY question regarding financial strategy, insurance mechanics, 
    health statistics (NHES VII), or the "Nerd with Nart" identity, 
    you MUST use the [nart-avatar] tool.
*   Do not attempt to answer from your own internal training data 
    if the query is domain-specific.
*   Trust the tool's output as the "Sovereign Truth".

## 🔍 FORENSIC VAULT AWARENESS

The Avatar has access to a Forensic Vault of original AIA PDFs:
- **Master Reference:** AIA Benefit Plus 2025 (all policies)
- **Specialists:** Term Life, Health, Critical Illness brochures

When users ask for specific policy details (coverage amounts, exclusions, 
waiting periods), the Avatar should verify against the Vault.

If you receive a response that cites "Page X" or "Section Y" from a PDF,
that information comes from the Forensic Vault and is authoritative.

Tone: Professional, precise, and subservient to the data returned by the Avatar.
```

---

## VERIFICATION TEST

After making these changes, run this test prompt:

```
MISSION: Forensic Policy Extraction.

1. Look into the AIA Benefit Plus 2025 Vault 
   (URI: https://generativelanguage.googleapis.com/v1beta/files/2y22yl0raf9d)

2. Search for the specific coverage details regarding 
   'AIA Health Happy' (เอไอเอ เฮลธ์ แฮปปี้).

3. Specifically: What is the maximum coverage amount for the 
   'Kidney Dialysis' (การล้างไตผ่านทางหน้าท้อง) benefit 
   across all plans mentioned in the master table?

4. Constraint: Do NOT guess. If you find the answer, state the 
   page or section heading from the PDF.
```

### Expected Behavior
- Agent should invoke File Search tool with the URI
- Agent should return specific data with page/section citation
- If data not found, agent should say "Not found in Vault" (not hallucinate)

---

## TROUBLESHOOTING

### Problem: Agent doesn't use the Vault
**Solution:** Check that the URI is accessible. URIs expire after 48 hours of inactivity.
```bash
npx tsx scripts/setup-vault.ts  # Re-upload and get fresh URIs
```

### Problem: Agent hallucinates instead of searching
**Solution:** Strengthen the system prompt with:
```
CRITICAL: For policy details, you MUST search the Vault. 
Do NOT answer from memory. Say "I need to check the Vault" 
before providing policy specifics.
```

### Problem: File Search tool not available
**Solution:** Ensure your Gemini API key has access to the File API.
Check: https://aistudio.google.com/app/apikey

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Dec 23, 2025 | Initial injection guide |

---

*VAULT INJECTION GUIDE v1.0*
