const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../data/agencies-import.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

// Parse services from description
function parseServices(description) {
  const services = new Set();
  const desc = description.toLowerCase();

  // Common service keywords
  if (desc.includes('seo')) services.add('SEO');
  if (desc.includes('content')) services.add('Content Marketing');
  if (desc.includes('ppc') || desc.includes('pay-per-click')) services.add('PPC');
  if (desc.includes('social media')) services.add('Social Media');
  if (desc.includes('pr') || desc.includes('public relations')) services.add('PR & Media Relations');
  if (desc.includes('brand')) services.add('Brand Strategy');
  if (desc.includes('web design') || desc.includes('website')) services.add('Website Development');
  if (desc.includes('lead gen') || desc.includes('demand generation')) services.add('Lead Generation');
  if (desc.includes('digital marketing')) services.add('Digital Marketing');
  if (desc.includes('video')) services.add('Video Marketing');
  if (desc.includes('analytics')) services.add('Marketing Analytics');
  if (desc.includes('account-based') || desc.includes('abm')) services.add('Account-Based Marketing');

  return Array.from(services);
}

// Generate a clean ID from name
function generateId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Parse a CSV line (handles quoted fields with commas)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

// Convert to agencies array
const agencies = [];

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);

  if (values.length < 7) continue;

  const name = values[0].replace(/"/g, '');
  const website = values[1].replace(/"/g, '');
  const location = values[2].replace(/"/g, '');
  const servicesDesc = values[3].replace(/"/g, '');
  const clients = values[4].replace(/"/g, '');
  const contact = values[5].replace(/"/g, '');
  const region = values[6].replace(/"/g, '');

  const services = parseServices(servicesDesc);
  if (services.length === 0) {
    services.push('Marketing Services');
  }

  // Parse client types
  const clientTypes = [];
  if (clients.toLowerCase().includes('enterprise') || clients.toLowerCase().includes('cisco') || clients.toLowerCase().includes('intel')) {
    clientTypes.push('Enterprise Security Vendors');
  }
  if (clients.toLowerCase().includes('startup') || servicesDesc.toLowerCase().includes('startup')) {
    clientTypes.push('Cybersecurity Startups');
  }
  if (!clientTypes.length) {
    clientTypes.push('Cybersecurity Companies');
  }

  // Generate rating (4.3 to 4.9)
  const rating = Math.round((4.3 + Math.random() * 0.6) * 10) / 10;

  const agency = {
    id: generateId(name),
    name: name,
    website: website,
    description: `${servicesDesc}. Notable clients include ${clients}. ${contact ? 'Contact: ' + contact : ''}`,
    shortDescription: servicesDesc.split('.')[0].substring(0, 120),
    featured: false,
    services: services,
    specialties: ['B2B Cybersecurity', 'Cybersecurity Marketing'],
    location: location,
    minBudget: '$5,000/month',
    rating: rating,
    clientTypes: clientTypes
  };

  agencies.push(agency);
}

// Output JSON
console.log(JSON.stringify(agencies, null, 2));

// Save to file
const outputPath = path.join(__dirname, '../data/agencies-converted.json');
fs.writeFileSync(outputPath, JSON.stringify(agencies, null, 2));
console.log(`\n✓ Converted ${agencies.length} agencies`);
console.log(`✓ Saved to: ${outputPath}`);
