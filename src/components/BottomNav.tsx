"use client";

import type { TabId } from "@/lib/types";
import { CameraIcon, ListIcon, SparklesIcon, AlertIcon, ChatIcon } from "./Icons";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "checker", label: "Checker", icon: CameraIcon },
  { id: "recipe", label: "Sangkap", icon: ListIcon },
  { id: "ulam", label: "Random", icon: SparklesIcon },
  { id: "rescue", label: "Rescue", icon: AlertIcon },
  { id: "manang", label: "Manang", icon: ChatIcon },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-cream-dark">
      <div className="flex justify-around items-center max-w-lg mx-auto px-2 py-1">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-terracotta scale-110"
                  : "text-wood hover:text-terracotta-light"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-terracotta mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
