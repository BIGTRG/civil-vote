import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    raceId: v.optional(v.id("races")),
    candidateId: v.optional(v.id("candidates")),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q;
    if (args.candidateId) {
      q = ctx.db
        .query("pledges")
        .withIndex("by_candidate", (q) =>
          q.eq("candidateId", args.candidateId!),
        );
    } else if (args.raceId) {
      q = ctx.db
        .query("pledges")
        .withIndex("by_race", (q) => q.eq("raceId", args.raceId!));
    } else if (args.state) {
      q = ctx.db
        .query("pledges")
        .withIndex("by_state", (q) => q.eq("state", args.state!));
    } else {
      q = ctx.db.query("pledges");
    }
    const pledges = await q.order("desc").take(args.limit ?? 200);
    // Attach candidate and race info
    const results = [];
    for (const p of pledges) {
      const candidate = await ctx.db.get(p.candidateId);
      const race = await ctx.db.get(p.raceId);
      results.push({
        ...p,
        candidateName: candidate
          ? `${candidate.firstName} ${candidate.lastName}`
          : "Unknown",
        candidateParty: candidate?.party ?? "other",
        raceName: race?.title ?? "Unknown",
      });
    }
    return results;
  },
});

export const create = mutation({
  args: {
    raceId: v.id("races"),
    candidateId: v.id("candidates"),
    donationAmount: v.number(),
    state: v.string(),
    visitorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.donationAmount < 5) {
      throw new Error("Minimum donation is $5");
    }
    const candidate = await ctx.db.get(args.candidateId);
    if (!candidate) throw new Error("Candidate not found");
    const race = await ctx.db.get(args.raceId);
    if (!race) throw new Error("Race not found");

    const id = await ctx.db.insert("pledges", {
      ...args,
      status: "active",
    });

    // Update candidate totals
    await ctx.db.patch(args.candidateId, {
      pledgeCount: candidate.pledgeCount + 1,
      donationTotal: candidate.donationTotal + args.donationAmount,
    });

    // Log activity
    await ctx.db.insert("activityFeed", {
      type: "pledge",
      description: `Pledge for ${candidate.firstName} ${candidate.lastName} in ${race.title}`,
      state: args.state,
      amount: args.donationAmount,
    });

    return id;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("pledges"),
    status: v.union(
      v.literal("active"),
      v.literal("withheld"),
      v.literal("withdrawn"),
    ),
  },
  handler: async (ctx, args) => {
    const pledge = await ctx.db.get(args.id);
    if (!pledge) throw new Error("Pledge not found");
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const allPledges = await ctx.db.query("pledges").collect();
    const active = allPledges.filter((p) => p.status === "active");
    const withheld = allPledges.filter((p) => p.status === "withheld");
    const withdrawn = allPledges.filter((p) => p.status === "withdrawn");
    const totalDonations = active.reduce((sum, p) => sum + p.donationAmount, 0);
    const avgDonation = active.length > 0 ? totalDonations / active.length : 0;

    // By state
    const byState: Record<string, { count: number; amount: number }> = {};
    for (const p of active) {
      if (!byState[p.state]) byState[p.state] = { count: 0, amount: 0 };
      byState[p.state].count++;
      byState[p.state].amount += p.donationAmount;
    }

    return {
      total: allPledges.length,
      active: active.length,
      withheld: withheld.length,
      withdrawn: withdrawn.length,
      totalDonations,
      avgDonation: Math.round(avgDonation * 100) / 100,
      byState,
    };
  },
});
