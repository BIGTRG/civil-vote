import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  MessageSquare,
  Plus,
  Trash2,
  Search,
  ThumbsUp,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
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

const issueCategories = [
  "Healthcare", "Education", "Economy", "Infrastructure", "Public Safety",
  "Housing", "Environment", "Tax Policy", "Immigration", "Civil Rights", "Other",
];

const statusConfig: Record<string, { color: string; icon: typeof Clock; label: string }> = {
  submitted: { color: "border-blue-500/30 text-blue-600 bg-blue-50", icon: Clock, label: "Submitted" },
  acknowledged: { color: "border-orange-500/30 text-orange-600 bg-orange-50", icon: Eye, label: "Acknowledged" },
  responded: { color: "border-emerald-500/30 text-emerald-600 bg-emerald-50", icon: CheckCircle2, label: "Responded" },
  declined: { color: "border-red-500/30 text-red-600 bg-red-50", icon: XCircle, label: "Declined" },
};

type IssueForm = {
  raceId: string;
  category: string;
  title: string;
  description: string;
  voterState: string;
};

const emptyForm: IssueForm = {
  raceId: "",
  category: "Healthcare",
  title: "",
  description: "",
  voterState: "GA",
};

export function IssuesPage() {
  const issues = useQuery(api.voterIssues.list, {});
  const races = useQuery(api.races.list, {});
  const createIssue = useMutation(api.voterIssues.create);
  const updateIssueStatus = useMutation(api.voterIssues.updateStatus);
  const removeIssue = useMutation(api.voterIssues.remove);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<IssueForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<Id<"voterIssues"> | null>(null);

  const filtered = (issues ?? []).filter((i) => {
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.raceName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = (issues ?? []).reduce(
    (acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc; },
    {} as Record<string, number>,
  );

  async function handleCreate() {
    if (!form.raceId || !form.title || !form.description) return;
    await createIssue({
      raceId: form.raceId as Id<"races">,
      category: form.category,
      title: form.title,
      description: form.description,
      voterState: form.voterState,
    });
    setShowForm(false);
    setForm(emptyForm);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    await removeIssue({ id: deleteConfirm });
    setDeleteConfirm(null);
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="size-6 text-[#0F2A4A]" />
            Win My Vote
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Voter issues requiring candidate responses
          </p>
        </div>
        <Button onClick={() => { setForm({ ...emptyForm, raceId: races?.[0]?._id ?? "" }); setShowForm(true); }} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
          <Plus className="size-4 mr-1" /> Submit Issue
        </Button>
      </div>

      {/* Status tabs */}
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
        <Input placeholder="Search issues..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="space-y-3">
        {issues === undefined ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">
            {issues.length === 0 ? "No voter issues yet." : "No issues match your filters."}
          </CardContent></Card>
        ) : (
          filtered.map((issue) => {
            const cfg = statusConfig[issue.status];
            const Icon = cfg.icon;
            return (
              <Card key={issue._id} className="hover:border-foreground/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{issue.title}</p>
                        <Badge variant="outline" className="text-[10px]">{issue.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{issue.raceName}</span>
                        <span>{issue.raceState}</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="size-3" />
                          {issue.upvotes} upvotes
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Select
                        value={issue.status}
                        onValueChange={(v) => updateIssueStatus({ id: issue._id, status: v as "submitted" | "acknowledged" | "responded" | "declined" })}
                      >
                        <SelectTrigger className="h-8 text-xs w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([k, c]) => (
                            <SelectItem key={k} value={k}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(issue._id)}>
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
            <DialogTitle>Submit Voter Issue</DialogTitle>
            <DialogDescription>What issue matters most to you in this race?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Race</Label>
              <Select value={form.raceId} onValueChange={(v) => setForm({ ...form, raceId: v })}>
                <SelectTrigger><SelectValue placeholder="Select race" /></SelectTrigger>
                <SelectContent>
                  {(races ?? []).map((r) => (
                    <SelectItem key={r._id} value={r._id}>{r.title} ({r.state})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Issue Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Need more affordable housing" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {issueCategories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Your State</Label>
                <Input value={form.voterState} onChange={(e) => setForm({ ...form, voterState: e.target.value })} placeholder="GA" maxLength={2} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue and what you want candidates to address..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">Submit Issue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Issue</DialogTitle>
            <DialogDescription>Remove this voter issue permanently.</DialogDescription>
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
