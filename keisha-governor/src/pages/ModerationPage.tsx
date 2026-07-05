import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

function ModerationCard({
  post,
  onApprove,
  onReject,
  onPin,
}: {
  post: any;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onPin: () => void;
}) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400",
    approved: "bg-green-500/15 text-green-400",
    rejected: "bg-red-500/15 text-red-400",
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 md:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">{post.authorName}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[post.status]}`}>
              {post.status.toUpperCase()}
            </span>
            {post.pinned && <span className="text-[10px] font-bold text-[#BF0F06] bg-[#BF0F06]/10 px-1.5 py-0.5 rounded">PINNED</span>}
          </div>
          <div className="text-white/30 text-xs mt-0.5">
            {post.authorRole} -- {post.authorCity}, {post.authorCounty} County
          </div>
        </div>
        <span className="text-white/20 text-xs flex-shrink-0">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-3">{post.content}</p>

      {(post.peopleRecruited > 0 || post.hoursVolunteered > 0) && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.peopleRecruited > 0 && (
            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded">+{post.peopleRecruited} recruited</span>
          )}
          {post.hoursVolunteered > 0 && (
            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded">{post.hoursVolunteered}h</span>
          )}
        </div>
      )}

      {post.moderatedBy && (
        <div className="text-white/20 text-xs mb-3">
          Moderated by {post.moderatedBy} {post.moderatedAt ? `on ${new Date(post.moderatedAt).toLocaleDateString()}` : ""}
          {post.rejectionReason && <span className="text-red-400/60"> -- Reason: {post.rejectionReason}</span>}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06] flex-wrap">
        {post.status === "pending" && (
          <>
            <button
              onClick={onApprove}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Approve
            </button>
            {!rejecting ? (
              <button
                onClick={() => setRejecting(true)}
                className="px-4 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold rounded-lg transition-colors"
              >
                Reject
              </button>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30"
                />
                <button
                  onClick={() => { onReject(reason); setRejecting(false); }}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setRejecting(false)}
                  className="text-white/30 text-xs hover:text-white/60"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
        {post.status === "approved" && (
          <button
            onClick={onPin}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              post.pinned
                ? "bg-[#BF0F06]/20 text-[#BF0F06] hover:bg-[#BF0F06]/30"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {post.pinned ? "Unpin" : "Pin to Top"}
          </button>
        )}
        <span className="text-white/20 text-xs ml-auto">
          {post.likes} likes / {post.comments} comments / {post.shares} shares
        </span>
      </div>
    </div>
  );
}

export default function ModerationPage() {
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | undefined>("pending");
  const posts = useQuery(api.runnerFeed.getAllPosts, { status: filter });
  const stats = useQuery(api.runnerFeed.getFeedStats);
  const approvePost = useMutation(api.runnerFeed.approvePost);
  const rejectPost = useMutation(api.runnerFeed.rejectPost);
  const togglePin = useMutation(api.runnerFeed.togglePin);

  const filters = [
    { value: "pending" as const, label: "Pending", color: "text-amber-400" },
    { value: "approved" as const, label: "Approved", color: "text-green-400" },
    { value: "rejected" as const, label: "Rejected", color: "text-red-400" },
    { value: undefined, label: "All", color: "text-white/60" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Back Office -- Moderation</h1>
        <p className="text-white/40 text-sm mt-1">Review and approve Runner Feed posts before they go public.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{stats.pendingReview}</div>
            <div className="text-[10px] text-amber-300/50 uppercase tracking-wider">Awaiting Review</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.totalPosts}</div>
            <div className="text-[10px] text-green-300/50 uppercase tracking-wider">Published</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalRecruited.toLocaleString()}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">Total Recruited</div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1 w-fit">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === f.value ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {!posts && <div className="text-center py-12 text-white/30">Loading...</div>}
        {posts?.length === 0 && (
          <div className="text-center py-12 text-white/30">No {filter} posts.</div>
        )}
        {posts?.map((post) => (
          <ModerationCard
            key={post._id}
            post={post}
            onApprove={() => approvePost({ postId: post._id as Id<"runnerPosts"> })}
            onReject={(reason) => rejectPost({ postId: post._id as Id<"runnerPosts">, reason })}
            onPin={() => togglePin({ postId: post._id as Id<"runnerPosts"> })}
          />
        ))}
      </div>
    </div>
  );
}
