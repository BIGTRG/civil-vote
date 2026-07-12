
import { query, mutation } from "./_generated/server";
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

// Add a race rating
export const addRaceRating = mutation({
  args: {
    raceTitle: v.string(),
    state: v.string(),
    office: v.string(),
    rating: v.string(),
    source: v.string(),
    previousRating: v.optional(v.string()),
    lastUpdated: v.string(),
  },
  handler: async (ctx, args) => {
    // Upsert: check if rating already exists for this race+source
    const existing = await ctx.db.query("raceRatings").collect();
    const match = existing.find(r => r.raceTitle === args.raceTitle && r.source === args.source);
    if (match) {
      await ctx.db.patch(match._id, {
        rating: args.rating,
        previousRating: match.rating,
        lastUpdated: args.lastUpdated,
      });
      return match._id;
    }
    return await ctx.db.insert("raceRatings", args);
  },
});

// Add polling data
export const addPollingData = mutation({
  args: {
    raceName: v.string(),
    state: v.string(),
    pollster: v.string(),
    date: v.string(),
    candidate1: v.string(),
    candidate1Pct: v.number(),
    candidate2: v.string(),
    candidate2Pct: v.number(),
    margin: v.string(),
    sampleSize: v.number(),
    marginOfError: v.number(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the race by name
    const races = await ctx.db.query("races").collect();
    const race = races.find(r => {
      const rTitle = (r.title || "").toLowerCase();
      const searchName = args.raceName.toLowerCase();
      return rTitle.includes(searchName) || searchName.includes(r.state.toLowerCase());
    });

    return await ctx.db.insert("pollingData", {
      raceId: race ? race._id : races[0]._id,
      pollster: args.pollster,
      date: args.date,
      sampleSize: args.sampleSize,
      margin: args.margin,
      results: [
        { candidateName: args.candidate1, party: args.candidate1.includes("(D)") ? "Democrat" : "Republican", percentage: args.candidate1Pct },
        { candidateName: args.candidate2, party: args.candidate2.includes("(R)") ? "Republican" : "Democrat", percentage: args.candidate2Pct },
      ],
      source: args.source,
    });
  },
});

export const getRatings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("raceRatings").collect();
  },
});

export const getLatestPolls = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pollingData").order("desc").take(50);
  },
});
