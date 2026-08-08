# Portfolio alternance — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** convertir l'artifact Claude `Portfolio Valdon Sadiki.dc.html` en site statique HTML/CSS/JS standard, au rendu visuel identique, versionné et déployable sur GitHub Pages.

**Architecture :** un `index.html` autoporteur (contenu écrit en dur), une feuille `assets/styles.css` en BEM avec la palette en variables CSS, un `assets/main.js` d'enrichissement (accordéon, apparitions au scroll, parallaxe). Aucun build step. L'artifact d'origine reste dans `_source/`, intact et renderable, comme référence de comparaison.

**Tech Stack :** HTML5, CSS3 (custom properties, BEM), JavaScript ES6 vanilla. Google Fonts. Aucune dépendance installée.

**Spec de référence :** [`_docs/superpowers/specs/2026-08-07-portfolio-alternance-design.md`](../specs/2026-08-07-portfolio-alternance-design.md)

---

## Global Constraints

Ces contraintes s'appliquent à **toutes** les tâches sans exception.

- **Aucun build step, aucune dépendance installée.** Node, Python, PHP et npx sont absents du poste. Vérifié le 2026-08-07 : le `python.exe` présent dans le `PATH` est le raccourci Microsoft Store, il ne s'exécute pas.
- **Chemins relatifs uniquement.** Le site doit s'ouvrir correctement en `file://` par double-clic, sans serveur. C'est le seul moyen de vérification disponible sur ce poste.
- **Ne jamais créer de fichier `.nojekyll`.** C'est Jekyll qui exclut `_source/` du site publié par GitHub Pages. Un `.nojekyll` publierait l'archive.
- **Ne jamais modifier `_source/`.** C'est la référence de comparaison. Lecture seule après la tâche 1.
- **Contenu textuel repris au caractère près**, apostrophes typographiques (`’`, U+2019) et espaces insécables inclus, tels qu'ils apparaissent dans le fichier source. Ne rien reformuler, ne rien corriger, même une faute apparente.
- **Encodage UTF-8**, avec `<meta charset="utf-8">` en première ligne du `<head>`. Écrire les fichiers avec l'outil Write, jamais avec `Out-File` ou `Set-Content` sans `-Encoding utf8`.
- **Toujours lire avec `-Encoding utf8`.** Windows PowerShell 5.1 lit par défaut dans la page de codes ANSI du système : sans ce paramètre, `Get-Content -Raw` corrompt tous les caractères accentués et les vérifications de fidélité textuelle renvoient des faux négatifs. Toutes les commandes de ce plan le précisent ; ne le retire pas, et ajoute-le à toute commande que tu écrirais en plus.
- **Nommage BEM** (`bloc__element--modificateur`), cohérent avec la convention déjà employée sur SDK Lavage Pro.
- **Aucun framework, aucun CDN** hormis Google Fonts (déjà présent dans la source).
- **Valeurs de style reprises à l'identique.** Ne pas arrondir, ne pas harmoniser, ne pas « améliorer » une valeur (`17.5px`, `11.5px`, `16.5px`, `12.5px` sont volontaires).

---

## File Structure

| Fichier | Responsabilité | Dépend de |
|---|---|---|
| `index.html` | Structure et contenu intégral de la page | rien |
| `assets/styles.css` | Présentation : palette, typographies, mise en page, états `:hover` / `:focus-visible` | les classes d'`index.html` |
| `assets/main.js` | Enrichissement : accordéon, reveal, parallaxe | 3 contrats HTML : `[data-reveal]`, `[data-parallax]`, `[data-interests]` |
| `media/cv.pdf` | CV téléchargeable | — |
| `media/photo-pro.jpg` | Photo de la section À propos | — |
| `_source/` | Archive de l'artifact, référence de comparaison, non publiée | — |
| `README.md` | Description du dépôt et procédure de déploiement | — |

Les trois contrats de `main.js` sont indépendants : si l'un est absent du HTML, les deux autres continuent de fonctionner.

---

## Nomenclature CSS — référence unique

**Toutes les tâches utilisent ces noms exacts.** Ne pas en inventer d'autres, ne pas renommer en cours de route.

**Nav et hero**
`.site-nav` · `.site-nav__brand` · `.site-nav__links` · `.site-nav__link` · `.hero` · `.hero__deco` · `.hero__deco--stripes` · `.hero__deco--glow` · `.hero__inner` · `.hero__eyebrow` · `.hero__rule` · `.hero__title` · `.hero__lead` · `.hero__actions` · `.hero__meta` · `.hero__meta-item`

**Boutons**
`.btn` · `.btn--solid` · `.btn--outline` · `.btn--gold`

**Sections génériques**
`.section` · `.section--light` · `.section--alt` · `.section__head` · `.section__eyebrow` · `.section__title`

**Modificateurs de `.section__head`** — un par section, uniquement pour la marge basse
`.projects__head` (54px) · `.skills__head` (50px) · `.interests__head` (42px)

**À propos**
`.about` · `.about__col` · `.about__photo` · `.about__text` · `.about__para`

**Projets**
`.projects` · `.project` · `.project__side` · `.project__num` · `.project__title` · `.project__kicker` · `.project__tools` · `.tag` · `.project__body` · `.field` · `.field__label` · `.field__text` · `.project__todo`

**Compétences**
`.skills` · `.skill-group` · `.skill-group__label` · `.skill-group__items` · `.skill-group__item` · `.skills__note`

**Centres d'intérêt**
`.interests` · `.interests__list` · `.interest-btn` · `.interest-btn--open` · `.interest-panel` · `.interest-panel__label` · `.interest-panel__text` · `.interests__hint`

**Contact**
`.contact` · `.contact__deco` · `.contact__inner` · `.contact__eyebrow` · `.contact__title` · `.contact__links` · `.contact-link` · `.contact-link__label` · `.contact-link__value`

`.contact__eyebrow` et `.contact__title` **surchargent** les classes génériques (or clair sur fond sombre, titre plus grand). Elles se posent en plus, jamais à la place.

**Variables CSS**
`--bg` `#f5f1e8` · `--bg-card` `#f7f4ec` · `--bg-alt` `#efe9dc` · `--ink` `#23201b` · `--ink-body` `#443f36` · `--ink-soft` `#3c3830` · `--ink-muted` `#6d6455` · `--ink-faint` `#8a8175` · `--gold` `#9a7b33` · `--gold-light` `#c9a24a` · `--gold-deep` `#7d6228` · `--on-dark` `#f0ebdf` · `--on-gold` `#1a1712`
`--font-display` `'Cormorant Garamond', serif` · `--font-ui` `'Karla', system-ui, sans-serif` · `--font-mono` `'IBM Plex Mono', monospace`

Deux couleurs restent en littéral car employées une seule fois : `#4a443a` (`.hero__lead`) et `#16181b` (`::selection`).

---

## Stratégie de vérification

Il n'existe sur ce poste **ni serveur local, ni navigateur automatisable**. La vérification se fait donc à deux niveaux, et les deux sont obligatoires.

**Automatique** — exécutable par l'agent, à chaque tâche : absence de syntaxe DC résiduelle, et égalité des ensembles de couleurs, de polices et de liens entre la source et la cible. Les commandes exactes figurent dans les tâches.

**Humaine** — la comparaison visuelle finale (tâche 9) revient à l'utilisateur, qui ouvre les deux fichiers côte à côte. L'agent ne peut pas voir le rendu et ne doit jamais affirmer qu'il l'a vérifié visuellement.

