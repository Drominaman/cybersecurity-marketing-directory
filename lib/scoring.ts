// The published scoring rubric. This is the single source of truth consumed by
// /methodology, the best-agency guide, and llms.txt/llms-full.txt. Scores are
// assigned per the bands below and stored per agency in data/agencies.json
// (rating + scoreBreakdown). Paid placement (Featured/Verified tiers) never
// affects any score, badge, or position: rankings are earned, not sold.

export interface ScoringDimension {
  key: string;
  name: string;
  weight: number; // fraction of the overall score
  scoredFrom: string;
  bands: { score: number; means: string }[];
}

export const SCORING_DIMENSIONS: ScoringDimension[] = [
  {
    key: 'clientFeedback',
    name: 'Verified client feedback',
    weight: 0.3,
    scoredFrom:
      'Verified reviews on independent platforms (Clutch, G2, DesignRush) linked from the agency profile: volume, rating, and recency.',
    bands: [
      { score: 5, means: 'Multiple verified reviews across more than one independent platform, with named reviewers' },
      { score: 4, means: 'Verified reviews on one independent platform' },
      { score: 3, means: 'An active profile on an independent review platform, but few or no published reviews' },
      { score: 2, means: 'Testimonials on the agency’s own site only' },
      { score: 1, means: 'No independent review presence we could verify' },
    ],
  },
  {
    key: 'documentedResults',
    name: 'Documented results',
    weight: 0.25,
    scoredFrom:
      'Published case studies with named clients and concrete metrics, plus publicly named client rosters.',
    bands: [
      { score: 5, means: 'Multiple named-client case studies with concrete, checkable metrics' },
      { score: 4, means: 'At least one named-client case study with concrete metrics' },
      { score: 3, means: 'Named clients on the record, but no published metrics' },
      { score: 2, means: 'Anonymous case studies or results claims without named clients' },
      { score: 1, means: 'No documented results we could verify' },
    ],
  },
  {
    key: 'cybersecurityFocus',
    name: 'Cybersecurity focus',
    weight: 0.2,
    scoredFrom:
      'How much of the agency’s practice is cybersecurity work: exclusive, a dedicated named practice, or one sector among several.',
    bands: [
      { score: 5, means: 'Works exclusively with cybersecurity and security-adjacent companies' },
      { score: 4, means: 'A dedicated, named cybersecurity practice inside a broader technology agency' },
      { score: 3, means: 'Cybersecurity is a stated core sector with a sustained client track record' },
      { score: 2, means: 'Some cybersecurity clients, but security is not a stated focus' },
      { score: 1, means: 'No meaningful cybersecurity track record' },
    ],
  },
  {
    key: 'serviceBreadth',
    name: 'Service breadth and delivery',
    weight: 0.15,
    scoredFrom:
      'Range of services delivered in-house and how well they join up, including readiness for AI-driven discovery (GEO).',
    bands: [
      { score: 5, means: 'Five or more integrated services in-house, including AI visibility / GEO capability' },
      { score: 4, means: 'Four or more integrated services in-house' },
      { score: 3, means: 'A focused specialist offering executed deeply in one or two channels' },
      { score: 2, means: 'A narrow offering with limited integration' },
      { score: 1, means: 'Single service, no integration' },
    ],
  },
  {
    key: 'marketPresence',
    name: 'Market presence and longevity',
    weight: 0.1,
    scoredFrom:
      'Years in operation, team scale, industry programmes run, awards, and geographic reach.',
    bands: [
      { score: 5, means: 'A decade or more of operation plus industry programmes, awards, or multi-region reach' },
      { score: 4, means: 'Established operation with meaningful scale or reach' },
      { score: 3, means: 'An established boutique with a stable track record' },
      { score: 2, means: 'Young or small with limited public footprint' },
      { score: 1, means: 'Minimal verifiable market presence' },
    ],
  },
];

export const CHANNELS = [
  'SEO',
  'AI Visibility',
  'Content Marketing',
  'PPC',
  'PR & Media Relations',
  'Lead Generation',
] as const;

// Channel-pick eligibility: an agency competes for a channel only when that
// service is one of its three primary listed services. This keeps a channel
// pick with agencies for which the channel is a core offering, rather than
// handing every channel to whichever agency has the highest overall score.
export const CHANNEL_CORE_SERVICE_LIMIT = 3;

export function isChannelEligible(services: string[], channel: string): boolean {
  return services
    .slice(0, CHANNEL_CORE_SERVICE_LIMIT)
    .some(s => s.toLowerCase() === channel.toLowerCase());
}

export function overallFromBreakdown(breakdown: Record<string, number>): number {
  const total = SCORING_DIMENSIONS.reduce(
    (sum, d) => sum + (breakdown[d.key] ?? 0) * d.weight,
    0
  );
  return Math.round(total * 10) / 10;
}
