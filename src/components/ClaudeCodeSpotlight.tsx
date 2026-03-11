"use client";

import { Post, ClaudeCodeTag } from "@/types";
import PostCard from "./PostCard";

const TAG_DESCRIPTIONS: Record<ClaudeCodeTag, string> = {
  Skills: "カスタムコマンドで開発を自動化",
  MCP: "外部サービスとの統合",
  Hooks: "イベントドリブンな自動処理",
  "Agent SDK": "カスタムAIエージェント構築",
  Tips: "便利なテクニック集",
  General: "全般的な活用法",
};

interface ClaudeCodeSpotlightProps {
  posts: Post[];
}

export default function ClaudeCodeSpotlight({
  posts,
}: ClaudeCodeSpotlightProps) {
  const claudeCodePosts = posts
    .filter((p) => p.isClaudeCode)
    .sort((a, b) => b.likes - a.likes);

  const tagCounts = claudeCodePosts.reduce(
    (acc, post) => {
      const tag = post.claudeCodeTag || "General";
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (claudeCodePosts.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">⚡</div>
        <div>
          <h2 className="text-lg font-bold text-orange-900">
            Claude Code Spotlight
          </h2>
          <p className="text-xs text-orange-600">
            Skills / MCP / Hooks / Agent SDK の注目投稿
          </p>
        </div>
        <span className="ml-auto bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {claudeCodePosts.length} posts
        </span>
      </div>

      {/* Tag Summary */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(tagCounts).map(([tag, count]) => (
          <div
            key={tag}
            className="flex items-center gap-1.5 bg-white/80 border border-orange-200 rounded-lg px-3 py-1.5"
          >
            <span className="text-xs font-semibold text-orange-700">
              {tag}
            </span>
            <span className="text-xs text-orange-500">({count})</span>
            <span className="text-[10px] text-gray-500">
              {TAG_DESCRIPTIONS[tag as ClaudeCodeTag]}
            </span>
          </div>
        ))}
      </div>

      {/* Top Posts */}
      <div className="space-y-3">
        {claudeCodePosts.slice(0, 5).map((post, i) => (
          <PostCard key={post.id} post={post} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
