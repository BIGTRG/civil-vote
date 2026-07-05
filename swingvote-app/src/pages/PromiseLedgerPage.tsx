import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  in_progress: { bg: "bg-purple-500/20", text: "text-purple-400" },
  fulfilled: { bg: "bg-green-500/20", text: "text-green-400" },
  broken: { bg: "bg-red-500/20", text: "text-red-400" },
  modified: { bg: "bg-orange-500/20", text: "text-orange-400" },
};

export function PromiseLedgerPage() {
  const promises = useQuery(api.promises.list, {});
  const stats = useQuery(api.promises.stats);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filtered = promises?.filter(p => !statusFilter || p.status === statusFilter) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Promise Ledger</h1>
        <p className="text-purple-300/60 mt-1">The Carfax for politicians -- every promise recorded, tracked, and verified</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Total Promises", value: stats.total, color: "text-white" },
            { label: "Pending", value: stats.byStatus.pending, color: "text-yellow-400" },
            { label: "In Progress", value: stats.byStatus.in_progress, color: "text-purple-400" },
            { label: "Fulfilled", value: stats.byStatus.fulfilled, color: "text-green-400" },
            { label: "Broken", value: stats.byStatus.broken, color: "text-red-400" },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-purple-300/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["", "pending", "in_progress", "fulfilled", "broken", "modified"].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {status ? status.replace("_", " ").replace(/^\w/, c => c.toUpperCase()) : "All"}
          </button>
        ))}
      </div>

      {/* Promise list */}
      <div className="space-y-4">
        {filtered.map((promise) => {
          const colors = STATUS_COLORS[promise.status] ?? STATUS_COLORS.pending;
          return (
            <div key={promise._id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      {promise.status.replace("_", " ").replace(/^\w/, c => c.toUpperCase())}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/60">
                      {promise.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{promise.title}</h3>
                  <p className="text-purple-300/50 text-sm">{promise.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      promise.candidateParty === "democrat" ? "bg-purple-500/30" : "bg-red-500/30"
                    }`}>
                      {promise.candidateName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{promise.candidateName}</div>
                      <div className="text-xs text-purple-300/40">{promise.raceName}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence chain */}
              {promise.evidence.length > 0 && (
                <div className="border-t border-white/5 pt-4">
                  <div className="text-xs text-purple-300/40 mb-2">Evidence Chain</div>
                  <div className="space-y-2">
                    {promise.evidence.map((e, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <div>
                          <span className="text-white/40 text-xs">{e.date}</span>
                          <span className="text-white/70 ml-2">{e.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs font-mono text-purple-300/30">
                    Hash: {promise.hash}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-purple-300/40">
            {promises === undefined ? "Loading promises..." : "No promises found."}
          </div>
        )}
      </div>
    </div>
  );
}
