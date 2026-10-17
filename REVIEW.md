# Code review — sito portfolio "Bianca Gazzarrini"

Data: 2026-10-17 · Ambito: `index.html`, `home.html`, `work.html`, `about.html`, `project.html`, `script.js`, `style.css`, asset.
Questo documento era nato come sola review (nessun file modificato); le correzioni sono state applicate in un secondo momento, vedi "Stato dopo la sistemazione".

**Versione 2 — verificata in browser.** Il sito è stato servito in locale (`python3 -m http.server`) e testato con Chromium headless (Playwright) a 1440, 1250, 1000, 770 e 390 px: click, tastiera, resize, 404, caricamento immagini/video. I punti confermati dal test sono marcati ✅; quelli solo dedotti dal codice sono marcati 📖.

## Stato dopo la sistemazione (2026-10-17)

I problemi qui sotto sono stati corretti e ritestati in Chromium (1440/1250/1000/770/390 px: 0 errori in console, 0 404, 0 immagini rotte, tutte le 63 voci/gallerie di Work si aprono). **Il resto del documento descrive lo stato precedente** ed è lasciato come registro dei problemi trovati.
Backup completo dello stato precedente: `~/Desktop/Amore_backup_prima_della_sistemazione/` (fuori dal progetto).

| # | Esito | Cosa è stato fatto |
|---|-------|--------------------|
| 1 | ✅ risolto | `work.html` rigenerato: voci come `<button>` con `data-id`; i 4 progetti aprono le gallerie (mouse e tastiera) |
| 2 | ✅ risolto | 893 MB → 54 MB: immagini ridimensionate (max 1800 px, 1400 px per la home), JPEG q80, EXIF rimossi; PNG convertiti in JPG (percorsi aggiornati); `BIGA.mp4` 85 MB → 4,7 MB (H.264, senza audio, + poster); `loading="lazy"` e `decoding="async"` |
| 3 | ✅ risolto | Redirect automatico dopo 5 s (valore modificabile in `index.html`); la landing è un link (`<a>`), quindi funziona anche da tastiera (misurato: ~5 s) |
| 4 | ✅ risolto | Rimossi i riferimenti a `responsive.css`, `portfolio.css`, `portfolio.js`; aggiunto `favicon.svg` (niente più 404) |
| 5 | ✅ risolto | `home.html` riscritta senza HTML annidato, un solo head/script |
| 6 | ✅ risolto | `project.html` eliminata (orfana e non funzionante; resta nel backup) |
| 7 | ✅ risolto | La trasformazione via JS non esiste più: la tabella è HTML statico; eliminate classi spaziatrici, `#hide`, `nth-child` e ID duplicati |
| 8 | ✅ risolto | Pulsante ← (44×44 px) visibile a ogni larghezza (anche a 770 px); URL `work.html#TR01` con History (tasto Indietro/Avanti, link diretti); Esc chiude; dopo il resize nessuno stato bloccato (tutto via CSS) |
| 9 | ✅ risolto | Video con `muted playsinline loop poster`: parte da solo. Il video About è ora `img/about.mp4` (H.264). Il file si chiama ancora `big_buck_bunny…` nel backup, ma il contenuto è un video di Bianca (non un segnaposto); dopo la sistemazione il video era temporaneamente nascosto da un errore di stacking CSS, corretto con `isolation: isolate` |
| 10 | ✅ risolto | Niente più validazione/`groupSizes`; il testo "w/ …" è nascosto via CSS sotto 1200 px e torna se si allarga la finestra |
| 11 | ✅ risolto | Alt descrittivi, `<button>` al posto di `<a href="#">`, `:focus-visible`, un solo `<h1>` per pagina, About in paragrafi, testo 12 px, `aria-current`, `rel="noopener noreferrer"` |
| 12 | ✅ risolto | HTML riscritto: niente `</br>`, `</i>`, `</a>` orfani, ID duplicati, head duplicati; Font Awesome (inutilizzato) rimosso |
| 13 | ✅ risolto | `style.css` riscritto da zero (948 → ~480 righe): niente duplicati, valori invalidi (`100hv`, `font-style:none`…) o codice morto |
| 14 | ✅ risolto | `100dvh` con fallback `100vh`; rimosso il listener di scroll inutile; `.div17` corretto; navbar della home con sfondo bianco |
| 15 | ✅ in parte | Rimossi 3 file RAW `.cr2`, 15 immagini `imgg/im47-61` non usate, `.DS_Store` e il `.mov` (convertito in `about.mp4`). **Non fatto:** rinomina delle cartelle (`img`, `imgg`, `imggg`…) |
| 16 | ✅ risolto | Titoli e `meta description` per pagina, Open Graph, favicon. Email/CV/social lasciati invariati |
| 17 | ✅ risolto | Ogni voce è una riga unica (codice + descrizione): niente disallineamenti; la colonna REFERENCE è nascosta sotto 1300 px come nell'intento originale (quindi anche su telefono) |
| 18 | ✅ risolto | Home su telefono: griglia a 2 colonne senza sovrapposizioni (`scrollWidth` 390) |

