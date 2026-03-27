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
    const { systemPrompt, messages } = await request.json();

    if (!systemPrompt || !messages) {
      return NextResponse.json(
        { error: "Missing systemPrompt or messages" },
        { status: 400 }
      );
    }

    const client = getClient();
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const completion = await client.chat.completions.create({
      model,
      messages: chatMessages,
      max_tokens: 200,
      temperature: 0.9,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Chat failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
