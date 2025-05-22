import * as functions from 'firebase-functions';

export const testFunction = functions.https.onRequest((req, res) => {
  res.send({ message: 'Hello from Firebase!', timestamp: new Date().toISOString() });
});