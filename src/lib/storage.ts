import type { SavedRecipe } from "./types";

const FAVORITES_KEY = "sarapscan_favorites";
const ONBOARDING_KEY = "sarapscan_onboarding_done";

export function getFavorites(): SavedRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(recipe: SavedRecipe): void {
  const favorites = getFavorites();
  if (favorites.find((f) => f.id === recipe.id)) return;
  favorites.unshift(recipe);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorited(id: string): boolean {
  return getFavorites().some((f) => f.id === id);
}

export function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_KEY) === "true";
}

export function markOnboardingDone(): void {
  localStorage.setItem(ONBOARDING_KEY, "true");
}
