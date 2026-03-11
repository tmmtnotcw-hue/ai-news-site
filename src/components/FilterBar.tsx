"use client";

import { AITool, FilterState, SNSSource, SortKey } from "@/types";

const AI_TOOLS: (AITool | "all")[] = [
  "all",
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Stable Diffusion",
  "Copilot",
  "Perplexity",
  "その他",
];

const SOURCES: { value: SNSSource | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "x", label: "𝕏" },
  { value: "threads", label: "Threads" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "likes", label: "❤️ いいね順" },
  { value: "reposts", label: "🔄 リポスト順" },
  { value: "newest", label: "🕐 新着順" },
];

const AI_COLORS: Record<string, string> = {
  all: "bg-slate-600 hover:bg-slate-500",
  ChatGPT: "bg-emerald-600 hover:bg-emerald-500",
  Claude: "bg-orange-600 hover:bg-orange-500",
  Gemini: "bg-blue-600 hover:bg-blue-500",
  Midjourney: "bg-indigo-600 hover:bg-indigo-500",
  "Stable Diffusion": "bg-violet-600 hover:bg-violet-500",
  Copilot: "bg-sky-600 hover:bg-sky-500",
  Perplexity: "bg-teal-600 hover:bg-teal-500",
  "その他": "bg-gray-600 hover:bg-gray-500",
};

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
      {/* AI Tool Filter */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
          AIツール
        </label>
        <div className="flex flex-wrap gap-2">
          {AI_TOOLS.map((tool) => (
            <button
              key={tool}
              onClick={() =>
                onFilterChange({ ...filter, aiTool: tool as AITool | "all" })
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all ${
                filter.aiTool === tool
                  ? `${AI_COLORS[tool]} ring-2 ring-offset-1 ring-purple-400 scale-105`
                  : `${AI_COLORS[tool]} opacity-50`
              }`}
            >
              {tool === "all" ? "すべて" : tool}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Source Filter */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            ソース
          </label>
          <div className="flex gap-2">
            {SOURCES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() =>
                  onFilterChange({
                    ...filter,
                    source: value as SNSSource | "all",
                  })
                }
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter.source === value
                    ? "bg-slate-800 text-white ring-2 ring-offset-1 ring-purple-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            ソート
          </label>
          <div className="flex gap-2">
            {SORT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onFilterChange({ ...filter, sortBy: value })}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter.sortBy === value
                    ? "bg-slate-800 text-white ring-2 ring-offset-1 ring-purple-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
