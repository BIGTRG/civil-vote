import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  DollarSign,
  Search,
  Vote,
  TrendingUp,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const partyDot: Record<string, string> = {
  democrat: "bg-blue-500",
  republican: "bg-red-500",
  independent: "bg-purple-500",
  other: "bg-gray-500",
};

const statusBadge: Record<string, string> = {
  active: "border-emerald-500/30 text-emerald-600 bg-emerald-50",
  withheld: "border-orange-500/30 text-orange-600 bg-orange-50",
  withdrawn: "border-red-500/30 text-red-600 bg-red-50",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function PledgesPage() {
  const pledges = useQuery(api.pledges.list, {});
  const pledgeStats = useQuery(api.pledges.stats, {});

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const filtered = (pledges ?? []).filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (stateFilter !== "all" && p.state !== stateFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.candidateName.toLowerCase().includes(q) ||
        p.raceName.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const uniqueStates = [...new Set((pledges ?? []).map((p) => p.state))].sort();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="size-6 text-emerald-600" />
          Pledges & Donations
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track all voter pledges and donation activity
        </p>
      </div>

      {/* Stats cards */}
      {pledgeStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Vote className="size-4 text-[#1652F0]" />
                Total Pledges
              </div>
              <p className="text-2xl font-bold">{pledgeStats.total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{pledgeStats.active} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="size-4 text-emerald-600" />
                Total Raised
              </div>
              <p className="text-2xl font-bold">{formatCurrency(pledgeStats.totalDonations)}</p>
              <p className="text-xs text-muted-foreground">from active pledges</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <TrendingUp className="size-4 text-[#C9A227]" />
                Avg Donation
              </div>
              <p className="text-2xl font-bold">{formatCurrency(pledgeStats.avgDonation)}</p>
              <p className="text-xs text-muted-foreground">per pledge</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="size-4 text-orange-500" />
                Withheld
              </div>
              <p className="text-2xl font-bold">{pledgeStats.withheld}</p>
              <p className="text-xs text-muted-foreground">{pledgeStats.withdrawn} withdrawn</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* By State breakdown */}
      {pledgeStats && Object.keys(pledgeStats.byState).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">By State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(pledgeStats.byState)
                .sort(([, a], [, b]) => b.amount - a.amount)
                .map(([state, data]) => (
                  <div key={state} className="flex items-center gap-3 p-3 rounded-xl border bg-card min-w-[140px]">
                    <div className="size-10 rounded-lg bg-[#0F2A4A]/10 flex items-center justify-center font-bold text-sm text-[#0F2A4A]">
                      {state}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{data.count} pledges</p>
                      <p className="text-xs text-emerald-600">{formatCurrency(data.amount)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search pledges..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="withheld">Withheld</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="State" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {uniqueStates.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pledge list */}
      <div className="space-y-2">
        {pledges === undefined ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No pledges found</CardContent></Card>
        ) : (
          filtered.map((p) => (
            <Card key={p._id} className="hover:border-foreground/20 transition-colors">
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`size-3 rounded-full ${partyDot[p.candidateParty]} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.candidateName}</p>
                  <p className="text-xs text-muted-foreground">{p.raceName}</p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {p.state}
                </Badge>
                <Badge variant="outline" className={`text-[10px] ${statusBadge[p.status]}`}>
                  {p.status}
                </Badge>
                <span className="text-sm font-semibold text-emerald-600 shrink-0">
                  {formatCurrency(p.donationAmount)}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
