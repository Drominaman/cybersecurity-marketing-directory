# Cybersecurity Marketing Agencies Directory

A modern, SEO-optimized directory website for cybersecurity marketing agencies built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Featured Agency Showcase** - Highlight your agency at the top of the directory
- **Agency Listings** - Grid view of all cybersecurity marketing agencies
- **Search & Filter** - Find agencies by name, description, or services
- **Comparison Table** - Side-by-side comparison of all agencies
- **SEO Optimized** - Meta tags, schema.org markup, sitemap, and robots.txt
- **Responsive Design** - Works beautifully on all devices
- **Fast Performance** - Built with Next.js for optimal speed

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd cybersecurity-marketing-directory
```

2. Install dependencies (already done during setup):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Updating Agency Data

All agency data is stored in `/data/agencies.json`. To add or update agencies:

1. Open `/data/agencies.json`
2. Add or edit agency entries following this structure:

```json
{
  "id": "unique-agency-id",
  "name": "Agency Name",
  "website": "https://agency.com",
  "description": "Full description of the agency...",
  "shortDescription": "Brief one-line description",
  "logo": "/logos/agency-logo.png",
  "featured": false,
  "editorsPick": false,
  "services": ["SEO", "Content Marketing", "PPC"],
  "specialties": ["B2B Cybersecurity", "Enterprise Security"],
  "location": "United States",
  "yearFounded": 2020,
  "teamSize": "10-25",
  "minBudget": "$5,000/month",
  "rating": 4.8,
  "clientTypes": ["Cybersecurity Startups"],
  "caseStudies": [
    {
      "client": "Company Name",
      "results": "150% increase in leads",
      "description": "Brief description of work done"
    }
  ]
}
```

### Setting Your Featured Agency

To make an agency the featured/editor's choice (shown at the top):

1. Set `"featured": true`
2. Set `"editorsPick": true`
3. Fill out all optional fields (caseStudies, specialties, etc.) for maximum impact

**Note:** Only ONE agency should have both `featured` and `editorsPick` set to true.

## Customization

### Update Domain/URLs

Search and replace `cybersecuritymarketingagencies.com` with your actual domain in:
- `/app/layout.tsx` - metadata
- `/app/sitemap.ts` - sitemap URLs
- `/app/robots.ts` - robots.txt sitemap reference

### Styling

The site uses Tailwind CSS. To customize:
- Global styles: `/app/globals.css`
- Component styles: Inline Tailwind classes in component files
- Color scheme: Update Tailwind classes throughout components

### SEO Content

Update the SEO content section in `/app/page.tsx` (around line 154) to add your own content for ranking.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

To test the production build locally:
```bash
npm run build && npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Node.js

## Project Structure

```
cybersecurity-marketing-directory/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt configuration
├── components/
│   ├── FeaturedAgency.tsx  # Featured agency showcase
│   ├── AgencyCard.tsx      # Agency card component
│   └── ComparisonTable.tsx # Comparison table
├── data/
│   └── agencies.json       # Agency data (EDIT THIS)
├── lib/
│   └── agencies.ts         # Helper functions
├── types/
│   └── agency.ts           # TypeScript interfaces
└── public/
    └── logos/              # Agency logos (add here)
```

## Adding Agency Logos

1. Add logo images to `/public/logos/`
2. Reference in agencies.json: `"logo": "/logos/your-agency.png"`

## SEO Tips

1. **Update metadata** in `/app/layout.tsx` with your target keywords
2. **Add quality content** to the SEO section on the homepage
3. **Get backlinks** from the agencies you list
4. **Create blog content** (optional) targeting long-tail keywords
5. **Submit sitemap** to Google Search Console after deployment

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This is a custom project. Modify and use as needed.
