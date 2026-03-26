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
 docker run munidm/client || docker run -p 5173:5173 munidm/client

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

docker build -t munidm/server ./server
docker build -t munidm/client ./client

docker rmi abdulrahman939291/server
docker rmi abdulrahman939291/client


docker tag munidm/server abdulrahman939291/server
docker tag munidm/client abdulrahman939291/client


docker push abdulrahman939291/client
docker push abdulrahman939291/server


docker run -p 3001:3000 munidm/server




