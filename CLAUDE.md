# martinmellstrom.com — Claude Code instructions

## Repos

### Main site repo
`martinmellstrom/martinmellstrom.github.io`

Live files in root:
- `index.html` — main site
- `blog.html` — blog
- `player.html` — Dropbox music player
- `oauth.html` — Dropbox OAuth callback handler (used by player.html)

Staging files in `staging/`:
- `staging/staging_index.html`
- `staging/staging_blog.html`
- `staging/staging_player.html`

Hosted on GitHub Pages → martinmellstrom.com

### Instruction repo
`martinmellstrom/martinmellstrom.github.io` (this repo)

Instruction files live alongside the site code:
- `CLAUDE.md` — this file, entry point for Claude Code
- `docs/staging.md` — staging environment spec
- `docs/blog.md` — blog workflow
- `docs/packs.md` — music packs, SoundCloud architecture, release checklists
- `docs/style.md` — CSS variables, typography, design principles

**If any instruction or rule needs updating**, edit the relevant file in this repo (`martinmellstrom/martinmellstrom.github.io`).

---

## Tool responsibility — what belongs where

**claude.ai** is for planning, reviewing, and approving. It handles:
- Planning new packs, blog posts, and site changes
- Reviewing staging before go-live
- Updating instruction files (`CLAUDE.md`, `docs/`) via GitHub MCP
- Adding/editing Notion pages and tasks (Guide 07, Changelog, etc.)
- One-off content changes where staging review is the main goal

**Claude Code** is for all coding and file editing. It handles:
- All HTML edits to `index.html`, `blog.html`, `player.html`, `oauth.html`
- All staging builds and live promotions
- Batch operations (multiple blog posts, releasing a pack, etc.)
- Reading tasks from Guide 07 in Notion and executing them

**The rule:** claude.ai never writes or edits HTML directly. When a task requires changes to site files, claude.ai describes the task, creates a Guide 07 entry in Notion if needed, and directs Martin to Claude Code. Claude Code never makes decisions about what to build — that happens in claude.ai first.

If Martin asks claude.ai to make a code change directly, respond with:
> "Detta är en Claude Code-uppgift. Vill du att jag skapar en uppgift i Guide 07 så att du kan köra den i terminalen?"

---

## Instruction maintenance — when to update these files

Claude (both claude.ai and Claude Code) must flag and propose updates to these instruction files whenever any of the following happen. Martin does not need to remember to do this — Claude catches it automatically.

| Trigger | File to update |
|---|---|
| A new music pack is added to the site | `docs/packs.md` — add pack entry with all metadata |
| A pack goes from Coming Soon → Released | `docs/packs.md` — move to Released, add final store URLs, SoundCloud config |
| A new pack is added to the pipeline (concept/planning) | `docs/packs.md` — add to "In Pipeline" section |
| A new Notion page or database is created that Claude will use | `CLAUDE.md` — add page/database ID under Notion section |
| A new Guide is created in Notion | `CLAUDE.md` — add Guide ID |
| A blog workflow or template changes | `docs/blog.md` |
| A new CSS class, variable, or design pattern is introduced | `docs/style.md` |
| The staging spec changes (banner, links, file locations) | `docs/staging.md` + `CLAUDE.md` staging section |
| A new store platform is added | `docs/packs.md` + `CLAUDE.md` key rules if relevant |
| A new SoundCloud player is added | `docs/packs.md` — player ID table + fallback config |
| A key rule is agreed on in conversation | `CLAUDE.md` key rules section |
| The tool responsibility split changes | `CLAUDE.md` tool responsibility section |

**How to flag:** At the end of a response where a trigger applies, add:

> 📝 **Instruktionsuppdatering behövs:** `[fil]` — [vad]. Vill du att jag gör det nu?

**In claude.ai:** use GitHub MCP (`github:create_or_update_file`) to push to `martinmellstrom/martinmellstrom.github.io`.
**In Claude Code:** edit the file directly in the local clone.

---

## Staging workflow (default for all changes)

**Always edit staging first. Never touch live files until Martin approves.**

