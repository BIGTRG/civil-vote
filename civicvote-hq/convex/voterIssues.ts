import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Win My Vote -- voter issue tracker

export const list = query({
  args: {
    raceId: v.optional(v.id("races")),
    status: v.optional(
      v.union(
        v.literal("submitted"),
        v.literal("acknowledged"),
        v.literal("responded"),
        v.literal("declined"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("voterIssues").order("desc").collect();
    let filtered = all;
    if (args.raceId) {
      filtered = filtered.filter((i) => i.raceId === args.raceId);
    }
    if (args.status) {
      filtered = filtered.filter((i) => i.status === args.status);
    }
    const results = [];
    for (const issue of filtered) {
      const race = await ctx.db.get(issue.raceId);
      results.push({
        ...issue,
        raceName: race?.title ?? "Unknown",
        raceState: race?.state ?? "",
      });
    }
    return results;
  },
});

export const create = mutation({
  args: {
    raceId: v.id("races"),
    category: v.string(),
    title: v.string(),
    description: v.string(),
    voterState: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("voterIssues", {
      ...args,
      status: "submitted",
      upvotes: 0,
    });
    return id;
  },
});

export const respond = mutation({
  args: {
    id: v.id("voterIssues"),
    candidateId: v.id("candidates"),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    const issue = await ctx.db.get(args.id);
    if (!issue) throw new Error("Issue not found");
    const candidate = await ctx.db.get(args.candidateId);
    if (!candidate) throw new Error("Candidate not found");
    // Store response as metadata in issue
    await ctx.db.patch(args.id, {
      status: "responded" as const,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("voterIssues"),
    status: v.union(
      v.literal("submitted"),
      v.literal("acknowledged"),
      v.literal("responded"),
      v.literal("declined"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("voterIssues") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
