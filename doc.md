# Step 1 — Add DNS record
Step 1 — Add DNS record

# Step 2 Create Nginx configuration
# A- Create a new config file:
sudo nano /etc/nginx/sites-available/db.abdulrahman-adam.com

# B- Paste this:
``
server {
    listen 80;
    server_name db.abdulrahman-adam.com;

    root /usr/share/phpmyadmin;
    index index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
} 

``

# Step 3 Enable the site
``` sudo ln -s /etc/nginx/sites-available/db.abdulrahman-adam.com /etc/nginx/sites-enabled/ ```

# Step 4 Test Nginx and restart

sudo nginx -t
sudo systemctl reload nginx



mohaliabdallahllah7@gmail.com
MOHALI12345!!!

https://socgen.taleo.net/careersection/sgcareers/profile.ftl?lang=fr_FR

portal.azure.com/#home

# Build the client Image
 docker build -t munidm/client .

 # Run the client docker
<<<<<<< HEAD
 docker run munidm/client || docker run -p 5173:5173 munidm/client
=======
 docker run munidm/client ||docker run -p 5173:5173 munidm/client
>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62

# Build the server Image
docker build -t munidm/server .
# Run the server docker
docker run munidm/server || docker run -p 3000:3000 munidm/server

 # Redirect
 docker tag munidm/client abdulrahman939291/client:latest
 docker push abdulrahman939291/client:latest

# Redirect
docker tag munidm/server abdulrahman939291/server:latest
docker push abdulrahman939291/server:latest


# aller voir ce qui a changé sur le serveur
git fetch origin

# récupère les derniers changements pour être sûr d'avoir la version la plus récente :
git pull origin dev

# Push to docker
docker push


docker compose build --no-cache

<<<<<<< HEAD
docker build -t munidm/server ./server
docker build -t munidm/client ./client

docker rmi abdulrahman939291/server
docker rmi abdulrahman939291/client


docker tag munidm/server abdulrahman939291/server
docker tag munidm/client abdulrahman939291/client


docker push abdulrahman939291/client
docker push abdulrahman939291/server


docker run -p 3001:3000 munidm/server
=======


# Delete
docker rmi abdulrahman939291/server
docker rmi abdulrahman939291/client

# Build Docker images
docker build -t munidm/server ./server
docker build -t munidm/client ./client

# Tag for Docker Hub
docker tag munidm/server abdulrahman939291/server
docker tag munidm/client abdulrahman939291/client

# Push to Docker Hub
docker push abdulrahman939291/server
docker push abdulrahman939291/client


docker run -p 6000:6000 abdulrahman939291/server

docker build -t munidm/client ./client
docker tag munidm/client abdulrahman939291/client
docker push abdulrahman939291/client
>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62




<<<<<<< HEAD
=======


docker exec -it munidmdb mysql -uroot -p
# enter root password: Munidm91f!!!

CREATE USER 'munidm'@'%' IDENTIFIED BY 'Munidm91!!!';
GRANT ALL PRIVILEGES ON munidm_db.* TO 'munidm'@'%';
FLUSH PRIVILEGES;
EXIT;
>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62
