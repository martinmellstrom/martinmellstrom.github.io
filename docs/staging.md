# Staging environment

## Purpose

All website changes go to staging first. Martin reviews at the staging URL before anything goes live.

## File locations

| Environment | File | URL |
|---|---|---|
| Live | `index.html` | `https://www.martinmellstrom.com/` |
| Live | `blog.html` | `https://www.martinmellstrom.com/blog.html` |
| Live | `player.html` | `https://www.martinmellstrom.com/player.html` |
| Staging | `staging/staging_index.html` | `https://martinmellstrom.github.io/staging/staging_index.html` |
| Staging | `staging/staging_blog.html` | `https://martinmellstrom.github.io/staging/staging_blog.html` |
| Staging | `staging/staging_player.html` | `https://martinmellstrom.github.io/staging/staging_player.html` |

> **Note:** Staging uses the `github.io` URL — the custom domain `martinmellstrom.com` only serves the root files, not the `staging/` folder.

## Preview links — always provide when done

At the end of every response where a change has been committed, always provide a **clickable Markdown link** — never a plain text URL.

Format:
```
🔗 [Kontrollera i Safari](URL)
```

### Staging committed (awaiting approval)
```
🔗 [Kontrollera i Safari](https://martinmellstrom.github.io/staging/staging_index.html)
```
Adjust filename to match which staging file was changed (`staging_index.html`, `staging_blog.html`, `staging_player.html`).

### Live committed
```
🔗 [Kontrollera i Safari](https://www.martinmellstrom.com/)
```
Adjust path for blog (`/blog.html`) or player (`/player.html`) as appropriate.

For anchor-targeted changes (e.g. a specific pack or section), append the anchor:
```
🔗 [Kontrollera i Safari](https://www.martinmellstrom.com/#packs)
```

**Never write the URL as plain text.** It must always be a `[text](url)` Markdown hyperlink so it renders as a clickable link in the chat interface.

## Staging file spec

Every staging file must have:

```html
<!-- In <head> -->
<meta name="robots" content="noindex, nofollow">
<title>[STAGING] Original title here</title>

<!-- Staging banner CSS (inside <style>) -->
.staging-banner {
  position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
  height: 36px;
  background: repeating-linear-gradient(
    45deg, #1a0000, #1a0000 10px, #2d0000 10px, #2d0000 20px
  );
  border-bottom: 2px solid #ff4444;
  padding: 8px 16px;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  font-family: 'Syne', sans-serif; font-size: .62rem; letter-spacing: .2em;
  text-transform: uppercase; color: #ff8888;
}
.staging-banner strong { color: #ff4444; font-weight: 700; }
.staging-banner a { color: #ff8888; text-decoration: underline; }

<!-- body offset -->
body { padding-top: 36px; }
nav  { top: 36px; }   /* shift fixed nav below banner */

<!-- Banner HTML (first element in <body>) -->
<div class="staging-banner">
  <strong>⚠ STAGING</strong> — Detta är en förhandsvisning.
  <a href="/index.html">Gå till live-sidan →</a>  <!-- adjust path per file -->
</div>
```

## Internal link rules

Links inside HTML files must point to files **in the same environment**.

### In staging files (`staging/staging_*.html`)

| Link target | Use |
|---|---|
| Main page | `staging_index.html` |
| Blog page | `staging_blog.html` |
| Blog anchor | `staging_blog.html#slug` |
| Player | `staging_player.html` |
| Live site (banner only) | `/index.html`, `/blog.html`, `/player.html` |

### In live files (root `*.html`)

| Link target | Use |
|---|---|
| Main page | `index.html` or `#anchor` |
| Blog page | `blog.html` |
| Blog anchor | `blog.html#slug` |
| Player | `player.html` |

> **When promoting staging → live:** always update all internal links from `staging_*.html` back to the live equivalents.

## Workflow

```
1. Fetch live file via github:get_file_contents (NEVER web_fetch from raw.githubusercontent.com — CDN-cached and unreliable)
2. Apply change to staging/staging_*.html
   - Adjust internal links for staging environment
3. Commit staging file
4. End response with clickable link: 🔗 [Kontrollera i Safari](https://martinmellstrom.github.io/staging/staging_[file].html)
5. Wait for approval
6. Apply same change to live file in root
   - Adjust internal links back to live environment
7. Commit live file
8. End response with clickable link: 🔗 [Kontrollera i Safari](https://www.martinmellstrom.com/[path])
```

## player.html special case

`staging/staging_player.html` is a thin wrapper that loads the live `player.html` in a full-screen iframe. This is intentional — player.html is 83KB and difficult to maintain as a duplicate.

If a change specifically affects `player.html`, create a full copy in staging for that review cycle:
1. Copy full `player.html` content into `staging/staging_player.html` (replacing the iframe wrapper)
2. Apply the change
3. Add the staging banner
4. After approval, apply to live `player.html` and restore staging to the iframe wrapper
