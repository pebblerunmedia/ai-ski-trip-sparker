import { defineFlow } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import { gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { searchResorts } from '../data/mockResorts';

// Input schema
const SuggestResortsInput = z.object({
  query: z.string().describe('User query describing their ski preferences'),
});

// Output schema
const ResortSuggestion = z.object({
  resort: z.object({
    id: z.string(),
    name: z.string(),
    location_region: z.string(),
    short_description: z.string(),
    keywords: z.array(z.string()),
  }),
  whyItFits: z.string().describe('Explanation of why this resort matches the user preferences'),
});

const SuggestResortsOutput = z.object({
  suggestions: z.array(ResortSuggestion),
});

export const suggestResortsFlow = defineFlow(
  {
    name: 'suggestResortsFlow',
    inputSchema: SuggestResortsInput,
    outputSchema: SuggestResortsOutput,
  },
  async (input: z.infer<typeof SuggestResortsInput>) => {
    const { query } = input;

    // Step 1: Use Gemini to extract key entities and keywords from the user query
    const keywordResponse = await generate({
      model: gemini15Flash,
      prompt: `
        Analyze this ski resort preference query and extract key skiing-related keywords and preferences:
        
        Query: "${query}"
        
        Extract keywords related to:
        - Terrain difficulty (beginner, intermediate, expert, challenging, steep)
        - Resort style (luxury, family-friendly, traditional, cultural)
        - Snow conditions (powder, natural snow, reliable snow)
        - Atmosphere (nightlife, village, historic, quiet)
        - Location preferences (European, North American, international)
        
        Return only a comma-separated list of relevant keywords, lowercase, using underscores instead of spaces.
        Example: expert_terrain, luxury, nightlife, powder
      `,
    });

    // Extract keywords from the response (we'll use the original query for now)
    keywordResponse.text()
      .split(',')
      .map((keyword: string) => keyword.trim().toLowerCase())
      .filter((keyword: string) => keyword.length > 0);

    // Step 2: Search resorts using the extracted keywords and original query
    const matchingResorts = searchResorts(query, 3);

    // Step 3: Generate "why it fits" explanations for each resort
    const suggestions = await Promise.all(
      matchingResorts.map(async (resort) => {
        const explanationResponse = await generate({
          model: gemini15Flash,
          prompt: `
            Based on the user's ski preferences: "${query}"
            
            And this resort information:
            - Name: ${resort.name}
            - Location: ${resort.location_region}
            - Description: ${resort.short_description}
            - Keywords: ${resort.keywords.join(', ')}
            
            Write a concise 1-2 sentence explanation of why this resort matches their preferences.
            Focus on the specific aspects that align with what they're looking for.
            Be specific and personalized, not generic.
          `,
        });

        return {
          resort,
          whyItFits: explanationResponse.text(),
        };
      })
    );

    return {
      suggestions,
    };
  }
);
