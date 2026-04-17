import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QUESTIONS_PROMPT } from "../../../../services/Constants";

export async function POST(req) {
try{
    const { jobPosition, jobDescription, interviewDuration, interviewType } = await req.json();    
    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{jobPosition}", jobPosition)
      .replace("{jobDescription}", jobDescription)
      .replace("{interviewDuration}", interviewDuration)
      .replace("{interviewType}", interviewType);
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY, 
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-09-2025", // OpenRouter model
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    console.log(completion.choices[0].message);
    return NextResponse.json({ content: completion.choices[0].message.content });
  }
  catch(error){
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}