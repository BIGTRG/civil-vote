import { useQuery } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";

export function DashboardPage() {
  const user = useQuery(api.auth.currentUser);
  const races = useQuery(api.races.list, {});
  const navigate = useNavigate();

  const raceCount = races?.length ?? 0;
  const stateCount = races ? new Set(races.map(r => r.state)).size : 0;

  const quickLinks = [
    { label: "Compare Candidates", path: "/compare", desc: "Side-by-side issue comparison", gradient: "from-purple-600 to-amber-500" },
    { label: "Browse Races", path: "/races", desc: `${raceCount} races tracked`, gradient: "from-purple-600 to-purple-800" },
    { label: "Public Pulse", path: "/pulse", desc: "Real-time sentiment data", gradient: "from-amber-500 to-amber-700" },
    { label: "Promise Ledger", path: "/promises", desc: "Accountability tracker", gradient: "from-purple-700 to-purple-900" },
    { label: "Win My Vote", path: "/issues", desc: "Tell candidates what matters", gradient: "from-amber-600 to-amber-800" },
    { label: "Merch Store", path: "/store", desc: "Independent gear", gradient: "from-purple-500 to-amber-600" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-white/40 mt-1">Your independent voter command center</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: raceCount.toString(), label: "Races Tracked" },
          { value: stateCount.toString(), label: "States" },
          { value: "30%", label: "Independent Voters" },
          { value: "2026", label: "Midterm Year" },
        ].map((s) => (
          <div key={s.label} className="bg-[#130e1d] border border-purple-500/10 rounded-xl p-5">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">{s.value}</div>
            <div className="text-white/40 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className="text-left bg-[#130e1d] border border-purple-500/10 rounded-2xl p-6 hover:border-purple-400/20 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white text-xs font-bold mb-3 opacity-80 group-hover:opacity-100 transition-opacity`}>
              {link.label.charAt(0)}
            </div>
            <h3 className="text-white font-semibold">{link.label}</h3>
            <p className="text-white/30 text-sm mt-1">{link.desc}</p>
          </button>
        ))}
      </div>

      <div className="text-center py-6 text-white/15 text-xs">
        You decide elections. Powered by SwingVote.
      </div>
    </div>
  );
}
