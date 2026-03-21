# martinmellstrom.github.io

Personlig hemsida för Martin Mellström, byggd med HTML/CSS och hostad via GitHub Pages.

---

## Deployment-flöde — player

Alla ändringar i spelaren (`player.html`) ska alltid gå via staging innan de deployas live.

### Steg

1. **Staging** — Ny kod committas till `staging/staging_player.html`
   - Preview: `martinmellstrom.github.io/staging/staging_player.html`
   - Sidan visar en röd STAGING-banner så att det är tydligt att det inte är live

2. **Granskning** — Martin testar staging-versionen och godkänner

3. **Promote till live** — Först efter explicit godkännande kopieras koden till `player.html` på `main`
   - Live: `martinmellstrom.github.io/player.html`

### Regler

- **Committa aldrig direkt till `player.html`** utan att ha gått via staging och fått godkännande
- Claude ansvarar för att följa detta flöde automatiskt — Martin ska inte behöva påminna
- Om Claude av misstag skippar staging ska det noteras i Notion-changelog

---

## Struktur

```
/
├── player.html          ← Live-spelaren
├── oauth.html           ← OAuth redirect-handler
├── sw.js                ← Service Worker
├── staging/
│   ├── staging_player.html   ← Staging-version av spelaren
│   ├── staging_index.html
│   └── staging_blog.html
└── index.html           ← Startsida
```
