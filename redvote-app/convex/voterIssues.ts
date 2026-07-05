import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    state: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let issues;
    if (args.state) {
      issues = await ctx.db.query("voterIssues").withIndex("by_state", q => q.eq("state", args.state!)).collect();
    } else if (args.category) {
      issues = await ctx.db.query("voterIssues").withIndex("by_category", q => q.eq("category", args.category!)).collect();
    } else if (args.status) {
      issues = await ctx.db.query("voterIssues").withIndex("by_status", q => q.eq("status", args.status as any)).collect();
    } else {
      issues = await ctx.db.query("voterIssues").collect();
    }
    return issues.sort((a, b) => b.upvotes - a.upvotes);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    state: v.string(),
    raceId: v.optional(v.id("races")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const users = await ctx.db.query("users").collect();
    const user = users.find(u => (u as any).email === identity.email);
    if (!user) throw new Error("User not found");

    const issueId = await ctx.db.insert("voterIssues", {
      oderId: user._id,
      title: args.title,
      description: args.description,
      category: args.category,
      state: args.state,
      raceId: args.raceId,
      upvotes: 1,
      status: "open",
      createdAt: new Date().toISOString(),
      responses: [],
    });

    await ctx.db.insert("activityFeed", {
      type: "issue",
      message: `New voter issue: "${args.title}" in ${args.state}`,
      state: args.state,
      raceId: args.raceId,
      createdAt: new Date().toISOString(),
    });

    return issueId;
  },
});

export const upvote = mutation({
  args: { id: v.id("voterIssues") },
  handler: async (ctx, args) => {
    const issue = await ctx.db.get(args.id);
    if (!issue) throw new Error("Issue not found");
    await ctx.db.patch(args.id, { upvotes: issue.upvotes + 1 });
  },
});
