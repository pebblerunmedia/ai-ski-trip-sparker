'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ResortSuggestion, TripSpark } from '@/types'
import { apiService } from '@/lib/api'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ResortSuggestion[]>([])
  const [tripSparks, setTripSparks] = useState<Map<string, string>>(new Map())
  const [loading, setLoading] = useState(false)
  const [sparkLoading, setSparkLoading] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      // Call the actual Firebase Function via API service
      const suggestions = await apiService.suggestResorts(query);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      // Fallback to mock data for development
      const mockSuggestions: ResortSuggestion[] = [
        {
          resort: {
            id: '1',
            name: 'Whistler Blackcomb',
            location_region: 'British Columbia, Canada',
            short_description: 'World-class skiing with massive terrain and reliable snow.',
            keywords: ['expert_terrain', 'luxury', 'village_atmosphere']
          },
          whyItFits: 'Perfect match for your preference for challenging terrain and upscale amenities.'
        },
        {
          resort: {
            id: '2', 
            name: 'Aspen Snowmass',
            location_region: 'Colorado, USA',
            short_description: 'Iconic luxury resort with four mountains and vibrant après-ski scene.',
            keywords: ['luxury', 'nightlife', 'expert_terrain']
          },
          whyItFits: 'Combines the high-end experience you\'re looking for with world-class skiing.'
        }
      ]
      setSuggestions(mockSuggestions)
    } finally {
      setLoading(false)
    }
  }

  const handleSparkGeneration = async (resortId: string) => {
    if (tripSparks.has(resortId)) return

    const resort = suggestions.find(s => s.resort.id === resortId)?.resort
    if (!resort) return

    setSparkLoading(resortId)
    try {
      // Call the actual Firebase Function via API service
      const spark = await apiService.generateTripSpark({
        resortId: resort.id,
        resortName: resort.name,
        resortLocation: resort.location_region,
        resortDescription: resort.short_description,
        resortKeywords: resort.keywords
      });
      
      setTripSparks(prev => new Map(prev.set(resortId, spark)))
    } catch (error) {
      console.error('Error generating trip spark:', error)
      // Fallback to mock spark for development
      const mockSpark = `Imagine carving fresh powder at dawn, then warming up with hot cocoa by a crackling fire while planning your next adventure down the mountain slopes.`
      setTripSparks(prev => new Map(prev.set(resortId, mockSpark)))
    } finally {
      setSparkLoading(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ⛷️ AI Ski Trip Idea Sparker
        </h1>
        <p className="text-lg text-gray-600">
          Discover your perfect ski resort and get inspired with personalized trip ideas
        </p>
      </div>

      {/* Input Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What kind of ski experience are you looking for?</CardTitle>
          <CardDescription>
            Describe your ideal ski trip in natural language - terrain preferences, atmosphere, amenities, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              placeholder="e.g., Looking for challenging terrain with luxury amenities and great nightlife..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Finding Resorts...
                </>
              ) : (
                'Find Resorts'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {suggestions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recommended Ski Resorts
          </h2>
          
          {suggestions.map((suggestion) => (
            <Card key={suggestion.resort.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{suggestion.resort.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 mb-2">
                      {suggestion.resort.location_region}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.resort.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {keyword.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">{suggestion.resort.short_description}</p>
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Why this fits:</strong> {suggestion.whyItFits}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleSparkGeneration(suggestion.resort.id)}
                    disabled={sparkLoading === suggestion.resort.id}
                    variant="outline"
                  >
                    {sparkLoading === suggestion.resort.id ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Generating...
                      </>
                    ) : (
                      '✨ Spark an Idea!'
                    )}
                  </Button>
                  
                  {tripSparks.has(suggestion.resort.id) && (
                    <div className="flex-1 bg-yellow-50 p-3 rounded-md border-l-4 border-l-yellow-400">
                      <p className="text-sm text-yellow-800 italic">
                        {tripSparks.get(suggestion.resort.id)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {suggestions.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎿</div>
          <p className="text-gray-500">
            Enter your ski preferences above to get personalized resort recommendations!
          </p>
        </div>
      )}
    </div>
  )
}
