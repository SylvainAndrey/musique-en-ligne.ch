# Musique en ligne — musique-en-ligne.ch

Site pédagogique pour l'enseignement de la musique aux classes de 9H, 10H et 11H
(Suisse), avec vidéos/audios classés par thème et exercices interactifs corrigés
en direct dans le navigateur. Construit avec [Astro](https://astro.build) et
compilé en fichiers 100% statiques (HTML/CSS/JS) — aucun serveur applicatif
n'est nécessaire pour l'héberger.

## Structure du projet

```
src/
  data/
    types.ts                       Types TypeScript du contenu (ThemeContent, ExerciseDef...)
    media-manifest.generated.ts    Généré par scripts/build-media.mjs — ne pas éditer à la main
    themes/
      9h/ 10h/ 11h/*.ts            Un fichier par thème (intro, médias, exercices)
      index.ts                     Agrège tous les thèmes (import.meta.glob)
  components/                      Header, Footer, ThemeCard, MediaGallery, ExerciseCard
  layouts/BaseLayout.astro
  pages/
    index.astro                   Accueil
    [grade]/index.astro           Page de degré (9H / 10H / 11H)
    [grade]/[theme]/index.astro   Page de thème (médias + exercices)
    a-propos/*.astro
  scripts/
    progress.ts                   Progression élève (localStorage, aucun serveur)
    audio.ts                      Métronome / clics (Web Audio API)
    exercises/                    Un moteur par type d'exercice interactif (Web Components)
scripts/
  build-media.mjs                 Compresse les vidéos/audios sources et génère le manifeste
public/media/                     Médias compressés (générés, volumineux — voir .gitignore)
```

Le contenu source original (PDF, docx, vidéos brutes) reste dans
`E:\www.musique-en-ligne.ch\` et n'est jamais modifié : ce projet ne fait que
le lire pour générer les données et les médias du site.

## Développement local

Prérequis : Node.js LTS et ffmpeg (installés via `winget install OpenJS.NodeJS.LTS`
et `winget install Gyan.FFmpeg`).

```sh
npm install
npm run dev        # http://localhost:4321
```

## Régénérer les médias compressés

Si les fichiers source (`E:\www.musique-en-ligne.ch`) changent, relancez :

```sh
node scripts/build-media.mjs
```

Ce script écrit d'abord le manifeste (`src/data/media-manifest.generated.ts`),
puis compresse chaque vidéo (H.264, 720p max, CRF 27, audio AAC) et chaque
audio (MP3 128 kbps) dans `public/media/`. Il reprend automatiquement là où
il s'était arrêté (les fichiers déjà générés ne sont pas retraités).

## Build de production

```sh
npm run build
```

Génère un dossier `dist/` contenant uniquement des fichiers statiques
(HTML/CSS/JS + médias). C'est ce dossier qu'il faut déployer.

## Déploiement chez o2switch

1. Dans le tableau de bord cPanel d'o2switch, récupérez les identifiants
   FTP/SFTP (Comptes FTP) ou activez l'accès SSH si besoin. Le Gestionnaire
   de fichiers de cPanel fonctionne aussi pour un dépôt manuel.
2. Connectez-vous avec un client FTP/SFTP (FileZilla, Cyberduck, ou
   `sftp`/`scp` en ligne de commande) au répertoire racine du site —
   généralement `public_html/` (ou `public_html/musique-en-ligne.ch/` si le
   domaine est ajouté comme domaine additionnel/complémentaire — voir la
   section « Domaines » de cPanel).
3. Déposez **tout le contenu** du dossier `dist/` (pas le dossier `dist/`
   lui-même, son contenu) à la racine de l'hébergement. Le dossier
   `public/media` (vidéos/audios compressés) pèse plusieurs Go : prévoyez le
   temps de transfert nécessaire lors du premier dépôt.
4. Aucune configuration serveur particulière n'est nécessaire : c'est un site
   100% statique, servi tel quel par Apache chez o2switch.
5. Le nom de domaine doit être migré depuis Infomaniak vers o2switch (DNS +
   hébergement), et la boîte mail `sylvain.andrey@musique-en-ligne.ch`
   (utilisée par le formulaire de contact de la page « À propos ») doit être
   créée depuis cPanel avant que ce formulaire ne soit réellement utilisable.
   Une fois ces deux étapes faites, le site est accessible directement sur
   `https://www.musique-en-ligne.ch`.

Pour republier après une modification : refaites `npm run build` puis
renvoyez le contenu de `dist/` (écrasez les anciens fichiers).

## Mise en ligne automatique (GitHub Actions)

Le fichier `.github/workflows/deploy.yml` reconstruit et publie le site à
chaque envoi (`git push`) sur la branche `main` :

1. GitHub installe les dépendances et lance `npm run build`.
2. Le contenu de `dist/` est envoyé par FTPS (avec `lftp`, certificat vérifié)
   sur le serveur o2switch `casoar.o2switch.net`, dans
   `/home/qazi4845/musique-en-ligne.ch`. Rien n'est supprimé sur le serveur.

Les médias (`public/media/`, plusieurs Go) ne sont pas sur GitHub : le
déploiement automatique ne les touche jamais. Quand une vidéo ou un audio
change, relancez `node scripts/build-media.mjs` puis envoyez le dossier
`media/` à la main (FileZilla).

Secrets GitHub (Settings > Secrets and variables > Actions) :

- `FTP_USERNAME` : `deploy@musique-en-ligne.ch` (compte FTP créé dans cPanel,
  répertoire `musique-en-ligne.ch`)
- `FTP_PASSWORD` : mot de passe de ce compte

Suivi : onglet « Actions » du dépôt GitHub (le bouton « Run workflow »
permet aussi de relancer une mise en ligne à la main).

## Progression des élèves

Aucune donnée n'est envoyée à un serveur : chaque exercice corrigé enregistre
son résultat dans le `localStorage` du navigateur de l'élève
(`src/scripts/progress.ts`). Si l'élève change d'appareil ou vide son
navigateur, sa progression repart à zéro — c'est un choix assumé pour rester
100% statique, sans compte ni base de données.

## État du contenu

Les 13 thèmes des trois degrés (9H, 10H, 11H) sont entièrement construits et
interactifs — aucun thème n'est plus affiché en carte "bientôt interactif".

## Reste à faire avant la mise en ligne

Ces étapes sont opérationnelles, pas techniques :

- Migrer le nom de domaine `musique-en-ligne.ch` d'Infomaniak vers o2switch.
- Créer la boîte mail `sylvain.andrey@musique-en-ligne.ch` chez o2switch
  (utilisée par le formulaire de contact de la page « À propos »).
- Héberger le site chez o2switch (voir « Déploiement chez o2switch »
  ci-dessus).
