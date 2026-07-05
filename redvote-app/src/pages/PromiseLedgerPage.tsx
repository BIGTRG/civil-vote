import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const anyApi = api as any;

export function PromiseLedgerPage() {
  const promises = useQuery(anyApi.promises.list) ?? [];
  const candidates = useQuery(anyApi.candidates.list) ?? [];
  const races = useQuery(anyApi.races.list) ?? [];
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? promises : promises.filter((p: any) => p.status === filter);

  const statusCounts = {
    all: promises.length,
    pending: promises.filter((p: any) => p.status === "pending").length,
    in_progress: promises.filter((p: any) => p.status === "in_progress").length,
    fulfilled: promises.filter((p: any) => p.status === "fulfilled").length,
    broken: promises.filter((p: any) => p.status === "broken").length,
    modified: promises.filter((p: any) => p.status === "modified").length,
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    in_progress: "bg-blue-500/20 text-blue-400",
    fulfilled: "bg-green-500/20 text-green-400",
    broken: "bg-red-500/20 text-red-400",
    modified: "bg-purple-500/20 text-purple-400",
  };

  const getCandidateName = (candidateId: string) => {
    const c = candidates.find((c: any) => c._id === candidateId);
    return c?.name ?? "Unknown";
  };

  const getRaceTitle = (raceId: string) => {
    const r = races.find((r: any) => r._id === raceId);
    return r?.title ?? "";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Promise Ledger</h1>
      <p className="text-red-300/60 mb-8">The Carfax for politicians -- every promise recorded, tracked, and verified</p>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Promises", value: statusCounts.all, color: "text-white" },
          { label: "Pending", value: statusCounts.pending, color: "text-yellow-400" },
          { label: "In Progress", value: statusCounts.in_progress, color: "text-blue-400" },
          { label: "Fulfilled", value: statusCounts.fulfilled, color: "text-green-400" },
          { label: "Broken", value: statusCounts.broken, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 border border-red-500/10 rounded-xl p-3 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-red-200/40 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["all", "pending", "in_progress", "fulfilled", "broken", "modified"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${filter === s ? "bg-red-600 text-white" : "bg-white/5 text-red-200/60 hover:bg-white/10"}`}>
            {s === "in_progress" ? "In progress" : s}
          </button>
        ))}
      </div>

      {/* Promise cards */}
      <div className="space-y-4">
        {filtered.map((promise: any) => (
          <div key={promise._id} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${statusColors[promise.status] || "bg-white/10 text-white/60"}`}>
                    {promise.status.replace("_", " ")}
                  </span>
                  <span className="bg-white/10 text-white/60 text-xs px-2.5 py-0.5 rounded-full">{promise.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{promise.title}</h3>
                <p className="text-red-200/50 text-sm mt-1">{promise.description}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                  {getCandidateName(promise.candidateId).split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="text-white text-sm font-medium mt-1">{getCandidateName(promise.candidateId)}</div>
                <div className="text-red-200/40 text-xs">{getRaceTitle(promise.raceId)}</div>
              </div>
            </div>

            {/* Evidence chain */}
            {promise.evidence?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-red-500/10">
                <div className="text-red-300/50 text-xs font-medium mb-2">Evidence Chain</div>
                {promise.evidence.map((e: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-red-200/40 font-mono text-xs">{e.date}</span>
                    <span className="text-white/70">{e.note}</span>
                  </div>
                ))}
                <div className="text-red-200/30 text-xs font-mono mt-2">Hash: {promise.hash}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
