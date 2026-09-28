// rel for a link that leaves the estate.
//
// Since 2026-09-28 nothing off the estate gets a followed link. Paid
// placements carry rel="sponsored" at their own call sites, and every other
// outbound link (vendor sites, sources, analyst research, social profiles)
// is nofollow. This replaced the 2026-09-20 rule, which nofollowed review
// aggregators only and left vendor sites and analyst research followed.
//
// Links between the estate's own sites stay followed.

const ESTATE = [
  'cybervendorguide.com', 'pentestingproviders.com', 'geoagencies.com',
  'cybersecuritymarketingagencies.com', 'insidecybersec.com',
  'cybersecstats.com', 'akeylessalternative.com', 'contentvisit.com',
];

export function isEstate(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    return ESTATE.some(d => host === d || host.endsWith('.' + d));
  } catch {
    // Relative URL: internal.
    return true;
  }
}

export function externalRel(url: string): string {
  return isEstate(url) ? 'noopener noreferrer' : 'nofollow noopener noreferrer';
}
