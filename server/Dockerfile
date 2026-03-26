# FROM node:20

# WORKDIR /user/src/app

# COPY package.*json ./

# RUN npm install

# COPY . .

# CMD ["npm", "start"]



FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "app.js"]