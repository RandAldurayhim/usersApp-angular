#stage 1
FROM node:lts-slim as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/usersapp-angular /usr/share/nginx/html
