import { useState } from "react";

const perfMetrics = [
  { page: "Landing Page", ttfb: 85, fcp: 420, lcp: 890, cls: 0.02, fid: 12, score: 98 },
  { page: "Dashboard", ttfb: 120, fcp: 580, lcp: 1200, cls: 0.05, fid: 18, score: 94 },
  { page: "Races", ttfb: 95, fcp: 490, lcp: 980, cls: 0.03, fid: 15, score: 96 },
  { page: "Election Map", ttfb: 130, fcp: 650, lcp: 1400, cls: 0.08, fid: 22, score: 91 },
  { page: "Canvassing", ttfb: 110, fcp: 540, lcp: 1100, cls: 0.04, fid: 16, score: 95 },
  { page: "Polling Data", ttfb: 100, fcp: 510, lcp: 1050, cls: 0.03, fid: 14, score: 96 },
  { page: "Community", ttfb: 140, fcp: 680, lcp: 1500, cls: 0.06, fid: 25, score: 90 },
  { page: "Payments", ttfb: 90, fcp: 450, lcp: 920, cls: 0.02, fid: 11, score: 97 },
];

const loadTestResults = [
  { scenario: "Normal Traffic", vus: 100, rps: 250, avgLatency: 145, p95: 380, p99: 820, errorRate: 0.1, duration: "5 min", status: "pass" },
  { scenario: "Peak Hours", vus: 500, rps: 1200, avgLatency: 210, p95: 580, p99: 1200, errorRate: 0.3, duration: "10 min", status: "pass" },
  { scenario: "Debate Night Surge", vus: 2000, rps: 4800, avgLatency: 340, p95: 890, p99: 2100, errorRate: 0.8, duration: "15 min", status: "pass" },
  { scenario: "Election Night", vus: 10000, rps: 24000, avgLatency: 520, p95: 1400, p99: 3500, errorRate: 1.2, duration: "30 min", status: "warn" },
  { scenario: "DDoS Simulation", vus: 50000, rps: 120000, avgLatency: 1800, p95: 4500, p99: 8000, errorRate: 12.5, duration: "5 min", status: "fail" },
];

const infraStatus = [
  { name: "BlueVote Frontend", region: "US-East", status: "healthy", uptime: "99.99%", lastIncident: "None" },
  { name: "RedVote Frontend", region: "US-East", status: "healthy", uptime: "99.99%", lastIncident: "None" },
  { name: "SwingVote Frontend", region: "US-East", status: "healthy", uptime: "99.99%", lastIncident: "None" },
  { name: "Convex Backend (BV)", region: "US-East", status: "healthy", uptime: "99.97%", lastIncident: "Jul 2 (3m)" },
  { name: "Convex Backend (RV)", region: "US-East", status: "healthy", uptime: "99.98%", lastIncident: "None" },
  { name: "Convex Backend (SV)", region: "US-East", status: "healthy", uptime: "99.98%", lastIncident: "None" },
  { name: "Data Pipeline", region: "Global", status: "healthy", uptime: "99.95%", lastIncident: "Jul 8 (12m)" },
  { name: "CDN/Edge", region: "Global", status: "healthy", uptime: "100%", lastIncident: "None" },
];

