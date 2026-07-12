import { useState } from "react";
import { Users, MapPin, Calendar, Clock, Award, Phone, Mail, ChevronRight, Search, Filter, Plus, Heart } from "lucide-react";

interface Volunteer {
  id: string;
  name: string;
  role: string;
  hours: number;
  doors: number;
  calls: number;
  region: string;
  badge: string;
  joinedAt: string;
  avatar: string;
}

interface Shift {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  spotsLeft: number;
  totalSpots: number;
}

const VOLUNTEERS: Volunteer[] = [
  { id: "1", name: "Maria G.", role: "Field Captain", hours: 247, doors: 1890, calls: 3200, region: "Atlanta Metro", badge: "gold", joinedAt: "2026-01-15", avatar: "MG" },
  { id: "2", name: "James T.", role: "Phone Bank Lead", hours: 189, doors: 420, calls: 5600, region: "Savannah", badge: "gold", joinedAt: "2026-02-01", avatar: "JT" },
  { id: "3", name: "Aisha R.", role: "Canvasser", hours: 156, doors: 1340, calls: 890, region: "Augusta", badge: "silver", joinedAt: "2026-03-10", avatar: "AR" },
  { id: "4", name: "David K.", role: "Event Organizer", hours: 134, doors: 200, calls: 1100, region: "Columbus", badge: "silver", joinedAt: "2026-02-20", avatar: "DK" },
  { id: "5", name: "Sarah L.", role: "Data Entry", hours: 98, doors: 0, calls: 0, region: "Macon", badge: "bronze", joinedAt: "2026-04-05", avatar: "SL" },
  { id: "6", name: "Marcus W.", role: "Canvasser", hours: 87, doors: 980, calls: 450, region: "Athens", badge: "bronze", joinedAt: "2026-04-15", avatar: "MW" },
  { id: "7", name: "Elena P.", role: "Social Media", hours: 76, doors: 0, calls: 0, region: "Marietta", badge: "bronze", joinedAt: "2026-05-01", avatar: "EP" },
  { id: "8", name: "Chris B.", role: "Canvasser", hours: 65, doors: 720, calls: 280, region: "Roswell", badge: "starter", joinedAt: "2026-05-20", avatar: "CB" },
];

const SHIFTS: Shift[] = [
  { id: "s1", title: "Door-to-Door Canvassing", date: "Jul 15, 2026", time: "9:00 AM - 1:00 PM", location: "Atlanta - Zone 3", type: "canvassing", spotsLeft: 8, totalSpots: 20 },
  { id: "s2", title: "Phone Banking Session", date: "Jul 15, 2026", time: "5:00 PM - 8:00 PM", location: "Virtual", type: "phones", spotsLeft: 15, totalSpots: 30 },
  { id: "s3", title: "Voter Registration Drive", date: "Jul 16, 2026", time: "10:00 AM - 3:00 PM", location: "Piedmont Park", type: "registration", spotsLeft: 5, totalSpots: 15 },
  { id: "s4", title: "Campaign Rally Setup", date: "Jul 17, 2026", time: "7:00 AM - 12:00 PM", location: "Georgia World Congress Center", type: "events", spotsLeft: 12, totalSpots: 25 },
  { id: "s5", title: "Data Entry Blitz", date: "Jul 18, 2026", time: "2:00 PM - 6:00 PM", location: "Virtual", type: "data", spotsLeft: 20, totalSpots: 20 },
  { id: "s6", title: "Weekend Canvass Push", date: "Jul 19, 2026", time: "8:00 AM - 4:00 PM", location: "DeKalb County", type: "canvassing", spotsLeft: 3, totalSpots: 30 },
];

const badgeColors: Record<string, string> = {
  gold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  silver: "bg-gray-400/20 text-gray-300 border-gray-400/30",
  bronze: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  starter: "bg-green-500/20 text-green-400 border-green-500/30",
};

const typeColors: Record<string, string> = {
  canvassing: "bg-blue-500/20 text-blue-400",
  phones: "bg-green-500/20 text-green-400",
  registration: "bg-purple-500/20 text-purple-400",
  events: "bg-orange-500/20 text-orange-400",
  data: "bg-cyan-500/20 text-cyan-400",
};

