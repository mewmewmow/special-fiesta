"use client";

import { useState } from "react";
import { ListIcon, HeartIcon } from "./Icons";
import { callTextAI } from "@/lib/ai";
import { saveFavorite, isFavorited, removeFavorite } from "@/lib/storage";

function buildPrompt(ingredients: string) {
  return `I have these ingredients: ${ingredients}. Suggest one unique Filipino-inspired fusion dish I can cook using only these. Give the dish a creative name, list the steps briefly, and add a fun fact about why this combination works. Keep it under 100 words. Use Taglish.`;
}

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favId, setFavId] = useState<string | null>(null);

  async function generate() {
    const trimmed = ingredients.trim();
    if (!trimmed) {
      setError("Maglagay muna ng sangkap, pre!");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    const prompt = buildPrompt(trimmed);
    const res = await callTextAI(
      "You are a creative Filipino chef who loves fusion cooking. Be playful and encouraging.",
      prompt
    );
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.content);
      const id = crypto.randomUUID();
      setFavId(id);
    }
  }

  function toggleFavorite() {
    if (!result || !favId) return;
    if (isFavorited(favId)) {
      removeFavorite(favId);
    } else {
      saveFavorite({
        id: favId,
        title: `Recipe: ${ingredients.slice(0, 30)}`,
        content: result,
        feature: "recipe",
        createdAt: Date.now(),
      });
    }
    setFavId(favId + " ");
    setTimeout(() => setFavId(favId), 0);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-green-dark mb-1">Anong Luto Ko?</h2>
      <p className="text-sm text-wood mb-4">
        Ilista ang mga sangkap mo (hiwalay ng comma) — gagawan ka ng recipe!
      </p>

      {/* Input */}
      <div className="relative mb-4">
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="halimbawa: baboy, bawang, sibuyas, toyo, suka..."
          rows={3}
          className="w-full bg-white border border-cream-dark rounded-xl p-3 pr-10 text-sm text-[#3D2B1F] placeholder-wood-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors resize-none"
        />
        <ListIcon className="absolute top-3 right-3 w-5 h-5 text-wood-light" />
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-green text-white py-3 rounded-xl font-semibold text-base hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Gumagawa ng recipe...
          </span>
        ) : (
          "Gawa ng Recipe!"
        )}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="result-card rounded-2xl p-5 animate-fade-up">
          <div className="flex items-start justify-between mb-2">
            <span className="font-bold text-green-dark">Recipe Mo:</span>
            <button onClick={toggleFavorite} className="p-1">
              <HeartIcon
                className="w-5 h-5 text-terracotta"
                filled={isFavorited(favId || "")}
              />
            </button>
          </div>
          <div className="text-sm text-[#3D2B1F] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
