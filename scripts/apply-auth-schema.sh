#!/bin/bash
# Fix root-owned npm/Prisma caches left by Docker, then push the schema + regenerate
echo "→ Fixing npm cache ownership..."
chown -R $(whoami) ~/.npm ~/.cache/prisma 2>/dev/null || true

echo "→ Pushing schema to database..."
cd "$(dirname "$0")"
DATABASE_URL="$(grep DATABASE_URL .env | cut -d '=' -f2- | tr -d '\"')" \
  ./node_modules/.bin/prisma db push --config apps/api/prisma.config.ts

echo "→ Regenerating Prisma client..."
npm run db:generate -w @achvmate/database

echo "✅ Done! You can now restart your containers."
