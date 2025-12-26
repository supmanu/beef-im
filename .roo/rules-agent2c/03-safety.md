# Safety Constraints & Protected Files

## Protected Files (Confirm Before Editing)

| File | Protection | Reason |
|------|------------|--------|
| `nerd/pillars/voice-dna.md` | **HIGH** | Core identity - changes affect all content |
| `nerd/pillars/constitution.md` | **HIGH** | Brand laws - changes affect compliance |
| `nerd/agents/nart-avatar.ts` | **HIGH** | Agent brain - changes affect all AI behavior |
| `payload.config.ts` | **HIGH** | Database schema - wrong edit = data loss |
| `.env` / `.env.local` | **FORBIDDEN** | Never read, display, or modify |

## The 10 Strategic Locks (Never Violate)

1. **Hybrid Law**: Voice DNA in Prompt. Constitution in Vector.
2. **Identity Law**: Never use "พี่". Never use English Headers in production.
3. **Footer Law**: Use `📊 บทวิเคราะห์โดย...` template. No meta-text.
4. **Bridge Law**: Never expose `#009` or internal IDs in output.
5. **Production Law**: Cherry Studio + Mastra = Truth Source.
6. **Agent Law**: Performer MUST load `data-nhes-vii` and `tech-bridge-lab`.
7. **Fiduciary Law**: Proposal Generator bundles Multi-Pay CI + Total Care.
8. **RAG Law**: Pricing & Visa rules use `<rag_bridge_protocol>`.
9. **Brochure Law**: Cleaners MUST use `sovereign-lexicon.md`.
10. **Hierarchy Law**: Layer 2 = Forensic Fallback ONLY. Production uses Layer 3.

## Destructive Commands (Require Explicit Confirmation)
- `git reset --hard`
- `rm -rf`
- `DROP TABLE`
- `npm run db:push` (can delete nerd_brain)

## Security Rules
- Never commit API keys or secrets
- Never display .env contents in output
- Validate user input at system boundaries
