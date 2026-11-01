#!/bin/bash
# Publie les nouveaux médias (vidéos/audios) en une seule commande, depuis le Mac :
#
#   npm run publier-medias
#
# 1. Compresse les nouveaux fichiers du dossier source (scripts/build-media.mjs)
#    et met à jour la liste des médias du site (media-manifest.generated.ts).
# 2. Envoie chez o2switch, par FTPS (certificat vérifié), les médias compressés
#    qui n'y sont pas encore. Rien n'est jamais supprimé ni écrasé sur le serveur.
# 3. Enregistre et envoie la liste des médias sur GitHub, ce qui déclenche la
#    mise en ligne automatique du site.
#
# Prérequis (une seule fois) : brew install node ffmpeg lftp
# Le mot de passe FTP est demandé au premier lancement puis rangé dans le
# trousseau du Mac (jamais dans le projet).

set -euo pipefail

FTP_HOST="casoar.o2switch.net"
FTP_USER="deploy@musique-en-ligne.ch"
KEYCHAIN_SERVICE="musique-en-ligne-ftp"
MANIFEST="src/data/media-manifest.generated.ts"

cd "$(dirname "$0")/.."

etape() { printf '\n\033[1;34m▶ %s\033[0m\n' "$1"; }
erreur() { printf '\n\033[1;31m✖ %s\033[0m\n' "$1" >&2; exit 1; }
ok() { printf '\033[1;32m✔ %s\033[0m\n' "$1"; }

# --- Vérifications -----------------------------------------------------------
etape "Vérifications"
for outil in node ffmpeg lftp git openssl curl security; do
  command -v "$outil" >/dev/null 2>&1 || erreur "« $outil » est introuvable. Installez-le : brew install node ffmpeg lftp"
done

branche=$(git rev-parse --abbrev-ref HEAD)
[ "$branche" = "main" ] || erreur "Vous êtes sur la branche « $branche ». Passez sur « main » dans GitHub Desktop (Current Branch), puis relancez."

nb_existants=$(find public/media -type f \( -name '*.mp4' -o -name '*.mp3' \) 2>/dev/null | wc -l | tr -d ' ')
if [ "$nb_existants" -lt 10 ] && [ "${FORCER:-}" != "1" ]; then
  erreur "Le dossier public/media est vide ou presque ($nb_existants fichiers).
  Copiez-y d'abord le dossier public/media de votre ancien dossier de projet,
  sinon TOUTES les vidéos seraient recompressées (plusieurs heures).
  (Pour forcer quand même : FORCER=1 npm run publier-medias)"
fi
ok "Outils présents, branche main, $nb_existants médias déjà compressés"

# Récupère d'éventuelles modifications faites ailleurs (par ex. par Claude).
GIT_TERMINAL_PROMPT=0 git pull --ff-only --quiet origin main \
  || erreur "Impossible de mettre à jour depuis GitHub. Faites « Fetch/Pull origin » dans GitHub Desktop, puis relancez."

# --- Mot de passe FTP (trousseau du Mac) -------------------------------------
if ! FTP_PASSWORD=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -a "$FTP_USER" -w 2>/dev/null); then
  etape "Premier lancement : enregistrement du mot de passe FTP dans le trousseau"
  echo "Tapez le mot de passe du compte FTP $FTP_USER (rien ne s'affiche, c'est normal) :"
  security add-generic-password -s "$KEYCHAIN_SERVICE" -a "$FTP_USER" -w
  FTP_PASSWORD=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -a "$FTP_USER" -w)
  ok "Mot de passe enregistré"
fi

# --- 1. Compression ----------------------------------------------------------
etape "1/3 Compression des nouveaux médias"
node scripts/build-media.mjs

# --- 2. Envoi chez o2switch --------------------------------------------------
etape "2/3 Envoi des nouveaux médias chez o2switch"

# Le serveur n'envoie pas ses certificats intermédiaires Let's Encrypt : on les
# télécharge depuis l'adresse officielle inscrite dans le certificat, puis on
# vérifie que la chaîne remonte bien à une autorité de confiance.
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
for f in /etc/ssl/cert.pem "$(brew --prefix 2>/dev/null)/etc/ca-certificates/cert.pem" /etc/ssl/certs/ca-certificates.crt; do
  if [ -s "$f" ]; then cp "$f" "$tmp/ca.pem"; break; fi
done
[ -s "$tmp/ca.pem" ] || erreur "Magasin de certificats introuvable sur ce Mac."

echo | openssl s_client -starttls ftp -connect "$FTP_HOST:21" -servername "$FTP_HOST" 2>/dev/null \
  | openssl x509 > "$tmp/leaf.pem" || erreur "Impossible de joindre le serveur FTP $FTP_HOST."
cur="$tmp/leaf.pem"
for i in 1 2 3; do
  openssl verify -CAfile "$tmp/ca.pem" "$tmp/leaf.pem" >/dev/null 2>&1 && break
  url=$(openssl x509 -in "$cur" -noout -text | sed -n 's/.*CA Issuers - URI:\(.*\)/\1/p' | head -1)
  [ -n "$url" ] || break
  curl -fsSL "$url" -o "$tmp/up.der"
  openssl x509 -inform der -in "$tmp/up.der" -out "$tmp/up$i.pem" 2>/dev/null || cp "$tmp/up.der" "$tmp/up$i.pem"
  cat "$tmp/up$i.pem" >> "$tmp/ca.pem"
  cur="$tmp/up$i.pem"
done
openssl verify -CAfile "$tmp/ca.pem" "$tmp/leaf.pem" >/dev/null 2>&1 \
  || erreur "Le certificat du serveur FTP n'a pas pu être vérifié. Envoi annulé."

# --only-missing : n'envoie que les fichiers absents du serveur (rien n'est écrasé ni supprimé).
LFTP_PASSWORD="$FTP_PASSWORD" lftp --env-password -u "$FTP_USER" "$FTP_HOST" -e "
  set ssl:ca-file $tmp/ca.pem;
  set ssl:verify-certificate true;
  set ftp:ssl-force true;
  set ftp:ssl-protect-data true;
  set net:max-retries 3;
  set net:timeout 30;
  mirror --reverse --only-missing --verbose --parallel=3 public/media media;
  bye"
ok "Médias envoyés"

# --- 3. Mise en ligne de la liste des médias ---------------------------------
etape "3/3 Mise en ligne de la liste des médias"
if git diff --quiet -- "$MANIFEST"; then
  ok "Aucun nouveau média dans la liste : rien à publier."
  exit 0
fi

git add -- "$MANIFEST"
git commit --quiet -m "Ajout de nouveaux médias" -- "$MANIFEST"
if GIT_TERMINAL_PROMPT=0 git push --quiet origin main 2>/dev/null; then
  ok "Publié sur GitHub : le site sera à jour dans 1 à 2 minutes."
else
  printf '\n\033[1;33m! Dernière étape à faire dans GitHub Desktop : cliquez « Push origin ».\033[0m\n'
  echo "  (Le site sera ensuite à jour dans 1 à 2 minutes.)"
fi
