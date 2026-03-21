#!/bin/sh

echo "Esperando a que la base de datos esté lista..."

# Usar la configuración definida en prisma.config.ts
npx prisma migrate deploy

echo "Iniciando la aplicación..."
exec node dist/src/main.js