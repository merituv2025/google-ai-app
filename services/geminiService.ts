
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates images based on a text prompt using the Gemini API.
 * @param prompt The text prompt to generate images from.
 * @returns A promise that resolves to an array of base64 data URLs.
 */
export const generateImagesFromPrompt = async (prompt: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 4,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      return [];
    }

    return response.generatedImages.map(img => {
      const base64ImageBytes: string = img.image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    });

  } catch (error) {
    console.error("Error generating images with Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
