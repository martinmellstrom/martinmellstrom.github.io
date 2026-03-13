# martinmellstrom.com — Instruktioner för Claude Code

## Projekt

Statisk webbplats för kompositören Martin Mellström. Två filer i repo-root:
- `index.html` — huvudsida
- `blog.html` — bloggsida

Hostad på GitHub Pages: `martinmellstrom.github.io` → `martinmellstrom.com`

---

## Arbetsflöde

```bash
# Hämta senaste versionen innan du redigerar
git pull

# Redigera med str_replace — bygg ALDRIG om filen från scratch
# Testa lokalt i webbläsare innan commit

# Committa båda berörda filer
git add index.html blog.html
git commit -m "kort beskrivning av ändringen"
git push
```

**Viktigt:** Använd alltid `str_replace` för riktade ändringar. Skriv aldrig om hela filen.

---

## Visuell stil

| Token | Värde |
|---|---|
| `--bg` | `#131714` |
| `--surface` | `#191e1a` |
| `--gold` | `#c9a84c` |
| `--golddim` | `#7a6030` |
| `--cream` | `#f0e8d4` |
| `--muted` | `#6a7060` |
| `--text` | `#c8c4b0` |

Typsnitt: `Cormorant Garamond` (brödtext, rubriker) + `Syne` (etiketter, knappar, UI)

Estetik: mörk bakgrund, gulddetal, minimalistisk. Inga generiska AI-mönster.

---

## Lägga till nytt blogginlägg

Kräver ändringar i **två filer**. Gör dem i samma commit.

### 1. index.html — lägg till kort i bloggriden

Hitta `<div class="blog-grid" id="blogGrid">` och **prependa** ett nytt kort (senaste inlägg ska ligga längst till vänster):

```html
<div class="blog-card">
  <div class="blog-card-body">
    <span class="blog-date">Month DD, YYYY</span>
    <div class="blog-tags"><span class="blog-tag">Tagg</span></div>
    <h3 class="blog-title">Inläggets titel</h3>
    <p class="blog-ingress" data-full="Full ingresstext här — kan vara hur lång som helst, JS klipper av vid 200 tecken automatiskt."></p>
    <a href="blog.html#post-slug" target="_blank" rel="noopener" class="blog-read-more">Read more →</a>
  </div>
</div>
```

- `data-full` innehåller hela ingresstexten — JS hanterar avklippningen
- `href` pekar på `blog.html#post-slug` där slug matchar `id` på artikeln i blog.html
- `<p class="blog-ingress">` ska vara **tom** — innehållet sätts av JS

### 2. blog.html — lägg till artikel

Hitta kommentaren `<!-- Add new posts above this line, newest first -->` och **prependa** artikeln ovanför den:

```html
<article class="post fade" id="post-slug">
  <div class="post-meta">
    <span class="post-date">Month DD, YYYY</span>
    <div class="post-tags">
      <span class="post-tag">Tagg</span>
    </div>
  </div>
  <h2 class="post-title">Inläggets titel</h2>
  <div class="post-body">
    <p>Första stycket...</p>
    <p>Andra stycket...</p>
    <!-- Valfritt: <h3>, <em>, <strong>, <a href="..."> -->
  </div>
</article>
```

- `id="post-slug"` måste matcha ankarlänken i index.html
- Slug: gemener, bindestreck för mellanslag, inga specialtecken. Ex: `welcome-to-the-studio`

---

## Befintliga blogginlägg

| Datum | Titel | Slug |
|---|---|---|
| March 10, 2026 | Welcome to the Studio | `welcome-to-the-studio` |

---

## Musik­paket

### Släppta

| # | Namn | Pris | Fab-länk |
|---|---|---|---|
| 001 | Orchestral Music Pack — Atlas Companion | $29.99 | `fab.com/listings/fac7aff9-...` |
| 002 | Orchestral Exploration Pack | $9.99 | `fab.com/listings/61df8587-...` |

### På gång

| # | Namn | Status |
|---|---|---|
| 003 | Echoes of the Silent Woods | Coming Soon — visas på sajten, $19.99 vid release |

**Vid release av nytt paket:**
1. Ersätt `.pack-coming` → `.pack` på pack-kortet
2. Ersätt `.badge-cs` → `.badge` (texten "Coming Soon" → t.ex. "New")
3. Byt store-profilslänkar mot faktiska listningslänkar
4. Lägg till SoundCloud-spelare (cp4, sc-4 etc.) — följ samma mönster som cp1/cp2

---

## Musik­spelarens arkitektur (SoundCloud Widget API)

Tre spelare: `cp1` (Atlas Companion), `cp2` (Orchestral Exploration), `cp3` (Tantleken film)

Varje spelare har:
- En dold `<iframe id="sc-N">` med SoundCloud playlist-URL
- En `<div class="cplayer" id="cpN">` med play/pause/prev/next, scrubbar, tidsstämplar, spårlista

**Viktigt:** SoundCloud Widget API returnerar inte metadata för privata/begränsade spår. Lösning: `FALLBACK_TITLES` och `FALLBACK_DURATIONS` i JS-objektet, indexerade efter spårets position i playlisten.

`cp1` filtrerar bort spåret "III Siblings" via `HIDDEN`-arrayen — det finns i SoundCloud-playlisten men inte i det kommersiella paketet. Övriga spår numreras om automatiskt.

Active-track-markering matchar mot `data-scIdx` (SoundCloud-index), inte listposition — viktigt när spår är dolda.

---

## Notion changelog

Sida: `🌐 Website Changelog — index.html`  
Page ID: `321bf76e-302d-81c0-8e6a-fa628ecb3af3`

Logga **bara** när Martin explicit ber om det. Skriv aldrig loggposter automatiskt.

Format per entry:
```
## YYYY-MM-DD — Kort rubrik
**Status:** ✅ Committed
**Changes:**
- Specifik ändring med CSS-klassnamn, JS-variabelnamn, exakta värden
**Files changed:** index.html, blog.html
```

---

## Terminologi

- Instrumentet heter **celesta** (inte "celeste")
- Spelet heter **Celeste** (inte "celesta")

---

## Musikens stil och nisch

Martin komponerar orkestral spelmusik — **inte** episk Hollywood-action, utan intimt och känsloladdat. Referenspunkter: *Hollow Knight*, *Ori*, *Celeste* (spelet), *Final Fantasy*, *Octopath Traveller*.

Styrkor: mindre orkesteruppsättningar, solinstrument, klockliknande ljud (celesta, marimba), mollstämning, ambient-texturer (naturljud, foley).

Målgrupp: indie-spelutvecklare som gör RPG, Metroidvania, plattformsspel, äventyrsspel.

Viktigt USP: **Ingen AI** — allt är handkomponerat. Detta ska alltid vara synligt i paket­beskrivningar (tag: `No AI`).
