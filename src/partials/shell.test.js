import { describe, it, expect } from 'vitest'
import { currentPath, formatPrice, isActive } from './shell.js'

describe('formatPrice', () => {
  it('formats a number as USD with two decimals', () => {
    expect(formatPrice(4)).toBe('$4.00')
    expect(formatPrice(4.5)).toBe('$4.50')
  })

  it('coerces numeric strings', () => {
    expect(formatPrice('3.5')).toBe('$3.50')
  })
})

describe('currentPath', () => {
  it('normalizes the root path to /index.html', () => {
    window.history.pushState({}, '', '/')
    expect(currentPath()).toBe('/index.html')
  })

  it('appends .html when the path is missing an extension', () => {
    window.history.pushState({}, '', '/menu')
    expect(currentPath()).toBe('/menu.html')
  })

  it('keeps an already-suffixed .html path untouched', () => {
    window.history.pushState({}, '', '/about.html')
    expect(currentPath()).toBe('/about.html')
  })
})

describe('isActive', () => {
  const home = { match: ['/', '/index.html'] }
  const menu = { match: ['/menu.html'] }

  it('matches the home nav item for both / and /index.html', () => {
    expect(isActive(home, '/')).toBe(true)
    expect(isActive(home, '/index.html')).toBe(true)
  })

  it('does not match unrelated paths', () => {
    expect(isActive(menu, '/about.html')).toBe(false)
  })

  it('matches an exact path', () => {
    expect(isActive(menu, '/menu.html')).toBe(true)
  })
})
