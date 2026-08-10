import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, '.env'), 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const i = trimmed.indexOf('=')
      if (i === -1) continue
      const key = trimmed.slice(0, i)
      const value = trimmed.slice(i + 1)
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // optional
  }
}

loadEnv()

const PB_URL = (process.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090').replace(/\/$/, '')
const EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@cozycafe.local'
const PASSWORD = process.env.PB_ADMIN_PASSWORD || 'changeme-admin-password'
const seed = JSON.parse(readFileSync(resolve(root, 'src/data/seed-menu.json'), 'utf8'))

async function pb(path, { method = 'GET', token, body } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = token

  const res = await fetch(`${PB_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const detail = data?.data ? ` ${JSON.stringify(data.data)}` : ''
    const msg = data?.message || text || res.statusText
    throw new Error(`${method} ${path} → ${res.status}: ${msg}${detail}`)
  }
  return data
}

async function ensureSuperuser() {
  try {
    return await pb('/api/collections/_superusers/auth-with-password', {
      method: 'POST',
      body: { identity: EMAIL, password: PASSWORD },
    })
  } catch (err) {
    throw new Error(
      `${err.message}\nCreate an admin first:\n  .\\pocketbase\\pocketbase.exe superuser upsert ${EMAIL} ${PASSWORD} --dir=./pocketbase/pb_data`,
    )
  }
}

async function clearCollection(token, name) {
  const data = await pb(`/api/collections/${name}/records?perPage=200`, { token })
  for (const item of data.items || []) {
    await pb(`/api/collections/${name}/records/${item.id}`, { method: 'DELETE', token })
  }
}

async function main() {
  console.log(`Seeding PocketBase at ${PB_URL}`)
  const auth = await ensureSuperuser()
  const token = auth.token

  await clearCollection(token, 'menu_items')
  await clearCollection(token, 'menu_categories')
  await clearCollection(token, 'site_settings')

  const categoryIds = {}
  for (const cat of seed.categories) {
    const record = await pb('/api/collections/menu_categories/records', {
      method: 'POST',
      token,
      body: cat,
    })
    categoryIds[cat.slug] = record.id
    console.log(`category ${cat.slug}`)
  }

  for (const item of seed.items) {
    const { category, ...rest } = item
    await pb('/api/collections/menu_items/records', {
      method: 'POST',
      token,
      body: {
        ...rest,
        category: categoryIds[category],
        tags: item.tags || [],
      },
    })
    console.log(`item ${item.name}`)
  }

  await pb('/api/collections/site_settings/records', {
    method: 'POST',
    token,
    body: seed.settings,
  })
  console.log('site_settings')
  console.log('Seed complete.')
}

main().catch((err) => {
  console.error(err.message)
  console.error('\nMake sure PocketBase is running: docker compose up -d')
  console.error('Admin UI: http://127.0.0.1:8090/_/')
  process.exit(1)
})
