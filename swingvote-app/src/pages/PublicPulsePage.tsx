import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function PublicPulsePage() {
  const overview = useQuery(api.publicPulse.overview);

  if (!overview) {
    return <div className="text-center py-16 text-purple-300/40">Loading Public Pulse...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Public Pulse</h1>
        <p className="text-purple-300/60 mt-1">Real-time verified voter sentiment -- not polls, real pledges</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Races", value: overview.totalRaces },
          { label: "Active Races", value: overview.activeRaces },
          { label: "Democrat Pledges", value: overview.partyTotals?.democrat?.pledges ?? 0, color: "text-purple-400" },
          { label: "Republican Pledges", value: overview.partyTotals?.republican?.pledges ?? 0, color: "text-red-400" },
        ].map(stat => (
          <div key={stat.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className={`text-2xl font-bold ${stat.color ?? "text-white"}`}>
              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
            </div>
            <div className="text-xs text-purple-300/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Race-by-race pulse */}
      <div className="space-y-6">
        {overview.raceData.map((race) => {
          const totalPledges = race.candidates.reduce((s, c) => s + c.pledgeCount, 0) || 1;
          return (
            <div key={race.raceId} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                  {race.state}
                </span>
                <h2 className="text-lg font-semibold text-white">{race.raceTitle}</h2>
              </div>

              {/* Pulse bar */}
              <div className="flex rounded-full overflow-hidden h-10 mb-4">
                {race.candidates.map((c) => {
                  const pct = (c.pledgeCount / totalPledges) * 100;
                  return (
                    <div
                      key={c.candidateId}
                      className={`flex items-center justify-center text-sm font-bold text-white transition-all ${
                        c.party === "democrat" ? "bg-purple-500" : c.party === "republican" ? "bg-red-500" : "bg-gray-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    >
                      {pct > 20 ? `${pct.toFixed(1)}%` : ""}
                    </div>
                  );
                })}
              </div>

              {/* Candidate breakdown */}
              <div className="grid sm:grid-cols-2 gap-3">
                {race.candidates.map(c => (
                  <div key={c.candidateId} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        c.party === "democrat" ? "bg-purple-500" : c.party === "republican" ? "bg-red-500" : "bg-gray-500"
                      }`} />
                      <div>
                        <div className="text-sm font-medium text-white">{c.candidateName}</div>
                        <div className="text-xs text-purple-300/40 capitalize">{c.party}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{c.pledgeCount.toLocaleString()}</div>
                      <div className="text-xs text-purple-300/40">${c.totalRaised.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
