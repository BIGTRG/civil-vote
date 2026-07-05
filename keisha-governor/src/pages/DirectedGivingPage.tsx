import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const categoryColors: Record<string, string> = {
  "Voter Registration": "from-blue-500/20 to-blue-500/5",
  "Digital Advertising": "from-purple-500/20 to-purple-500/5",
  "Field Operations": "from-emerald-500/20 to-emerald-500/5",
  "Events & Rallies": "from-[#BF0F06]/20 to-[#BF0F06]/5",
  "Rural Outreach": "from-amber-500/20 to-amber-500/5",
  "Youth Engagement": "from-cyan-500/20 to-cyan-500/5",
};

const barColors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-[#BF0F06]", "bg-amber-500", "bg-cyan-500"];

export function DirectedGivingPage() {
  const categories = useQuery(api.directedGiving.list);
  const sorted = [...(categories ?? [])].sort((a, b) => b.totalAllocated - a.totalAllocated);
  const totalAll = sorted.reduce((s, c) => s + c.totalAllocated, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Direct Your Support</h1>
        <p className="text-white/50 mt-1">Choose where your campaign dollars go. Transparency in action.</p>
      </div>

      {/* Allocation Bar */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <div className="text-sm text-white/30 mb-2">Total Campaign Allocation</div>
        <div className="text-3xl font-bold text-white mb-4">${totalAll.toLocaleString()}</div>
        <div className="h-6 rounded-full overflow-hidden flex">
          {sorted.map((c, i) => (
            <div key={c._id} className={`h-full ${barColors[i % barColors.length]}`} style={{ width: `${c.percentageOfTotal}%` }} title={`${c.category}: ${c.percentageOfTotal}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {sorted.map((c, i) => (
            <div key={c._id} className="flex items-center gap-1.5 text-xs">
              <div className={`w-2.5 h-2.5 rounded ${barColors[i % barColors.length]}`} />
              <span className="text-white/50">{c.category} ({c.percentageOfTotal}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map(c => {
          const pct = c.goalAmount ? (c.totalAllocated / c.goalAmount) * 100 : 0;
          const gradient = categoryColors[c.category] || "from-gray-500/20 to-gray-500/5";
          return (
            <div key={c._id} className={`bg-gradient-to-br ${gradient} border border-white/[0.06] rounded-xl p-5`}>
              <h3 className="text-white font-semibold text-lg mb-1">{c.category}</h3>
              <p className="text-white/40 text-sm mb-4">{c.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white font-medium">${c.totalAllocated.toLocaleString()}</span>
                  {c.goalAmount && <span className="text-white/30">${c.goalAmount.toLocaleString()} goal</span>}
                </div>
                {c.goalAmount && (
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                )}
              </div>
              <div className="flex justify-between text-xs text-white/30">
                <span>{c.donorCount.toLocaleString()} donors</span>
                <span>{c.percentageOfTotal}% of total</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
