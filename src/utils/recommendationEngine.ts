import { ProductItem, BrowsingHistoryItem, RecommendedProduct, TasteProfile, ProductCategory } from '../types';
import { DISCOVER_CATALOG, CatalogItem } from '../data/discoverCatalog';

export function computeRecommendations(
  userProducts: ProductItem[],
  browsingHistory: BrowsingHistoryItem[]
): RecommendedProduct[] {
  // Already rated IDs so we don't recommend what they already have
  const ratedNames = new Set(userProducts.map((p) => p.name.toLowerCase()));
  const ratedBrands = new Set(userProducts.map((p) => p.brand.toLowerCase()));

  // 1. Extract Holy Grails (rating >= 4.5 and definitely repurchase)
  const holyGrails = userProducts.filter(
    (p) => p.overallRating >= 4.5 && p.repurchase === 'definitely'
  );

  // 2. Compute Category Affinities
  const categoryStats: Record<ProductCategory, { totalScore: number; count: number; weight: number }> = {
    makeup: { totalScore: 0, count: 0, weight: 1 },
    skincare: { totalScore: 0, count: 0, weight: 1 },
    homewares: { totalScore: 0, count: 0, weight: 1 },
    kitchen: { totalScore: 0, count: 0, weight: 1 },
    decor: { totalScore: 0, count: 0, weight: 1 }
  };

  userProducts.forEach((p) => {
    if (categoryStats[p.category]) {
      const repMultiplier = p.repurchase === 'definitely' ? 1.4 : p.repurchase === 'maybe' ? 1.0 : 0.6;
      categoryStats[p.category].totalScore += p.overallRating * repMultiplier;
      categoryStats[p.category].count += 1;
    }
  });

  // Calculate average category scores
  const categoryAverages: Record<ProductCategory, number> = {
    makeup: 4.0,
    skincare: 4.0,
    homewares: 4.0,
    kitchen: 4.0,
    decor: 4.0
  };

  Object.entries(categoryStats).forEach(([cat, stats]) => {
    if (stats.count > 0) {
      categoryAverages[cat as ProductCategory] = stats.totalScore / stats.count;
    }
  });

  // 3. User Preferred Tags & Dimensions
  const userTagCounts: Record<string, number> = {};
  userProducts.forEach((p) => {
    p.tags?.forEach((t) => {
      userTagCounts[t.toLowerCase()] = (userTagCounts[t.toLowerCase()] || 0) + (p.overallRating >= 4.0 ? 2 : 1);
    });
  });

  // User average dimensions
  const userDimAverage = {
    quality: 0,
    longevity: 0,
    aesthetic: 0,
    value: 0,
    performance: 0
  };

  if (userProducts.length > 0) {
    userProducts.forEach((p) => {
      userDimAverage.quality += p.dimensions.quality;
      userDimAverage.longevity += p.dimensions.longevity;
      userDimAverage.aesthetic += p.dimensions.aesthetic;
      userDimAverage.value += p.dimensions.value;
      userDimAverage.performance += p.dimensions.performance;
    });
    const len = userProducts.length;
    userDimAverage.quality /= len;
    userDimAverage.longevity /= len;
    userDimAverage.aesthetic /= len;
    userDimAverage.value /= len;
    userDimAverage.performance /= len;
  } else {
    userDimAverage.quality = 4.5;
    userDimAverage.longevity = 4.5;
    userDimAverage.aesthetic = 4.5;
    userDimAverage.value = 4.5;
    userDimAverage.performance = 4.5;
  }

  // 4. Browsing History Analysis (Recency weight)
  const browsedCategoryCounts: Record<string, number> = {};
  const browsedBrandCounts: Record<string, number> = {};
  const browsedProductNames: string[] = [];

  const now = Date.now();
  browsingHistory.forEach((h) => {
    browsedProductNames.push(h.productName.toLowerCase());
    const hoursAgo = (now - h.viewedAt) / (1000 * 60 * 60);
    const recencyWeight = Math.max(0.5, 2.0 - (hoursAgo / 24)); // Decay over 24-48 hours
    
    browsedCategoryCounts[h.category] = (browsedCategoryCounts[h.category] || 0) + (h.viewCount * recencyWeight);
    browsedBrandCounts[h.brand.toLowerCase()] = (browsedBrandCounts[h.brand.toLowerCase()] || 0) + (h.viewCount * recencyWeight);
  });

  // 5. Score Discover Catalog Items
  const scoredItems: RecommendedProduct[] = [];

  DISCOVER_CATALOG.forEach((item) => {
    // Skip if already in user rated shelf
    if (ratedNames.has(item.name.toLowerCase())) {
      return;
    }

    let score = 50; // base score
    const reasons: string[] = [];
    let matchType: RecommendedProduct['matchType'] = 'dimension_match';
    let primaryReason = '';

    // A. Category Affinity (+ up to 18 pts)
    const catAvg = categoryAverages[item.category] || 4.0;
    const catScoreBonus = (catAvg / 5.0) * 18;
    score += catScoreBonus;

    // B. Holy Grail Affinity & Twin Matching (+ up to 18 pts)
    const matchingHolyGrail = holyGrails.find((hg) => {
      const sameCategory = hg.category === item.category;
      const tagOverlap = hg.tags?.some((t) => item.tags.some((it) => it.toLowerCase() === t.toLowerCase()));
      return sameCategory || tagOverlap;
    });

    if (matchingHolyGrail) {
      score += 15;
      matchType = 'holy_grail_twin';
      const reason = `Because you loved "${matchingHolyGrail.name}" (${matchingHolyGrail.overallRating.toFixed(1)}★)`;
      reasons.push(reason);
      if (!primaryReason) primaryReason = reason;
    }

    // C. Tag Intersection (+ up to 14 pts)
    let tagMatchCount = 0;
    item.tags.forEach((t) => {
      if (userTagCounts[t.toLowerCase()]) {
        tagMatchCount += userTagCounts[t.toLowerCase()];
      }
    });
    if (tagMatchCount > 0) {
      const tagBonus = Math.min(14, tagMatchCount * 3.5);
      score += tagBonus;
      const matchedTag = item.tags.find((t) => userTagCounts[t.toLowerCase()]);
      if (matchedTag) {
        reasons.push(`Matches your affinity for "${matchedTag}" attributes`);
      }
    }

    // D. Dimension Alignment with user high criteria (+ up to 16 pts)
    const dimDelta = 
      Math.abs(item.dimensions.quality - userDimAverage.quality) +
      Math.abs(item.dimensions.longevity - userDimAverage.longevity) +
      Math.abs(item.dimensions.performance - userDimAverage.performance);
    
    const dimScore = Math.max(0, 16 - (dimDelta * 3));
    score += dimScore;

    if (item.dimensions.quality >= 4.8 && userDimAverage.quality >= 4.5) {
      reasons.push('Exceptional formula/build quality score (4.9★)');
    }

    // E. Browsing History Signal Boost (+ up to 16 pts)
    const browseCategoryScore = browsedCategoryCounts[item.category] || 0;
    const browseBrandScore = browsedBrandCounts[item.brand.toLowerCase()] || 0;

    if (browseCategoryScore > 0 || browseBrandScore > 0) {
      const browseBonus = Math.min(16, (browseCategoryScore * 2.5) + (browseBrandScore * 4));
      score += browseBonus;
      matchType = 'browsing_history';
      const reason = `Inspired by your recent activity in ${item.category}`;
      reasons.push(reason);
      if (!primaryReason) primaryReason = reason;
    }

    // F. Brand Affinity (+ up to 10 pts)
    if (ratedBrands.has(item.brand.toLowerCase())) {
      score += 10;
      matchType = 'rating_affinity';
      const reason = `From ${item.brand}, a brand already in your rated shelf`;
      reasons.push(reason);
      if (!primaryReason) primaryReason = reason;
    }

    // Baseline fallback primary reason if empty
    if (!primaryReason) {
      if (reasons.length > 0) {
        primaryReason = reasons[0];
      } else {
        primaryReason = `Top rated community favorite in ${item.category}`;
        reasons.push(primaryReason);
      }
    }

    // Clamp score to 75% - 99% range for realistic UI feel
    const finalMatchScore = Math.min(99, Math.max(74, Math.round(score)));

    scoredItems.push({
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      subCategory: item.subCategory,
      price: item.price,
      currency: item.currency,
      sourceUrl: item.sourceUrl,
      primaryRetailer: item.primaryRetailer,
      retailers: item.retailers,
      estimatedRating: item.communityRating,
      matchScore: finalMatchScore,
      matchReasons: reasons,
      primaryReason,
      imageUrl: item.imageUrl,
      description: item.description,
      highlights: item.highlights,
      keyDimensions: item.dimensions,
      tags: item.tags,
      matchType
    });
  });

  // Sort by match score descending
  return scoredItems.sort((a, b) => b.matchScore - a.matchScore);
}

