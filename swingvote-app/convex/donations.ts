import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("donations").withIndex("by_created").order("desc").collect();
    return all.slice(0, args.limit || 100);
  },
});

export const getByCandidate = query({
  args: { candidateId: v.id("candidates") },
  handler: async (ctx, args) => {
    return await ctx.db.query("donations").withIndex("by_candidate", q => q.eq("candidateId", args.candidateId)).collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("donations").collect();
    const completed = all.filter(d => d.status === "completed");
    const totalAmount = completed.reduce((s, d) => s + d.amount, 0);
    const avgDonation = completed.length > 0 ? totalAmount / completed.length : 0;
    const recurring = completed.filter(d => d.recurring).length;
    return { totalDonations: completed.length, totalAmount, avgDonation: Math.round(avgDonation * 100) / 100, recurringDonors: recurring };
  },
});

export const createDonation = mutation({
  args: {
    email: v.optional(v.string()),
    candidateId: v.optional(v.id("candidates")),
    raceId: v.optional(v.id("races")),
    amount: v.number(),
    platform: v.union(v.literal("stripe"), v.literal("actblue"), v.literal("winred"), v.literal("manual")),
    donorName: v.optional(v.string()),
    recurring: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("donations", {
      ...args,
      userId: undefined,
      status: "pending",
      transactionId: undefined,
      createdAt: new Date().toISOString(),
    });
  },
});
