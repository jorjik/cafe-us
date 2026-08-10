import './styles/global.css'
import { fetchSettings } from './lib/pocketbase.js'
import { bindMobileNav, renderShell } from './partials/shell.js'

async function boot() {
  const settings = await fetchSettings()
  renderShell(settings)
  bindMobileNav()
}

boot()
