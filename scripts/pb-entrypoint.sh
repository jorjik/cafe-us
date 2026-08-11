#!/bin/sh
set -e

PB_BIN="/usr/local/bin/pocketbase"
DIR="${PB_DIR:-/pb_data}"
MIGRATIONS="${PB_MIGRATIONS_DIR:-/pb_migrations}"

mkdir -p "$DIR"

# Create/update admin from env on every boot (idempotent).
if [ -n "${PB_ADMIN_EMAIL:-}" ] && [ -n "${PB_ADMIN_PASSWORD:-}" ]; then
  echo "Ensuring PocketBase superuser: $PB_ADMIN_EMAIL"
  "$PB_BIN" superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir="$DIR"
else
  echo "PB_ADMIN_EMAIL/PB_ADMIN_PASSWORD not set — skipping superuser upsert"
fi

# Migrations are baked into the image under /pb_migrations (not a Coolify volume),
# so automigrate always sees the repo files.
exec "$PB_BIN" serve \
  --http=0.0.0.0:8090 \
  --dir="$DIR" \
  --migrationsDir="$MIGRATIONS" \
  --automigrate=true
