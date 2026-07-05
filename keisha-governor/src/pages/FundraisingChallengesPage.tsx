import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const tierLabels: Record<string, string> = { "5k": "$5K", "10k": "$10K", "20k": "$20K", "50k": "$50K", custom: "Custom" };

export function FundraisingChallengesPage() {
  const challenges = useQuery(api.fundraisingChallenges.list);
  const leaderboard = useQuery(api.fundraisingChallenges.getLeaderboard);
  const totalGoal = (challenges ?? []).reduce((s, c) => s + c.goalAmount, 0);
  const totalCurrent = (challenges ?? []).reduce((s, c) => s + c.currentAmount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Fundraising Challenges</h1>
        <p className="text-white/50 mt-1">Sign up, set a goal, and compete to raise the most</p>
      </div>

      {/* Overview */}
      <div className="bg-gradient-to-r from-[#1C3C73]/10 to-[#BF0F06]/5 border border-white/[0.06] rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-sm text-white/30 mb-1">Total Challenge Progress</div>
            <div className="text-3xl font-bold text-white">${totalCurrent.toLocaleString()} <span className="text-lg text-white/30">/ ${totalGoal.toLocaleString()}</span></div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-gradient-to-r from-[#BF0F06] to-[#1C3C73] rounded-full" style={{ width: `${totalGoal > 0 ? (totalCurrent / totalGoal) * 100 : 0}%` }} />
            </div>
            <div className="text-xs text-white/30 mt-1">{totalGoal > 0 ? Math.round((totalCurrent / totalGoal) * 100) : 0}% of combined goal</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/[0.03] rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{(challenges ?? []).length}</div>
              <div className="text-xs text-white/30">Active Challenges</div>
            </div>
            <div className="p-3 bg-white/[0.03] rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{(challenges ?? []).reduce((s, c) => s + c.participantCount, 0)}</div>
              <div className="text-xs text-white/30">Participants</div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {(challenges ?? []).map(c => {
          const pct = c.goalAmount > 0 ? (c.currentAmount / c.goalAmount) * 100 : 0;
          return (
            <div key={c._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#BF0F06]/20 text-[#BF0F06] font-medium">{tierLabels[c.tier] || c.tier}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-emerald-500/20 text-emerald-400" : c.status === "completed" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}>{c.status}</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{c.title}</h3>
              <p className="text-white/40 text-sm mb-4">{c.description}</p>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white font-medium">${c.currentAmount.toLocaleString()}</span>
                  <span className="text-white/30">${c.goalAmount.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : pct >= 70 ? "bg-[#BF0F06]" : "bg-[#1C3C73]"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <div className="text-xs text-white/20 mt-0.5">{Math.round(pct)}% of goal</div>
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-3">
                <span>{c.participantCount} participants</span>
                <span>Ends {new Date(c.endDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboard.map((p, i) => (
              <div key={p._id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-amber-500/30 text-amber-300" : i === 1 ? "bg-gray-400/20 text-gray-300" : i === 2 ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-white/40"}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{p.name}</div>
                  <div className="text-white/20 text-xs">Pledged ${p.pledgedAmount.toLocaleString()}</div>
                </div>
                <div className="text-emerald-400 font-semibold">${p.raisedAmount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
