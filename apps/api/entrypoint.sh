#!/bin/sh

echo "Esperando a que la base de datos esté lista..."

# Usar la ruta explícita al schema
npx prisma migrate deploy --schema ./packages/database/prisma/schema.prisma

echo "Iniciando la aplicación..."

if [ "$#" -gt 0 ]; then
  # Si se pasaron argumentos (e.g. comando CMD de docker-compose), ejecútalos
  exec "$@"
else
  # Fallback a arrancar producción si no hay CMD
  if [ -f "./dist/src/main.js" ]; then
      exec node ./dist/src/main.js
  elif [ -f "./dist/main.js" ]; then
      exec node ./dist/main.js
  else
      echo "ERROR: No se encontró main.js en ./dist o ./dist/src"
      ls -R ./dist
      exit 1
  fi
fi