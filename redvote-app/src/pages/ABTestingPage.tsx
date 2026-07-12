import { useState } from "react";

const activeTests = [
  { id: "1", name: "Donation Page CTA", status: "running", startDate: "2026-07-05", variants: [
    { name: "Control: 'Donate Now'", visitors: 2450, conversions: 196, rate: 8.0, revenue: 14700 },
    { name: "Variant A: 'Chip In Today'", visitors: 2380, conversions: 214, rate: 9.0, revenue: 16050 },
    { name: "Variant B: 'Join the Fight'", visitors: 2410, conversions: 241, rate: 10.0, revenue: 18075 },
  ], winner: "Variant B", confidence: 94.2 },
  { id: "2", name: "Email Subject Line", status: "running", startDate: "2026-07-08", variants: [
    { name: "Control: 'Your weekly update'", visitors: 5200, conversions: 2860, rate: 55.0, revenue: 0 },
    { name: "Variant A: '{firstName}, see what changed'", visitors: 5150, conversions: 3399, rate: 66.0, revenue: 0 },
  ], winner: "Variant A", confidence: 99.1 },
  { id: "3", name: "Landing Page Hero", status: "running", startDate: "2026-07-10", variants: [
    { name: "Control: Video background", visitors: 890, conversions: 89, rate: 10.0, revenue: 0 },
    { name: "Variant A: Static image + stats", visitors: 870, conversions: 96, rate: 11.0, revenue: 0 },
  ], winner: null, confidence: 67.3 },
  { id: "4", name: "Text Banking Script", status: "completed", startDate: "2026-06-28", variants: [
    { name: "Control: Formal tone", visitors: 3200, conversions: 1024, rate: 32.0, revenue: 0 },
    { name: "Variant A: Casual/conversational", visitors: 3150, conversions: 1323, rate: 42.0, revenue: 0 },
  ], winner: "Variant A", confidence: 99.8 },
];

export function ABTestingPage() {
  const [activeTab, setActiveTab] = useState<"active"|"create"|"history">("active");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">A/B Testing</h1>
      <p className="text-white/50 mb-6">Test different messaging, layouts, and strategies to optimize conversion.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Tests", value: activeTests.filter(t => t.status === "running").length.toString(), color: "text-red-400" },
          { label: "Avg Confidence", value: (activeTests.filter(t => t.status === "running").reduce((s, t) => s + t.confidence, 0) / activeTests.filter(t => t.status === "running").length).toFixed(1) + "%", color: "text-green-400" },
          { label: "Completed", value: activeTests.filter(t => t.status === "completed").length.toString(), color: "text-purple-400" },
          { label: "Revenue Impact", value: "+$" + activeTests.reduce((s, t) => s + t.variants.reduce((vs, v) => vs + v.revenue, 0), 0).toLocaleString(), color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
            <div className={"text-2xl font-bold mt-1 " + s.color}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-white/5 rounded-lg p-1 mb-6">
        {(["active","create","history"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={"px-4 py-2 rounded-md text-sm font-medium transition-colors " + (activeTab === tab ? "bg-red-600 text-white" : "text-white/50 hover:text-white hover:bg-white/5")}>
            {tab === "active" ? "Active Tests" : tab === "create" ? "Create Test" : "History"}
          </button>
        ))}
      </div>

      {(activeTab === "active" || activeTab === "history") && (
        <div className="space-y-4">
          {activeTests.filter(t => activeTab === "active" ? t.status === "running" : t.status === "completed").map(test => (
            <div key={test.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{test.name}</h3>
                  <p className="text-sm text-white/40">Started {test.startDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={"px-3 py-1 rounded-full text-xs font-medium " + (test.confidence >= 95 ? "bg-green-500/20 text-green-400" : test.confidence >= 80 ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-white/50")}>{test.confidence}% confidence</span>
                  <span className={"px-3 py-1 rounded-full text-xs font-medium " + (test.status === "running" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400")}>{test.status}</span>
                </div>
              </div>
              <div className="space-y-3">
                {test.variants.map((v, i) => {
                  const maxRate = Math.max(...test.variants.map(x => x.rate));
                  const isWinner = test.winner === v.name;
                  return (
                    <div key={i} className={"p-4 rounded-lg border " + (isWinner ? "bg-green-500/5 border-green-400/30" : "bg-white/5 border-white/10")}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className={"text-sm font-medium " + (isWinner ? "text-green-400" : "text-white")}>{v.name}</span>
                          {isWinner && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Winner</span>}
                        </div>
                        <span className={"text-lg font-bold " + (isWinner ? "text-green-400" : "text-white")}>{v.rate}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div className={"h-2 rounded-full " + (isWinner ? "bg-green-500" : "bg-red-500")} style={{ width: `${(v.rate / maxRate) * 100}%` }} />
                        </div>
                        <div className="flex gap-4 text-xs text-white/40">
                          <span>{v.visitors.toLocaleString()} visitors</span>
                          <span>{v.conversions.toLocaleString()} conversions</span>
                          {v.revenue > 0 && <span>${v.revenue.toLocaleString()}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {test.status === "running" && test.confidence >= 95 && (
                <div className="mt-4 flex gap-3">
                  <button className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">Apply Winner</button>
                  <button className="bg-white/10 hover:bg-white/15 text-white text-sm px-4 py-2 rounded-lg transition-colors">End Test</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "create" && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Create New A/B Test</h2>
          <div>
            <label className="block text-sm text-white/50 mb-1">Test Name</label>
            <input type="text" placeholder="e.g., Homepage CTA Color" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400" />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">What are you testing?</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
              <option className="bg-gray-900">Donation Page</option>
              <option className="bg-gray-900">Email Subject Line</option>
              <option className="bg-gray-900">Landing Page</option>
              <option className="bg-gray-900">Text Banking Script</option>
              <option className="bg-gray-900">CTA Button</option>
              <option className="bg-gray-900">Page Layout</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Success Metric</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
              <option className="bg-gray-900">Conversion Rate</option>
              <option className="bg-gray-900">Click-Through Rate</option>
              <option className="bg-gray-900">Revenue per Visitor</option>
              <option className="bg-gray-900">Open Rate (Email)</option>
              <option className="bg-gray-900">Response Rate (Text)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/50 mb-1">Traffic Split</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                <option className="bg-gray-900">50/50</option>
                <option className="bg-gray-900">33/33/33 (3 variants)</option>
                <option className="bg-gray-900">80/20 (low risk)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1">Minimum Confidence</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                <option className="bg-gray-900">95% (recommended)</option>
                <option className="bg-gray-900">90%</option>
                <option className="bg-gray-900">99%</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Launch Test</button>
            <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Save Draft</button>
          </div>
        </div>
      )}
    </div>
  );
}
