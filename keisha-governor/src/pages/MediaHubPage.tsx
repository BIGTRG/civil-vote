import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const typeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  video: { bg: "bg-red-500/20", text: "text-red-400", icon: "VIDEO" },
  podcast: { bg: "bg-purple-500/20", text: "text-purple-400", icon: "PODCAST" },
  article: { bg: "bg-blue-500/20", text: "text-blue-400", icon: "ARTICLE" },
  press_release: { bg: "bg-emerald-500/20", text: "text-emerald-400", icon: "PRESS" },
  social: { bg: "bg-pink-500/20", text: "text-pink-400", icon: "SOCIAL" },
};

const socialStrategy = [
  { platform: "Instagram/TikTok", audience: "18-34", strategy: "Short-form video (Reels, TikToks). Policy explainers under 60 seconds. Behind-the-scenes campaign content.", priority: "HIGH" },
  { platform: "YouTube", audience: "25-54", strategy: "Full town halls, long interviews, policy deep-dives. SEO-optimized titles for Georgia voters.", priority: "HIGH" },
  { platform: "Facebook", audience: "35-65+", strategy: "Community group engagement, event promotion, longer-form posts. Target rural Georgia.", priority: "MEDIUM" },
  { platform: "X (Twitter)", audience: "Political insiders", strategy: "Rapid response, debate moments, endorsement announcements. Engage journalists.", priority: "MEDIUM" },
  { platform: "Podcast Circuit", audience: "Engaged voters", strategy: "Book top political podcasts. Launch campaign podcast for deep dives.", priority: "HIGH" },
];

export function MediaHubPage() {
  const items = useQuery(api.mediaItems.list);
  const sorted = [...(items ?? [])].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  const featured = sorted.filter(i => i.featured);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Media Hub</h1>
        <p className="text-white/50 mt-1">Videos, podcasts, press, and social media strategy</p>
      </div>

      {/* Featured Media */}
      {featured.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Featured</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(m => {
              const tc = typeConfig[m.type] || typeConfig.article;
              return (
                <div key={m._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                  <div className="h-40 bg-gradient-to-br from-[#1C3C73]/30 to-[#BF0F06]/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white/10">{tc.icon}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{m.type.replace("_", " ")}</span>
                      {m.platform && <span className="text-xs text-white/20">{m.platform}</span>}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{m.title}</h3>
                    {m.description && <p className="text-white/40 text-sm mb-2 line-clamp-2">{m.description}</p>}
                    <div className="flex justify-between text-xs text-white/20">
                      {m.source && <span>{m.source}</span>}
                      <span>{new Date(m.publishDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Media */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">All Media</h2>
        <div className="space-y-3">
          {sorted.map(m => {
            const tc = typeConfig[m.type] || typeConfig.article;
            return (
              <div key={m._id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
                <div className={`w-12 h-12 rounded-lg ${tc.bg} flex items-center justify-center shrink-0`}>
                  <span className={`text-xs font-bold ${tc.text}`}>{tc.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm">{m.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${tc.bg} ${tc.text}`}>{m.type.replace("_", " ")}</span>
                    {m.source && <span className="text-white/20 text-xs">{m.source}</span>}
                    {m.platform && <span className="text-white/20 text-xs">on {m.platform}</span>}
                  </div>
                </div>
                <div className="text-white/20 text-xs shrink-0">
                  {new Date(m.publishDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Social Media Strategy */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Social Media Strategy</h2>
        <p className="text-white/30 text-sm mb-4">Platform-by-platform recommendations for maximum reach</p>
        <div className="space-y-3">
          {socialStrategy.map(s => (
            <div key={s.platform} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-white font-semibold">{s.platform}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.priority === "HIGH" ? "bg-[#BF0F06]/20 text-[#BF0F06]" : "bg-amber-500/20 text-amber-400"}`}>{s.priority}</span>
                <span className="text-white/20 text-xs ml-auto">Audience: {s.audience}</span>
              </div>
              <p className="text-white/40 text-sm">{s.strategy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