---

## Task 1 : Restructurer le dépôt et préparer les médias

**Files:**
- Create: `_source/` (déplacement de `Portfolio web alternance SIO SISR/`)
- Create: `media/cv.pdf`, `media/photo-pro.jpg`
- Create: `assets/` (dossier vide à ce stade)

**Interfaces:**
- Consumes: rien
- Produces: `_source/Portfolio Valdon Sadiki.dc.html` (référence de comparaison, renderable en `file://`) ; `media/cv.pdf` ; `media/photo-pro.jpg`

> **Point important :** `_source/uploads/` doit être **conservé intact** à l'intérieur de `_source/`. L'artifact référence `uploads/Photo Pro.png` en relatif ; sans ce dossier, la version de référence ne s'affiche plus et la comparaison finale devient impossible.

- [ ] **Step 1 : Déplacer le dossier d'origine vers `_source/`**

```powershell
git -C C:\Sites\Portfolio mv "Portfolio web alternance SIO SISR" "_source"
git -C C:\Sites\Portfolio status --short
```

Attendu : 6 lignes `R` (renommages), aucune ligne `D` sans `R` correspondant.

- [ ] **Step 2 : Vérifier que la référence est toujours complète**

```powershell
Get-ChildItem C:\Sites\Portfolio\_source -Recurse -File | Select-Object -ExpandProperty FullName
```

Attendu, exactement 6 fichiers : `Portfolio Valdon Sadiki.dc.html`, `support.js`, `.thumbnail`, `uploads/cv-1786031691808.pdf`, `uploads/Photo Pro.png`, `uploads/Portfolio.txt`.

- [ ] **Step 3 : Créer `assets/` et `media/`, et copier le CV**

```powershell
New-Item -ItemType Directory -Force C:\Sites\Portfolio\assets, C:\Sites\Portfolio\media
Copy-Item "C:\Sites\Portfolio\_source\uploads\cv-1786031691808.pdf" "C:\Sites\Portfolio\media\cv.pdf"
(Get-Item C:\Sites\Portfolio\media\cv.pdf).Length
```

Attendu : `301134`.

- [ ] **Step 4 : Recompresser la photo en JPEG**

`Photo Pro.png` fait 2 073 465 octets. Cible : JPEG qualité 82, sous 300 Ko, **dimensions inchangées** (le CSS applique `aspect-ratio: 4/5` et `object-fit: cover` — redimensionner changerait le cadrage).

```powershell
Add-Type -AssemblyName System.Drawing
$src = $null; $bmp = $null; $g = $null
try {
  $src = [System.Drawing.Image]::FromFile("C:\Sites\Portfolio\_source\uploads\Photo Pro.png")
  $w = $src.Width; $h = $src.Height
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 82)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($src, 0, 0, $w, $h)
  $bmp.Save("C:\Sites\Portfolio\media\photo-pro.jpg", $codec, $params)
  "{0}x{1} -> {2} octets" -f $w, $h, (Get-Item C:\Sites\Portfolio\media\photo-pro.jpg).Length
} finally {
  if ($g)   { $g.Dispose() }
  if ($bmp) { $bmp.Dispose() }
  if ($src) { $src.Dispose() }
}
```

Le `Clear(White)` est nécessaire : le JPEG n'a pas de canal alpha, et sans fond explicite une transparence éventuelle sortirait en noir.

Le `try`/`finally` n'est pas décoratif : si `Save()` échoue (fichier verrouillé, disque plein), les trois poignées GDI+ resteraient ouvertes jusqu'à la fin de la session PowerShell, et le PNG source resterait verrouillé en écriture. Les dimensions sont capturées dans `$w`/`$h` **avant** le `finally`, sinon les lire après `Dispose()` lèverait une exception.

- [ ] **Step 5 : Vérifier le poids et l'intégrité du JPEG**

```powershell
$len = (Get-Item C:\Sites\Portfolio\media\photo-pro.jpg).Length
if ($len -lt 300000 -and $len -gt 20000) { "OK : $len octets" } else { "ECHEC : $len octets" }
Add-Type -AssemblyName System.Drawing
$t = [System.Drawing.Image]::FromFile("C:\Sites\Portfolio\media\photo-pro.jpg")
"dimensions : $($t.Width) x $($t.Height)"; $t.Dispose()
```

Attendu : `OK`, et des dimensions identiques au PNG d'origine. Si le fichier dépasse 300 Ko, refaire le step 4 avec `Quality, 70`.

- [ ] **Step 6 : Ouvrir la référence pour confirmer qu'elle s'affiche**

```powershell
Start-Process "C:\Sites\Portfolio\_source\Portfolio Valdon Sadiki.dc.html"
```

**Demander à l'utilisateur de confirmer** que la page s'affiche complètement (hero, photo, 5 projets, accordéon cliquable). Si elle ne s'affiche pas en `file://`, s'arrêter et le signaler : sans référence visuelle, la garantie de rendu identique tombe et il faut redéfinir la stratégie avec l'utilisateur avant de continuer.

- [ ] **Step 7 : Commit**

```powershell
git -C C:\Sites\Portfolio add -A
git -C C:\Sites\Portfolio commit -m @'
Restructure : archive la source dans _source/, prepare media/

Photo recompressee en JPEG (2,0 Mo -> < 300 Ko), dimensions inchangees.
_source/uploads/ conserve intact pour que la reference reste renderable.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 2 : Socle HTML/CSS — head, variables, nav, hero

**Files:**
- Create: `index.html`
- Create: `assets/styles.css`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:11-62`

**Interfaces:**
- Consumes: `media/cv.pdf` (tâche 1)
- Produces: `index.html` avec `<head>` complet et les blocs `.site-nav` et `.hero` ; `assets/styles.css` avec `:root`, le reset et les règles de ces deux blocs. Les tâches 3 à 7 **ajoutent** à ces deux fichiers sans jamais réécrire ce socle.

- [ ] **Step 1 : Écrire `index.html` — head, nav, hero**

Le `<head>` reprend les `preconnect` et le `<link>` Google Fonts des lignes 11-13 de la source **sans modification**, et ajoute `assets/styles.css`. `main.js` est chargé en `defer`.

> **Ne pas « nettoyer » le `<link>` Google Fonts.** Il demande cinq familles, dont **Spectral** et **IBM Plex Sans** qui ne sont appliquées à aucun élément visible : dans la source, un conteneur pose IBM Plex Sans (ligne 25) puis un conteneur interne le remplace par Karla (ligne 30) sur la totalité du contenu, et Spectral n'est jamais référencée. Elles sont donc chargées sans servir. Les retirer changerait les requêtes réseau et ferait échouer la vérification des polices de la tâche 9. C'est du poids inutile hérité de l'artifact, à traiter séparément si tu le souhaites — pas pendant une conversion à rendu identique.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Valdon Sadiki — BTS SIO SISR, alternance technicien systèmes et réseaux</title>
<meta name="description" content="Portfolio de Valdon Sadiki, étudiant en BTS SIO SISR à Strasbourg, à la recherche d'une alternance de technicien systèmes et réseaux.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Karla:wght@400;500;600;700&family=Spectral:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
<script src="assets/main.js" defer></script>
</head>
<body>

<header class="site-nav">
  <a class="site-nav__brand" href="#a-top">VALDON SADIKI</a>
  <nav class="site-nav__links">
    <a class="site-nav__link" href="#a-propos">À propos</a>
    <a class="site-nav__link" href="#a-projets">Projets</a>
    <a class="site-nav__link" href="#a-competences">Compétences</a>
    <a class="site-nav__link" href="#a-contact">Contact</a>
  </nav>
