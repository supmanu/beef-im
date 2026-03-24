# Seeds — Content Intake Funnel

Raw material lands here. Every article starts as a seed.

## Workflow

```
📱 See something interesting → dump here (30 seconds)
🌱 Tag with frontmatter (status, pillar, paradox)
📊 Check dashboard (nerd/dashboard.md) for pipeline view
🏗️ When ready → /architect or /produce-article
✅ Mark status: published
```

## Status Flow

| Status | Meaning |
|--------|---------|
| `seed` | Raw idea, just captured |
| `researching` | Gathering data, linking brochures |
| `ready` | Has paradox + data anchors, ready for Architect |
| `in-production` | Sent to Architect/Performer pipeline |
| `published` | Live on site |
| `killed` | Decided not to pursue (keep for reference) |

## Frontmatter Fields

| Field | Values | Purpose |
|-------|--------|---------|
| `type` | seed | Always "seed" |
| `status` | seed / researching / ready / in-production / published / killed | Pipeline stage |
| `pillar` | life-insurance / critical-illness / health-insurance / tax / savings / investment / estate / general | Content category |
| `paradox` | Free text | The core contradiction (Paradox Architecture) |
| `source` | URL or description | Where the raw material came from |
| `brochure` | Filename from references/brochures/library/ | Linked product brochure |
| `archetype` | uncomfortable-truth / hidden-cost / simple-swap | GSB Forensic archetype |
| `mode` | S / A / B / C | Target article mode |
| `created` | YYYY-MM-DD | Date captured |
| `published_date` | YYYY-MM-DD | Date published (filled after) |
| `article_slug` | URL slug | Link to published article |

## Naming Convention

```
YYYY-MM-DD-short-topic.md

Examples:
2026-03-24-ci-misconception.md
2026-03-25-premium-holiday-real-cost.md
2026-03-26-tax-deduction-mistake.md
```

## Quick Capture (Minimal)

If you're in a hurry, this is enough:

```markdown
---
type: seed
status: seed
pillar: critical-illness
created: 2026-03-24
---

(paste the Facebook post or idea here)
```

You can fill in paradox, archetype, and mode later.
