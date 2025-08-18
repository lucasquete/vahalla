import { GoogleGenAI } from "@google/genai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const parseJsonResponse = (jsonStr) => {
  let cleanedStr = jsonStr.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanedStr.match(fenceRegex);
  if (match && match[2]) {
    cleanedStr = match[2].trim();
  }
  try {
    return JSON.parse(cleanedStr);
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error("Received malformed JSON from API.");
  }
};

export const generateVideoData = async () => {
  const prompt = `
    You are an expert in movies and tv shows.
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.8,
    },
  });

  const parsedData = parseJsonResponse(response.text);
  if (
    Array.isArray(parsedData) &&
    parsedData.length > 0 &&
    "title" in parsedData[0] &&
    "description" in parsedData[0]
  ) {
    return parsedData;
  } else {
    throw new Error("Invalid data structure received from API.");
  }
};

export const createChat = () => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are an expert in movies and tv shows. short answers are ok",
      temperature: 0.7,
    },
  });
};

export const streamChatResponse = async (chat, message) => {
  return chat.sendMessageStream({ message });
};
