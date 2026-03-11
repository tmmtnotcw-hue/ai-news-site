"use client";

import { Post, FilterState } from "@/types";
import PostCard from "./PostCard";

interface TrendingRankingProps {
  posts: Post[];
  filter: FilterState;
}

export default function TrendingRanking({
  posts,
  filter,
}: TrendingRankingProps) {
  let filtered = [...posts];

  if (filter.aiTool !== "all") {
    filtered = filtered.filter((p) => p.aiTool === filter.aiTool);
  }
  if (filter.source !== "all") {
    filtered = filtered.filter((p) => p.source === filter.source);
  }

  switch (filter.sortBy) {
    case "likes":
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    case "reposts":
      filtered.sort((a, b) => b.reposts - a.reposts);
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
      break;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          🔥 トレンドランキング
        </h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {filtered.length}件の投稿
        </span>
      </div>
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((post, i) => (
            <PostCard key={post.id} post={post} rank={i + 1} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-2">🔍</p>
            <p>該当する投稿がありません</p>
          </div>
        )}
      </div>
    </section>
  );
}