export function LoadTestPage() {
  const [activeTab, setActiveTab] = useState<"performance"|"load"|"infra">("performance");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Performance & Load Testing</h1>
      <p className="text-white/50 mb-6">Monitor page performance, run load tests, and track infrastructure health.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Avg Score", value: Math.round(perfMetrics.reduce((s, m) => s + m.score, 0) / perfMetrics.length).toString(), color: "text-green-400", sub: "Lighthouse" },
          { label: "Avg TTFB", value: Math.round(perfMetrics.reduce((s, m) => s + m.ttfb, 0) / perfMetrics.length) + "ms", color: "text-blue-400", sub: "Time to first byte" },
          { label: "Avg LCP", value: (perfMetrics.reduce((s, m) => s + m.lcp, 0) / perfMetrics.length / 1000).toFixed(1) + "s", color: "text-purple-400", sub: "Largest contentful paint" },
          { label: "Uptime", value: "99.98%", color: "text-green-400", sub: "Last 30 days" },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
            <div className={"text-2xl font-bold mt-1 " + s.color}>{s.value}</div>
            <div className="text-xs text-white/30 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-white/5 rounded-lg p-1 mb-6">
        {(["performance","load","infra"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={"px-4 py-2 rounded-md text-sm font-medium transition-colors " + (activeTab === tab ? "bg-blue-600 text-white" : "text-white/50 hover:text-white hover:bg-white/5")}>
            {tab === "performance" ? "Page Performance" : tab === "load" ? "Load Tests" : "Infrastructure"}
          </button>
        ))}
      </div>

      {activeTab === "performance" && (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-white/40 text-left bg-white/5"><th className="px-4 py-3">Page</th><th className="px-4 py-3">TTFB</th><th className="px-4 py-3">FCP</th><th className="px-4 py-3">LCP</th><th className="px-4 py-3">CLS</th><th className="px-4 py-3">FID</th><th className="px-4 py-3">Score</th></tr></thead>
              <tbody>{perfMetrics.map(m => (
                <tr key={m.page} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white font-medium">{m.page}</td>
                  <td className="px-4 py-3"><span className={m.ttfb < 100 ? "text-green-400" : m.ttfb < 150 ? "text-amber-400" : "text-red-400"}>{m.ttfb}ms</span></td>
                  <td className="px-4 py-3"><span className={m.fcp < 500 ? "text-green-400" : m.fcp < 700 ? "text-amber-400" : "text-red-400"}>{m.fcp}ms</span></td>
                  <td className="px-4 py-3"><span className={m.lcp < 1000 ? "text-green-400" : m.lcp < 1500 ? "text-amber-400" : "text-red-400"}>{(m.lcp / 1000).toFixed(1)}s</span></td>
                  <td className="px-4 py-3"><span className={m.cls < 0.05 ? "text-green-400" : m.cls < 0.1 ? "text-amber-400" : "text-red-400"}>{m.cls.toFixed(2)}</span></td>
                  <td className="px-4 py-3"><span className={m.fid < 20 ? "text-green-400" : m.fid < 50 ? "text-amber-400" : "text-red-400"}>{m.fid}ms</span></td>
                  <td className="px-4 py-3"><span className={"font-bold " + (m.score >= 95 ? "text-green-400" : m.score >= 90 ? "text-amber-400" : "text-red-400")}>{m.score}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "load" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Load Test Results</h2>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">Run New Test</button>
          </div>
          {loadTestResults.map(test => (
            <div key={test.scenario} className={"bg-white/5 border rounded-xl p-5 " + (test.status === "pass" ? "border-white/10" : test.status === "warn" ? "border-amber-400/30" : "border-red-400/30")}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-semibold">{test.scenario}</h3>
                  <p className="text-xs text-white/40">{test.vus.toLocaleString()} virtual users, {test.duration}</p>
                </div>
                <span className={"px-3 py-1 rounded-full text-xs font-medium " + (test.status === "pass" ? "bg-green-500/20 text-green-400" : test.status === "warn" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400")}>{test.status === "pass" ? "Passed" : test.status === "warn" ? "Warning" : "Failed"}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "RPS", value: test.rps.toLocaleString() },
                  { label: "Avg Latency", value: test.avgLatency + "ms" },
                  { label: "P95", value: test.p95 + "ms" },
                  { label: "P99", value: test.p99 + "ms" },
                  { label: "Error Rate", value: test.errorRate + "%" },
                ].map(m => (
                  <div key={m.label} className="bg-white/5 rounded-lg p-2">
                    <div className="text-xs text-white/40">{m.label}</div>
                    <div className="text-white font-semibold text-sm">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "infra" && (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-white/40 text-left bg-white/5"><th className="px-4 py-3">Service</th><th className="px-4 py-3">Region</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Uptime</th><th className="px-4 py-3">Last Incident</th></tr></thead>
              <tbody>{infraStatus.map(s => (
                <tr key={s.name} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-white/50">{s.region}</td>
                  <td className="px-4 py-3"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400" /><span className="text-green-400">Healthy</span></span></td>
                  <td className="px-4 py-3 text-white/70">{s.uptime}</td>
                  <td className="px-4 py-3 text-white/50">{s.lastIncident}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
