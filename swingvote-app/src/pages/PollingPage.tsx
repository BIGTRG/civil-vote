import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function RatingBadge({ rating }: { rating: string }) {
  const colors: Record<string, string> = {
    "Safe D": "bg-blue-600/30 text-purple-300 border-purple-500/30",
    "Likely D": "bg-purple-500/25 text-purple-300 border-purple-400/30",
    "Lean D": "bg-purple-400/20 text-purple-300 border-purple-300/30",
    "Toss-up": "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    "Lean R": "bg-red-400/20 text-red-300 border-red-300/30",
    "Likely R": "bg-red-500/25 text-red-300 border-red-400/30",
    "Safe R": "bg-red-600/30 text-red-300 border-red-500/30",
  };
  const cls = colors[rating] || "bg-white/10 text-white/60 border-white/20";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {rating}
    </span>
  );
}

export function PollingPage() {
  const ratings = useQuery(api.liveData.getAllRaceRatings);
  const topFundraisers = useQuery(api.liveData.getTopFundraisers);
  const races = useQuery(api.races.list, {});

  const senateRatings = ratings?.filter(r => r.office === "Senate" && r.source === "Cook Political Report") || [];
  const govRatings = ratings?.filter(r => r.office === "Governor" && r.source === "Cook Political Report") || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Live Election Intelligence</h1>
        <p className="text-purple-300/50 mt-1">Real-time polling, race ratings, and FEC campaign finance data</p>
      </div>

      {/* Data sources banner */}
      <div className="flex flex-wrap gap-2">
        {["FEC.gov", "Cook Political Report", "Sabato Crystal Ball", "Fox News", "Emerson College", "SurveyUSA", "Marist"].map(src => (
          <span key={src} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            {src}
          </span>
        ))}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Races Tracked", value: races?.length || 0 },
          { label: "FEC Filings", value: topFundraisers?.length || 0 },
          { label: "Race Ratings", value: ratings?.length || 0 },
          { label: "Data Sources", value: 7 },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-purple-300/40 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Senate Race Ratings */}
      {senateRatings.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-1">Senate Race Ratings</h2>
          <p className="text-purple-300/40 text-sm mb-4">Cook Political Report -- Updated July 2026</p>
          
          <div className="space-y-1">
            <div className="grid grid-cols-3 text-xs font-semibold text-purple-300/50 uppercase tracking-wider px-3 pb-2 border-b border-white/5">
              <span>State</span>
              <span>Office</span>
              <span className="text-right">Rating</span>
            </div>
            {senateRatings.sort((a, b) => {
              const order = ["Safe D", "Likely D", "Lean D", "Toss-up", "Lean R", "Likely R", "Safe R"];
              return order.indexOf(a.rating) - order.indexOf(b.rating);
            }).map((r, i) => (
              <div key={i} className="grid grid-cols-3 items-center px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-white font-medium text-sm">{r.state}</span>
                <span className="text-purple-300/60 text-sm">U.S. Senate</span>
                <span className="text-right"><RatingBadge rating={r.rating} /></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Governor Race Ratings */}
      {govRatings.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-1">Governor Race Ratings</h2>
          <p className="text-purple-300/40 text-sm mb-4">Cook Political Report -- Updated July 2026</p>
          
          <div className="space-y-1">
            <div className="grid grid-cols-3 text-xs font-semibold text-purple-300/50 uppercase tracking-wider px-3 pb-2 border-b border-white/5">
              <span>State</span>
              <span>Office</span>
              <span className="text-right">Rating</span>
            </div>
            {govRatings.sort((a, b) => {
              const order = ["Safe D", "Likely D", "Lean D", "Toss-up", "Lean R", "Likely R", "Safe R"];
              return order.indexOf(a.rating) - order.indexOf(b.rating);
            }).map((r, i) => (
              <div key={i} className="grid grid-cols-3 items-center px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-white font-medium text-sm">{r.state}</span>
                <span className="text-purple-300/60 text-sm">Governor</span>
                <span className="text-right"><RatingBadge rating={r.rating} /></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Fundraisers */}
      {topFundraisers && topFundraisers.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-1">Top Fundraisers -- FEC Data</h2>
          <p className="text-purple-300/40 text-sm mb-4">Real campaign finance filings from FEC.gov</p>
          
          <div className="space-y-3">
            {topFundraisers.map((c, i) => {
              const maxRaised = topFundraisers[0]?.totalRaised || 1;
              const pct = (c.totalRaised / maxRaised) * 100;
              const partyColor = c.party === "democrat" ? "bg-purple-500" : c.party === "republican" ? "bg-red-500" : "bg-purple-500";
              const partyBg = c.party === "democrat" ? "bg-purple-500/10" : c.party === "republican" ? "bg-red-500/10" : "bg-purple-500/10";
              return (
                <div key={c._id} className={`p-3 rounded-lg ${partyBg} border border-white/5`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 text-sm font-mono w-6">#{i + 1}</span>
                      <div>
                        <span className="text-white font-semibold text-sm">{c.name}</span>
                        <span className="text-purple-300/40 text-xs ml-2">
                          ({c.party === "democrat" ? "D" : c.party === "republican" ? "R" : "I"})
                        </span>
                      </div>
                    </div>
                    <span className="text-white font-bold text-sm">{formatMoney(c.totalRaised)}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className={`${partyColor} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                  {(c.totalSpent || c.cashOnHand) && (
                    <div className="flex gap-4 mt-1.5 text-xs text-purple-300/40">
                      {c.totalSpent && <span>Spent: {formatMoney(c.totalSpent)}</span>}
                      {c.cashOnHand && <span>Cash on Hand: {formatMoney(c.cashOnHand)}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Data freshness */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <p className="text-purple-300/40 text-xs">
          Data refreshes automatically. Finance data from FEC Q1/Q2 2026 filings.
          Polling from Fox News, Emerson College, Marist, SurveyUSA, UT Austin, Colby College.
          Race ratings from Cook Political Report and Sabato Crystal Ball.
        </p>
      </div>
    </div>
  );
}
