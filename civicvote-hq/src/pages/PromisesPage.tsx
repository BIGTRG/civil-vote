import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  BookOpen,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Hash,
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

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  made: { color: "border-blue-500/30 text-blue-600 bg-blue-50", icon: Clock, label: "Made" },
  kept: { color: "border-emerald-500/30 text-emerald-600 bg-emerald-50", icon: CheckCircle2, label: "Kept" },
  broken: { color: "border-red-500/30 text-red-600 bg-red-50", icon: XCircle, label: "Broken" },
  in_progress: { color: "border-orange-500/30 text-orange-600 bg-orange-50", icon: Clock, label: "In Progress" },
  modified: { color: "border-purple-500/30 text-purple-600 bg-purple-50", icon: AlertTriangle, label: "Modified" },
};

const partyDot: Record<string, string> = {
  democrat: "bg-blue-500",
  republican: "bg-red-500",
  independent: "bg-purple-500",
  other: "bg-gray-500",
};

const categories = [
  "Economy", "Healthcare", "Education", "Infrastructure", "Environment",
  "Public Safety", "Immigration", "Tax Policy", "Housing", "Other",
];

type PromiseForm = {
  candidateId: string;
  title: string;
  description: string;
  category: string;
  sourceUrl: string;
  datePromised: string;
};

const emptyForm: PromiseForm = {
  candidateId: "",
  title: "",
  description: "",
  category: "Economy",
  sourceUrl: "",
  datePromised: new Date().toISOString().split("T")[0],
};

export function PromisesPage() {
  const promises = useQuery(api.promises.list, {});
  const candidates = useQuery(api.candidates.list, {});
  const createPromise = useMutation(api.promises.create);
  const updateStatus = useMutation(api.promises.updateStatus);
  const removePromise = useMutation(api.promises.remove);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PromiseForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<Id<"promises"> | null>(null);

  const filtered = (promises ?? []).filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.candidateName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Counts per status
  const counts = (promises ?? []).reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  async function handleCreate() {
    if (!form.candidateId || !form.title || !form.description) return;
    await createPromise({
      candidateId: form.candidateId as Id<"candidates">,
      title: form.title,
      description: form.description,
      category: form.category,
      sourceUrl: form.sourceUrl || undefined,
      datePromised: form.datePromised,
    });
    setShowForm(false);
    setForm(emptyForm);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    await removePromise({ id: deleteConfirm });
    setDeleteConfirm(null);
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="size-6 text-[#0F2A4A]" />
            Promise Ledger
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            "Carfax for Politicians" -- hash-chained evidence tracking
          </p>
        </div>
        <Button onClick={() => { setForm({ ...emptyForm, candidateId: candidates?.[0]?._id ?? "" }); setShowForm(true); }} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
          <Plus className="size-4 mr-1" /> Log Promise
        </Button>
      </div>

      {/* Status summary */}
      <div className="flex gap-3 flex-wrap">
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all ${
                statusFilter === key ? "ring-2 ring-[#0F2A4A]/20 " + cfg.color : "bg-card hover:bg-muted/50"
              }`}
            >
              <Icon className="size-4" />
              <span className="font-medium">{cfg.label}</span>
              <span className="text-xs opacity-60">{counts[key] ?? 0}</span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search promises..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-3">
        {promises === undefined ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">
            {promises.length === 0 ? "No promises logged yet. Add the first one." : "No promises match your filters."}
          </CardContent></Card>
        ) : (
          filtered.map((p) => {
            const cfg = statusConfig[p.status];
            const Icon = cfg.icon;
            return (
              <Card key={p._id} className="hover:border-foreground/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{p.title}</p>
                        <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <div className={`size-2 rounded-full ${partyDot[p.candidateParty]}`} />
                          {p.candidateName}
                        </span>
                        <span>Promised {p.datePromised}</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Hash className="size-3" />
                          {p.evidenceHash}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Select
                        value={p.status}
                        onValueChange={(v) => updateStatus({ id: p._id, status: v as "made" | "kept" | "broken" | "in_progress" | "modified" })}
                      >
                        <SelectTrigger className="h-8 text-xs w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([k, c]) => (
                            <SelectItem key={k} value={k}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(p._id)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Log Promise</DialogTitle>
            <DialogDescription>Record a campaign promise with evidence tracking</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Candidate</Label>
              <Select value={form.candidateId} onValueChange={(v) => setForm({ ...form, candidateId: v })}>
                <SelectTrigger><SelectValue placeholder="Select candidate" /></SelectTrigger>
                <SelectContent>
                  {(candidates ?? []).map((c) => (
                    <SelectItem key={c._id} value={c._id}>{c.firstName} {c.lastName} ({c.raceName})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Promise Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lower property taxes by 15%" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Full context of the promise..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date Promised</Label>
                <Input type="date" value={form.datePromised} onChange={(e) => setForm({ ...form, datePromised: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Source URL (optional)</Label>
              <Input value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">Log Promise</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Promise Record</DialogTitle>
            <DialogDescription>This will permanently remove this promise from the ledger.</DialogDescription>
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
