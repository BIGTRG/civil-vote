import { useState } from "react";

const exportTypes = [
  { id: "races", name: "Race Data", description: "All tracked races with status, candidates, and polling data", fields: ["Title","State","Type","Status","Election Date","Candidates","Polling Average"], estimatedRows: 179 },
  { id: "candidates", name: "Candidate Database", description: "Full candidate profiles including party, positions, endorsements, and financials", fields: ["Name","Party","Race","State","Total Raised","Cash on Hand","Polling Avg","Endorsements"], estimatedRows: 259 },
  { id: "donations", name: "Donation Records", description: "All donation transactions with donor info, amounts, and dates", fields: ["Date","Donor","Amount","Platform","Status","Recurring","Candidate"], estimatedRows: 1250 },
  { id: "canvassing", name: "Canvassing Data", description: "Door-to-door canvassing records, turf assignments, and contact results", fields: ["Turf","State","County","Doors Knocked","Positive Contacts","Negative","Not Home","Status"], estimatedRows: 2840 },
  { id: "volunteers", name: "Volunteer Roster", description: "Volunteer contact information, hours, and activity history", fields: ["Name","Email","Phone","State","Hours","Events Attended","Text Bank Count"], estimatedRows: 450 },
  { id: "polling", name: "Polling Data", description: "Poll results from all tracked races with pollster and methodology", fields: ["Race","Pollster","Date","Sample Size","Margin","Results","Source"], estimatedRows: 85 },
  { id: "news", name: "News Archive", description: "Archived news articles and media mentions by topic and sentiment", fields: ["Title","Source","Date","Category","Sentiment","URL"], estimatedRows: 1200 },
  { id: "finance", name: "FEC Finance Reports", description: "Federal Election Commission filing data for all tracked candidates", fields: ["Candidate","Committee","Receipts","Disbursements","Cash on Hand","Filing Date"], estimatedRows: 259 },
];

const recentExports = [
  { name: "Q2_Donation_Report.csv", date: "2026-07-10", size: "2.4 MB", type: "donations" },
  { name: "Battleground_Races.pdf", date: "2026-07-09", size: "1.1 MB", type: "races" },
  { name: "Canvassing_Progress_July.csv", date: "2026-07-08", size: "890 KB", type: "canvassing" },
  { name: "Full_Candidate_DB.csv", date: "2026-07-05", size: "4.2 MB", type: "candidates" },
];

export function DataExportPage() {
  const [selectedExports, setSelectedExports] = useState<string[]>([]);
  const [format, setFormat] = useState<"csv"|"pdf"|"json">("csv");
  const [dateRange, setDateRange] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [exporting, setExporting] = useState(false);

  const toggle = (id: string) => setSelectedExports(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Data Export</h1>
      <p className="text-white/50 mb-6">Export campaign data as CSV, PDF, or JSON for reporting and analysis.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Select Data to Export</h2>
            <div className="space-y-3">
              {exportTypes.map(et => (
                <div key={et.id} onClick={() => toggle(et.id)}
                  className={"flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors " + (selectedExports.includes(et.id) ? "bg-red-500/10 border-red-400/50" : "bg-white/5 border-white/10 hover:border-white/20")}>
                  <div className={"w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center shrink-0 " + (selectedExports.includes(et.id) ? "bg-red-500 border-red-500" : "border-white/30")}>
                    {selectedExports.includes(et.id) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium">{et.name}</h3>
                      <span className="text-xs text-white/40 whitespace-nowrap ml-2">{et.estimatedRows.toLocaleString()} rows</span>
                    </div>
                    <p className="text-sm text-white/50 mt-1">{et.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">{et.fields.map(f => <span key={f} className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded">{f}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Export Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-1">Format</label>
                <div className="flex gap-2">
                  {(["csv","pdf","json"] as const).map(f => (
                    <button key={f} onClick={() => setFormat(f)} className={"flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (format === f ? "bg-red-600 text-white" : "bg-white/10 text-white/50")}>{f.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1">Date Range</label>
                <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-400">
                  <option value="all" className="bg-gray-900">All Time</option>
                  <option value="7d" className="bg-gray-900">Last 7 Days</option>
                  <option value="30d" className="bg-gray-900">Last 30 Days</option>
                  <option value="90d" className="bg-gray-900">Last 90 Days</option>
                  <option value="ytd" className="bg-gray-900">Year to Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1">State Filter</label>
                <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-400">
                  <option value="all" className="bg-gray-900">All States</option>
                  {["Georgia","North Carolina","Texas","Michigan","Pennsylvania","Arizona","Nevada","Wisconsin","Iowa","Maine"].map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                </select>
              </div>
              <button onClick={handleExport} disabled={selectedExports.length === 0 || exporting}
                className={"w-full py-3 rounded-lg font-semibold transition-colors " + (selectedExports.length === 0 ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-red-600 hover:bg-red-500 text-white")}>
                {exporting ? "Exporting..." : selectedExports.length === 0 ? "Select data to export" : "Export " + selectedExports.length + " dataset" + (selectedExports.length > 1 ? "s" : "") + " as " + format.toUpperCase()}
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Recent Exports</h2>
            <div className="space-y-3">
              {recentExports.map(ex => (
                <div key={ex.name} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <div className="text-white truncate">{ex.name}</div>
                    <div className="text-white/40 text-xs">{ex.date} -- {ex.size}</div>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-xs shrink-0 ml-2">Download</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Scheduled Reports</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/50">Weekly Canvassing</span><span className="text-green-400">Active</span></div>
              <div className="flex justify-between"><span className="text-white/50">Monthly Finance</span><span className="text-green-400">Active</span></div>
              <div className="flex justify-between"><span className="text-white/50">Daily Donation Summary</span><span className="text-amber-400">Paused</span></div>
            </div>
            <button className="w-full mt-3 text-sm text-red-400 hover:text-red-300">Schedule New Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
