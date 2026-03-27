import type { AIResponse, ChatMessage } from "./types";

export async function callTextAI(
  systemPrompt: string,
  userMessage: string
): Promise<AIResponse> {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, userMessage }),
    });
    const data = await res.json();
    if (!res.ok) return { content: "", error: data.error || "Nagka-error, try ulit!" };
    return { content: data.content };
  } catch {
    return { content: "", error: "Hindi ma-connect sa AI. Subukan ulit mamaya." };
  }
}

export async function callVisionAI(
  systemPrompt: string,
  imageBase64: string
): Promise<AIResponse> {
  try {
    const res = await fetch("/api/vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, imageBase64 }),
    });
    const data = await res.json();
    if (!res.ok) return { content: "", error: data.error || "Nagka-error sa vision analysis." };
    return { content: data.content };
  } catch {
    return { content: "", error: "Hindi ma-connect sa AI. Subukan ulit mamaya." };
  }
}

export async function callChatAI(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<AIResponse> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, messages }),
    });
    const data = await res.json();
    if (!res.ok) return { content: "", error: data.error || "Nagka-error sa chat." };
    return { content: data.content };
  } catch {
    return { content: "", error: "Hindi ma-connect kay Manang. Subukan ulit." };
  }
}
