import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Vote,
  TrendingUp,
  DollarSign,
  Users,
  Flag,
  BarChart3,
  Map,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const partyColors: Record<string, { bg: string; bar: string }> = {
  democrat: { bg: "bg-blue-100 text-blue-800", bar: "bg-blue-500" },
  republican: { bg: "bg-red-100 text-red-800", bar: "bg-red-500" },
  independent: { bg: "bg-purple-100 text-purple-800", bar: "bg-purple-500" },
  other: { bg: "bg-gray-100 text-gray-800", bar: "bg-gray-500" },
};

export function AnalyticsPage() {
  const stats = useQuery(api.dashboard.getPlatformStats);
  const races = useQuery(api.dashboard.listRaces);
  const candidates = useQuery(api.dashboard.listCandidates, {});
  const pledgeStats = useQuery(api.pledges.stats, {});

  const totalPledges = candidates?.reduce((s, c) => s + c.pledgeCount, 0) ?? 0;
  const totalDonations = candidates?.reduce((s, c) => s + c.donationTotal, 0) ?? 0;
  const maxPledges = Math.max(...(candidates?.map((c) => c.pledgeCount) ?? [1]));

  // Party breakdown
  const byParty = (candidates ?? []).reduce(
    (acc, c) => {
      if (!acc[c.party]) acc[c.party] = { count: 0, pledges: 0, donations: 0 };
      acc[c.party].count++;
      acc[c.party].pledges += c.pledgeCount;
      acc[c.party].donations += c.donationTotal;
      return acc;
    },
    {} as Record<string, { count: number; pledges: number; donations: number }>,
  );

  // By race
  const byRace = (races ?? []).map((race) => {
    const raceCandidates = (candidates ?? []).filter((c) => c.raceId === race._id);
    return {
      ...race,
      candidateCount: raceCandidates.length,
      totalPledges: raceCandidates.reduce((s, c) => s + c.pledgeCount, 0),
      totalDonations: raceCandidates.reduce((s, c) => s + c.donationTotal, 0),
    };
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="size-6 text-[#0F2A4A]" />
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform-wide performance and engagement metrics
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Users className="size-4" />
              Users
            </div>
            <p className="text-2xl font-bold">{(stats?.totalUsers ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Vote className="size-4 text-[#1652F0]" />
              Pledges
            </div>
            <p className="text-2xl font-bold">{totalPledges.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <DollarSign className="size-4 text-emerald-600" />
              Donations
            </div>
            <p className="text-2xl font-bold">{formatCurrency(totalDonations)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Flag className="size-4 text-[#C9A227]" />
              Active Races
            </div>
            <p className="text-2xl font-bold">{(races ?? []).filter((r) => r.status === "active").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Brand Distribution */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Brand Distribution</CardTitle>
            <CardDescription>User split across platform brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "BlueVote", count: stats.bluevoteUsers, color: "bg-blue-500", textColor: "text-blue-600" },
                { name: "RedVote", count: stats.redvoteUsers, color: "bg-red-500", textColor: "text-red-600" },
                { name: "CivicVote", count: stats.civicvoteUsers, color: "bg-[#C9A227]", textColor: "text-[#C9A227]" },
              ].map((brand) => {
                const pct = stats.totalUsers > 0 ? (brand.count / stats.totalUsers) * 100 : 0;
                return (
                  <div key={brand.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`font-medium ${brand.textColor}`}>{brand.name}</span>
                      <span className="text-muted-foreground">{brand.count.toLocaleString()} ({pct.toFixed(1)}%)</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${brand.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Party Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Party Breakdown</CardTitle>
            <CardDescription>Candidates and pledges by party affiliation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(byParty).map(([party, data]) => (
              <div key={party} className="p-3 rounded-xl border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={partyColors[party]?.bg}>
                    {party.charAt(0).toUpperCase() + party.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{data.count} candidates</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pledges</span>
                    <p className="font-semibold">{data.pledges.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Donations</span>
                    <p className="font-semibold text-emerald-600">{formatCurrency(data.donations)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Race Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Race Performance</CardTitle>
            <CardDescription>Engagement and donations by race</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {byRace
              .sort((a, b) => b.totalPledges - a.totalPledges)
              .map((race) => (
                <div key={race._id} className="p-3 rounded-xl border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-8 rounded-lg bg-[#0F2A4A]/10 flex items-center justify-center text-xs font-bold text-[#0F2A4A]">
                      {race.state}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{race.title}</p>
                      <p className="text-xs text-muted-foreground">{race.candidateCount} candidates</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pledges</span>
                      <p className="font-semibold">{race.totalPledges.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Raised</span>
                      <p className="font-semibold text-emerald-600">{formatCurrency(race.totalDonations)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Candidate Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="size-5 text-emerald-600" />
            Candidate Leaderboard
          </CardTitle>
          <CardDescription>All candidates ranked by pledge count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {(candidates ?? [])
              .slice()
              .sort((a, b) => b.pledgeCount - a.pledgeCount)
              .map((c, i) => {
                const pct = maxPledges > 0 ? (c.pledgeCount / maxPledges) * 100 : 0;
                return (
                  <div key={c._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-bold text-muted-foreground w-6 text-right">{i + 1}</span>
                    <div className={`size-3 rounded-full ${partyColors[c.party]?.bar}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{c.firstName} {c.lastName}</span>
                        {c.saasTier && (
                          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.saasTier}</span>
                        )}
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${partyColors[c.party]?.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{c.pledgeCount.toLocaleString()}</p>
                      <p className="text-xs text-emerald-600">{formatCurrency(c.donationTotal)}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* State breakdown from pledges */}
      {pledgeStats && Object.keys(pledgeStats.byState).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Map className="size-5 text-[#0F2A4A]" />
              Geographic Breakdown
            </CardTitle>
            <CardDescription>Pledge distribution by state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(pledgeStats.byState)
                .sort(([, a], [, b]) => b.amount - a.amount)
                .map(([state, data]) => (
                  <div key={state} className="p-4 rounded-xl border bg-card text-center">
                    <div className="size-14 mx-auto mb-2 rounded-xl bg-[#0F2A4A]/10 flex items-center justify-center font-bold text-xl text-[#0F2A4A]">
                      {state}
                    </div>
                    <p className="text-lg font-bold">{data.count}</p>
                    <p className="text-xs text-muted-foreground">pledges</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-1">{formatCurrency(data.amount)}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