</header>

<main>

  <section class="hero" id="a-top">
    <div class="hero__deco hero__deco--stripes" data-parallax="0.18"></div>
    <div class="hero__deco hero__deco--glow" data-parallax="-0.1"></div>
    <div class="hero__inner">
      <p class="hero__eyebrow" data-reveal><span class="hero__rule"></span><span>BTS SIO SISR · Strasbourg</span></p>
      <h1 class="hero__title" data-reveal>Valdon Sadiki</h1>
      <p class="hero__lead" data-reveal>Une idée, l'apprendre, la réaliser : j'ai appris seul, maintenant je veux apprendre en équipe. Je cherche une alternance de technicien systèmes et réseaux.</p>
      <div class="hero__actions" data-reveal>
        <a class="btn btn--solid" href="media/cv.pdf" download>Télécharger mon CV</a>
        <a class="btn btn--outline" href="mailto:sadiki.valdon1@gmail.com">Me contacter</a>
      </div>
      <p class="hero__meta" data-reveal>
        <span class="hero__meta-item">Rythme · 2 j école / 3 j entreprise</span>
        <span class="hero__meta-item">Disponible · dès maintenant</span>
        <span class="hero__meta-item">Secteur · Strasbourg et alentours</span>
      </p>
    </div>
  </section>

</main>
</body>
</html>
```

- [ ] **Step 2 : Écrire `assets/styles.css` — variables, reset, nav, hero**

Le reset reprend les règles globales des lignes 15-22 de la source. Les valeurs de `.site-nav` et `.hero` viennent des lignes 32-59.

```css
/* ---------- Variables ---------- */
:root {
  --bg: #f5f1e8;
  --bg-card: #f7f4ec;
  --bg-alt: #efe9dc;
  --ink: #23201b;
  --ink-body: #443f36;
  --ink-soft: #3c3830;
  --ink-muted: #6d6455;
  --ink-faint: #8a8175;
  --gold: #9a7b33;
  --gold-light: #c9a24a;
  --gold-deep: #7d6228;
  --on-dark: #f0ebdf;
  --on-gold: #1a1712;

  --font-display: 'Cormorant Garamond', serif;
  --font-ui: 'Karla', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}

/* ---------- Reset ---------- */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
}
a { color: inherit; text-decoration: none; }
::selection { background: var(--gold-light); color: #16181b; }

@keyframes omFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}

/* ---------- Navigation ---------- */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 48px;
  background: rgba(245, 241, 232, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(35, 32, 27, 0.1);
}
.site-nav__brand {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.06em;
}
.site-nav__links {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.site-nav__link {
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
}
.site-nav__link:hover,
.site-nav__link:focus-visible {
  border-bottom-color: var(--gold);
  color: var(--ink);
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 132px 48px 116px;
  background: linear-gradient(180deg, #f7f4ec 0%, #efe9dc 100%);
}
.hero__deco { position: absolute; pointer-events: none; }
.hero__deco--stripes {
  top: -80px; right: -60px;
  width: 620px; height: 620px;
  background: repeating-linear-gradient(102deg, rgba(154, 123, 51, 0.13) 0 2px, rgba(154, 123, 51, 0) 2px 22px);
}
.hero__deco--glow {
  left: -140px; bottom: -180px;
  width: 460px; height: 460px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(154, 123, 51, 0.16), rgba(154, 123, 51, 0) 70%);
}
.hero__inner {
  position: relative;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.hero__eyebrow {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
}
.hero__rule { width: 34px; height: 1px; background: var(--gold); }
.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(46px, 6.2vw, 84px);
  line-height: 1.02;
  letter-spacing: -0.015em;
}
.hero__lead {
  margin: 0;
  max-width: 660px;
  font-size: clamp(19px, 1.9vw, 25px);
  line-height: 1.5;
  color: #4a443a;
  text-wrap: pretty;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  padding-top: 6px;
}
.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
  margin: 24px 0 0;
  padding-top: 26px;
  border-top: 1px solid rgba(35, 32, 27, 0.12);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-muted);
}

/* ---------- Boutons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 26px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
}
.btn--solid { background: var(--ink); color: var(--bg); }
.btn--solid:hover, .btn--solid:focus-visible { background: var(--gold); }
.btn--outline { border: 1px solid rgba(35, 32, 27, 0.28); }
.btn--outline:hover, .btn--outline:focus-visible { border-color: var(--gold); color: var(--gold); }
.btn--gold {
  align-self: flex-start;
  margin-top: 12px;
  padding: 15px 28px;
  background: var(--gold-light);
  color: var(--on-gold);
  font-weight: 700;
}
.btn--gold:hover, .btn--gold:focus-visible { background: var(--on-dark); }
```

- [ ] **Step 3 : Vérifier qu'aucune syntaxe DC ne subsiste**

```powershell
$hits = Select-String -Path C:\Sites\Portfolio\index.html,C:\Sites\Portfolio\assets\styles.css -Pattern 'sc-for|sc-if|x-dc|style-hover|style-active|\{\{|DCLogic|helmet'
if ($hits) { "ECHEC"; $hits } else { "OK : aucune syntaxe DC" }
```

Attendu : `OK`.

- [ ] **Step 4 : Ouvrir la page et faire confirmer le rendu**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de comparer avec la référence : barre de navigation collante translucide, titre en Cormorant Garamond, deux boutons, ligne de trois métadonnées, dégradé de fond du hero.

Note attendue : le texte apparaît immédiatement (pas encore d'animation d'apparition — `main.js` n'existe pas). C'est normal à ce stade.

- [ ] **Step 5 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Socle HTML/CSS : head, variables, navigation, hero

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 3 : Section À propos

**Files:**
- Modify: `index.html` (insérer avant `</main>`)
- Modify: `assets/styles.css` (ajouter en fin de fichier)
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:64-78`

**Interfaces:**
- Consumes: `.section`, `.section--light`, `.section__eyebrow`, `.section__title` (définis ici pour la première fois, réutilisés par les tâches 4 à 7) ; `media/photo-pro.jpg` (tâche 1)
- Produits: les classes génériques `.section*`, sur lesquelles s'appuient toutes les sections suivantes.

- [ ] **Step 1 : Insérer le HTML avant `</main>`**

Les quatre paragraphes sont repris **mot pour mot** des lignes 72-75 de la source.

```html
  <section class="section section--light" id="a-propos">
    <div class="about">
      <div class="about__col" data-reveal>
        <p class="section__eyebrow">01 — À propos</p>
        <h2 class="section__title">Chercher la réponse avant de la demander</h2>
        <img class="about__photo" src="media/photo-pro.jpg" alt="Valdon Sadiki" width="320" height="400">
      </div>
      <div class="about__text" data-reveal>
        <p class="about__para">Petit, j'ai relié le ventilateur d'un vieux PC à un câble USB cassé pour me fabriquer un ventilateur personnel. Personne ne m'avait montré comment faire : j'ai démonté, essayé, recommencé. C'est resté ma méthode.</p>
        <p class="about__para">Les jeux et les machines m'ont accroché très tôt, et chaque fois que j'avais une question sur ces sujets, j'ai dû aller chercher la réponse moi-même. Tout ce que je sais aujourd'hui, je l'ai appris seul — et je suis fier du chemin parcouru.</p>
        <p class="about__para">Les idées ont changé, le processus est le même : avoir une idée, apprendre ce qu'il faut, la réaliser. Je suis plutôt réservé au premier contact, puis très présent une fois dans l'équipe : j'aime dépanner les autres, avancer avec des consignes claires et rendre un travail dont je peux expliquer chaque étape.</p>
        <p class="about__para">En BTS SIO SISR, je vise l'infrastructure : postes, serveurs, réseau, ce qui tient debout derrière les usages. Une alternance de technicien systèmes et réseaux est la suite logique.</p>
      </div>
    </div>
  </section>
```

- [ ] **Step 2 : Ajouter le CSS**

```css
/* ---------- Sections génériques ---------- */
.section { padding: 104px 48px; }
.section--light { background: var(--bg); }
.section--alt { background: var(--bg-alt); border-top: 1px solid rgba(35, 32, 27, 0.08); }
.section__head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 700px;
}
.section__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
}
.section__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(34px, 3.6vw, 48px);
  line-height: 1.1;
}

