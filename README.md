# martinmellstrom.github.io

Personlig hemsida för Martin Mellström, byggd med HTML/CSS och hostad via GitHub Pages.

## Filstruktur

```
index.html          # Live: startsida
blog.html           # Live: blogg
player.html         # Live: musikspelare
staging/            # Stagingversioner (noindex, banner)
  staging_index.html
  staging_blog.html
  staging_player.html
BRIEF.md            # Aktiv designbrief (se nedan)
```

## Arbetsflöde

```
1. Diskussion  →  claude.ai: idéer, skissar, beslut → fyller i BRIEF.md
2. Handoff     →  klistra in / committa BRIEF.md till repot
3. Implement   →  Claude Code: läser BRIEF.md, editerar filer, pushar till staging
4. Granskning  →  kolla staging-URL, godkänn
5. Live        →  Claude Code: kopierar staging → live-filer, pushar
```

**Viktigt:** claude.ai skriver aldrig om HTML-filerna direkt — det sker bara via Claude Code utifrån BRIEF.md. Detta håller nere tokenanvändning och ger en tydlig historik.

## Staging

Staging-filer har en synlig banner överst och `<meta name="robots" content="noindex">` så att de inte indexeras av sökmotorer.
