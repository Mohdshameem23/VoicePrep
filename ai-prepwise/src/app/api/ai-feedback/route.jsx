
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "../../../../services/Constants";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation missing" },
        { status: 400 }
      );
    }

    // ✅ Convert conversation → string
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation, null, 2)
    );
    //clg
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion =
      await openai.chat.completions.create({
        model:
          "google/gemini-2.5-flash-lite-preview-09-2025",
        messages: [
          {
            role: "user",
            content: FINAL_PROMPT,
          },
        ],
      });

    const content =
      completion.choices[0].message.content;

    return NextResponse.json({ content });

  } catch (error) {
    console.error(
      "Error generating feedback:",
      error
    );

    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
