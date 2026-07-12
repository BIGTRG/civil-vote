import { useState } from "react";

const scriptTemplates = [
  { id: "intro", name: "Introduction", category: "outreach", body: "Hi {firstName}! I'm {volunteerName}, a volunteer reaching out about the upcoming election on {electionDate}. Do you have a moment to chat about the issues that matter most to you?" },
  { id: "gotv", name: "Get Out the Vote", category: "gotv", body: "Hi {firstName}! Election Day is {electionDate}. Your polling place is at {pollingPlace}. Polls are open {pollHours}. Need a ride? Reply YES and we'll arrange one!" },
  { id: "registration", name: "Registration Reminder", category: "outreach", body: "Hi {firstName}! The voter registration deadline for {state} is {deadline}. You can register online at {registrationUrl}. Are you already registered?" },
  { id: "volunteer", name: "Volunteer Recruitment", category: "recruit", body: "Hi {firstName}! We need volunteers for canvassing in {county} this weekend. Shifts are 3 hours and training is provided. Interested? Reply YES!" },
  { id: "event", name: "Event Invite", category: "event", body: "Hi {firstName}! Join us for a town hall this {eventDay} at {eventLocation} at {eventTime}. {candidateName} will be taking questions from the community. RSVP?" },
  { id: "followup", name: "Follow-Up", category: "outreach", body: "Hi {firstName}, thanks for chatting with us earlier! Just wanted to follow up -- did you have any questions about early voting in {county}? We're here to help." },
  { id: "donation", name: "Donation Ask", category: "fundraise", body: "Hi {firstName}! Our fundraising goal for this quarter is ${goal}. Every contribution helps us reach more voters. Can you chip in $10 today? {donateUrl}" },
];

const categories = [
  { id: "all", label: "All Scripts", count: scriptTemplates.length },
  { id: "outreach", label: "Outreach", count: scriptTemplates.filter(s => s.category === "outreach").length },
  { id: "gotv", label: "GOTV", count: scriptTemplates.filter(s => s.category === "gotv").length },
  { id: "recruit", label: "Recruitment", count: scriptTemplates.filter(s => s.category === "recruit").length },
  { id: "event", label: "Events", count: scriptTemplates.filter(s => s.category === "event").length },
  { id: "fundraise", label: "Fundraising", count: scriptTemplates.filter(s => s.category === "fundraise").length },
];

const mockStats = {
  totalSent: 12847, delivered: 12503, responses: 4891, optOuts: 127,
  responseRate: 39.1, activeVolunteers: 34, contactsRemaining: 8450,
  todaySent: 342, todayResponses: 128,
};

const mockVolunteers = [
  { name: "Maria S.", sent: 450, responses: 189, rate: 42.0, status: "active" },
  { name: "James T.", sent: 380, responses: 142, rate: 37.4, status: "active" },
  { name: "Priya K.", sent: 520, responses: 215, rate: 41.3, status: "active" },
  { name: "Robert L.", sent: 290, responses: 98, rate: 33.8, status: "break" },
  { name: "Sarah M.", sent: 410, responses: 171, rate: 41.7, status: "active" },
];

