# --- Stage 1: Pruner (Optimización de contexto) ---
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
# Turbo detectará automáticamente que @achvmate/api depende de @achvmate/database 
# y meterá ambos en la carpeta /app/out
RUN turbo prune @achvmate/api --docker

# --- Stage 2: Installer (Dependencias) ---
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat gcompat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

RUN corepack enable && corepack prepare npm@10.8.2 --activate

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# Instalamos dependencias de todo el monorepo filtrado
RUN npm install

# --- Stage 3: Builder (Generación y Compilación) ---
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copiamos archivos instalados y el código fuente completo filtrado
COPY --from=installer --chown=nestjs:nodejs /app/ .
COPY --from=pruner --chown=nestjs:nodejs /app/out/full/ .
COPY --from=pruner --chown=nestjs:nodejs /app/turbo.json ./turbo.json

USER root
RUN mkdir -p /app/.turbo/cache && chown -R nestjs:nodejs /app
USER nestjs

ENV DATABASE_URL="postgresql://dummy:password@localhost:5432/db"

COPY --chown=nestjs:nodejs tsconfig.json ./tsconfig.json

# 1. Generamos Prisma y Zod en el paquete compartido (@achvmate/database)
# Esto es vital para que NestJS reconozca los tipos al compilar
RUN npx turbo run db:generate

# 2. Construimos la API
RUN npx turbo build --filter=@achvmate/api...

# --- Stage 4: Runner (Imagen final ligera) ---
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Asegurar que el usuario nextjs/nestjs tiene permisos sobre /app en dev local
RUN mkdir -p /app/.turbo && chown -R nestjs:nodejs /app

USER nestjs

ENV NODE_ENV=production

# Copiamos el build de la API
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

# CRÍTICO: Copiamos el archivo de configuración y la carpeta de base de datos
# Prisma migrate deploy lo buscará relativo al CWD o vía prisma.config.ts
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nestjs:nodejs /app/packages/database/prisma ./packages/database/prisma

# Copiamos el entrypoint
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/entrypoint.sh ./entrypoint.sh

USER root
RUN chmod +x ./entrypoint.sh
USER nestjs

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]