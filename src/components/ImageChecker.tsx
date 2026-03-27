"use client";

import { useState, useRef } from "react";
import { CameraIcon, UploadIcon, HeartIcon, StarIcon } from "./Icons";
import { callVisionAI } from "@/lib/ai";
import { saveFavorite, isFavorited, removeFavorite } from "@/lib/storage";
import type { SavedRecipe } from "@/lib/types";

const SYSTEM_PROMPT =
  'You are a Filipino food critic and cook. Analyze the uploaded image of a dish. Identify the dish name (if possible) and rate its visual authenticity from 1 to 10. Give a short, friendly feedback in Tagalog or Taglish, suggesting one improvement to make it look more traditional or appetizing. Keep response under 50 words.';

export default function ImageChecker() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favId, setFavId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Image file lang ang pwede, pre!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImage(base64);
      setResult("");
      setError("");
      setFavId(null);
    };
    reader.readAsDataURL(file);
  }

  async function analyze() {
    if (!image) return;
    setLoading(true);
    setError("");
    setResult("");
    const res = await callVisionAI(SYSTEM_PROMPT, image);
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
        title: "Image Authenticity Check",
        content: result,
        feature: "checker",
        createdAt: Date.now(),
      });
    }
    // force re-render
    setFavId(favId + " ");
    setTimeout(() => setFavId(favId), 0);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-green-dark mb-1">
        Authenticity Checker
      </h2>
      <p className="text-sm text-wood mb-4">
        I-upload ang larawan ng ulam mo, titingnan ng AI kung gaano ka-authentic!
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Upload area */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-terracotta-light rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-all mb-4"
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded dish"
            className="w-full max-h-64 object-cover rounded-xl"
          />
        ) : (
          <>
            <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-3">
              <CameraIcon className="w-8 h-8 text-terracotta" />
            </div>
            <p className="text-wood font-medium">I-tap para mag-upload</p>
            <p className="text-wood-light text-xs mt-1">Camera o gallery, bahala ka!</p>
            <div className="flex items-center gap-1 mt-2 text-terracotta-light text-xs">
              <UploadIcon className="w-4 h-4" />
              <span>Upload Photo</span>
            </div>
          </>
        )}
      </div>

      {image && (
        <button
          onClick={() => fileRef.current?.click()}
          className="text-xs text-terracotta underline mb-3 hover:text-terracotta-dark"
        >
          Palitan ang larawan
        </button>
      )}

      {/* Analyze button */}
      {image && (
        <button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-terracotta text-white py-3 rounded-xl font-semibold text-base hover:bg-terracotta-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Tinitingnan na...
            </span>
          ) : (
            "Tingnan ang Authenticity!"
          )}
        </button>
      )}

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
              <StarIcon className="w-5 h-5 text-terracotta" />
              <span className="font-bold text-green-dark">Resulta</span>
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
