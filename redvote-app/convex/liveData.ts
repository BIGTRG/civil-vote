
import { query } from "./_generated/server";
import { v } from "convex/values";

// Get polling data for a race
export const getPollingByRace = query({
  args: { raceId: v.id("races") },
  handler: async (ctx, args) => {
    return await ctx.db.query("pollingData")
      .withIndex("by_race", q => q.eq("raceId", args.raceId))
      .collect();
  },
});

// Get all race ratings
export const getAllRaceRatings = query({
  handler: async (ctx) => {
    return await ctx.db.query("raceRatings").collect();
  },
});

// Get race rating by title
export const getRaceRating = query({
  args: { raceTitle: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("raceRatings").collect();
    return all.filter(r => r.raceTitle === args.raceTitle);
  },
});

// Get candidate finance details
export const getCandidateFinance = query({
  args: { candidateId: v.id("candidates") },
  handler: async (ctx, args) => {
    const cand = await ctx.db.get(args.candidateId);
    if (!cand) return null;
    return {
      name: cand.name,
      totalRaised: cand.totalRaised,
      totalSpent: (cand as any).totalSpent ?? null,
      cashOnHand: (cand as any).cashOnHand ?? null,
      fecCandidateId: (cand as any).fecCandidateId ?? null,
    };
  },
});


// Get top fundraisers across all races
export const getTopFundraisers = query({
  handler: async (ctx) => {
    const candidates = await ctx.db.query("candidates").collect();
    return candidates
      .filter(c => c.totalRaised > 0)
      .sort((a, b) => b.totalRaised - a.totalRaised)
      .slice(0, 20)
      .map(c => ({
        _id: c._id,
        name: c.name,
        party: c.party,
        totalRaised: c.totalRaised,
        totalSpent: (c as any).totalSpent ?? null,
        cashOnHand: (c as any).cashOnHand ?? null,
      }));
  },
});
