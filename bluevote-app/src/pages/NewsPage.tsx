import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const CATEGORIES = ["all", "national", "state", "campaign", "policy", "opinion"] as const;

const SENTIMENT_BADGE: Record<string, string> = {
  positive: "bg-green-500/20 text-green-400",
  negative: "bg-red-500/20 text-red-400",
  neutral: "bg-gray-500/20 text-gray-400",
};

export function NewsPage() {
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const articles = useQuery(api.news.getLatest, category === "all" ? {} : { category: category as any });

  const filtered = articles?.filter(a =>
    !searchTerm || a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Election News</h1>
          <p className="text-white/50 text-sm mt-1">Live news feed from major sources</p>
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 w-64 focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              category === cat
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "text-white/40 hover:text-white/60 border border-white/10"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? filtered.map((article) => (
          <a
            key={article._id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 rounded-xl border border-white/10 p-5 hover:border-blue-500/30 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-400">
                {article.category.toUpperCase()}
              </span>
              {article.sentiment && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${SENTIMENT_BADGE[article.sentiment] || ""}`}>
                  {article.sentiment}
                </span>
              )}
              {article.state && (
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/50">
                  {article.state}
                </span>
              )}
            </div>
            <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
              {article.title}
            </h3>
            <p className="text-white/40 text-xs line-clamp-3 mb-3">{article.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/30 text-[10px]">{article.source}</span>
              <span className="text-white/30 text-[10px]">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </a>
        )) : (
          <div className="col-span-full text-center py-16 text-white/30">
            {articles === undefined ? "Loading articles..." : "No articles found. News feed will populate as data sources connect."}
          </div>
        )}
      </div>

      {/* Source badges */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <div className="text-xs text-white/30 mb-2">Data Sources</div>
        <div className="flex flex-wrap gap-2">
          {["AP News", "Reuters", "NPR", "PBS", "C-SPAN", "Ballotpedia", "FiveThirtyEight", "RealClearPolitics"].map(s => (
            <span key={s} className="px-2 py-1 rounded bg-white/5 text-white/40 text-[10px]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
