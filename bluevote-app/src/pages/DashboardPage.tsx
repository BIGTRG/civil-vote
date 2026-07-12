import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const races = useQuery(api.races.list, {});
  const ratings = useQuery(api.liveData.getAllRaceRatings);
  const topFundraisers = useQuery(api.liveData.getTopFundraisers);
  const canvassingStats = useQuery(api.canvassing.getStats);
  const newsArticles = useQuery(api.news.getLatest, { limit: 5 });

  const totalRaces = races?.length || 0;
  const states = new Set(races?.map(r => r.state) || []);
  const tossups = ratings?.filter(r => r.rating === "Toss-up").length || 0;
  const totalRaised = races?.reduce((s: number, r: any) => s + (r.totalRaised || 0), 0 as number) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">BlueVote Election Intelligence Center</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="text-3xl font-bold text-blue-400">{totalRaces}</div>
          <div className="text-white/40 text-xs mt-1">Active Races</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="text-3xl font-bold text-white">{states.size}</div>
          <div className="text-white/40 text-xs mt-1">States Covered</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="text-3xl font-bold text-purple-400">{tossups}</div>
          <div className="text-white/40 text-xs mt-1">Toss-up Races</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="text-3xl font-bold text-green-400">
            ${totalRaised >= 1000000 ? `${(totalRaised / 1000000).toFixed(1)}M` : totalRaised >= 1000 ? `${(totalRaised / 1000).toFixed(0)}K` : totalRaised}
          </div>
          <div className="text-white/40 text-xs mt-1">Total Fundraising</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top fundraisers */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Top Fundraisers</h2>
            <Link to="/polling" className="text-blue-400 text-xs hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {topFundraisers?.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs w-4">{i + 1}</span>
                  <div>
                    <div className="text-white text-sm">{c.name}</div>
                    <div className="text-white/30 text-xs">{c.party === "democrat" ? "D" : c.party === "republican" ? "R" : "I"}</div>
                  </div>
                </div>
                <span className="text-blue-400 text-sm font-medium">
                  ${(c.totalRaised / 1000000).toFixed(1)}M
                </span>
              </div>
            )) || <div className="text-white/30 text-sm">Loading...</div>}
          </div>
        </div>

        {/* Battleground races */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Battleground Races</h2>
            <Link to="/maps" className="text-blue-400 text-xs hover:underline">View Map</Link>
          </div>
          <div className="space-y-3">
            {ratings?.filter(r => r.rating === "Toss-up" || r.rating.includes("Lean")).slice(0, 6).map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <div>
                  <div className="text-white text-sm">{r.state} {r.office}</div>
                  <div className="text-white/30 text-xs">{r.source}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  r.rating === "Toss-up" ? "bg-purple-500/20 text-purple-400" :
                  r.rating.includes("D") ? "bg-blue-500/20 text-blue-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {r.rating}
                </span>
              </div>
            )) || <div className="text-white/30 text-sm">Loading...</div>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest news */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Latest News</h2>
            <Link to="/news" className="text-blue-400 text-xs hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {newsArticles && newsArticles.length > 0 ? newsArticles.map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-white/5 rounded-lg px-3 py-2 -mx-3">
                <div className="text-white text-sm line-clamp-1">{a.title}</div>
                <div className="text-white/30 text-xs mt-0.5">{a.source} -- {new Date(a.publishedAt).toLocaleDateString()}</div>
              </a>
            )) : (
              <div className="text-white/30 text-sm">News feed connecting...</div>
            )}
          </div>
        </div>

        {/* Canvassing progress */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Canvassing Progress</h2>
            <Link to="/canvassing" className="text-blue-400 text-xs hover:underline">View All</Link>
          </div>
          {canvassingStats && canvassingStats.totalTurfs > 0 ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">Doors Knocked</span>
                  <span className="text-blue-400">{canvassingStats.contactRate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${canvassingStats.contactRate}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-400">{canvassingStats.positiveContacts}</div>
                  <div className="text-white/30 text-xs">Positive Contacts</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{canvassingStats.completedTurfs}</div>
                  <div className="text-white/30 text-xs">Turfs Completed</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white/30 text-sm text-center py-8">Canvassing operations will appear here once campaigns begin field work.</div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Browse Races", path: "/races", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2" },
          { label: "Live Data", path: "/polling", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
          { label: "Election Map", path: "/maps", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
          { label: "Win My Vote", path: "/issues", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6" },
        ].map((link, i) => (
          <Link key={i} to={link.path} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:border-blue-500/30 transition-colors text-center group">
            <svg className="w-6 h-6 mx-auto mb-2 text-white/30 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
            </svg>
            <span className="text-white/60 text-xs group-hover:text-white transition-colors">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
