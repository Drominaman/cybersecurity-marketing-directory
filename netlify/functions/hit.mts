import { getStore } from '@netlify/blobs'

/**
 * First-party pageview counter.
 *
 * Written because the estate had no usable traffic measurement: Microsoft
 * Clarity is session-recording and stops seeing most visitors the moment a
 * consent banner goes in, every hosted alternative is either paid or needs an
 * account, and Netlify Analytics is a paid add-on that is not enabled here.
 *
 * This sets no cookies, reads nothing from the device, and stores no IP
 * address, so it counts every visitor and needs no consent banner.
 *
 * One blob per view rather than a counter that is read, incremented and written
 * back: two views arriving together would otherwise overwrite each other and
 * the count would quietly run low. Read cost is handled by the rollup cache in
 * stats.mts rather than by making the write path lossy.
 *
 * Canonical copy lives in ~/Development/traffic-dashboard/beacon/functions.
 * Edit it there and reinstall rather than editing a site's copy in place.
 */

const BOT = /bot|crawler|spider|crawling|slurp|bingpreview|headless|lighthouse|curl|wget|python-requests|axios|monitoring|uptime|semrush|ahrefs|dataforseo/i

export default async (req: Request) => {
  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'cache-control': 'no-store',
  }
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })

  try {
    const url = new URL(req.url)

    // A call with no path is not a page view. Probes, health checks and the
    // dev server's own warm-up all arrive this way, and defaulting them to "/"
    // quietly inflates the homepage.
    const raw = url.searchParams.get('p')
    if (!raw) return new Response(null, { status: 204, headers: cors })

    const path = raw.slice(0, 300)

    // Referrer host only. The full URL can carry search terms and identifiers,
    // and the host is all that "where did they come from" needs.
    let refHost = ''
    const ref = url.searchParams.get('r') || ''
    if (ref) {
      try {
        const h = new URL(ref).hostname
        if (h && h !== url.hostname) refHost = h.slice(0, 120)
      } catch {}
    }

    const ua = req.headers.get('user-agent') || ''
    const now = new Date()
    const day = now.toISOString().slice(0, 10)

    const store = getStore('pageviews')
    const key = `${day}/${now.getTime()}-${Math.random().toString(36).slice(2, 10)}`
    await store.setJSON(key, {
      p: path,
      r: refHost,
      t: now.toISOString(),
      b: BOT.test(ua) || undefined,
    })

    return new Response(null, { status: 204, headers: cors })
  } catch {
    // Never let measurement break a page load.
    return new Response(null, { status: 204, headers: cors })
  }
}
