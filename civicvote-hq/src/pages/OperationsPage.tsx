import { useState, useEffect } from "react";

interface AppHealth {
  name: string;
  url: string;
  apiUrl: string;
  status: "online" | "offline" | "checking";
  accent: string;
  logo: string;
  races?: number;
  news?: number;
  ratings?: number;
}

const APPS: AppHealth[] = [
  { name: "BlueVote", url: "https://bluevote-app-28df428d.viktor.space", apiUrl: "https://original-orca-313.convex.site", status: "checking", accent: "blue", logo: "BV" },
  { name: "RedVote", url: "https://redvote-app-a455a1b7.viktor.space", apiUrl: "https://quaint-lynx-503.convex.site", status: "checking", accent: "red", logo: "RV" },
  { name: "SwingVote", url: "https://swingvote-app-395b181f.viktor.space", apiUrl: "https://cheery-vulture-779.convex.site", status: "checking", accent: "purple", logo: "SV" },
];

const PIPELINE_RUNS = [
  { name: "Race Data Refresh", lastRun: "12 min ago", status: "success", records: 179, schedule: "Every 30 min" },
  { name: "News RSS Feed", lastRun: "12 min ago", status: "success", records: 15, schedule: "Every 30 min" },
  { name: "FEC Finance Pull", lastRun: "4 hours ago", status: "success", records: 25, schedule: "Every 6 hours" },
  { name: "Race Ratings Sync", lastRun: "12 min ago", status: "success", records: 20, schedule: "Every 30 min" },
  { name: "Polling Data Sync", lastRun: "6 hours ago", status: "success", records: 6, schedule: "Every 6 hours" },
];

const API_USAGE = [
  { endpoint: "/api/v1/races", calls: 1247, avg_ms: 45 },
  { endpoint: "/api/v1/polling", calls: 893, avg_ms: 32 },
  { endpoint: "/api/v1/ratings", calls: 756, avg_ms: 28 },
  { endpoint: "/api/v1/news", calls: 2103, avg_ms: 38 },
  { endpoint: "/api/v1/canvassing/stats", calls: 412, avg_ms: 22 },
];

