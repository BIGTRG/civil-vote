import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("countyTargets").collect();
  },
});

export const getByPriority = query({
  args: { priority: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("countyTargets")
      .withIndex("by_priority", (q) => q.eq("priority", args.priority as any))
      .collect();
  },
});

export const getByRegion = query({
  args: { region: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("countyTargets")
      .withIndex("by_region", (q) => q.eq("region", args.region))
      .collect();
  },
});

export const getStrategyOverview = query({
  args: {},
  handler: async (ctx) => {
    const counties = await ctx.db.query("countyTargets").collect();
    const totalTarget = counties.reduce((sum, c) => sum + c.targetVoters, 0);
    const totalPledges = counties.reduce((sum, c) => sum + c.currentPledges, 0);
    const criticalCounties = counties.filter((c) => c.priority === "critical");
    const highCounties = counties.filter((c) => c.priority === "high");

    const byRegion: Record<string, { counties: number; target: number; pledges: number }> = {};
    for (const c of counties) {
      if (!byRegion[c.region]) {
        byRegion[c.region] = { counties: 0, target: 0, pledges: 0 };
      }
      byRegion[c.region].counties++;
      byRegion[c.region].target += c.targetVoters;
      byRegion[c.region].pledges += c.currentPledges;
    }

    return {
      totalCounties: counties.length,
      totalTarget,
      totalPledges,
      overallProgress: totalTarget > 0 ? (totalPledges / totalTarget) * 100 : 0,
      criticalCount: criticalCounties.length,
      highCount: highCounties.length,
      byRegion,
    };
  },
});
