import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Pending" },
  in_progress: { bg: "bg-blue-500/20", text: "text-blue-400", label: "In Progress" },
  fulfilled: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Fulfilled" },
  broken: { bg: "bg-red-500/20", text: "text-red-400", label: "Broken" },
  modified: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Modified" },
};

export function PromiseLedgerPage() {
  const promises = useQuery(api.promises.list, {});
  const stats = useQuery(api.promises.stats);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? (promises ?? []).filter(p => p.status === filter) : (promises ?? []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Promise Ledger</h1>
        <p className="text-white/50 mt-1">Every campaign promise -- tracked and verified</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-6 gap-3">
          <button onClick={() => setFilter(null)} className={`p-3 rounded-xl text-center transition-colors ${!filter ? "bg-white/10 border border-white/20" : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]"}`}>
            <div className="text-xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-white/30">All</div>
          </button>
          {Object.entries(stats.byStatus).map(([status, count]) => {
            const sc = statusConfig[status];
            return (
              <button key={status} onClick={() => setFilter(status === filter ? null : status)} className={`p-3 rounded-xl text-center transition-colors ${filter === status ? "bg-white/10 border border-white/20" : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]"}`}>
                <div className={`text-xl font-bold ${sc?.text ?? "text-white"}`}>{count}</div>
                <div className="text-xs text-white/30">{sc?.label ?? status}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Promise Cards */}
      <div className="space-y-4">
        {filtered.map(p => {
          const sc = statusConfig[p.status];
          return (
            <div key={p._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{p.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sc?.bg ?? "bg-gray-500/20"} ${sc?.text ?? "text-gray-400"}`}>{sc?.label ?? p.status}</span>
                    <span className="text-xs text-white/20 px-2 py-0.5 rounded-full bg-white/5">{p.category}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-white/20">
                  Promised {new Date(p.datePromised + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <p className="text-white/40 text-sm mb-3">{p.description}</p>
              {p.evidence.length > 0 && (
                <div className="border-t border-white/5 pt-3">
                  <div className="text-xs text-white/30 mb-2">Evidence Trail</div>
                  <div className="space-y-1">
                    {p.evidence.map((e, i) => (
                      <div key={i} className="text-xs text-white/30 flex gap-2">
                        <span className="text-white/20 shrink-0">{new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <span>{e.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs text-white/10 mt-2 font-mono">#{p.hash}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
