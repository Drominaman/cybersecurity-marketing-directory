'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Records a page view against our own Netlify function.
 *
 * Sets no cookies and reads nothing from the device, so it counts every
 * visitor rather than only those who accept a consent banner. Fires on route
 * changes too, since the site navigates client-side and those would otherwise
 * never be counted.
 *
 * Canonical copy lives in ~/Development/traffic-dashboard/beacon/client.
 * Edit it there and reinstall rather than editing a site's copy in place.
 */
// True once this page load has sent its first view. Module memory, not
// storage: it resets on every full load and is never written to the device.
let entered = false

export default function PageViewBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // The query string can carry search terms and identifiers. The path is all
    // the "which pages get read" question needs.
    const params = new URLSearchParams({ p: pathname, v: '2' })
    // Browsers driven by automation (Puppeteer, Playwright, Selenium) say so
    // here; the counter files those views under bots.
    if (navigator.webdriver) params.set('w', '1')

    // document.referrer keeps its first value through client-side navigation,
    // so sending it on every view credited each page of a visit to the site
    // that started it. Only the first view of a page load sends it now, and
    // that view is marked as a new visit unless it came from this site.
    if (!entered) {
      entered = true
      const ref = document.referrer
      let fromHere = false
      try { fromHere = !!ref && new URL(ref).hostname === location.hostname } catch {}
      if (!fromHere) params.set('e', '1')
      if (ref) params.set('r', ref)
    }

    const url = `/.netlify/functions/hit?${params.toString()}`
    // keepalive so the view still lands if the reader navigates away at once.
    fetch(url, { method: 'POST', keepalive: true }).catch(() => {})
  }, [pathname])

  return null
}
