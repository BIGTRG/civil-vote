import { useQuery } from "convex/react";
import {
  Trophy, Medal, Star, Flame, Crown, Target,
  Users, Calendar, Share2, Rocket, TrendingUp,
} from "lucide-react";
import { api } from "../../convex/_generated/api";

const tierColors: Record<string, string> = {
  bronze: "from-amber-700/30 to-amber-900/20 border-amber-700/40 text-amber-400",
  silver: "from-gray-400/20 to-gray-600/15 border-gray-400/30 text-gray-300",
  gold: "from-yellow-500/25 to-yellow-700/15 border-yellow-500/35 text-yellow-400",
  platinum: "from-cyan-400/20 to-cyan-600/15 border-cyan-400/30 text-cyan-300",
  diamond: "from-purple-400/20 to-purple-600/15 border-purple-400/30 text-purple-300",
};

const tierLabels: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

const categoryIcons: Record<string, typeof Trophy> = {
  fundraising: Star,
  volunteer: Users,
  events: Calendar,
  recruiting: Users,
  social: Share2,
  milestone: Rocket,
};

export function GamificationPage() {
  const badges = useQuery(api.gamification.getAllBadges);
  const stats = useQuery(api.gamification.getGameStats);
  const leaders = useQuery(api.gamification.getTopLeaders, {});

  const categories = ["fundraising", "volunteer", "events", "recruiting", "social", "milestone"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Badges & Leaderboard</h1>
        <p className="text-white/40 mt-1">Earn badges, climb the ranks, and help Keisha win</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Players", value: stats?.totalPlayers ?? 0, icon: Users, color: "text-blue-400" },
          { label: "Badges Earned", value: stats?.totalBadgesEarned ?? 0, icon: Medal, color: "text-amber-400" },
          { label: "Volunteer Hours", value: stats?.totalVolunteerHours ?? 0, icon: Flame, color: "text-orange-400" },
          { label: "Total Points", value: (stats?.totalPoints ?? 0).toLocaleString(), icon: TrendingUp, color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-white/40 text-sm">{s.label}</span>
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Top Supporters</h2>
        </div>
        {leaders && leaders.length > 0 ? (
          <div className="space-y-3">
            {leaders.map((leader, i) => (
              <div
                key={leader._id}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  i === 0 ? "bg-yellow-500/10 border border-yellow-500/20" :
                  i === 1 ? "bg-gray-400/10 border border-gray-400/15" :
                  i === 2 ? "bg-amber-700/10 border border-amber-700/15" :
                  "bg-white/[0.02] border border-white/[0.04]"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                  i === 1 ? "bg-gray-400/20 text-gray-300" :
                  i === 2 ? "bg-amber-700/20 text-amber-400" :
                  "bg-white/10 text-white/50"
                }`}>
                  {i === 0 ? <Crown className="w-4 h-4" /> : `#${i + 1}`}
                </div>
                <div className="flex-1">
                  <span className="text-white font-medium">{leader.displayName}</span>
                  {leader.county && (
                    <span className="text-white/30 text-sm ml-2">{leader.county} County</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold">{leader.score.toLocaleString()}</span>
                  <span className="text-white/30 text-sm ml-1">pts</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/30">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Leaderboard will populate as supporters earn points</p>
            <p className="text-sm mt-1">Donate, volunteer, attend events, and recruit to climb the ranks</p>
          </div>
        )}
      </div>

      {/* Badge Catalog */}
      {categories.map((cat) => {
        const catBadges = badges?.filter((b) => b.category === cat) ?? [];
        if (catBadges.length === 0) return null;
        const Icon = categoryIcons[cat] || Target;
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-white/60" />
              <h2 className="text-lg font-bold text-white capitalize">{cat}</h2>
              <span className="text-white/30 text-sm">({catBadges.length} badges)</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catBadges.map((badge) => {
                const colors = tierColors[badge.tier] || tierColors.bronze;
                return (
                  <div
                    key={badge._id}
                    className={`p-5 rounded-xl bg-gradient-to-br ${colors} border hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white">{badge.name}</h3>
                        <span className="text-xs uppercase tracking-wider opacity-70">
                          {tierLabels[badge.tier]}
                        </span>
                      </div>
                      <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-white/70">
                        +{badge.pointValue} pts
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-3">{badge.description}</p>
                    <div className="text-xs text-white/30">{badge.requirement}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
