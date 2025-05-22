// Mock ski resort data for development
// In production, this would be replaced with Firebase Data Connect queries

export interface SkiResort {
  id: string;
  name: string;
  location_region: string;
  short_description: string;
  keywords: string[];
}

export const mockSkiResorts: SkiResort[] = [
  {
    id: '1',
    name: 'Whistler Blackcomb',
    location_region: 'British Columbia, Canada',
    short_description: 'World-class skiing with massive terrain and reliable snow conditions across two interconnected mountains.',
    keywords: ['expert_terrain', 'luxury', 'village_atmosphere', 'large_resort']
  },
  {
    id: '2',
    name: 'Aspen Snowmass',
    location_region: 'Colorado, USA',
    short_description: 'Iconic luxury resort with four mountains and vibrant après-ski scene in a historic mining town.',
    keywords: ['luxury', 'nightlife', 'expert_terrain', 'historic']
  },
  {
    id: '3',
    name: 'Jackson Hole Mountain Resort',
    location_region: 'Wyoming, USA',
    short_description: 'Steep terrain and deep powder with challenging runs for advanced skiers and breathtaking mountain views.',
    keywords: ['expert_terrain', 'steep_slopes', 'powder', 'challenging']
  },
  {
    id: '4',
    name: 'Park City Mountain Resort',
    location_region: 'Utah, USA',
    short_description: 'Family-friendly resort with diverse terrain and excellent snow quality, perfect for all skill levels.',
    keywords: ['family_friendly', 'diverse_terrain', 'good_snow', 'beginner_friendly']
  },
  {
    id: '5',
    name: 'Stowe Mountain Resort',
    location_region: 'Vermont, USA',
    short_description: 'Classic New England skiing with charming village atmosphere and reliable natural snowfall.',
    keywords: ['traditional', 'village_atmosphere', 'natural_snow', 'east_coast']
  },
  {
    id: '6',
    name: 'Chamonix Mont-Blanc',
    location_region: 'France',
    short_description: 'Legendary European ski destination with extreme off-piste terrain and rich mountaineering history.',
    keywords: ['expert_terrain', 'off_piste', 'european', 'extreme', 'historic']
  },
  {
    id: '7',
    name: 'Niseko United',
    location_region: 'Hokkaido, Japan',
    short_description: 'Famous for its light, dry powder snow and unique Japanese culture and cuisine experience.',
    keywords: ['powder', 'cultural_experience', 'international', 'unique_snow']
  }
];

// Helper function to calculate similarity score (simplified version)
export function calculateSimilarityScore(resort: SkiResort, keywords: string[]): number {
  const matchingKeywords = resort.keywords.filter(keyword => 
    keywords.some(userKeyword => 
      keyword.toLowerCase().includes(userKeyword.toLowerCase()) ||
      userKeyword.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  return matchingKeywords.length / Math.max(resort.keywords.length, keywords.length);
}

// Helper function to search resorts based on query
export function searchResorts(query: string, limit: number = 3): SkiResort[] {
  const queryLower = query.toLowerCase();
  const searchTerms = queryLower.split(' ').filter(term => term.length > 2);
  
  const scoredResorts = mockSkiResorts.map(resort => {
    let score = 0;
    
    // Check description matches
    const descriptionScore = searchTerms.reduce((acc, term) => {
      return acc + (resort.short_description.toLowerCase().includes(term) ? 1 : 0);
    }, 0);
    
    // Check keyword matches
    const keywordScore = searchTerms.reduce((acc, term) => {
      return acc + resort.keywords.reduce((keywordAcc, keyword) => {
        return keywordAcc + (keyword.toLowerCase().includes(term) ? 1 : 0);
      }, 0);
    }, 0);
    
    // Check name/location matches
    const nameLocationScore = searchTerms.reduce((acc, term) => {
      const nameMatch = resort.name.toLowerCase().includes(term) ? 2 : 0;
      const locationMatch = resort.location_region.toLowerCase().includes(term) ? 1 : 0;
      return acc + nameMatch + locationMatch;
    }, 0);
    
    score = descriptionScore + keywordScore * 2 + nameLocationScore;
    
    return { resort, score };
  });
  
  return scoredResorts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.resort);
}
