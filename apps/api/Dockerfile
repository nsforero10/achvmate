# --- Stage 1: Pruner ---
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
# Copiamos el lockfile explícitamente para que turbo prune lo encuentre
COPY package.json package-lock.json* turbo.json ./
COPY . .
RUN turbo prune @achvmate/api --docker

# --- Stage 2: Installer ---
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat gcompat
WORKDIR /app

# Creamos el usuario ANTES de copiar archivos para poder asignar permisos
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copiamos los archivos generados por el prune
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

# CRÍTICO: Asignamos el dueño al directorio /app ANTES de instalar
RUN chown -R nestjs:nodejs /app
USER nestjs

RUN npm install

# --- Stage 3: Builder ---
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Heredamos los archivos con el dueño correcto (nestjs)
COPY --from=installer --chown=nestjs:nodejs /app/ .
COPY --from=pruner --chown=nestjs:nodejs /app/out/full/ .
COPY --from=pruner --chown=nestjs:nodejs /app/turbo.json ./turbo.json

# CRÍTICO: Aseguramos que el usuario nestjs tenga permisos sobre /app para .turbo/cache
USER root
RUN mkdir -p /app/.turbo/cache && chown -R nestjs:nodejs /app
USER nestjs

# Definimos variables de entorno necesarias para la generación y el build de Prisma
ENV DATABASE_URL="postgresql://dummy:password@localhost:5432/db"

# Ahora turbo tiene permisos para escribir en /app/.turbo/cache
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npx turbo build --filter=@achvmate/api...

# --- Stage 4: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Definimos variables de producción
ENV NODE_ENV=production

# Copiamos archivos de la etapa builder conservando la estructura interna de apps/api
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/entrypoint.sh ./entrypoint.sh

# Asegurar permisos de ejecución para el entrypoint
USER root
RUN chmod +x ./entrypoint.sh
USER nestjs

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]