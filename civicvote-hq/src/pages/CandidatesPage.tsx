import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Search,
  DollarSign,
  Vote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const partyColors: Record<string, string> = {
  democrat: "bg-blue-100 text-blue-800 border-blue-200",
  republican: "bg-red-100 text-red-800 border-red-200",
  independent: "bg-purple-100 text-purple-800 border-purple-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusBadge: Record<string, string> = {
  active: "border-emerald-500/30 text-emerald-600",
  withdrawn: "border-red-500/30 text-red-600",
  won: "border-[#C9A227]/30 text-[#C9A227]",
  lost: "border-gray-500/30 text-gray-600",
};

const tierLabels: Record<string, string> = {
  starter: "Starter ($99/mo)",
  pro: "Pro ($499/mo)",
  growth: "Growth ($999/mo)",
  enterprise: "Enterprise ($5,000/mo)",
};

type CandidateForm = {
  raceId: string;
  firstName: string;
  lastName: string;
  party: "democrat" | "republican" | "independent" | "other";
  bio: string;
  saasTier: string;
};

const emptyForm: CandidateForm = {
  raceId: "",
  firstName: "",
  lastName: "",
  party: "democrat",
  bio: "",
  saasTier: "",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function CandidatesPage() {
  const candidates = useQuery(api.candidates.list, {});
  const races = useQuery(api.races.list, {});
  const createCandidate = useMutation(api.candidates.create);
  const updateCandidate = useMutation(api.candidates.update);
  const removeCandidate = useMutation(api.candidates.remove);

  const [search, setSearch] = useState("");
  const [partyFilter, setPartyFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"candidates"> | null>(null);
  const [form, setForm] = useState<CandidateForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<Id<"candidates"> | null>(null);

  const filtered = (candidates ?? []).filter((c) => {
    if (partyFilter !== "all" && c.party !== partyFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.raceName.toLowerCase().includes(q) ||
        c.raceState.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function openCreate() {
    setForm({ ...emptyForm, raceId: races?.[0]?._id ?? "" });
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(c: (typeof filtered)[0]) {
    setForm({
      raceId: c.raceId,
      firstName: c.firstName,
      lastName: c.lastName,
      party: c.party,
      bio: c.bio ?? "",
      saasTier: c.saasTier ?? "",
    });
    setEditingId(c._id);
    setShowForm(true);
  }

  async function handleSubmit() {
    if (!form.firstName || !form.lastName) return;
    if (editingId) {
      await updateCandidate({
        id: editingId,
        firstName: form.firstName,
        lastName: form.lastName,
        party: form.party,
        bio: form.bio || undefined,
        saasTier: form.saasTier || undefined,
      });
    } else {
      if (!form.raceId) return;
      await createCandidate({
        raceId: form.raceId as Id<"races">,
        firstName: form.firstName,
        lastName: form.lastName,
        party: form.party,
        bio: form.bio || undefined,
        saasTier: form.saasTier || undefined,
      });
    }
    setShowForm(false);
    setEditingId(null);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    await removeCandidate({ id: deleteConfirm });
    setDeleteConfirm(null);
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="size-6 text-[#0F2A4A]" />
            Candidates
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {candidates?.length ?? 0} candidates across {races?.length ?? 0} races
          </p>
        </div>
        <Button onClick={openCreate} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
          <Plus className="size-4 mr-1" /> Add Candidate
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search candidates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={partyFilter} onValueChange={setPartyFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All parties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parties</SelectItem>
            <SelectItem value="democrat">Democrat</SelectItem>
            <SelectItem value="republican">Republican</SelectItem>
            <SelectItem value="independent">Independent</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {candidates === undefined ? (
          <Card className="col-span-full"><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card className="col-span-full"><CardContent className="py-8 text-center text-muted-foreground">No candidates found</CardContent></Card>
        ) : (
          filtered.map((c) => (
            <Card key={c._id} className="hover:border-foreground/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground shrink-0">
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{c.firstName} {c.lastName}</p>
                      <Badge variant="outline" className={partyColors[c.party]}>
                        {c.party.charAt(0).toUpperCase() + c.party.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={statusBadge[c.status]}>
                        {c.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {c.raceName} -- {c.raceState}
                    </p>
                    {c.bio && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.bio}</p>}
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Vote className="size-3 text-[#1652F0]" />
                        {c.pledgeCount.toLocaleString()} pledges
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="size-3 text-emerald-600" />
                        {formatCurrency(c.donationTotal)}
                      </span>
                      {c.saasTier && (
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          {c.saasTier}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(c._id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Candidate" : "Add Candidate"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update candidate details" : "Add a new candidate to a race"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!editingId && (
              <div>
                <Label>Race</Label>
                <Select value={form.raceId} onValueChange={(v) => setForm({ ...form, raceId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a race" /></SelectTrigger>
                  <SelectContent>
                    {(races ?? []).map((r) => (
                      <SelectItem key={r._id} value={r._id}>{r.title} ({r.state})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>First Name</Label>
                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Party</Label>
                <Select value={form.party} onValueChange={(v) => setForm({ ...form, party: v as CandidateForm["party"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="democrat">Democrat</SelectItem>
                    <SelectItem value="republican">Republican</SelectItem>
                    <SelectItem value="independent">Independent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>SaaS Tier</Label>
                <Select value={form.saasTier || "none"} onValueChange={(v) => setForm({ ...form, saasTier: v === "none" ? "" : v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not Subscribed</SelectItem>
                    {Object.entries(tierLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Brief candidate bio..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
              {editingId ? "Save Changes" : "Add Candidate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Candidate</DialogTitle>
            <DialogDescription>This will remove this candidate and all their pledges. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
