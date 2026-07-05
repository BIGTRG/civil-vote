import { useQuery } from "convex/react";
import {
  Map, Target, TrendingUp, Users, AlertCircle,
  ChevronRight, BarChart3,
} from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

const priorityColors: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  low: "bg-white/10 text-white/50 border-white/15",
};

const regionColors: Record<string, string> = {
  "Metro Atlanta": "text-blue-400",
  "Coastal": "text-cyan-400",
  "Central GA": "text-amber-400",
  "West GA": "text-orange-400",
  "South GA": "text-green-400",
  "North GA": "text-purple-400",
  "Northeast GA": "text-pink-400",
};

export function StrategyPage() {
  const overview = useQuery(api.countyTargets.getStrategyOverview);
  const allCounties = useQuery(api.countyTargets.getAll);
  const [filter, setFilter] = useState<string>("all");

  const filtered = allCounties?.filter((c) =>
    filter === "all" ? true : c.priority === filter
  ) ?? [];

  const sorted = [...filtered].sort((a, b) => b.targetVoters - a.targetVoters);

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Voter Acquisition Strategy</h1>
        <p className="text-white/40 mt-1">County-level targets to reach 2.2M votes</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Counties Tracked", value: overview?.totalCounties ?? 0, icon: Map, color: "text-blue-400" },
          { label: "Target Voters", value: ((overview?.totalTarget ?? 0) / 1000000).toFixed(1) + "M", icon: Target, color: "text-red-400" },
          { label: "Current Pledges", value: (overview?.totalPledges ?? 0).toLocaleString(), icon: Users, color: "text-green-400" },
          { label: "Overall Progress", value: (overview?.overallProgress ?? 0).toFixed(2) + "%", icon: TrendingUp, color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="p-4 md:p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-white/40 text-xs md:text-sm">{s.label}</span>
            </div>
            <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* The Math */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-[#1C3C73]/15 to-[#BF0F06]/10 border border-white/[0.06] rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-white/60" />
          <h2 className="text-lg font-bold text-white">The Math to Win Georgia</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">GA Registered Voters (2026)</span>
              <span className="text-white font-medium text-sm">7,540,601</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">D-Leaning Registration</span>
              <span className="text-blue-400 font-medium text-sm">43% (~3.24M)</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">R-Leaning Registration</span>
              <span className="text-red-400 font-medium text-sm">27% (~2.04M)</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">Independent Registration</span>
              <span className="text-purple-400 font-medium text-sm">30% (~2.26M)</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-[#BF0F06]/10 border border-[#BF0F06]/20 rounded-lg">
              <span className="text-white/70 text-sm font-medium">Votes Needed to Win</span>
              <span className="text-[#BF0F06] font-bold text-sm">2,100,000+</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">Required Turnout</span>
              <span className="text-amber-400 font-medium text-sm">57%+ of registered</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">Need from Independents</span>
              <span className="text-purple-400 font-medium text-sm">55%+ share</span>
            </div>
            <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
              <span className="text-white/50 text-sm">Abrams 2018 Benchmark</span>
              <span className="text-white/60 font-medium text-sm">1,923,685 votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Breakdown */}
      {overview?.byRegion && (
        <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">By Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(overview.byRegion)
              .sort((a, b) => b[1].target - a[1].target)
              .map(([region, data]) => {
                const pct = data.target > 0 ? (data.pledges / data.target) * 100 : 0;
                return (
                  <div key={region} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                    <div className={`text-sm font-medium ${regionColors[region] || "text-white/70"}`}>{region}</div>
                    <div className="text-white/30 text-xs mt-1">{data.counties} counties</div>
                    <div className="text-white font-bold mt-2">{(data.target / 1000).toFixed(0)}K target</div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="h-full bg-green-500/70 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                    </div>
                    <div className="text-[10px] text-white/20 mt-1">{data.pledges.toLocaleString()} pledges</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Priority Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "critical", "high", "medium", "low"].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === p
                ? "bg-white/10 text-white border border-white/20"
                : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:bg-white/[0.06]"
            }`}
          >
            {p === "all" ? "All Counties" : p.charAt(0).toUpperCase() + p.slice(1)}
            {p !== "all" && allCounties && (
              <span className="ml-1 opacity-50">
                ({allCounties.filter((c) => c.priority === p).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* County Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[1fr_80px_100px_80px_100px_60px] gap-2 px-4 py-2 text-xs text-white/30 uppercase tracking-wider border-b border-white/[0.06]">
            <span>County</span>
            <span>Priority</span>
            <span>Target</span>
            <span>Pledges</span>
            <span>Registration</span>
            <span>Progress</span>
          </div>
          <div className="space-y-1 mt-1">
            {sorted.map((county) => {
              const pct = county.percentComplete;
              return (
                <div
                  key={county._id}
                  className="grid grid-cols-[1fr_80px_100px_80px_100px_60px] gap-2 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg items-center transition-colors"
                >
                  <div>
                    <span className={`font-medium text-sm ${regionColors[county.region] || "text-white/80"}`}>
                      {county.county}
                    </span>
                    <span className="text-white/20 text-xs ml-2">{county.region}</span>
                  </div>
                  <div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityColors[county.priority]}`}>
                      {county.priority}
                    </span>
                  </div>
                  <span className="text-white/60 text-sm">{(county.targetVoters / 1000).toFixed(0)}K</span>
                  <span className="text-green-400 text-sm font-medium">{county.currentPledges.toLocaleString()}</span>
                  <div className="text-[10px] text-white/30">
                    <span className="text-blue-400">D:{(county.demRegistered / 1000).toFixed(0)}K</span>
                    {" "}
                    <span className="text-red-400">R:{(county.repRegistered / 1000).toFixed(0)}K</span>
                    {" "}
                    <span className="text-purple-400">I:{(county.indRegistered / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct > 5 ? "bg-green-500" : pct > 1 ? "bg-amber-500" : "bg-red-500/50"}`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strategy Notes */}
      <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-white/40" />
          <h2 className="text-lg font-bold text-white">County Strategies</h2>
        </div>
        <div className="space-y-3">
          {sorted
            .filter((c) => c.strategy)
            .slice(0, 10)
            .map((county) => (
              <div key={county._id} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg">
                <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${
                  county.priority === "critical" ? "text-red-400" :
                  county.priority === "high" ? "text-amber-400" : "text-blue-400"
                }`} />
                <div>
                  <span className="text-white/80 text-sm font-medium">{county.county} County</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ml-2 ${priorityColors[county.priority]}`}>
                    {county.priority}
                  </span>
                  <p className="text-white/40 text-sm mt-1">{county.strategy}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
