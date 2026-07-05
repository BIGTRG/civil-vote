import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const anyApi = api as any;

export function PublicPulsePage() {
  const races = useQuery(anyApi.races.list) ?? [];
  const pulseData = useQuery(anyApi.publicPulse.list) ?? [];
  const _candidates = useQuery(anyApi.candidates.list) ?? [];

  // Aggregate stats
  const totalRaces = races.length;
  const activeRaces = races.filter((r: any) => r.status === "active").length;
  const repPledges = pulseData.filter((p: any) => p.party === "republican").reduce((sum: number, p: any) => sum + p.pledgeCount, 0);
  const demPledges = pulseData.filter((p: any) => p.party === "democrat").reduce((sum: number, p: any) => sum + p.pledgeCount, 0);

  // Group pulse by race
  const raceIds = [...new Set(pulseData.map((p: any) => p.raceId))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Public Pulse</h1>
      <p className="text-red-300/60 mb-8">Real-time verified voter sentiment -- not polls, real pledges</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-red-500/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{totalRaces}</div>
          <div className="text-red-200/40 text-xs mt-1">Total Races</div>
        </div>
        <div className="bg-white/5 border border-red-500/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{activeRaces}</div>
          <div className="text-red-200/40 text-xs mt-1">Active Races</div>
        </div>
        <div className="bg-white/5 border border-red-500/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">{repPledges.toLocaleString()}</div>
          <div className="text-red-200/40 text-xs mt-1">Republican Pledges</div>
        </div>
        <div className="bg-white/5 border border-red-500/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">{demPledges.toLocaleString()}</div>
          <div className="text-red-200/40 text-xs mt-1">Democrat Pledges</div>
        </div>
      </div>

      {/* Per-race pulse */}
      <div className="space-y-6">
        {raceIds.map((raceId: any) => {
          const race = races.find((r: any) => r._id === raceId);
          const racePulse = pulseData.filter((p: any) => p.raceId === raceId);
          // Sort: republican first
          const sorted = [...racePulse].sort((a: any, _b: any) => a.party === "republican" ? -1 : 1);

          return (
            <div key={raceId} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-500/20 text-red-300 text-xs font-medium px-2 py-0.5 rounded-full">{race?.state}</span>
                <h3 className="text-lg font-bold text-white">{race?.title ?? "Race"}</h3>
              </div>

              {/* Bar */}
              <div className="flex rounded-xl overflow-hidden h-10 mb-4">
                {sorted.map((p: any) => (
                  <div key={p._id}
                    className={`flex items-center justify-center text-white text-sm font-bold ${p.party === "republican" ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${p.percentageOfVotes}%` }}>
                    {p.percentageOfVotes}%
                  </div>
                ))}
              </div>

              {/* Candidate details */}
              <div className="grid grid-cols-2 gap-4">
                {sorted.map((p: any) => (
                  <div key={p._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${p.party === "republican" ? "bg-red-500" : "bg-blue-500"}`} />
                      <div>
                        <div className="text-white text-sm font-medium">{p.candidateName}</div>
                        <div className="text-red-200/40 text-xs capitalize">{p.party}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{p.pledgeCount.toLocaleString()}</div>
                      <div className="text-red-200/40 text-xs">${p.totalRaised.toLocaleString()}</div>
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