export function TextBankingPage() {
  const [activeTab, setActiveTab] = useState<"dashboard"|"scripts"|"send"|"volunteers">("dashboard");
  const [scriptFilter, setScriptFilter] = useState("all");
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Text Banking</h1>
      <p className="text-white/50 mb-6">Coordinate volunteer texting campaigns to reach voters at scale.</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-lg p-1 mb-6 overflow-x-auto">
        {(["dashboard","scripts","send","volunteers"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={"px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap " +
              (activeTab === tab ? "bg-red-600 text-white" : "text-white/50 hover:text-white hover:bg-white/5")}>
            {tab === "dashboard" ? "Dashboard" : tab === "scripts" ? "Scripts" : tab === "send" ? "Send Texts" : "Volunteers"}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Sent", value: mockStats.totalSent.toLocaleString(), color: "text-red-400" },
              { label: "Response Rate", value: mockStats.responseRate + "%", color: "text-green-400" },
              { label: "Active Volunteers", value: mockStats.activeVolunteers.toString(), color: "text-purple-400" },
              { label: "Contacts Remaining", value: mockStats.contactsRemaining.toLocaleString(), color: "text-amber-400" },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                <div className={"text-2xl font-bold mt-1 " + stat.color}>{stat.value}</div>
              </div>
            ))}
          </div>
          {/* Today's progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Today's Progress</h2>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 bg-white/10 rounded-full h-4"><div className="bg-red-500 h-4 rounded-full" style={{ width: `${(mockStats.todaySent / 500) * 100}%` }} /></div>
              <span className="text-sm text-white/70">{mockStats.todaySent}/500 daily goal</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-sm"><span className="text-white/50">Sent today: </span><span className="text-white font-semibold">{mockStats.todaySent}</span></div>
              <div className="text-sm"><span className="text-white/50">Responses today: </span><span className="text-white font-semibold">{mockStats.todayResponses}</span></div>
              <div className="text-sm"><span className="text-white/50">Delivered: </span><span className="text-green-400 font-semibold">{mockStats.delivered.toLocaleString()}</span></div>
              <div className="text-sm"><span className="text-white/50">Opt-outs: </span><span className="text-red-400 font-semibold">{mockStats.optOuts}</span></div>
            </div>
          </div>
          {/* Top volunteers */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Top Volunteers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-white/40 text-left"><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Sent</th><th className="pb-3 pr-4">Responses</th><th className="pb-3 pr-4">Rate</th><th className="pb-3">Status</th></tr></thead>
                <tbody>{mockVolunteers.map(v => (
                  <tr key={v.name} className="border-t border-white/5">
                    <td className="py-3 pr-4 text-white font-medium">{v.name}</td>
                    <td className="py-3 pr-4 text-white/70">{v.sent}</td>
                    <td className="py-3 pr-4 text-white/70">{v.responses}</td>
                    <td className="py-3 pr-4 text-green-400">{v.rate}%</td>
                    <td className="py-3"><span className={"px-2 py-1 rounded-full text-xs " + (v.status === "active" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400")}>{v.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scripts" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c.id} onClick={() => setScriptFilter(c.id)}
                className={"px-3 py-1.5 rounded-lg text-sm transition-colors " + (scriptFilter === c.id ? "bg-red-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10")}>
                {c.label} ({c.count})
              </button>
            ))}
          </div>
          {scriptTemplates.filter(s => scriptFilter === "all" || s.category === scriptFilter).map(script => (
            <div key={script.id} className={"bg-white/5 border rounded-xl p-5 cursor-pointer transition-colors " + (selectedScript === script.id ? "border-red-400" : "border-white/10 hover:border-white/20")} onClick={() => setSelectedScript(selectedScript === script.id ? null : script.id)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold">{script.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/50">{script.category}</span>
              </div>
              <p className="text-white/60 text-sm whitespace-pre-wrap">{script.body}</p>
              {selectedScript === script.id && (
                <div className="mt-4 flex gap-3">
                  <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">Use This Script</button>
                  <button className="bg-white/10 hover:bg-white/15 text-white text-sm px-4 py-2 rounded-lg transition-colors">Edit Template</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "send" && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Send Text Messages</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/50 mb-1">Target Audience</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                <option className="bg-gray-900">All Registered Voters</option>
                <option className="bg-gray-900">Unregistered -- Battleground States</option>
                <option className="bg-gray-900">Previous Donors</option>
                <option className="bg-gray-900">Event Attendees</option>
                <option className="bg-gray-900">Canvassing Contacts -- Undecided</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1">Script</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                {scriptTemplates.map(s => <option key={s.id} className="bg-gray-900">{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1">Message Preview</label>
              <textarea className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400 h-32 resize-none" defaultValue={scriptTemplates[0].body} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-1">Send Window</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                  <option className="bg-gray-900">9 AM - 9 PM (local time)</option>
                  <option className="bg-gray-900">10 AM - 8 PM (local time)</option>
                  <option className="bg-gray-900">Weekends only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1">Rate Limit</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400">
                  <option className="bg-gray-900">100/hour per volunteer</option>
                  <option className="bg-gray-900">50/hour per volunteer</option>
                  <option className="bg-gray-900">200/hour per volunteer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Start Campaign</button>
              <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Save as Draft</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "volunteers" && (
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Volunteer Roster</h2>
              <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition-colors">Add Volunteer</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-white/40 text-left"><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Texts Sent</th><th className="pb-3 pr-4">Responses</th><th className="pb-3 pr-4">Response Rate</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Actions</th></tr></thead>
                <tbody>{mockVolunteers.map(v => (
                  <tr key={v.name} className="border-t border-white/5">
                    <td className="py-3 pr-4 text-white font-medium">{v.name}</td>
                    <td className="py-3 pr-4 text-white/70">{v.sent}</td>
                    <td className="py-3 pr-4 text-white/70">{v.responses}</td>
                    <td className="py-3 pr-4 text-green-400">{v.rate}%</td>
                    <td className="py-3 pr-4"><span className={"px-2 py-1 rounded-full text-xs " + (v.status === "active" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400")}>{v.status}</span></td>
                    <td className="py-3"><button className="text-red-400 hover:text-red-300 text-xs">Manage</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
