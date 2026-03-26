# FROM node:20

# WORKDIR /user/src/app

# COPY package.*json ./

# RUN npm install

# COPY . .

# CMD ["npm", "start"]

<<<<<<< HEAD


FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "app.js"]
=======
# Use lightweight Node Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62
