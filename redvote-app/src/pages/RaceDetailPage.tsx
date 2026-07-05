import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams, useNavigate } from "react-router-dom";

const anyApi = api as any;

export function RaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const races = useQuery(anyApi.races.list) ?? [];
  const candidates = useQuery(anyApi.candidates.list) ?? [];
  const pulseData = useQuery(anyApi.publicPulse.list) ?? [];

  const race = races.find((r: any) => r._id === id);
  const raceCandidates = candidates.filter((c: any) => c.raceId === id);
  const racePulse = pulseData.filter((p: any) => p.raceId === id);

  if (!race) {
    return (
      <div className="p-8">
        <div className="text-red-200/40">Loading race...</div>
      </div>
    );
  }

  // Sort pulse: republican first for RedVote
  const sortedPulse = [...racePulse].sort((a: any, _b: any) =>
    a.party === "republican" ? -1 : 1
  );

  return (
    <div className="p-8">
      <button onClick={() => navigate("/races")} className="text-red-400 hover:text-red-300 text-sm mb-4 inline-flex items-center gap-1">
        &lsaquo; Back to Races
      </button>

      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{race.status}</span>
        <span className="bg-red-500/20 text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{race.state}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">{race.title}</h1>
      <p className="text-red-200/50 mb-4">{race.description}</p>
      <div className="flex items-center gap-6 mb-8">
        <div><span className="text-2xl font-bold text-white">{race.totalPledges.toLocaleString()}</span> <span className="text-red-200/40 text-sm">total pledges</span></div>
        <div><span className="text-2xl font-bold text-red-400">${race.totalRaised.toLocaleString()}</span> <span className="text-red-200/40 text-sm">total raised</span></div>
      </div>

      {/* Public Pulse */}
      {sortedPulse.length > 0 && (
        <div className="bg-white/5 border border-red-500/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Public Pulse -- Live Voter Sentiment</h2>
          <div className="flex rounded-xl overflow-hidden h-10 mb-4">
            {sortedPulse.map((p: any) => (
              <div key={p._id}
                className={`flex items-center justify-center text-white text-sm font-bold ${p.party === "republican" ? "bg-red-500" : "bg-blue-500"}`}
                style={{ width: `${p.percentageOfVotes}%` }}>
                {p.percentageOfVotes}%
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {sortedPulse.map((p: any) => (
              <div key={p._id} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${p.party === "republican" ? "bg-red-500" : "bg-blue-500"}`} />
                <span className="text-white">{p.candidateName}</span>
                <span className="text-red-200/40">{p.pledgeCount} pledges</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidates */}
      <h2 className="text-xl font-bold text-white mb-4">Candidates</h2>
      <div className="space-y-6">
        {raceCandidates.map((c: any) => (
          <div key={c._id} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${c.party === "republican" ? "bg-red-600" : "bg-blue-600"}`}>
                {c.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{c.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${c.party === "republican" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                    {c.party}
                  </span>
                </div>
                <p className="text-red-200/50 text-sm mt-1">{c.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {c.positions?.map((pos: any) => (
                <div key={pos.issue} className="bg-white/5 rounded-xl p-3">
                  <div className="text-red-400 text-xs font-medium mb-1">{pos.issue}</div>
                  <div className="text-white/80 text-sm">{pos.stance}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
