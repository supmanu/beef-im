# Content Pipeline Dashboard

> Open this file in Obsidian with the Dataview plugin installed.
> All queries below are live — they update automatically as you add/edit seed files.

---

## Pipeline Overview

### Seeds by Status
```dataview
TABLE length(rows) AS "Count"
FROM "nerd/seeds"
WHERE type = "seed"
GROUP BY status
SORT length(rows) DESC
```

### Seeds by Pillar
```dataview
TABLE length(rows) AS "Count"
FROM "nerd/seeds"
WHERE type = "seed"
GROUP BY pillar
SORT length(rows) DESC
```

---

## Inbox — New Seeds (Not Yet Researched)

```dataview
TABLE pillar, paradox, source
FROM "nerd/seeds"
WHERE status = "seed"
SORT created DESC
```

---

## Researching — Gathering Data

```dataview
TABLE pillar, paradox, brochure
FROM "nerd/seeds"
WHERE status = "researching"
SORT created DESC
```

---

## Ready for Production — Feed to /architect

```dataview
TABLE pillar, paradox, archetype, mode
FROM "nerd/seeds"
WHERE status = "ready"
SORT created DESC
```

---

## In Production — Currently Being Written

```dataview
TABLE pillar, paradox, mode
FROM "nerd/seeds"
WHERE status = "in-production"
SORT created DESC
```

---

## Published — Completed Articles

```dataview
TABLE pillar, published_date, article_slug
FROM "nerd/seeds"
WHERE status = "published"
SORT published_date DESC
```

---

## Gap Analysis — Pillars Without Seeds

Check which pillars have the fewest ideas. These are your content gaps.

```dataview
TABLE length(rows) AS "Seed Count"
FROM "nerd/seeds"
WHERE type = "seed" AND status != "killed"
GROUP BY pillar
SORT length(rows) ASC
```

**Target Pillars (check coverage):**
- life-insurance
- critical-illness
- health-insurance
- tax
- savings
- investment
- estate
- general

---

## Killed Seeds (Archive — Why We Didn't Pursue)

```dataview
TABLE pillar, paradox
FROM "nerd/seeds"
WHERE status = "killed"
SORT created DESC
```

---

## Quick Actions

| Action | Command |
|--------|---------|
| Capture new idea | Copy `_template.md` → rename with date |
| Move to production | Change `status: ready` → `status: in-production` |
| Run Architect | `/architect [topic]` in Claude Code |
| Run full pipeline | `/produce-article [topic]` in Claude Code |
| Mark published | Change `status: in-production` → `status: published`, add `published_date` and `article_slug` |
