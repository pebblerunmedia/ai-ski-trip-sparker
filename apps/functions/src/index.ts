import { configureGenkit } from '@genkit-ai/core';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';
import { runFlow } from '@genkit-ai/flow';
import * as functions from 'firebase-functions';

// Configure Genkit with Firebase and Google AI
configureGenkit({
  plugins: [
    firebase(),
    googleAI({
      apiKey: 'AIzaSyC-vjgAB2MpcoU4r7gQaAZtREFnipSyRoA',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Import flows
import { suggestResortsFlow } from './flows/suggestResorts';
import { generateTripSparkFlow } from './flows/generateTripSpark';

// Export test function
export { testFunction } from './test';

// Export the flows as 1st gen callable functions with service account
export const suggestResorts = functions
  .runWith({
    serviceAccount: 'ai-ski-trip-sparker@appspot.gserviceaccount.com',
  })
  .https.onCall(async (data, context) => {
    const result = await runFlow(suggestResortsFlow, data);
    return result;
  });

export const generateTripSpark = functions
  .runWith({
    serviceAccount: 'ai-ski-trip-sparker@appspot.gserviceaccount.com',
  })
  .https.onCall(async (data, context) => {
    const result = await runFlow(generateTripSparkFlow, data);
    return result;
  });