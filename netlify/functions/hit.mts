import { getStore } from '@netlify/blobs'
import { createHash, randomBytes } from 'node:crypto'

/**
 * First-party pageview counter.
 *
 * Written because the estate had no usable traffic measurement: Microsoft
 * Clarity is session-recording and stops seeing most visitors the moment a
 * consent banner goes in, every hosted alternative is either paid or needs an
 * account, and Netlify Analytics is a paid add-on that is not enabled here.
 *
 * This sets no cookies, reads nothing from the device, and stores no IP
 * address, so it counts every visitor and needs no consent banner. Each hit
 * carries a visitor hash: the IP and user agent hashed with a random salt that
 * changes every day and is deleted once the day is rolled up, so a hash cannot
 * be traced back to anyone or linked to the same visitor on another day. It
 * exists for one job: letting stats.mts cap how many views a single visitor
 * can add in a day, which is how crawlers posing as browsers are caught
 * (2026-10-21: on cybersecuritystats.com they were most of the "human" views).
 *
 * One blob per view rather than a counter that is read, incremented and written
 * back: two views arriving together would otherwise overwrite each other and
 * the count would quietly run low. Read cost is handled by the rollup cache in
 * stats.mts rather than by making the write path lossy.
 *
 * Canonical copy lives in ~/Development/traffic-dashboard/beacon/functions.
 * Edit it there and reinstall rather than editing a site's copy in place.
 */

// The same list Cyber Vendor Guide uses (cybersectool/src/lib/bot-ua.ts), so a
// bot is a bot on every site in the estate. It only catches crawlers that say
// what they are; the visitor cap in stats.mts catches the ones that do not.
const BOT = /bot|crawler|spider|crawling|slurp|bingpreview|headless|phantomjs|puppeteer|playwright|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|scrapy|curl|wget|python-requests|node-fetch|axios|go-http-client|java\/|okhttp|libwww|httpclient|facebookexternalhit|whatsapp|telegram|slackbot|discord|preview|embedly|quora link preview|vercelbot|feedfetcher|semrush|ahrefs|mj12|dotbot|petal|yandex|baidu|sogou|exabot|dataforseo|serpstat|screaming frog|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|perplexitybot|anthropic-ai|cohere-ai|ccbot|bytespider|amazonbot|applebot|google-extended|meta-externalagent/i

// Today's salt for the visitor hash: random, kept in the store, and written
// only by the first instance to ask so every instance hashes alike. stats.mts
// deletes it when the day is rolled up.
let saltCache: { day: string; salt: string } | null = null
async function dailySalt(store: ReturnType<typeof getStore>, day: string): Promise<string> {
  if (saltCache?.day === day) return saltCache.salt
  const key = `salt/${day}`
  let salt = (await store.get(key, { type: 'text' }).catch(() => null)) as string | null
  if (!salt) {
    await store.set(key, randomBytes(16).toString('hex'), { onlyIfNew: true }).catch(() => {})
    salt = (await store.get(key, { type: 'text' }).catch(() => null)) as string | null
  }
  if (!salt) return ''
  saltCache = { day, salt }
  return salt
}

export default async (req: Request, context?: { ip?: string }) => {
  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'cache-control': 'no-store',
  }
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })

  try {
    const url = new URL(req.url)

    // Only count hits that a real page on this site actually made.
    //
    // Everything below this line used to be taken on trust: the path and the
    // referrer are query parameters, so anyone able to call the endpoint could
    // invent both. They did. The referrer list filled with netflix.com,
    // roblox.com and, more damagingly, www.google.com and chatgpt.com, which
    // read as organic search that Search Console knew nothing about.
    //
    // Sec-Fetch-Site is set by the browser and cannot be written by script, so
    // same-origin is a claim a page can make and a direct caller cannot. Older
    // browsers omit the header, and those fall back to checking that the
    // Referer header, also browser-controlled, is a page on this site.
    const site = url.hostname
    const fetchSite = req.headers.get('sec-fetch-site')
    if (fetchSite) {
      if (fetchSite !== 'same-origin') return new Response(null, { status: 204, headers: cors })
    } else {
      const referer = req.headers.get('referer') || ''
      let ok = false
      try { ok = new URL(referer).hostname === site } catch {}
      if (!ok) return new Response(null, { status: 204, headers: cors })
    }

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
    const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || ''
    const salt = ip ? await dailySalt(store, day) : ''
    const h = salt ? createHash('sha256').update(`${salt}|${ip}|${ua}`).digest('hex').slice(0, 16) : undefined
    // Browsers driven by automation report navigator.webdriver; the client
    // sends w=1 when it is set.
    const driven = url.searchParams.get('w') === '1'
    // v2 clients mark the first view of each visit (e=1): the first page a
    // browser loads whose referrer is another site or none. Later client-side
    // navigations carry neither a referrer nor the mark, so a visit counts once
    // and its source counts once. Still no cookies: the client keeps the flag
    // in memory for the life of the page.
    const v = url.searchParams.get('v') === '2' ? 2 : undefined
    const e = v && url.searchParams.get('e') === '1' ? 1 : undefined
    await store.setJSON(key, {
      p: path,
      r: refHost,
      t: now.toISOString(),
      b: BOT.test(ua) || driven || undefined,
      v,
      e,
      h,
    })

    return new Response(null, { status: 204, headers: cors })
  } catch {
    // Never let measurement break a page load.
    return new Response(null, { status: 204, headers: cors })
  }
}
