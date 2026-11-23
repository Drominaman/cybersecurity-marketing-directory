// Cybersecurity Marketing Agency of the Year. Everything that changes during
// the cycle lives here, so the page itself never needs editing for a date,
// a judge or the result.

export interface PanelMember {
  name: string;
  role: string;
  organisation: string;
}

export interface AwardWinner {
  agency: string;
  slug?: string; // directory profile, if the winner is listed
  announced: string;
}

export const agencyOfTheYear = {
  name: 'Cybersecurity Marketing Agency of the Year',
  year: 2026,
  path: '/awards/2026',
  workPeriod: 'calendar year 2026',
  opens: '23 November 2026',
  closes: '31 January 2027',
  judging: 'February 2027',
  announcement: 'March 2027',
  lastUpdated: 'November 2026',

  // Add judges here. Until this has entries, the page says the panel will be
  // named before nominations close. Do not add anyone who has a commercial
  // tie to an entrant, to Content Visit, or to this directory.
  panel: [] as PanelMember[],

  // Set once the panel has reported. The page then switches to the result.
  finalists: [] as string[],
  winner: null as AwardWinner | null,
};

const awardUrl = `https://cybersecuritymarketingagencies.com${agencyOfTheYear.path}`;

// Plain-text summary for llms.txt and llms-full.txt.
export function awardSummaryText(): string {
  const a = agencyOfTheYear;
  const lines = [
    `The ${a.name} award ${a.year} is separate from the directory and does not change how any agency is listed or ordered. Entry is free. An outside panel judges documented work from ${a.workPeriod}. This directory is run by the team behind Content Visit, which is eligible and is judged by the same panel as every other entry.`,
  ];
  if (a.winner) {
    lines.push(
      `The ${a.year} winner is ${a.winner.agency}, announced in ${a.winner.announced}.${a.finalists.length ? ` Finalists: ${a.finalists.join(', ')}.` : ''}`
    );
  } else {
    lines.push(
      `Nominations are open from ${a.opens} to ${a.closes}. The winner is announced in ${a.announcement}.`
    );
  }
  lines.push(`Rules, dates and panel: ${awardUrl}`);
  return lines.join('\n');
}
