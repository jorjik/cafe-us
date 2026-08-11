import { fetchMenu } from './lib/pocketbase.js'
import { formatPrice } from './partials/shell.js'

const FEATURED_IMAGE = '/images/butter-croissant.jpg'

function itemRow(item) {
  const tags = (item.tags || [])
    .map(
      (tag) =>
        `<span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-container text-on-secondary-container">${tag}</span>`,
    )
    .join('')

  return `
    <div class="flex justify-between items-end group">
      <div class="flex-grow flex items-end min-w-0">
        <span class="font-body text-body-lg text-on-surface mr-2 group-hover:text-primary transition-colors">${item.name}</span>
        ${tags}
        <div class="flex-grow menu-dots h-4 mx-2 mb-1 opacity-50"></div>
      </div>
      <span class="font-body text-body-lg text-primary whitespace-nowrap">${formatPrice(item.price)}</span>
    </div>
  `
}

function featuredCard(item) {
  if (!item) return ''
  return `
    <div class="bg-surface-container-low border border-primary-fixed-dim rounded-lg p-8 md:p-12 ambient-shadow relative overflow-hidden">
      <div class="absolute -right-12 -top-12 opacity-10 pointer-events-none">
        <span class="material-symbols-outlined text-9xl">local_cafe</span>
      </div>
      <div class="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div class="w-full md:w-1/3 aspect-square rounded-t-lg md:rounded-lg overflow-hidden relative shadow-sm">
          <img class="w-full h-full object-cover" alt="${item.name}" src="${item.image || FEATURED_IMAGE}" width="600" height="600" loading="lazy" />
        </div>
        <div class="w-full md:w-2/3 text-center md:text-left">
          <h3 class="font-display text-headline-sm text-primary mb-2 italic">Morning Ritual</h3>
          <h4 class="font-display text-display-mobile text-primary mb-4">${item.name}</h4>
          <p class="font-body text-body-md text-on-surface-variant mb-6">${item.description || ''}</p>
          <span class="font-display text-headline-md text-primary">${formatPrice(item.price)}</span>
        </div>
      </div>
    </div>
  `
}

function bindScrollSpy() {
  const sections = document.querySelectorAll('[data-menu-section]')
  const links = document.querySelectorAll('[data-menu-nav]')
  if (!sections.length || !links.length) return

  const setActive = (slug) => {
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${slug}`
      link.classList.toggle('text-primary', active)
      link.classList.toggle('text-on-surface-variant', !active)
    })
  }

  const onScroll = () => {
    let current = sections[0]?.id
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id
    })
    if (current) setActive(current)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

export async function renderMenuPage() {
  const root = document.querySelector('#menu-root')
  if (!root) return

  const { categories, items } = await fetchMenu()
  const featured = items.find((item) => item.featured)
  const regular = items.filter((item) => !item.featured)

  const chipNav = categories
    .map(
      (cat, i) => `
      <a href="#${cat.slug}" data-menu-nav class="shrink-0 px-4 py-2 rounded-full border border-outline-variant ${i === 0 ? 'bg-primary text-on-primary border-primary' : 'bg-surface text-on-surface-variant'} font-body text-label-md tracking-wide font-semibold">
        ${cat.name}
      </a>`,
    )
    .join('')

  const sideNav = categories
    .map(
      (cat, i) => `
      <a data-menu-nav class="block font-display text-headline-sm ${i === 0 ? 'text-primary' : 'text-on-surface-variant'} hover:text-primary transition-colors" href="#${cat.slug}">
        ${cat.name}
      </a>`,
    )
    .join('')

  const sections = categories
    .map((cat) => {
      const catItems = regular
        .filter((item) => item.category === cat.slug)
        .sort((a, b) => a.sort - b.sort)

      if (!catItems.length && !(featured && featured.category === cat.slug)) {
        return `
          <section class="scroll-mt-32" id="${cat.slug}" data-menu-section>
            <div class="flex items-center gap-4 mb-8">
              <h2 class="font-display text-headline-md text-primary">${cat.name}</h2>
              <div class="h-px flex-grow bg-outline-variant"></div>
            </div>
            <p class="text-on-surface-variant">Coming soon.</p>
          </section>
        `
      }

      const featuredBlock =
        featured && featured.category === cat.slug ? featuredCard(featured) : ''

      return `
        <section class="scroll-mt-32 space-y-10" id="${cat.slug}" data-menu-section>
          <div>
            <div class="flex items-center gap-4 mb-8">
              <h2 class="font-display text-headline-md text-primary">${cat.name}</h2>
              <div class="h-px flex-grow bg-outline-variant"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              ${catItems.map(itemRow).join('')}
            </div>
          </div>
          ${featuredBlock}
        </section>
      `
    })
    .join('')

  root.innerHTML = `
    <div class="lg:hidden sticky top-20 z-40 -mx-margin-mobile px-margin-mobile py-3 bg-background/95 backdrop-blur border-b border-outline-variant mb-10 overflow-x-auto">
      <div class="flex gap-2 min-w-max">${chipNav}</div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter md:gap-12 relative">
      <aside class="lg:col-span-3 hidden lg:block relative">
        <div class="sticky top-32 space-y-4">${sideNav}</div>
      </aside>
      <div class="lg:col-span-9 space-y-16 md:space-y-24">${sections}</div>
    </div>
  `

  bindScrollSpy()
}

renderMenuPage()
