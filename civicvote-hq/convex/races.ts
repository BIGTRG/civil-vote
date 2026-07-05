import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("completed"),
        v.literal("upcoming"),
      ),
    ),
    state: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;
    if (args.status) {
      q = ctx.db.query("races").withIndex("by_status", (q) =>
        q.eq("status", args.status!),
      );
    } else if (args.state) {
      q = ctx.db.query("races").withIndex("by_state", (q) =>
        q.eq("state", args.state!),
      );
    } else {
      q = ctx.db.query("races");
    }
    return await q.order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    office: v.string(),
    level: v.union(
      v.literal("federal"),
      v.literal("state"),
      v.literal("county"),
      v.literal("municipal"),
      v.literal("school_board"),
    ),
    state: v.string(),
    district: v.optional(v.string()),
    electionDate: v.string(),
    isExclusive: v.boolean(),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("upcoming"),
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("races", args);
    await ctx.db.insert("activityFeed", {
      type: "race_added",
      description: `New race added: ${args.title}`,
      state: args.state,
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("races"),
    title: v.optional(v.string()),
    office: v.optional(v.string()),
    level: v.optional(
      v.union(
        v.literal("federal"),
        v.literal("state"),
        v.literal("county"),
        v.literal("municipal"),
        v.literal("school_board"),
      ),
    ),
    state: v.optional(v.string()),
    district: v.optional(v.string()),
    electionDate: v.optional(v.string()),
    isExclusive: v.optional(v.boolean()),
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("completed"),
        v.literal("upcoming"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Race not found");
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    const race = await ctx.db.get(args.id);
    if (!race) throw new Error("Race not found");
    // Remove associated candidates and pledges
    const candidates = await ctx.db
      .query("candidates")
      .withIndex("by_race", (q) => q.eq("raceId", args.id))
      .collect();
    for (const c of candidates) {
      const pledges = await ctx.db
        .query("pledges")
        .withIndex("by_candidate", (q) => q.eq("candidateId", c._id))
        .collect();
      for (const p of pledges) {
        await ctx.db.delete(p._id);
      }
      await ctx.db.delete(c._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const getWithCandidates = query({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    const race = await ctx.db.get(args.id);
    if (!race) return null;
    const candidates = await ctx.db
      .query("candidates")
      .withIndex("by_race", (q) => q.eq("raceId", args.id))
      .collect();
    return { ...race, candidates };
  },
});
