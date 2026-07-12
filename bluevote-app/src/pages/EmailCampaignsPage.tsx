import { useState } from "react";

const mockCampaigns = [
  { id: "1", name: "Welcome Series", type: "automated", status: "active", sent: 8420, opened: 5894, clicked: 2104, openRate: 70.0, clickRate: 25.0, unsubscribed: 34, lastSent: "2026-07-11" },
  { id: "2", name: "Weekly Digest", type: "recurring", status: "active", sent: 15280, opened: 9168, clicked: 3056, openRate: 60.0, clickRate: 20.0, unsubscribed: 89, lastSent: "2026-07-10" },
  { id: "3", name: "Donation Drive Q3", type: "one-time", status: "sent", sent: 24500, opened: 14700, clicked: 6125, openRate: 60.0, clickRate: 25.0, unsubscribed: 156, lastSent: "2026-07-08" },
  { id: "4", name: "Event Invite -- Town Hall", type: "one-time", status: "draft", sent: 0, opened: 0, clicked: 0, openRate: 0, clickRate: 0, unsubscribed: 0, lastSent: "" },
  { id: "5", name: "GOTV Countdown", type: "automated", status: "scheduled", sent: 0, opened: 0, clicked: 0, openRate: 0, clickRate: 0, unsubscribed: 0, lastSent: "" },
];

const mockSegments = [
  { name: "All Supporters", count: 48250 },
  { name: "Active Donors", count: 12890 },
  { name: "Event Attendees", count: 6720 },
  { name: "Volunteers", count: 3450 },
  { name: "New Sign-ups (7 days)", count: 890 },
  { name: "Lapsed Donors (90+ days)", count: 4200 },
  { name: "Battleground States", count: 18900 },
  { name: "High-Engagement", count: 8400 },
];

const templates = [
  { name: "Welcome Email", subject: "Welcome to the movement!", preview: "Thank you for joining. Here's how you can make a difference..." },
  { name: "Donation Ask", subject: "Can you chip in $10 today?", preview: "We're $X away from our goal. Every dollar counts..." },
  { name: "Event Invitation", subject: "You're invited: {Event Name}", preview: "Join us this {date} for {event}. RSVP now..." },
  { name: "Volunteer Recruitment", subject: "We need your help this weekend", preview: "Canvassing shifts are open in {county}. Sign up..." },
  { name: "Policy Update", subject: "Here's where we stand on {issue}", preview: "An update on the issues that matter most to you..." },
  { name: "GOTV Reminder", subject: "Election Day is {X} days away", preview: "Make your plan to vote. Here's what you need to know..." },
];

export function EmailCampaignsPage() {
  const [activeTab, setActiveTab] = useState<"campaigns"|"compose"|"segments"|"templates">("campaigns");
  const totalSubs = 48250;
  const totalSent = mockCampaigns.reduce((s, c) => s + c.sent, 0);
  const avgOpen = mockCampaigns.filter(c => c.sent > 0).reduce((s, c) => s + c.openRate, 0) / mockCampaigns.filter(c => c.sent > 0).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Email Campaigns</h1>
      <p className="text-white/50 mb-6">Create, manage, and track email outreach to supporters.</p>

      <div className="flex gap-1 bg-white/5 rounded-lg p-1 mb-6 overflow-x-auto">
        {(["campaigns","compose","segments","templates"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={"px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap " +
              (activeTab === tab ? "bg-blue-600 text-white" : "text-white/50 hover:text-white hover:bg-white/5")}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Subscribers", value: totalSubs.toLocaleString(), color: "text-blue-400" },
              { label: "Emails Sent", value: totalSent.toLocaleString(), color: "text-green-400" },
              { label: "Avg Open Rate", value: avgOpen.toFixed(1) + "%", color: "text-purple-400" },
              { label: "Active Campaigns", value: mockCampaigns.filter(c => c.status === "active").length.toString(), color: "text-amber-400" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
                <div className={"text-2xl font-bold mt-1 " + s.color}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">All Campaigns</h2>
              <button onClick={() => setActiveTab("compose")} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">New Campaign</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-white/40 text-left bg-white/5"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Sent</th><th className="px-4 py-3">Open Rate</th><th className="px-4 py-3">Click Rate</th></tr></thead>
                <tbody>{mockCampaigns.map(c => (
                  <tr key={c.id} className="border-t border-white/5 hover:bg-white/5 cursor-pointer">
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-white/50 capitalize">{c.type}</td>
                    <td className="px-4 py-3"><span className={"px-2 py-1 rounded-full text-xs " + ({ active: "bg-green-500/20 text-green-400", sent: "bg-blue-500/20 text-blue-400", draft: "bg-white/10 text-white/50", scheduled: "bg-amber-500/20 text-amber-400" }[c.status] || "")}>{c.status}</span></td>
                    <td className="px-4 py-3 text-white/70">{c.sent > 0 ? c.sent.toLocaleString() : "--"}</td>
                    <td className="px-4 py-3 text-white/70">{c.openRate > 0 ? c.openRate + "%" : "--"}</td>
                    <td className="px-4 py-3 text-white/70">{c.clickRate > 0 ? c.clickRate + "%" : "--"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "compose" && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Create New Campaign</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/50 mb-1">Campaign Name</label>
              <input type="text" placeholder="e.g., July Fundraising Push" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1">Campaign Type</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400">
                <option className="bg-gray-900">One-Time Send</option>
                <option className="bg-gray-900">Recurring (Weekly/Monthly)</option>
                <option className="bg-gray-900">Automated Drip</option>
                <option className="bg-gray-900">Triggered (Event-Based)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Audience Segment</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400">
              {mockSegments.map(s => <option key={s.name} className="bg-gray-900">{s.name} ({s.count.toLocaleString()})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Subject Line</label>
            <input type="text" placeholder="e.g., We need your help today" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">Email Body</label>
            <textarea placeholder="Write your email content here. Use {firstName}, {state}, {donateUrl} for merge fields..." className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 h-48 resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Send Now</button>
            <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Schedule</button>
            <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Save Draft</button>
          </div>
        </div>
      )}

      {activeTab === "segments" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockSegments.map(seg => (
            <div key={seg.name} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 cursor-pointer transition-colors">
              <h3 className="text-white font-semibold mb-1">{seg.name}</h3>
              <p className="text-2xl font-bold text-blue-400">{seg.count.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">contacts in segment</p>
            </div>
          ))}
          <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-5 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto text-white/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
              <span className="text-white/50 text-sm">Create New Segment</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map(t => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 cursor-pointer transition-colors">
              <h3 className="text-white font-semibold mb-1">{t.name}</h3>
              <p className="text-sm text-blue-400 mb-2">{t.subject}</p>
              <p className="text-xs text-white/40">{t.preview}</p>
              <button className="mt-3 text-sm text-blue-400 hover:text-blue-300">Use Template</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
