import { NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || "";
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  
  const defaultHeaders: Record<string, string> = {};
  if (baseURL.includes("openrouter")) {
    defaultHeaders["HTTP-Referer"] = process.env.OPENROUTER_REFERRER || "https://sarapscan.app";
    defaultHeaders["X-Title"] = "SARAPSCAN";
  }
  
  return new OpenAI({ apiKey, baseURL, defaultHeaders: Object.keys(defaultHeaders).length > 0 ? defaultHeaders : undefined });
}

export async function POST(request: Request) {
  try {
    const { systemPrompt, userMessage } = await request.json();

    if (!systemPrompt || !userMessage) {
      return NextResponse.json(
        { error: "Missing systemPrompt or userMessage" },
        { status: 400 }
      );
    }

    const client = getClient();
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
