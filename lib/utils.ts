/**
 * Derives a logo URL from an agency's website URL using Google's favicon service.
 * Returns the URL string for use with <img> tags.
 */
export function getAgencyLogoUrl(websiteUrl: string): string {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return '';
  }
}
