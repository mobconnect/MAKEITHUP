import { RetailerKey, RetailerLink, ProductCategory } from '../types';

export interface RetailerInfo {
  key: RetailerKey;
  name: string;
  shortName: string;
  domain: string;
  homeUrl: string;
  searchUrlTemplate: string;
  accentColor: string; // Tailwind color class or hex
  badgeBg: string;
  badgeText: string;
  categoryAffinity: ProductCategory[];
  region: 'Global' | 'US' | 'AU' | 'International';
  description: string;
}

export const MAJOR_RETAILERS: Record<RetailerKey, RetailerInfo> = {
  bunnings: {
    key: 'bunnings',
    name: 'Bunnings Warehouse',
    shortName: 'Bunnings',
    domain: 'bunnings.com.au',
    homeUrl: 'https://www.bunnings.com.au',
    searchUrlTemplate: 'https://www.bunnings.com.au/search/products?q={query}',
    accentColor: '#00593c',
    badgeBg: 'bg-emerald-900',
    badgeText: 'text-emerald-100',
    categoryAffinity: ['homewares', 'decor', 'kitchen'],
    region: 'AU',
    description: 'Hardware, home improvement, storage, kitchen fixtures & outdoor living.'
  },
  big_w: {
    key: 'big_w',
    name: 'BIG W',
    shortName: 'Big W',
    domain: 'bigw.com.au',
    homeUrl: 'https://www.bigw.com.au',
    searchUrlTemplate: 'https://www.bigw.com.au/search?text={query}',
    accentColor: '#00529b',
    badgeBg: 'bg-sky-800',
    badgeText: 'text-sky-100',
    categoryAffinity: ['makeup', 'skincare', 'homewares', 'kitchen', 'decor'],
    region: 'AU',
    description: 'Department store essentials, beauty, home goods & kitchenware.'
  },
  costco: {
    key: 'costco',
    name: 'Costco Wholesale',
    shortName: 'Costco',
    domain: 'costco.com',
    homeUrl: 'https://www.costco.com',
    searchUrlTemplate: 'https://www.costco.com/CatalogSearch?keyword={query}',
    accentColor: '#005daa',
    badgeBg: 'bg-blue-800',
    badgeText: 'text-blue-100',
    categoryAffinity: ['skincare', 'homewares', 'kitchen', 'decor'],
    region: 'Global',
    description: 'Bulk wholesale luxury cookware, premium skincare & quality home essentials.'
  },
  walmart: {
    key: 'walmart',
    name: 'Walmart',
    shortName: 'Walmart',
    domain: 'walmart.com',
    homeUrl: 'https://www.walmart.com',
    searchUrlTemplate: 'https://www.walmart.com/search?q={query}',
    accentColor: '#0071dc',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    categoryAffinity: ['makeup', 'skincare', 'homewares', 'kitchen', 'decor'],
    region: 'US',
    description: 'Broad selection of beauty, kitchen appliances, and home decor.'
  },
  sephora: {
    key: 'sephora',
    name: 'Sephora',
    shortName: 'Sephora',
    domain: 'sephora.com',
    homeUrl: 'https://www.sephora.com',
    searchUrlTemplate: 'https://www.sephora.com/search?keyword={query}',
    accentColor: '#000000',
    badgeBg: 'bg-slate-900',
    badgeText: 'text-pink-200',
    categoryAffinity: ['makeup', 'skincare'],
    region: 'Global',
    description: 'Prestige makeup, high-performance skincare & fragrance authority.'
  },
  kmart: {
    key: 'kmart',
    name: 'Kmart',
    shortName: 'Kmart',
    domain: 'kmart.com.au',
    homeUrl: 'https://www.kmart.com.au',
    searchUrlTemplate: 'https://www.kmart.com.au/search/?searchTerm={query}',
    accentColor: '#e31b23',
    badgeBg: 'bg-rose-700',
    badgeText: 'text-white',
    categoryAffinity: ['homewares', 'kitchen', 'decor', 'makeup', 'skincare'],
    region: 'AU',
    description: 'On-trend aesthetic home decor, affordable kitchen tools & everyday beauty.'
  },
  ikea: {
    key: 'ikea',
    name: 'IKEA',
    shortName: 'IKEA',
    domain: 'ikea.com',
    homeUrl: 'https://www.ikea.com',
    searchUrlTemplate: 'https://www.ikea.com/us/en/search/?q={query}',
    accentColor: '#0058a3',
    badgeBg: 'bg-amber-700',
    badgeText: 'text-amber-100',
    categoryAffinity: ['homewares', 'decor', 'kitchen'],
    region: 'Global',
    description: 'Scandinavian minimalist furniture, kitchen storage & design aesthetics.'
  },
  sams_club: {
    key: 'sams_club',
    name: "Sam's Club",
    shortName: "Sam's",
    domain: 'samsclub.com',
    homeUrl: 'https://www.samsclub.com',
    searchUrlTemplate: 'https://www.samsclub.com/s/{query}',
    accentColor: '#0067a0',
    badgeBg: 'bg-cyan-900',
    badgeText: 'text-cyan-100',
    categoryAffinity: ['kitchen', 'homewares', 'skincare'],
    region: 'US',
    description: 'Club savings, multi-pack personal care, kitchen cookware & appliances.'
  },
  target: {
    key: 'target',
    name: 'Target',
    shortName: 'Target',
    domain: 'target.com',
    homeUrl: 'https://www.target.com',
    searchUrlTemplate: 'https://www.target.com/s?searchTerm={query}',
    accentColor: '#cc0000',
    badgeBg: 'bg-red-700',
    badgeText: 'text-white',
    categoryAffinity: ['makeup', 'skincare', 'homewares', 'kitchen', 'decor'],
    region: 'Global',
    description: 'Curated beauty aisles, designer home collaborations & modern living.'
  },
  ulta: {
    key: 'ulta',
    name: 'Ulta Beauty',
    shortName: 'Ulta',
    domain: 'ulta.com',
    homeUrl: 'https://www.ulta.com',
    searchUrlTemplate: 'https://www.ulta.com/search?text={query}',
    accentColor: '#e0592a',
    badgeBg: 'bg-orange-700',
    badgeText: 'text-orange-100',
    categoryAffinity: ['makeup', 'skincare'],
    region: 'US',
    description: 'Mass & prestige cosmetics, hair care, skincare & salon beauty.'
  },
  amazon: {
    key: 'amazon',
    name: 'Amazon',
    shortName: 'Amazon',
    domain: 'amazon.com',
    homeUrl: 'https://www.amazon.com',
    searchUrlTemplate: 'https://www.amazon.com/s?k={query}',
    accentColor: '#ff9900',
    badgeBg: 'bg-amber-900',
    badgeText: 'text-amber-100',
    categoryAffinity: ['makeup', 'skincare', 'homewares', 'kitchen', 'decor'],
    region: 'Global',
    description: 'Fast delivery, verified reviews and global product selection.'
  },
  mecca: {
    key: 'mecca',
    name: 'MECCA',
    shortName: 'Mecca',
    domain: 'mecca.com',
    homeUrl: 'https://www.mecca.com',
    searchUrlTemplate: 'https://www.mecca.com/search?q={query}',
    accentColor: '#000000',
    badgeBg: 'bg-purple-950',
    badgeText: 'text-pink-200',
    categoryAffinity: ['makeup', 'skincare'],
    region: 'AU',
    description: 'Luxury Australian & international beauty curation.'
  },
  williams_sonoma: {
    key: 'williams_sonoma',
    name: 'Williams Sonoma',
    shortName: 'Williams-Sonoma',
    domain: 'williams-sonoma.com',
    homeUrl: 'https://www.williams-sonoma.com',
    searchUrlTemplate: 'https://www.williams-sonoma.com/search/results.html?words={query}',
    accentColor: '#1d2327',
    badgeBg: 'bg-stone-900',
    badgeText: 'text-amber-200',
    categoryAffinity: ['kitchen', 'homewares'],
    region: 'Global',
    description: 'Gourmet kitchenware, French enameled cast iron & premium tableware.'
  },
  other: {
    key: 'other',
    name: 'Direct Brand Website',
    shortName: 'Direct',
    domain: 'official-brand.com',
    homeUrl: 'https://google.com',
    searchUrlTemplate: 'https://www.google.com/search?q={query}',
    accentColor: '#581c87',
    badgeBg: 'bg-purple-900',
    badgeText: 'text-purple-100',
    categoryAffinity: ['makeup', 'skincare', 'homewares', 'kitchen', 'decor'],
    region: 'Global',
    description: 'Official brand flagship store or authorized boutique.'
  }
};

