import { useState } from "react";

const notifChannels = [
  { id: "push", name: "Push Notifications", desc: "Browser and mobile push alerts", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { id: "email", name: "Email Alerts", desc: "Delivered to your inbox", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "sms", name: "SMS Alerts", desc: "Text message notifications", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
];

const notifTypes = [
  { id: "race_updates", name: "Race Updates", desc: "New polls, rating changes, candidate announcements", default: true },
  { id: "breaking_news", name: "Breaking Election News", desc: "Major election news and developments", default: true },
  { id: "donation_receipts", name: "Donation Receipts", desc: "Confirmation when your donation is processed", default: true },
  { id: "canvassing", name: "Canvassing Alerts", desc: "New turfs, shift reminders, progress milestones", default: false },
  { id: "volunteer", name: "Volunteer Opportunities", desc: "New volunteer shifts and events near you", default: false },
  { id: "finance", name: "FEC Finance Updates", desc: "New campaign finance filings and reports", default: false },
  { id: "community", name: "Community Activity", desc: "Replies to your posts, mentions, trending discussions", default: true },
  { id: "candidate_portal", name: "Candidate Portal", desc: "Updates from candidates you follow", default: true },
  { id: "gotv", name: "GOTV Reminders", desc: "Election day reminders, early voting alerts, deadline warnings", default: true },
  { id: "weekly_digest", name: "Weekly Digest", desc: "Summary of the week's key races and updates", default: true },
];

export function PushNotificationsPage() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [channels, setChannels] = useState<Record<string, boolean>>({ push: false, email: true, sms: false });
  const [prefs, setPrefs] = useState<Record<string, boolean>>(Object.fromEntries(notifTypes.map(n => [n.id, n.default])));
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");

  const enablePush = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setPushEnabled(true);
        setChannels(prev => ({ ...prev, push: true }));
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Push Notifications</h1>
      <p className="text-white/50 mb-6">Control how and when you receive alerts about elections, campaigns, and community activity.</p>

      {/* Push enable banner */}
      {!pushEnabled && (
        <div className="bg-red-600/10 border border-red-400/30 rounded-xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-semibold">Enable Push Notifications</h3>
            <p className="text-white/50 text-sm mt-1">Get instant alerts on election updates, poll results, and breaking news -- even when the app is closed.</p>
          </div>
          <button onClick={enablePush} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shrink-0">Enable Push</button>
        </div>
      )}

      {/* Channels */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Notification Channels</h2>
        <div className="space-y-4">
          {notifChannels.map(ch => (
            <div key={ch.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ch.icon} /></svg>
                <div>
                  <div className="text-white font-medium">{ch.name}</div>
                  <div className="text-sm text-white/40">{ch.desc}</div>
                </div>
              </div>
              <button onClick={() => ch.id === "push" && !pushEnabled ? enablePush() : setChannels(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                className={"w-12 h-7 rounded-full transition-colors relative " + (channels[ch.id] ? "bg-red-600" : "bg-white/20")}>
                <div className={"w-5 h-5 rounded-full bg-white absolute top-1 transition-transform " + (channels[ch.id] ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification types */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Notification Types</h2>
        <div className="space-y-3">
          {notifTypes.map(nt => (
            <div key={nt.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <div className="text-white font-medium text-sm">{nt.name}</div>
                <div className="text-xs text-white/40">{nt.desc}</div>
              </div>
              <button onClick={() => setPrefs(prev => ({ ...prev, [nt.id]: !prev[nt.id] }))}
                className={"w-10 h-6 rounded-full transition-colors relative " + (prefs[nt.id] ? "bg-red-600" : "bg-white/20")}>
                <div className={"w-4 h-4 rounded-full bg-white absolute top-1 transition-transform " + (prefs[nt.id] ? "translate-x-5" : "translate-x-1")} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quiet hours */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quiet Hours</h2>
        <p className="text-sm text-white/40 mb-4">No notifications during these hours (except breaking election news).</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/50 mb-1">Start</label>
            <input type="time" value={quietStart} onChange={e => setQuietStart(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400" />
          </div>
          <div>
            <label className="block text-sm text-white/50 mb-1">End</label>
            <input type="time" value={quietEnd} onChange={e => setQuietEnd(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400" />
          </div>
        </div>
      </div>

      <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Save Preferences</button>
    </div>
  );
}