export function VolunteerPage() {
  const [tab, setTab] = useState<"leaderboard" | "shifts" | "signup">("leaderboard");
  const [search, setSearch] = useState("");

  const totalHours = VOLUNTEERS.reduce((a, v) => a + v.hours, 0);
  const totalDoors = VOLUNTEERS.reduce((a, v) => a + v.doors, 0);
  const totalCalls = VOLUNTEERS.reduce((a, v) => a + v.calls, 0);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Volunteer Hub</h1>
          <p className="text-white/50 mt-1">Coordinate, track, and celebrate campaign volunteers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Volunteers", value: VOLUNTEERS.length.toString(), icon: Users },
            { label: "Total Hours", value: totalHours.toLocaleString(), icon: Clock },
            { label: "Doors Knocked", value: totalDoors.toLocaleString(), icon: MapPin },
            { label: "Calls Made", value: totalCalls.toLocaleString(), icon: Phone },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-white/40" />
                <span className="text-xs text-white/40">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["leaderboard", "shifts", "signup"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={"px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all " +
                (tab === t ? "bg-[#1652F0] text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5")
              }>{t === "signup" ? "Sign Up" : t}</button>
          ))}
        </div>

        {tab === "leaderboard" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search volunteers..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20" />
              </div>
            </div>
            {VOLUNTEERS.filter(v => v.name.toLowerCase().includes(search.toLowerCase())).map((v, i) => (
              <div key={v.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="text-lg font-bold text-white/30 w-8 text-center">#{i + 1}</div>
                <div className={"w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold " +
                  (i === 0 ? "bg-yellow-500 text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-orange-500 text-white" : "bg-white/10 text-white/60")
                }>{v.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{v.name}</span>
                    <span className={"text-[10px] px-1.5 py-0.5 rounded-full border " + badgeColors[v.badge]}>{v.badge}</span>
                  </div>
                  <p className="text-xs text-white/40">{v.role} -- {v.region}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-bold">{v.hours}</p>
                    <p className="text-[10px] text-white/40">hours</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{v.doors.toLocaleString()}</p>
                    <p className="text-[10px] text-white/40">doors</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{v.calls.toLocaleString()}</p>
                    <p className="text-[10px] text-white/40">calls</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "shifts" && (
          <div className="space-y-4">
            {SHIFTS.map(s => (
              <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{s.title}</h3>
                      <span className={"text-[10px] px-2 py-0.5 rounded-full " + (typeColors[s.type] || "")}>{s.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={"text-sm font-bold " + (s.spotsLeft <= 5 ? "text-red-400" : "text-green-400")}>{s.spotsLeft} spots left</p>
                    <p className="text-[10px] text-white/40">{s.totalSpots - s.spotsLeft}/{s.totalSpots} filled</p>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#1652F0] rounded-full" style={{ width: ((s.totalSpots - s.spotsLeft) / s.totalSpots * 100) + "%" }} />
                    </div>
                  </div>
                </div>
                <button className={"mt-3 w-full py-2 rounded-lg text-sm font-medium transition-all " +
                  (s.spotsLeft > 0 ? "bg-[" + "#1652F0" + "] hover:opacity-90 text-white" : "bg-white/5 text-white/30 cursor-not-allowed")
                }>{s.spotsLeft > 0 ? "Sign Up for This Shift" : "Shift Full"}</button>
              </div>
            ))}
          </div>
        )}

        {tab === "signup" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <Heart className="w-10 h-10 mx-auto mb-3 text-white/40" />
              <h2 className="text-xl font-bold">Join the Movement</h2>
              <p className="text-sm text-white/40 mt-1">Sign up to volunteer and make a difference</p>
            </div>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("Volunteer signup submitted!"); }}>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Full Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/20" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/20" placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Phone</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/20" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">What interests you?</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Door Knocking", "Phone Banking", "Events", "Data Entry", "Social Media", "Voter Registration"].map(opt => (
                    <label key={opt} className="flex items-center gap-2 bg-white/5 rounded-lg p-2 text-sm cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="rounded" />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Availability</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none">
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-lg font-medium text-white transition-all hover:opacity-90" style={{ backgroundColor: "#1652F0" }}>
                Sign Up to Volunteer
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
