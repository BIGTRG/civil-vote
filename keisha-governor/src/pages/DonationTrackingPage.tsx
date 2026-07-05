import { useQuery } from "convex/react";
import {
  DollarSign, TrendingUp, Users, AlertTriangle,
  CheckCircle, Target, ArrowUp,
} from "lucide-react";
import { api } from "../../convex/_generated/api";

export function DonationTrackingPage() {
  const stats = useQuery(api.donations.getStats);
  const recent = useQuery(api.donations.getRecentDonations, { limit: 15 });
  const limits = useQuery(api.donations.getAllDonorLimits);

  const goalVotes = 2200000;
  const voteCount = stats?.voteCount ?? 0;
  const goalPercent = Math.min((voteCount / goalVotes) * 100, 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Donation Tracking</h1>
        <p className="text-white/40 mt-1">Real-time fundraising data with GA contribution limits</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Raised", value: `$${((stats?.totalRaised ?? 0) / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-green-400" },
          { label: "Unique Donors", value: stats?.uniqueDonors ?? 0, icon: Users, color: "text-blue-400" },
          { label: "Votes (First Donors)", value: (stats?.voteCount ?? 0).toLocaleString(), icon: CheckCircle, color: "text-emerald-400" },
          { label: "Avg Donation", value: `$${(stats?.avgDonation ?? 0).toFixed(0)}`, icon: TrendingUp, color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="p-4 md:p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-white/40 text-xs md:text-sm">{s.label}</span>
            </div>
            <div className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 2.2M Vote Goal Progress */}
      <div className="p-5 md:p-6 bg-gradient-to-r from-[#1C3C73]/15 to-[#BF0F06]/10 border border-white/[0.06] rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <Target className="w-6 h-6 text-[#BF0F06]" />
            <div>
              <h2 className="text-lg font-bold text-white">2.2 Million Vote Goal</h2>
              <p className="text-white/40 text-sm">First-time donors count as pledged votes</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#BF0F06]">{voteCount.toLocaleString()}</span>
            <span className="text-white/30 text-sm ml-1">/ 2,200,000</span>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1C3C73] to-[#BF0F06] rounded-full transition-all"
            style={{ width: `${Math.max(goalPercent, 0.5)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/30">
          <span>{goalPercent.toFixed(3)}% complete</span>
          <span>{(goalVotes - voteCount).toLocaleString()} to go</span>
        </div>
      </div>

      {/* GA Contribution Limit Info */}
      <div className="p-4 md:p-5 bg-amber-500/5 border border-amber-500/15 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-amber-400 font-medium">Georgia Contribution Limits</h3>
            <p className="text-white/40 text-sm mt-1">
              Individual donors may contribute up to $7,600 per candidate per election cycle for statewide races.
              PAC limit: $7,600. Corporate contributions are prohibited in Georgia.
              All donations are tracked against these limits in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">Recent Donations</h2>
          {recent && recent.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recent.map((d) => (
                <div key={d._id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${d.isFirstDonation ? "bg-emerald-400" : "bg-blue-400"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white/80 text-sm font-medium truncate">{d.donorName}</span>
                      {d.isFirstDonation && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">VOTE</span>
                      )}
                    </div>
                    <div className="text-white/25 text-xs mt-0.5">
                      {new Date(d.timestamp).toLocaleDateString()}
                      {d.directedCategory && ` -- ${d.directedCategory}`}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-green-400 font-bold text-sm">${d.amount}</span>
                    <div className="text-white/20 text-[10px]">
                      ${d.limitRemaining.toLocaleString()} left
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/30">
              <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Donations will appear here in real time</p>
            </div>
          )}
        </div>

        {/* Top Donors by Limit Usage */}
        <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">Donor Limit Tracking</h2>
          {limits && limits.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {[...limits]
                .sort((a, b) => b.totalContributed - a.totalContributed)
                .map((dl) => {
                  const pct = (dl.totalContributed / dl.gaLimit) * 100;
                  return (
                    <div key={dl._id} className="p-3 bg-white/[0.02] rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm font-medium truncate">{dl.donorName}</span>
                        <span className={`text-sm font-bold ${pct > 90 ? "text-red-400" : pct > 70 ? "text-amber-400" : "text-green-400"}`}>
                          ${dl.totalContributed.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-green-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] text-white/25">
                        <span>{dl.donationCount} donation{dl.donationCount !== 1 ? "s" : ""}</span>
                        <span>${dl.limitRemaining.toLocaleString()} of $7,600 remaining</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8 text-white/30">
              <ArrowUp className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Donor limits tracked automatically</p>
            </div>
          )}
        </div>
      </div>

      {/* How Donation Tracking Works */}
      <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <h2 className="text-lg font-bold text-white mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Sign Up + Donate", desc: "Your first donation counts as a pledged vote for Keisha. This is your commitment that you will vote for her." },
            { step: "2", title: "Continue Supporting", desc: "Additional donations are tracked separately -- they don't count as extra votes, but they fund the campaign and earn you badges." },
            { step: "3", title: "Limits Enforced", desc: "Georgia law caps individual contributions at $7,600 per election cycle. We track this automatically so no one exceeds the limit." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#BF0F06]/20 text-[#BF0F06] flex items-center justify-center font-bold text-sm shrink-0">
                {s.step}
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">{s.title}</h3>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
