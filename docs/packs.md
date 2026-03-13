# Music Packs

## Released

### 001 — Orchestral Music Pack: Atlas Companion
- **Price:** $29.99
- **Pack icon:** `MP1 icon 960 960.png`
- **SoundCloud playlist:** `https://soundcloud.com/martinmellstrom/sets/mfvg`
- **Player ID:** `cp1`, iframe `sc-1`
- **Stores:**
  - itch.io: `https://martinmellstrommusic.itch.io/orchestral-music-pack-atlas-companion`
  - Fab: `https://www.fab.com/listings/fac7aff9-8f38-496f-a308-e98d2fb47321`
  - Unity: `https://assetstore.unity.com/packages/audio/music/orchestral/orchestral-music-pack-atlas-companion-307136`
  - GameDevMarket: `https://gamedevmarket.net/asset/orchestral-music-pack-atlas-companion-2`
- **Tags:** Orchestral, Battle Layers, Seamless Loops, Stingers, RPG / JRPG, Metroidvania, 44.1kHz / 16-bit, No AI, Royalty-free
- **Stats:** 11 full songs / 114 audio files / 2h+ / 9 stingers

**SoundCloud player notes:**
- Track "III Siblings" is in the SoundCloud playlist but NOT in the commercial pack — filtered via `HIDDEN = ['iii siblings']`
- Tracks 1–5 return metadata from SC API; tracks 6–12 require fallbacks:

| scIdx | Title | Duration |
|---|---|---|
| 0 | Glittering Moss | — |
| 1 | Light Steps | — |
| 2 | Fantastic Beast | — |
| 3 | Drifter | — |
| 4 | III Siblings | — (hidden) |
| 5 | Ardea | 2:17 |
| 6 | Atlas Companion | 3:12 |
| 7 | Battle Companion | 3:11 |
| 8 | The Menu | 1:38 |
| 9 | Colossus Rose | 1:17 |
| 10 | Minerals | 2:35 |
| 11 | Aerial View | 1:30 |

---

### 002 — Orchestral Exploration Pack
- **Price:** $9.99
- **Pack icon:** `MP2 Icon 960 960.png`
- **SoundCloud playlist:** `https://soundcloud.com/martinmellstrom/sets/orchestral-exploration-pack`
- **Player ID:** `cp2`, iframe `sc-2`
- **Stores:**
  - itch.io: `https://martinmellstrommusic.itch.io/orchestral-exploration-pack`
  - Fab: `https://www.fab.com/listings/61df8587-5bf4-4036-bf3a-c212846b96f6`
  - Unity: `https://assetstore.unity.com/packages/audio/music/orchestral/orchestral-exploration-pack-316496`
  - GameDevMarket: `https://gamedevmarket.net/asset/orchestral-exploration-music-pack`
- **Tags:** Orchestral, Tension Layers, Seamless Loops, Adventure, JRPG, Platformer, No AI, Royalty-free
- **Stats:** 5 full songs / 29 audio files / 1h+
- **Fallback titles:** Forest, Snow, Graveyard, Field, Cave

---

## Coming Soon

### 003 — Echoes of the Silent Woods
- **Price at release:** $19.99
- **Pack icon:** `fJFGWJrKDDlc7lSYevtO--2--r9zq9.jpg`
- **Subtitle:** Melancholic forest music for Metroidvanias
- **Tags:** Orchestral, Seamless Loops, Stingers, Metroidvania, Nordic, No AI, Royalty-free
- **Stats:** 10 full songs / 6 stingers
- **Current store links:** store profile links (follow buttons)
- **CSS class:** `.pack-coming` (opacity .72) with `.badge-cs` "Coming Soon" badge

**At release — checklist:**
1. Change `.pack-coming` → `.pack` on the card div
2. Change `.badge-cs` → `.badge`, update text (e.g. "New")
3. Replace store profile links with actual listing URLs
4. Add SoundCloud player: new iframe `sc-4`, player div `cp4`
5. Add `cp4` config to `CONFIGS` array in JS
6. Add `FALLBACK_TITLES` and `FALLBACK_DURATIONS` entries for `cp4`

---

## SoundCloud Player Architecture

Players use the SoundCloud Widget API with a hidden iframe.

**Each player requires:**
- `<iframe id="sc-N">` — hidden, contains SC playlist URL
- `<div class="cplayer" id="cpN">` — visible player UI
- Entry in `CONFIGS` array in JS
- `FALLBACK_TITLES['cpN']` — array of track titles indexed by SC playlist position
- `FALLBACK_DURATIONS['cpN']` — array of durations (string "M:SS" or null), same index

**Why fallbacks?** SC Widget API returns empty metadata for private/restricted tracks.

**Active-track highlighting** uses `data-scIdx` (SoundCloud playlist index), not list position.
This stays correct when tracks are hidden/filtered via the `HIDDEN` array.

**Player heights:**
- `cp1`, `cp2`: fixed `height: 360px` — both pack players match in height
- `cp3` (Tantleken): `height: auto` — sizes to track count

---

## Film: Tantleken (2023)

- **Director:** Charlotte Berglin (Swedish documentary)
- **Player ID:** `cp3`, iframe `sc-3`
- **SoundCloud playlist:** `https://soundcloud.com/martinmellstrom/sets/music-for-tantleken`
- **Poster image:** `kvadratisk_poster_tantleken_indigogo.jpg`
- **Description:** Piano-led compositions with ambient textures, written to sit close to the story.
