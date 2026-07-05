import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    state: v.optional(v.string()),
    status: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let races;
    if (args.state) {
      races = await ctx.db.query("races").withIndex("by_state", q => q.eq("state", args.state!)).collect();
    } else if (args.status) {
      races = await ctx.db.query("races").withIndex("by_status", q => q.eq("status", args.status as any)).collect();
    } else if (args.type) {
      races = await ctx.db.query("races").withIndex("by_type", q => q.eq("type", args.type as any)).collect();
    } else {
      races = await ctx.db.query("races").collect();
    }
    return races;
  },
});

export const get = query({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getWithCandidates = query({
  args: { id: v.id("races") },
  handler: async (ctx, args) => {
    const race = await ctx.db.get(args.id);
    if (!race) return null;
    const candidates = await ctx.db
      .query("candidates")
      .withIndex("by_race", q => q.eq("raceId", args.id))
      .collect();
    const pulse = await ctx.db
      .query("publicPulse")
      .withIndex("by_race", q => q.eq("raceId", args.id))
      .collect();
    return { ...race, candidates, pulse };
  },
});

export const listStates = query({
  handler: async (ctx) => {
    const races = await ctx.db.query("races").collect();
    const states = [...new Set(races.map(r => r.state))].sort();
    return states;
  },
});
