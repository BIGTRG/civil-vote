import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("candidates").collect();
  },
});

export const getByRace = query({
  args: { raceId: v.id("races") },
  handler: async (ctx, args) => {
    return await ctx.db.query("candidates").withIndex("by_race", (q) => q.eq("raceId", args.raceId)).collect();
  },
});
