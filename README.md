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
