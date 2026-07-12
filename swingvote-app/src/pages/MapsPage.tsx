import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const STATE_COORDS: Record<string, { x: number; y: number }> = {
  "Alabama": { x: 73, y: 68 }, "Alaska": { x: 15, y: 88 }, "Arizona": { x: 25, y: 65 },
  "Arkansas": { x: 62, y: 62 }, "California": { x: 12, y: 50 }, "Colorado": { x: 35, y: 48 },
  "Connecticut": { x: 90, y: 35 }, "Delaware": { x: 88, y: 42 }, "Florida": { x: 82, y: 80 },
  "Georgia": { x: 78, y: 68 }, "Hawaii": { x: 28, y: 90 }, "Idaho": { x: 22, y: 30 },
  "Illinois": { x: 65, y: 42 }, "Indiana": { x: 70, y: 42 }, "Iowa": { x: 58, y: 37 },
  "Kansas": { x: 48, y: 50 }, "Kentucky": { x: 73, y: 50 }, "Louisiana": { x: 62, y: 72 },
  "Maine": { x: 95, y: 18 }, "Maryland": { x: 85, y: 42 }, "Massachusetts": { x: 92, y: 32 },
  "Michigan": { x: 72, y: 32 }, "Minnesota": { x: 55, y: 25 }, "Mississippi": { x: 68, y: 68 },
  "Missouri": { x: 60, y: 50 }, "Montana": { x: 30, y: 22 }, "Nebraska": { x: 46, y: 40 },
  "Nevada": { x: 18, y: 42 }, "New Hampshire": { x: 92, y: 25 }, "New Jersey": { x: 88, y: 38 },
  "New Mexico": { x: 30, y: 60 }, "New York": { x: 85, y: 28 }, "North Carolina": { x: 82, y: 55 },
  "North Dakota": { x: 45, y: 22 }, "Ohio": { x: 75, y: 40 }, "Oklahoma": { x: 50, y: 58 },
  "Oregon": { x: 14, y: 28 }, "Pennsylvania": { x: 82, y: 36 }, "Rhode Island": { x: 92, y: 34 },
  "South Carolina": { x: 80, y: 62 }, "South Dakota": { x: 45, y: 30 }, "Tennessee": { x: 72, y: 55 },
  "Texas": { x: 45, y: 70 }, "Utah": { x: 26, y: 45 }, "Vermont": { x: 90, y: 22 },
  "Virginia": { x: 82, y: 48 }, "Washington": { x: 15, y: 18 }, "West Virginia": { x: 78, y: 45 },
  "Wisconsin": { x: 63, y: 28 }, "Wyoming": { x: 32, y: 35 },
};

const RATING_COLORS: Record<string, string> = {
  "Safe D": "#1E40AF",
  "Likely D": "#3B82F6",
  "Lean D": "#60A5FA",
  "Toss-up": "#A855F7",
  "Lean R": "#F87171",
  "Likely R": "#EF4444",
  "Safe R": "#991B1B",
};

export function MapsPage() {
  const ratings = useQuery(api.liveData.getAllRaceRatings);
  const races = useQuery(api.races.list, {});
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"ratings" | "finance" | "turnout">("ratings");

  const stateRatings = new Map<string, string>();
  if (ratings) {
    for (const r of ratings) {
      if (!stateRatings.has(r.state) || r.office === "Senate") {
        stateRatings.set(r.state, r.rating);
      }
    }
  }

  const stateRaces = new Map<string, number>();
  if (races) {
    for (const r of races) {
      stateRaces.set(r.state, (stateRaces.get(r.state) || 0) + 1);
    }
  }

  const selectedRatings = ratings?.filter(r => r.state === selectedState) || [];
  const selectedRaceList = races?.filter((r: any) => r.state === selectedState) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Election Map</h1>
          <p className="text-white/50 text-sm mt-1">Interactive race map with real-time ratings</p>
        </div>
        <div className="flex gap-2">
          {["ratings", "finance", "turnout"].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === mode
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "text-white/40 hover:text-white/60 border border-white/10"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
        {Object.entries(RATING_COLORS).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-white/60 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="relative w-full" style={{ paddingBottom: "60%" }}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {Object.entries(STATE_COORDS).map(([state, pos]) => {
              const rating = stateRatings.get(state);
              const color = rating ? RATING_COLORS[rating] || "#4B5563" : "#374151";
              const raceCount = stateRaces.get(state) || 0;
              const isSelected = selectedState === state;
              return (
                <g key={state} onClick={() => setSelectedState(isSelected ? null : state)} className="cursor-pointer">
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={raceCount > 3 ? 2.5 : raceCount > 0 ? 2 : 1.5}
                    fill={color}
                    stroke={isSelected ? "#fff" : "transparent"}
                    strokeWidth={isSelected ? 0.5 : 0}
                    opacity={isSelected ? 1 : 0.85}
                    className="transition-all hover:opacity-100"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fill="white"
                    fillOpacity={0.5}
                    fontSize={1.8}
                    className="pointer-events-none select-none"
                  >
                    {state.slice(0, 2).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* State Detail Panel */}
      {selectedState && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{selectedState}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedRatings.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-purple-400 mb-2">Race Ratings</h3>
                <div className="space-y-2">
                  {selectedRatings.map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-white/70 text-sm">{r.office}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: RATING_COLORS[r.rating] || "#4B5563", color: "#fff" }}>
                        {r.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-purple-400 mb-2">Active Races</h3>
              <div className="space-y-2">
                {selectedRaceList.length > 0 ? selectedRaceList.slice(0, 6).map((r: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-lg px-3 py-2">
                    <span className="text-white/70 text-sm">{r.title}</span>
                  </div>
                )) : (
                  <p className="text-white/30 text-sm">No active races</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{stateRaces.size}</div>
          <div className="text-white/40 text-xs mt-1">States with Races</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {ratings?.filter(r => r.rating === "Toss-up").length || 0}
          </div>
          <div className="text-white/40 text-xs mt-1">Toss-up Races</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {ratings?.filter(r => r.rating.includes("D")).length || 0}
          </div>
          <div className="text-white/40 text-xs mt-1">Lean/Likely D</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">
            {ratings?.filter(r => r.rating.includes("R")).length || 0}
          </div>
          <div className="text-white/40 text-xs mt-1">Lean/Likely R</div>
        </div>
      </div>
    </div>
  );
}
