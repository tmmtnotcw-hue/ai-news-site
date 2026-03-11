"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ClaudeCodeSpotlight from "@/components/ClaudeCodeSpotlight";
import SkillsDeepDive from "@/components/SkillsDeepDive";
import TrendingRanking from "@/components/TrendingRanking";
import AIToolStats from "@/components/AIToolStats";
import { samplePosts } from "@/data/samplePosts";
import { FilterState, AITool } from "@/types";

export default function Home() {
  const [filter, setFilter] = useState<FilterState>({
    aiTool: "all",
    source: "all",
    sortBy: "likes",
  });

  const handleSelectTool = (tool: AITool | "all") => {
    setFilter((prev) => ({ ...prev, aiTool: tool }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Claude Code Spotlight - Top Section */}
        <div className="mb-6">
          <ClaudeCodeSpotlight posts={samplePosts} />
        </div>

        {/* Skills Deep Dive - 専用セクション */}
        <div className="mb-6">
          <SkillsDeepDive posts={samplePosts} />
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - AI Stats */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6 space-y-4">
              <AIToolStats
                posts={samplePosts}
                onSelectTool={handleSelectTool}
                selectedTool={filter.aiTool}
              />

              {/* Quick Summary Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  📈 サマリー
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>総投稿数</span>
                    <span className="font-semibold text-gray-800">
                      {samplePosts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>X 投稿数</span>
                    <span className="font-semibold text-gray-800">
                      {samplePosts.filter((p) => p.source === "x").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Threads 投稿数</span>
                    <span className="font-semibold text-gray-800">
                      {
                        samplePosts.filter((p) => p.source === "threads")
                          .length
                      }
                    </span>
                  </div>
                  <hr className="my-1" />
                  <div className="flex justify-between">
                    <span>Claude Code 関連</span>
                    <span className="font-semibold text-orange-600">
                      {samplePosts.filter((p) => p.isClaudeCode).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>合計いいね数</span>
                    <span className="font-semibold text-gray-800">
                      {(
                        samplePosts.reduce((s, p) => s + p.likes, 0) / 1000
                      ).toFixed(1)}
                      K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Trending Ranking */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <TrendingRanking posts={samplePosts} filter={filter} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 text-xs text-center py-4 mt-12">
        <p>
          AI News Dashboard — サンプルデータで動作中 | 将来的にX/Threads
          API連携予定
        </p>
      </footer>
    </div>
  );
}
