# Portfolio alternance de Valdon Sadiki

Portfolio de candidature pour une alternance de technicien systèmes et réseaux
(BTS SIO SISR, Strasbourg).

## Stack

HTML5, CSS3 et JavaScript vanilla. Aucun framework, aucune dépendance, aucun
build step. Le site s'ouvre par simple double-clic sur `index.html`.

## Structure

| Chemin | Rôle |
|---|---|
| `index.html` | Page complète : tout le contenu est écrit en dur |
| `assets/styles.css` | Styles, palette en variables CSS, nommage BEM |
| `assets/main.js` | Accordéon, apparitions au défilement, parallaxe |
| `media/` | CV, photo et captures des projets |
| `_source/` | Artifact Claude d'origine, archivé, **non publié par le site** |
| `_docs/superpowers/` | Spécification et plan d'implémentation |

`_source/` et `_docs/` commencent par un underscore : GitHub Pages (Jekyll) les
exclut automatiquement du site publié. **Ne pas ajouter de fichier `.nojekyll`**,
qui annulerait cette exclusion.

## Modifier le contenu

Tout le texte est dans `index.html`. Ajouter un projet consiste à dupliquer un
bloc `<article class="project">` et à en remplacer le contenu.

## Déploiement

En ligne sur **https://valdon-sadiki.github.io/**, via GitHub Pages depuis la
branche `main`, dossier racine. Chaque `git push` vers `main` republie le site
automatiquement, en une à deux minutes.

Le dépôt est `valdon-sadiki/valdon-sadiki.github.io`. Pour un site utilisateur,
le nom du dépôt doit être exactement `<pseudo>.github.io` : renommer le compte
impose de renommer le dépôt dans la foulée, sinon Pages bascule le site en
« page de projet » servie sous un sous-chemin.

Le dépôt est **public**, car GitHub Pages gratuit ne fonctionne pas sur un
dépôt privé. Tout fichier suivi par git est donc lisible sur github.com, y compris
ceux que Jekyll exclut du site publié (voir « À faire avant publication »).

## Contenu encore à fournir

Ces informations manquaient et étaient jusqu'ici signalées par des encadrés
« à compléter » affichés sur la page. Les encadrés ont été retirés : la liste
vit désormais ici, et nulle part sur le site public.

| Projet | Ce qui manque |
|---|---|
| 01 Panny's Kitchen | lien du dépôt GitHub |
| 02 Auto-formation Linux | la liste des services installés au fil du labo |
| 03 Mémoire persistante | un exemple chiffré de gain de temps |
| 04 SDK Lavage Pro | période d'activité, volume de devis traités |
| 05 FL Perf | durée du projet, nombre de versions |

Le projet 02 a longtemps été le moins parlant des cinq alors qu'il est le plus
proche de la cible SISR : ses deux captures montraient seulement que la VM
existait. Il montre désormais une session SSH ouverte depuis Windows, le service
actif et activé au démarrage, et une résolution DNS servie par dnsmasq. La suite
du labo reste à documenter au fil des cours.

## À faire avant publication

- [ ] Décider si `media/cv.pdf` doit être public : il contient des données
      personnelles (adresse, téléphone). Deux versions sont suivies par git :
      `media/cv.pdf`, celle que sert le bouton de téléchargement, et
      `_source/uploads/cv-1786031691808.pdf`, une version antérieure archivée.
      Les deux doivent être arbitrées ensemble : la règle Jekyll rend `_source/`
      non publié **par le site**, mais GitHub Pages gratuit exige un dépôt
      public, donc l'archive reste lisible sur github.com quelle que soit cette
      règle.
