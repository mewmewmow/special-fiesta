"use client";

import { useState } from "react";
import type { TabId } from "@/lib/types";
import { hasSeenOnboarding, markOnboardingDone, getFavorites, removeFavorite } from "@/lib/storage";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/components/Onboarding";
import ImageChecker from "@/components/ImageChecker";
import RecipeGenerator from "@/components/RecipeGenerator";
import RandomUlam from "@/components/RandomUlam";
import RescueMission from "@/components/RescueMission";
import AskManang from "@/components/AskManang";
import { HeartIcon, TrashIcon } from "@/components/Icons";

function FavoritesPanel({ onClose }: { onClose: () => void }) {
  const [favorites, setFavorites] = useState(getFavorites());

  function handleRemove(id: string) {
    removeFavorite(id);
    setFavorites(getFavorites());
  }

  return (
    <div className="fixed inset-0 z-[90] bg-cream/95 backdrop-blur-sm animate-fade-up overflow-y-auto">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-dark flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-terracotta" filled />
            Mga Favorites
          </h2>
          <button
            onClick={onClose}
            className="text-wood hover:text-terracotta text-sm font-medium"
          >
            Close
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="w-12 h-12 text-cream-dark mx-auto mb-3" />
            <p className="text-wood text-sm">Wala pang na-save na recipe.</p>
            <p className="text-wood-light text-xs mt-1">
              I-save ang mga paborito mo gamit ang heart icon!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="result-card rounded-xl p-4 flex items-start gap-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-green-dark text-sm mb-1">
                    {fav.title}
                  </p>
                  <p className="text-xs text-wood leading-relaxed line-clamp-3">
                    {fav.content}
                  </p>
                  <p className="text-[10px] text-wood-light mt-1">
                    {new Date(fav.createdAt).toLocaleDateString("fil-PH")}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="p-1 text-wood-light hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const screens: Record<TabId, React.ComponentType> = {
  checker: ImageChecker,
  recipe: RecipeGenerator,
  ulam: RandomUlam,
  rescue: RescueMission,
  manang: AskManang,
};

const titles: Record<TabId, string> = {
  checker: "Authenticity Checker",
  recipe: "Anong Luto Ko?",
  ulam: "Random Ulam",
  rescue: "Rescue Mission",
  manang: "Ask Manang",
};

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === "undefined") return true;
    return !hasSeenOnboarding();
  });
  const [activeTab, setActiveTab] = useState<TabId>("checker");
  const [showFavorites, setShowFavorites] = useState(false);

  function handleOnboardingDone() {
    markOnboardingDone();
    setShowOnboarding(false);
  }

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    setShowFavorites(false);
  }

  if (showOnboarding) {
    return <Onboarding onDone={handleOnboardingDone} />;
  }

  const Screen = screens[activeTab];

  return (
    <main className="min-h-dvh bg-cream pb-20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-cream-dark px-4 py-3 flex items-center justify-between">
        <div>
          <h1
            className="text-lg font-bold text-terracotta leading-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            SARAPSCAN
          </h1>
          <p className="text-[10px] text-wood">{titles[activeTab]}</p>
        </div>
        <button
          onClick={() => setShowFavorites(true)}
          className="relative p-2 text-wood hover:text-terracotta transition-colors"
        >
          <HeartIcon className="w-5 h-5" />
          {getFavorites().length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {getFavorites().length}
            </span>
          )}
        </button>
      </header>

      {/* Screen */}
      <div className="pt-2">
        <Screen />
      </div>

      {/* Favorites overlay */}
      {showFavorites && (
        <FavoritesPanel onClose={() => setShowFavorites(false)} />
      )}

      {/* Bottom nav */}
      <BottomNav active={activeTab} onChange={handleTabChange} />
    </main>
  );
}
