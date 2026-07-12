
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function CanvassingPage() {
  const turfs = useQuery(api.canvassing.getTurfs, {});
  const stats = useQuery(api.canvassing.getStats);
  

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Canvassing HQ</h1>
        <p className="text-white/50 text-sm mt-1">Door-to-door tracking and voter contact management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Turfs", value: stats?.totalTurfs || 0, color: "purple-400" },
          { label: "Total Doors", value: stats?.totalDoors?.toLocaleString() || "0", color: "white" },
          { label: "Doors Knocked", value: stats?.doorsKnocked?.toLocaleString() || "0", color: "green-400" },
          { label: "Positive Contacts", value: stats?.positiveContacts?.toLocaleString() || "0", color: "emerald-400" },
          { label: "Contact Rate", value: `${stats?.contactRate || 0}%`, color: "yellow-400" },
          { label: "Completed", value: stats?.completedTurfs || 0, color: "purple-400" },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4">
            <div className={`text-xl font-bold text-${s.color}`}>{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Turfs table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Turf Assignments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Turf</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">State</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Progress</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Contact Rate</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {turfs && turfs.length > 0 ? turfs.map((turf) => {
                const pct = turf.totalDoors > 0 ? Math.round((turf.doorsKnocked / turf.totalDoors) * 100) : 0;
                const contactRate = turf.doorsKnocked > 0 ? Math.round(((turf.positiveContacts + turf.negativeContacts) / turf.doorsKnocked) * 100) : 0;
                return (
                  <tr key={turf._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-3 text-sm text-white">{turf.name}</td>
                    <td className="px-6 py-3 text-sm text-white/60">{turf.state}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-white/50">{turf.doorsKnocked}/{turf.totalDoors}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-white/60">{contactRate}%</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        turf.status === "completed" ? "bg-green-500/20 text-green-400" :
                        turf.status === "in_progress" ? "bg-purple-500/20 text-purple-400" :
                        "bg-white/10 text-white/40"
                      }`}>
                        {turf.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                    No turfs assigned yet. Turfs will appear here once campaigns begin canvassing operations.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">How Canvassing Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Get Assigned", desc: "Campaign managers assign turf areas with walk lists of registered voters." },
            { step: "2", title: "Knock Doors", desc: "Record each interaction -- supporter, undecided, or opposition. Log concerns and issues." },
            { step: "3", title: "Track Impact", desc: "Real-time dashboards show contact rates, voter sentiment, and turf completion across all teams." },
          ].map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                {s.step}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{s.title}</div>
                <div className="text-white/40 text-xs mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
