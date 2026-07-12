import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Upsert a race by title -- update if exists, insert if not
export const upsertRace = mutation({
  args: {
    title: v.string(),
    state: v.string(),
    type: v.union(v.literal("federal"), v.literal("state"), v.literal("local")),
    electionDate: v.string(),
    status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")),
    description: v.optional(v.string()),
    totalPledges: v.number(),
    totalRaised: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("races").collect();
    const match = existing.find(r => r.title === args.title);
    if (match) {
      await ctx.db.patch(match._id, {
        state: args.state,
        type: args.type,
        electionDate: args.electionDate,
        status: args.status,
        description: args.description,
        totalPledges: args.totalPledges,
        totalRaised: args.totalRaised,
      });
      return { action: "updated", id: match._id };
    } else {
      const id = await ctx.db.insert("races", args);
      return { action: "inserted", id };
    }
  },
});

// Upsert a candidate by name + race title
export const upsertCandidate = mutation({
  args: {
    name: v.string(),
    raceTitle: v.string(),
    party: v.union(v.literal("democrat"), v.literal("republican"), v.literal("independent"), v.literal("other")),
    bio: v.string(),
    positions: v.array(v.object({ issue: v.string(), stance: v.string() })),
    endorsements: v.array(v.string()),
    website: v.optional(v.string()),
    pledgeCount: v.number(),
    totalRaised: v.number(),
  },
  handler: async (ctx, args) => {
    // Find the race
    const races = await ctx.db.query("races").collect();
    const race = races.find(r => r.title === args.raceTitle);
    if (!race) return { action: "error", message: `Race not found: ${args.raceTitle}` };

    // Find existing candidate
    const candidates = await ctx.db.query("candidates")
      .withIndex("by_race", q => q.eq("raceId", race._id))
      .collect();
    const match = candidates.find(c => c.name === args.name);

    if (match) {
      await ctx.db.patch(match._id, {
        party: args.party,
        bio: args.bio,
        positions: args.positions,
        endorsements: args.endorsements,
        website: args.website,
        pledgeCount: args.pledgeCount,
        totalRaised: args.totalRaised,
      });
      return { action: "updated", id: match._id };
    } else {
      const id = await ctx.db.insert("candidates", {
        name: args.name,
        raceId: race._id,
        party: args.party,
        bio: args.bio,
        positions: args.positions,
        endorsements: args.endorsements,
        website: args.website,
        pledgeCount: args.pledgeCount,
        totalRaised: args.totalRaised,
      });
      return { action: "inserted", id };
    }
  },
});

// Remove candidates who dropped out / lost primaries
export const removeCandidate = mutation({
  args: {
    name: v.string(),
    raceTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const races = await ctx.db.query("races").collect();
    const race = races.find(r => r.title === args.raceTitle);
    if (!race) return { action: "error", message: `Race not found: ${args.raceTitle}` };

    const candidates = await ctx.db.query("candidates")
      .withIndex("by_race", q => q.eq("raceId", race._id))
      .collect();
    const match = candidates.find(c => c.name === args.name);
    if (match) {
      // Also remove public pulse entries
      const pulses = await ctx.db.query("publicPulse")
        .withIndex("by_race", q => q.eq("raceId", race._id))
        .collect();
      for (const p of pulses) {
        if (p.candidateId === match._id) {
          await ctx.db.delete(p._id);
        }
      }
      await ctx.db.delete(match._id);
      return { action: "removed", name: args.name };
    }
    return { action: "not_found", name: args.name };
  },
});

// Update public pulse for a candidate
export const upsertPulse = mutation({
  args: {
    raceTitle: v.string(),
    candidateName: v.string(),
    party: v.union(v.literal("democrat"), v.literal("republican"), v.literal("independent"), v.literal("other")),
    pledgeCount: v.number(),
    totalRaised: v.number(),
    percentageOfVotes: v.number(),
  },
  handler: async (ctx, args) => {
    const races = await ctx.db.query("races").collect();
    const race = races.find(r => r.title === args.raceTitle);
    if (!race) return { action: "error", message: `Race not found: ${args.raceTitle}` };

    const candidates = await ctx.db.query("candidates")
      .withIndex("by_race", q => q.eq("raceId", race._id))
      .collect();
    const candidate = candidates.find(c => c.name === args.candidateName);
    if (!candidate) return { action: "error", message: `Candidate not found: ${args.candidateName}` };

    const pulses = await ctx.db.query("publicPulse")
      .withIndex("by_race", q => q.eq("raceId", race._id))
      .collect();
    const match = pulses.find(p => p.candidateId === candidate._id);

    const data = {
      raceId: race._id,
      candidateId: candidate._id,
      candidateName: args.candidateName,
      party: args.party,
      pledgeCount: args.pledgeCount,
      totalRaised: args.totalRaised,
      percentageOfVotes: args.percentageOfVotes,
      lastUpdated: new Date().toISOString(),
    };

    if (match) {
      await ctx.db.patch(match._id, data);
      return { action: "updated" };
    } else {
      await ctx.db.insert("publicPulse", data);
      return { action: "inserted" };
    }
  },
});

