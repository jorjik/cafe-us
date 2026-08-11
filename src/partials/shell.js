const NAV = [
  { href: '/index.html', label: 'Home', match: ['/', '/index.html'] },
  { href: '/about.html', label: 'About', match: ['/about.html'] },
  { href: '/menu.html', label: 'Menu', match: ['/menu.html'] },
  { href: '/contact.html', label: 'Contact', match: ['/contact.html'] },
]

function currentPath() {
  const path = window.location.pathname.replace(/\\/g, '/')
  if (path.endsWith('/') || path === '') return '/index.html'
  return path.endsWith('.html') ? path : `${path}.html`
}

function isActive(item, path) {
  const normalized = path === '/' ? '/index.html' : path
  return item.match.some((m) => m === normalized || normalized.endsWith(m))
}

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`
}

export { formatPrice, currentPath, isActive }

export function renderShell(settings = {}) {
  const path = currentPath()
  const orderUrl = settings.order_url || '/menu.html'
  const address = settings.address || '8834 E 34 Rd #131, Cadillac, MI 49601'
  const phone = settings.phone || '(231) 555-0123'
  const email = settings.email || 'hello@cozycafe.com'
  const instagram = settings.instagram || '#'
  const facebook = settings.facebook || '#'
  const year = new Date().getFullYear()

  const navLinks = NAV.map((item) => {
    const active = isActive(item, path)
    const classes = active
      ? 'text-primary font-bold border-b-2 border-primary pb-1'
      : 'text-on-surface-variant font-medium hover:text-primary transition-colors duration-200'
    return `<a class="${classes}" href="${item.href}" data-nav-link>${item.label}</a>`
  }).join('')

  const mobileLinks = NAV.map((item) => {
    const active = isActive(item, path)
    const classes = active
      ? 'block px-4 py-3 text-primary font-bold bg-surface-container-low rounded-lg'
      : 'block px-4 py-3 text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors'
    return `<a class="${classes}" href="${item.href}" data-mobile-nav-link>${item.label}</a>`
  }).join('')

  const header = document.querySelector('#site-header')
  if (header) {
    header.innerHTML = `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        <a class="font-display text-display-mobile md:text-display-lg text-primary" href="/index.html">Cozy Cafe</a>
        <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
          ${navLinks}
        </nav>
        <a class="btn-primary hidden md:inline-flex" href="${orderUrl}" data-order-cta>Order Now</a>
        <button type="button" class="md:hidden text-primary p-2" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
          <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
      <div id="mobile-nav" class="md:hidden hidden border-t border-outline-variant bg-surface px-margin-mobile py-4 space-y-1">
        ${mobileLinks}
        <a class="btn-primary mt-3 inline-flex w-full justify-center" href="${orderUrl}" data-order-cta>Order Now</a>
      </div>
    `
  }

  const footer = document.querySelector('#site-footer')
  if (footer) {
    footer.innerHTML = `
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div class="flex flex-col gap-4">
          <span class="font-display text-display-mobile text-primary">Cozy Cafe</span>
          <p class="text-on-surface-variant">© ${year} Cozy Cafe. All rights reserved.</p>
        </div>
        <div class="flex flex-col gap-3 text-on-surface-variant" data-footer-contact>
          <p class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">location_on</span><span data-setting="address">${address}</span></p>
          <p class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">phone</span><a href="tel:${phone.replace(/[^\d+]/g, '')}" data-setting="phone">${phone}</a></p>
          <p class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">mail</span><a href="mailto:${email}" data-setting="email">${email}</a></p>
        </div>
        <div class="flex flex-col gap-3 md:items-end">
          <a class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors" href="${instagram}" target="_blank" rel="noopener noreferrer" data-setting="instagram" aria-label="Instagram">
            <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span>Instagram</span>
          </a>
          <a class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors" href="${facebook}" target="_blank" rel="noopener noreferrer" data-setting="facebook" aria-label="Facebook">
            <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            <span>Facebook</span>
          </a>
        </div>
      </div>
    `
  }
}

export function bindMobileNav() {
  const toggle = document.querySelector('#menu-toggle')
  const panel = document.querySelector('#mobile-nav')
  if (!toggle || !panel) return

  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('hidden') === false
    toggle.setAttribute('aria-expanded', String(open))
    toggle.querySelector('.material-symbols-outlined').textContent = open ? 'close' : 'menu'
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  })

  panel.querySelectorAll('[data-mobile-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.add('hidden')
      toggle.setAttribute('aria-expanded', 'false')
      toggle.querySelector('.material-symbols-outlined').textContent = 'menu'
    })
  })
}
