import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const anyApi = api as any;

export function WinMyVotePage() {
  const issues = useQuery(anyApi.voterIssues.list) ?? [];
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", "Economy", "Healthcare", "Education", "Housing", "Infrastructure", "Environment", "Public Safety", "Immigration", "Labor", "Other"];

  const filtered = categoryFilter === "all" ? issues : issues.filter((i: any) => i.category === categoryFilter);

  const statusColors: Record<string, string> = {
    open: "bg-red-500/20 text-red-400",
    acknowledged: "bg-yellow-500/20 text-yellow-400",
    responded: "bg-blue-500/20 text-blue-400",
    resolved: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-white">Win My Vote</h1>
        <button className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Submit Issue
        </button>
      </div>
      <p className="text-red-300/60 mb-8">Tell candidates what matters to you. Two-way accountability.</p>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${categoryFilter === cat ? "bg-red-600 text-white" : "bg-white/5 text-red-200/60 hover:bg-white/10"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Issues */}
      <div className="space-y-4">
        {filtered.map((issue: any) => (
          <div key={issue._id} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              {/* Upvote */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <span className="text-white font-bold text-lg">{issue.upvotes.toLocaleString()}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusColors[issue.status] || "bg-white/10 text-white/60"}`}>
                    {issue.status}
                  </span>
                  <span className="bg-white/10 text-white/60 text-xs px-2.5 py-0.5 rounded-full">{issue.category}</span>
                  <span className="bg-red-500/20 text-red-300 text-xs px-2.5 py-0.5 rounded-full">{issue.state}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{issue.title}</h3>
                <p className="text-red-200/50 text-sm">{issue.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
