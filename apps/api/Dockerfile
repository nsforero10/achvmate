FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @achvmate/api --docker

FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat gcompat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

RUN corepack enable && corepack prepare npm@10.8.2 --activate

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm install

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=installer --chown=nestjs:nodejs /app/ .
COPY --from=pruner --chown=nestjs:nodejs /app/out/full/ .
COPY --from=pruner --chown=nestjs:nodejs /app/turbo.json ./turbo.json

USER root
RUN mkdir -p /app/.turbo/cache && chown -R nestjs:nodejs /app
USER nestjs

ENV DATABASE_URL="postgresql://dummy:password@localhost:5432/db"

COPY --chown=nestjs:nodejs tsconfig.json ./tsconfig.json

RUN npx turbo run db:generate

RUN npx turbo build --filter=@achvmate/api...

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

RUN mkdir -p /app/.turbo && chown -R nestjs:nodejs /app

USER nestjs

ENV NODE_ENV=production

COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nestjs:nodejs /app/packages/database/prisma ./packages/database/prisma

COPY --from=builder --chown=nestjs:nodejs /app/apps/api/entrypoint.sh ./entrypoint.sh

USER root
RUN chmod +x ./entrypoint.sh
USER nestjs

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]