import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    raceId: v.optional(v.id("races")),
    party: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let candidates;
    if (args.raceId) {
      candidates = await ctx.db
        .query("candidates")
        .withIndex("by_race", q => q.eq("raceId", args.raceId!))
        .collect();
    } else if (args.party) {
      candidates = await ctx.db
        .query("candidates")
        .withIndex("by_party", q => q.eq("party", args.party as any))
        .collect();
    } else {
      candidates = await ctx.db.query("candidates").collect();
    }

    // Attach race info
    const enriched = await Promise.all(
      candidates.map(async (c) => {
        const race = await ctx.db.get(c.raceId);
        return { ...c, raceName: race?.title ?? "Unknown", raceState: race?.state ?? "" };
      })
    );
    return enriched;
  },
});

export const get = query({
  args: { id: v.id("candidates") },
  handler: async (ctx, args) => {
    const candidate = await ctx.db.get(args.id);
    if (!candidate) return null;
    const race = await ctx.db.get(candidate.raceId);
    const promises = await ctx.db
      .query("promises")
      .withIndex("by_candidate", q => q.eq("candidateId", args.id))
      .collect();
    return { ...candidate, race, promises };
  },
});
