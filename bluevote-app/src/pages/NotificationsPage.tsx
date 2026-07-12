import { useState } from "react";

type NotificationType = "race_update" | "poll_result" | "finance_update" | "campaign_news" | "system";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  time: string;
  actionUrl?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", title: "New Poll Released", message: "Cook Political Report updated Georgia Senate race to Toss-up. Ossoff leads by 1.2 points.", type: "poll_result", read: false, time: "5 min ago", actionUrl: "/polling" },
  { id: "2", title: "FEC Filing Deadline", message: "Q3 2026 filing deadline is October 15. Ensure all contributions are properly reported.", type: "system", read: false, time: "1 hour ago" },
  { id: "3", title: "Fundraising Milestone", message: "Campaign has raised $2.4M this quarter, reaching 68% of the $3.5M goal.", type: "finance_update", read: false, time: "3 hours ago", actionUrl: "/payments" },
  { id: "4", title: "Race Rating Change", message: "North Carolina Senate moved from Lean R to Toss-up in latest Sabato Crystal Ball update.", type: "race_update", read: true, time: "6 hours ago", actionUrl: "/maps" },
  { id: "5", title: "Breaking: Endorsement", message: "Major labor union endorses Democratic candidate in key battleground state.", type: "campaign_news", read: true, time: "8 hours ago", actionUrl: "/news" },
  { id: "6", title: "Canvassing Update", message: "Georgia team knocked 1,240 doors today. Positive contact rate: 34%.", type: "campaign_news", read: true, time: "12 hours ago", actionUrl: "/canvassing" },
  { id: "7", title: "System Update", message: "New election map feature deployed. Interactive state-by-state visualization now available.", type: "system", read: true, time: "1 day ago", actionUrl: "/maps" },
  { id: "8", title: "Polling Alert", message: "Three new polls released for Texas Senate race. Average shows race within margin of error.", type: "poll_result", read: true, time: "1 day ago", actionUrl: "/polling" },
];

const TYPE_CONFIG: Record<NotificationType, { label: string; color: string; icon: string }> = {
  race_update: { label: "Race Update", color: "text-amber-400 bg-amber-500/10", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  poll_result: { label: "Poll Result", color: "text-cyan-400 bg-cyan-500/10", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  finance_update: { label: "Finance", color: "text-green-400 bg-green-500/10", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  campaign_news: { label: "Campaign", color: "text-blue-400 bg-blue-500/10", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  system: { label: "System", color: "text-white/60 bg-white/5", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<NotificationType | "all">("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            <p className="text-white/50 mt-1">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-blue-400 hover:underline">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "race_update", "poll_result", "finance_update", "campaign_news", "system"] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === type
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {type === "all" ? `All (${notifications.length})` : TYPE_CONFIG[type].label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-2">
          {filtered.map(n => {
            const config = TYPE_CONFIG[n.type];
            return (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  n.read ? "bg-white/[0.02] border-white/5" : "bg-white/5 border-white/10"
                }`}
                onClick={() => toggleRead(n.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={config.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${n.read ? "text-white/60" : "text-white"}`}>{n.title}</h3>
                        {!n.read && <div className={"w-2 h-2 rounded-full bg-blue-500"} />}
                      </div>
                      <span className="text-xs text-white/30 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${n.read ? "text-white/40" : "text-white/60"}`}>{n.message}</p>
                    {n.actionUrl && (
                      <a href={n.actionUrl} className={"text-xs mt-2 inline-block text-blue-400 hover:underline"} onClick={e => e.stopPropagation()}>
                        View details
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p>No notifications in this category</p>
          </div>
        )}

        {/* Notification Preferences */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: "Race rating changes", desc: "When Cook, Sabato, or others update ratings", enabled: true },
              { label: "New polling data", desc: "When new polls are released for tracked races", enabled: true },
              { label: "FEC filings", desc: "When new campaign finance data is available", enabled: true },
              { label: "Campaign news", desc: "Breaking news about tracked campaigns", enabled: false },
              { label: "Canvassing updates", desc: "Daily summaries of field operations", enabled: false },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-xs text-white/40">{pref.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-all cursor-pointer ${pref.enabled ? "bg-blue-500" : "bg-white/20"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${pref.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
