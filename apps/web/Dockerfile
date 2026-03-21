# --- Stage 1: Dependencias ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Habilitar Corepack para usar la versión de NPM del root
RUN corepack enable && corepack prepare npm@10.8.2 --activate

# Copiamos archivos de configuración para instalar dependencias del monorepo
COPY package.json package-lock.json* turbo.json ./
COPY apps/web/package.json ./apps/web/package.json

# Instalamos todo (incluyendo devDependencies para poder correr 'next dev')
RUN npm install

# --- Stage 2: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=development

# Copiamos las dependencias instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
# Copiamos el código fuente (aunque el volumen lo sobrescribirá, es buena práctica)
COPY . .

EXPOSE 3000

# Comando para desarrollo con Turbo
CMD ["npx", "turbo", "run", "dev", "--filter=@achvmate/web"]