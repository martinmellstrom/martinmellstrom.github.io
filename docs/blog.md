# Blog workflow

## Source of truth: Notion

All blog posts live in Notion. Database ID: `322bf76e-302d-8149-ae22-e2773dca4a73`

Each post is a child page with this structure:
```
Slug:      welcome-to-the-studio   (lowercase, hyphens, no special chars)
Datum:     March 10, 2026
Taggar:    Music Packs
Status:    Draft | Published
Bild-URL:  https://raw.githubusercontent.com/martinmellstrom/martinmellstrom.github.io/main/filename.jpg
           (leave empty if no image)
Ingress:   Short summary ~300 chars — JS truncates to 200 on the card
Brödtext:  Full post body (Notion page content below the metadata)
```

## Adding a new post

1. Create a new child page in the Notion database (or Martin creates it)
2. Fill in all fields — Status must be `Published` to go live
3. Run the build (see below) — Claude Code reads Notion and updates both HTML files
4. Commit both files

## Build: what Claude Code does

Fetch published posts from Notion (newest first), then update two files:

### index.html — prepend card to `#blogGrid`

```html
<!-- WITH image -->
<div class="blog-card">
  <img src="BILD_URL" alt="TITEL" class="blog-card-img">
  <div class="blog-card-body">
    <span class="blog-date">DATUM</span>
    <div class="blog-tags"><span class="blog-tag">TAGG</span></div>
    <h3 class="blog-title">TITEL</h3>
    <p class="blog-ingress" data-full="INGRESS"></p>
    <a href="blog.html#SLUG" target="_blank" rel="noopener" class="blog-read-more">Read more →</a>
  </div>
</div>

<!-- WITHOUT image -->
<div class="blog-card">
  <div class="blog-card-body">
    <span class="blog-date">DATUM</span>
    <div class="blog-tags"><span class="blog-tag">TAGG</span></div>
    <h3 class="blog-title">TITEL</h3>
    <p class="blog-ingress" data-full="INGRESS"></p>
    <a href="blog.html#SLUG" target="_blank" rel="noopener" class="blog-read-more">Read more →</a>
  </div>
</div>
```

Notes:
- `<p class="blog-ingress">` must be **empty** — JS sets content from `data-full` at runtime
- Multiple tags: `<span class="blog-tag">Tag1</span><span class="blog-tag">Tag2</span>`
- Newest post = leftmost = first in `#blogGrid`

### blog.html — prepend article before `<!-- Add new posts above this line -->`

```html
<article class="post fade" id="SLUG">
  <div class="post-meta">
    <span class="post-date">DATUM</span>
    <div class="post-tags">
      <span class="post-tag">TAGG</span>
    </div>
  </div>
  <!-- Optional image -->
  <img src="BILD_URL" alt="TITEL" style="width:100%;height:auto;display:block;margin-bottom:32px;border:1px solid rgba(201,168,76,.15);">
  <h2 class="post-title">TITEL</h2>
  <div class="post-body">
    <p>Stycke 1...</p>
    <p>Stycke 2...</p>
  </div>
</article>
```

Notes:
- Omit the `<img>` tag entirely if no Bild-URL
- `id="SLUG"` must exactly match the anchor in index.html
- Supported in `.post-body`: `<p>`, `<h3>`, `<em>`, `<strong>`, `<a href="...">`

## Image handling

Images must be committed to the GitHub repo root before use.
Reference them as:
`https://raw.githubusercontent.com/martinmellstrom/martinmellstrom.github.io/main/filename.jpg`

Supported formats: jpg, png, webp. Recommended aspect ratio for card: 16:9.
