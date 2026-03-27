export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SavedRecipe {
  id: string;
  title: string;
  content: string;
  feature: "recipe" | "ulam" | "rescue" | "checker";
  createdAt: number;
}

export interface AIResponse {
  content: string;
  error?: string;
}

export type TabId = "checker" | "recipe" | "ulam" | "rescue" | "manang";
