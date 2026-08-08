# Portfolio alternance — conversion en site statique déployable

**Date :** 2026-08-07
**Dépôt :** `portfolio-alternance` (racine locale `C:\Sites\Portfolio`)
**Statut :** design validé, implémentation à planifier

---

## 1. Contexte

Le portfolio de candidature en alternance (BTS SIO SISR, Valdon Sadiki, Strasbourg)
existe aujourd'hui sous la forme d'un **artifact Claude exporté** :
`Portfolio web alternance SIO SISR/Portfolio Valdon Sadiki.dc.html` (327 lignes)
accompagné de `support.js` (69 Ko, runtime `dc-runtime` généré, en-tête « do not edit »).

Ce format n'est pas du HTML standard. Il dépend d'un runtime propriétaire et n'est
donc ni portable, ni déployable de façon durable. L'objectif est de le convertir en
site statique standard **au rendu visuel identique**, versionné et hébergeable
gratuitement.

Ce projet est **distinct d'Aurorys** (`40_Projets/Actifs/Aurorys`), qui est un
portfolio freelance en Next.js / Prisma. Les deux ne doivent pas être confondus.

## 2. Objectifs

1. Rendu visuel identique à l'artifact actuel.
2. Aucune dépendance à un runtime propriétaire.
3. Hébergement gratuit avec HTTPS.
4. Versionné dans un dépôt Git dédié.
5. Décrit par une fiche projet dans le vault de mémoire partagée.

## 3. Non-objectifs

