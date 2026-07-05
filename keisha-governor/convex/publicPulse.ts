import { query } from "./_generated/server";

export const overview = query({
  handler: async (ctx) => {
    const races = await ctx.db.query("races").collect();
    const pulse = await ctx.db.query("publicPulse").collect();
    const partyTotals: Record<string, { pledges: number; raised: number }> = {};
    for (const p of pulse) {
      if (!partyTotals[p.party]) partyTotals[p.party] = { pledges: 0, raised: 0 };
      partyTotals[p.party].pledges += p.pledgeCount;
      partyTotals[p.party].raised += p.totalRaised;
    }
    const raceData = [];
    for (const race of races) {
      const candidates = pulse.filter((p) => p.raceId === race._id);
      raceData.push({ raceId: race._id, raceTitle: race.title, state: race.state, candidates });
    }
    return { totalRaces: races.length, activeRaces: races.filter((r) => r.status === "active").length, partyTotals, raceData };
  },
});
