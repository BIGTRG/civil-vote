import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("supporters").order("desc").collect();
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const supporters = await ctx.db.query("supporters").collect();
    const volunteers = supporters.filter((s) => s.volunteerWilling).length;
    const donors = supporters.filter((s) => s.donorStatus).length;
    const totalContributed = supporters.reduce((s, sup) => s + sup.totalContributed, 0);
    const bySrc: Record<string, number> = {};
    for (const s of supporters) bySrc[s.source] = (bySrc[s.source] || 0) + 1;
    const byCounty: Record<string, number> = {};
    for (const s of supporters) if (s.county) byCounty[s.county] = (byCounty[s.county] || 0) + 1;
    return { total: supporters.length, volunteers, donors, totalContributed, bySource: bySrc, byCounty };
  },
});

export const create = mutation({
  args: {
    firstName: v.string(), lastName: v.string(), email: v.optional(v.string()), phone: v.optional(v.string()),
    city: v.optional(v.string()), county: v.optional(v.string()), zipCode: v.optional(v.string()),
    source: v.union(v.literal("website"), v.literal("event"), v.literal("church"), v.literal("referral"), v.literal("social"), v.literal("volunteer"), v.literal("donor"), v.literal("other")),
    interests: v.array(v.string()), volunteerWilling: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("supporters", { ...args, donorStatus: false, totalContributed: 0, createdAt: new Date().toISOString(), tags: [] });
  },
});
