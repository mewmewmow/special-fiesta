import { NextResponse } from "next/server";
import OpenAI from "openai";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || "";
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  return new OpenAI({ apiKey, baseURL });
}

export async function POST(request: Request) {
  try {
    const { systemPrompt, imageBase64 } = await request.json();

    if (!systemPrompt || !imageBase64) {
      return NextResponse.json(
        { error: "Missing systemPrompt or imageBase64" },
        { status: 400 }
      );
    }

    const client = getClient();
    const model = process.env.AI_VISION_MODEL || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageBase64.startsWith("data:")
                  ? imageBase64
                  : `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Vision analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
