import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export function PartyDirectoryPage() {
  const orgs = useQuery(api.partyOrgs.list, {});
  const stats = useQuery(api.partyOrgs.stats, {});
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | "federal" | "state">("all");

  const filtered = orgs?.filter(o => {
    if (levelFilter !== "all" && o.level !== levelFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return o.name.toLowerCase().includes(s) || (o.state && o.state.toLowerCase().includes(s)) || (o.abbreviation && o.abbreviation.toLowerCase().includes(s));
    }
    return true;
  }) ?? [];

  const federalOrgs = filtered.filter(o => o.level === "federal");
  const stateOrgs = filtered.filter(o => o.level === "state");

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Republican Party <span className="text-red-400">Directory</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base">
            Federal and state-level Republican Party organizations across the United States
          </p>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{stats.total}</div>
              <div className="text-xs text-white/40 mt-1">Total Organizations</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-300">{stats.federal}</div>
              <div className="text-xs text-white/40 mt-1">Federal</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hidden sm:block">
              <div className="text-2xl font-bold text-red-200">{stats.state}</div>
              <div className="text-xs text-white/40 mt-1">State Parties</div>
            </div>
          </div>
        )}

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search organizations or states..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "federal", "state"] as const).map(level => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  levelFilter === level
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Federal Organizations */}
        {federalOrgs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Federal Organizations ({federalOrgs.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {federalOrgs.map(org => (
                <a
                  key={org._id}
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-white group-hover:text-red-300 transition-colors text-sm">
                        {org.name}
                      </div>
                      {org.abbreviation && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full font-medium">
                          {org.abbreviation}
                        </span>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-red-400 transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  {org.description && (
                    <p className="text-xs text-white/40 mt-2 line-clamp-2">{org.description}</p>
                  )}
                  {org.category && (
                    <div className="mt-3 text-[10px] text-white/30 uppercase tracking-wider">{org.category}</div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* State Parties */}
        {stateOrgs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              State Parties ({stateOrgs.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {stateOrgs.sort((a, b) => (a.state ?? "").localeCompare(b.state ?? "")).map(org => (
                <a
                  key={org._id}
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white group-hover:text-red-300 transition-colors text-sm truncate">
                      {org.state}
                    </div>
                    <div className="text-[11px] text-white/30 truncate">{org.name}</div>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-red-400 transition-colors shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <svg className="w-12 h-12 mx-auto mb-4 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No organizations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
