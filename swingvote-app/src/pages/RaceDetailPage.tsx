import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import type { Id } from "../../convex/_generated/dataModel";

export function RaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const race = useQuery(api.races.getWithCandidates, id ? { id: id as Id<"races"> } : "skip");
  const createPledge = useMutation(api.pledges.create);
  const [pledgeCandidate, setPledgeCandidate] = useState<string | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState("25");
  const [pledgeError, setPledgeError] = useState("");
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  if (!race) {
    return (
      <div className="text-center py-16 text-purple-300/40">
        {race === undefined ? "Loading..." : "Race not found"}
      </div>
    );
  }

  const handlePledge = async () => {
    if (!pledgeCandidate) return;
    const amount = parseFloat(pledgeAmount);
    if (isNaN(amount) || amount < 5) {
      setPledgeError("Minimum pledge is $5");
      return;
    }
    try {
      await createPledge({
        candidateId: pledgeCandidate as Id<"candidates">,
        raceId: race._id,
        amount,
      });
      setPledgeSuccess(true);
      setPledgeCandidate(null);
      setPledgeError("");
    } catch (e: any) {
      setPledgeError(e.message || "Failed to create pledge");
    }
  };

  const totalPledges = race.candidates.reduce((s, c) => s + c.pledgeCount, 0) || 1;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link to="/races" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Races
      </Link>

      {/* Race header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            race.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
          }`}>
            {race.status.charAt(0).toUpperCase() + race.status.slice(1)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">{race.state}</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{race.title}</h1>
        {race.description && <p className="text-purple-300/50 mt-2">{race.description}</p>}
        <div className="flex gap-8 mt-4">
          <div>
            <span className="text-2xl font-bold text-white">{race.totalPledges.toLocaleString()}</span>
            <span className="text-purple-300/40 text-sm ml-2">total pledges</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-purple-400">${race.totalRaised.toLocaleString()}</span>
            <span className="text-purple-300/40 text-sm ml-2">total raised</span>
          </div>
        </div>
      </div>

      {/* Public Pulse bar */}
      {race.pulse && race.pulse.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Public Pulse -- Live Voter Sentiment</h2>
          <div className="flex rounded-full overflow-hidden h-8 mb-4">
            {race.pulse.map((p, _i) => (
              <div
                key={p.candidateId}
                className={`flex items-center justify-center text-xs font-bold text-white ${
                  p.party === "democrat" ? "bg-purple-500" : p.party === "republican" ? "bg-red-500" : "bg-gray-500"
                }`}
                style={{ width: `${p.percentageOfVotes}%` }}
              >
                {p.percentageOfVotes > 15 ? `${p.percentageOfVotes.toFixed(1)}%` : ""}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {race.pulse.map(p => (
              <div key={p.candidateId} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${
                  p.party === "democrat" ? "bg-purple-500" : p.party === "republican" ? "bg-red-500" : "bg-gray-500"
                }`} />
                <span className="text-white/80">{p.candidateName}</span>
                <span className="text-purple-300/40">{p.pledgeCount.toLocaleString()} pledges</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidates */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Candidates</h2>
        <div className="grid gap-4">
          {race.candidates.map((candidate) => {
            const pct = ((candidate.pledgeCount / totalPledges) * 100).toFixed(1);
            return (
              <div key={candidate._id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                    candidate.party === "democrat" ? "bg-purple-500/30" : candidate.party === "republican" ? "bg-red-500/30" : "bg-gray-500/30"
                  }`}>
                    {candidate.name.split(" ").map(n => n[0]).join("")}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold text-white">{candidate.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        candidate.party === "democrat" ? "bg-purple-500/20 text-purple-400" :
                        candidate.party === "republican" ? "bg-red-500/20 text-red-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {candidate.party.charAt(0).toUpperCase() + candidate.party.slice(1)}
                      </span>
                    </div>
                    <p className="text-purple-300/50 text-sm mb-4">{candidate.bio}</p>

                    {/* Positions */}
                    <div className="grid sm:grid-cols-2 gap-2 mb-4">
                      {candidate.positions.map(pos => (
                        <div key={pos.issue} className="p-3 rounded-lg bg-white/5">
                          <div className="text-xs font-medium text-purple-400 mb-1">{pos.issue}</div>
                          <div className="text-sm text-white/70">{pos.stance}</div>
                        </div>
                      ))}
                    </div>

                    {/* Stats + Pledge button */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-sm">
                        <span className="font-bold text-white">{candidate.pledgeCount.toLocaleString()}</span>
                        <span className="text-purple-300/40 ml-1">pledges ({pct}%)</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-purple-400">${candidate.totalRaised.toLocaleString()}</span>
                        <span className="text-purple-300/40 ml-1">raised</span>
                      </div>
                      <button
                        onClick={() => {
                          setPledgeCandidate(candidate._id);
                          setPledgeSuccess(false);
                          setPledgeError("");
                        }}
                        className="ml-auto px-5 py-2 bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Pledge Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pledge modal */}
      {pledgeCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f2140] border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-2">Pledge Your Support</h3>
            <p className="text-purple-300/50 text-sm mb-6">
              Minimum $5 pledge. One pledge per race per voter.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-300/60 mb-1">Pledge Amount ($)</label>
                <input
                  type="number"
                  min="5"
                  value={pledgeAmount}
                  onChange={e => setPledgeAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg focus:outline-none focus:border-purple-400/50"
                />
              </div>
              <div className="flex gap-2">
                {["5", "10", "25", "50", "100"].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setPledgeAmount(amt)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pledgeAmount === amt
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {pledgeError && (
                <p className="text-red-400 text-sm">{pledgeError}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setPledgeCandidate(null)}
                  className="flex-1 py-3 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePledge}
                  className="flex-1 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-400 transition-colors"
                >
                  Confirm Pledge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pledge success toast */}
      {pledgeSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-xl z-50">
          Pledge submitted successfully!
        </div>
      )}
    </div>
  );
}