/* ---------- À propos ---------- */
.about {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 56px;
  align-items: start;
}
.about__col { display: flex; flex-direction: column; gap: 18px; }
.about__photo {
  margin-top: 8px;
  width: 100%;
  max-width: 320px;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 22%;
  border: 1px solid rgba(35, 32, 27, 0.12);
  filter: saturate(0.92) contrast(1.02);
}
.about__text {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 620px;
  font-size: 17.5px;
  line-height: 1.72;
  color: var(--ink-body);
  text-wrap: pretty;
}
.about__para { margin: 0; }
```

Le `.section__title` du hero utilise `clamp(34px, 3.6vw, 48px)` ; celui de la section Contact utilise `clamp(34px, 4vw, 54px)` — la tâche 7 le surcharge, ne pas modifier la règle générique.

- [ ] **Step 3 : Vérifier que le texte est identique à la source**

```powershell
$src = Get-Content "C:\Sites\Portfolio\_source\Portfolio Valdon Sadiki.dc.html" -Raw -Encoding utf8
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
$phrases = @(
  "j'ai relié le ventilateur d'un vieux PC",
  "je suis fier du chemin parcouru",
  "rendre un travail dont je peux expliquer chaque étape",
  "ce qui tient debout derrière les usages"
)
foreach ($p in $phrases) {
  $inSrc = $src.Contains($p); $inNew = $new.Contains($p)
  "{0,-5} {1,-5}  {2}" -f $inSrc, $inNew, $p
}
```

Attendu : `True True` sur les quatre lignes. Un `False` en colonne 2 signale une retranscription fautive — corriger avant de continuer.

- [ ] **Step 4 : Ouvrir et faire confirmer**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de vérifier le cadrage de la photo (portrait 4:5, visage correctement positionné) et la mise en deux colonnes qui passe en une colonne sous 280 px de colonne disponible.

- [ ] **Step 5 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Section A propos + classes de section generiques

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 4 : Section Projets

**Files:**
- Modify: `index.html` (insérer avant `</main>`)
- Modify: `assets/styles.css`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:80-116` (structure) et `262-312` (contenu des 5 projets)

**Interfaces:**
- Consumes: `.section`, `.section--alt`, `.section__head`, `.section__eyebrow`, `.section__title` (tâche 3)
- Produces: `.project` et ses éléments ; `.tag`, réutilisée nulle part ailleurs.

C'est la tâche la plus volumineuse : la boucle `<sc-for list="{{ projects }}">` se déplie en **5 blocs `.project`**, chacun contenant une boucle interne `{{ p.tools }}` qui se déplie en **autant de `.tag` que l'objet en compte** (8, 5, 7, 4 et 4 respectivement).

> **Contenu :** les champs `num`, `title`, `kicker`, `tools`, `context`, `role`, `result`, `todo` des 5 projets sont dans la source aux lignes 262-312. Les recopier **au caractère près**, y compris les apostrophes typographiques `’` présentes dans les champs `todo`. Ils ne sont pas dupliqués ici : la source est l'unique référence, et une retranscription dans ce plan introduirait un risque de divergence silencieuse.

- [ ] **Step 1 : Insérer la structure de section et le premier projet**

Ce bloc est le **gabarit exact** à répéter pour les projets 02 à 05. Seuls le contenu textuel et le nombre de `.tag` changent ; la structure ne varie jamais.

```html
  <section class="section section--alt" id="a-projets">
    <div class="section__head projects__head" data-reveal>
      <p class="section__eyebrow">02 — Projets</p>
      <h2 class="section__title">Ce que j'ai construit, et ce que j'en ai tiré</h2>
    </div>
    <div class="projects">

      <article class="project" data-reveal>
        <div class="project__side">
          <span class="project__num">Projet 01</span>
          <h3 class="project__title">Panny's Kitchen — application Android de gestion culinaire</h3>
          <p class="project__kicker">Recettes, stock réel et liste de courses enfin reliés.</p>
          <div class="project__tools">
            <span class="tag">Kotlin</span>
            <span class="tag">Jetpack Compose</span>
            <span class="tag">MVVM / Clean Archi</span>
            <span class="tag">Room</span>
            <span class="tag">Firebase Firestore</span>
            <span class="tag">ML Kit</span>
            <span class="tag">CameraX</span>
            <span class="tag">OpenFoodFacts</span>
          </div>
        </div>
        <div class="project__body">
          <div class="field">
            <span class="field__label">Contexte</span>
            <p class="field__text"><!-- p.context du projet 01, ligne 268 --></p>
          </div>
          <div class="field">
            <span class="field__label">Mon rôle</span>
            <p class="field__text"><!-- p.role du projet 01, ligne 269 --></p>
          </div>
          <div class="field">
            <span class="field__label">Résultat</span>
            <p class="field__text"><!-- p.result du projet 01, ligne 270 --></p>
          </div>
          <p class="project__todo">à compléter : captures d’écran de l’app, lien du dépôt GitHub</p>
        </div>
      </article>

      <!-- projets 02 à 05 : même structure, contenu des lignes 273-312 -->

    </div>
  </section>
```

Les commentaires `<!-- ... -->` sont des repères de rédaction : **ils doivent être remplacés par le texte de la source**, et aucun ne doit subsister dans le fichier final (le step 4 le vérifie).

- [ ] **Step 2 : Compléter les projets 02 à 05**

Répéter le gabarit du step 1 quatre fois, avec les contenus des lignes 273-312 :

| Bloc | Titre | Nombre de `.tag` |
|---|---|---|
| Projet 02 | Auto-formation Linux sur machine virtuelle | 5 |
| Projet 03 | SDK Lavage Pro — site vitrine et back-office de devis | 7 |
| Projet 04 | FL Perf — site vitrine pour un coach sportif | 4 |
| Projet 05 | Mémoire persistante pour mes IA (Obsidian) | 4 |

Attention au projet 04 : le champ `context` contient des guillemets droits échappés dans le source JS (`\"waw\"`). En HTML ils s'écrivent littéralement `"waw"`, sans échappement.

- [ ] **Step 3 : Ajouter le CSS**

