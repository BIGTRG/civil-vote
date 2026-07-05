import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// GA Governor contribution limit per election cycle
const GA_GOVERNOR_LIMIT = 7600;

export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_timestamp")
      .order("desc")
      .take(args.limit ?? 50);
  },
});

export const getByDonor = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_donorEmail", (q) => q.eq("donorEmail", args.email))
      .collect();
  },
});

export const getDonorLimit = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donorLimits")
      .withIndex("by_donorEmail", (q) => q.eq("donorEmail", args.email))
      .first();
  },
});

export const getAllDonorLimits = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("donorLimits").collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const allDonations = await ctx.db.query("donations").withIndex("by_status").collect();
    const completed = allDonations.filter((d) => d.status === "completed");
    const totalRaised = completed.reduce((sum, d) => sum + d.amount, 0);
    const uniqueDonors = new Set(completed.map((d) => d.donorEmail)).size;
    const voteCount = completed.filter((d) => d.isFirstDonation).length;
    const avgDonation = completed.length > 0 ? totalRaised / completed.length : 0;

    return {
      totalRaised,
      donationCount: completed.length,
      uniqueDonors,
      voteCount,
      avgDonation,
      goalProgress: (voteCount / 2200000) * 100, // 2.2M goal
    };
  },
});

export const recordDonation = mutation({
  args: {
    donorName: v.string(),
    donorEmail: v.string(),
    amount: v.number(),
    directedCategory: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check existing donor limit record
    const existingLimit = await ctx.db
      .query("donorLimits")
      .withIndex("by_donorEmail", (q) => q.eq("donorEmail", args.donorEmail))
      .first();

    const isFirstDonation = !existingLimit;
    const currentTotal = existingLimit?.totalContributed ?? 0;
    const newTotal = currentTotal + args.amount;

    // Enforce GA contribution limit
    if (newTotal > GA_GOVERNOR_LIMIT) {
      throw new Error(
        `This donation would exceed the Georgia governor contribution limit of $${GA_GOVERNOR_LIMIT.toLocaleString()}. Current total: $${currentTotal.toLocaleString()}. Maximum additional: $${(GA_GOVERNOR_LIMIT - currentTotal).toLocaleString()}.`
      );
    }

    const now = new Date().toISOString();

    // Record the donation
    await ctx.db.insert("donations", {
      donorName: args.donorName,
      donorEmail: args.donorEmail,
      amount: args.amount,
      isFirstDonation,
      cumulative: newTotal,
      limitRemaining: GA_GOVERNOR_LIMIT - newTotal,
      directedCategory: args.directedCategory,
      paymentMethod: args.paymentMethod,
      timestamp: now,
      status: "completed",
    });

    // Update or create donor limit record
    if (existingLimit) {
      await ctx.db.patch(existingLimit._id, {
        totalContributed: newTotal,
        limitRemaining: GA_GOVERNOR_LIMIT - newTotal,
        donationCount: existingLimit.donationCount + 1,
        lastDonationDate: now,
      });
    } else {
      await ctx.db.insert("donorLimits", {
        donorEmail: args.donorEmail,
        donorName: args.donorName,
        totalContributed: newTotal,
        gaLimit: GA_GOVERNOR_LIMIT,
        limitRemaining: GA_GOVERNOR_LIMIT - newTotal,
        donationCount: 1,
        firstDonationDate: now,
        lastDonationDate: now,
        countsAsVote: true, // First donation = vote
      });
    }

    // Add to activity feed
    await ctx.db.insert("activityFeed", {
      type: isFirstDonation ? "pledge" : "fundraising",
      message: isFirstDonation
        ? `${args.donorName} pledged support and donated $${args.amount}`
        : `${args.donorName} donated $${args.amount}`,
      createdAt: now,
    });

    return { isFirstDonation, newTotal, limitRemaining: GA_GOVERNOR_LIMIT - newTotal };
  },
});

export const getRecentDonations = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_timestamp")
      .order("desc")
      .take(args.limit ?? 10);
  },
});
