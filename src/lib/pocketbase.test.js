import { afterEach, describe, expect, it, vi } from 'vitest'
import seed from '../data/seed-menu.json'
import { fetchMenu, fetchSettings, submitContact } from './pocketbase.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchSettings', () => {
  it('returns the mapped settings record on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          items: [
            {
              address: '1 Main St',
              phone: '555-0000',
              email: 'hi@example.com',
              hours: '9-5',
              instagram: '',
              facebook: '',
              order_url: '',
            },
          ],
        }),
      }),
    )

    const settings = await fetchSettings()
    expect(settings.address).toBe('1 Main St')
    expect(settings.order_url).toBe('/menu.html')
  })

  it('falls back to seed data when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    const settings = await fetchSettings()
    expect(settings).toEqual(seed.settings)
  })

  it('falls back to seed data when the response has no records', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [] }) }),
    )
    const settings = await fetchSettings()
    expect(settings).toEqual(seed.settings)
  })
})

describe('fetchMenu', () => {
  it('falls back to seed data when there are no categories', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [] }) }),
    )
    const { categories, items } = await fetchMenu()
    expect(categories).toEqual(seed.categories)
    expect(items).toEqual(seed.items)
  })

  it('falls back to seed data when the request throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const { categories, items } = await fetchMenu()
    expect(categories).toEqual(seed.categories)
    expect(items).toEqual(seed.items)
  })
})

describe('submitContact', () => {
  it('resolves with the created record on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'abc123' }) }),
    )
    const result = await submitContact({ name: 'Jane', email: 'jane@example.com', message: 'Hi' })
    expect(result.id).toBe('abc123')
  })

  it('throws the server error message on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Bad request' }),
      }),
    )
    await expect(
      submitContact({ name: 'Jane', email: 'jane@example.com', message: 'Hi' }),
    ).rejects.toThrow('Bad request')
  })

  it('falls back to a generic error when the response has no message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }),
    )
    await expect(
      submitContact({ name: 'Jane', email: 'jane@example.com', message: 'Hi' }),
    ).rejects.toThrow('Failed to send message (500)')
  })
})