```css
/* ---------- Projets ---------- */
.projects__head { margin-bottom: 54px; }
.projects { display: flex; flex-direction: column; gap: 22px; }
.project {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
  padding: 38px 40px;
  background: var(--bg-card);
  border: 1px solid rgba(35, 32, 27, 0.1);
  border-left: 3px solid var(--gold);
  transition: border-left-color 200ms ease;
}
.project:hover, .project:focus-within { border-left-color: var(--ink); }
.project__side { display: flex; flex-direction: column; gap: 14px; }
.project__num {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--gold);
}
.project__title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 1.15;
}
.project__kicker {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-muted);
}
.project__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
.tag {
  flex: 0 0 auto;
  white-space: nowrap;
  padding: 6px 11px;
  background: rgba(154, 123, 51, 0.12);
  color: var(--gold-deep);
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
}
.project__body { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
}
.field__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.62;
  color: var(--ink-body);
}
.project__todo {
  margin: 0;
  padding: 10px 12px;
  background: rgba(35, 32, 27, 0.05);
  border: 1px dashed rgba(35, 32, 27, 0.25);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-muted);
}
```

- [ ] **Step 4 : Vérifier la complétude et l'absence de repères**

```powershell
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
"articles .project : " + ([regex]::Matches($new, 'class="project"')).Count + " (attendu 5)"
"tags .tag         : " + ([regex]::Matches($new, 'class="tag"')).Count + " (attendu 28)"
"encadres todo     : " + ([regex]::Matches($new, 'class="project__todo"')).Count + " (attendu 5)"
"champs .field     : " + ([regex]::Matches($new, 'class="field"')).Count + " (attendu 15)"
$comments = [regex]::Matches($new, '<!--')
if ($comments.Count -gt 0) { "ECHEC : $($comments.Count) commentaire(s) HTML residuel(s)" } else { "OK : aucun commentaire residuel" }
```

Attendu : 5, 28, 5, 15, et `OK`. Le total de 28 `.tag` est la somme 8+5+7+4+4.

La règle est volontairement stricte : **`index.html` ne doit contenir aucun commentaire HTML**. Tous les commentaires de ce plan sont des repères de rédaction ; s'il en reste un, c'est qu'un contenu n'a pas été recopié.

- [ ] **Step 5 : Vérifier que les cinq titres sont bien présents et identiques**

```powershell
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
$titres = @(
  "Panny's Kitchen — application Android de gestion culinaire",
  "Auto-formation Linux sur machine virtuelle",
  "SDK Lavage Pro — site vitrine et back-office de devis",
  "FL Perf — site vitrine pour un coach sportif",
  "Mémoire persistante pour mes IA (Obsidian)"
)
foreach ($t in $titres) { "{0,-6} {1}" -f $new.Contains($t), $t }
```

Attendu : `True` sur les cinq lignes. Les tirets sont des cadratins `—` (U+2014), pas des traits d'union : un `False` vient le plus souvent de là.

- [ ] **Step 6 : Ouvrir et faire confirmer**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de vérifier les 5 cartes, la bordure gauche dorée qui passe au brun foncé au survol, et les étiquettes de technologies qui ne se coupent jamais en deux lignes.

- [ ] **Step 7 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Section Projets : 5 blocs deplies depuis la boucle sc-for

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 5 : Section Compétences

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:118-136` (structure) et `314-319` (contenu)

**Interfaces:**
- Consumes: `.section`, `.section--light`, `.section__head`, `.section__eyebrow`, `.section__title` (tâche 3)
- Produces: `.skills`, `.skill-group*`, `.skills__note`

Deux boucles imbriquées à déplier : 4 groupes, 4 items chacun, soit 16 `.skill-group__item`.

- [ ] **Step 1 : Insérer le HTML**

Contenu intégral repris des lignes 315-318 et 135.

```html
  <section class="section section--light" id="a-competences">
    <div class="section__head skills__head" data-reveal>
      <p class="section__eyebrow">03 — Compétences &amp; outils</p>
      <h2 class="section__title">Mes fondations</h2>
    </div>
    <div class="skills">

      <div class="skill-group" data-reveal>
        <span class="skill-group__label">Systèmes</span>
        <div class="skill-group__items">
          <span class="skill-group__item">Windows 10 / 11</span>
          <span class="skill-group__item">Linux (bases)</span>
          <span class="skill-group__item">Virtualisation — VM</span>
          <span class="skill-group__item">Installation &amp; dépannage poste</span>
        </div>
      </div>

      <div class="skill-group" data-reveal>
        <span class="skill-group__label">Réseau</span>
        <div class="skill-group__items">
          <span class="skill-group__item">Configuration DNS</span>
          <span class="skill-group__item">Connexion SSH</span>
          <span class="skill-group__item">Adressage IP (bases)</span>
          <span class="skill-group__item">Diagnostic connectivité</span>
        </div>
      </div>

      <div class="skill-group" data-reveal>
        <span class="skill-group__label">Outils</span>
        <div class="skill-group__items">
          <span class="skill-group__item">Visual Studio</span>
          <span class="skill-group__item">Claude Code</span>
          <span class="skill-group__item">Obsidian</span>
          <span class="skill-group__item">Hébergement web &amp; domaine</span>
        </div>
      </div>

      <div class="skill-group" data-reveal>
        <span class="skill-group__label">Méthode</span>
        <div class="skill-group__items">
          <span class="skill-group__item">Autoformation</span>
          <span class="skill-group__item">Documentation écrite</span>
          <span class="skill-group__item">Recueil du besoin</span>
          <span class="skill-group__item">Travail en équipe</span>
        </div>
      </div>

    </div>
    <p class="skills__note" data-reveal>En cours d'apprentissage : Windows Server et Active Directory, VLAN et routage, supervision. J'avance dessus en autonomie, sur ma VM, et j'attends l'alternance pour les pratiquer sur du réel.</p>
  </section>
```

- [ ] **Step 2 : Ajouter le CSS**

Le `gap: 2px` combiné au `box-shadow: 0 0 0 1px` produit des filets de séparation d'un pixel entre cartes adjacentes. Ne pas remplacer par `border`, le rendu diffèrerait.

```css
/* ---------- Compétences ---------- */
.skills__head { margin-bottom: 50px; }
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2px;
}
.skill-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 28px;
  background: var(--bg-card);
  box-shadow: 0 0 0 1px rgba(35, 32, 27, 0.1);
}
.skill-group__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
}
.skill-group__items { display: flex; flex-direction: column; gap: 10px; }
.skill-group__item {
  font-size: 16px;
  line-height: 1.4;
  color: var(--ink-soft);
}
.skills__note {
  margin: 24px 0 0;
  max-width: 640px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-muted);
}
```

- [ ] **Step 3 : Vérifier les comptes**

```powershell
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
"groupes : " + ([regex]::Matches($new, 'class="skill-group"')).Count + " (attendu 4)"
"items   : " + ([regex]::Matches($new, 'class="skill-group__item"')).Count + " (attendu 16)"
```

Attendu : 4 et 16.

- [ ] **Step 4 : Ouvrir et faire confirmer**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de vérifier que les 4 cartes sont séparées par un filet fin et régulier, sans double trait aux jonctions.

- [ ] **Step 5 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Section Competences : 4 groupes deplies

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 6 : Section Centres d'intérêt et accordéon

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Create: `assets/main.js`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:138-155` (structure), `190-197` (contenu), `188/198-212` (logique)

**Interfaces:**
- Consumes: `.section` (tâche 3)
- Produces: le contrat `[data-interests]` consommé par `main.js` ; la fonction `setupInterests(root)` dans `main.js`, appelée par l'initialisation de la tâche 8.

C'est la seule partie réellement interactive. Le contrat HTML/JS :

- un conteneur `[data-interests]` ;
- N boutons `.interest-btn` avec `aria-expanded` et `aria-controls` ;
- N panneaux `.interest-panel` avec un `id`, masqués par l'attribut `hidden`.

