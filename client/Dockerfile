# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app using nginx
FROM nginx:stable-alpine

# Copy the build output to nginx's html folder
# Use /app/build if your build output is in the "build" folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
