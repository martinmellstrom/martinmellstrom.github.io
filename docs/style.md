# Visual Style Guide

## CSS Variables

```css
--bg:       #131714   /* page background */
--surface:  #191e1a   /* cards, sections */
--gold:     #c9a84c   /* primary accent */
--golddim:  #7a6030   /* muted gold, borders */
--cream:    #f0e8d4   /* headings, light text */
--muted:    #6a7060   /* secondary text, nav links */
--text:     #c8c4b0   /* body text */
```

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Body, headings | Cormorant Garamond | 300, 400 | Serif, base 20px |
| Labels, buttons, UI | Syne | 400, 500, 700 | Sans-serif |
| Italic accent | Cormorant Garamond italic | 300 | Used for `em` in section titles |

Google Fonts import:
```
Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400
Syne:wght@400;500;700
```

## Design Principles

- **Dark background, gold detail.** Never white backgrounds or bright UI.
- **Minimal.** No drop shadows on cards, no rounded corners, no gradients on buttons.
- **Spacing.** Sections use `padding: 120px 64px` (80px 24px on mobile).
- **Gaps.** Grid gaps are `2px`, not `16px` or `24px` — tight, editorial feel.
- **Borders.** Dividers use `rgba(201,168,76,.1)` — barely-there gold lines.
- **Hover.** Cards lift `translateY(-3px)` and reveal a 1px gold bottom border.
- **No AI aesthetics.** Avoid glowing neon, glass morphism, or generic SaaS patterns.

## Section Dividers

```html
<div class="rule"></div>
```
60px wide, 1px, `var(--golddim)`, `margin: 0 64px`.

## Buttons

`.btn-p` — primary (gold fill, dark text, shimmer on hover)
`.btn-g` — ghost (transparent, gold border, fills on hover)
`.buy` — store link (subtle gold background, border, uppercase Syne)

## Responsive breakpoint

`@media(max-width: 900px)` — nav collapses, single column layouts, padding reduces to 24px.

## Key class reference

| Class | Element |
|---|---|
| `.sec` | Standard page section |
| `.sec-label` | Small uppercase eyebrow label |
| `.sec-title` | Large section heading (uses `em` for gold italic) |
| `.pack` | Music pack card |
| `.pack-body` | Flex column inner wrapper |
| `.pack-coming` | Coming soon variant (lower opacity) |
| `.badge` / `.badge-cs` | Top-right pack badges (filled / outlined) |
| `.blog-card` | Blog preview card (fixed 340px wide) |
| `.blog-read-more` | Gold underlined "Read more →" link |
| `.cplayer` | SoundCloud custom player wrapper |
| `.cp-list` | Scrollable track list inside player |
| `.fade` | Intersection Observer fade-in (add `.in` when visible) |