Un seul panneau ouvert à la fois. Recliquer sur le bouton ouvert le referme — c'est le comportement de `openInterest === i ? null : i` dans la source.

- [ ] **Step 1 : Insérer le HTML**

Les 7 libellés et détails sont repris des lignes 190-196. Le détail est placé dans le panneau **dès le HTML** : le contenu reste lisible si le JS ne s'exécute pas.

```html
  <section class="section section--alt" id="a-interets">
    <div class="section__head interests__head" data-reveal>
      <p class="section__eyebrow">04 — Centres d'intérêt</p>
      <h2 class="section__title">En dehors des machines</h2>
    </div>
    <div class="interests" data-interests data-reveal>
      <div class="interests__list">
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-0">Jeux vidéo</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-1">Musique</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-2">Mythologies</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-3">Échecs</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-4">Volley</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-5">Bricolage</button>
        <button class="interest-btn" type="button" aria-expanded="false" aria-controls="interet-6">Jeux de société</button>
      </div>

      <div class="interest-panel" id="interet-0" hidden>
        <span class="interest-panel__label">Jeux vidéo</span>
        <p class="interest-panel__text"><!-- detail ligne 190 --></p>
      </div>
      <!-- panneaux 1 à 6 : même structure, libellés et détails des lignes 191-196 -->
    </div>
    <p class="interests__hint" data-reveal>Clique sur un centre d'intérêt pour en savoir plus.</p>
  </section>
```

Remplacer les repères par les textes de la source. Les 7 panneaux doivent exister.

- [ ] **Step 2 : Créer `assets/main.js` avec `setupInterests`**

`main.js` est créé ici avec sa seule première fonction. Les tâches 8 y ajouteront `setupReveal` et `setupParallax`, puis l'initialisation commune.

```javascript
'use strict';

/**
 * Accordéon des centres d'intérêt.
 * Contrat HTML : un conteneur [data-interests] contenant N boutons
 * .interest-btn (chacun avec aria-controls) et N panneaux .interest-panel
 * portant les id correspondants.
 * Un seul panneau ouvert à la fois ; recliquer sur le bouton ouvert referme.
 */
function setupInterests(root) {
  var buttons = Array.prototype.slice.call(root.querySelectorAll('.interest-btn'));
  if (!buttons.length) return;

  function closeAll() {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('interest-btn--open');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
    });
  }

  closeAll();

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (wasOpen) return;
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('interest-btn--open');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var interests = document.querySelector('[data-interests]');
  if (interests) setupInterests(interests);
});
```

L'appel `closeAll()` initial est délibéré : il garantit l'état fermé même si le HTML était incohérent, et surtout il ne s'exécute que si le JS tourne — sans JS, les panneaux restent tels que le HTML les définit.

- [ ] **Step 3 : Ajouter le CSS**

L'état ouvert reprend les valeurs de `interestList()` (lignes 200-207) : fond `#23201b`, texte `#f5f1e8`, bordure `#23201b`, `translateY(-2px)`.

```css
/* ---------- Centres d'intérêt ---------- */
.interests__head { margin-bottom: 42px; }
.interests__list { display: flex; flex-wrap: wrap; gap: 12px; }
.interest-btn {
  flex: 0 0 auto;
  cursor: pointer;
  padding: 13px 22px;
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.2;
  border-radius: 2px;
  background: var(--bg-card);
  color: var(--ink);
  border: 1px solid rgba(35, 32, 27, 0.14);
  transform: none;
  transition: background 260ms ease, color 260ms ease, border-color 260ms ease,
              transform 260ms cubic-bezier(.16, .8, .28, 1), box-shadow 260ms ease;
}
.interest-btn:hover, .interest-btn:focus-visible {
  transform: translateY(-3px);
  border-color: var(--gold);
  box-shadow: 0 10px 24px -14px rgba(35, 32, 27, 0.5);
}
.interest-btn:active { transform: translateY(0); }
.interest-btn--open {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
  transform: translateY(-2px);
}
.interest-panel {
  margin-top: 22px;
  max-width: 640px;
  padding: 26px 28px;
  background: var(--bg-card);
  border: 1px solid rgba(35, 32, 27, 0.12);
  border-left: 3px solid var(--gold);
  animation: omFadeUp 380ms cubic-bezier(.16, .8, .28, 1) both;
}
.interest-panel[hidden] { display: none; }
.interest-panel__label {
  display: block;
  margin-bottom: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
}
.interest-panel__text {
  margin: 0;
  font-size: 16.5px;
  line-height: 1.72;
  color: var(--ink-body);
  text-wrap: pretty;
}
.interests__hint {
  margin: 26px 0 0;
  max-width: 620px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.06em;
  color: var(--ink-faint);
}
```

La règle `.interest-panel[hidden] { display: none; }` est **obligatoire** : sans elle, `display: block` hérité annulerait l'attribut `hidden` et tous les panneaux resteraient visibles.

- [ ] **Step 4 : Vérifier la cohérence des identifiants**

```powershell
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
$ctrl = [regex]::Matches($new, 'aria-controls="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object
$ids  = [regex]::Matches($new, 'class="interest-panel" id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object
"boutons : $($ctrl.Count) / panneaux : $($ids.Count)"
$diff = Compare-Object $ctrl $ids
if ($diff) { "ECHEC : correspondance rompue"; $diff } else { "OK : 1 panneau par bouton" }
```

Attendu : `7 / 7` et `OK`. Un écart ici produit un bouton qui n'ouvre rien.

- [ ] **Step 5 : Ouvrir et faire confirmer l'interaction**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de vérifier les quatre comportements : cliquer un centre d'intérêt ouvre son panneau ; le bouton passe en foncé et se soulève ; cliquer un second referme le premier ; recliquer le bouton ouvert referme tout.

- [ ] **Step 6 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css assets/main.js
git -C C:\Sites\Portfolio commit -m @'
Section Centres d'interet + accordeon en JS vanilla

Remplace l'etat DCLogic openInterest. Les details sont dans le HTML :
la section reste lisible sans JavaScript.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 7 : Section Contact

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:157-178`

**Interfaces:**
- Consumes: `.section`, `.btn--gold` (tâche 2), `media/cv.pdf` (tâche 1)
- Produces: `.contact*`, `.contact-link*` ; le second `[data-parallax]` de la page

- [ ] **Step 1 : Insérer le HTML**

C'est la dernière section : elle se place juste avant `</main>`.

```html
  <section class="section contact" id="a-contact">
    <div class="contact__deco" data-parallax="0.14"></div>
    <div class="contact__inner">
      <p class="section__eyebrow contact__eyebrow" data-reveal>05 — Contact</p>
      <h2 class="section__title contact__title" data-reveal>Je cherche une alternance de technicien systèmes et réseaux, dès maintenant.</h2>
      <div class="contact__links" data-reveal>
        <a class="contact-link" href="mailto:sadiki.valdon1@gmail.com">
          <span class="contact-link__label">Email</span>
          <span class="contact-link__value">sadiki.valdon1@gmail.com</span>
        </a>
        <a class="contact-link" href="https://www.linkedin.com/in/valdon-sadiki/" target="_blank" rel="noopener">
          <span class="contact-link__label">LinkedIn</span>
          <span class="contact-link__value">/in/valdon-sadiki</span>
        </a>
        <a class="contact-link" href="https://github.com/IRaaa21" target="_blank" rel="noopener">
          <span class="contact-link__label">GitHub</span>
          <span class="contact-link__value">IRaaa21</span>
        </a>
      </div>
      <a class="btn btn--gold" href="media/cv.pdf" download data-reveal>Télécharger mon CV</a>
    </div>
  </section>
