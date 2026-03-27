# 1- Install Nginx and Certbot
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y

# 2- Create the Configuration File
sudo nano /etc/nginx/sites-available/munidm

# Paste this exact code into the editor:
# Frontend Configuration
server {
    listen 80;
    server_name munidm.fr;

    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Backend/API Configuration
server {
    listen 80;
    server_name api.munidm.fr;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 3- Enable the Config and Test

# Link the file to the 'enabled' folder
sudo ln -s /etc/nginx/sites-available/munidm /etc/nginx/sites-enabled/

# Test for syntax errors
sudo nginx -t

# If it says 'syntax is ok', restart Nginx
sudo systemctl restart nginx

# 4 Get the SSL Certificates (HTTPS)
sudo certbot --nginx -d munidm.fr -d api.munidm.fr

# 5 Final Docker Update
cd /var/www/munidm
docker compose up --build -d