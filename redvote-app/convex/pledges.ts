import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    oderId: v.optional(v.id("users")),
    raceId: v.optional(v.id("races")),
    candidateId: v.optional(v.id("candidates")),
  },
  handler: async (ctx, args) => {
    let pledges;
    if (args.oderId) {
      pledges = await ctx.db.query("pledges").withIndex("by_voter", q => q.eq("oderId", args.oderId!)).collect();
    } else if (args.raceId) {
      pledges = await ctx.db.query("pledges").withIndex("by_race", q => q.eq("raceId", args.raceId!)).collect();
    } else if (args.candidateId) {
      pledges = await ctx.db.query("pledges").withIndex("by_candidate", q => q.eq("candidateId", args.candidateId!)).collect();
    } else {
      pledges = await ctx.db.query("pledges").collect();
    }
    return pledges;
  },
});

export const myPledges = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    // Find user by token identifier
    const users = await ctx.db.query("users").collect();
    const user = users.find(u => {
      const email = (u as any).email;
      return email === identity.email;
    });
    if (!user) return [];
    const pledges = await ctx.db.query("pledges").withIndex("by_voter", q => q.eq("oderId", user._id)).collect();
    // Enrich with candidate and race info
    const enriched = await Promise.all(
      pledges.map(async (p) => {
        const candidate = await ctx.db.get(p.candidateId);
        const race = await ctx.db.get(p.raceId);
        return {
          ...p,
          candidateName: candidate?.name ?? "Unknown",
          candidateParty: candidate?.party ?? "unknown",
          raceName: race?.title ?? "Unknown",
          raceState: race?.state ?? "",
        };
      })
    );
    return enriched;
  },
});

export const create = mutation({
  args: {
    candidateId: v.id("candidates"),
    raceId: v.id("races"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    if (args.amount < 5) throw new Error("Minimum pledge is $5");

    // Find user
    const users = await ctx.db.query("users").collect();
    const user = users.find(u => (u as any).email === identity.email);
    if (!user) throw new Error("User not found");

    // Check one pledge per race
    const existing = await ctx.db
      .query("pledges")
      .withIndex("by_voter_race", q => q.eq("oderId", user._id).eq("raceId", args.raceId))
      .first();
    if (existing && existing.status === "active") {
      throw new Error("You already have an active pledge for this race");
    }

    const pledgeId = await ctx.db.insert("pledges", {
      oderId: user._id,
      candidateId: args.candidateId,
      raceId: args.raceId,
      amount: args.amount,
      status: "active",
      createdAt: new Date().toISOString(),
    });

    // Update candidate totals
    const candidate = await ctx.db.get(args.candidateId);
    if (candidate) {
      await ctx.db.patch(args.candidateId, {
        pledgeCount: candidate.pledgeCount + 1,
        totalRaised: candidate.totalRaised + args.amount,
      });
    }

    // Update race totals
    const race = await ctx.db.get(args.raceId);
    if (race) {
      await ctx.db.patch(args.raceId, {
        totalPledges: race.totalPledges + 1,
        totalRaised: race.totalRaised + args.amount,
      });
    }

    // Add activity
    await ctx.db.insert("activityFeed", {
      type: "pledge",
      message: `A voter pledged $${args.amount} in the ${race?.title ?? "a race"}`,
      state: race?.state,
      raceId: args.raceId,
      createdAt: new Date().toISOString(),
    });

    return pledgeId;
  },
});

export const stats = query({
  handler: async (ctx) => {
    const pledges = await ctx.db.query("pledges").collect();
    const active = pledges.filter(p => p.status === "active");
    return {
      totalPledges: active.length,
      totalRaised: active.reduce((sum, p) => sum + p.amount, 0),
      averagePledge: active.length > 0 ? active.reduce((sum, p) => sum + p.amount, 0) / active.length : 0,
    };
  },
});
