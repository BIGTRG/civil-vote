import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export function SupporterListPage() {
  const supporters = useQuery(api.supporters.list);
  const stats = useQuery(api.supporters.stats);
  const [search, setSearch] = useState("");

  const filtered = (supporters ?? []).filter(s => {
    const q = search.toLowerCase();
    return !q || `${s.firstName} ${s.lastName} ${s.city || ""} ${s.county || ""}`.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Supporter List</h1>
        <p className="text-white/50 mt-1">Building the grassroots network -- this election and beyond</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-white/30">Total Supporters</div>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-2xl font-bold text-emerald-400">{stats.volunteers}</div>
            <div className="text-xs text-white/30">Volunteers</div>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-2xl font-bold text-[#BF0F06]">{stats.donors}</div>
            <div className="text-xs text-white/30">Donors</div>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-2xl font-bold text-white">${stats.totalContributed.toLocaleString()}</div>
            <div className="text-xs text-white/30">Total Contributed</div>
          </div>
        </div>
      )}

      {/* By Source */}
      {stats && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3">By Source</h3>
            <div className="space-y-2">
              {Object.entries(stats.bySource).sort(([, a], [, b]) => (b as number) - (a as number)).map(([src, count]) => (
                <div key={src} className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-24 capitalize">{src}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1C3C73] rounded-full" style={{ width: `${stats.total > 0 ? ((count as number) / stats.total) * 100 : 0}%` }} />
                  </div>
                  <span className="text-white/30 text-xs w-8 text-right">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3">By County</h3>
            <div className="space-y-2">
              {Object.entries(stats.byCounty).sort(([, a], [, b]) => (b as number) - (a as number)).map(([county, count]) => (
                <div key={county} className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-24">{county}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#BF0F06] rounded-full" style={{ width: `${stats.total > 0 ? ((count as number) / stats.total) * 100 : 0}%` }} />
                  </div>
                  <span className="text-white/30 text-xs w-8 text-right">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search & Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-white font-semibold">All Supporters</h3>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, city, county..."
            className="flex-1 max-w-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#1C3C73]"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/30 text-left border-b border-white/5">
                <th className="pb-2 pr-3">Name</th>
                <th className="pb-2 pr-3">City</th>
                <th className="pb-2 pr-3">County</th>
                <th className="pb-2 pr-3">Source</th>
                <th className="pb-2 pr-3">Vol.</th>
                <th className="pb-2 pr-3">Donor</th>
                <th className="pb-2 text-right">Contributed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3 text-white font-medium">{s.firstName} {s.lastName}</td>
                  <td className="py-2.5 pr-3 text-white/50">{s.city || "--"}</td>
                  <td className="py-2.5 pr-3 text-white/50">{s.county || "--"}</td>
                  <td className="py-2.5 pr-3"><span className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/40 capitalize">{s.source}</span></td>
                  <td className="py-2.5 pr-3">{s.volunteerWilling ? <span className="text-emerald-400 text-xs">Yes</span> : <span className="text-white/20 text-xs">--</span>}</td>
                  <td className="py-2.5 pr-3">{s.donorStatus ? <span className="text-[#BF0F06] text-xs">Yes</span> : <span className="text-white/20 text-xs">--</span>}</td>
                  <td className="py-2.5 text-right text-white/50">${s.totalContributed.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
