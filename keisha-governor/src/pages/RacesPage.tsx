import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export function RacesPage() {
  const races = useQuery(api.races.list, {});
  const pledgeStats = useQuery(api.pledges.stats);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">2026 Race</h1>
        <p className="text-white/50 mt-1">Georgia Governor -- pledge your support and follow the campaign</p>
      </div>

      {/* Stats */}
      {pledgeStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-3xl font-bold text-white">{pledgeStats.total.toLocaleString()}</div>
            <div className="text-sm text-white/30">Total Pledges</div>
          </div>
          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
            <div className="text-3xl font-bold text-emerald-400">${pledgeStats.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-white/30">Total Raised</div>
          </div>
        </div>
      )}

      {/* Race Cards */}
      <div className="space-y-4">
        {(races ?? []).map(race => (
          <Link key={race._id} to={`/race/${race._id}`} className="block bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{race.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C3C73]/30 text-[#7ba3d9]">{race.state}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#BF0F06]/20 text-[#BF0F06]">{race.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${race.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`}>{race.status}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/30">Election Day</div>
                <div className="text-white font-medium">{new Date(race.electionDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
              </div>
            </div>
            {race.description && <p className="text-white/40 text-sm mb-4">{race.description}</p>}
            <div className="flex gap-6 text-sm">
              <div><span className="text-white/30">Pledges:</span> <span className="text-white font-medium">{race.totalPledges.toLocaleString()}</span></div>
              <div><span className="text-white/30">Raised:</span> <span className="text-emerald-400 font-medium">${race.totalRaised.toLocaleString()}</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
