# Debug Panel

Återanvändbart debug-panel-mönster för staging-sidor. Används för att logga
tillstånd direkt i mobil-UI utan att behöva extern DevTools.

## Var det används just nu

| Fil | Panel-wrap ID | Log-funktion |
|---|---|---|
| `staging/staging_player.html` | `#ab-debug-wrap` | `abDebug(msg)` |

---

## HTML-snippet

Placeras direkt i det element som ska debuggas (t.ex. i toppen av en flex-container):

```html
<!-- DEBUG PANEL (staging only) — se docs/debug-panel.md -->
<div id="ab-debug-wrap" style="display:none;flex-shrink:0;border-bottom:1px solid rgba(255,68,68,0.2);">
  <div onclick="abDebugToggle()" style="display:flex;align-items:center;justify-content:space-between;padding:5px 12px;cursor:pointer;font-family:'Space Mono',monospace;font-size:9px;color:#ff8888;letter-spacing:0.1em;text-transform:uppercase;background:rgba(200,0,0,0.2);user-select:none;-webkit-user-select:none;">
    <span>DEBUG ▸ <span id="ab-debug-count">0</span> rader</span>
    <div style="display:flex;gap:10px;align-items:center;">
      <button onclick="event.stopPropagation();abDebugCopy(this)" style="font-family:'Space Mono',monospace;font-size:8px;letter-spacing:0.1em;padding:2px 8px;border:1px solid rgba(255,100,100,0.4);background:rgba(255,68,68,0.1);color:#ff8888;border-radius:3px;cursor:pointer;-webkit-tap-highlight-color:transparent;">COPY</button>
      <span id="ab-debug-arrow">▼</span>
    </div>
  </div>
  <div id="ab-debug" style="display:none;font-family:monospace;font-size:9px;line-height:1.5;padding:6px 16px;color:#ff6666;white-space:pre;overflow-y:auto;max-height:160px;"></div>
</div>
```

**ID:n att anpassa** om flera debug-paneler används på samma sida:
- `ab-debug-wrap` → t.ex. `index-debug-wrap`
- `ab-debug-count` → `index-debug-count`
- `ab-debug-arrow` → `index-debug-arrow`
- `ab-debug` → `index-debug`

---

## JS-funktioner

Klistras in i `<script>`-blocket. Byt ut `ab-debug` mot rätt ID om du anpassat det.

```js
// ── DEBUG PANEL (staging only) — se docs/debug-panel.md ──
function abDebug(msg) {
  const wrap = document.getElementById('ab-debug-wrap');
  const d    = document.getElementById('ab-debug');
  const cnt  = document.getElementById('ab-debug-count');
  if (!d || !wrap) return;
  wrap.style.display = 'block';
  const line = new Date().toISOString().slice(11, 23) + ' ' + msg;
  d.textContent = (d.textContent ? d.textContent + '\n' : '') + line;
  const lines = d.textContent.split('\n');
  if (lines.length > 50) d.textContent = lines.slice(-50).join('\n');
  if (cnt) cnt.textContent = d.textContent.split('\n').length;
  if (d.style.display !== 'none') d.scrollTop = d.scrollHeight;
}
function abDebugToggle() {
  const d     = document.getElementById('ab-debug');
  const arrow = document.getElementById('ab-debug-arrow');
  if (!d) return;
  const open = d.style.display !== 'none';
  d.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▼' : '▲';
  if (!open) d.scrollTop = d.scrollHeight;
}
function abDebugCopy(btn) {
  const d = document.getElementById('ab-debug');
  if (!d || !d.textContent.trim()) return;
  navigator.clipboard.writeText(d.textContent.trim()).then(() => {
    if (btn) { const t = btn.textContent; btn.textContent = 'KOPIERAT'; setTimeout(() => { btn.textContent = t; }, 1500); }
  }).catch(() => {
    if (btn) { const t = btn.textContent; btn.textContent = 'FEL'; setTimeout(() => { btn.textContent = t; }, 1500); }
  });
}
```

---

## Användning

Anropa `abDebug(msg)` var som helst i JS:

```js
abDebug(`min variabel: ${värde}`);
abDebug(`CLICK slot=${slot} abActiveSlot=${abActiveSlot}`);
```

- Panelen är dold tills första `abDebug()`-anropet
- Header visar alltid antal rader — klicka för att fälla ut/in loggen
- **COPY**-knappen kopierar hela loggen till urklipp (bekräftelse: "KOPIERAT")
- Max 50 rader sparas (äldre rensas automatiskt)
- Scrollar automatiskt till botten vid nya rader när panelen är öppen

---

## Staging-only-regel

Debug-panelen existerar **bara i staging-filer** (`staging/staging_*.html`).
Den ska aldrig kopieras till live-filer (`index.html`, `player.html` etc).
HTML-kommentaren `<!-- DEBUG PANEL (staging only) — se docs/debug-panel.md -->`
markerar var panelen sitter.
