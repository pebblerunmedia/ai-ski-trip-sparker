import { defineFlow } from '@genkit-ai/core';
import { gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';

// Input schema
const GenerateTripSparkInput = z.object({
  resortId: z.string(),
  resortName: z.string(),
  resortLocation: z.string(),
  resortDescription: z.string(),
  resortKeywords: z.array(z.string()),
});

// Output schema
const GenerateTripSparkOutput = z.object({
  spark: z.string().describe('Creative trip spark idea for the resort'),
});

export const generateTripSparkFlow = defineFlow(
  {
    name: 'generateTripSparkFlow',
    inputSchema: GenerateTripSparkInput,
    outputSchema: GenerateTripSparkOutput,
  },
  async (input) => {
    const { resortName, resortLocation, resortDescription, resortKeywords } = input;

    // Generate a creative trip spark using Gemini
    const tripSparkResponse = await gemini15Flash.generate({
      prompt: `
        Create an imaginative and inspiring "trip spark" for a ski trip to this resort.
        This should be a short, evocative 2-3 sentence description that captures the magic and excitement of skiing at this location.
        
        Resort: ${resortName}
        Location: ${resortLocation}
        Description: ${resortDescription}
        Characteristics: ${resortKeywords.join(', ')}
        
        The trip spark should:
        - Be creative and evocative, not just factual
        - Paint a vivid picture of a specific moment or experience
        - Capture the unique atmosphere and feeling of this resort
        - Make the reader excited and inspired to visit
        - Be 2-3 sentences maximum
        
        Examples of good trip sparks:
        - "Picture yourself carving through champagne powder at sunrise, the mountain silent except for the whisper of your skis, then warming up with sake and ramen in a traditional mountain hut as snowflakes dance past the windows."
        - "Imagine descending steep couloirs with the Alps spread out below you like a frozen sea, then celebrating your conquests with wine and cheese in a cozy mountain refuge as the alpine glow paints the peaks rose-gold."
        
        Create a unique trip spark for ${resortName}:
      `,
    });

    return {
      spark: tripSparkResponse.text(),
    };
  }
);
