# ---- Compilación ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN pnpm ci

COPY . .

ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL

RUN pnpm expo export --platform web

# ---- Servidor estático ----
FROM caddy:2-alpine
COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80