// Bulk refresh -- accepts full data set via HTTP action
export const bulkRefresh = mutation({
  args: {
    races: v.array(v.object({
      title: v.string(),
      state: v.string(),
      type: v.union(v.literal("federal"), v.literal("state"), v.literal("local")),
      electionDate: v.string(),
      status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")),
      description: v.optional(v.string()),
      totalPledges: v.number(),
      totalRaised: v.number(),
      candidates: v.array(v.object({
        name: v.string(),
        party: v.union(v.literal("democrat"), v.literal("republican"), v.literal("independent"), v.literal("other")),
        bio: v.string(),
        positions: v.array(v.object({ issue: v.string(), stance: v.string() })),
        endorsements: v.array(v.string()),
        website: v.optional(v.string()),
        pledgeCount: v.number(),
        totalRaised: v.number(),
        percentageOfVotes: v.optional(v.number()),
      })),
    })),
    lastRefreshed: v.string(),
  },
  handler: async (ctx, args) => {
    let racesUpdated = 0;
    let racesInserted = 0;
    let candidatesUpdated = 0;
    let candidatesInserted = 0;

    for (const raceData of args.races) {
      // Upsert race
      const existingRaces = await ctx.db.query("races").collect();
      const existingRace = existingRaces.find(r => r.title === raceData.title);
      let raceId;

      if (existingRace) {
        await ctx.db.patch(existingRace._id, {
          state: raceData.state,
          type: raceData.type,
          electionDate: raceData.electionDate,
          status: raceData.status,
          description: raceData.description,
          totalPledges: raceData.totalPledges,
          totalRaised: raceData.totalRaised,
        });
        raceId = existingRace._id;
        racesUpdated++;
      } else {
        raceId = await ctx.db.insert("races", {
          title: raceData.title,
          state: raceData.state,
          type: raceData.type,
          electionDate: raceData.electionDate,
          status: raceData.status,
          description: raceData.description,
          totalPledges: raceData.totalPledges,
          totalRaised: raceData.totalRaised,
        });
        racesInserted++;
      }

      // Get existing candidates for this race
      const existingCandidates = await ctx.db.query("candidates")
        .withIndex("by_race", q => q.eq("raceId", raceId))
        .collect();

      // Track which candidates are in the update
      const updatedNames = new Set<string>();

      for (const candData of raceData.candidates) {
        updatedNames.add(candData.name);
        const existingCand = existingCandidates.find(c => c.name === candData.name);

        if (existingCand) {
          await ctx.db.patch(existingCand._id, {
            party: candData.party,
            bio: candData.bio,
            positions: candData.positions,
            endorsements: candData.endorsements,
            website: candData.website,
            pledgeCount: candData.pledgeCount,
            totalRaised: candData.totalRaised,
          });
          candidatesUpdated++;
        } else {
          await ctx.db.insert("candidates", {
            name: candData.name,
            raceId,
            party: candData.party,
            bio: candData.bio,
            positions: candData.positions,
            endorsements: candData.endorsements,
            website: candData.website,
            pledgeCount: candData.pledgeCount,
            totalRaised: candData.totalRaised,
          });
          candidatesInserted++;
        }
      }

      // Remove candidates no longer in the race (lost primary, dropped out)
      for (const existCand of existingCandidates) {
        if (!updatedNames.has(existCand.name)) {
          // Remove pulse entries first
          const pulses = await ctx.db.query("publicPulse")
            .withIndex("by_race", q => q.eq("raceId", raceId))
            .collect();
          for (const p of pulses) {
            if (p.candidateId === existCand._id) {
              await ctx.db.delete(p._id);
            }
          }
          await ctx.db.delete(existCand._id);
        }
      }

      // Update public pulse
      for (const candData of raceData.candidates) {
        if (candData.percentageOfVotes !== undefined) {
          const cands = await ctx.db.query("candidates")
            .withIndex("by_race", q => q.eq("raceId", raceId))
            .collect();
          const cand = cands.find(c => c.name === candData.name);
          if (!cand) continue;

          const pulses = await ctx.db.query("publicPulse")
            .withIndex("by_race", q => q.eq("raceId", raceId))
            .collect();
          const existingPulse = pulses.find(p => p.candidateId === cand._id);

          const pulseData = {
            raceId,
            candidateId: cand._id,
            candidateName: candData.name,
            party: candData.party,
            pledgeCount: candData.pledgeCount,
            totalRaised: candData.totalRaised,
            percentageOfVotes: candData.percentageOfVotes,
            lastUpdated: new Date().toISOString(),
          };

          if (existingPulse) {
            await ctx.db.patch(existingPulse._id, pulseData);
          } else {
            await ctx.db.insert("publicPulse", pulseData);
          }
        }
      }
    }

    return {
      racesUpdated,
      racesInserted,
      candidatesUpdated,
      candidatesInserted,
      lastRefreshed: args.lastRefreshed,
    };
  },
});


