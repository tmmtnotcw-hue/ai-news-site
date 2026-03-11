"use client";

import { Post, AITool } from "@/types";

const AI_COLORS: Record<AITool, string> = {
  ChatGPT: "#059669",
  Claude: "#ea580c",
  Gemini: "#2563eb",
  Midjourney: "#4f46e5",
  "Stable Diffusion": "#7c3aed",
  Copilot: "#0284c7",
  Perplexity: "#0d9488",
  "その他": "#6b7280",
};

const AI_EMOJIS: Record<AITool, string> = {
  ChatGPT: "💬",
  Claude: "🧡",
  Gemini: "💎",
  Midjourney: "🎨",
  "Stable Diffusion": "🖼️",
  Copilot: "✈️",
  Perplexity: "🔍",
  "その他": "🔧",
};

interface AIToolStatsProps {
  posts: Post[];
  onSelectTool: (tool: AITool | "all") => void;
  selectedTool: AITool | "all";
}

export default function AIToolStats({
  posts,
  onSelectTool,
  selectedTool,
}: AIToolStatsProps) {
  const stats = Object.keys(AI_COLORS).map((tool) => {
    const toolPosts = posts.filter((p) => p.aiTool === tool);
    const totalLikes = toolPosts.reduce((sum, p) => sum + p.likes, 0);
    return {
      tool: tool as AITool,
      count: toolPosts.length,
      totalLikes,
    };
  });

  stats.sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        📊 AI別 記事数
      </h3>
      <div className="space-y-2">
        {stats.map(({ tool, count, totalLikes }) => (
          <button
            key={tool}
            onClick={() =>
              onSelectTool(selectedTool === tool ? "all" : tool)
            }
            className={`w-full text-left group transition-all rounded-lg p-2 ${
              selectedTool === tool
                ? "bg-gray-100 ring-1 ring-purple-300"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>{AI_EMOJIS[tool]}</span>
                {tool}
              </span>
              <span className="text-xs text-gray-500">
                {count}件 / ❤️{(totalLikes / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(count / maxCount) * 100}%`,
                  backgroundColor: AI_COLORS[tool],
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
