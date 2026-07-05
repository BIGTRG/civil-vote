import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get approved posts for the public feed
export const getApprovedPosts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    const posts = await ctx.db
      .query("runnerPosts")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .order("desc")
      .take(limit);
    return posts;
  },
});

// Get pinned posts
export const getPinnedPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("runnerPosts")
      .withIndex("by_pinned", (q) => q.eq("pinned", true))
      .collect();
    return posts.filter((p) => p.status === "approved");
  },
});

// Get pending posts (for moderation back office)
export const getPendingPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("runnerPosts")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("desc")
      .collect();
  },
});

// Get all posts (for back office - all statuses)
export const getAllPosts = query({
  args: {
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("runnerPosts")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("runnerPosts").order("desc").collect();
  },
});

// Get feed stats
export const getFeedStats = query({
  handler: async (ctx) => {
    const allPosts = await ctx.db.query("runnerPosts").collect();
    const approved = allPosts.filter((p) => p.status === "approved");
    const pending = allPosts.filter((p) => p.status === "pending");
    const totalRecruited = approved.reduce((sum, p) => sum + (p.peopleRecruited ?? 0), 0);
    const totalLikes = approved.reduce((sum, p) => sum + p.likes, 0);
    const uniqueCounties = new Set(approved.map((p) => p.authorCounty).filter(Boolean));
    return {
      totalPosts: approved.length,
      pendingReview: pending.length,
      totalRecruited,
      totalLikes,
      totalCounties: uniqueCounties.size,
      totalVolunteerHours: approved.reduce((sum, p) => sum + (p.hoursVolunteered ?? 0), 0),
    };
  },
});

// Get comments for a post
export const getComments = query({
  args: { postId: v.id("runnerPosts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("runnerComments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .order("asc")
      .collect();
  },
});

// Submit a new post (goes to pending)
export const submitPost = mutation({
  args: {
    authorName: v.string(),
    authorRole: v.optional(v.string()),
    authorCity: v.optional(v.string()),
    authorCounty: v.optional(v.string()),
    content: v.string(),
    mediaType: v.optional(v.union(v.literal("image"), v.literal("video"), v.literal("none"))),
    mediaUrl: v.optional(v.string()),
    peopleRecruited: v.optional(v.number()),
    hoursVolunteered: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("runnerPosts", {
      ...args,
      tags: args.tags ?? [],
      likes: 0,
      comments: 0,
      shares: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
      pinned: false,
    });
  },
});

// Approve a post (moderation)
export const approvePost = mutation({
  args: {
    postId: v.id("runnerPosts"),
    moderatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.postId, {
      status: "approved",
      moderatedBy: args.moderatedBy ?? "admin",
      moderatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    });
  },
});

// Reject a post (moderation)
export const rejectPost = mutation({
  args: {
    postId: v.id("runnerPosts"),
    reason: v.optional(v.string()),
    moderatedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.postId, {
      status: "rejected",
      rejectionReason: args.reason,
      moderatedBy: args.moderatedBy ?? "admin",
      moderatedAt: new Date().toISOString(),
    });
  },
});

// Pin/unpin a post
export const togglePin = mutation({
  args: { postId: v.id("runnerPosts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { pinned: !post.pinned });
    }
  },
});

// Like a post
export const likePost = mutation({
  args: { postId: v.id("runnerPosts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { likes: post.likes + 1 });
    }
  },
});

// Add a comment
export const addComment = mutation({
  args: {
    postId: v.id("runnerPosts"),
    authorName: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { comments: post.comments + 1 });
    }
    return await ctx.db.insert("runnerComments", {
      postId: args.postId,
      authorName: args.authorName,
      content: args.content,
      likes: 0,
      status: "visible",
      createdAt: new Date().toISOString(),
    });
  },
});
