
import { GoogleGenAI } from "@google/genai";

// Always use named parameter for apiKey and obtain it directly from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartReview = async (manuscriptTitle: string, abstract: string, status: string) => {
  try {
    // Use ai.models.generateContent to query GenAI with model and prompt directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As an AI research assistant for CCRAS, analyze the current status of this manuscript:
      Title: ${manuscriptTitle}
      Abstract: ${abstract}
      Current Status: ${status}

      Provide 3 concise professional suggestions for the PI to move the workflow to the next stage effectively.`,
      config: {
        temperature: 0.7,
      }
    });
    // Access the .text property directly from the response object.
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Unable to generate smart review at this time.";
  }
};