Da sapere / ancora aperto:
- `script.js` è ora usato solo da `work.html`; le altre pagine non caricano script.
- Il codice di riferimento (TR01…) non è più visibile sotto 1300 px, ma è nell'URL (`#TR01`).
- Non testati: Safari/iOS, Firefox, dispositivi reali.
- Le foto sono compresse in modo irreversibile in questa cartella; gli originali sono solo nel backup.
- Nella home le immagini sono 36 (nella versione precedente un conteggio riportava 35 per un artefatto del documento annidato).

---

Gravità: 🔴 critico (rompe funzionalità / impatto forte) · 🟠 alto · 🟡 medio · ⚪ basso

---

## Riepilogo

| # | Gravità | Problema | File |
|---|---------|----------|------|
| 1 | 🔴 ✅ | I click sui 4 progetti (griglia1-4) non funzionano mai | script.js / work.html |
| 2 | 🔴 | Peso del sito ~893 MB, immagini originali non ottimizzate | asset |
| 3 | 🔴 📖 | Redirect della landing dopo 5 minuti invece di 3 secondi | index.html |
| 4 | 🔴 ✅ | CSS/JS mancanti (404): `responsive.css`, `portfolio.css`, `portfolio.js` | home.html, project.html |
| 5 | 🟠 | `home.html` contiene un documento HTML annidato nel `<body>` | home.html |
| 6 | 🟠 | `project.html` è una pagina orfana e rotta ("Loading project..." infinito) | project.html |
| 7 | 🟠 | Media query per `#hide` e `nth-child` colpiscono elementi che il JS elimina | style.css / script.js |
| 8 | 🟠 ✅ | Su desktop e tra 767-780 px non si può tornare indietro dalla galleria; dopo un resize si resta bloccati; niente URL/history | script.js / style.css |
| 9 | 🟠 ✅ | Video della landing bloccato dall'autoplay (senza `muted`); il nome del file del video About è fuorviante (`big_buck_bunny…`); 85 MB | index.html, about.html |
| 10 | 🟡 ✅ | Contenuto Work dipendente da validazione rigida: se fallisce, la pagina resta vuota/disallineata | script.js |
| 11 | 🟡 | Accessibilità carente | tutte |
| 12 | 🟡 | HTML non valido / ripetizioni | tutte |
| 13 | 🟡 | CSS con errori, duplicati e codice morto | style.css |
| 14 | 🟡 | Listener scroll morto, layout con `100vh` / `overflow:hidden` | script.js / style.css |
| 15 | ⚪ | Organizzazione asset e naming, file inutili nel deploy | root |
| 16 | ⚪ | Varie (SEO, titoli, SRI, Font Awesome inutilizzato, ecc.) | varie |
| 17 | 🟠 ✅ | Work su tablet/mobile: colonne REFERENCE e DESCRIPTION disallineate, intestazioni sovrapposte; colonna REFERENCE non più nascosta | style.css / script.js |
| 18 | 🟡 ✅ | `home.html` su mobile: immagini sovrapposte, nessun layout dedicato | style.css |

---

## 🔴 Problemi critici

