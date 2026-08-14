# 410-3T3-RO : Atelier de présentation orale

Source du site public du cours, publié par GitHub Pages.

Le matériel de travail réside dans `CEGEP/Cours/410-3T3-RO Atelier présentation
orale/`, dépôt privé distinct. Les fichiers destinés au site y sont copiés
explicitement, un à un. Ce dépôt-ci n'est jamais une copie du dossier de travail.

## Fonctionnement de la publication

GitHub Pages construit le site directement à partir de la branche `main` et de la
racine du dépôt. Il n'existe ni flux de travail GitHub Actions, ni construction
locale obligatoire.

Lorsqu'une version de `main` est envoyée sur GitHub :

1. GitHub Pages lance Jekyll
2. Jekyll lit `_config.yml` et charge le thème distant Just the Docs
3. les fichiers Markdown sont transformés en pages HTML
4. les fichiers HTML des diaporamas sont recopiés tels quels
5. le site est mis à jour à l'adresse
   `https://jsportugais.github.io/410-3T3-RO/`

La mise en ligne prend habituellement environ une minute. La copie locale n'est
pas synchronisée automatiquement avec GitHub. Un fichier modifié sur le disque
n'apparaît donc pas sur le site avant son enregistrement dans Git et sa
publication.

## Organisation du dépôt

```text
410-3T3-RO/
├── index.md                  Page d'accueil
├── seances/
│   ├── index.md              Page principale des séances
│   └── seance-01.md          Page de la séance 1
├── evaluations/
│   ├── index.md              Page principale des évaluations
│   └── evaluation-01.md      Consignes du brise-glace
├── diapos/                   Diaporamas HTML publiés tels quels
├── assets/                   Polices et fichiers de reveal.js
├── _includes/                Personnalisations HTML du thème
├── _sass/                    Apparence visuelle du site
├── _config.yml               Configuration de Jekyll
└── README.md                 Documentation du dépôt
```

Les dossiers commençant par un tiret bas ont un rôle réservé dans Jekyll. Ils
doivent demeurer à la racine. Les pages `seances/index.md` et
`evaluations/index.md` possèdent un permalien, de sorte que leur déplacement dans
leur dossier respectif ne change pas leurs adresses publiques.

## Vérifications avant une publication

Avant de publier :

1. vérifier que la branche locale `main` correspond à `origin/main`
2. examiner tous les fichiers modifiés et confirmer qu'ils sont destinés au site
   public
3. confirmer l'absence de renseignements personnels et de matériel réservé à Léa
4. vérifier les différences Git et les erreurs de mise en forme
5. modifier le commit de publication selon les règles de `C:\Users\jeans\Sites\CLAUDE.md`
6. envoyer le commit avec `--force-with-lease`
7. attendre la fin de la construction GitHub Pages et vérifier la page publique

Si `main` est en retard sur `origin/main`, il faut préserver les modifications
locales avant de mettre la branche à jour. Il ne faut pas lancer une récupération
automatique au-dessus de fichiers modifiés sans avoir d'abord comparé les deux
versions.