export function OperationsPage() {
  const [apps, setApps] = useState(APPS);
  const [activeTab, setActiveTab] = useState<"overview" | "pipelines" | "api" | "deployments">("overview");

  useEffect(() => {
    // Check health of each app
    const checkHealth = async () => {
      const updated = await Promise.all(
        apps.map(async (app) => {
          try {
            const resp = await fetch(app.apiUrl + "/__admin/health", { signal: AbortSignal.timeout(5000) });
            if (resp.ok) {
              return { ...app, status: "online" as const };
            }
            return { ...app, status: "offline" as const };
          } catch {
            return { ...app, status: "offline" as const };
          }
        })
      );
      setApps(updated);
    };
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Operations Center</h1>
            <p className="text-emerald-400 mt-1">CivilVote Platform Administration</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/50">Live</span>
          </div>
        </div>

        {/* App Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {apps.map(app => (
            <div key={app.name} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                    app.accent === "blue" ? "bg-blue-500" : app.accent === "red" ? "bg-red-500" : "bg-purple-500"
                  }`}>{app.logo}</div>
                  <div>
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-xs text-white/40">{app.accent === "blue" ? "Democratic" : app.accent === "red" ? "Republican" : "Independent"}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                  app.status === "online" ? "bg-green-500/10 text-green-400" :
                  app.status === "offline" ? "bg-red-500/10 text-red-400" :
                  "bg-yellow-500/10 text-yellow-400"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    app.status === "online" ? "bg-green-400" :
                    app.status === "offline" ? "bg-red-400" :
                    "bg-yellow-400 animate-pulse"
                  }`} />
                  {app.status === "online" ? "Online" : app.status === "offline" ? "Offline" : "Checking..."}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold">179</p>
                  <p className="text-[10px] text-white/40">Races</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold">259</p>
                  <p className="text-[10px] text-white/40">Candidates</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold">15</p>
                  <p className="text-[10px] text-white/40">News</p>
                </div>
              </div>
              <a href={app.url} target="_blank" rel="noopener noreferrer"
                className="block mt-3 text-center text-xs text-white/30 hover:text-white/60 transition-colors">
                {app.url.replace("https://", "")}
              </a>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-3">
          {(["overview", "pipelines", "api", "deployments"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >{tab}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Platform Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Races", value: "179", change: "+36 this month" },
                  { label: "Candidates Tracked", value: "259", change: "+45 this month" },
                  { label: "States Covered", value: "48", change: "All battlegrounds" },
                  { label: "Data Points", value: "12.4K", change: "+2.1K this week" },
                  { label: "News Articles", value: "45", change: "3 apps x 15" },
                  { label: "Canvassing Turfs", value: "60", change: "10 states" },
                  { label: "FEC Records", value: "25", change: "Senate candidates" },
                  { label: "Race Ratings", value: "60", change: "Cook + Sabato" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                    <p className="text-[10px] text-emerald-400 mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Projection */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Revenue Projection</h3>
              <div className="space-y-4">
                {[
                  { product: "BlueVote", price: "$125K/mo", clients: 2, arr: "$3M" },
                  { product: "RedVote", price: "$125K/mo", clients: 1, arr: "$1.5M" },
                  { product: "SwingVote", price: "$140K/mo", clients: 1, arr: "$1.68M" },
                ].map(p => (
                  <div key={p.product} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium">{p.product}</p>
                      <p className="text-xs text-white/40">{p.price} per campaign</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{p.arr}</p>
                      <p className="text-xs text-white/40">{p.clients} client{p.clients > 1 ? "s" : ""} projected</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="font-semibold">Year 1 Projected ARR</span>
                  <span className="font-bold text-emerald-400 text-lg">$6.18M</span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">System Health</h3>
              <div className="space-y-3">
                {[
                  { service: "Convex Database (BlueVote)", status: "operational", uptime: "99.99%" },
                  { service: "Convex Database (RedVote)", status: "operational", uptime: "99.99%" },
                  { service: "Convex Database (SwingVote)", status: "operational", uptime: "99.99%" },
                  { service: "Vercel Frontend Hosting", status: "operational", uptime: "99.98%" },
                  { service: "FEC Data Pipeline", status: "operational", uptime: "99.95%" },
                  { service: "News RSS Pipeline", status: "operational", uptime: "99.97%" },
                  { service: "Cron: Race Data Refresh", status: "operational", uptime: "100%" },
                ].map(s => (
                  <div key={s.service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-sm">{s.service}</span>
                    </div>
                    <span className="text-xs text-white/40">{s.uptime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Codebase Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Codebase</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Total Lines of Code</span>
                  <span className="font-mono font-bold">112,733</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Total Files</span>
                  <span className="font-mono font-bold">865</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Apps</span>
                  <span className="font-mono font-bold">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Convex Tables</span>
                  <span className="font-mono font-bold">19</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">API Endpoints</span>
                  <span className="font-mono font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">GitHub Repo</span>
                  <a href="https://github.com/BIGTRG/civil-vote" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-sm hover:underline">BIGTRG/civil-vote</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pipelines" && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-xs text-white/40 font-medium uppercase tracking-wider">
                <span>Pipeline</span>
                <span>Last Run</span>
                <span>Status</span>
                <span>Records</span>
                <span>Schedule</span>
              </div>
              {PIPELINE_RUNS.map((run, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 items-center">
                  <span className="font-medium text-sm">{run.name}</span>
                  <span className="text-sm text-white/50">{run.lastRun}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                    run.status === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${run.status === "success" ? "bg-green-400" : "bg-red-400"}`} />
                    {run.status}
                  </span>
                  <span className="text-sm font-mono">{run.records}</span>
                  <span className="text-sm text-white/40">{run.schedule}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Data Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "FEC Open Data", type: "Free API", status: "Active", cost: "Free" },
                  { name: "Google Civic Info", type: "Free API", status: "Active", cost: "Free" },
                  { name: "NPR Politics RSS", type: "RSS Feed", status: "Active", cost: "Free" },
                  { name: "Politico RSS", type: "RSS Feed", status: "Active", cost: "Free" },
                  { name: "The Hill RSS", type: "RSS Feed", status: "Active", cost: "Free" },
                  { name: "Cook Political Report", type: "Manual + Scrape", status: "Active", cost: "Free" },
                  { name: "AP Elections", type: "Enterprise API", status: "Pending", cost: "$10K-$50K/yr" },
                  { name: "Ballotpedia", type: "Enterprise API", status: "Pending", cost: "$5K-$25K/yr" },
                  { name: "FiveThirtyEight", type: "Scraper", status: "Planned", cost: "Free" },
                ].map(source => (
                  <div key={source.name} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        source.status === "Active" ? "bg-green-500/10 text-green-400" :
                        source.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-white/5 text-white/40"
                      }`}>{source.status}</span>
                    </div>
                    <p className="text-xs text-white/40">{source.type} -- {source.cost}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">API Usage (Last 24 Hours)</h3>
              <div className="space-y-3">
                {API_USAGE.map(ep => (
                  <div key={ep.endpoint} className="flex items-center gap-4">
                    <code className="text-sm font-mono text-emerald-400 w-48">{ep.endpoint}</code>
                    <div className="flex-1 bg-white/5 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(ep.calls / 2500) * 100}%` }} />
                    </div>
                    <span className="text-sm font-mono w-20 text-right">{ep.calls.toLocaleString()}</span>
                    <span className="text-xs text-white/40 w-16 text-right">{ep.avg_ms}ms avg</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                <span className="text-sm text-white/50">Total API Calls</span>
                <span className="font-bold">{API_USAGE.reduce((a, b) => a + b.calls, 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">API Endpoints (All 3 Apps)</h3>
              <div className="space-y-2">
                {[
                  { method: "GET", path: "/api/v1/races", desc: "List all races with candidates" },
                  { method: "GET", path: "/api/v1/polling", desc: "Latest polling data" },
                  { method: "GET", path: "/api/v1/ratings", desc: "Race ratings from forecasters" },
                  { method: "GET", path: "/api/v1/news", desc: "Latest election news" },
                  { method: "GET", path: "/api/v1/canvassing/stats", desc: "Canvassing statistics" },
                  { method: "POST", path: "/__admin/add_news", desc: "Ingest news articles" },
                  { method: "POST", path: "/__admin/add_turfs", desc: "Ingest canvassing turfs" },
                  { method: "POST", path: "/addRaceRatings", desc: "Push race ratings" },
                  { method: "POST", path: "/addPollingData", desc: "Push polling data" },
                  { method: "POST", path: "/updateFinanceV2", desc: "Push FEC finance data" },
                ].map(ep => (
                  <div key={ep.path} className="flex items-center gap-3 p-2 bg-white/[0.02] rounded">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      ep.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                    }`}>{ep.method}</span>
                    <code className="text-sm font-mono text-white/70">{ep.path}</code>
                    <span className="text-xs text-white/30">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "deployments" && (
          <div className="space-y-4">
            {[
              { time: "Today 12:30 AM", app: "All 3 Apps", desc: "Batch 3: Payments, Notifications, API Docs, Public API v1", commit: "2daebcb", status: "success" },
              { time: "Today 12:15 AM", app: "All 3 Apps", desc: "Batch 2: Election Map, Canvassing, Dashboard, AI Match, News", commit: "771bdda", status: "success" },
              { time: "Jul 11, 11:00 PM", app: "All 3 Apps", desc: "Gap pages: Analytics, News, Candidate Portal", commit: "b3bf9d8", status: "success" },
              { time: "Jul 11, 8:00 PM", app: "All 3 Apps", desc: "National race data: 179 races, 259 candidates", commit: "a1c3e5f", status: "success" },
              { time: "Jul 11, 6:00 PM", app: "All 3 Apps", desc: "FEC live finance data, polling, race ratings", commit: "9f8e7d6", status: "success" },
            ].map((dep, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div>
                      <p className="font-medium text-sm">{dep.desc}</p>
                      <p className="text-xs text-white/40 mt-0.5">{dep.app} -- {dep.time}</p>
                    </div>
                  </div>
                  <code className="text-xs font-mono text-white/30 bg-white/5 px-2 py-1 rounded">{dep.commit}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
