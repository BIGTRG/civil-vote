import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const issues = await ctx.db.query("voterIssues").collect();
    if (args.category) return issues.filter((i) => i.category === args.category);
    return issues.sort((a, b) => b.upvotes - a.upvotes);
  },
});

export const create = mutation({
  args: { title: v.string(), description: v.string(), category: v.string(), state: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("voterIssues", { ...args, upvotes: 0, status: "open", createdAt: new Date().toISOString(), responses: [] });
  },
});

export const upvote = mutation({
  args: { id: v.id("voterIssues") },
  handler: async (ctx, args) => {
    const issue = await ctx.db.get(args.id);
    if (issue) await ctx.db.patch(args.id, { upvotes: issue.upvotes + 1 });
  },
});
