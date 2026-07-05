import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { state: v.optional(v.string()), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let races;
    if (args.state) {
      races = await ctx.db.query("races").withIndex("by_state", (qi) => qi.eq("state", args.state!)).collect();
    } else {
      races = await ctx.db.query("races").collect();
    }
    if (args.type) return races.filter((r) => r.type === args.type);
    return races;
  },
});

export const getWithCandidates = query({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    const race = await ctx.db.get(args.id);
    if (!race) return null;
    const candidates = await ctx.db.query("candidates").withIndex("by_race", (q) => q.eq("raceId", args.id)).collect();
    const pulse = await ctx.db.query("publicPulse").withIndex("by_race", (q) => q.eq("raceId", args.id)).collect();
    return { ...race, candidates, pulse };
  },
});
