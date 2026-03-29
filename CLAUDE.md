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

**Claude Code** is for all coding and file editing. It runs in the Claude Code desktop app. It handles:
- All HTML edits to `index.html`, `blog.html`, `player.html`, `oauth.html`
- All staging builds and live promotions
- Batch operations (multiple blog posts, releasing a pack, etc.)
- Reading tasks from Guide 07 in Notion and executing them

**The rule:** claude.ai never writes or edits HTML directly. When a task requires changes to site files, claude.ai describes the task, creates a Guide 07 entry in Notion if needed, and directs Martin to Claude Code. Claude Code never makes decisions about what to build — that happens in claude.ai first.

If Martin asks claude.ai to make a code change directly, respond with:
> "Detta är en Claude Code-uppgift. Vill du att jag skapar en uppgift i Guide 07 så att du kan köra den i terminalen?"

### Guide 07 vs direkt Code-session

**Använd Guide 07** när uppgiften:
- Är komplex nog att behöva specas ut i förväg (fler steg, oklara krav, kräver designbeslut)
- Ska sparas som spår i Notion (changelog-värdig, del av backlog)
- Involverar flera filer eller ett flöde med staging → godkännande → live

**Gå direkt till Claude Code** (beskriv uppgiften muntligt i Code-sessionen) när:
- Ändringen är enkel och väldefinierad ("ändra den här CSS-regeln", "lägg till detta attribut")
- Ingen spec behövs — Martin kan beskriva allt direkt i Code-chatten
- Notion-overhead vore oproportionerligt mot uppgiftens storlek

Tumregel: om uppgiften tar längre tid att speca i Notion än att utföra i Code, hoppa över Guide 07.

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

1. **Always fetch the live file via `github:get_file_contents`** (owner: martinmellstrom, repo: martinmellstrom.github.io) — this is the only reliable source of truth. **Never use `web_fetch` from raw.githubusercontent.com** — CDN-cached and may be hours stale. Never use the existing staging file as a base.
2. Apply the intended changes to the fetched live content.
3. Add staging-specific modifications (see `docs/staging.md`).
4. Push to `staging/staging_[file].html` via `github:create_or_update_file` (fetch SHA first).
5. **Always end with a clickable preview link.**
6. Wait for explicit approval.

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

## Live deploy workflow

**Only deploy to live when Martin explicitly says so** — phrases like "deploya till live", "kör live", "go" or similar.

Never deploy to live automatically after staging approval.

When Martin gives the go-ahead:

1. Increment `PLAYER_VERSION` by 1 (player.html only).
2. Update the build number displayed in the help modal (see "Build number versioning" below).
3. Push the change (without staging modifications) directly to `main`.
4. **Document the change** — see "Dokumentation vid live-deploy" below.
5. **Always end with a clickable live link.**

### Dokumentation vid live-deploy

After every live deploy of `player.html`, Claude Code **must** add a changelog entry to the Prototype — Dokumentation page in Notion (ID: `324bf76e-302d-81ee-9e04-fbe2770a664f`), inserted at the top of the `# 📋 Changelog` section.

**Format:**
```
## Build [N] — [YYYY-MM-DD]
**[Kort rubrik som beskriver vad som ändrades]**
- [Bullet per förändring — vad som gjordes och varför]
- [Teknisk detalj om relevant]
```

Rules:
- Build number = `PLAYER_VERSION` from the deployed `player.html`
- Date = today's date
- Be specific — "fixed bug" is not enough; describe what the bug was and how it was fixed
- If the task came from Guide 07, note which feature/fix it relates to
- Do NOT log staging deploys — only live

### Rollback

If something is broken after a live deploy, Martin can ask Claude Code to roll back. Claude Code handles the entire rollback — Martin never needs to touch git manually.

**When Martin says "backa till build N", "rulla tillbaka" or similar:**

```bash
# Find the commit SHA for the target build
git log --oneline player.html

# Restore that version of the file
git checkout <commit-sha> -- player.html

# Commit and push — no staging needed for rollbacks
git add player.html
git commit -m "rollback: återställ player.html till build N"
git push
```

Rules:
- Rollbacks go **directly to live** — no staging step, speed is the priority
- `PLAYER_VERSION` in the rolled-back file stays as-is — do not re-increment
- Add a brief Notion changelog entry noting the rollback: `## Rollback — [date] — återställd till Build N`
- If Martin doesn't specify a build number, show the last 5 commits and ask which one to restore

---

