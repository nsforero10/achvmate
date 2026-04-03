# --- Stage 1: Pruner ---
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @achvmate/web --docker

# --- Stage 2: Deps ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare npm@10.8.2 --activate

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm install

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=development

# Copiamos toda la estructura con las dependencias instaladas (incluyendo workspaces)
COPY --from=deps /app/ .
COPY tsconfig.json ./tsconfig.json

# Copiamos el código completo
COPY --from=pruner /app/out/full/ .

EXPOSE 3000

CMD ["npx", "turbo", "run", "dev", "--filter=@achvmate/web"]