export function generateTasteProfile(
  userProducts: ProductItem[],
  browsingHistory: BrowsingHistoryItem[]
): TasteProfile {
  const totalRated = userProducts.length;
  const totalViews = browsingHistory.reduce((acc, h) => acc + h.viewCount, 0);

  // Category breakdown
  const categoryCounts: Record<ProductCategory, number> = {
    makeup: 0,
    skincare: 0,
    homewares: 0,
    kitchen: 0,
    decor: 0
  };

  userProducts.forEach((p) => {
    if (categoryCounts[p.category] !== undefined) {
      categoryCounts[p.category]++;
    }
  });

  const topCategories = Object.entries(categoryCounts)
    .map(([cat, count]) => ({
      category: cat as ProductCategory,
      count,
      percentage: totalRated > 0 ? Math.round((count / totalRated) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  // Favorite Brands
  const brandMap: Record<string, { sum: number; count: number }> = {};
  userProducts.forEach((p) => {
    if (!brandMap[p.brand]) brandMap[p.brand] = { sum: 0, count: 0 };
    brandMap[p.brand].sum += p.overallRating;
    brandMap[p.brand].count += 1;
  });

  const favoriteBrands = Object.entries(brandMap)
    .map(([brand, data]) => ({
      brand,
      avgRating: Number((data.sum / data.count).toFixed(1)),
      count: data.count
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 4);

  // Tags
  const tagCounts: Record<string, number> = {};
  userProducts.forEach((p) => {
    p.tags?.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const topAestheticTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag);

  // Dimensions
  let qualitySum = 0;
  let longevitySum = 0;
  let aestheticSum = 0;
  let valueSum = 0;
  let performanceSum = 0;

  userProducts.forEach((p) => {
    qualitySum += p.dimensions.quality;
    longevitySum += p.dimensions.longevity;
    aestheticSum += p.dimensions.aesthetic;
    valueSum += p.dimensions.value;
    performanceSum += p.dimensions.performance;
  });

  const divisor = totalRated || 1;
  const dimensionAffinities = [
    {
      name: 'Formula & Build Quality',
      score: Number((qualitySum / divisor).toFixed(1)),
      importance: (qualitySum / divisor) >= 4.7 ? ('Very High' as const) : ('High' as const)
    },
    {
      name: 'Longevity & Durability',
      score: Number((longevitySum / divisor).toFixed(1)),
      importance: (longevitySum / divisor) >= 4.7 ? ('Very High' as const) : ('High' as const)
    },
    {
      name: 'Aesthetic & Tactile Finish',
      score: Number((aestheticSum / divisor).toFixed(1)),
      importance: (aestheticSum / divisor) >= 4.6 ? ('Very High' as const) : ('Balanced' as const)
    },
    {
      name: 'Performance & Usability',
      score: Number((performanceSum / divisor).toFixed(1)),
      importance: (performanceSum / divisor) >= 4.7 ? ('Very High' as const) : ('High' as const)
    },
    {
      name: 'Price to Value Ratio',
      score: Number((valueSum / divisor).toFixed(1)),
      importance: 'Balanced' as const
    }
  ];

  const avgSpend = totalRated > 0
    ? Math.round(userProducts.reduce((acc, p) => acc + p.price, 0) / totalRated)
    : 45;

  const holyGrailCount = userProducts.filter(
    (p) => p.overallRating >= 4.5 && p.repurchase === 'definitely'
  ).length;

  // Determine primary vibe
  let primaryVibe = 'Refined Minimalist & Quality Conscious';
  if (topAestheticTags.includes('Dewy') || topAestheticTags.includes('High Pigment')) {
    primaryVibe = 'Dewy Radiance & High-Performance Formulas';
  } else if (topAestheticTags.includes('100% Flax') || topAestheticTags.includes('Matte Glaze')) {
    primaryVibe = 'Warm Tactile Homewares & Organic Materials';
  }

  return {
    topCategories,
    favoriteBrands,
    topAestheticTags,
    dimensionAffinities,
    avgSpend,
    holyGrailCount,
    totalRated,
    totalViews,
    primaryVibe
  };
}
