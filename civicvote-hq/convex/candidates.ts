import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    raceId: v.optional(v.id("races")),
    party: v.optional(
      v.union(
        v.literal("democrat"),
        v.literal("republican"),
        v.literal("independent"),
        v.literal("other"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    let q;
    if (args.raceId) {
      q = ctx.db
        .query("candidates")
        .withIndex("by_race", (q) => q.eq("raceId", args.raceId!));
    } else if (args.party) {
      q = ctx.db
        .query("candidates")
        .withIndex("by_party", (q) => q.eq("party", args.party!));
    } else {
      q = ctx.db.query("candidates");
    }
    const candidates = await q.order("desc").collect();
    // Attach race info
    const results = [];
    for (const c of candidates) {
      const race = await ctx.db.get(c.raceId);
      results.push({ ...c, raceName: race?.title ?? "Unknown", raceState: race?.state ?? "" });
    }
    return results;
  },
});

export const get = query({
  args: { id: v.id("candidates") },
  handler: async (ctx, args) => {
    const candidate = await ctx.db.get(args.id);
    if (!candidate) return null;
    const race = await ctx.db.get(candidate.raceId);
    return { ...candidate, raceName: race?.title ?? "Unknown", raceState: race?.state ?? "" };
  },
});

export const create = mutation({
  args: {
    raceId: v.id("races"),
    firstName: v.string(),
    lastName: v.string(),
    party: v.union(
      v.literal("democrat"),
      v.literal("republican"),
      v.literal("independent"),
      v.literal("other"),
    ),
    bio: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    saasTier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const race = await ctx.db.get(args.raceId);
    if (!race) throw new Error("Race not found");
    const id = await ctx.db.insert("candidates", {
      ...args,
      status: "active",
      isOnboarded: false,
      pledgeCount: 0,
      donationTotal: 0,
    });
    await ctx.db.insert("activityFeed", {
      type: "candidate_onboard",
      description: `${args.firstName} ${args.lastName} added to ${race.title}`,
      state: race.state,
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("candidates"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    party: v.optional(
      v.union(
        v.literal("democrat"),
        v.literal("republican"),
        v.literal("independent"),
        v.literal("other"),
      ),
    ),
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("withdrawn"),
        v.literal("won"),
        v.literal("lost"),
      ),
    ),
    bio: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    isOnboarded: v.optional(v.boolean()),
    saasTier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Candidate not found");
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("candidates") },
  handler: async (ctx, args) => {
    const candidate = await ctx.db.get(args.id);
    if (!candidate) throw new Error("Candidate not found");
    // Remove pledges
    const pledges = await ctx.db
      .query("pledges")
      .withIndex("by_candidate", (q) => q.eq("candidateId", args.id))
      .collect();
    for (const p of pledges) {
      await ctx.db.delete(p._id);
    }
    await ctx.db.delete(args.id);
  },
});
