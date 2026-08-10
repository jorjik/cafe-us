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
docker compose up -d

# Or run the Windows binary (auto-download once):
# curl -L -o pocketbase/pb.zip https://github.com/pocketbase/pocketbase/releases/download/v0.28.4/pocketbase_0.28.4_windows_amd64.zip
# Expand into pocketbase/, then:
.\pocketbase\pocketbase.exe serve --http=127.0.0.1:8090 --dir=./pocketbase/pb_data --migrationsDir=./pocketbase/pb_migrations

# Create admin + seed menu
.\pocketbase\pocketbase.exe superuser upsert admin@cozycafe.local changeme-admin-password --dir=./pocketbase/pb_data
npm run seed
```

- PocketBase API / Admin: http://127.0.0.1:8090/_/
- Default admin (from `.env.example`): `admin@cozycafe.local` / `changeme-admin-password`

Copy `.env.example` to `.env` and change credentials before any real deploy.

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