// Update candidate finance data from FEC
export const updateFinance = mutation({
  args: {
    updates: v.array(v.object({
      candidateName: v.string(),
      totalRaised: v.number(),
      totalSpent: v.optional(v.number()),
      cashOnHand: v.optional(v.number()),
      fecSource: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    let updated = 0;
    let notFound = 0;
    const missing: string[] = [];

    for (const update of args.updates) {
      const candidates = await ctx.db.query("candidates").collect();
      const match = candidates.find(c => c.name === update.candidateName);
      if (match) {
        await ctx.db.patch(match._id, {
          totalRaised: update.totalRaised,
        });
        updated++;
      } else {
        notFound++;
        missing.push(update.candidateName);
      }
    }

    return { updated, notFound, missing };
  },
});


// Update candidate finance data from FEC -- enhanced with spent/COH
export const updateFinanceV2 = mutation({
  args: {
    updates: v.array(v.object({
      candidateName: v.string(),
      totalRaised: v.number(),
      totalSpent: v.optional(v.number()),
      cashOnHand: v.optional(v.number()),
      fecCandidateId: v.optional(v.string()),
      fecSource: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    let updated = 0;
    let notFound = 0;
    const missing: string[] = [];

    for (const update of args.updates) {
      const candidates = await ctx.db.query("candidates").collect();
      const match = candidates.find(c => c.name === update.candidateName);
      if (match) {
        const patch: Record<string, any> = {
          totalRaised: update.totalRaised,
        };
        if (update.totalSpent !== undefined) patch.totalSpent = update.totalSpent;
        if (update.cashOnHand !== undefined) patch.cashOnHand = update.cashOnHand;
        if (update.fecCandidateId !== undefined) patch.fecCandidateId = update.fecCandidateId;
        await ctx.db.patch(match._id, patch);
        updated++;
      } else {
        notFound++;
        missing.push(update.candidateName);
      }
    }

    return { updated, notFound, missing };
  },
});

// Add polling data for a race
export const addPollingData = mutation({
  args: {
    raceTitle: v.string(),
    pollster: v.string(),
    date: v.string(),
    sampleSize: v.optional(v.number()),
    margin: v.optional(v.string()),
    results: v.array(v.object({
      candidateName: v.string(),
      party: v.string(),
      percentage: v.number(),
    })),
    source: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const races = await ctx.db.query("races").collect();
    const race = races.find(r => r.title === args.raceTitle);
    if (!race) return { action: "error", message: `Race not found: ${args.raceTitle}` };

    // Check for duplicate poll
    const existing = await ctx.db.query("pollingData")
      .withIndex("by_race", q => q.eq("raceId", race._id))
      .collect();
    const dup = existing.find(p => p.pollster === args.pollster && p.date === args.date);
    if (dup) {
      await ctx.db.patch(dup._id, {
        results: args.results,
        sampleSize: args.sampleSize,
        margin: args.margin,
        source: args.source,
        url: args.url,
      });
      return { action: "updated" };
    }

    await ctx.db.insert("pollingData", {
      raceId: race._id,
      pollster: args.pollster,
      date: args.date,
      sampleSize: args.sampleSize,
      margin: args.margin,
      results: args.results,
      source: args.source,
      url: args.url,
    });
    return { action: "inserted" };
  },
});

// Upsert race rating
export const upsertRaceRating = mutation({
  args: {
    raceTitle: v.string(),
    state: v.string(),
    office: v.string(),
    rating: v.string(),
    source: v.string(),
    previousRating: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("raceRatings")
      .withIndex("by_state", q => q.eq("state", args.state))
      .collect();
    const match = existing.find(r => r.raceTitle === args.raceTitle && r.source === args.source);

    const data = {
      raceTitle: args.raceTitle,
      state: args.state,
      office: args.office,
      rating: args.rating,
      source: args.source,
      previousRating: args.previousRating,
      lastUpdated: new Date().toISOString(),
    };

    if (match) {
      await ctx.db.patch(match._id, { ...data, previousRating: match.rating });
      return { action: "updated" };
    }
    await ctx.db.insert("raceRatings", data);
    return { action: "inserted" };
  },
});

