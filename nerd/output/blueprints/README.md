# Blueprints — Architect Outputs

Auto-saved by the `/architect` skill. Each file is the **strategic blueprint** Agent 1 produces from a seed — the input that `/performer` consumes.

## Filename convention

Inherit the seed's exact filename:

```
nerd/seeds/2026-04-21-no-insurance-5-traps.md
  → nerd/output/blueprints/2026-04-21-no-insurance-5-traps.md
```

This makes seed↔blueprint linkage obvious by `ls`.

## Frontmatter spec

```yaml
---
type: blueprint
seed: 2026-04-21-no-insurance-5-traps      # seed slug (no extension)
status: draft | ready | consumed            # lifecycle
mode: S | A | B | C
archetype: uncomfortable-truth | hidden-cost | simple-swap
avatar: "คุณวิชาญ (36 ปี, ลาออกเปิดธุรกิจ)"   # Sinek Hook person
paradox: "เดี๋ยวค่อยทำ ≠ รอบคอบ — มันคือการพนัน"
primary_source: "NHES VII 2568"
created: 2026-04-21
article_slug: ""                             # fill when published
---
```

## Lifecycle

1. `/architect` writes with `status: draft`
2. If you edit before handing to Performer, bump to `status: ready`
3. After `/performer` consumes it into a draft article, flip to `status: consumed`
4. When the article publishes, fill `article_slug` for the reverse link

## Related

- Upstream: `nerd/seeds/`
- Downstream: `nerd/output/` (final articles) — see `docs/article-production-guide.md`
