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
dépôt privé. Tout fichier suivi par git est donc lisible sur github.com, y
compris ceux que Jekyll exclut du site publié (voir « CV : décision prise »).

## Contenu encore à fournir

Ces informations manquaient et étaient jusqu'ici signalées par des encadrés
« à compléter » affichés sur la page. Les encadrés ont été retirés : la liste
vit désormais ici, et nulle part sur le site public.

| Projet | Ce qui manque |
|---|---|
| 02 Auto-formation Linux | la liste des services installés au fil du labo |

Le chiffre du projet 03 a été fourni le 8 août 2026 : il vient des compteurs de
tokens des transcrits de session, dans `~/.claude/projects/c--Sites-Portfolio/`.
Contexte relu au démarrage d'une session, 490 000 tokens en reprenant un fil
accumulé contre 32 000 avec un briefing du coffre, socle technique compris.

Trois demandes ont été écartées le 8 août 2026, et ne sont donc pas à reproposer :
le lien du dépôt GitHub de Panny's Kitchen, la période d'activité et le volume de
devis de SDK Lavage Pro, la durée et le nombre de versions de FL Perf.

Les captures du projet 01 ont été remplacées le 9 août 2026 par celles de la
version 3 de l'application, qui n'est plus un moteur de cuisine seul mais une
application d'organisation familiale. Trois écrans sont retenus : l'accueil et
ses huit espaces, le stock, la liste de courses par rayon. Les captures du
calendrier et des tâches partagées ont été écartées le 9 août 2026, pour tenir
sur une seule rangée de vignettes et parce que la grille de l'accueil montre
déjà ces deux modules et leurs compteurs. Ne pas les reproposer. Les deux
captures défilantes, accueil et courses, sont
recadrées au format d'un écran de téléphone : sans cela leurs vignettes
s'affichent en bandes bien plus étroites que les autres, la règle CSS fixant la
hauteur et laissant la largeur suivre le ratio. Le bas de la capture Courses
contenait des articles de test à ne pas publier, la coupe sous la section
Boissons les écarte : ne pas remettre la capture entière.

Le cadrage du texte a suivi le même jour. Le projet 01 s'annonçait comme une
« application de gestion culinaire » ; il est désormais présenté comme une
application de gestion du foyer, la cuisine restant le fil conducteur et
l'origine du projet. La question est tranchée, inutile de revenir à un titre
uniquement culinaire.

Le projet 02 a longtemps été le moins parlant des cinq alors qu'il est le plus
proche de la cible SISR : ses deux captures montraient seulement que la VM
existait. Il montre désormais une session SSH ouverte depuis Windows, le service
actif et activé au démarrage, et une résolution DNS servie par dnsmasq. La suite
du labo reste à documenter au fil des cours.

## CV : décision prise

Le 8 août 2026, le CV reste **public** et téléchargeable. Il ne comporte pas
d'adresse postale, seulement la ville et un numéro de téléphone, ce qui est le
niveau d'exposition attendu d'un CV que l'on diffuse à des recruteurs. La
question est tranchée, inutile de la rouvrir.

Deux versions sont suivies par git : `media/cv.pdf`, celle que sert le bouton de
téléchargement, et `_source/uploads/cv-1786031691808.pdf`, une version
antérieure archivée. La règle Jekyll rend `_source/` non publié **par le site**,
mais GitHub Pages gratuit exige un dépôt public : l'archive reste donc lisible
sur github.com. À supprimer du suivi git le jour où cette ancienne version n'a
plus d'intérêt.
