import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const anyApi = api as any;

export function RacesPage() {
  const races = useQuery(anyApi.races.list) ?? [];
  const [stateFilter, setStateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  const states = [...new Set(races.map((r: any) => r.state))];
  const filtered = races.filter((r: any) => {
    if (stateFilter !== "all" && r.state !== stateFilter) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Browse Races</h1>
      <p className="text-red-300/60 mb-8">Find races in your state and pledge your support</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-red-500/20 text-white rounded-lg px-4 py-3">
          <option value="all">All States</option>
          {states.map((s: any) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-red-500/20 text-white rounded-lg px-4 py-3">
          <option value="all">All Types</option>
          <option value="federal">Federal</option>
          <option value="state">State</option>
          <option value="local">Local</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((race: any) => (
          <div key={race._id} onClick={() => navigate(`/race/${race._id}`)}
            className="bg-white/5 border border-red-500/10 rounded-2xl p-6 cursor-pointer hover:border-red-500/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{race.status}</span>
                  <span className="bg-red-500/20 text-red-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{race.state}</span>
                  <span className="bg-white/10 text-white/60 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">{race.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{race.title}</h3>
                <p className="text-red-200/40 text-sm">{race.description}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-2xl font-bold text-white">{race.totalPledges.toLocaleString()}</div>
                <div className="text-red-200/40 text-xs">Pledges</div>
                <div className="text-2xl font-bold text-red-400 mt-1">${race.totalRaised.toLocaleString()}</div>
                <div className="text-red-200/40 text-xs">Raised</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
