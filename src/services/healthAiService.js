import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ VITE_GEMINI_API_KEY is not defined in your environment variables. Please check your .env file!");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const SYSTEM_PROMPT = `
You are MediGuide AI, an AI-powered healthcare access assistant designed for African communities.

IMPORTANT RULES:
- NEVER diagnose diseases.
- NEVER prescribe medication dosages.
- NEVER claim certainty.
- Always encourage users to seek professional care when symptoms are serious.
- Keep responses medically responsible and beginner-friendly.
- Use simple language.
- Be concise but helpful.
- If symptoms suggest danger, classify urgency as HIGH.
- Focus on guidance, prevention, and healthcare access.

You must ALWAYS return valid JSON in this exact structure:

{
  "urgency": "Low | Medium | High",
  "title": "Short summary title",
  "response": "Main healthcare guidance",
  "followUpQuestions": [
    "question 1",
    "question 2"
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2"
  ],
  "emergency": true,
  "suggestedActions": [
    {
      "label": "Find Nearby Clinics",
      "actionType": "NAV_CLINICS"
    }
  ]
}

Urgency Guidelines:
- HIGH:
  chest pain, difficulty breathing, stroke symptoms, severe bleeding, unconsciousness, suicidal thoughts
- MEDIUM:
  fever, malaria symptoms, infections, vomiting, fractures
- LOW:
  mild headache, fatigue, stress, mild cold symptoms

Always prioritize safety.
`;

export async function getMedicalAIResponse(
  message,
  history = [],
  retries = 3,
  delay = 1000,
) {
  if (!message || typeof message !== "string") {
    throw new Error("Message is required");
  }

  // Format message history for standard context parsing
  const formattedHistory = history
    .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
    .join("\n");

  const prompt = `
${SYSTEM_PROMPT}

Conversation History:
${formattedHistory}

Current User Message:
"${message}"

Generate the healthcare guidance JSON now.
`;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();

    // Remove markdown code block wrappers if Gemini wraps JSON in backticks
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      ...parsed,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const status = error.status || error.code;

    const isRateLimit = status === 429 || error.message?.includes("429");
    const isServerError = status >= 500 || error.message?.includes("500");

    if (retries > 0 && (isRateLimit || isServerError)) {
      console.log(`⚠️ Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return getMedicalAIResponse(message, history, retries - 1, delay * 2);
    }

    console.error("❌ MediGuide AI Error:", error.message);

    // Fallback response inside service if key is missing or errors occur
    return {
      urgency: "Medium",
      title: "Service Temporarily Unavailable",
      response:
        "I'm currently unable to securely connect to my generative analysis services. Please make sure VITE_GEMINI_API_KEY is configured correctly, or visit our Clinics tab to find professional medical care immediately.",
      followUpQuestions: [],
      recommendations: [
        "Verify your VITE_GEMINI_API_KEY setting in .env",
        "Restart your local Vite development server",
        "Consult our Nearby Clinics search panel"
      ],
      emergency: false,
      suggestedActions: [
        {
          label: "View Nearby Clinics Map",
          actionType: "NAV_CLINICS",
        },
      ],
      timestamp: new Date().toISOString(),
    };
  }
}

export default getMedicalAIResponse;
