import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  Flag,
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
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

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV",
  "NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN",
  "TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

const levelLabels: Record<string, string> = {
  federal: "Federal",
  state: "State",
  county: "County",
  municipal: "Municipal",
  school_board: "School Board",
};

const statusColors: Record<string, string> = {
  active: "border-emerald-500/30 text-emerald-600 bg-emerald-50",
  upcoming: "border-orange-500/30 text-orange-600 bg-orange-50",
  completed: "border-gray-500/30 text-gray-600 bg-gray-50",
};

type RaceFormData = {
  title: string;
  office: string;
  level: "federal" | "state" | "county" | "municipal" | "school_board";
  state: string;
  district: string;
  electionDate: string;
  isExclusive: boolean;
  status: "active" | "completed" | "upcoming";
};

const emptyForm: RaceFormData = {
  title: "",
  office: "",
  level: "state",
  state: "GA",
  district: "",
  electionDate: "2026-11-03",
  isExclusive: false,
  status: "active",
};

export function RacesPage() {
  const races = useQuery(api.races.list, {});
  const candidates = useQuery(api.candidates.list, {});
  const createRace = useMutation(api.races.create);
  const updateRace = useMutation(api.races.update);
  const removeRace = useMutation(api.races.remove);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"races"> | null>(null);
  const [form, setForm] = useState<RaceFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<Id<"races"> | null>(null);

  const filtered = (races ?? []).filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.office.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(race: (typeof filtered)[0]) {
    setForm({
      title: race.title,
      office: race.office,
      level: race.level,
      state: race.state,
      district: race.district ?? "",
      electionDate: race.electionDate,
      isExclusive: race.isExclusive,
      status: race.status,
    });
    setEditingId(race._id);
    setShowForm(true);
  }

  async function handleSubmit() {
    if (!form.title || !form.office) return;
    const data = {
      ...form,
      district: form.district || undefined,
    };
    if (editingId) {
      await updateRace({ id: editingId, ...data });
    } else {
      await createRace(data);
    }
    setShowForm(false);
    setEditingId(null);
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    await removeRace({ id: deleteConfirm });
    setDeleteConfirm(null);
  }

  function candidateCount(raceId: Id<"races">) {
    return (candidates ?? []).filter((c) => c.raceId === raceId).length;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Flag className="size-6 text-[#0F2A4A]" />
            Races
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage all races across the platform
          </p>
        </div>
        <Button onClick={openCreate} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
          <Plus className="size-4 mr-1" /> Add Race
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search races..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Race list */}
      <div className="space-y-3">
        {races === undefined ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No races found</CardContent></Card>
        ) : (
          filtered.map((race) => (
            <Card key={race._id} className="hover:border-foreground/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#0F2A4A]/10 flex items-center justify-center font-bold text-lg text-[#0F2A4A] shrink-0">
                  {race.state}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{race.title}</p>
                    {race.isExclusive && (
                      <Badge className="bg-[#C9A227]/10 text-[#C9A227] border-[#C9A227]/30 text-[10px]">
                        Exclusive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{levelLabels[race.level]}</span>
                    <span>{race.office}</span>
                    <span>{race.electionDate}</span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      {candidateCount(race._id)} candidates
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[race.status]}>
                  {race.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(race)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(race._id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Race" : "Add Race"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update race details" : "Create a new race on the platform"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Georgia Governor 2026" />
            </div>
            <div>
              <Label>Office</Label>
              <Input value={form.office} onChange={(e) => setForm({ ...form, office: e.target.value })} placeholder="e.g. Governor, U.S. Senator" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Level</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v as RaceFormData["level"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(levelLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>State</Label>
                <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>District (optional)</Label>
                <Input value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="e.g. 5" />
              </div>
              <div>
                <Label>Election Date</Label>
                <Input type="date" value={form.electionDate} onChange={(e) => setForm({ ...form, electionDate: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as RaceFormData["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isExclusive} onChange={(e) => setForm({ ...form, isExclusive: e.target.checked })} className="rounded" />
                  <span className="text-sm">Exclusive Race</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-[#0F2A4A] hover:bg-[#1A3D66]">
              {editingId ? "Save Changes" : "Create Race"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Race</DialogTitle>
            <DialogDescription>
              This will permanently delete this race and all associated candidates and pledges. This cannot be undone.
            </DialogDescription>
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
