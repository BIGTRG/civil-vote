import { useState } from "react";

const existingApps = [
  { name: "BlueVote", party: "Democratic", url: "https://bluevote-app-28df428d.viktor.space", status: "live", users: 12450, candidates: 259, races: 179, color: "#3B82F6" },
  { name: "RedVote", party: "Republican", url: "https://redvote-app-a455a1b7.viktor.space", status: "live", users: 8920, candidates: 259, races: 179, color: "#EF4444" },
  { name: "SwingVote", party: "Independent", url: "https://swingvote-app-395b181f.viktor.space", status: "live", users: 6780, candidates: 259, races: 179, color: "#8B5CF6" },
  { name: "Keisha for Governor", party: "Campaign", url: "https://keisha-governor-acc5461d.viktor.space", status: "live", users: 3200, candidates: 1, races: 1, color: "#1C3C73" },
];

const templateOptions = [
  { id: "voter", name: "Voter App", desc: "Full-featured voter engagement platform with races, polling, canvassing, and donations", pages: 28, features: ["Race Tracking","Polling Data","Canvassing","Donations","Text Banking","Email Campaigns","Community","Volunteer Management"] },
  { id: "campaign", name: "Campaign App", desc: "Dedicated single-candidate campaign platform with fundraising, volunteer tools, and voter outreach", pages: 18, features: ["Dashboard","Fundraising","Canvassing","Events","Merch Store","Volunteer Hub","Endorsements","GOTV Tools"] },
  { id: "pac", name: "PAC/Super PAC", desc: "Political action committee platform with FEC compliance, donor management, and issue advocacy", pages: 14, features: ["Donor Management","FEC Compliance","Issue Campaigns","Ad Tracking","Endorsement Portal","Financial Reports"] },
  { id: "local", name: "Local Government", desc: "City/county civic engagement platform for transparency, public input, and service requests", pages: 12, features: ["Council Tracker","Public Comment","Budget Transparency","Service Requests","Meeting Calendar","Document Library"] },
];

export function WhiteLabelPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [appName, setAppName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [partyFocus, setPartyFocus] = useState("nonpartisan");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">White-Label Configuration</h1>
      <p className="text-white/50 mb-6">Spin up new branded apps from templates. Each deployment gets its own database, domain, and branding.</p>

      {/* Active deployments */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Active Deployments ({existingApps.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {existingApps.map(app => (
            <div key={app.name} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: app.color }}>{app.name.charAt(0)}</div>
                <div>
                  <div className="text-white font-medium text-sm">{app.name}</div>
                  <div className="text-xs text-white/40">{app.party}</div>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-white/40">Users</span><span className="text-white">{app.users.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Races</span><span className="text-white">{app.races}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Status</span><span className="text-green-400">Live</span></div>
              </div>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="block mt-3 text-xs text-blue-400 hover:text-blue-300 truncate">{app.url}</a>
            </div>
          ))}
        </div>
      </div>

      {/* Create new */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Create New App</h2>
            {/* Template selection */}
            <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3">1. Choose Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {templateOptions.map(t => (
                <div key={t.id} onClick={() => setSelectedTemplate(t.id)}
                  className={"p-4 rounded-lg border cursor-pointer transition-colors " + (selectedTemplate === t.id ? "bg-blue-500/10 border-blue-400/50" : "bg-white/5 border-white/10 hover:border-white/20")}>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-xs text-white/40 mt-1">{t.desc}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="text-blue-400">{t.pages} pages</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/40">{t.features.length} features</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Config */}
            <h3 className="text-sm text-white/50 uppercase tracking-wider mb-3">2. Configure</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-1">App Name</label>
                  <input type="text" value={appName} onChange={e => setAppName(e.target.value)} placeholder="e.g., GreenVote Georgia" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Party/Focus</label>
                  <select value={partyFocus} onChange={e => setPartyFocus(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400">
                    <option value="nonpartisan" className="bg-gray-900">Nonpartisan</option>
                    <option value="democrat" className="bg-gray-900">Democratic</option>
                    <option value="republican" className="bg-gray-900">Republican</option>
                    <option value="independent" className="bg-gray-900">Independent</option>
                    <option value="libertarian" className="bg-gray-900">Libertarian</option>
                    <option value="green" className="bg-gray-900">Green</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-1">Primary Brand Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent" />
                    <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Custom Domain (optional)</label>
                  <input type="text" placeholder="app.yourcampaign.com" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1">Logo Upload</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 mx-auto text-white/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-sm text-white/40">Click to upload or drag and drop</p>
                  <p className="text-xs text-white/30 mt-1">PNG, SVG up to 2MB</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className={"px-6 py-3 rounded-lg font-semibold transition-colors " + (selectedTemplate && appName ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-white/10 text-white/30 cursor-not-allowed")}>Deploy New App</button>
              <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Preview</button>
            </div>
          </div>
        </div>

        {/* Selected template features */}
        <div>
          {selectedTemplate && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Included Features</h2>
              <div className="space-y-2">
                {templateOptions.find(t => t.id === selectedTemplate)?.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Deployment Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Build time</span><span className="text-white">~3 minutes</span></div>
              <div className="flex justify-between"><span className="text-white/40">Hosting</span><span className="text-white">Vercel Edge</span></div>
              <div className="flex justify-between"><span className="text-white/40">Database</span><span className="text-white">Convex (dedicated)</span></div>
              <div className="flex justify-between"><span className="text-white/40">SSL</span><span className="text-green-400">Automatic</span></div>
              <div className="flex justify-between"><span className="text-white/40">CDN</span><span className="text-green-400">Global</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
