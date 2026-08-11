# Cozy Cafe

Marketing site for **Cozy Cafe** (Cadillac, MI), built from the Google Stitch design **Hearth & Harvest**.

## Stack

- **Vite** (MPA) + **Tailwind CSS v4** — frontend
- **PocketBase** — menu CMS, site settings, contact form inbox

## Quick start

```bash
# Frontend
npm install
npm run dev
```

Site: http://127.0.0.1:5173

```bash
# Backend (Docker — if Docker Desktop is running)
cp .env.example .env   # set PB_ADMIN_EMAIL / PB_ADMIN_PASSWORD
docker compose up -d --build

# Seed menu + site settings (after admin exists)
npm run seed
```

- Site (Docker): http://127.0.0.1:3080
- PocketBase API / Admin: http://127.0.0.1:8090/_/ (or via nginx: http://127.0.0.1:3080/_/)

On container start PocketBase will:
1. **Upsert** the superuser from `PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD`
2. **Auto-migrate** collections from migrations baked into the image
3. **Seed** menu + site settings if empty (`PB_FORCE_SEED=1` to replace)

Copy `.env.example` to `.env` and change credentials before any real deploy.
In Coolify, set the same `PB_ADMIN_*` env vars on the application (runtime).

## PocketBase admin / collections (manual fallback)

Automation covers normal deploys. Use this only if env vars were missing or you need to reset a password.

```bash
# Docker Compose
docker compose exec pocketbase /usr/local/bin/pocketbase superuser upsert EMAIL PASSWORD --dir=/pb_data

# Coolify / VPS
CID=$(docker ps -qf name=pocketbase- | head -1)
docker exec "$CID" /usr/local/bin/pocketbase superuser upsert EMAIL PASSWORD --dir=/pb_data
```

Then seed data:

```bash
npm run seed
```

## Why migrations are in the image

Coolify remaps `./pocketbase/pb_migrations` to a **persistent empty volume**, which hid the repo
migration files and left the admin UI without `menu_*` collections. Migrations are therefore
`COPY`ed into `Dockerfile.pocketbase`; only `pb_data` stays on a volume.

## Pages

| URL | Page |
|-----|------|
| `/` | Home |
| `/menu.html` | Menu (from PocketBase, seed fallback) |
| `/about.html` | About |
| `/contact.html` | Contact form → `contact_messages` |

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview `dist/`
- `npm run seed` — upsert menu + settings into PocketBase

## Design reference

Stitch exports (HTML/PNG + tokens) live in [`design/stitch/`](design/stitch/).
