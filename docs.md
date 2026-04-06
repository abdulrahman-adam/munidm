# 1. Préparer tous les fichiers modifiés
git add .

# 2. Enregistrer les modifications avec un message pro
git commit -m "feat(navbar): improve UI and responsiveness"

# 3. Envoyer le code sur GitHub (branche main)
git push origin main

# Aller dans le dossier
cd /var/www/munidm

# Récupérer le dernier code depuis GitHub
git pull origin main

# En cas de conflit (si vous avez modifié des fichiers sur le serveur)
git reset --hard origin/main



# Tout reconstruire et lancer en arrière-plan (recommandé)
docker compose up --build -d

# Forcer la reconstruction SANS utiliser le cache (si le code ne change pas)
docker compose build --no-cache
docker compose up -d

# Arrêter tous les services
docker compose down

# Voir si les conteneurs tournent (et leurs ports)
docker compose ps

# Voir les erreurs d'un service spécifique (ex: nginx ou server)
docker compose logs -f nginx

# Supprimer les images inutilisées (libère de l'espace)
docker image prune -f

# Nettoyage complet (Images, réseaux et cache de build)
docker system prune -a --volumes -f