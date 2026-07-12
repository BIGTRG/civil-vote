import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Scale, ChevronDown, X, DollarSign, Users, FileText, Star } from "lucide-react";

interface CandidateForComparison {
  _id: string;
  name: string;
  party: string;
  state: string;
  office: string;
  positions?: string[];
  totalRaised?: number;
  cashOnHand?: number;
}

const ISSUES = [
  "Economy & Jobs",
  "Healthcare",
  "Immigration",
  "Climate & Energy",
  "Education",
  "Gun Policy",
  "Foreign Policy",
  "Criminal Justice",
  "Taxes",
  "Social Security",
  "Housing",
  "Infrastructure",
];

const MOCK_POSITIONS: Record<string, Record<string, string>> = {
  "Economy & Jobs": {
    "D": "Invest in infrastructure, raise minimum wage, support unions",
    "R": "Cut taxes, reduce regulation, support small business",
    "I": "Pragmatic approach balancing growth with worker protections",
  },
  "Healthcare": {
    "D": "Expand ACA, public option, lower prescription drug costs",
    "R": "Market-based solutions, health savings accounts, competition",
    "I": "Universal coverage through mixed public-private system",
  },
  "Immigration": {
    "D": "Pathway to citizenship, DACA protections, humane border policy",
    "R": "Secure borders, merit-based immigration, enforce existing laws",
    "I": "Comprehensive reform with both security and humanitarian focus",
  },
  "Climate & Energy": {
    "D": "Green New Deal, renewable energy investment, carbon pricing",
    "R": "Energy independence, all-of-the-above strategy, market solutions",
    "I": "Balanced transition to clean energy with economic safeguards",
  },
  "Education": {
    "D": "Universal pre-K, student debt relief, increased school funding",
    "R": "School choice, parental rights, vocational training",
    "I": "Local control with federal support for underserved communities",
  },
  "Gun Policy": {
    "D": "Universal background checks, assault weapon ban, red flag laws",
    "R": "Protect 2nd Amendment, enforce existing laws, mental health focus",
    "I": "Common-sense reforms respecting gun rights and public safety",
  },
  "Foreign Policy": {
    "D": "Multilateral engagement, strengthen alliances, diplomacy first",
    "R": "Peace through strength, America First, fair trade deals",
    "I": "Strategic engagement, reduce foreign entanglements",
  },
  "Criminal Justice": {
    "D": "Reform sentencing, end private prisons, police accountability",
    "R": "Support law enforcement, tough on crime, victims rights",
    "I": "Evidence-based reforms, community policing, rehabilitation",
  },
  "Taxes": {
    "D": "Raise taxes on wealthy, corporate minimum tax, expand credits",
    "R": "Lower taxes, simplify code, no new taxes",
    "I": "Fair tax reform closing loopholes, balanced budget priority",
  },
  "Social Security": {
    "D": "Expand benefits, lift payroll tax cap, no cuts",
    "R": "Preserve benefits, modernize system, personal savings options",
    "I": "Protect current benefits, bipartisan solution for solvency",
  },
  "Housing": {
    "D": "Expand affordable housing, rent control, first-time buyer aid",
    "R": "Reduce regulations, increase supply through market, property rights",
    "I": "Increase supply through zoning reform, targeted affordability programs",
  },
  "Infrastructure": {
    "D": "Major federal investment, green infrastructure, public transit",
    "R": "Public-private partnerships, reduce red tape, state-led projects",
    "I": "Bipartisan infrastructure investment with accountability measures",
  },
};

