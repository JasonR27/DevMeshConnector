FROM node:23-bullseye AS frontend
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
# Build the application
RUN npm run build

EXPOSE 80

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# # Expose port 5000 to the outside world
EXPOSE 3007
EXPOSE 3006