```

- [ ] **Step 2 : Ajouter le CSS**

Cette section surcharge `.section__eyebrow` et `.section__title` : sur fond sombre l'or clair remplace l'or, et le titre monte à `clamp(34px, 4vw, 54px)`.

```css
/* ---------- Contact ---------- */
.contact {
  position: relative;
  overflow: hidden;
  padding: 108px 48px;
  background: var(--ink);
  color: var(--on-dark);
}
.contact__deco {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(78deg, rgba(201, 162, 74, 0.1) 0 1px, rgba(201, 162, 74, 0) 1px 24px);
  pointer-events: none;
}
.contact__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 34px;
  max-width: 760px;
}
.contact__eyebrow { color: var(--gold-light); }
.contact__title { font-size: clamp(34px, 4vw, 54px); line-height: 1.08; }
.contact__links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 26px;
  padding-top: 10px;
}
.contact-link {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(240, 235, 223, 0.22);
  transition: border-bottom-color 200ms ease;
}
.contact-link:hover, .contact-link:focus-visible { border-bottom-color: var(--gold-light); }
.contact-link__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-light);
}
.contact-link__value { font-size: 17px; }
```

- [ ] **Step 3 : Vérifier que tous les liens de la source sont présents**

```powershell
$src = Get-Content "C:\Sites\Portfolio\_source\Portfolio Valdon Sadiki.dc.html" -Raw -Encoding utf8
$new = Get-Content "C:\Sites\Portfolio\index.html" -Raw -Encoding utf8
$rx = 'href="(mailto:[^"]+|https?://[^"]+|#[^"]+)"'
$a = [regex]::Matches($src, $rx) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$b = [regex]::Matches($new, $rx) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$manquants = $a | Where-Object { $b -notcontains $_ -and $_ -notlike 'https://fonts*' }
if ($manquants) { "ECHEC : liens manquants"; $manquants } else { "OK : tous les liens de la source sont presents" }
```

Attendu : `OK`. Les URL Google Fonts sont exclues, elles vivent dans le `<head>` et non dans le corps.

- [ ] **Step 4 : Ouvrir et faire confirmer**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** de vérifier le fond sombre à rayures obliques, les trois liens qui passent en or clair au survol, et le bouton CV qui télécharge bien le PDF.

- [ ] **Step 5 : Commit**

```powershell
git -C C:\Sites\Portfolio add index.html assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Section Contact

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 8 : Animations — reveal et parallaxe

**Files:**
- Modify: `assets/main.js`
- Modify: `assets/styles.css`
- Reference: `_source/Portfolio Valdon Sadiki.dc.html:221-258`

**Interfaces:**
- Consumes: `[data-reveal]` et `[data-parallax]`, posés par les tâches 2 à 7 ; `setupInterests(root)` (tâche 6)
- Produces: `setupReveal()` et `setupParallax()`, sans paramètre, opérant sur le document entier

Les deux fonctions sont **reprises de la source**, détachées de la classe `DCLogic` : `this._io` devient une variable locale, `this._onScroll` disparaît (plus de démontage à gérer, la page ne se détruit jamais).

- [ ] **Step 1 : Remplacer le bloc `DOMContentLoaded` de `main.js`**

Retirer le `document.addEventListener('DOMContentLoaded', ...)` écrit en tâche 6 et ajouter en fin de fichier :

```javascript
/**
 * Apparition progressive des éléments [data-reveal] à l'entrée dans le viewport.
 * Repris de setupReveal() de l'artifact d'origine.
 */
function setupReveal() {
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!nodes.length) return;

  function show(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  }

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(show);
    return;
  }

  nodes.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition =
      'opacity 720ms cubic-bezier(.16,.8,.28,1) ' + ((i % 4) * 70) + 'ms, ' +
      'transform 820ms cubic-bezier(.16,.8,.28,1) ' + ((i % 4) * 70) + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  nodes.forEach(function (el) { io.observe(el); });

  setTimeout(function () {
    nodes.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    });
  }, 400);
}

/**
 * Parallaxe des couches décoratives [data-parallax].
 * Repris de setupParallax() de l'artifact d'origine.
 */
function setupParallax() {
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!layers.length) return;

  var queued = false;

  function apply() {
    queued = false;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      var r = el.parentElement.getBoundingClientRect();
      var progress = (vh - r.top) / (vh + r.height);
      el.style.transform = 'translate3d(0,' + ((progress - 0.5) * speed * 220).toFixed(2) + 'px,0)';
    });
  }

  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(apply); }
  }, { passive: true });

  apply();
}

document.addEventListener('DOMContentLoaded', function () {
  var interests = document.querySelector('[data-interests]');
  if (interests) setupInterests(interests);
  setupReveal();
  setupParallax();
});
```

- [ ] **Step 2 : Ajouter le garde-fou d'accessibilité au CSS**

L'artifact d'origine ne respecte pas `prefers-reduced-motion`. Sur un site de candidature, c'est un défaut à corriger : un visiteur qui a désactivé les animations dans son système ne doit pas subir la parallaxe.

```css
/* ---------- Accessibilité : mouvement réduit ---------- */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
  [data-parallax] { transform: none !important; }
}
```

C'est le second écart assumé avec l'artifact, après les `:hover` CSS. Le rendu par défaut est inchangé.

- [ ] **Step 3 : Vérifier la syntaxe et la structure de `main.js`**

Aucun interpréteur JS n'est disponible en ligne de commande sur ce poste. Vérification structurelle :

```powershell
$js = Get-Content "C:\Sites\Portfolio\assets\main.js" -Raw -Encoding utf8
"fonctions : " + ([regex]::Matches($js, '(?m)^function \w+')).Count + " (attendu 3)"
"DOMContentLoaded : " + ([regex]::Matches($js, 'DOMContentLoaded')).Count + " (attendu 1)"
$open = ([regex]::Matches($js, '\{')).Count; $close = ([regex]::Matches($js, '\}')).Count
if ($open -eq $close) { "accolades equilibrees : $open" } else { "ECHEC : $open ouvrantes / $close fermantes" }
```

Attendu : 3, 1, et accolades équilibrées. Un `DOMContentLoaded` à 2 signifie que celui de la tâche 6 n'a pas été retiré — les centres d'intérêt seraient initialisés deux fois.

- [ ] **Step 4 : Ouvrir et faire confirmer, console comprise**

```powershell
Start-Process C:\Sites\Portfolio\index.html
```

**Demander à l'utilisateur** d'ouvrir la console (F12) et de confirmer **zéro erreur**, puis de vérifier : les blocs apparaissent en fondu montant au défilement, les rayures du hero et du contact se décalent lentement au scroll, et l'accordéon fonctionne toujours.

- [ ] **Step 5 : Commit**

```powershell
git -C C:\Sites\Portfolio add assets/main.js assets/styles.css
git -C C:\Sites\Portfolio commit -m @'
Animations : reveal au scroll et parallaxe, reprises de l'artifact

Ajoute un garde-fou prefers-reduced-motion absent de l'original.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
```

---

## Task 9 : Vérification finale, README et comparaison visuelle

**Files:**
- Create: `README.md`
- Verify: `index.html`, `assets/styles.css`, `assets/main.js`

