"use client";

import { useState } from "react";
import { Post } from "@/types";
import PostCard from "./PostCard";

// Skills投稿をカテゴリ分けするキーワードマッピング
const SKILLS_CATEGORIES: {
  id: string;
  label: string;
  emoji: string;
  keywords: string[];
  description: string;
}[] = [
  {
    id: "deploy",
    label: "デプロイ・CI/CD",
    emoji: "🚀",
    keywords: ["deploy", "デプロイ", "pipeline", "CI/CD", "GitHub Actions", "Vercel"],
    description: "デプロイやCI/CDパイプラインの自動化",
  },
  {
    id: "test",
    label: "テスト",
    emoji: "🧪",
    keywords: ["test", "テスト", "カバレッジ", "coverage", "境界値"],
    description: "テスト自動生成・品質向上",
  },
  {
    id: "codegen",
    label: "コード生成",
    emoji: "⚙️",
    keywords: ["component", "コンポーネント", "生成", "作成", "一括", "テンプレ"],
    description: "ボイラープレート・コード自動生成",
  },
  {
    id: "review",
    label: "レビュー・品質",
    emoji: "🔍",
    keywords: ["review", "レビュー", "refactor", "リファクタ", "lint"],
    description: "コードレビュー・品質チェック",
  },
  {
    id: "docs",
    label: "ドキュメント",
    emoji: "📝",
    keywords: ["doc", "ドキュメント", "API", "spec", "Markdown"],
    description: "ドキュメント・API仕様の自動生成",
  },
  {
    id: "security",
    label: "セキュリティ",
    emoji: "🛡️",
    keywords: ["security", "セキュリティ", "OWASP", "脆弱性", "監査"],
    description: "セキュリティ監査・脆弱性チェック",
  },
  {
    id: "workflow",
    label: "ワークフロー",
    emoji: "🔗",
    keywords: ["連携", "フロー", "ワークフロー", "繋げ", "チーム", "共有"],
    description: "Skills連携・チーム共有",
  },
  {
    id: "beginner",
    label: "入門・Tips",
    emoji: "📖",
    keywords: ["入門", "作り方", "始め", "メモ", "定義", "初心者", "カスタム"],
    description: "Skills入門ガイド・活用Tips",
  },
];

function categorizePost(post: Post): string[] {
  const matched: string[] = [];
  for (const cat of SKILLS_CATEGORIES) {
    if (cat.keywords.some((kw) => post.content.includes(kw))) {
      matched.push(cat.id);
    }
  }
  return matched.length > 0 ? matched : ["beginner"];
}

interface SkillsDeepDiveProps {
  posts: Post[];
}

export default function SkillsDeepDive({ posts }: SkillsDeepDiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"likes" | "newest">("likes");

  // Skills関連の投稿のみ抽出
  const skillsPosts = posts.filter(
    (p) => p.isClaudeCode && p.claudeCodeTag === "Skills"
  );

  // カテゴリ別の投稿数をカウント
  const categoryCounts: Record<string, number> = {};
  skillsPosts.forEach((post) => {
    const cats = categorizePost(post);
    cats.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  // フィルタ・ソート
  let filtered =
    selectedCategory === "all"
      ? [...skillsPosts]
      : skillsPosts.filter((p) =>
          categorizePost(p).includes(selectedCategory)
        );

  if (sortBy === "likes") {
    filtered.sort((a, b) => b.likes - a.likes);
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
  }

  // 統計
  const totalLikes = skillsPosts.reduce((sum, p) => sum + p.likes, 0);
  const totalReposts = skillsPosts.reduce((sum, p) => sum + p.reposts, 0);
  const avgLikes = skillsPosts.length
    ? Math.round(totalLikes / skillsPosts.length)
    : 0;

  if (skillsPosts.length === 0) return null;

  return (
    <section
      id="skills-section"
      className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-400 rounded-2xl overflow-hidden shadow-md"
    >
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 px-6 py-5 text-white">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Claude Code Skills 特集
              </h2>
              <p className="text-orange-100 text-xs mt-0.5">
                カスタムコマンドで開発ワークフローを自動化
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="font-bold text-lg">{skillsPosts.length}</span>
              <span className="ml-1 text-orange-100">投稿</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="font-bold text-lg">
                {(totalLikes / 1000).toFixed(1)}K
              </span>
              <span className="ml-1 text-orange-100">❤️ 合計</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="font-bold text-lg">
                {(avgLikes / 1000).toFixed(1)}K
              </span>
              <span className="ml-1 text-orange-100">❤️ 平均</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills概要ボックス */}
      <div className="mx-5 mt-4 bg-white/80 border border-amber-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
          💡 Claude Code Skills とは？
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-[11px]">
            .claude/skills/
          </code>{" "}
          にMarkdownファイルを作成して独自コマンドを定義。
          <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-[11px]">
            /skill名
          </code>{" "}
          で呼び出すだけで、デプロイ・テスト生成・コードレビューなどを自動化できます。
          Gitリポジトリに含めればチーム全員で共有可能。
        </p>
      </div>

      {/* カテゴリフィルタ */}
      <div className="px-5 mt-4">
        <label className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2 block">
          カテゴリ別で探す
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-orange-600 text-white shadow-md scale-105"
                : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"
            }`}
          >
            すべて ({skillsPosts.length})
          </button>
          {SKILLS_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? "all" : cat.id
                  )
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? "bg-orange-600 text-white shadow-md scale-105"
                    : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ソート */}
      <div className="px-5 mt-3 flex items-center gap-2">
        <span className="text-xs text-gray-500">並び替え:</span>
        <button
          onClick={() => setSortBy("likes")}
          className={`px-3 py-1 rounded-full text-xs transition-all ${
            sortBy === "likes"
              ? "bg-amber-700 text-white"
              : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          ❤️ いいね順
        </button>
        <button
          onClick={() => setSortBy("newest")}
          className={`px-3 py-1 rounded-full text-xs transition-all ${
            sortBy === "newest"
              ? "bg-amber-700 text-white"
              : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          🕐 新着順
        </button>
        <span className="ml-auto text-xs text-gray-400">
          {filtered.length}件 表示中
        </span>
      </div>

      {/* 投稿一覧 */}
      <div className="px-5 mt-3 pb-5 space-y-3">
        {filtered.map((post, i) => (
          <PostCard key={post.id} post={post} rank={i + 1} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm">該当するSkills投稿がありません</p>
          </div>
        )}
      </div>

      {/* フッター：人気Skillsコマンド一覧 */}
      <div className="bg-amber-100/50 border-t border-amber-200 px-5 py-4">
        <h4 className="text-xs font-bold text-amber-800 mb-2">
          🏷️ よく使われているSkillsコマンド
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "/deploy",
            "/review",
            "/test-gen",
            "/component",
            "/refactor",
            "/doc",
            "/api-doc",
            "/migrate",
            "/security-scan",
            "/pipeline",
            "/plan",
            "/implement",
          ].map((cmd) => (
            <span
              key={cmd}
              className="bg-white border border-amber-300 text-amber-800 text-[11px] font-mono px-2 py-1 rounded-md"
            >
              {cmd}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
