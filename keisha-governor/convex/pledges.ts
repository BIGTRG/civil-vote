import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: { candidateId: v.id("candidates"), raceId: v.id("races"), amount: v.number() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in");
    const existing = await ctx.db.query("pledges").withIndex("by_voter_race", (q) => q.eq("oderId", userId).eq("raceId", args.raceId)).first();
    if (existing) throw new Error("Already pledged in this race");
    await ctx.db.insert("pledges", { oderId: userId, candidateId: args.candidateId, raceId: args.raceId, amount: args.amount, status: "active", createdAt: new Date().toISOString() });
    const candidate = await ctx.db.get(args.candidateId);
    if (candidate) await ctx.db.patch(args.candidateId, { pledgeCount: candidate.pledgeCount + 1, totalRaised: candidate.totalRaised + args.amount });
    const race = await ctx.db.get(args.raceId);
    if (race) await ctx.db.patch(args.raceId, { totalPledges: race.totalPledges + 1, totalRaised: race.totalRaised + args.amount });
  },
});

export const myPledges = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const pledges = await ctx.db.query("pledges").withIndex("by_voter", (q) => q.eq("oderId", userId)).collect();
    const results = [];
    for (const p of pledges) {
      const candidate = await ctx.db.get(p.candidateId);
      const race = await ctx.db.get(p.raceId);
      results.push({ ...p, candidateName: candidate?.name ?? "Unknown", raceName: race?.title ?? "Unknown", raceState: race?.state ?? "" });
    }
    return results;
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const pledges = await ctx.db.query("pledges").collect();
    return { total: pledges.length, totalAmount: pledges.reduce((s, p) => s + p.amount, 0) };
  },
});
