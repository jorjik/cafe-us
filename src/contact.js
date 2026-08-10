import { fetchSettings, submitContact } from './lib/pocketbase.js'

async function hydrateContactInfo() {
  const settings = await fetchSettings()
  const addressEl = document.querySelector('[data-contact-address]')
  const phoneEl = document.querySelector('[data-contact-phone]')
  const emailEl = document.querySelector('[data-contact-email]')
  const hoursEl = document.querySelector('[data-contact-hours]')

  if (addressEl) {
    const parts = settings.address.split(',').map((p) => p.trim())
    addressEl.innerHTML =
      parts.length > 1 ? `${parts[0]}<br>${parts.slice(1).join(', ')}` : settings.address
  }
  if (phoneEl) phoneEl.textContent = settings.phone
  if (emailEl) emailEl.textContent = settings.email
  if (hoursEl) hoursEl.textContent = settings.hours
}

function bindForm() {
  const form = document.querySelector('#contact-form')
  const status = document.querySelector('#contact-status')
  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const submitBtn = form.querySelector('[type="submit"]')
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      if (status) {
        status.textContent = 'Please fill in all fields.'
        status.className = 'mt-4 text-error text-sm'
      }
      return
    }

    submitBtn.disabled = true
    submitBtn.textContent = 'Sending…'
    if (status) {
      status.textContent = ''
      status.className = 'mt-4 text-sm'
    }

    try {
      await submitContact(payload)
      form.reset()
      if (status) {
        status.textContent = 'Thanks! Your message has been sent.'
        status.className = 'mt-4 text-secondary text-sm'
      }
    } catch (error) {
      if (status) {
        status.textContent = error.message || 'Could not send message. Is PocketBase running?'
        status.className = 'mt-4 text-error text-sm'
      }
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = 'Send Message'
    }
  })
}

hydrateContactInfo()
bindForm()
