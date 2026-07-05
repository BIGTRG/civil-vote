import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Bulk refresh for CivicVote HQ -- different schema (office, level, firstName/lastName)
export const bulkRefresh = mutation({
  args: {
    races: v.array(v.object({
      title: v.string(),
      office: v.string(),
      level: v.union(v.literal("federal"), v.literal("state"), v.literal("county"), v.literal("municipal"), v.literal("school_board")),
      state: v.string(),
      district: v.optional(v.string()),
      electionDate: v.string(),
      isExclusive: v.boolean(),
      status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")),
      description: v.optional(v.string()),
      incumbentParty: v.optional(v.string()),
      candidates: v.array(v.object({
        firstName: v.string(),
        lastName: v.string(),
        party: v.union(v.literal("democrat"), v.literal("republican"), v.literal("independent"), v.literal("other")),
        status: v.union(v.literal("active"), v.literal("withdrawn"), v.literal("won"), v.literal("lost")),
        bio: v.optional(v.string()),
        isOnboarded: v.boolean(),
        saasTier: v.optional(v.string()),
        pledgeCount: v.number(),
        donationTotal: v.number(),
        currentRole: v.optional(v.string()),
        website: v.optional(v.string()),
        isIncumbent: v.optional(v.boolean()),
        endorsements: v.optional(v.string()),
        keyPositions: v.optional(v.string()),
        fundraisingTotal: v.optional(v.number()),
        hometown: v.optional(v.string()),
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
      const existingRaces = await ctx.db.query("races").collect();
      const existingRace = existingRaces.find(r => r.title === raceData.title);
      let raceId;

      if (existingRace) {
        await ctx.db.patch(existingRace._id, {
          office: raceData.office,
          level: raceData.level,
          state: raceData.state,
          district: raceData.district,
          electionDate: raceData.electionDate,
          isExclusive: raceData.isExclusive,
          status: raceData.status,
          description: raceData.description,
          incumbentParty: raceData.incumbentParty,
        });
        raceId = existingRace._id;
        racesUpdated++;
      } else {
        raceId = await ctx.db.insert("races", {
          title: raceData.title,
          office: raceData.office,
          level: raceData.level,
          state: raceData.state,
          district: raceData.district,
          electionDate: raceData.electionDate,
          isExclusive: raceData.isExclusive,
          status: raceData.status,
          description: raceData.description,
          incumbentParty: raceData.incumbentParty,
        });
        racesInserted++;
      }

      const existingCandidates = await ctx.db.query("candidates")
        .withIndex("by_race", q => q.eq("raceId", raceId))
        .collect();

      const updatedNames = new Set<string>();

      for (const candData of raceData.candidates) {
        const fullName = `${candData.firstName} ${candData.lastName}`;
        updatedNames.add(fullName);
        const existingCand = existingCandidates.find(
          c => c.firstName === candData.firstName && c.lastName === candData.lastName
        );

        if (existingCand) {
          await ctx.db.patch(existingCand._id, {
            party: candData.party,
            status: candData.status,
            bio: candData.bio,
            isOnboarded: candData.isOnboarded,
            saasTier: candData.saasTier,
            pledgeCount: candData.pledgeCount,
            donationTotal: candData.donationTotal,
            currentRole: candData.currentRole,
            website: candData.website,
            isIncumbent: candData.isIncumbent,
            endorsements: candData.endorsements,
            keyPositions: candData.keyPositions,
            fundraisingTotal: candData.fundraisingTotal,
            hometown: candData.hometown,
          });
          candidatesUpdated++;
        } else {
          await ctx.db.insert("candidates", {
            raceId,
            firstName: candData.firstName,
            lastName: candData.lastName,
            party: candData.party,
            status: candData.status,
            bio: candData.bio,
            isOnboarded: candData.isOnboarded,
            saasTier: candData.saasTier,
            pledgeCount: candData.pledgeCount,
            donationTotal: candData.donationTotal,
            currentRole: candData.currentRole,
            website: candData.website,
            isIncumbent: candData.isIncumbent,
            keyPositions: candData.keyPositions,
            endorsements: candData.endorsements,
            fundraisingTotal: candData.fundraisingTotal,
            hometown: candData.hometown,
          });
          candidatesInserted++;
        }
      }

      // Remove candidates no longer in the race
      for (const existCand of existingCandidates) {
        const fullName = `${existCand.firstName} ${existCand.lastName}`;
        if (!updatedNames.has(fullName)) {
          await ctx.db.patch(existCand._id, { status: "withdrawn" as const });
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