export const MAJOR_RETAILERS_LIST = Object.values(MAJOR_RETAILERS);

/**
 * Generate a direct search URL for a given retailer and product query.
 */
export function getRetailerSearchUrl(retailerKey: RetailerKey | string, productName: string, brand?: string): string {
  const info = MAJOR_RETAILERS[retailerKey as RetailerKey] || MAJOR_RETAILERS.other;
  const fullQuery = encodeURIComponent(`${brand ? brand + ' ' : ''}${productName}`.trim());
  return info.searchUrlTemplate.replace('{query}', fullQuery);
}

/**
 * Extract clean domain name from a full URL (e.g., "https://www.bunnings.com.au/product/..." -> "bunnings.com.au").
 */
export function extractDomainFromUrl(url?: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0] || url;
  }
}

/**
 * Detect retailer key from a given URL or store name.
 */
export function detectRetailerKeyFromUrlOrName(input?: string): RetailerKey {
  if (!input) return 'other';
  const low = input.toLowerCase();
  
  if (low.includes('bunning')) return 'bunnings';
  if (low.includes('big w') || low.includes('bigw')) return 'big_w';
  if (low.includes('costco')) return 'costco';
  if (low.includes('walmart')) return 'walmart';
  if (low.includes('sephora')) return 'sephora';
  if (low.includes('kmart')) return 'kmart';
  if (low.includes('ikea')) return 'ikea';
  if (low.includes('sam') || low.includes("sam's") || low.includes('samsclub')) return 'sams_club';
  if (low.includes('target')) return 'target';
  if (low.includes('ulta')) return 'ulta';
  if (low.includes('amazon')) return 'amazon';
  if (low.includes('mecca')) return 'mecca';
  if (low.includes('williams-sonoma') || low.includes('williams sonoma')) return 'williams_sonoma';
  
  return 'other';
}

