import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const races = useQuery(api.races.list, {});
  const pledgeStats = useQuery(api.pledges.stats);
  const activity = useQuery(api.activityFeed.list);
  const challenges = useQuery(api.fundraisingChallenges.listActive);
  const supporterStats = useQuery(api.supporters.stats);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Campaign Dashboard</h1>
        <p className="text-white/50 mt-1">Keisha Lance Bottoms for Governor 2026</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-[#1C3C73]/15 to-transparent border border-[#1C3C73]/20 rounded-xl">
          <div className="text-sm text-white/30 mb-1">Total Raised</div>
          <div className="text-2xl font-bold text-white">${pledgeStats ? pledgeStats.totalAmount.toLocaleString() : "..."}</div>
          <div className="text-xs text-[#7ba3d9] mt-1">93% small-dollar</div>
        </div>
        <div className="p-5 bg-gradient-to-br from-[#BF0F06]/10 to-transparent border border-[#BF0F06]/20 rounded-xl">
          <div className="text-sm text-white/30 mb-1">Total Pledges</div>
          <div className="text-2xl font-bold text-white">{pledgeStats ? pledgeStats.total.toLocaleString() : "..."}</div>
          <div className="text-xs text-[#BF0F06] mt-1">across all 159 counties</div>
        </div>
        <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="text-sm text-white/30 mb-1">Supporters</div>
          <div className="text-2xl font-bold text-white">{supporterStats?.total ?? "..."}</div>
          <div className="text-xs text-emerald-400 mt-1">{supporterStats?.volunteers ?? 0} volunteers</div>
        </div>
        <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="text-sm text-white/30 mb-1">Active Challenges</div>
          <div className="text-2xl font-bold text-white">{(challenges ?? []).length}</div>
          <div className="text-xs text-amber-400 mt-1">{(challenges ?? []).reduce((s, c) => s + c.participantCount, 0)} participants</div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Election Intel", to: "/intelligence", color: "from-blue-500/10 to-blue-500/5" },
          { label: "Events", to: "/events", color: "from-purple-500/10 to-purple-500/5" },
          { label: "Fundraising", to: "/challenges", color: "from-emerald-500/10 to-emerald-500/5" },
          { label: "Media Hub", to: "/media", color: "from-pink-500/10 to-pink-500/5" },
        ].map(n => (
          <Link key={n.label} to={n.to} className={`p-4 bg-gradient-to-br ${n.color} border border-white/[0.06] rounded-xl text-center hover:border-white/10 transition-colors`}>
            <div className="text-white font-medium">{n.label}</div>
          </Link>
        ))}
      </div>

      {/* Two columns: Activity + Challenges */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {(activity ?? []).slice(0, 5).map(a => (
              <div key={a._id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.type === "milestone" ? "bg-amber-400" :
                  a.type === "endorsement" ? "bg-green-400" :
                  a.type === "event" ? "bg-blue-400" :
                  a.type === "fundraising" ? "bg-purple-400" :
                  "bg-[#BF0F06]"
                }`} />
                <p className="text-white/50 text-sm">{a.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Challenges */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Active Challenges</h2>
          <div className="space-y-3">
            {(challenges ?? []).slice(0, 4).map(c => {
              const pct = c.goalAmount > 0 ? (c.currentAmount / c.goalAmount) * 100 : 0;
              return (
                <Link to="/challenges" key={c._id} className="block p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.04] transition-colors">
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-sm font-medium">{c.title}</span>
                    <span className="text-white/30 text-xs">{Math.round(pct)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#BF0F06] rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-white/20 mt-1">
                    <span>${c.currentAmount.toLocaleString()} / ${c.goalAmount.toLocaleString()}</span>
                    <span>{c.participantCount} participants</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Race Info */}
      {(races ?? []).map(race => (
        <Link key={race._id} to={`/race/${race._id}`} className="block bg-gradient-to-r from-[#1C3C73]/10 to-[#BF0F06]/5 border border-white/[0.06] rounded-xl p-6 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{race.title}</h2>
              <p className="text-white/40 text-sm mt-1">{race.description?.slice(0, 120)}...</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <div className="text-white/30 text-sm">Election Day</div>
              <div className="text-white font-semibold">{new Date(race.electionDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
