import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const races = useQuery(api.races.list, {});
  
  const myPledges = useQuery(api.pledges.myPledges);
  const activity = useQuery(api.activity.recent);
  const promiseStats = useQuery(api.promises.stats);

  const activeRaces = races?.filter(r => r.status === "active") ?? [];
  const totalRaised = races?.reduce((s, r) => s + r.totalRaised, 0) ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-blue-300/60 mt-1">Your civic engagement overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Races", value: activeRaces.length, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
          { label: "Total Pledged", value: `$${totalRaised.toLocaleString()}`, color: "text-blue-400", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
          { label: "My Pledges", value: myPledges?.length ?? 0, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
          { label: "Promises Tracked", value: promiseStats?.total ?? 0, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
        ].map(stat => (
          <div key={stat.label} className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
            </div>
            <div className={`text-2xl font-bold ${stat.color ?? "text-white"}`}>{stat.value}</div>
            <div className="text-xs text-blue-300/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* My Pledges */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">My Pledges</h2>
          {myPledges && myPledges.length > 0 ? (
            <div className="space-y-3">
              {myPledges.slice(0, 5).map(p => (
                <div key={p._id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="text-sm font-medium text-white">{p.candidateName}</div>
                    <div className="text-xs text-blue-300/40">{p.raceName} -- {p.raceState}</div>
                  </div>
                  <div className="text-sm font-bold text-blue-400">${p.amount}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-blue-300/40 text-sm mb-4">You haven't made any pledges yet</p>
              <Link to="/races" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Browse Races
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity?.slice(0, 6).map(a => (
              <div key={a._id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  a.type === "pledge" ? "bg-blue-400" :
                  a.type === "milestone" ? "bg-green-400" :
                  a.type === "issue" ? "bg-yellow-400" :
                  a.type === "promise_update" ? "bg-purple-400" :
                  "bg-cyan-400"
                }`} />
                <div>
                  <div className="text-sm text-white/80">{a.message}</div>
                  {a.state && <div className="text-xs text-blue-300/30 mt-0.5">{a.state}</div>}
                </div>
              </div>
            )) ?? (
              <div className="text-center py-8 text-blue-300/40 text-sm">Loading...</div>
            )}
          </div>
        </div>
      </div>

      {/* Active Races quick view */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Races</h2>
          <Link to="/races" className="text-blue-400 hover:text-blue-300 text-sm">View All</Link>
        </div>
        <div className="grid gap-3">
          {activeRaces.slice(0, 3).map(race => (
            <Link
              key={race._id}
              to={`/race/${race._id}`}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                  {race.state}
                </span>
                <span className="text-sm font-medium text-white">{race.title}</span>
              </div>
              <div className="flex gap-6 text-sm">
                <span className="text-white/60">{race.totalPledges.toLocaleString()} pledges</span>
                <span className="text-blue-400 font-medium">${race.totalRaised.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
