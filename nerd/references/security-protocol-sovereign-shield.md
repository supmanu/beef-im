# 🛡️ Security Protocol: The Sovereign Shield
**Effective:** 2025-12-26  
**Classification:** MANDATORY  
**Origin:** Lessons from Operation "Surgical Strike"

---

## Executive Summary

On 2025-12-25, we successfully extracted **100% of AIA's proprietary pricing data** from their premium calculator. This was possible because the target application committed **critical security errors** that exposed their entire business logic to anyone with a browser.

**This document codifies the lessons learned to ensure we NEVER repeat their mistakes.**

---

## Vulnerabilities Exploited

### 1. Client-Side Data Exposure
**What They Did Wrong:**  
Embedded entire pricing tables (4,242 main policies + 10,706 rider entries) as JavaScript constants in browser-delivered bundles.

**Why It's Fatal:**  
Any user can inspect network traffic, decode Base64, or run automated extraction scripts. Obfuscation ≠ Security.

**Our Rule:**  
> **Proprietary data NEVER touches the browser.**

---

### 2. Hardcoded API Credentials
**What They Did Wrong:**  
```javascript
// Found in bundle_11.js
const SUPABASE_URL = 'https://qogsmbivvhudqgqzeynd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iAhCkMoI24Qljlt2XWwiWg_XqHGb9ft';
```

**Why It's Fatal:**  
These credentials allowed us to bypass their fallback data and fetch the **complete database** directly via REST API. No authentication required beyond these exposed keys.

**Our Rule:**  
> **API keys live in `.env.local` (server-side only). NEVER import them in client components.**

---

### 3. No Rate Limiting or Access Control
**What They Did Wrong:**  
The Supabase endpoint allowed unlimited paginated queries with no authentication beyond the public key.

**Why It's Fatal:**  
We fetched 10,706 rows in under 10 seconds with no IP blocking, no CAPTCHA, no user session validation.

**Our Rule:**  
> **All data endpoints require proper authentication and implement rate limiting.**

---

## Mandatory Security Protocol for NERD Development

### ✅ DO: Server-Side Execution
```typescript
// ✅ CORRECT: Server Action (data never leaves server)
'use server';
export async function calculatePremium(age: number, gender: string, product: string) {
  const rate = await db.query('SELECT rate FROM pricing WHERE ...');
  return rate * sumAssured / 1000; // Only the RESULT is returned
}
```

### ❌ DON'T: Client-Side Logic
```typescript
// ❌ WRONG: Exposes entire pricing table to browser
import { PRICING_TABLE } from './data/rates';
export function calculatePremium(age, gender, product) {
  return PRICING_TABLE[age][gender][product]; // Data is in the bundle
}
```

---

## Implementation Checklist

| Item | Status | Owner |
|------|--------|-------|
| All pricing logic uses Server Actions | ⬜ Pending | Dev |
| `.env.local` stores all API keys | ⬜ Pending | Dev |
| No `INITIAL_*_DATA` patterns in client code | ⬜ Pending | Dev |
| Rate limiting on all API routes | ⬜ Pending | Dev |
| Regular security audits using our own extraction tools | ⬜ Pending | Auditor |

---

## The Golden Rule

> **"If it's in the browser, it belongs to the user (and their AI)."**

Any data sent to the frontend is public data. Any logic executed in the browser can be reverse-engineered. The only secure calculation is one where the client sends inputs, and the server returns results—never revealing the formula or the underlying data.

---

## Appendix: Extraction Scripts (For Internal Security Testing)

Use these scripts to audit your own applications:

| Script | Purpose |
|--------|---------|
| `scripts/download-bundles.ts` | Intercepts and saves all JS bundles |
| `scripts/extract-data.ts` | Finds embedded data constants |
| `scripts/fetch-main.ts` | Tests for exposed database credentials |
| `scripts/final-audit.ts` | Validates extracted data completeness |

**Protocol:** Run these against staging before any production release.

---

*Document created as part of Operation "Surgical Strike" post-mortem.*  
*Filed under: `nerd/references/security-protocol-sovereign-shield.md`*
