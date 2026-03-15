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