/**
 * Derives a Clearbit logo URL from an agency's website URL.
 * Returns the URL string for use with Next.js Image or <img>.
 */
export function getAgencyLogoUrl(websiteUrl: string): string {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, '');
    return `https://logo.clearbit.com/${hostname}`;
  } catch {
    return '';
  }
}
