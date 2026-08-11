import seed from '../data/seed-menu.json'

// Empty string = same-origin (nginx proxies /api and /_ to PocketBase)
const PB_URL = (import.meta.env.VITE_POCKETBASE_URL ?? 'http://127.0.0.1:8090').replace(/\/$/, '')

async function pbFetch(path) {
  const res = await fetch(`${PB_URL}/api/collections/${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`PocketBase ${res.status}`)
  return res.json()
}

export function getPocketBaseUrl() {
  return PB_URL
}

export async function fetchSettings() {
  try {
    const data = await pbFetch('site_settings/records?perPage=1')
    const record = data.items?.[0]
    if (!record) throw new Error('No settings')
    return {
      address: record.address,
      phone: record.phone,
      email: record.email,
      hours: record.hours,
      instagram: record.instagram,
      facebook: record.facebook,
      order_url: record.order_url || '/menu.html',
    }
  } catch {
    return { ...seed.settings }
  }
}

export async function fetchMenu() {
  try {
    const [categoriesData, itemsData] = await Promise.all([
      pbFetch('menu_categories/records?sort=sort&perPage=50'),
      pbFetch('menu_items/records?sort=sort&perPage=200&expand=category'),
    ])

    const categories = (categoriesData.items || []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sort: c.sort,
    }))

    if (!categories.length) throw new Error('No categories')

    const items = (itemsData.items || []).map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description || '',
      tags: Array.isArray(item.tags) ? item.tags : [],
      featured: Boolean(item.featured),
      sort: item.sort,
      category: item.expand?.category?.slug || item.category,
      image: item.image
        ? `${PB_URL}/api/files/menu_items/${item.id}/${item.image}`
        : '',
    }))

    return { categories, items }
  } catch {
    return {
      categories: seed.categories,
      items: seed.items,
    }
  }
}

export async function submitContact({ name, email, message }) {
  const res = await fetch(`${PB_URL}/api/collections/contact_messages/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Failed to send message (${res.status})`)
  }

  return res.json()
}
