import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const categoryColors: Record<string, { bg: string; text: string }> = {
  Healthcare: { bg: "bg-red-500/20", text: "text-red-400" },
  Economy: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  Infrastructure: { bg: "bg-amber-500/20", text: "text-amber-400" },
  Education: { bg: "bg-blue-500/20", text: "text-blue-400" },
};

export function WinMyVotePage() {
  const issues = useQuery(api.voterIssues.list, {});

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Win My Vote</h1>
        <p className="text-white/50 mt-1">What Georgia voters care about most -- ranked by community</p>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-[#1C3C73]/10 to-[#BF0F06]/5 border border-white/[0.06] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{(issues ?? []).length}</div>
            <div className="text-xs text-white/30">Issues Raised</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{(issues ?? []).reduce((s, i) => s + i.upvotes, 0).toLocaleString()}</div>
            <div className="text-xs text-white/30">Total Upvotes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{(issues ?? []).filter(i => i.status !== "open").length}</div>
            <div className="text-xs text-white/30">Addressed</div>
          </div>
        </div>
      </div>

      {/* Issue Cards */}
      <div className="space-y-4">
        {(issues ?? []).map((issue, index) => {
          const cc = categoryColors[issue.category] || { bg: "bg-gray-500/20", text: "text-gray-400" };
          return (
            <div key={issue._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex gap-5">
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-white/20">#{index + 1}</div>
                <div className="px-3 py-2 bg-[#BF0F06]/10 border border-[#BF0F06]/20 rounded-lg text-center">
                  <div className="text-lg font-bold text-[#BF0F06]">{issue.upvotes}</div>
                  <div className="text-[10px] text-white/20">votes</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}`}>{issue.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${issue.status === "open" ? "bg-gray-500/20 text-gray-400" : issue.status === "responded" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>{issue.status}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{issue.title}</h3>
                <p className="text-white/40 text-sm">{issue.description}</p>
                {issue.responses.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {issue.responses.map((r, ri) => (
                      <div key={ri} className="p-3 bg-[#1C3C73]/10 border border-[#1C3C73]/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#7ba3d9] text-xs font-medium">{r.candidateName}</span>
                          <span className="text-white/20 text-xs">{r.date}</span>
                        </div>
                        <p className="text-white/50 text-sm">{r.response}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
