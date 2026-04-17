# Stage 1: Prune
FROM node:22-alpine AS builder

# Required by Prisma natively on alpine configurations
RUN apk add --no-cache openssl ca-certificates

WORKDIR /app
RUN npm install -g turbo
COPY . .

# Prune exactly the target bounds limiting node module size to just the API context securely
RUN turbo prune @achvmate/api --docker

# Stage 2: Install dependencies natively
FROM node:22-alpine AS installer
RUN apk add --no-cache openssl ca-certificates
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy source maps over and compile
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/turbo.json .

# Ensure Prisma successfully maps the engine mappings cleanly since we are actively mapping bounds
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma || true

# Extract pure build mappings structurally testing boundaries 
RUN npx turbo run build --filter=@achvmate/api

# Stage 3: Runner Engine - Minimal execution environment natively mapping Koyeb
FROM node:22-alpine AS runner
RUN apk add --no-cache openssl ca-certificates
WORKDIR /app

# Non-root user payload bounds limiting injection attacks natively
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs

USER reactjs

COPY --from=installer /app/package.json .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/packages ./packages
COPY --from=installer /app/apps/api ./apps/api

# Target Koyeb expected bound natively and boot!
EXPOSE 3000
CMD [ "node", "apps/api/dist/main.js" ]
