import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const InputSchema = z.object({
  input: z.string().min(1, "Input cannot be empty").max(2000, "Input is too long"),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const { input } = InputSchema.parse(rawBody);


    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert AI Financial Advisor.
      The user asks: "${input}"

      Provide helpful, context-aware financial advice. 
      At the end of your response, provide exactly ONE valid JSON block matching this interface:
      {
        "budgeting": {
           "necessities": number (percentage 0-100),
           "wants": number,
           "savings": number
        },
        "advice": "Short sentence summarizing the plan",
        "actionItems": ["step 1", "step 2", "step 3"]
      }
      Do not include markdown tags around the JSON, just the raw JSON at the very bottom.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ responseText });
  } catch (error) {
    console.error("API Error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input structure. " + error.issues[0].message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during API call",
      },
      { status: 500 },
    );
  }
}