**Interfaces:**
- Consumes: l'ensemble des tâches précédentes
- Produces: dépôt prêt à être publié sur GitHub Pages

- [ ] **Step 1 : Vérification globale automatisée**

```powershell
$root = "C:\Sites\Portfolio"
$src  = Get-Content "$root\_source\Portfolio Valdon Sadiki.dc.html" -Raw -Encoding utf8
$new  = (Get-Content "$root\index.html" -Raw -Encoding utf8) + (Get-Content "$root\assets\styles.css" -Raw -Encoding utf8) + (Get-Content "$root\assets\main.js" -Raw -Encoding utf8)

"=== 1. Syntaxe DC residuelle ==="
$dc = Select-String -Path "$root\index.html","$root\assets\styles.css","$root\assets\main.js" -Pattern 'sc-for|sc-if|x-dc|style-hover|style-active|\{\{|DCLogic'
if ($dc) { "ECHEC"; $dc } else { "OK" }

"=== 2. Couleurs hexadecimales ==="
$rx = '#[0-9a-fA-F]{6}\b'
$a = [regex]::Matches($src, $rx) | ForEach-Object { $_.Value.ToLower() } | Sort-Object -Unique
$b = [regex]::Matches($new, $rx) | ForEach-Object { $_.Value.ToLower() } | Sort-Object -Unique
$manquantes = $a | Where-Object { $b -notcontains $_ }
if ($manquantes) { "ECHEC : couleurs perdues -> $($manquantes -join ', ')" } else { "OK : $($a.Count) couleurs toutes presentes" }

"=== 3. Valeurs rgba ==="
$rxa = 'rgba\([^)]+\)'
$a2 = [regex]::Matches($src, $rxa) | ForEach-Object { $_.Value -replace '\s','' } | Sort-Object -Unique
$b2 = [regex]::Matches($new, $rxa) | ForEach-Object { $_.Value -replace '\s','' } | Sort-Object -Unique
$m2 = $a2 | Where-Object { $b2 -notcontains $_ }
if ($m2) { "ECHEC : rgba perdus -> $($m2 -join ' | ')" } else { "OK : $($a2.Count) valeurs rgba toutes presentes" }

"=== 4. Polices ==="
# L'URL Google Fonts encode les espaces en '+' ('IBM+Plex+Sans'). On normalise
# avant de chercher, sinon toute police dont le nom comporte un espace et qui
# n'apparait QUE dans le <link> ressort en faux negatif.
$newNorm = $new -replace '\+', ' '
foreach ($f in @('Cormorant Garamond','Karla','IBM Plex Sans','IBM Plex Mono','Spectral')) {
  "{0,-6} {1}" -f $newNorm.Contains($f), $f
}

"=== 5. Chemins absolus interdits ==="
$abs = [regex]::Matches((Get-Content "$root\index.html" -Raw -Encoding utf8), '(src|href)="(/|[A-Za-z]:\\)')
if ($abs.Count -gt 0) { "ECHEC : $($abs.Count) chemin(s) absolu(s)" } else { "OK : chemins relatifs uniquement" }

"=== 6. Fichier .nojekyll interdit ==="
if (Test-Path "$root\.nojekyll") { "ECHEC : .nojekyll present, _source/ serait publie" } else { "OK : absent" }
```

Attendu : `OK` aux points 1, 2, 3, 5, 6, et `True` sur les cinq polices. Spectral est chargée par la source sans être utilisée : elle doit rester dans le `<link>` pour que l'ensemble des polices demandées soit identique.

Tout `ECHEC` se corrige avant de poursuivre.

- [ ] **Step 2 : Écrire le `README.md`**

```markdown
# Portfolio alternance — Valdon Sadiki

Portfolio de candidature pour une alternance de technicien systèmes et réseaux
(BTS SIO SISR, Strasbourg).

## Stack

HTML5, CSS3 et JavaScript vanilla. Aucun framework, aucune dépendance, aucun
build step. Le site s'ouvre par simple double-clic sur `index.html`.

## Structure

| Chemin | Rôle |
|---|---|
| `index.html` | Page complète — tout le contenu est écrit en dur |
| `assets/styles.css` | Styles, palette en variables CSS, nommage BEM |
| `assets/main.js` | Accordéon, apparitions au défilement, parallaxe |
| `media/` | CV et photo |
| `_source/` | Artifact Claude d'origine, archivé, **non publié** |
| `docs/superpowers/` | Spécification et plan d'implémentation |

`_source/` commence par un underscore : GitHub Pages (Jekyll) l'exclut
automatiquement du site publié. **Ne pas ajouter de fichier `.nojekyll`**, qui
annulerait cette exclusion.

## Modifier le contenu

Tout le texte est dans `index.html`. Ajouter un projet consiste à dupliquer un
bloc `<article class="project">` et à en remplacer le contenu.

## Déploiement

GitHub Pages, branche `main`, dossier racine. Un `git push` suffit à publier.

## À faire avant publication

- [ ] Remplir ou retirer les encadrés « à compléter » des 5 projets — ils sont
      visibles publiquement en l'état.
- [ ] Décider si `media/cv.pdf` doit être public : il contient des données
      personnelles (adresse, téléphone).
```

- [ ] **Step 3 : Comparaison visuelle finale — par l'utilisateur**

```powershell
Start-Process "C:\Sites\Portfolio\_source\Portfolio Valdon Sadiki.dc.html"
Start-Process "C:\Sites\Portfolio\index.html"
```

**L'agent ne peut pas voir le rendu et ne doit jamais affirmer l'avoir vérifié.**
Demander à l'utilisateur de parcourir cette liste sur les deux onglets, à **1440 px, 768 px et 375 px** (F12 → mode responsive) :

| # | À vérifier |
|---|---|
| 1 | Navigation collante, translucide, floutée au défilement |
| 2 | Hero : dégradé, rayures obliques en haut à droite, halo en bas à gauche |
| 3 | Les 4 ancres de navigation atteignent la bonne section |
| 4 | À propos : cadrage de la photo, passage en une colonne en étroit |
| 5 | Les 5 projets : bordure gauche dorée, brune au survol |
| 6 | Étiquettes de technologies jamais coupées sur deux lignes |
| 7 | Les 5 encadrés « à compléter » en pointillés |
| 8 | Compétences : 4 cartes, filet d'un pixel entre elles |
| 9 | Accordéon : ouverture, bascule, fermeture |
| 10 | Contact : fond sombre à rayures, survols en or clair |
| 11 | Les 2 boutons CV téléchargent le PDF |
| 12 | Apparitions au défilement et parallaxe |
| 13 | Console (F12) : aucune erreur |

Si un point diffère, le corriger avant de clore la tâche.

- [ ] **Step 4 : Commit**

```powershell
git -C C:\Sites\Portfolio add README.md
git -C C:\Sites\Portfolio commit -m @'
README : structure du depot, deploiement, verrous avant publication

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
'@
git -C C:\Sites\Portfolio log --oneline
```

---

## Hors périmètre de ce plan

Ces trois points sont volontairement exclus et feront l'objet de décisions séparées :

1. **Création du dépôt GitHub distant et activation de Pages.** Suppose une décision sur le caractère public du dépôt et donc du CV.
2. **Remplissage des encadrés « à compléter ».** Nécessite des informations que seul l'utilisateur détient (captures, URL, liens de dépôts, durées).
3. **Entrée dans `90_Boites_entree/Claude`.** Déposée en fin de session, décrivant le projet, ses décisions figées et ses verrous, et le distinguant explicitement d'Aurorys.