/**
 * Generate standard multi-retailer links for a product based on its category and name.
 */
export function buildProductRetailerLinks(
  productName: string,
  brand: string,
  category: ProductCategory,
  primaryRetailerKey?: RetailerKey | string,
  explicitSourceUrl?: string,
  basePrice: number = 0
): RetailerLink[] {
  const primaryKey = (primaryRetailerKey as RetailerKey) || detectRetailerKeyFromUrlOrName(explicitSourceUrl) || 'sephora';
  const primaryInfo = MAJOR_RETAILERS[primaryKey] || MAJOR_RETAILERS.other;

  const links: RetailerLink[] = [];

  // Primary link
  links.push({
    retailerKey: primaryKey,
    name: primaryInfo.name,
    url: explicitSourceUrl || getRetailerSearchUrl(primaryKey, productName, brand),
    domain: explicitSourceUrl ? extractDomainFromUrl(explicitSourceUrl) : primaryInfo.domain,
    price: basePrice,
    inStock: true,
    isPrimary: true
  });

  // Pick 3-5 complementary major retailers based on category
  const candidateKeys: RetailerKey[] = [];
  if (category === 'makeup' || category === 'skincare') {
    candidateKeys.push('sephora', 'ulta', 'mecca', 'walmart', 'big_w', 'target', 'costco', 'amazon');
  } else if (category === 'kitchen') {
    candidateKeys.push('costco', 'williams_sonoma', 'walmart', 'ikea', 'sams_club', 'bunnings', 'kmart', 'big_w');
  } else if (category === 'homewares' || category === 'decor') {
    candidateKeys.push('ikea', 'kmart', 'big_w', 'bunnings', 'target', 'costco', 'walmart', 'sams_club');
  }

  for (const key of candidateKeys) {
    if (key !== primaryKey && links.length < 6) {
      const info = MAJOR_RETAILERS[key];
      if (info) {
        // slight deterministic variation for price comparison illustration
        const priceOffset = key === 'costco' || key === 'sams_club' || key === 'kmart' || key === 'big_w'
          ? Math.max(1, Math.round(basePrice * 0.92))
          : key === 'williams_sonoma' || key === 'mecca' || key === 'sephora'
          ? Math.round(basePrice * 1.05)
          : basePrice;

        links.push({
          retailerKey: key,
          name: info.name,
          url: getRetailerSearchUrl(key, productName, brand),
          domain: info.domain,
          price: priceOffset,
          inStock: true,
          isPrimary: false
        });
      }
    }
  }

  return links;
}