export function ComparePage() {
  const candidates = useQuery(api.candidates.getAll, {});
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCandidates = (candidates || []).filter(c => selected.includes(c._id));

  const getPosition = (candidate: CandidateForComparison, issue: string) => {
    const partyKey = candidate.party === "Democrat" ? "D" : candidate.party === "Republican" ? "R" : "I";
    return MOCK_POSITIONS[issue]?.[partyKey] || "Position not available";
  };

  const partyColor = (party: string) => {
    if (party === "Democrat") return "bg-blue-500";
    if (party === "Republican") return "bg-red-500";
    return "bg-purple-500";
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-7 h-7 text-white/50" />
            <h1 className="text-2xl md:text-3xl font-bold">Compare Candidates</h1>
          </div>
          <p className="text-white/50">Select up to 3 candidates to compare side-by-side on the issues</p>
        </div>

        {/* Selection Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map(slot => {
            const candidate = selectedCandidates[slot];
            return (
              <div key={slot} className="relative">
                {candidate ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <button onClick={() => setSelected(s => s.filter(id => id !== candidate._id))}
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors">
                      <X className="w-4 h-4 text-white/40" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={"w-12 h-12 rounded-full flex items-center justify-center text-white font-bold " + partyColor(candidate.party)}>
                        {candidate.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-xs text-white/40">{candidate.party} -- {candidate.state}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="font-bold">{candidate.totalRaised ? "$" + (candidate.totalRaised / 1000000).toFixed(1) + "M" : "N/A"}</p>
                        <p className="text-white/40">Raised</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="font-bold">{candidate.cashOnHand ? "$" + (candidate.cashOnHand / 1000000).toFixed(1) + "M" : "N/A"}</p>
                        <p className="text-white/40">Cash on Hand</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowPicker(slot)}
                    className="w-full bg-white/[0.02] border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-colors">
                    <Users className="w-8 h-8 mx-auto mb-2 text-white/20" />
                    <p className="text-sm text-white/30">Select Candidate {slot + 1}</p>
                  </button>
                )}

                {showPicker === slot && (
                  <div className="absolute z-50 top-full mt-2 left-0 right-0 bg-[#0f1d33] border border-white/10 rounded-xl shadow-2xl max-h-80 overflow-hidden">
                    <div className="p-3 border-b border-white/10">
                      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search candidates..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none" autoFocus />
                    </div>
                    <div className="overflow-y-auto max-h-56">
                      {(candidates || [])
                        .filter(c => !selected.includes(c._id))
                        .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.state?.toLowerCase().includes(searchTerm.toLowerCase()))
                        .slice(0, 20)
                        .map(c => (
                          <button key={c._id} onClick={() => {
                            setSelected(s => [...s, c._id]);
                            setShowPicker(null);
                            setSearchTerm("");
                          }}
                            className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-3 transition-colors">
                            <div className={"w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white " + partyColor(c.party || "")}>
                              {c.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{c.name}</p>
                              <p className="text-[10px] text-white/40">{c.party} -- {c.state}</p>
                            </div>
                          </button>
                        ))}
                    </div>
                    <button onClick={() => { setShowPicker(null); setSearchTerm(""); }}
                      className="w-full p-2 text-xs text-white/30 hover:text-white/50 border-t border-white/10">Close</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Issue Comparison */}
        {selectedCandidates.length >= 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Issue-by-Issue Comparison</h2>
            {ISSUES.map(issue => (
              <div key={issue} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="font-semibold text-sm">{issue}</h3>
                </div>
                <div className={"grid gap-px bg-white/5 " + (selectedCandidates.length === 2 ? "grid-cols-2" : "grid-cols-3")}>
                  {selectedCandidates.map(c => (
                    <div key={c._id} className="bg-[#0a1628] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={"w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white " + partyColor(c.party || "")}>
                          {(c.party || "")[0]}
                        </div>
                        <span className="text-xs font-medium text-white/60">{c.name}</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">{getPosition(c as CandidateForComparison, issue)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCandidates.length < 2 && (
          <div className="text-center py-16 text-white/20">
            <Scale className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">Select at least 2 candidates to compare</p>
            <p className="text-sm mt-1">Choose from {(candidates || []).length} candidates across 48 states</p>
          </div>
        )}
      </div>
    </div>
  );
}
