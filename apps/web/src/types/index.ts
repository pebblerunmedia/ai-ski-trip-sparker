// Core data types for the ski trip sparker application

export interface SkiResort {
  id: string;
  name: string;
  location_region: string;
  short_description: string;
  keywords: string[];
}

export interface ResortSuggestion {
  resort: SkiResort;
  whyItFits: string;
}

export interface TripSpark {
  resortId: string;
  spark: string;
}

export interface UserPreferences {
  naturalLanguageQuery?: string;
  selectedKeywords?: string[];
}

// API Response types
export interface SuggestResortsResponse {
  suggestions: ResortSuggestion[];
  error?: string;
}

export interface GenerateTripSparkResponse {
  spark: string;
  error?: string;
}