## Build number versioning (player.html only)

`player.html` uses an incrementing integer build number stored as a JS constant:

```js
const PLAYER_VERSION = 42;
```

**Rules — apply on every player.html deploy:**

1. Read `PLAYER_VERSION` from the live `player.html` before building staging.
2. **Every push increments the build number by 1** — staging and live are separate builds:
   - Staging push → live build + 1
   - Live push (promotion) → staging build + 1
   - Example: live = 42 → staging gets 43 → live promotion gets 44
3. **Staging banner** must include the build number:
   ```
   ⚠ STAGING — build 43 — Detta är en förhandsvisning.
   ```
4. **Report to Martin** when staging is pushed:
   > "Deployat till staging — build 43"
5. **Git commit message** when promoting to live:
   ```
   Deploy player.html build 44
   ```
6. **Notion changelog** entry (when logged): include build number.
7. **Player UI:** The constant must be displayed at the top of the Help modal, formatted as `Version xx`.
8. **Verification:** When reporting a deploy, explicitly instruct Martin to double-check that the version number shown in the Help modal matches the deployed build.

---

## Claude Code / terminal workflow

Both staging and live are pushed **directly to `main`** — no branches, no pull requests.

```bash
git pull
# STEP 1 — edit ONLY the staging file, never the live file
git add staging/staging_*.html
git commit -m "staging: short description"
git push
# Wait for Martin to say "deploya till live" / "kör live" / "go"

# STEP 2 — after approval only:
git add index.html   # or player.html etc — NEVER in same commit as staging
git commit -m "live: short description (build N)"
git push
# Then: add changelog entry to Notion (Prototype — Dokumentation) for player.html
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
- `docs/debug-panel.md` — debug panel pattern for staging pages

---

## Notion
- **Changelog:** `321bf76e-302d-81c0-8e6a-fa628ecb3af3`
- **Blog Posts DB:** `322bf76e-302d-8149-ae22-e2773dca4a73`
- **Musikpaket DB:** `314bf76e-302d-80b7-b299-ee85d8455929`
- **Guides index:** `31fbf76e-302d-81fe-8098-f394ed0b8392`
- **Guide 01 (website management):** `31fbf76e-302d-81b8-a87f-e47034c14088`
- **Guide 07 (Claude Code tasks):** `32bbf76e-302d-81fa-8493-f1ed576ce381`
- **Music Player documentation:** `324bf76e-302d-81ee-9e04-fbe2770a664f`

### Music Player — Notion-hierarki

| Sida | ID | Syfte |
|---|---|---|
| 🎵 Music Player (master) | `329bf76e-302d-810ab206ced9b7dd7bf8` | Auktoritativ källa för alla strategiska beslut: affärsmodell, ledstjärna, roadmap, syfte, konkurrentanalys |
| Prototype — Dokumentation | `324bf76e-302d-81ee-9e04-fbe2770a664f` | Teknisk dokumentation för webbprototypen (player.html): changelog, backlog, arkitektur, setup. Work in progress. |
| 🎵 iOS Music Player | `330bf76e-302d-818c9459ca271975a016` | Framtida native iOS-app — används när Swift-implementationen påbörjas |
| Tech Spec | `330bf76e-302d-814992e8ef24268c8cbe` | Teknisk spec för iOS-appen. Undersida till iOS Music Player. |
| A/B-lyssning — Spec | `329bf76e-302d-8122a39cf6ee28ebe539` | Detaljerad spec för A/B-läget. Undersida till Tech Spec. |
| 📣 Marknadsföring | `330bf76e-302d-8197-8b31-d45a7d260394` | Allt som rör marknadsföring inför och efter lansering. Undersida till iOS Music Player. |
| Konkurrentanalys — Samply, Boombox, Mixup | `32abf76e-302d-8132-a927-f91066e1d2cc` | Konkurrent- och marknadsanalys inför lansering. Undersida till Marknadsföring. |

**Regel:** Alla beslut om affärsmodell, scope, roadmap och produktstrategi loggas på mastern (🎵 Music Player). Prototype-sidan används enbart för teknisk dokumentation av webbprototypen.

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
- **Never deploy to live automatically** — always wait for Martin's explicit go-ahead ("deploya till live", "kör live", "go" or similar)
- **No branches, no pull requests** — both staging and live push directly to `main`
- **player.html build number** — always read `PLAYER_VERSION` from live, increment by 1, include in staging banner, commit message, and report to Martin. See "Build number versioning" section above.
