
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

# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

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

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]