### 1. I click sui progetti con galleria non funzionano
- **Dove:** [script.js:266-287](script.js#L266-L287), [work.html:70-76](work.html#L70-L76)
- **Causa:** nella colonna NAME la classe `clickable` e l'attributo `data-type` sono sull'`<a>` interno, non sul `<li>`. `createEntry()` ([script.js:90-106](script.js#L90-L106)) copia classi e attributi solo del `<li>` sul `div.work-entry`, quindi `event.target.closest(".work-entry.clickable")` non trova mai niente. Nelle colonne REFERENCE/DESCRIPTION invece `clickable` e `data-image` sono sul `<li>`, e lì funziona.
- **Effetto:** cliccando "The geometricity…", "Redesigning Roberto Capucci", "SOULS", "FW2024 - Seven Gauge" non si apre nessuna galleria (`showProjectGallery` e le `ranges` sono di fatto codice irraggiungibile); il `href="#"` fa solo saltare in cima.
- **✅ Verificato nel browser:** su 1440 px ho cliccato (con mouse) e premuto Invio (tastiera) sui quattro link: in tutti i casi `#imageGrid` resta con 0 immagini, la classe `project-view` non compare, la pagina rimane com'è e l'URL diventa `work.html#`. Al contrario cliccando un riferimento (es. TR01) o una descrizione (es. "Fishnet jeans skirt") la galleria si apre (7 e 2 immagini).
- **Impatto reale:** i 4 progetti principali, cioè il cuore del portfolio, hanno immagini nelle cartelle `imggg/` (86 foto) e `imgggg/` (30 foto) che non sono raggiungibili da nessuna pagina. Le gallerie varrebbero 58 MB, 36 MB, 19 MB e 19 MB: anche una volta riparate sono troppo pesanti (vedi punto 2).

### 2. Peso complessivo ~893 MB
- **Dove:** cartelle `img/`, `imgg/`, `imggg/`, `ims/`, `i/`, `m/`
- JPEG originali da fotocamera (7728×5152 px, fino a 18 MB ciascuno; `i/6.png` 11 MB, `i/7.png` 10 MB) serviti tal quali in una colonna larga ~45% dello schermo. 169 JPEG su 292 superano 1 MB.
- `ims/` da sola pesa 437 MB. Una galleria da 38 immagini (`imggg/1-38`) può significare centinaia di MB scaricati.
- Nessun `srcset`/`sizes`, nessun formato moderno (WebP/AVIF), nessun `width`/`height` (layout shift).
- `home.html` carica 35 immagini a piena risoluzione senza `loading="lazy"` (✅ 0 con `loading=lazy`, tutte caricate subito; la pagina è alta 15 232 px a 1440 px).
- Misurato su disco: griglia1 (`imggg/1-38`) 58 MB, griglia2 36 MB, griglia3 19 MB, griglia4 19 MB; il riferimento PA01 (4 foto in `ims/`) 44 MB. In test le immagini della galleria TR01 vengono caricate a 1560×2768 px per una colonna di ~600 px.
- Su mobile/connessione lenta il sito è di fatto inutilizzabile e anche l'hosting può avere limiti di spazio/banda.
- **Direzione:** ridimensionare (max ~2000 px lato lungo), comprimere, generare WebP + `srcset`, aggiungere `loading="lazy"`/`decoding="async"` e dimensioni esplicite.

### 3. Redirect della landing dopo 5 minuti (📖 calcolato dal codice, non atteso 5 minuti)
- **Dove:** [index.html:30](index.html#L30)
- `seconds * 100000` ms con `seconds = 3` = 300 000 ms = **5 minuti**. Il commento dice "5 secondi", il codice di chiamata dice 3. Il fattore corretto è 1000. Di fatto il redirect automatico non avviene mai; funziona solo il click ([index.html:13](index.html#L13)), che nel test porta correttamente a `home.html`.

### 4. File referenziati ma inesistenti (404)
- `responsive.css` — [home.html:9](home.html#L9)
- `portfolio.css`, `portfolio.js` — [project.html:11-12](project.html#L11-L12)
- ✅ Confermati nel browser: `GET /responsive.css`, `/portfolio.css`, `/portfolio.js` rispondono 404. In più c'è un 404 su `/favicon.ico` in ogni pagina (nessun favicon). Il controllo dei riferimenti locali non ha trovato altri file mancanti: tutte le immagini di home e galleria si caricano (0 immagini rotte). Su `home.html` provoca una richiesta 404 a ogni caricamento; su `project.html` rende la pagina inutilizzabile (vedi punto 6).
- Dato che `responsive.css` non esiste, la griglia di `home.html` non ha alcun adattamento mobile (vedi punto 18).

---

## 🟠 Problemi alti

### 5. `home.html`: documento HTML annidato
- [home.html:16-27](home.html#L16-L27): dentro `<body>` c'è un secondo `<!DOCTYPE html><html><head>…</head><body>`. Il browser lo "ripara" scartando i tag, ma:
  - `style.css`, Font Awesome e `script.js` sono inclusi **due volte** (stessi script eseguiti due volte);
  - `<title>`, `<meta>` duplicati; markup non valido;
  - copia/incolla evidente da un'altra pagina → rischio di divergenze nel tempo.

### 6. `project.html` pagina orfana e rotta
- Non è linkata da nessuna pagina né da `script.js`. ✅ Aperta direttamente nel browser mostra solo "Loading project..." e dà due 404.
- Dipende da `portfolio.js` (mancante) per popolare `#projectMain`: mostra per sempre "Loading project...".
- Usa una struttura diversa (`site-header`, `main-nav`, lightbox) rispetto alle altre pagine (`nav`, `.logo`): probabile residuo di un refactoring non completato. Va completata o rimossa.

### 7. CSS responsivo morto dopo la trasformazione JS
- `work.html` ha 5 colonne (`.column`, spaziature con `<li class="spaceddd">`, ecc.). Lo script ([script.js:147](script.js#L147)) **sostituisce tutto** con `.work-headings` / `.work-project` / `.work-column`, scartando le `<li>` vuote ([script.js:63-66](script.js#L63-L66)).
- Conseguenze in [style.css](style.css):
  - Tutte le classi `.spaced, .spacedd, .spaceddd, .space, .spac, .spa, .sp, .s, .spp, .sppp, .spppp, .spazio` (righe 372-414, 540-581, 611-613, 631-633) sono codice morto con JS attivo; con JS disattivo la pagina è comunque disallineata.
  - `.column:nth-child(n)` con larghezze (righe 336-351, 529-592, 614-643) non si applica più.
  - `#hide { display:none }` ([style.css:607, 627](style.css#L607)): l'`id` non viene più clonato nelle `.work-column` (viene copiato solo l'attributo del `<li>`, non della colonna). ✅ A 1000 e 1250 px la colonna REFERENCE (larga 81 e 101 px) è visibile, mentre il CSS prevedeva di nasconderla.
  - `id="hide"` è ripetuto due volte in [work.html:30, 79](work.html#L30) → ID duplicato (non valido).
- La struttura dati (progetti ↔ righe) è codificata a mano in tre posti: `groupSizes` in JS, ordine delle `<li>` in HTML, `projectNames` in JS. Qualsiasi aggiunta richiede modifiche sincronizzate (vedi punto 10).

### 8. Navigazione galleria Work
- [style.css:843-845](style.css#L843-L845): `.project-back-button { display:none !important }` e visibile solo sotto 767 px. Su desktop, dopo aver aperto una galleria, **non esiste un controllo per tornare** all'immagine iniziale/elenco.
- ✅ Su 1440 px il pulsante esiste nel DOM ma ha `display:none` (box 0×0): confermato. Il tasto Indietro del browser dopo l'apertura di una galleria resta su `work.html` (nello stato attuale non cambia nulla perché non c'è history).
- Nessun aggiornamento di URL/hash/`history`: il tasto "indietro" del browser esce da Work; non si possono condividere link a un progetto; refresh = perdita dello stato.
- Il pulsante usa stringhe in inglese/italiano miste (`aria-label="Torna a tutti i lavori"` in un sito in inglese).
- ✅ Tra 767 e 780 px la galleria mobile si attiva (`innerWidth <= 780` in [script.js:230](script.js#L230)) ma il pulsante di ritorno non è visibile (soglia 767 px) → utente bloccato nella galleria in quella fascia (es. alcuni tablet). Verificato a 770 px: `mobile-gallery` attiva, pulsante presente ma non visibile, elenco nascosto.
- ✅ La condizione `window.innerWidth <= 780` è valutata solo al click: aprendo una galleria a 390 px e allargando la finestra a 1440 px l'elenco resta nascosto (`.left-box` display none), la classe `mobile-gallery` resta attiva e il pulsante di ritorno non è visibile → pagina bloccata fino al refresh (verificato).
- Il ritorno da mobile funziona correttamente: a 390 px il pulsante ← è visibile e riporta all'elenco e all'immagine iniziale.

### 9. Video
- [index.html:16](index.html#L16): `<video autoplay>` senza `muted` e `playsinline` → ✅ in Chromium il video è caricato (`readyState 4`) ma resta **in pausa** (`paused: true`, `muted: false`): la landing mostra un fotogramma fermo finché non si clicca (e il click porta alla home). Su iOS Safari l'effetto è analogo. Nessun `poster`, nessun fallback.
- `img/BIGA.mp4` pesa **85 MB** per una landing: tempi di caricamento molto alti.
- ✅ In About il video parte (è `muted`) e il testo è leggibile a 1440 e 390 px, senza scroll orizzontale; ma [about.html:26](about.html#L26): `big_buck_bunny_720p_1mb.mov` — il nome richiama il video di prova di Big Buck Bunny, ma il contenuto è un video reale; il file ha `type="video/mp4"` ma contenitore QuickTime (`.mov`); compatibilità non garantita. 
- [about.html](about.html): il filtro/`blur(5px)` + `brightness(1.3)` sul video a schermo intero ([style.css:168](style.css#L168)) è costoso per la GPU su mobile.
- `playVideo()`, `#playButton`, `.custom-controls` ([script.js:10-16](script.js#L10-L16), [style.css:190-207](style.css#L190-L207)): non esiste alcun elemento corrispondente nelle pagine → codice morto. Lo stesso per `redirectToHome` ([script.js:6](script.js#L6)): è usato solo da `index.html` ma lo script è caricato anche in tutte le altre pagine.

---

## 🟡 Problemi medi

### 10. Fragilità della logica Work ([script.js:23-147](script.js#L23-L147))
- `originalColumns.length !== 5` e il controllo `valid` (numero esatto di voci per colonna) fanno `return` silenzioso: se si aggiunge un progetto o una voce, **la pagina rimane nello stato non trasformato** (con spaziature a mano) e l'errore è visibile solo in console.
- Numeri "magici" (`groupSizes`, `6`, `5`) duplicano informazione presente nell'HTML.
- Le voci vengono clonate con `innerHTML`: i contenuti sono statici e fidati, quindi non c'è rischio XSS oggi, ma il pattern non è sicuro se i dati diventassero dinamici.
- ✅ Il testo del progetto viene sostituito su `load`/`resize` ([script.js:330-345](script.js#L330-L345)) con `textContent`, che **elimina** "w/ Chiara Cicciù" e "w/ Fondazione Roberto Capucci" sotto i 1200 px; la logica non è reversibile: caricando a 1100 px e allargando a 1500 px il testo resta abbreviato (verificato). Lo stesso risultato andrebbe ottenuto con CSS (`display:none` sul `<span>` della collaborazione).
- Dati non coerenti tra colonne: riga "Biga studio Branding" in NAME vs "BIGA. studio Branding" in `projectNames`; refusi nei testi ("Seetrough", "strech", "toulle", "Perwinkle", "roofless", "Listed Shirt", "Alghe").
- Parti dei `data-image` hanno spazi dopo la virgola (gestiti con `trim()`), ma `ims/10.jpg,ims/12.jpg` non ne ha: incoerenza (gestita, ma segnala copia manuale). Salto di numerazione (`11`, `22`, `31` esistono solo come `.cr2`; vedi punto 15).

### 11. Accessibilità (parte 📖, parte ✅)
- Quasi tutte le immagini hanno `alt="Image 1"` ([home.html](home.html) tutte le 35) o `alt="Portfolio image"` nelle gallerie: nessuna informazione utile.
- ✅ Le voci non sono attivabili da tastiera in modo affidabile: sui link dei progetti Invio non apre nulla (punto 1), e i riferimenti sono `<li>` con `<a href="#">` (l'URL diventa `work.html#`).
- Voci cliccabili: `<a href="#">` usate come bottoni (porta a `#`, salto in cima senza `preventDefault` nei casi non delegati); nessun focus visibile personalizzato; il solo `:hover` evidenzia (non `:focus-visible`).
- Il testo "About" è un `<h2>` con 17 `<br>` ([about.html:29-47](about.html#L29-L47)): un unico blocco di testo senza paragrafi, gerarchia dei titoli errata (h1 nel logo, h2 per il paragrafo, h3 per i link social). Dovrebbe essere `<p>`.
- Contrasto/dimensione testo: `font-size: 10-11px` e `font-weight: lighter` su sfondo bianco (colonne Work), `h2 7pt` su mobile ([style.css:500-505](style.css#L500-L505)): sotto le soglie di leggibilità WCAG consigliate.
- `mix-blend-mode: difference` sulla navbar ([style.css:647-652](style.css#L647-L652), [script.js:304](script.js#L304)) con testo nero → contrasto non garantito.
- Il video decorativo non ha `aria-hidden`/alternativa; autoplay senza controlli né `prefers-reduced-motion`.
- Pulsante di ritorno 22×20 px ([style.css:859-860](style.css#L859-L860)): area di tocco molto sotto i 44×44 px consigliati.
- `lang="en"` ma commenti/aria in italiano (`aria-label="Torna a tutti i lavori"`).

### 12. HTML non valido / incoerente
- [work.html:49-51, 66, 68](work.html#L49): `</br>` (non esiste, va `<br>`) e `</a>` orfani dopo `<br>` / testo (righe 66, 68: `Biga studio <br> Branding</a>`, `Academic project</a>`).
- [about.html:49, 51, 52](about.html#L49): `</i>` orfano dopo il testo dei link.
- [work.html:217](work.html#L217): `</div >` con spazio (tollerato ma sporco).
- `id="hide"` duplicato; [home.html](home.html): `<title>`/head duplicati (punto 5).
- Il tag `<ul>` della colonna usa `<li>` vuoti come "spaziatori" (anti-pattern semantico).
- `<h1>` presente sia nel logo esteso sia in `logopiccolo` (due `h1` per pagina).
- `<h3><a target="_blank">` senza `rel="noopener noreferrer"` sui link esterni ([about.html:49-52](about.html#L49-L52)); i browser moderni lo implicano per `_blank`, ma è buona pratica esplicitarlo. `mailto:` con `target="_blank"` apre una scheda vuota in alcuni browser.
- Font Awesome: `integrity="sha512-"` ([index.html:8](index.html#L8) e altri) è un valore non valido/incompleto (nessun hash): la protezione SRI non funziona e `crossorigin="anonymous"` è inutile. Inoltre Font Awesome è usato solo per un'icona nascosta (`.toggle-icon`, `display:none`) → richiesta di rete inutile su ogni pagina.

---

## 🟡 CSS ([style.css](style.css))

### 13. Errori e duplicazioni
- Proprietà/valori invalidi (ignorati dal browser): `height: 100hv` ([style.css:311](style.css#L311), voleva `vh`), `max-width: auto` / `max-height: auto` ([325-326](style.css#L325)), `font-style: none` ([26, 37](style.css#L26)), `max-height: 65VH` (maiuscolo, ok ma incoerente).
- `h1` definito 3 volte con valori diversi ([55](style.css#L52), [182](style.css#L182), [258](style.css#L258)): vince l'ultimo; l'`h1` del logo è sovrascritto in modo non evidente.
- `.logopiccolo` dichiarato due volte ([450-452](style.css#L450), [454-458](style.css#L454)); `@media (max-width: 780px)` dichiarato due volte consecutive con regole sovrapposte (`.column:nth-child(2/3/5)` impostato 3 volte con valori diversi nello stesso blocco: [529-537](style.css#L529) e [583-592](style.css#L583)).
- Commenti copia-incolla errati ("Larghezza fissa di 300px per la quinta colonna" su tutte le colonne e su valori in %).
- Mescolanza di stili legacy (`.container`, `.left-box`, `.right-box` con padding-top 10%) e nuovi (`body.work-page …`) che si sovrascrivono: l'ultima parte del file (righe 656+) annulla gran parte delle prime. Una pulizia ridurrebbe il file di circa il 40%.
- Stili per elementi inesistenti: `.over`, `.titolo`, `.text-box h3 a` ridondante, `.toggle-icon` (nascosto inline), `.custom-controls`, `#playButton`, `.work-container`, `.contenitore`/`.videofullscreen` (usati solo in about).
- Selettori troppo generici (`ul`, `li`, `h1`, `h2`, `img`, `nav`) con effetti collaterali su tutte le pagine; uso di `body, html {height:100%}` insieme a layout `100vh`.
- Font: `'Franklin Gothic Medium', 'Arial Narrow', Arial` è presente solo su Windows/Office; su Linux/Android il rendering cambia. `font-weight: lighter` con font di sistema spesso non ha effetto.
- Nessun `@media (prefers-color-scheme / prefers-reduced-motion)`, nessuna variabile CSS per colori/spaziature.

### 14. Layout e scroll
- [style.css:660-676](style.css#L660): `body.work-page { overflow:hidden }` e `.container { height: calc(100vh - 120px) }`. Su mobile `100vh` include la barra degli indirizzi → parte della pagina è tagliata; usare `dvh`/`svh`.
- Poiché il body non scrolla mai, il listener `window.addEventListener("scroll", …)` per la navbar ([script.js:295-309](script.js#L295-L309)) **non scatta mai** (lo scroll avviene dentro `.left-box`/`.right-box`): codice morto, e `mix-blend-mode` non viene mai attivato.
- La `nav` è `position: fixed` senza sfondo: il testo nero si sovrappone al contenuto durante lo scroll su home e about.
- `.parent` ([style.css:94-100](style.css#L94)): `margin-top: 20%` e 38 righe `1fr` con `grid-area` assegnate a mano; `.div17 { grid-area: 16 / 4 / 15 / 5 }` ha riga finale < iniziale (il browser inverte): funziona per caso, fragile. La griglia non ha variante mobile: 6 colonne anche su telefono.
- Gallery: `#imageGrid img { width:100% }` senza `aspect-ratio`: salti di layout durante il caricamento lazy.

---

## 🟠 Problemi aggiuntivi emersi dal test in browser

### 17. Work su tablet e telefono (✅ screenshot a 1000, 1250 e 390 px)
- **Righe disallineate:** REFERENCE e DESCRIPTION sono due colonne separate: quando una descrizione va a capo (es. "Waterproof convertible trench" a 1000 px e 390 px) le righe successive scendono e non corrispondono più al codice a sinistra (TR01/PA05 vs descrizioni). Dato che la corrispondenza codice ↔ descrizione è l'informazione della tabella, il layout a colonne indipendenti è fragile: andrebbe una riga per voce.
- **Intestazioni sovrapposte** a 390 px: "REFERENCE" e "DESCRIPTION" si toccano/sovrappongono.
- Tra 850 e 1300 px la colonna REFERENCE dovrebbe essere nascosta (vedi punto 7) ma è visibile.
- A 390 px l'altezza della prima riga dell'elenco e la navbar occupano circa 100 px: l'elenco inizia solo dopo uno spazio vuoto ampio (margin-top 100px/120px) rispetto al contenuto.
- Desktop 1440 px: layout corretto, elenco a sinistra e immagine a destra; nessun errore JS in console.

### 18. Home su mobile (✅ screenshot a 390 px)
- Nessuno scroll orizzontale (`scrollWidth` 390), ma la griglia a 6 colonne produce immagini molto piccole (circa 65 px) e alcune sovrapposte (es. gruppo a destra intorno a y≈200 px), con grandi spazi vuoti. Manca un layout mobile dedicato perché `responsive.css` non esiste.
- Desktop: la griglia funziona, tutte le 35 immagini si caricano; sono presenti molti spazi bianchi per via dell'`margin-top: 20%` e delle righe vuote (riga 8 non ha immagini).
- Il numero di immagini in HTML (35) è inferiore alle classi CSS `.div1`-`.div36`: manca almeno un blocco (non c'è `img/…` per uno dei posti) → regola CSS inutilizzata.

---

## ⚪ Problemi bassi

### 15. Organizzazione del progetto e file nel deploy
- Nomi cartelle poco chiari e simili: `img`, `imgg`, `imggg`, `imgggg`, `ims`, `i`, `m` (nessuna convenzione o relazione con i progetti). `imggg/` e `imgggg/` sono usate solo da JS (stringhe costruite), quindi difficili da individuare con una ricerca nel codice.
- File non referenziati: `imgg/im47.jpg … im61.jpg` (15 file), `ims/11.cr2`, `ims/22.cr2`, `ims/31.cr2` (**RAW Canon, 28 MB ciascuno** = 84 MB inutili da pubblicare).
- `.DS_Store` (macOS) in root, `img/`, `imgg/`: da rimuovere e aggiungere a `.gitignore`.
- `DSCF5232.jpg` in root, mentre gli altri asset sono in cartelle.
- Mancano: `.gitignore`, `README`, `favicon`, `robots.txt`, `404.html`. Il progetto non è un repository git (non c'è controllo versione) né ha pipeline di build/minificazione.
- `img/big_buck_bunny_720p_1mb.mov`: nome fuorviante per un video reale (vedi punto 9); ora convertito in `img/about.mp4`.
- Nessun test né linting (HTML/CSS/JS).

### 16. Varie
- SEO: tutte le pagine hanno `<title>BG</title>`; nessuna `meta description`, nessun Open Graph, nessun `canonical`, nessun favicon. Solo `project.html` ha `description` e un titolo sensato.
- `index.html`: tutta la landing è un `div` con `onclick`: non navigabile da tastiera né accessibile; il titolo è un `<h1>` in `mix-blend-mode`. Nessun link `<a>` / pulsante "Enter".
- Nel codice JS i commenti sono in italiano e il testo UI in inglese; stringhe (nomi progetto, percorso `DSCF5232.jpg`, ranges) hard-coded in più punti.
- `script.js` unico per tutte le pagine, con funzioni globali (`redirectToHome`, `playVideo`, `updateParagraphText`) e listener registrati ovunque; conviene separare per pagina o usare `type="module"`.
- Dati personali pubblici nel codice: email `bianca.gazzarrini@gmail.com`, profili social e cartella Google Drive del CV ([about.html:49-52](about.html#L49-L52)). Se la cartella Drive è condivisa con link pubblico va bene, ma è da verificare. Nessun tracking/cookie presente.
- Metadati immagini: controllati con `exiftool`/ricerca: nessun tag GPS nei JPEG, ma contengono EXIF della fotocamera (modello Canon EOS 4000D); valutare la rimozione in fase di ottimizzazione.
- Path con maiuscole/minuscole: `DSCF5232.jpg` coincide, ma attenzione ad hosting case-sensitive se i file vengono rinominati (`.JPG`/`.jpg`).

---

## Priorità consigliata (ordine di intervento)

1. Correggere il click sui 4 progetti (punto 1) e il delay del redirect (punto 3).
2. Risolvere i 404 (`responsive.css`, `portfolio.*`) e decidere cosa fare di `project.html` (punti 4, 6).
3. Ottimizzare immagini e video e rimuovere RAW/inutilizzati (punti 2, 9, 15): è il maggiore guadagno di prestazioni.
4. Ripulire `home.html` (HTML annidato) e correggere l'HTML non valido (punti 5, 12).
5. Aggiungere navigazione di ritorno e stato URL nella galleria Work (punto 8).
6. Riordinare il CSS e rimuovere il codice morto (punti 7, 13, 14) e migliorare l'accessibilità (punto 11).

## Cosa non è stato verificato
- Test fatti solo con Chromium headless (Linux); non provati Safari/iOS, Firefox, né dispositivi reali. Il comportamento dell'autoplay su iOS è dedotto dalle regole note dei browser.
- Il redirect automatico di `index.html` non è stato atteso per i 5 minuti: il valore è calcolato dal codice.
- Le gallerie dei 4 progetti principali non si aprono (punto 1), quindi il loro aspetto/peso reale non è stato testato; le dimensioni sono state misurate su disco.
- Non sono stati eseguiti Lighthouse, il validatore W3C né verifiche di accessibilità automatiche.

## Come sono stati eseguiti i test
- Server: `python3 -m http.server 8765` nella cartella del progetto.
- Browser: Chromium (Playwright). Pagine: `index`, `home`, `about`, `work`, `project`. Viewport: 1440×900, 1250×800, 1000×800, 770×900, 390×800.
- Controlli: errori console e richieste fallite, immagini rotte, stato del video, struttura DOM di Work, click su ogni progetto e su riferimenti/descrizioni, Invio da tastiera, pulsante ← su mobile e desktop, resize dopo l'apertura della galleria, sostituzione del testo a ≤1200 px.
