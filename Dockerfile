FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Empty = same-origin; nginx proxies /api and /_ to PocketBase
ARG VITE_POCKETBASE_URL=
ENV VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
