import { configureGenkit } from '@genkit-ai/core';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';
import { onCallGenkit } from '@genkit-ai/firebase/functions';
import { z } from 'zod';

// Configure Genkit with Firebase and Google AI
configureGenkit({
  plugins: [
    firebase(),
    googleAI({
      apiKey: process.env.GEMINI_API_KEY, // Set this in Firebase Functions config
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Import flows
import { suggestResortsFlow } from './flows/suggestResorts';
import { generateTripSparkFlow } from './flows/generateTripSpark';

// Export callable functions
export const suggestResorts = onCallGenkit({
  flow: suggestResortsFlow,
  httpsOptions: {
    cors: true,
  },
});

export const generateTripSpark = onCallGenkit({
  flow: generateTripSparkFlow,
  httpsOptions: {
    cors: true,
  },
});
