import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get or create a referral code for a user
export const getMyReferral = query({
  args: { userName: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("referrals")
      .filter((q) => q.eq(q.field("referrerName"), args.userName))
      .first();
    return existing;
  },
});

// Create a referral code
export const createReferralCode = mutation({
  args: {
    referrerName: v.string(),
    referralCode: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if code already exists
    const existing = await ctx.db
      .query("referrals")
      .withIndex("by_referralCode", (q) => q.eq("referralCode", args.referralCode))
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("referrals", {
      referrerName: args.referrerName,
      referralCode: args.referralCode,
      totalSignups: 0,
      totalShares: 0,
      createdAt: new Date().toISOString(),
    });
  },
});

// Record a share event
export const recordShare = mutation({
  args: {
    postId: v.id("runnerPosts"),
    platform: v.union(v.literal("facebook"), v.literal("twitter"), v.literal("instagram"), v.literal("tiktok"), v.literal("whatsapp"), v.literal("sms"), v.literal("native"), v.literal("copy"), v.literal("other")),
    referralCode: v.optional(v.string()),
    sharedBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Record the share event
    await ctx.db.insert("shareEvents", {
      postId: args.postId,
      platform: args.platform,
      referralCode: args.referralCode,
      sharedBy: args.sharedBy,
      createdAt: new Date().toISOString(),
    });

    // Increment share count on post
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { shares: post.shares + 1 });
    }

    // Increment share count on referral
    if (args.referralCode) {
      const referral = await ctx.db
        .query("referrals")
        .withIndex("by_referralCode", (q) => q.eq("referralCode", args.referralCode!))
        .first();
      if (referral) {
        await ctx.db.patch(referral._id, {
          totalShares: referral.totalShares + 1,
          lastShareAt: new Date().toISOString(),
        });
      }
    }
  },
});

// Record a signup from a referral link
export const recordReferralSignup = mutation({
  args: {
    referralCode: v.string(),
    signupName: v.optional(v.string()),
    signupEmail: v.optional(v.string()),
    source: v.union(v.literal("facebook"), v.literal("twitter"), v.literal("instagram"), v.literal("tiktok"), v.literal("whatsapp"), v.literal("sms"), v.literal("link"), v.literal("other")),
    postId: v.optional(v.id("runnerPosts")),
  },
  handler: async (ctx, args) => {
    const referral = await ctx.db
      .query("referrals")
      .withIndex("by_referralCode", (q) => q.eq("referralCode", args.referralCode))
      .first();

    if (!referral) return null;

    await ctx.db.insert("referralSignups", {
      referralCode: args.referralCode,
      referrerName: referral.referrerName,
      signupName: args.signupName,
      signupEmail: args.signupEmail,
      source: args.source,
      postId: args.postId,
      createdAt: new Date().toISOString(),
    });

    await ctx.db.patch(referral._id, {
      totalSignups: referral.totalSignups + 1,
    });

    return referral.referrerName;
  },
});

// Referral leaderboard
export const getReferralLeaderboard = query({
  handler: async (ctx) => {
    const referrals = await ctx.db
      .query("referrals")
      .collect();
    return referrals
      .sort((a, b) => b.totalSignups - a.totalSignups)
      .slice(0, 25);
  },
});

// Get share analytics
export const getShareAnalytics = query({
  handler: async (ctx) => {
    const events = await ctx.db.query("shareEvents").collect();
    const byPlatform: Record<string, number> = {};
    for (const e of events) {
      byPlatform[e.platform] = (byPlatform[e.platform] || 0) + 1;
    }
    const totalSignups = await ctx.db.query("referralSignups").collect();
    return {
      totalShares: events.length,
      byPlatform,
      totalReferralSignups: totalSignups.length,
    };
  },
});

// Lookup referral by code (for landing page when someone clicks a shared link)
export const lookupReferral = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const referral = await ctx.db
      .query("referrals")
      .withIndex("by_referralCode", (q) => q.eq("referralCode", args.code))
      .first();
    if (!referral) return null;
    return {
      referrerName: referral.referrerName,
      totalSignups: referral.totalSignups,
    };
  },
});
