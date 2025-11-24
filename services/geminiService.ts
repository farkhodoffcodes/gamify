import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (
  userMessage: string, 
  context?: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are "Nebula AI", an advanced gaming assistant for the Nebula Cloud Gaming platform. 
    Your goal is to help users choose games, solve technical issues with their virtual PC, and provide gaming tips.
    The user is currently playing or browsing: ${context || 'the main library'}.
    Keep responses concise, enthusiastic, and gamer-friendly. 
    If asked about specs, we offer up to RTX 4090s and Intel i9s.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I'm having trouble connecting to the neural network. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System offline. Please check your connection.";
  }
};