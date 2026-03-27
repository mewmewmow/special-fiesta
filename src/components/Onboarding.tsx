"use client";

import { useState } from "react";
import { CameraIcon, ListIcon, SparklesIcon, AlertIcon, ChatIcon, ChevronIcon } from "./Icons";

const pages = [
  {
    icon: CameraIcon,
    title: "Authenticity Checker",
    desc: "I-scan ang picture ng luto mo. Sasabihin ng AI kung gaano ka-authentic ang hitsura!",
    color: "bg-terracotta",
  },
  {
    icon: ListIcon,
    title: "Anong Luto Ko?",
    desc: "Ilagay ang mga sangkap na meron ka. Gagawan ka ng recipe ng AI — Filipino fusion style!",
    color: "bg-green",
  },
  {
    icon: SparklesIcon,
    title: "Random Ulam",
    desc: "Hindi alam ang lulutuin? Piliin ang oras at panahon, tapos bibigyan ka ng swerteng ulam!",
    color: "bg-wood",
  },
  {
    icon: AlertIcon,
    title: "Rescue Mission",
    desc: "Nasunog? Maalat? Sobrang anghang? May sagot ang AI para iligtas ang luto mo!",
    color: "bg-terracotta-dark",
  },
  {
    icon: ChatIcon,
    title: "Ask Manang",
    desc: "Si Manang ang iyong kitchen bestie! Magtanong tungkol sa kahit anong luto — Taglish pa!",
    color: "bg-green-dark",
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [page, setPage] = useState(0);
  const isLast = page === pages.length - 1;
  const current = pages[page];

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center px-6 animate-fade-up">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-terracotta" style={{ fontFamily: "Georgia, serif" }}>
            SARAPSCAN
          </h1>
          <p className="text-wood mt-1 text-sm">Ang AI Cooking Buddy mo, pre!</p>
        </div>

        {/* Feature card */}
        <div
          key={page}
          className="bg-white rounded-2xl p-8 shadow-lg border border-cream-dark animate-slide-in"
        >
          <div className={`${current.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
            <current.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-center text-green-dark mb-2">
            {current.title}
          </h2>
          <p className="text-wood text-center text-sm leading-relaxed">{current.desc}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-terracotta" : "w-2 bg-cream-dark"
              }`}
            />
          ))}
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          {isLast ? (
            <button
              onClick={onDone}
              className="bg-terracotta text-white px-10 py-3 rounded-full font-semibold text-base hover:bg-terracotta-dark transition-colors shadow-md"
            >
              Simulan na natin!
            </button>
          ) : (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-2 text-terracotta font-semibold text-base hover:text-terracotta-dark transition-colors"
            >
              Susunod <ChevronIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={onDone}
            className="block mx-auto mt-4 text-wood-light text-xs hover:text-wood transition-colors"
          >
            Skip na lang
          </button>
        )}
      </div>
    </div>
  );
}
