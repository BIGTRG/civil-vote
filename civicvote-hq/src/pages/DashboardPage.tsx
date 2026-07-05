import { useQuery, useMutation } from "convex/react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Flag,
  Map,
  Users,
  Vote,
  Shield,
  Zap,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "../../convex/_generated/api";

const partyColors: Record<string, string> = {
  democrat: "bg-[#1652F0] text-white",
  republican: "bg-[#D22B2B] text-white",
  independent: "bg-[#C9A227] text-[#0F2A4A]",
  other: "bg-gray-500 text-white",
};

const activityIcons: Record<string, typeof Activity> = {
  pledge: Vote,
  donation: DollarSign,
  signup: Users,
  candidate_onboard: Shield,
  race_added: Flag,
};

const activityColors: Record<string, string> = {
  pledge: "bg-[#1652F0]/10 text-[#1652F0]",
  donation: "bg-emerald-500/10 text-emerald-600",
  signup: "bg-[#C9A227]/10 text-[#C9A227]",
  candidate_onboard: "bg-[#0F2A4A]/10 text-[#0F2A4A]",
  race_added: "bg-[#E0594D]/10 text-[#E0594D]",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function DashboardPage() {
  const stats = useQuery(api.dashboard.getPlatformStats);
  const races = useQuery(api.dashboard.listRaces);
  const candidates = useQuery(api.dashboard.listCandidates, {});
  const activity = useQuery(api.dashboard.getRecentActivity);
  const seedData = useMutation(api.dashboard.seedDemoData);

  // Seed demo data on first load
  useEffect(() => {
    if (stats === null) {
      seedData();
    }
  }, [stats, seedData]);

  const isLoading = stats === undefined;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#0F2A4A] flex items-center justify-center">
              <Shield className="size-5 text-[#C9A227]" />
            </div>
            CivicVote HQ
          </h1>
          <p className="text-muted-foreground mt-1">
            Platform command center -- all brands, all states, all races
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-[#C9A227]/30 text-[#C9A227] bg-[#C9A227]/10">
            {stats?.activeStates ?? 0} Active States
          </Badge>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
            Live
          </Badge>
        </div>
      </div>

      {/* Top-line stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="rounded-lg p-2 bg-[#1652F0]/10">
              <Users className="size-4 text-[#1652F0]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {isLoading ? "..." : (stats?.totalUsers ?? 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-medium text-emerald-600">+18%</span>
              <ArrowUpRight className="size-3 text-emerald-600" />
              <span className="text-xs text-muted-foreground">this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pledges
            </CardTitle>
            <div className="rounded-lg p-2 bg-[#C9A227]/10">
              <Vote className="size-4 text-[#C9A227]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {isLoading ? "..." : (stats?.totalPledges ?? 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-medium text-emerald-600">+24%</span>
              <ArrowUpRight className="size-3 text-emerald-600" />
              <span className="text-xs text-muted-foreground">this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
            <div className="rounded-lg p-2 bg-emerald-500/10">
              <DollarSign className="size-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {isLoading ? "..." : formatCurrency(stats?.totalDonations ?? 0)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-medium text-emerald-600">+31%</span>
              <ArrowUpRight className="size-3 text-emerald-600" />
              <span className="text-xs text-muted-foreground">this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Races
            </CardTitle>
            <div className="rounded-lg p-2 bg-[#E0594D]/10">
              <Flag className="size-4 text-[#E0594D]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {isLoading ? "..." : (stats?.totalRaces ?? 0)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-medium text-[#C9A227]">
                {stats?.totalCandidates ?? 0} candidates
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand split bar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="size-5 text-muted-foreground" />
            User Distribution by Brand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-6 rounded-full overflow-hidden mb-4">
            {stats && stats.totalUsers > 0 && (
              <>
                <div
                  className="bg-[#1652F0] transition-all"
                  style={{ width: `${(stats.bluevoteUsers / stats.totalUsers) * 100}%` }}
                />
                <div
                  className="bg-[#D22B2B] transition-all"
                  style={{ width: `${(stats.redvoteUsers / stats.totalUsers) * 100}%` }}
                />
                <div
                  className="bg-[#C9A227] transition-all"
                  style={{ width: `${(stats.civicvoteUsers / stats.totalUsers) * 100}%` }}
                />
              </>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#1652F0]" />
              <span>BlueVote</span>
              <span className="font-semibold">
                {stats ? stats.bluevoteUsers.toLocaleString() : "..."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#D22B2B]" />
              <span>RedVote</span>
              <span className="font-semibold">
                {stats ? stats.redvoteUsers.toLocaleString() : "..."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#C9A227]" />
              <span>CivicVote</span>
              <span className="font-semibold">
                {stats ? stats.civicvoteUsers.toLocaleString() : "..."}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Races */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="size-5 text-[#0F2A4A]" />
              Active Races
            </CardTitle>
            <CardDescription>
              Races across {stats?.activeStates ?? 0} pilot states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {races === undefined ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : races.length === 0 ? (
              <p className="text-sm text-muted-foreground">No races yet</p>
            ) : (
              races.map((race) => {
                const raceCandidates = candidates?.filter(
                  (c) => c.raceId === race._id
                );
                return (
                  <div
                    key={race._id}
                    className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-[#0F2A4A]/10 flex items-center justify-center font-bold text-sm text-[#0F2A4A]">
                        {race.state}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{race.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {race.level.charAt(0).toUpperCase() + race.level.slice(1)} -- {race.electionDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {race.isExclusive && (
                        <Badge className="bg-[#C9A227]/10 text-[#C9A227] border-[#C9A227]/30 text-[10px]">
                          Exclusive
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={
                          race.status === "active"
                            ? "border-emerald-500/30 text-emerald-600"
                            : "border-orange-500/30 text-orange-600"
                        }
                      >
                        {race.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {raceCandidates?.length ?? 0} candidates
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-emerald-600" />
              Top Candidates by Pledges
            </CardTitle>
            <CardDescription>Leading pledge counts across all races</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates === undefined ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              [...(candidates ?? [])]
                .sort((a, b) => b.pledgeCount - a.pledgeCount)
                .slice(0, 5)
                .map((candidate, index) => (
                  <div
                    key={candidate._id}
                    className="flex items-center gap-4 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="size-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {candidate.firstName} {candidate.lastName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${partyColors[candidate.party]}`}
                        >
                          {candidate.party.charAt(0).toUpperCase()}
                        </span>
                        {candidate.saasTier && (
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                            {candidate.saasTier}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        {candidate.pledgeCount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(candidate.donationTotal)}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-[#C9A227]" />
            Live Activity Feed
          </CardTitle>
          <CardDescription>
            Real-time platform activity across all brands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activity === undefined ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : activity.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No activity yet</p>
              </div>
            ) : (
              activity.map((item) => {
                const Icon = activityIcons[item.type] ?? Activity;
                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-2"
                  >
                    <div
                      className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${activityColors[item.type]}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.description}</p>
                    </div>
                    {item.state && (
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {item.state}
                      </Badge>
                    )}
                    {item.amount && (
                      <span className="text-sm font-semibold text-emerald-600 shrink-0">
                        {formatCurrency(item.amount)}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground shrink-0">
                      {timeAgo(item._creationTime)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground pb-4">
        CivicVote HQ -- Civic Verified, Inc. -- All rights reserved
      </div>
    </div>
  );
}
