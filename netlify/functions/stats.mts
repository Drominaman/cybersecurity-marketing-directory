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
  // Where each page's referred visits came from. Every raw hit already
  // carries both its path and its referrer host, so this is the same data
  // cross-tabulated rather than anything new being collected.
  pathReferrers: Record<string, Record<string, number>>
  // Visits: human views a v2 client marked as the first of a visit. Only
  // meaningful on a day where v2 clients sent (nearly) every view, which
  // visitsTracked records; a day cached before this field existed has neither.
  visits?: number
  v2?: number
  visitsTracked?: boolean
  // Views moved from human to bot because one visitor hash passed
  // MAX_VIEWS_PER_VISITOR_DAY that day. Zero on days before hashes existed
  // (2026-10-21), which therefore still include crawlers posing as browsers.
  capped?: number
}

// A single visitor contributing more than this many views in a day is treated
// as a crawler with a browser user agent. Cyber Vendor Guide's counter uses
// the same figure: a person rarely reads more than six pages of one of these
// sites in a day; a crawl always does.
const MAX_VIEWS_PER_VISITOR_DAY = 6

const empty = (): Rollup => ({ human: 0, bot: 0, paths: {}, referrers: {}, pathReferrers: {}, visits: 0, v2: 0, capped: 0 })

// The cross-tab is the one part that could grow with the square of the site,
// so it is bounded on both axes.
const PATHS_WITH_REFS = 60
const REFS_PER_PATH = 12

function trimNested(m: Record<string, Record<string, number>>): Record<string, Record<string, number>> {
  const ranked = Object.entries(m)
    .map(([path, refs]) => ({ path, refs, total: Object.values(refs).reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, PATHS_WITH_REFS)
  return Object.fromEntries(ranked.map(({ path, refs }) => [path, trim(refs, REFS_PER_PATH)]))
}

function trim(counts: Record<string, number>, keep = KEEP): Record<string, number> {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, keep)
  return Object.fromEntries(entries)
}

function merge(into: Rollup, from: Rollup): void {
  into.human += from.human
  into.bot += from.bot
  into.capped = (into.capped ?? 0) + (from.capped ?? 0)
  for (const [k, v] of Object.entries(from.paths)) into.paths[k] = (into.paths[k] ?? 0) + v
  for (const [k, v] of Object.entries(from.referrers)) into.referrers[k] = (into.referrers[k] ?? 0) + v
  // Guarded: rollups cached before this field existed have no pathReferrers.
  for (const [path, refs] of Object.entries(from.pathReferrers ?? {})) {
    const target = (into.pathReferrers[path] ??= {})
    for (const [k, v] of Object.entries(refs)) target[k] = (target[k] ?? 0) + v
  }
}

async function readRaw(store: ReturnType<typeof getStore>, day: string): Promise<Rollup> {
  const out = empty()
  const { blobs } = await store.list({ prefix: `${day}/` })
  const hits: ({ p?: string; r?: string; b?: boolean; v?: number; e?: number; h?: string } | null)[] = []

  // Fetched in batches: a day with thousands of views would otherwise open
  // thousands of sockets at once and the function would fall over.
  const BATCH = 50
  for (let i = 0; i < blobs.length; i += BATCH) {
    const slice = blobs.slice(i, i + BATCH)
    const values = await Promise.all(
      slice.map((b) =>
        store.get(b.key, { type: 'json' }).catch(() => null) as Promise<
          { p?: string; r?: string; b?: boolean; v?: number; e?: number; h?: string } | null
        >,
      ),
    )
    hits.push(...values)
  }

  // Views per visitor hash, to find the ones past the daily cap.
  const perVisitor: Record<string, number> = {}
  for (const v of hits) if (v && !v.b && v.h) perVisitor[v.h] = (perVisitor[v.h] ?? 0) + 1

  for (const v of hits) {
    if (!v) continue
    if (v.b) { out.bot++; continue }
    if (v.h && perVisitor[v.h] > MAX_VIEWS_PER_VISITOR_DAY) { out.bot++; out.capped = (out.capped ?? 0) + 1; continue }
    out.human++
    if (v.v === 2) out.v2 = (out.v2 ?? 0) + 1
    if (v.e) out.visits = (out.visits ?? 0) + 1
    const path = v.p || '/'
    out.paths[path] = (out.paths[path] ?? 0) + 1
    if (v.r) {
      out.referrers[v.r] = (out.referrers[v.r] ?? 0) + 1
      const perPath = (out.pathReferrers[path] ??= {})
      perPath[v.r] = (perPath[v.r] ?? 0) + 1
    }
  }

  // A day counts for visits only once v2 clients sent at least 95% of its
  // views. The day of a deploy, and any day old tabs were still open, falls
  // short and is left out rather than counted low.
  out.visitsTracked = out.human > 0 && (out.v2 ?? 0) >= out.human * 0.95
  return out
}

async function dayRollup(
  store: ReturnType<typeof getStore>,
  day: string,
  today: string,
): Promise<Rollup> {
  if (day >= today) return readRaw(store, day)

  // rollup2: the v1 key holds rollups written before pathReferrers existed.
  // Raw hit blobs are never deleted, so bumping the key backfills history
  // instead of leaving older days permanently without the cross-tab.
  const cached = (await store.get(`rollup2/${day}`, { type: 'json' }).catch(() => null)) as Rollup | null
  if (cached && typeof cached.human === 'number') return cached

  const fresh = await readRaw(store, day)
  fresh.paths = trim(fresh.paths)
  fresh.referrers = trim(fresh.referrers)
  fresh.pathReferrers = trimNested(fresh.pathReferrers)

  // A failed cache write must not fail the read.
  await store.setJSON(`rollup2/${day}`, fresh).catch(() => {})
  // The day is over and counted: its salt goes, so its visitor hashes can
  // never be recomputed from an IP address.
  await store.delete(`salt/${day}`).catch(() => {})
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
  let visits = 0
  let visitDays = 0

  wanted.forEach((day, i) => {
    byDay[day] = { human: rollups[i].human, bot: rollups[i].bot }
    merge(total, rollups[i])
    if (rollups[i].visitsTracked) {
      visits += rollups[i].visits ?? 0
      visitDays++
    }
  })

  // One page's own daily series, asked for with ?path= (repeatable, up to ten)
  // by the sponsor hub's drill-down pages. Read from the day rollups already
  // fetched above, so it costs nothing extra. A past day's rollup keeps its
  // top KEEP paths, so a page outside that on a given day reads as zero.
  const focus = url.searchParams.getAll('path').filter(Boolean).slice(0, 10)

  if (url.searchParams.get('format') === 'json') {
    return new Response(
      JSON.stringify({
        days: byDay,
        paths: trim(total.paths, 100),
        referrers: trim(total.referrers, 100),
        pathReferrers: trimNested(total.pathReferrers),
        human: total.human,
        bot: total.bot,
        // Of bot, the views reclassified by the per-visitor cap.
        capped: total.capped ?? 0,
        // Visits over the days that tracked them, and how many days that was.
        // Compare visitDays with the length of the range before quoting it.
        visits,
        visitDays,
        ...(focus.length ? {
          pathDays: Object.fromEntries(focus.map((p) => [p, Object.fromEntries(wanted.map((d, i) => [d, rollups[i].paths[p] ?? 0]))])),
          pathRefs: Object.fromEntries(focus.map((p) => [p, trim(total.pathReferrers[p] ?? {}, 25)])),
        } : {}),
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
