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

# Start server in background so we can wait for health and seed.
"$PB_BIN" serve \
  --http=0.0.0.0:8090 \
  --dir="$DIR" \
  --migrationsDir="$MIGRATIONS" \
  --automigrate=true &
PB_PID=$!

echo "Waiting for PocketBase health..."
i=0
until wget -q --spider http://127.0.0.1:8090/api/health; do
  i=$((i + 1))
  if [ "$i" -gt 60 ]; then
    echo "PocketBase did not become healthy in time"
    kill "$PB_PID" 2>/dev/null || true
    exit 1
  fi
  sleep 1
done
echo "PocketBase is healthy"

# Seed menu/settings once when empty (or always if PB_FORCE_SEED=1).
if [ "${PB_SEED_ON_START:-true}" != "false" ]; then
  echo "Running seed (PB_FORCE_SEED=${PB_FORCE_SEED:-0})..."
  VITE_POCKETBASE_URL=http://127.0.0.1:8090 node /seed/scripts/seed.mjs
else
  echo "PB_SEED_ON_START=false — skipping seed"
fi

wait "$PB_PID"
