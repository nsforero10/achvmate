#!/bin/sh

echo "Waiting for database..."

npx prisma migrate deploy --schema ./packages/database/prisma/schema.prisma

echo "Starting application..."

if [ "$#" -gt 0 ]; then
  exec "$@"
else
  if [ -f "./dist/src/main.js" ]; then
      exec node ./dist/src/main.js
  elif [ -f "./dist/main.js" ]; then
      exec node ./dist/main.js
  else
      echo "ERROR: main.js not found in ./dist or ./dist/src"
      ls -R ./dist
      exit 1
  fi
fi