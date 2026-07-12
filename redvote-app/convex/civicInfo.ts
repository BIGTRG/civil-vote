import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByState = query({
  args: { state: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.type) {
      const all = await ctx.db.query("civicInfo").withIndex("by_state", q => q.eq("state", args.state)).collect();
      return all.filter(c => c.type === args.type);
    }
    return await ctx.db.query("civicInfo").withIndex("by_state", q => q.eq("state", args.state)).collect();
  },
});

export const getAll = query({
  args: { type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.type) {
      return await ctx.db.query("civicInfo").withIndex("by_type", q => q.eq("type", args.type as any)).collect();
    }
    return await ctx.db.query("civicInfo").collect();
  },
});

export const bulkAddCivicInfo = mutation({
  args: {
    items: v.array(v.object({
      state: v.string(),
      type: v.union(v.literal("polling_location"), v.literal("early_voting"), v.literal("election_official"), v.literal("ballot_measure")),
      name: v.string(),
      address: v.optional(v.string()),
      hours: v.optional(v.string()),
      notes: v.optional(v.string()),
      url: v.optional(v.string()),
      startDate: v.optional(v.string()),
      endDate: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const item of args.items) {
      await ctx.db.insert("civicInfo", { ...item, lastUpdated: new Date().toISOString() });
      count++;
    }
    return { inserted: count };
  },
});
