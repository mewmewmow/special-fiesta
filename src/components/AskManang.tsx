"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon, ChatIcon } from "./Icons";
import { callChatAI } from "@/lib/ai";
import type { ChatMessage } from "@/lib/types";

const SYSTEM_PROMPT =
  "You are 'Manang,' a cheerful Filipino kitchen expert. Answer the user's cooking questions in Taglish with humor and practical tips. Keep answers under 2 sentences unless the user asks for details. Always end with 'Kaya mo 'yan!'";

export default function AskManang() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    const res = await callChatAI(SYSTEM_PROMPT, updatedMessages);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      setMessages([...updatedMessages, { role: "assistant", content: res.content }]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-80px)] max-w-lg mx-auto">
      {/* Header */}
      <div className="p-4 pb-2">
        <h2 className="text-xl font-bold text-green-dark mb-1">Ask Manang</h2>
        <p className="text-sm text-wood">
          Si Manang ang iyong kitchen bestie! Magtanong lang.
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-3">
              <ChatIcon className="w-8 h-8 text-terracotta" />
            </div>
            <p className="text-wood text-sm">
              Kumusta! Si Manang ito.
              <br />
              Anong tanong mo sa pagluluto?
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                "Paano mag-luto ng adobo?",
                "Anong pwedeng ulam ngayon?",
                "Tips para malutong ang lechon kawali?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="bg-cream-dark text-wood text-xs px-3 py-1.5 rounded-full hover:bg-terracotta-light hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="chat-bubble-assistant px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-wood-light rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-wood-light rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-wood-light rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-cream border-t border-cream-dark p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Magtanong kay Manang..."
            className="flex-1 bg-white border border-cream-dark rounded-full px-4 py-2.5 text-sm text-[#3D2B1F] placeholder-wood-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="bg-terracotta text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-terracotta-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <SendIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
