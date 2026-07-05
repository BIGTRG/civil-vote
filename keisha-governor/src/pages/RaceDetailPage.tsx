import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";

export function RaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const race = useQuery(api.races.getWithCandidates, id ? { id: id as any } : "skip");

  if (!race) return <div className="text-white/30 p-8">Loading race details...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{race.title}</h1>
        <p className="text-white/50 mt-1">{race.description}</p>
      </div>

      {/* Candidates */}
      <div className="grid md:grid-cols-2 gap-6">
        {race.candidates.map(c => {
          const isD = c.party === "democrat";
          return (
            <div key={c._id} className={`bg-white/[0.03] border rounded-xl p-6 ${isD ? "border-[#1C3C73]/30" : "border-red-500/20"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${isD ? "bg-[#1C3C73]" : "bg-red-700"}`}>
                  {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{c.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isD ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"}`}>{c.party}</span>
                </div>
              </div>
              <p className="text-white/40 text-sm mb-4">{c.bio}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                  <div className="text-xl font-bold text-white">{c.pledgeCount.toLocaleString()}</div>
                  <div className="text-xs text-white/30">Pledges</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                  <div className="text-xl font-bold text-emerald-400">${c.totalRaised.toLocaleString()}</div>
                  <div className="text-xs text-white/30">Raised</div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-2">Positions</h3>
                <div className="space-y-2">
                  {c.positions.map((p, i) => (
                    <div key={i} className="p-2.5 bg-white/[0.02] rounded-lg">
                      <div className="text-white text-xs font-medium">{p.issue}</div>
                      <div className="text-white/40 text-xs mt-0.5">{p.stance}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pulse Data */}
      {race.pulse && race.pulse.length > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Public Pulse</h2>
          <div className="space-y-3">
            {race.pulse.map(p => (
              <div key={p._id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-sm font-medium">{p.candidateName}</span>
                    <span className="text-white/50 text-sm">{p.percentageOfVotes}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${p.party === "democrat" ? "bg-[#1C3C73]" : "bg-red-600"}`} style={{ width: `${p.percentageOfVotes}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
