import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RacesPage() {
  const races = useQuery(api.races.list, {});
  const [stateFilter, setStateFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const filtered = races?.filter((r) => {
    if (stateFilter && r.state !== stateFilter) return false;
    if (typeFilter && r.type !== typeFilter) return false;
    return true;
  }) ?? [];

  const states = [...new Set(races?.map(r => r.state) ?? [])].sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Browse Races</h1>
        <p className="text-purple-300/60 mt-1">Find races in your state and pledge your support</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={stateFilter}
          onChange={e => setStateFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50"
        >
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400/50"
        >
          <option value="">All Types</option>
          <option value="federal">Federal</option>
          <option value="state">State</option>
          <option value="local">Local</option>
        </select>
      </div>

      {/* Race cards */}
      <div className="grid gap-4">
        {filtered.map((race) => (
          <Link
            key={race._id}
            to={`/race/${race._id}`}
            className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all hover:-translate-y-0.5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    race.status === "active" ? "bg-green-500/20 text-green-400" :
                    race.status === "upcoming" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {race.status.charAt(0).toUpperCase() + race.status.slice(1)}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                    {race.state}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/60">
                    {race.type.charAt(0).toUpperCase() + race.type.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{race.title}</h3>
                {race.description && (
                  <p className="text-purple-300/50 text-sm">{race.description}</p>
                )}
              </div>
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{race.totalPledges.toLocaleString()}</div>
                  <div className="text-xs text-purple-300/40">Pledges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">${race.totalRaised.toLocaleString()}</div>
                  <div className="text-xs text-purple-300/40">Raised</div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-purple-300/40">
            {races === undefined ? "Loading races..." : "No races found matching your filters."}
          </div>
        )}
      </div>
    </div>
  );
}