- Refonte graphique, réécriture de contenu, ajout de sections.
- Toute forme de build step ou de dépendance Node (Node n'est pas installé sur le poste).
- Complétion des contenus manquants (encadrés « à compléter ») — traitée séparément.
- Mise en ligne effective — elle est conditionnée aux verrous de la section 10.

## 4. Ce que le runtime DC apporte, et son remplacement

Analyse complète du fichier source. Le rendu repose **entièrement sur des styles
inline** ; `support.js` ne fournit aucun style. Quatre mécanismes seulement sont à
remplacer, tous mécaniquement :

| Mécanisme DC | Occurrences | Remplacement |
|---|---|---|
| `<sc-for list as>` | 5 (projets, tools, skills, skill items, interests) | HTML répété, écrit en dur |
| `<sc-if value>` | 1 (panneau de détail du centre d'intérêt) | attribut `hidden` piloté en JS |
| `style-hover` / `style-active` | 13 (12 + 1) | vraies règles CSS `:hover` / `:active` |
| `DCLogic` + `state` + `setState` | 1 (accordéon `openInterest`) | ~25 lignes de JS vanilla |

`setupReveal()` (IntersectionObserver) et `setupParallax()` (rAF sur scroll) sont
**déjà du JavaScript standard** dans le fichier source : ils sont repris tels quels,
détachés de la classe `DCLogic`.

Le prop `cvHref` (déclaré dans `data-props`, valeur par défaut
`uploads/cv-1786031691808.pdf`) devient un chemin en dur vers `media/cv.pdf`.

## 5. Architecture cible

```
C:\Sites\Portfolio\
├─ index.html            page complète, HTML standard
├─ assets/
│  ├─ styles.css         tous les styles, palette en variables CSS
│  └─ main.js            accordéon + reveal + parallax
├─ media/
│  ├─ cv.pdf             (depuis uploads/cv-1786031691808.pdf)
│  └─ photo-pro.jpg      (depuis uploads/Photo Pro.png, 2,0 Mo → JPEG < 300 Ko)
├─ _source/              archive non publiée, référence de comparaison
│  ├─ Portfolio Valdon Sadiki.dc.html
│  ├─ support.js
│  ├─ .thumbnail
│  └─ uploads/           CONSERVÉ INTACT — l'artifact le référence en relatif
│     ├─ cv-1786031691808.pdf
│     ├─ Photo Pro.png
│     └─ Portfolio.txt   fiches projets détaillées (source de contenu)
├─ _docs/superpowers/specs/
├─ .gitignore
└─ README.md
```

Le préfixe `_` de `_source/` est fonctionnel : GitHub Pages (Jekyll) exclut
automatiquement du site publié les dossiers commençant par un underscore.
**Conséquence :** ne pas ajouter de fichier `.nojekyll`, qui annulerait cette
exclusion et publierait l'archive.

### Découpage des unités

- **`index.html`** — structure et contenu. Ne dépend de rien. Lisible et complet seul.
- **`assets/styles.css`** — présentation. Dépend des noms de classes d'`index.html`.
- **`assets/main.js`** — enrichissement comportemental. Dépend de trois contrats
  explicites dans le HTML : `[data-reveal]`, `[data-parallax]`, et le bloc
  `[data-interests]`. Chacun est indépendant des deux autres et échoue isolément.

## 6. Décision : contenu en HTML écrit en dur

Le texte des 5 projets et des 4 blocs de compétences est **écrit en dur dans
`index.html`**, et non généré depuis un fichier de données.

**Raison :** sur un portfolio de candidature, la robustesse prime sur le confort
d'édition. Si le JavaScript ne s'exécute pas (réseau d'entreprise restrictif,
bloqueur, erreur), la page reste intégralement lisible ; seules les animations sont
perdues. Une génération en JS produirait une page vide dans le même scénario. Le
contenu est également présent dans la source pour l'indexation.

**Coût accepté :** ajouter un projet impose de dupliquer un bloc HTML.

Les 7 centres d'intérêt font exception partielle : leurs libellés et détails sont
dans le HTML (dans des éléments masqués), le JS ne fait que basculer l'affichage.

## 7. Fidélité du rendu

Les valeurs de style sont reprises à l'identique, sans réinterprétation :

- Palette : `#f5f1e8` (fond), `#f7f4ec` (cartes), `#efe9dc` (sections alternées),
  `#23201b` (texte / pied de page), `#9a7b33` (or), `#c9a24a` (or clair),
  `#6d6455` et `#443f36` (texte secondaire).
- Typographies Google : Cormorant Garamond, Karla, Spectral, IBM Plex Sans,
  IBM Plex Mono — `preconnect` et `link` conservés à l'identique.
- Keyframe `omFadeUp`, `::selection`, `scroll-behavior: smooth` conservés.

**Écarts assumés :**

- Les `style-hover` deviennent des `:hover` CSS réels. Le comportement devient
  plus correct qu'aujourd'hui (le survol fonctionnera aussi au clavier via
  `:focus-visible`).
- Un bloc `@media (prefers-reduced-motion: reduce)` a été ajouté ; l'artifact
  n'en a aucun. Accessibilité, aucun changement de rendu par défaut.
- `.btn`, `.project` et `.contact-link` portent des `transition` de `200ms`
  (background/couleur/bordure selon les cas) que l'artifact n'a pas — il
  applique ses survols instantanément via `style-hover`. Ajoutées en
  accompagnement de la conversion `style-hover` → `:hover` ci-dessus, pour que
  le nouvel état `:hover` ne s'affiche pas de façon abrupte. La transition de
  `260ms` sur `.interest-btn`, elle, existe déjà dans l'artifact et est
  reproduite à l'identique, sans changement.

### Vérification

Le poste n'a **ni serveur local, ni navigateur automatisable** : Node, PHP et npx
sont absents, et le `python.exe` présent dans le `PATH` est le raccourci Microsoft
Store, qui ne s'exécute pas. Le site doit donc s'ouvrir en `file://` par double-clic,
ce qui impose des chemins relatifs partout.

La vérification est à deux niveaux. **Automatique** (exécutable par l'agent) :
absence de syntaxe DC résiduelle, égalité des ensembles de couleurs, de valeurs
`rgba`, de polices et de liens entre source et cible. **Humaine** : la comparaison
visuelle revient à l'utilisateur — l'agent ne voit pas le rendu et ne doit jamais
affirmer l'avoir vérifié.

Comparaison visuelle des deux versions côte à côte à **1440 px, 768 px et 375 px**,
plus vérification manuelle de : accordéon des centres d'intérêt (ouverture,
fermeture, bascule entre deux items), apparitions au scroll, parallaxe des quatre
couches décoratives, ancres de navigation, lien de téléchargement du CV, lien mailto.

## 8. Git

Dépôt initialisé sur `main`. Historique en deux temps :

1. **Commit de référence** — l'artifact exporté, sans aucune modification (fait :
   `5751c65`). Permet de lire la conversion comme un diff réel.
2. **Commits de conversion** par-dessus.

## 9. Déploiement

GitHub Pages, branche `main`, dossier racine. Gratuit, HTTPS inclus, nom de domaine
personnalisé possible ultérieurement. Le déploiement se fait par `git push`.

## 10. Verrous avant mise en ligne publique

Ces deux points ne bloquent pas la conversion, mais **doivent être levés
explicitement avant de rendre le site public** :

1. **Encadrés « à compléter »** — les 5 projets affichent sur la page un encadré
   listant les informations manquantes (captures, liens GitHub, URLs, durées).
   Décision prise : les conserver tels quels pour l'instant, les remplir plus tard.
   Un recruteur les verrait en l'état.
2. **CV public** — publier `media/cv.pdf` sur GitHub Pages rend accessibles les
   données personnelles qu'il contient (adresse, téléphone). À décider sciemment.

## 11. Vault de mémoire partagée

Une entrée sera déposée dans `90_Boites_entree/Claude` en fin de session, destinée à
devenir `40_Projets/Actifs/Portfolio alternance/Projet.md` après consolidation. Elle
couvrira : emplacement, stack, décisions figées (sections 5, 6, 7), verrous ouverts
(section 10), et la **distinction explicite d'avec Aurorys**.

Le serveur de mémoire n'expose qu'une écriture en boîte d'entrée ; les fiches
canoniques relèvent du processus de consolidation, conformément à `Accueil_IA.md`.
