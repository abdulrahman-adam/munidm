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


# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

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
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]