import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllBadges = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("badges").collect();
  },
});

export const getBadgesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("badges")
      .withIndex("by_category", (q) => q.eq("category", args.category as any))
      .collect();
  },
});

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userGameProfile")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const getUserBadges = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const userBadges = await ctx.db
      .query("userBadges")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    // Enrich with badge details
    const enriched = await Promise.all(
      userBadges.map(async (ub) => {
        const badge = await ctx.db.get(ub.badgeId);
        return { ...ub, badge };
      })
    );
    return enriched;
  },
});

export const getLeaderboard = query({
  args: {
    period: v.union(v.literal("weekly"), v.literal("monthly"), v.literal("allTime")),
    category: v.union(v.literal("overall"), v.literal("fundraising"), v.literal("volunteer"), v.literal("events"), v.literal("recruiting")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leaderboard")
      .withIndex("by_period_category", (q) =>
        q.eq("period", args.period).eq("category", args.category)
      )
      .take(args.limit ?? 25);
  },
});

export const getTopLeaders = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leaderboard")
      .withIndex("by_period_category", (q) =>
        q.eq("period", "allTime").eq("category", "overall")
      )
      .take(args.limit ?? 10);
  },
});

export const getGameStats = query({
  args: {},
  handler: async (ctx) => {
    const badges = await ctx.db.query("badges").collect();
    const profiles = await ctx.db.query("userGameProfile").collect();
    const totalPoints = profiles.reduce((sum, p) => sum + p.totalPoints, 0);
    const totalVolunteerHours = profiles.reduce((sum, p) => sum + p.volunteerHours, 0);
    const totalBadgesEarned = profiles.reduce((sum, p) => sum + p.badgeCount, 0);

    return {
      totalBadgeTypes: badges.length,
      totalPlayers: profiles.length,
      totalPoints,
      totalVolunteerHours,
      totalBadgesEarned,
      avgPointsPerUser: profiles.length > 0 ? Math.round(totalPoints / profiles.length) : 0,
    };
  },
});
