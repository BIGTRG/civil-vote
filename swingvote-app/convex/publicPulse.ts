import { query } from "./_generated/server";
import { v } from "convex/values";

export const byRace = query({
  args: { raceId: v.id("races") },
  handler: async (ctx, args) => {
    const pulse = await ctx.db
      .query("publicPulse")
      .withIndex("by_race", q => q.eq("raceId", args.raceId))
      .collect();
    return pulse.sort((a, b) => b.pledgeCount - a.pledgeCount);
  },
});

export const overview = query({
  handler: async (ctx) => {
    const allPulse = await ctx.db.query("publicPulse").collect();
    const races = await ctx.db.query("races").collect();
    const activeRaces = races.filter(r => r.status === "active");

    // Aggregate by party
    const partyTotals: Record<string, { pledges: number; raised: number }> = {};
    for (const p of allPulse) {
      if (!partyTotals[p.party]) {
        partyTotals[p.party] = { pledges: 0, raised: 0 };
      }
      partyTotals[p.party].pledges += p.pledgeCount;
      partyTotals[p.party].raised += p.totalRaised;
    }

    return {
      totalRaces: races.length,
      activeRaces: activeRaces.length,
      partyTotals,
      raceData: await Promise.all(
        activeRaces.map(async (race) => {
          const racePulse = allPulse.filter(p => p.raceId === race._id);
          return {
            raceId: race._id,
            raceTitle: race.title,
            state: race.state,
            candidates: racePulse,
          };
        })
      ),
    };
  },
});
