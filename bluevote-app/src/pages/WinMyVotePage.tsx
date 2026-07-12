import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

const ISSUES = [
  "Economy & Jobs", "Healthcare", "Education", "Climate & Environment",
  "Immigration", "Criminal Justice", "Gun Policy", "Voting Rights",
  "Housing", "Infrastructure", "Foreign Policy", "Social Security",
];

const STANCES: Record<string, string[]> = {
  "Economy & Jobs": ["Tax cuts", "Raise minimum wage", "Job training programs", "Reduce regulations", "Expand unions"],
  "Healthcare": ["Universal healthcare", "Expand ACA", "Free market approach", "Lower drug prices", "Mental health funding"],
  "Education": ["Free public college", "School choice/vouchers", "Increase teacher pay", "Student debt relief", "STEM investment"],
  "Climate & Environment": ["Green New Deal", "Carbon tax", "Nuclear energy", "Fossil fuel investment", "Paris Agreement"],
  "Immigration": ["Path to citizenship", "Border security", "DACA protection", "Merit-based system", "Sanctuary cities"],
  "Criminal Justice": ["Police reform", "End cash bail", "Mandatory minimums", "Community policing", "Drug decriminalization"],
  "Gun Policy": ["Universal background checks", "Assault weapon ban", "Red flag laws", "Concealed carry", "Second Amendment"],
  "Voting Rights": ["Automatic registration", "Voter ID laws", "Early voting expansion", "Mail-in voting", "Gerrymandering reform"],
  "Housing": ["Affordable housing", "Rent control", "Zoning reform", "First-time buyer aid", "Homelessness solutions"],
  "Infrastructure": ["Roads & bridges", "Public transit", "Broadband expansion", "Smart grid", "Water infrastructure"],
  "Foreign Policy": ["Diplomacy first", "Strong military", "Trade agreements", "NATO support", "Foreign aid"],
  "Social Security": ["Expand benefits", "Raise retirement age", "Privatize accounts", "Remove cap", "Preserve current"],
};

type Priority = { issue: string; importance: "critical" | "important" | "nice_to_have"; stance: string };

export function WinMyVotePage() {
  const races = useQuery(api.races.list, {});
  const matchCandidates = useMutation(api.voterMatch.matchCandidates);
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [currentIssue, setCurrentIssue] = useState("");
  const [currentImportance, setCurrentImportance] = useState<"critical" | "important" | "nice_to_have">("important");
  const [currentStance, setCurrentStance] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"select" | "issues" | "results">("select");

  const addPriority = () => {
    if (!currentIssue || !currentStance) return;
    setPriorities([...priorities, { issue: currentIssue, importance: currentImportance, stance: currentStance }]);
    setCurrentIssue("");
    setCurrentStance("");
  };

  const removePriority = (idx: number) => {
    setPriorities(priorities.filter((_, i) => i !== idx));
  };

  const runMatch = async () => {
    if (!selectedRace || priorities.length === 0) return;
    setLoading(true);
    try {
      const res = await matchCandidates({
        raceId: selectedRace as Id<"races">,
        priorities,
        sessionId: `session_${Date.now()}`,
      });
      setResults(res);
      setStep("results");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Win My Vote</h1>
        <p className="text-white/50 text-sm mt-1">AI-powered candidate matching based on your priorities</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-4">
        {["Select Race", "Your Issues", "Results"].map((s, i) => {
          const stepKey = ["select", "issues", "results"][i];
          const isActive = step === stepKey;
          const isDone = (step === "issues" && i === 0) || (step === "results" && i < 2);
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                isActive ? "bg-blue-500 text-white" : isDone ? "bg-blue-500/30 text-blue-400" : "bg-white/10 text-white/30"
              }`}>
                {isDone ? "\u2713" : i + 1}
              </div>
              <span className={`text-xs ${isActive ? "text-white" : "text-white/30"}`}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-white/10" />}
            </div>
          );
        })}
      </div>

      {step === "select" && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Choose a Race</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {races?.map(race => (
              <button
                key={race._id}
                onClick={() => { setSelectedRace(race._id); setStep("issues"); }}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  selectedRace === race._id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="text-white text-sm font-medium">{race.title}</div>
                <div className="text-white/40 text-xs mt-1">{race.state}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "issues" && (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Add Your Priorities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select value={currentIssue} onChange={e => { setCurrentIssue(e.target.value); setCurrentStance(""); }}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white">
                <option value="">Select issue...</option>
                {ISSUES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <select value={currentStance} onChange={e => setCurrentStance(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white" disabled={!currentIssue}>
                <option value="">Select stance...</option>
                {(STANCES[currentIssue] || []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex gap-2">
                <select value={currentImportance} onChange={e => setCurrentImportance(e.target.value as any)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white flex-1">
                  <option value="critical">Critical</option>
                  <option value="important">Important</option>
                  <option value="nice_to_have">Nice to have</option>
                </select>
                <button onClick={addPriority} disabled={!currentIssue || !currentStance}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-blue-600">
                  Add
                </button>
              </div>
            </div>

            {priorities.length > 0 && (
              <div className="space-y-2">
                {priorities.map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        p.importance === "critical" ? "bg-red-500/20 text-red-400" :
                        p.importance === "important" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-white/10 text-white/40"
                      }`}>{p.importance}</span>
                      <span className="text-white text-sm">{p.issue}</span>
                      <span className="text-white/40 text-xs">{p.stance}</span>
                    </div>
                    <button onClick={() => removePriority(i)} className="text-white/30 hover:text-red-400 text-sm">X</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep("select")} className="px-4 py-2 rounded-lg border border-white/20 text-white/60 text-sm">Back</button>
            <button onClick={runMatch} disabled={priorities.length === 0 || loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium disabled:opacity-30 hover:bg-blue-600">
              {loading ? "Matching..." : `Match Me (${priorities.length} priorities)`}
            </button>
          </div>
        </div>
      )}

      {step === "results" && results && (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Your Matches</h2>
            <div className="space-y-4">
              {results.map((r, i) => (
                <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        r.party === "democrat" ? "bg-blue-600" : r.party === "republican" ? "bg-red-600" : "bg-purple-600"
                      }`}>
                        {r.candidateName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{r.candidateName}</div>
                        <div className="text-white/40 text-xs">{r.party.charAt(0).toUpperCase() + r.party.slice(1)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        r.matchScore >= 70 ? "text-green-400" : r.matchScore >= 40 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {r.matchScore}%
                      </div>
                      <div className="text-white/30 text-xs">Match Score</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                    <div className={`h-2 rounded-full ${
                      r.matchScore >= 70 ? "bg-green-500" : r.matchScore >= 40 ? "bg-yellow-500" : "bg-red-500"
                    }`} style={{ width: `${r.matchScore}%` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {r.breakdown.map((b: any, j: number) => (
                      <div key={j} className="flex items-center gap-2 text-xs">
                        <span className={`w-2 h-2 rounded-full ${
                          b.alignment === "strong_match" ? "bg-green-500" :
                          b.alignment === "partial_match" ? "bg-yellow-500" : "bg-red-500"
                        }`} />
                        <span className="text-white/50">{b.issue}</span>
                        <span className={`ml-auto ${
                          b.alignment === "strong_match" ? "text-green-400" :
                          b.alignment === "partial_match" ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {b.alignment.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { setStep("select"); setResults(null); setPriorities([]); }}
            className="px-4 py-2 rounded-lg border border-white/20 text-white/60 text-sm">Start Over</button>
        </div>
      )}
    </div>
  );
}
