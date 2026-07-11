import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function AnalyticsPage() {
  const races = useQuery(api.races.list, {});
  const activity = useQuery(api.activity.recent);
  const promiseStats = useQuery(api.promises.stats);

  const activeRaces = races?.filter(r => r.status === "active") ?? [];
  const totalRaised = races?.reduce((s, r) => s + r.totalRaised, 0) ?? 0;
  const totalPledges = races?.reduce((s, r) => s + r.totalPledges, 0) ?? 0;
  const statesCovered = new Set(races?.map(r => r.state) ?? []).size;

  // Compute race type breakdown
  const federalRaces = races?.filter(r => r.type === "federal").length ?? 0;
  const stateRaces = races?.filter(r => r.type === "state").length ?? 0;
  const localRaces = races?.filter(r => r.type === "local").length ?? 0;

  // Top states by engagement
  const stateEngagement = races?.reduce((acc, r) => {
    acc[r.state] = (acc[r.state] || 0) + r.totalPledges;
    return acc;
  }, {} as Record<string, number>) ?? {};
  const topStates = Object.entries(stateEngagement)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const maxStatePledges = topStates.length > 0 ? topStates[0][1] : 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-purple-300/60 mt-1">Platform engagement metrics and voter intelligence</p>
      </div>

      {/* Top-Level Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Races", value: activeRaces.length, sub: `across ${statesCovered} states` },
          { label: "Total Pledges", value: totalPledges.toLocaleString(), sub: "voter commitments" },
          { label: "Total Raised", value: `$${totalRaised.toLocaleString()}`, sub: "in pledge value" },
          { label: "Promises Tracked", value: promiseStats?.total ?? 0, sub: `${promiseStats?.byStatus?.fulfilled ?? 0} fulfilled` },
        ].map(m => (
          <div key={m.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <div className="text-sm text-purple-400 mt-1">{m.label}</div>
            <div className="text-xs text-purple-300/30 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Race Type Breakdown */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Race Type Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: "State Races", count: stateRaces, color: "bg-purple-500", pct: races?.length ? Math.round((stateRaces / races.length) * 100) : 0 },
              { label: "Federal Races", count: federalRaces, color: "bg-purple-400", pct: races?.length ? Math.round((federalRaces / races.length) * 100) : 0 },
              { label: "Local Races", count: localRaces, color: "bg-amber-400", pct: races?.length ? Math.round((localRaces / races.length) * 100) : 0 },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">{item.label}</span>
                  <span className="text-white/40">{item.count} races ({item.pct}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promise Status */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Promise Accountability</h2>
          <div className="space-y-4">
            {[
              { label: "Pending", count: promiseStats?.byStatus?.pending ?? 0, color: "bg-yellow-500" },
              { label: "In Progress", count: promiseStats?.byStatus?.in_progress ?? 0, color: "bg-purple-500" },
              { label: "Fulfilled", count: promiseStats?.byStatus?.fulfilled ?? 0, color: "bg-green-500" },
              { label: "Broken", count: promiseStats?.byStatus?.broken ?? 0, color: "bg-red-500" },
              { label: "Modified", count: promiseStats?.byStatus?.modified ?? 0, color: "bg-orange-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-white/70 text-sm flex-1">{item.label}</span>
                <span className="text-white font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top States by Engagement */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 md:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Top States by Voter Engagement</h2>
          <div className="space-y-3">
            {topStates.map(([state, pledges], i) => (
              <div key={state} className="flex items-center gap-4">
                <span className="text-xs text-purple-300/40 w-5">{i + 1}</span>
                <span className="text-white/80 text-sm w-20">{state}</span>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all"
                    style={{ width: `${(pledges / maxStatePledges) * 100}%` }}
                  />
                </div>
                <span className="text-white/40 text-xs w-20 text-right">{pledges.toLocaleString()} pledges</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Platform Activity</h2>
        <div className="space-y-4">
          {activity?.slice(0, 10).map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === "pledge" ? "bg-purple-500" :
                  item.type === "promise_update" ? "bg-green-500" :
                  item.type === "milestone" ? "bg-yellow-500" :
                  "bg-white/20"
                }`} />
                {i < (activity?.length ?? 0) - 1 && <div className="w-px h-8 bg-white/10" />}
              </div>
              <div className="flex-1 -mt-0.5">
                <div className="text-sm text-white/70">{item.message}</div>
                <div className="text-xs text-purple-300/30 mt-0.5">{item.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
