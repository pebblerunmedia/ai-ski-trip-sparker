"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTripSpark = exports.suggestResorts = exports.testFunction = void 0;
const core_1 = require("@genkit-ai/core");
const firebase_1 = require("@genkit-ai/firebase");
const googleai_1 = require("@genkit-ai/googleai");
const flow_1 = require("@genkit-ai/flow");
const functions = __importStar(require("firebase-functions"));
// Configure Genkit with Firebase and Google AI
(0, core_1.configureGenkit)({
    plugins: [
        (0, firebase_1.firebase)(),
        (0, googleai_1.googleAI)({
            apiKey: 'AIzaSyC-vjgAB2MpcoU4r7gQaAZtREFnipSyRoA',
        }),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});
// Import flows
const suggestResorts_1 = require("./flows/suggestResorts");
const generateTripSpark_1 = require("./flows/generateTripSpark");
// Export test function
var test_1 = require("./test");
Object.defineProperty(exports, "testFunction", { enumerable: true, get: function () { return test_1.testFunction; } });
// Export the flows as 1st gen callable functions with service account
exports.suggestResorts = functions
    .runWith({
    serviceAccount: 'ai-ski-trip-sparker@appspot.gserviceaccount.com',
})
    .https.onCall(async (data, context) => {
    const result = await (0, flow_1.runFlow)(suggestResorts_1.suggestResortsFlow, data);
    return result;
});
exports.generateTripSpark = functions
    .runWith({
    serviceAccount: 'ai-ski-trip-sparker@appspot.gserviceaccount.com',
})
    .https.onCall(async (data, context) => {
    const result = await (0, flow_1.runFlow)(generateTripSpark_1.generateTripSparkFlow, data);
    return result;
});
//# sourceMappingURL=index.js.map