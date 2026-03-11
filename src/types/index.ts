export type SNSSource = "x" | "threads";

export type AITool =
  | "ChatGPT"
  | "Claude"
  | "Gemini"
  | "Midjourney"
  | "Stable Diffusion"
  | "Copilot"
  | "Perplexity"
  | "その他";

export type ClaudeCodeTag =
  | "Skills"
  | "MCP"
  | "Hooks"
  | "Agent SDK"
  | "Tips"
  | "General";

export interface Post {
  id: string;
  author: string;
  authorHandle: string;
  content: string;
  source: SNSSource;
  aiTool: AITool;
  likes: number;
  reposts: number;
  replies: number;
  postedAt: string;
  isClaudeCode?: boolean;
  claudeCodeTag?: ClaudeCodeTag;
}

export type SkillsCategory =
  | "デプロイ・CI/CD"
  | "テスト"
  | "コード生成"
  | "レビュー・品質"
  | "ドキュメント"
  | "セキュリティ"
  | "ワークフロー"
  | "入門・Tips";

export type SortKey = "likes" | "reposts" | "newest";

export interface FilterState {
  aiTool: AITool | "all";
  source: SNSSource | "all";
  sortBy: SortKey;
}
