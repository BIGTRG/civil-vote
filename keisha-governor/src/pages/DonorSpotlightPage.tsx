import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const tierConfig: Record<string, { color: string; bg: string; label: string }> = {
  platinum: { color: "text-purple-300", bg: "bg-purple-500/20", label: "PLATINUM" },
  gold: { color: "text-amber-300", bg: "bg-amber-500/20", label: "GOLD" },
  silver: { color: "text-gray-300", bg: "bg-gray-400/20", label: "SILVER" },
  bronze: { color: "text-orange-400", bg: "bg-orange-500/20", label: "BRONZE" },
};

export function DonorSpotlightPage() {
  const donors = useQuery(api.donors.list);
  const sorted = [...(donors ?? [])].sort((a, b) => b.totalRaised - a.totalRaised);
  const totalRaised = sorted.reduce((s, d) => s + d.totalRaised, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Donor Spotlight</h1>
        <p className="text-white/50 mt-1">Champions helping raise money for Georgia's future</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{sorted.length}</div>
          <div className="text-xs text-white/30">Featured Donors</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">${(totalRaised / 1000).toFixed(0)}K</div>
          <div className="text-xs text-white/30">Total Raised</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-300">{sorted.filter(d => d.tier === "platinum").length}</div>
          <div className="text-xs text-white/30">Platinum Tier</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-amber-300">{sorted.filter(d => d.tier === "gold").length}</div>
          <div className="text-xs text-white/30">Gold Tier</div>
        </div>
      </div>

      {/* Key People to Contact */}
      <div className="bg-gradient-to-r from-[#1C3C73]/10 to-[#BF0F06]/5 border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Key People to Contact</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sorted.filter(d => d.featured).map(d => {
            const tc = tierConfig[d.tier];
            return (
              <div key={d._id} className="p-4 bg-white/[0.03] border border-white/[0.04] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#1C3C73] flex items-center justify-center text-white font-semibold text-sm">
                    {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{d.name}</div>
                    <div className="text-white/30 text-xs">{d.title}{d.organization ? ` -- ${d.organization}` : ""}</div>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>{tc.label}</span>
                </div>
                {d.bio && <p className="text-white/40 text-sm mb-2">{d.bio}</p>}
                <div className="flex gap-4 text-xs">
                  <div><span className="text-white/30">Raised:</span> <span className="text-emerald-400">${d.totalRaised.toLocaleString()}</span></div>
                  <div><span className="text-white/30">Donated:</span> <span className="text-[#7ba3d9]">${d.totalDonated.toLocaleString()}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Donors */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Donors</h2>
        <div className="space-y-3">
          {sorted.map((d, i) => {
            const tc = tierConfig[d.tier];
            return (
              <div key={d._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
                <div className="text-xl font-bold text-white/20 w-8 text-center">#{i + 1}</div>
                <div className="w-10 h-10 rounded-full bg-[#1C3C73] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {d.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold">{d.name}</div>
                  <div className="text-white/30 text-xs">{d.title}{d.organization ? ` -- ${d.organization}` : ""}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>{tc.label}</span>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold">${d.totalRaised.toLocaleString()}</div>
                  <div className="text-white/20 text-xs">raised</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
