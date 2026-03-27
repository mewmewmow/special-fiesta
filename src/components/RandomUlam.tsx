"use client";

import { useState } from "react";
import { SparklesIcon, HeartIcon } from "./Icons";
import { callTextAI } from "@/lib/ai";
import { saveFavorite, isFavorited, removeFavorite } from "@/lib/storage";

const timeOptions = [
  { value: "Umaga", label: "Umaga" },
  { value: "Tanghali", label: "Tanghali" },
  { value: "Hapon", label: "Hapon" },
  { value: "Gabi", label: "Gabi" },
];

const weatherOptions = [
  { value: "Mainit", label: "Mainit" },
  { value: "Maulan", label: "Maulan" },
  { value: "Normal", label: "Normal / Cloudy" },
];

function buildPrompt(time: string, weather: string) {
  return `Based on the following: Time of day: ${time}, Weather: ${weather}. Suggest one main dish (ulam) that fits the mood. Explain in one sentence why it's perfect. Then give a short cooking tip for that dish. Use Taglish. Keep response under 60 words.`;
}

export default function RandomUlam() {
  const [time, setTime] = useState("Tanghali");
  const [weather, setWeather] = useState("Normal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favId, setFavId] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError("");
    setResult("");
    const prompt = buildPrompt(time, weather);
    const res = await callTextAI(
      "You are a Filipino home cook. Suggest dishes that are comforting and appropriate for the given conditions.",
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
        title: `Random Ulam: ${time} + ${weather}`,
        content: result,
        feature: "ulam",
        createdAt: Date.now(),
      });
    }
    setFavId(favId + " ");
    setTimeout(() => setFavId(favId), 0);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-green-dark mb-1">Random Ulam</h2>
      <p className="text-sm text-wood mb-4">
        Piliin ang oras at panahon — bibigyan ka ng swerteng ulam!
      </p>

      {/* Dropdowns */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-wood block mb-1">
            Oras ng Araw
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded-xl p-2.5 text-sm text-[#3D2B1F] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
          >
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-wood block mb-1">
            Panahon
          </label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded-xl p-2.5 text-sm text-[#3D2B1F] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
          >
            {weatherOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-wood text-white py-3 rounded-xl font-semibold text-base hover:bg-wood-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Iniisip ang swerte mo...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Swertehin mo!
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
        <div className="result-card rounded-2xl p-5 animate-fade-up">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-terracotta" />
              <span className="font-bold text-green-dark">
                Swerte Mo Ngayon:
              </span>
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