**In Claude Code:** when working on a feature branch, only edit the staging file (`staging/staging_*.html`). Never edit the live file (`index.html`, `player.html`, etc.) in the same commit or branch as staging — live edits must be a separate step after explicit approval. A branch merge to main must not include live file changes unless Martin has approved staging.

1. **Always fetch the live file via `github:get_file_contents`** (owner: martinmellstrom, repo: martinmellstrom.github.io) — this is the only reliable source of truth. **Never use `web_fetch` from raw.githubusercontent.com** — CDN-cached and may be hours stale. Never use the existing staging file as a base.
2. Apply the intended changes to the fetched live content.
3. Add staging-specific modifications (see `docs/staging.md`).
4. Push to `staging/staging_[file].html` via `github:create_or_update_file` (fetch SHA first).
5. **Always end with a clickable preview link.**
6. Wait for explicit approval.
7. Push the same change (without staging modifications) to the live file.
8. **Always end with a clickable live link.**

### Preview links

| Situation | Link |
|---|---|
| Staging committed | `https://martinmellstrom.github.io/staging/staging_[file].html` |
| Live committed | `https://www.martinmellstrom.com/` |

Format: `🔗 [Kontrollera i Safari](URL)` — never plain text.

### Link rules by environment

| Context | Internal links |
|---|---|
| Staging | `staging_index.html`, `staging_blog.html`, `staging_blog.html#slug` |
| Live | `index.html`, `blog.html`, `blog.html#slug` |

### Staging file properties
- `<meta name="robots" content="noindex, nofollow">`
- `<title>` prefixed with `[STAGING]`
- Red diagonal-stripe banner fixed at top (`height: 36px`)
- `body { padding-top: 36px }` and `nav { top: 36px }`
- Banner links to corresponding live page

---

## Claude Code / terminal workflow
```bash
git pull
# STEP 1 — edit ONLY the staging file, never the live file
git add staging/staging_*.html
git commit -m "staging: short description"
git push
# Wait for Martin's explicit approval before touching live files

# STEP 2 — after approval only:
git add index.html   # or player.html etc — NEVER in same commit as staging
git commit -m "live: short description"
git push
```

## claude.ai browser workflow (GitHub MCP)
- Fetch file + SHA: `github:get_file_contents` (owner: martinmellstrom, repo: martinmellstrom.github.io)
- Single file: `github:create_or_update_file` with SHA
- Multi-file: `github:push_files`
- **Never `web_fetch` from raw.githubusercontent.com`**

---

## Docs
In `martinmellstrom/martinmellstrom.github.io`:
- `docs/staging.md` — staging environment, banner spec, link rules
- `docs/blog.md` — blog workflow, Notion source, HTML templates
- `docs/packs.md` — music packs, SoundCloud architecture, release checklist
- `docs/style.md` — CSS variables, fonts, design principles

---

## Notion
- **Changelog:** `321bf76e-302d-81c0-8e6a-fa628ecb3af3`
- **Blog Posts DB:** `322bf76e-302d-8149-ae22-e2773dca4a73`
- **Musikpaket DB:** `314bf76e-302d-80b7-b299-ee85d8455929`
- **Guides index:** `31fbf76e-302d-81fe-8098-f394ed0b8392`
- **Guide 01 (website management):** `31fbf76e-302d-81b8-a87f-e47034c14088`
- **Guide 07 (Claude Code tasks):** `32bbf76e-302d-81fa-8493-f1ed576ce381`
- **Music Player documentation:** `324bf76e-302d-81ee-9e04-fbe2770a664f`

Rules:
- Log only when explicitly asked.
- Never auto-log to Notion.

---

## Key rules
- Instrument = **celesta** / Game = **Celeste**
- All packs tagged `No AI` and `Royalty-free`
- Never rewrite entire files from scratch — always `str_replace` on targeted sections
- **Always end with a clickable preview link** — `[text](url)`, never plain text
- When in doubt, read the relevant `docs/` file before proceeding
- **Proactively flag instruction updates** — see "Instruction maintenance" above
- **claude.ai never writes HTML** — delegate to Claude Code via Guide 07
- **Never edit live files on a feature branch** — staging and live are always separate commits; live is only touched after Martin's explicit approval of staging
