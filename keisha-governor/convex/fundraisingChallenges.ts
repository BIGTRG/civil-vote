import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("fundraisingChallenges").order("desc").collect();
  },
});

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("fundraisingChallenges").withIndex("by_status", (q) => q.eq("status", "active")).collect();
  },
});

export const get = query({
  args: { id: v.id("fundraisingChallenges") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getParticipants = query({
  args: { challengeId: v.id("fundraisingChallenges") },
  handler: async (ctx, args) => {
    return await ctx.db.query("challengeParticipants").withIndex("by_challenge", (q) => q.eq("challengeId", args.challengeId)).collect();
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const participants = await ctx.db.query("challengeParticipants").order("desc").collect();
    return participants.sort((a, b) => b.raisedAmount - a.raisedAmount).slice(0, 20);
  },
});

export const joinChallenge = mutation({
  args: { challengeId: v.id("fundraisingChallenges"), name: v.string(), pledgedAmount: v.number() },
  handler: async (ctx, args) => {
    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge) throw new Error("Challenge not found");
    await ctx.db.insert("challengeParticipants", { challengeId: args.challengeId, name: args.name, pledgedAmount: args.pledgedAmount, raisedAmount: 0, joinedDate: new Date().toISOString() });
    await ctx.db.patch(args.challengeId, { participantCount: challenge.participantCount + 1 });
  },
});
