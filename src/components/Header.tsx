"use client";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🤖</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              AI News Dashboard
            </h1>
            <p className="text-xs text-purple-300">
              生成AI トレンド & ランキング
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <a
            href="#skills-section"
            className="bg-orange-500/90 hover:bg-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
          >
            ⚡ Skills 特集
          </a>
          <span className="text-purple-300 hidden sm:inline">
            {new Date().toLocaleDateString("ja-JP")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs">LIVE</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
