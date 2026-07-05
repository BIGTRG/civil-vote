import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function PublicPulsePage() {
  const data = useQuery(api.publicPulse.overview);

  if (!data) return <div className="text-white/30 p-8">Loading pulse data...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Public Pulse</h1>
        <p className="text-white/50 mt-1">Real-time pledge tracking and support breakdown</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{data.totalRaces}</div>
          <div className="text-xs text-white/30">Races Tracked</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{data.activeRaces}</div>
          <div className="text-xs text-white/30">Active Races</div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-400">{data.partyTotals["democrat"]?.pledges.toLocaleString() ?? 0}</div>
          <div className="text-xs text-white/30">Democrat Pledges</div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">{data.partyTotals["republican"]?.pledges.toLocaleString() ?? 0}</div>
          <div className="text-xs text-white/30">Republican Pledges</div>
        </div>
      </div>

      {/* Race Data */}
      {data.raceData.map(rd => (
        <div key={rd.raceId} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-1">{rd.raceTitle}</h2>
          <div className="text-sm text-white/30 mb-4">{rd.state}</div>
          <div className="space-y-4">
            {rd.candidates.sort((a, b) => b.percentageOfVotes - a.percentageOfVotes).map(c => (
              <div key={c._id}>
                <div className="flex justify-between items-end mb-1">
                  <div>
                    <span className="text-white font-medium text-sm">{c.candidateName}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${c.party === "democrat" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}>{c.party[0].toUpperCase()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-semibold">{c.percentageOfVotes}%</span>
                    <span className="text-white/20 text-xs ml-2">{c.pledgeCount.toLocaleString()} pledges</span>
                  </div>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.party === "democrat" ? "bg-[#1C3C73]" : "bg-red-600"}`} style={{ width: `${c.percentageOfVotes}%` }} />
                </div>
                <div className="text-white/20 text-xs mt-0.5">${c.totalRaised.toLocaleString()} raised</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Party Breakdown */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Party Breakdown</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(data.partyTotals).map(([party, totals]) => (
            <div key={party} className={`p-4 rounded-lg border ${party === "democrat" ? "bg-blue-500/5 border-blue-500/20" : "bg-red-500/5 border-red-500/20"}`}>
              <div className="text-white font-semibold capitalize mb-2">{party}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-lg font-bold text-white">{totals.pledges.toLocaleString()}</div>
                  <div className="text-xs text-white/30">Pledges</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">${totals.raised.toLocaleString()}</div>
                  <div className="text-xs text-white/30">Raised</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
