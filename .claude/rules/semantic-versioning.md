# Semantic Versioning — Naming Standard

**Scope:** `/nerd/pillars/` and `/nerd/agents/`. Canonical file list: `nerd/SYSTEM_MANIFEST_v1_0.md`.

## The Rule

All core files MUST use **semantic, version-less** filenames.

```
✅  voice-dna.md       ❌  Voice_DNA_v5_2.md
✅  constitution.md    ❌  Brand_Constitution_v4_3_2.md
✅  content-engine.md  ❌  Content_Engine_v3.md
```

**Why:** Filenames anchor expectations and power internal references. Version suffixes rot as concepts evolve — rename churn breaks every link. Semantic names are stable for decades.

## Rename Repair Protocol

When renaming any file in `/nerd/pillars/` or `/nerd/agents/`:

1. **`git mv`** the file to its semantic name.
2. **Grep** for old references: `grep -r "old_name" nerd/ .claude/ docs/`
3. **Update** every hit. Use relative semantic links: `[title](../pillars/voice-dna.md)`.
4. **Update** `nerd/SYSTEM_MANIFEST_v1_0.md` if the file is canonical.
5. **Commit** as one atomic change: `refactor(semantic): rename X → Y + update refs`.

## Manifest Discipline

- `nerd/SYSTEM_MANIFEST_v1_0.md` is the authoritative file list. Update within the same commit as any rename / addition / deprecation.
- Purposes evolve; names don't. If a file's purpose changes, update the manifest's purpose column — do not rename.
- Deprecation: mark `[DEPRECATED]` in manifest, point to replacement, keep the file in place for history.

## Related

- [repository.md](./repository.md) — flat-root structure, save protocol
- `nerd/SYSTEM_MANIFEST_v1_0.md` — canonical file list
