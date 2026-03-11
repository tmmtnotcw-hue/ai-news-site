"use client";

import { Post } from "@/types";

const AI_BADGE_COLORS: Record<string, string> = {
  ChatGPT: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Claude: "bg-orange-100 text-orange-800 border-orange-200",
  Gemini: "bg-blue-100 text-blue-800 border-blue-200",
  Midjourney: "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Stable Diffusion": "bg-violet-100 text-violet-800 border-violet-200",
  Copilot: "bg-sky-100 text-sky-800 border-sky-200",
  Perplexity: "bg-teal-100 text-teal-800 border-teal-200",
  "その他": "bg-gray-100 text-gray-800 border-gray-200",
};

function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "たった今";
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}日前`;
  return date.toLocaleDateString("ja-JP");
}

interface PostCardProps {
  post: Post;
  rank?: number;
}

export default function PostCard({ post, rank }: PostCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl p-4 hover:shadow-md transition-shadow ${
        post.isClaudeCode
          ? "border-orange-300 bg-gradient-to-r from-orange-50 to-white"
          : "border-gray-200"
      }`}
    >
      <div className="flex gap-3">
        {/* Rank Badge */}
        {rank !== undefined && (
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              rank <= 3
                ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {rank}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Author Row */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-sm text-gray-900">
              {post.author}
            </span>
            <span className="text-xs text-gray-400">{post.authorHandle}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">
              {timeAgo(post.postedAt)}
            </span>
            {/* Source Badge */}
            <span
              className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                post.source === "x"
                  ? "bg-black text-white"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              }`}
            >
              {post.source === "x" ? "𝕏" : "Threads"}
            </span>
          </div>

          {/* Content */}
          <p className="text-sm text-gray-700 leading-relaxed mb-2">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                AI_BADGE_COLORS[post.aiTool]
              }`}
            >
              {post.aiTool}
            </span>
            {post.isClaudeCode && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500 text-white font-medium">
                🔥 Claude Code
              </span>
            )}
            {post.claudeCodeTag && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-200 text-orange-800 font-medium">
                {post.claudeCodeTag}
              </span>
            )}
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-red-400">❤️</span>
              {formatNumber(post.likes)}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">🔄</span>
              {formatNumber(post.reposts)}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-blue-400">💬</span>
              {formatNumber(post.replies)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
