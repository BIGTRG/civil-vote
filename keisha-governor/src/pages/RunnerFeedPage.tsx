import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import ShareModal from "@/components/ShareModal";

const APP_URL = "https://keisha-governor-acc5461d.viktor.space";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function PostCard({
  post,
  onLike,
  onShare,
}: {
  post: any;
  onLike: () => void;
  onShare: () => void;
}) {
  const roleColors: Record<string, string> = {
    "Community Captain": "bg-[#BF0F06]/20 text-[#ff6b63]",
    "Team Lead": "bg-[#1C3C73]/30 text-[#7ba3d9]",
    "Regional Coordinator": "bg-purple-500/20 text-purple-300",
    "Church Liaison": "bg-amber-500/20 text-amber-300",
    "Student Organizer": "bg-green-500/20 text-green-300",
    Volunteer: "bg-white/10 text-white/60",
  };

  return (
    <div
      className={`bg-white/[0.03] border rounded-xl p-4 md:p-5 ${post.pinned ? "border-[#BF0F06]/30 ring-1 ring-[#BF0F06]/10" : "border-white/[0.06]"}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C3C73] to-[#BF0F06] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {post.authorName
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">
              {post.authorName}
            </span>
            {post.pinned && (
              <span className="text-[10px] font-bold text-[#BF0F06] bg-[#BF0F06]/10 px-1.5 py-0.5 rounded">
                PINNED
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {post.authorRole && (
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${roleColors[post.authorRole] || "bg-white/10 text-white/50"}`}
              >
                {post.authorRole}
              </span>
            )}
            {post.authorCity && (
              <span className="text-white/30 text-xs">
                {post.authorCity}, GA
              </span>
            )}
            <span className="text-white/20 text-xs">
              {timeAgo(post.publishedAt || post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-white/80 text-sm leading-relaxed mb-3">
        {post.content}
      </p>

      {/* Metrics badges */}
      {(post.peopleRecruited > 0 || post.hoursVolunteered > 0) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.peopleRecruited > 0 && (
            <span className="text-xs font-semibold bg-green-500/15 text-green-400 px-3 py-1 rounded-full">
              +{post.peopleRecruited} recruited
            </span>
          )}
          {post.hoursVolunteered > 0 && (
            <span className="text-xs font-semibold bg-[#1C3C73]/30 text-[#7ba3d9] px-3 py-1 rounded-full">
              {post.hoursVolunteered}h volunteered
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Engagement bar */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06]">
        <button
          onClick={onLike}
          className="flex items-center gap-1.5 text-white/40 hover:text-[#BF0F06] transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {post.likes}
        </button>
        <span className="flex items-center gap-1.5 text-white/40 text-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {post.comments}
        </span>
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 text-white/40 hover:text-[#1C3C73] transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          {post.shares}
        </button>
      </div>
    </div>
  );
}

function InviteCard() {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${APP_URL}/?ref=join`;

  const handleCopy = async () => {
    const text = `Join me in supporting Keisha Lance Bottoms for Governor of Georgia. Sign up for the campaign app and be part of the movement:\n\n${inviteLink}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Keisha for Governor -- Join the Movement",
          text: "Join me in supporting Keisha Lance Bottoms for Governor of Georgia. Sign up for the campaign app and be part of the movement.",
          url: inviteLink,
        });
      } catch {
        // cancelled
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1C3C73]/30 to-[#BF0F06]/20 border border-[#1C3C73]/30 rounded-xl p-4 md:p-5">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        <h3 className="text-white font-bold">Invite People to Join</h3>
      </div>
      <p className="text-white/50 text-xs mb-3">Share the app with friends, family, and community. Every signup strengthens the movement.</p>
      <div className="flex gap-2">
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button
            onClick={handleNativeShare}
            className="flex-1 bg-[#1C3C73] hover:bg-[#1C3C73]/80 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            Share Invite
          </button>
        )}
        <button
          onClick={handleCopy}
          className={`flex-1 text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors ${
            copied
              ? "bg-green-600 text-white"
              : "bg-white/10 hover:bg-white/15 text-white"
          }`}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

export default function RunnerFeedPage() {
  const posts = useQuery(api.runnerFeed.getApprovedPosts, { limit: 50 });
  const stats = useQuery(api.runnerFeed.getFeedStats);
  const likePost = useMutation(api.runnerFeed.likePost);
  const [sharePost, setSharePost] = useState<any>(null);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Runner Feed
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Boots on the ground. Real stories from the movement.
        </p>
      </div>

      {/* Invite card */}
      <InviteCard />

      {/* Stats bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">
              {stats.totalRecruited.toLocaleString()}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              People Recruited
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">
              {stats.totalPosts}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Field Reports
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">
              {stats.totalVolunteerHours}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Volunteer Hours
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-white">
              {stats.totalCounties}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Counties Active
            </div>
          </div>
        </div>
      )}

      {/* Pending notice for admins */}
      {stats && stats.pendingReview > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between">
          <span className="text-amber-300 text-sm font-medium">
            {stats.pendingReview} posts awaiting review
          </span>
          <a
            href="/moderation"
            className="text-xs text-amber-400 hover:text-amber-300 underline"
          >
            Review now
          </a>
        </div>
      )}

      {/* Feed */}
      <div className="space-y-4">
        {!posts && (
          <div className="text-center py-12 text-white/30">
            Loading feed...
          </div>
        )}
        {posts?.length === 0 && (
          <div className="text-center py-12 text-white/30">
            No posts yet. Be the first to share from the field.
          </div>
        )}
        {posts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={() => likePost({ postId: post._id })}
            onShare={() => setSharePost(post)}
          />
        ))}
      </div>

      {/* Share modal */}
      {sharePost && (
        <ShareModal
          postId={sharePost._id}
          postContent={sharePost.content}
          authorName={sharePost.authorName}
          peopleRecruited={sharePost.peopleRecruited}
          onClose={() => setSharePost(null)}
        />
      )}
    </div>
  );
}
