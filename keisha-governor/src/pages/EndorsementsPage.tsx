import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const typeConfig: Record<string, { bg: string; text: string }> = {
  church: { bg: "bg-purple-500/20", text: "text-purple-400" },
  union: { bg: "bg-blue-500/20", text: "text-blue-400" },
  nonprofit: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  business: { bg: "bg-amber-500/20", text: "text-amber-400" },
  civic: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  other: { bg: "bg-gray-500/20", text: "text-gray-400" },
};

export function EndorsementsPage() {
  const endorsements = useQuery(api.endorsements.list);
  const sorted = [...(endorsements ?? [])].sort((a, b) => b.contributionTotal - a.contributionTotal);
  const totalMembers = sorted.reduce((s, e) => s + e.memberCount, 0);
  const totalContributions = sorted.reduce((s, e) => s + e.contributionTotal, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Endorsements</h1>
        <p className="text-white/50 mt-1">Churches, unions, nonprofits, and organizations standing with Keisha</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{sorted.length}</div>
          <div className="text-xs text-white/30">Organizations</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{totalMembers.toLocaleString()}</div>
          <div className="text-xs text-white/30">Combined Members</div>
        </div>
        <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
          <div className="text-2xl font-bold text-emerald-400">${(totalContributions / 1000).toFixed(0)}K</div>
          <div className="text-xs text-white/30">Contributions</div>
        </div>
      </div>

      {/* Featured */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Featured Endorsements</h2>
        <div className="space-y-4">
          {sorted.filter(e => e.featured).map(e => {
            const tc = typeConfig[e.type] || typeConfig.other;
            return (
              <div key={e._id} className="bg-gradient-to-r from-[#1C3C73]/10 to-transparent border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#1C3C73]/30 flex items-center justify-center text-white font-bold text-sm">
                    {e.organizationName.split(" ").slice(0, 2).map(w => w[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{e.organizationName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{e.type}</span>
                      <span className="text-white/20 text-xs">{e.city}{e.county ? `, ${e.county} County` : ""}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-semibold">${e.contributionTotal.toLocaleString()}</div>
                    <div className="text-white/20 text-xs">{e.memberCount.toLocaleString()} members</div>
                  </div>
                </div>
                {e.statement && (
                  <div className="pl-4 border-l-2 border-[#BF0F06]/30 text-white/50 text-sm italic">"{e.statement}"</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* All Endorsements */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Endorsements</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {sorted.filter(e => !e.featured).map(e => {
            const tc = typeConfig[e.type] || typeConfig.other;
            return (
              <div key={e._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1C3C73]/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {e.organizationName.split(" ").slice(0, 2).map(w => w[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{e.organizationName}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${tc.bg} ${tc.text}`}>{e.type}</span>
                    <span className="text-white/20 text-xs">{e.city}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-emerald-400 text-sm font-medium">${e.contributionTotal.toLocaleString()}</div>
                  <div className="text-white/20 text-xs">{e.memberCount.toLocaleString()} mbrs</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
