import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const ELECTION_NEWS = [
  { id: 1, title: "2026 Governor Races Heat Up Across 36 States", category: "National", date: "Jul 11, 2026", summary: "With primaries concluded in most states, the general election battle lines are drawn. RedVote is tracking every race with real-time data.", readTime: "4 min" },
  { id: 2, title: "Early Voting Begins in Key Battleground States", category: "Voting", date: "Jul 10, 2026", summary: "Several states have opened early voting registration. Check your state's deadlines and make your plan to vote.", readTime: "3 min" },
  { id: 3, title: "Promise Ledger Milestone: 500+ Campaign Promises Tracked", category: "Platform", date: "Jul 9, 2026", summary: "Our Promise Ledger has crossed 500 verified campaign promises from candidates across all parties. Hold them accountable.", readTime: "2 min" },
  { id: 4, title: "New Feature: Side-by-Side Candidate Comparison", category: "Platform", date: "Jul 8, 2026", summary: "Compare candidates on the issues that matter to you. Our new comparison tool lets you evaluate positions across party lines.", readTime: "3 min" },
  { id: 5, title: "Voter Registration Deadlines Approaching in 12 States", category: "Voting", date: "Jul 7, 2026", summary: "Make sure you're registered to vote. These 12 states have registration deadlines coming up in the next 30 days.", readTime: "5 min" },
  { id: 6, title: "How Small Donations Are Reshaping Campaign Finance", category: "Analysis", date: "Jul 6, 2026", summary: "The rise of micro-donations through platforms like RedVote is changing how campaigns fund their operations. Here's the data.", readTime: "6 min" },
  { id: 7, title: "State-Level Races: Why Attorney General Elections Matter", category: "Education", date: "Jul 5, 2026", summary: "Attorney General races often fly under the radar, but they have enormous impact on policy enforcement. Here's why you should pay attention.", readTime: "4 min" },
  { id: 8, title: "Platform Update: Enhanced Analytics Dashboard", category: "Platform", date: "Jul 4, 2026", summary: "We've rolled out a new analytics dashboard showing voter engagement trends, pledge momentum, and race tracking metrics.", readTime: "2 min" },
];

const CATEGORIES = ["All", "National", "Voting", "Platform", "Analysis", "Education"];

export function NewsPage() {
  const races = useQuery(api.races.list, {});
  const activity = useQuery(api.activity.recent);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Election News</h1>
        <p className="text-red-300/60 mt-1">Stay informed on races, policy, and platform updates</p>
      </div>

      {/* Breaking Banner */}
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded uppercase tracking-wider">Live</span>
          <span className="text-white font-medium">Tracking {races?.filter(r => r.status === "active").length ?? 0} active races across {new Set(races?.map(r => r.state)).size ?? 0} states</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === "All" ? "bg-red-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/5 border border-red-500/20">
        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded uppercase tracking-wider">Featured</span>
        <h2 className="text-2xl font-bold text-white mt-3">{ELECTION_NEWS[0].title}</h2>
        <p className="text-red-200/60 mt-2">{ELECTION_NEWS[0].summary}</p>
        <div className="flex items-center gap-4 mt-4 text-xs text-red-300/40">
          <span>{ELECTION_NEWS[0].date}</span>
          <span>{ELECTION_NEWS[0].readTime} read</span>
          <span className="px-2 py-0.5 bg-white/5 rounded">{ELECTION_NEWS[0].category}</span>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {ELECTION_NEWS.slice(1).map(article => (
          <div key={article.id} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-white/5 text-red-400 text-xs font-medium rounded">{article.category}</span>
              <span className="text-xs text-red-300/40">{article.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{article.title}</h3>
            <p className="text-sm text-white/40 mt-2 line-clamp-2">{article.summary}</p>
            <div className="text-xs text-red-300/30 mt-3">{article.date}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity from Backend */}
      {activity && activity.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Live Platform Activity</h2>
          <div className="space-y-3">
            {activity.slice(0, 8).map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <div>
                  <span className="text-white/70">{item.message}</span>
                  <span className="text-red-300/30 ml-2 text-xs">{item.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
