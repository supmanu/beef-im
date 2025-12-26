# Tech Stack & Architecture Constraints

## Sovereign Stack (Enforced)

| Component | Version | Constraint |
|-----------|---------|------------|
| Framework | Next.js 15.5.9 | App Router, NO upgrade |
| CMS | Payload 3.0 | Embedded |
| Database | Neon Postgres | Contains nerd_brain (488 rows) |
| AI | Mastra + Gemini 3 Flash | Vector search |
| Hosting | Vercel | rootDirectory: departments/nerd-with-nart |
| Node | 20 LTS | **ENFORCED - No Node 24** |
| Styling | Tailwind CSS v3.4 | **Cannot upgrade to v4** |

## Critical Warnings
- **Node 24 breaks Payload CLI** - Never suggest upgrading
- **Tailwind v4 breaks responsive design** - Stay on v3.4
- **nerd_brain table is Mastra's** - Payload will try to delete it during schema sync

## Color Palette (Teal Protocol)
- Primary: `brand-teal` (#2bb1bb)
- Action: `brand-amber` (#F59E0B)
- Background: `brand-dark` (#0B1D35)
- Accent: Emerald (#10b981)
- Neutral: Slate (#0f172a)

## Animation
- Use **Framer Motion** for animations
- Style: Smooth, professional springs
- Avoid jarring or excessive animations

## 🎨 Frontend Mastery (King Mode)
- **Reference:** See `06-frontend-mastery.md` for strict design rules.
- **Philosophy:** "Intentional Minimalism" - Reject generic layouts.
- **Protocol:** Use "ULTRATHINK" when deep design reasoning is needed.
