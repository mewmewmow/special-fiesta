"use client";

import { useState } from "react";
import { AlertIcon, HeartIcon } from "./Icons";
import { callTextAI } from "@/lib/ai";
import { saveFavorite, isFavorited, removeFavorite } from "@/lib/storage";

const problems = [
  { value: "Nasunog", label: "Nasunog" },
  { value: "Masyadong maalat", label: "Masyadong maalat" },
  { value: "Masyadong matabang", label: "Masyadong matabang" },
  { value: "Nakulangan sa sabaw", label: "Nakulangan sa sabaw" },
  { value: "Sobrang anghang", label: "Sobrang anghang" },
  { value: "other", label: "Iba pa..." },
];

function buildPrompt(dish: string, problem: string) {
  return `I am cooking ${dish} and the problem is: ${problem}. Give me one immediate, actionable step to fix or rescue this dish. Keep it very short, direct, and in Taglish. Maximum 30 words.`;
}

export default function RescueMission() {
  const [dish, setDish] = useState("");
  const [problem, setProblem] = useState("Nasunog");
  const [customProblem, setCustomProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favId, setFavId] = useState<string | null>(null);

  const actualProblem = problem === "other" ? customProblem : problem;

  async function rescue() {
    if (!dish.trim()) {
      setError("Anong ulam ang niluluto mo?");
      return;
    }
    if (problem === "other" && !customProblem.trim()) {
      setError("Ilagay ang problema mo, pre!");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    const prompt = buildPrompt(dish.trim(), actualProblem);
    const res = await callTextAI(
      "You are a Filipino kitchen rescue expert. Give fast, practical fixes for cooking disasters. Be encouraging but direct.",
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
        title: `Rescue: ${dish} - ${actualProblem}`,
        content: result,
        feature: "rescue",
        createdAt: Date.now(),
      });
    }
    setFavId(favId + " ");
    setTimeout(() => setFavId(favId), 0);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-green-dark mb-1">Rescue Mission</h2>
      <p className="text-sm text-wood mb-4">
        May problema sa luto? Ilagay ang details — tutulungan ka namin!
      </p>

      {/* Dish name */}
      <div className="mb-3">
        <label className="text-xs font-medium text-wood block mb-1">
          Anong ulam?
        </label>
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          placeholder="halimbawa: Sinigang na baboy"
          className="w-full bg-white border border-cream-dark rounded-xl p-3 text-sm text-[#3D2B1F] placeholder-wood-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors"
        />
      </div>

      {/* Problem dropdown */}
      <div className="mb-3">
        <label className="text-xs font-medium text-wood block mb-1">
          Anong problema?
        </label>
        <select
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full bg-white border border-cream-dark rounded-xl p-2.5 text-sm text-[#3D2B1F] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
        >
          {problems.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom problem input */}
      {problem === "other" && (
        <div className="mb-3 animate-fade-up">
          <input
            type="text"
            value={customProblem}
            onChange={(e) => setCustomProblem(e.target.value)}
            placeholder="Ilagay ang problema mo..."
            className="w-full bg-white border border-cream-dark rounded-xl p-3 text-sm text-[#3D2B1F] placeholder-wood-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors"
          />
        </div>
      )}

      <button
        onClick={rescue}
        disabled={loading}
        className="w-full bg-terracotta-dark text-white py-3 rounded-xl font-semibold text-base hover:bg-terracotta disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Rinerescue na...
          </>
        ) : (
          <>
            <AlertIcon className="w-5 h-5" />
            Rescue!
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="result-card rounded-2xl p-5 animate-fade-up border-l-4 border-l-terracotta">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🆘</span>
              <span className="font-bold text-green-dark">Saklolo!</span>
            </div>
            <button onClick={toggleFavorite} className="p-1">
              <HeartIcon
                className="w-5 h-5 text-terracotta"
                filled={isFavorited(favId || "")}
              />
            </button>
          </div>
          <p className="text-sm text-[#3D2B1F] leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
