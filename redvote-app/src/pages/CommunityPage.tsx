import { useState } from "react";
import { MessageSquare, ThumbsUp, Share2, Users, TrendingUp, Clock, Bookmark, Flag } from "lucide-react";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  replies: number;
  shares: number;
  category: string;
  pinned?: boolean;
}

const POSTS: Post[] = [
  {
    id: "1", author: "Campaign HQ", avatar: "HQ", time: "2 hours ago",
    content: "Big news: We just crossed 50,000 volunteer signups nationwide. This movement is growing every single day. Thank you to every person who has knocked on a door, made a phone call, or registered a voter. We are building something historic.",
    likes: 847, replies: 124, shares: 312, category: "announcement", pinned: true,
  },
  {
    id: "2", author: "Sarah M.", avatar: "SM", time: "4 hours ago",
    content: "Just finished my first canvassing shift in DeKalb County. Talked to 47 voters today. The energy on the ground is real -- people are engaged and ready to vote. If you have been thinking about volunteering, do it. It is worth it.",
    likes: 234, replies: 38, shares: 67, category: "field",
  },
  {
    id: "3", author: "Data Team", avatar: "DT", time: "5 hours ago",
    content: "New poll just dropped: Georgia Senate race now within 2 points. Momentum is shifting. Check the Polling page for the full breakdown and cross-tabs.",
    likes: 512, replies: 89, shares: 203, category: "data",
  },
  {
    id: "4", author: "Marcus J.", avatar: "MJ", time: "8 hours ago",
    content: "Organized a voter registration drive at Morehouse College yesterday. Registered 186 new voters in 4 hours. The students are fired up. Next stop: Spelman and Clark Atlanta.",
    likes: 678, replies: 56, shares: 145, category: "field",
  },
  {
    id: "5", author: "Policy Watch", avatar: "PW", time: "12 hours ago",
    content: "Breaking down the new infrastructure bill and what it means for Georgia: $2.4B for roads and bridges, $800M for broadband expansion, and 15,000 new jobs. This is what happens when we elect leaders who fight for us.",
    likes: 345, replies: 67, shares: 89, category: "policy",
  },
  {
    id: "6", author: "Events Team", avatar: "ET", time: "1 day ago",
    content: "Town Hall this Saturday at 2 PM -- Georgia World Congress Center. Topic: Education and Our Future. Free admission. RSVP on the Events page. Last town hall had 2,000+ attendees. Let us beat that record.",
    likes: 423, replies: 98, shares: 234, category: "events",
  },
];

const CATEGORIES = ["all", "announcement", "field", "data", "policy", "events"];

const categoryColors: Record<string, string> = {
  announcement: "bg-yellow-500/20 text-yellow-400",
  field: "bg-green-500/20 text-green-400",
  data: "bg-blue-500/20 text-blue-400",
  policy: "bg-purple-500/20 text-purple-400",
  events: "bg-orange-500/20 text-orange-400",
};

export function CommunityPage() {
  const [filter, setFilter] = useState("all");
  const [newPost, setNewPost] = useState("");

  const filtered = filter === "all" ? POSTS : POSTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
          <p className="text-white/50 mt-1">Connect with supporters and stay informed</p>
        </div>

        {/* New Post */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
            placeholder="Share an update, ask a question, or rally the team..."
            className="w-full bg-transparent resize-none text-sm placeholder:text-white/30 focus:outline-none min-h-[60px]" />
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              {["Photo", "Poll", "Event"].map(btn => (
                <button key={btn} className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 hover:text-white/60 transition-colors">{btn}</button>
              ))}
            </div>
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-all" style={{ backgroundColor: "#D22B2B" }}>Post</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={"px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all " +
                (filter === cat ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50")
              }>{cat}</button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filtered.map(post => (
            <div key={post.id} className={"bg-white/5 border rounded-xl p-5 " + (post.pinned ? "border-yellow-500/30" : "border-white/10")}>
              {post.pinned && (
                <div className="flex items-center gap-1 text-yellow-400 text-[10px] mb-2">
                  <Bookmark className="w-3 h-3" />
                  <span>Pinned Post</span>
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{post.avatar}</div>
                <div>
                  <span className="font-medium text-sm">{post.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/30">{post.time}</span>
                    <span className={"text-[10px] px-1.5 py-0.5 rounded-full " + (categoryColors[post.category] || "")}>{post.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-xs text-white/30">
                <button className="flex items-center gap-1 hover:text-white/60 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />{post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-white/60 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />{post.replies}
                </button>
                <button className="flex items-center gap-1 hover:text-white/60 transition-colors">
                  <Share2 className="w-3.5 h-3.5" />{post.shares}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
