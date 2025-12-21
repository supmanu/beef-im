# ENVIRONMENT VARIABLE STANDARDS (v1.0)

## ❌ THE "TRAP"
* **Payload CMS** looks for: `DATABASE_URI`
* **Mastra / Drizzle** looks for: `DATABASE_URL`

## ✅ THE LAW (DUAL-MAPPING)
Your `.env` file MUST contain both keys pointing to the same Neon Postgres instance to ensure the "Hybrid" architecture works.

```env
# PAYLOAD CMS (The Body)
DATABASE_URI="postgres://..."

# MASTRA AGENTS (The Brain)
DATABASE_URL="postgres://..."
```

## ⚠️ AGENT SAFETY PROTOCOL
* **CRITICAL:** Any automated agent that edits `.env` MUST verify the existence of **BOTH** keys before saving. 
* **FAIL-SAFE:** If one is missing, the agent is strictly prohibited from proceeding until it is restored. No exceptions.
* **CRASH RISK:** Deleting `URI` crashes the Website (Localhost fallback). Deleting `URL` crashes the AI Memory.

