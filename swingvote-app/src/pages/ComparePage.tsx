import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useMemo } from "react";
import type { Id } from "../../convex/_generated/dataModel";

const ISSUE_CATEGORIES = [
  "Economy", "Healthcare", "Education", "Immigration", "Climate",
  "Gun Policy", "Social Security", "Foreign Policy", "Criminal Justice", "Housing"
];

export function ComparePage() {
  const races = useQuery(api.races.list, {});
  const [selectedRace, setSelectedRace] = useState<Id<"races"> | null>(null);
  const candidates = useQuery(api.candidates.list, selectedRace ? { raceId: selectedRace } : "skip");
  const [selectedIssues, setSelectedIssues] = useState<string[]>(["Economy", "Healthcare", "Education"]);

  const demCandidate = useMemo(() => candidates?.find(c => c.party === "democrat"), [candidates]);
  const repCandidate = useMemo(() => candidates?.find(c => c.party === "republican"), [candidates]);
  const indCandidates = useMemo(() => candidates?.filter(c => c.party === "independent" || c.party === "other") ?? [], [candidates]);

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const getStance = (candidate: typeof demCandidate, issue: string) => {
    if (!candidate) return null;
    return candidate.positions.find(p => p.issue.toLowerCase().includes(issue.toLowerCase()));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Side by <span className="text-amber-400">Side</span>
        </h1>
        <p className="text-white/50 mt-1">Compare candidates across party lines -- no spin, just positions</p>
      </div>

      {/* Race selector */}
      <div className="bg-[#130e1d] border border-purple-500/10 rounded-2xl p-6">
        <label className="text-white/60 text-sm font-medium block mb-3">Select a Race</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
          {!races ? (
            <div className="col-span-3 text-white/30 text-sm">Loading races...</div>
          ) : races.length === 0 ? (
            <div className="col-span-3 text-white/30 text-sm">No races available yet</div>
          ) : (
            races.map((race) => (
              <button
                key={race._id}
                onClick={() => setSelectedRace(race._id)}
                className={`text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  selectedRace === race._id
                    ? "bg-purple-600/20 border border-purple-400/30 text-white"
                    : "bg-white/5 border border-transparent text-white/60 hover:bg-white/8 hover:text-white"
                }`}
              >
                <div className="font-medium truncate">{race.title}</div>
                <div className="text-xs mt-0.5 opacity-60">{race.state}{race.district ? ` - ${race.district}` : ""}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Issue filter */}
      <div>
        <label className="text-white/60 text-sm font-medium block mb-3">Filter by Issues</label>
        <div className="flex gap-2 flex-wrap">
          {ISSUE_CATEGORIES.map((issue) => (
            <button
              key={issue}
              onClick={() => toggleIssue(issue)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedIssues.includes(issue)
                  ? "bg-amber-500/20 text-amber-400 border border-amber-400/30"
                  : "bg-white/5 text-white/40 hover:text-white/60"
              }`}
            >
              {issue}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison panel */}
      {selectedRace && candidates && (
        <div className="space-y-6">
          {/* Candidate cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Democrat */}
            <div className={`bg-gradient-to-br from-blue-900/20 to-blue-950/10 border border-blue-400/15 rounded-2xl p-6 ${!demCandidate ? 'opacity-40' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                  {demCandidate ? demCandidate.name.charAt(0) : "?"}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{demCandidate?.name ?? "No Democratic Candidate"}</h3>
                  <span className="text-blue-400 text-xs font-medium px-2 py-0.5 bg-blue-500/10 rounded-full">Democrat</span>
                </div>
              </div>
              {demCandidate && (
                <p className="text-white/40 text-sm line-clamp-3">{demCandidate.bio}</p>
              )}
            </div>

            {/* Republican */}
            <div className={`bg-gradient-to-br from-red-900/20 to-red-950/10 border border-red-400/15 rounded-2xl p-6 ${!repCandidate ? 'opacity-40' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg">
                  {repCandidate ? repCandidate.name.charAt(0) : "?"}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{repCandidate?.name ?? "No Republican Candidate"}</h3>
                  <span className="text-red-400 text-xs font-medium px-2 py-0.5 bg-red-500/10 rounded-full">Republican</span>
                </div>
              </div>
              {repCandidate && (
                <p className="text-white/40 text-sm line-clamp-3">{repCandidate.bio}</p>
              )}
            </div>
          </div>

          {/* Independent candidates if any */}
          {indCandidates.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indCandidates.map(c => (
                <div key={c._id} className="bg-gradient-to-br from-purple-900/20 to-purple-950/10 border border-purple-400/15 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">{c.name.charAt(0)}</div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{c.name}</h4>
                      <span className="text-purple-400 text-xs">Independent</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Issue-by-issue comparison */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Issue Comparison</h3>
            {selectedIssues.map((issue) => {
              const demStance = getStance(demCandidate, issue);
              const repStance = getStance(repCandidate, issue);
              return (
                <div key={issue} className="bg-[#130e1d] border border-purple-500/10 rounded-xl overflow-hidden">
                  <div className="bg-purple-600/10 px-5 py-3 border-b border-purple-500/10">
                    <h4 className="text-amber-400 font-medium text-sm">{issue}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-500/10">
                    {/* Democrat stance */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-blue-400 text-xs font-medium">{demCandidate?.name ?? "Democrat"}</span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {demStance ? demStance.stance : "No stated position on this issue"}
                      </p>
                    </div>
                    {/* Republican stance */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span className="text-red-400 text-xs font-medium">{repCandidate?.name ?? "Republican"}</span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {repStance ? repStance.stance : "No stated position on this issue"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Endorsements comparison */}
          {(demCandidate || repCandidate) && (
            <div className="bg-[#130e1d] border border-purple-500/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Endorsements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-blue-400 text-sm font-medium">{demCandidate?.name ?? "Democrat"}</span>
                  </div>
                  {demCandidate?.endorsements?.length ? (
                    <ul className="space-y-1.5">
                      {demCandidate.endorsements.map((e, i) => (
                        <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                          <span className="text-amber-400/60 mt-1">--</span> {e}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/30 text-sm">No endorsements listed</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-red-400 text-sm font-medium">{repCandidate?.name ?? "Republican"}</span>
                  </div>
                  {repCandidate?.endorsements?.length ? (
                    <ul className="space-y-1.5">
                      {repCandidate.endorsements.map((e, i) => (
                        <li key={i} className="text-white/50 text-sm flex items-start gap-2">
                          <span className="text-amber-400/60 mt-1">--</span> {e}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/30 text-sm">No endorsements listed</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!selectedRace && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 opacity-30">&#9878;</div>
          <h3 className="text-white/40 text-lg font-medium">Select a race above to compare candidates</h3>
          <p className="text-white/20 text-sm mt-2">See where every candidate stands -- side by side, no filter</p>
        </div>
      )}

      <div className="text-center py-6 text-white/20 text-xs">
        You decide elections. Powered by SwingVote.
      </div>
    </div>
  );
}
