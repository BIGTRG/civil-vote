import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const keyCounties = [
  { name: "Fulton", target: "75%+", lean: "Strong D", registered: 820000 },
  { name: "DeKalb", target: "80%+", lean: "Strong D", registered: 560000 },
  { name: "Gwinnett", target: "55%+", lean: "Swing", registered: 640000 },
  { name: "Cobb", target: "53%+", lean: "Lean D", registered: 530000 },
  { name: "Chatham", target: "58%+", lean: "Lean D", registered: 210000 },
  { name: "Richmond", target: "60%+", lean: "Lean D", registered: 150000 },
  { name: "Bibb", target: "62%+", lean: "Lean D", registered: 120000 },
  { name: "Muscogee", target: "56%+", lean: "Swing", registered: 135000 },
];

export function ElectionIntelligencePage() {
  const history = useQuery(api.electionHistory.list);
  const sorted = [...(history ?? [])].sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Election Intelligence</h1>
        <p className="text-white/50 mt-1">Data-driven analysis of Georgia's political landscape</p>
      </div>

      {/* Last 4 Races */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Last 4 Georgia Governor Races</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-left border-b border-white/5">
                <th className="pb-3 pr-4">Year</th>
                <th className="pb-3 pr-4">Winner</th>
                <th className="pb-3 pr-4">Votes</th>
                <th className="pb-3 pr-4">Runner-Up</th>
                <th className="pb-3 pr-4">Votes</th>
                <th className="pb-3 pr-4">Margin</th>
                <th className="pb-3">Turnout</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(h => (
                <tr key={h._id} className="border-b border-white/[0.03]">
                  <td className="py-3 pr-4 text-white font-semibold">{h.year}</td>
                  <td className="py-3 pr-4">
                    <span className="text-white">{h.winnerName}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${h.winnerParty === "Republican" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>{h.winnerParty[0]}</span>
                  </td>
                  <td className="py-3 pr-4 text-white/60">{h.winnerVotes.toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <span className="text-white/70">{h.loserName}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${h.loserParty === "Republican" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>{h.loserParty[0]}</span>
                  </td>
                  <td className="py-3 pr-4 text-white/60">{h.loserVotes.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-[#BF0F06] font-medium">{h.margin}</td>
                  <td className="py-3 text-white/60">{h.turnoutPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/20 text-xs mt-3">Republicans have won the Georgia governor's race 24 straight years (since 2002)</p>
      </div>

      {/* Voter Registration */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">GA Voter Registration (2026)</h2>
          <div className="text-3xl font-bold text-white mb-6">7,540,601 <span className="text-sm text-white/30 font-normal">total registered</span></div>
          <div className="space-y-4">
            {[
              { label: "D-Leaning", pct: 43, color: "bg-blue-500", count: "3,242,459" },
              { label: "Independent", pct: 30, color: "bg-gray-400", count: "2,262,180" },
              { label: "R-Leaning", pct: 27, color: "bg-red-500", count: "2,035,962" },
            ].map(v => (
              <div key={v.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">{v.label}</span>
                  <span className="text-white/40">{v.count} ({v.pct}%)</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${v.color} rounded-full`} style={{ width: `${v.pct * 2.3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Path to Victory */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Path to Victory</h2>
          <div className="space-y-5">
            <div className="p-4 bg-[#1C3C73]/15 border border-[#1C3C73]/30 rounded-lg">
              <div className="text-2xl font-bold text-white">2,100,000+</div>
              <div className="text-sm text-[#7ba3d9]">Votes needed to win</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                <div className="text-xl font-bold text-white">57%+</div>
                <div className="text-xs text-white/30">Turnout needed</div>
              </div>
              <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                <div className="text-xl font-bold text-white">55%+</div>
                <div className="text-xs text-white/30">Independent vote share</div>
              </div>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-lg">
              <div className="text-sm text-white/50">
                <span className="text-white font-medium">Key insight:</span> In 2018, Abrams got within 55K votes with 55% turnout.
                With 7.54M registered voters in 2026 (+600K since 2018), hitting 57% turnout and winning independents is the path.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Counties */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">8 Key Counties</h2>
        <p className="text-white/30 text-sm mb-4">Must-win counties and vote share targets</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {keyCounties.map(c => (
            <div key={c.name} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-lg">
              <div className="text-white font-semibold">{c.name}</div>
              <div className="text-[#BF0F06] text-lg font-bold">{c.target}</div>
              <div className="flex justify-between mt-1">
                <span className={`text-xs px-1.5 py-0.5 rounded ${c.lean.includes("Strong") ? "bg-blue-500/20 text-blue-400" : c.lean === "Swing" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/10 text-blue-300"}`}>{c.lean}</span>
                <span className="text-white/20 text-xs">{(c.registered / 1000).toFixed(0)}K reg.</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Republican Opponent */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Republican Opponent</h2>
        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
          <p className="text-white/50 text-sm mb-3">
            <span className="text-white font-medium">Runoff: June 16, 2026</span> -- The Republican nominee will be decided between:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/[0.02] rounded-lg">
              <div className="text-white font-semibold">Burt Jones</div>
              <div className="text-white/30 text-sm">Lt. Governor -- Trump-endorsed</div>
              <div className="text-red-400 text-sm mt-1">38.4% in primary</div>
            </div>
            <div className="p-3 bg-white/[0.02] rounded-lg">
              <div className="text-white font-semibold">Rick Jackson</div>
              <div className="text-white/30 text-sm">Billionaire healthcare exec</div>
              <div className="text-red-400 text-sm mt-1">32.5% in primary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
