<<<<<<< HEAD

# # Stage 1: build
# FROM node:20-alpine AS build

# WORKDIR /app

# # Copy package files and install all dependencies (including dev)
# COPY package*.json ./
# RUN npm install --include=dev

# # Copy source files
# COPY . .

# # Build static files
# RUN npm run build

# # Stage 2: production image
# FROM nginx:alpine

# # Copy built files from previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
=======
# FROM node:20-alpine

# WORKDIR /user/src/app

# # Only copy package files first (This is a Docker best practice)
# COPY package*.json ./

# # Install dependencies (This builds the correct esbuild binary for Linux)
# RUN npm install

# # Copy the rest of the files (The .dockerignore will skip your local node_modules)
# COPY . .

# # Build the project
# RUN npm run build

# # Use a simple server to host the static files or run your script
# CMD ["npm", "run", "dev"]

>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62

# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

<<<<<<< HEAD
# Copy package files
COPY package*.json ./

# Install dependencies (plus rapide et stable)
RUN npm config set fetch-retry-maxtimeout 600000 \
 && npm ci --no-audit --prefer-offline

# Copy source
COPY . .

# Build
RUN npm run build

# Stage 2: production
FROM nginx:alpine

=======
# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install --include=dev

# Copy source files
COPY . .

# Build static files
RUN npm run build

# Stage 2: production image
FROM nginx:alpine

# Copy built files from previous stage
>>>>>>> 82e620a3fe5ef6d3675447161881511b2fc84a62
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]