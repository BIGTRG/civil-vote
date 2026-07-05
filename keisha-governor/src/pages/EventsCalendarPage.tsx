import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const typeColors: Record<string, { bg: string; text: string }> = {
  rally: { bg: "bg-[#BF0F06]/20", text: "text-[#BF0F06]" },
  fundraiser: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  church: { bg: "bg-purple-500/20", text: "text-purple-400" },
  concert: { bg: "bg-pink-500/20", text: "text-pink-400" },
  townhall: { bg: "bg-blue-500/20", text: "text-blue-400" },
  volunteer: { bg: "bg-amber-500/20", text: "text-amber-400" },
  debate: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  other: { bg: "bg-gray-500/20", text: "text-gray-400" },
};

export function EventsCalendarPage() {
  const events = useQuery(api.events.list);
  const featured = (events ?? []).filter(e => e.featured);
  const sorted = [...(events ?? [])].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
        <p className="text-white/50 mt-1">Rallies, town halls, fundraisers, and volunteer opportunities</p>
      </div>

      {/* Featured Events */}
      {featured.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(e => {
              const tc = typeColors[e.type] || typeColors.other;
              const dateObj = new Date(e.date + "T12:00:00");
              const pct = e.capacity ? Math.min((e.rsvpCount / e.capacity) * 100, 100) : 0;
              return (
                <div key={e._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 text-center">
                      <div className="text-xs text-[#BF0F06] font-medium">{dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</div>
                      <div className="text-2xl font-bold text-white">{dateObj.getDate()}</div>
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{e.type}</span>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{e.title}</h3>
                  <p className="text-white/40 text-sm mb-3 line-clamp-2">{e.description}</p>
                  <div className="text-white/30 text-xs mb-1">{e.location}, {e.city}</div>
                  {e.time && <div className="text-white/30 text-xs mb-3">{e.time}</div>}
                  {e.capacity && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">{e.rsvpCount.toLocaleString()} RSVPs</span>
                        <span className="text-white/20">{e.capacity.toLocaleString()} capacity</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#BF0F06] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Events</h2>
        <div className="space-y-3">
          {sorted.map(e => {
            const tc = typeColors[e.type] || typeColors.other;
            const dateObj = new Date(e.date + "T12:00:00");
            return (
              <div key={e._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-start gap-4 hover:border-white/10 transition-colors">
                <div className="w-14 text-center shrink-0 py-1">
                  <div className="text-xs text-[#BF0F06] font-medium">{dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</div>
                  <div className="text-xl font-bold text-white">{dateObj.getDate()}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{e.type}</span>
                    {e.featured && <span className="text-xs text-amber-400">FEATURED</span>}
                  </div>
                  <h3 className="text-white font-semibold">{e.title}</h3>
                  <p className="text-white/40 text-sm">{e.location}, {e.city}{e.county ? ` (${e.county} County)` : ""}</p>
                </div>
                <div className="text-right shrink-0">
                  {e.time && <div className="text-white/50 text-sm">{e.time}</div>}
                  <div className="text-white/30 text-xs mt-0.5">{e.rsvpCount.toLocaleString()} RSVPs</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
