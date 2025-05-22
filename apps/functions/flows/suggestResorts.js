"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestResortsFlow = void 0;
const flow_1 = require("@genkit-ai/flow");
const ai_1 = require("@genkit-ai/ai");
const googleai_1 = require("@genkit-ai/googleai");
const zod_1 = require("zod");
const mockResorts_1 = require("../data/mockResorts");
// Input schema
const SuggestResortsInput = zod_1.z.object({
    query: zod_1.z.string().describe('User query describing their ski preferences'),
});
// Output schema
const ResortSuggestion = zod_1.z.object({
    resort: zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        location_region: zod_1.z.string(),
        short_description: zod_1.z.string(),
        keywords: zod_1.z.array(zod_1.z.string()),
    }),
    whyItFits: zod_1.z.string().describe('Explanation of why this resort matches the user preferences'),
});
const SuggestResortsOutput = zod_1.z.object({
    suggestions: zod_1.z.array(ResortSuggestion),
});
exports.suggestResortsFlow = (0, flow_1.defineFlow)({
    name: 'suggestResortsFlow',
    inputSchema: SuggestResortsInput,
    outputSchema: SuggestResortsOutput,
}, async (input) => {
    const { query } = input;
    // Step 1: Use Gemini to extract key entities and keywords from the user query
    const keywordResponse = await (0, ai_1.generate)({
        model: googleai_1.gemini15Flash,
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
        .map((keyword) => keyword.trim().toLowerCase())
        .filter((keyword) => keyword.length > 0);
    // Step 2: Search resorts using the extracted keywords and original query
    const matchingResorts = (0, mockResorts_1.searchResorts)(query, 3);
    // Step 3: Generate "why it fits" explanations for each resort
    const suggestions = await Promise.all(matchingResorts.map(async (resort) => {
        const explanationResponse = await (0, ai_1.generate)({
            model: googleai_1.gemini15Flash,
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
    }));
    return {
        suggestions,
    };
});
//# sourceMappingURL=suggestResorts.js.map