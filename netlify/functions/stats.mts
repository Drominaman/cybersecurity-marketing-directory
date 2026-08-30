import { getStore } from '@netlify/blobs'

/**
 * Reads back what hit.mts recorded.
 *
 * Aggregate counts for a public website are not sensitive, so this is not
 * behind a password, but it carries noindex so it never turns up in search.
 * Bots are counted separately rather than dropped: knowing how much of the
 * traffic is crawlers is part of the answer.
 *
 * Rollup cache. hit.mts writes one blob per view, so reading thirty days
 * naively costs one blob fetch per view and stops finishing once a site gets
 * any real traffic. A day in the past can never gain more views, so the first
 * read of a finished day aggregates it into a single `rollup/<day>` blob and
 * every later read costs one fetch. Today is always recomputed from raw blobs
 * because it is still filling up.
 *
 * The raw blobs are never deleted. The rollup is a cache, not a replacement,
 * so a change to how these figures are counted can be applied retrospectively
 * by deleting the rollup blobs.
 *
 * Canonical copy lives in ~/Development/traffic-dashboard/beacon/functions.
 * Edit it there and reinstall rather than editing a site's copy in place.
 */

const DEFAULT_DAYS = 30
const MAX_DAYS = 90

// Bounds a rollup blob so one very long tail cannot make it unbounded.
const KEEP = 200

type Rollup = {
  human: number
  bot: number
  paths: Record<string, number>
  referrers: Record<string, number>
}

const empty = (): Rollup => ({ human: 0, bot: 0, paths: {}, referrers: {} })

function trim(counts: Record<string, number>, keep = KEEP): Record<string, number> {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, keep)
  return Object.fromEntries(entries)
}

function merge(into: Rollup, from: Rollup): void {
  into.human += from.human
  into.bot += from.bot
  for (const [k, v] of Object.entries(from.paths)) into.paths[k] = (into.paths[k] ?? 0) + v
  for (const [k, v] of Object.entries(from.referrers)) into.referrers[k] = (into.referrers[k] ?? 0) + v
}

async function readRaw(store: ReturnType<typeof getStore>, day: string): Promise<Rollup> {
  const out = empty()
  const { blobs } = await store.list({ prefix: `${day}/` })

  // Fetched in batches: a day with thousands of views would otherwise open
  // thousands of sockets at once and the function would fall over.
  const BATCH = 50
  for (let i = 0; i < blobs.length; i += BATCH) {
    const slice = blobs.slice(i, i + BATCH)
    const values = await Promise.all(
      slice.map((b) =>
        store.get(b.key, { type: 'json' }).catch(() => null) as Promise<
          { p?: string; r?: string; b?: boolean } | null
        >,
      ),
    )

    for (const v of values) {
      if (!v) continue
      if (v.b) { out.bot++; continue }
      out.human++
      const path = v.p || '/'
      out.paths[path] = (out.paths[path] ?? 0) + 1
      if (v.r) out.referrers[v.r] = (out.referrers[v.r] ?? 0) + 1
    }
  }

  return out
}

async function dayRollup(
  store: ReturnType<typeof getStore>,
  day: string,
  today: string,
): Promise<Rollup> {
  if (day >= today) return readRaw(store, day)

  const cached = (await store.get(`rollup/${day}`, { type: 'json' }).catch(() => null)) as Rollup | null
  if (cached && typeof cached.human === 'number') return cached

  const fresh = await readRaw(store, day)
  fresh.paths = trim(fresh.paths)
  fresh.referrers = trim(fresh.referrers)

  // A failed cache write must not fail the read.
  await store.setJSON(`rollup/${day}`, fresh).catch(() => {})
  return fresh
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

export default async (req: Request) => {
  const url = new URL(req.url)
  const days = Math.min(MAX_DAYS, Math.max(1, Number(url.searchParams.get('days')) || DEFAULT_DAYS))

  const store = getStore('pageviews')
  const today = new Date().toISOString().slice(0, 10)

  const wanted: string[] = []
  for (let i = 0; i < days; i++) {
    wanted.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10))
  }

  const rollups = await Promise.all(wanted.map((day) => dayRollup(store, day, today)))

  const byDay: Record<string, { human: number; bot: number }> = {}
  const total = empty()

  wanted.forEach((day, i) => {
    byDay[day] = { human: rollups[i].human, bot: rollups[i].bot }
    merge(total, rollups[i])
  })

  if (url.searchParams.get('format') === 'json') {
    return new Response(
      JSON.stringify({
        days: byDay,
        paths: trim(total.paths, 100),
        referrers: trim(total.referrers, 100),
        human: total.human,
        bot: total.bot,
      }, null, 2),
      { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } },
    )
  }

  const top = (m: Record<string, number>, n: number) =>
    Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n)

  const rows = (entries: [string, number][]) =>
    entries.map(([k, v]) => `<tr><td>${esc(k)}</td><td align="right">${v}</td></tr>`).join('') ||
    '<tr><td colspan="2">Nothing yet.</td></tr>'

  const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">
<title>Pageviews</title>
<style>
  body{font:13px/1.5 Arial,Helvetica,sans-serif;color:#000;background:#fff;margin:0;padding:28px;max-width:900px}
  h1{font-size:18px;margin:0 0 4px}h2{font-size:13px;margin:24px 0 6px}
  p{color:#666;margin:0 0 12px}
  table{border-collapse:collapse;width:100%}
  th,td{border:1pt solid #000;padding:4px 8px;text-align:left}
</style></head><body>
<h1>Pageviews</h1>
<p>Last ${days} days. ${total.human} human, ${total.bot} bot. Counted by this site's own beacon, which sets no cookies.</p>
<h2>By day</h2>
<table><tr><th>Day</th><th align="right">Human</th><th align="right">Bot</th></tr>
${wanted.map((d) => `<tr><td>${d}</td><td align="right">${byDay[d].human}</td><td align="right">${byDay[d].bot}</td></tr>`).join('')}
</table>
<h2>Top pages</h2><table><tr><th>Path</th><th align="right">Views</th></tr>${rows(top(total.paths, 25))}</table>
<h2>Referrers</h2><table><tr><th>Host</th><th align="right">Views</th></tr>${rows(top(total.referrers, 25))}</table>
</body></html>`

  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
}
