import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get platform stats
export const getPlatformStats = query({
  args: {},
  returns: v.union(
    v.object({
      _id: v.id("platformStats"),
      _creationTime: v.number(),
      key: v.literal("current"),
      totalUsers: v.number(),
      totalPledges: v.number(),
      totalDonations: v.number(),
      totalRaces: v.number(),
      totalCandidates: v.number(),
      activeStates: v.number(),
      bluevoteUsers: v.number(),
      redvoteUsers: v.number(),
      civicvoteUsers: v.number(),
      lastUpdated: v.string(),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    return await ctx.db
      .query("platformStats")
      .withIndex("by_key", (q) => q.eq("key", "current"))
      .unique();
  },
});

// Get all races
export const listRaces = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("races"),
      _creationTime: v.number(),
      title: v.string(),
      office: v.string(),
      level: v.union(
        v.literal("federal"),
        v.literal("state"),
        v.literal("county"),
        v.literal("municipal"),
        v.literal("school_board"),
      ),
      state: v.string(),
      district: v.optional(v.string()),
      electionDate: v.string(),
      isExclusive: v.boolean(),
      status: v.union(v.literal("active"), v.literal("completed"), v.literal("upcoming")),
      description: v.optional(v.string()),
      incumbentParty: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("races").order("desc").collect();
  },
});

// Get candidates for a race
export const listCandidates = query({
  args: { raceId: v.optional(v.id("races")) },
  returns: v.array(
    v.object({
      _id: v.id("candidates"),
      _creationTime: v.number(),
      raceId: v.id("races"),
      firstName: v.string(),
      lastName: v.string(),
      party: v.union(
        v.literal("democrat"),
        v.literal("republican"),
        v.literal("independent"),
        v.literal("other"),
      ),
      status: v.union(v.literal("active"), v.literal("withdrawn"), v.literal("won"), v.literal("lost")),
      bio: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
      isOnboarded: v.boolean(),
      saasTier: v.optional(v.string()),
      pledgeCount: v.number(),
      donationTotal: v.number(),
      age: v.optional(v.number()),
      currentRole: v.optional(v.string()),
      previousRoles: v.optional(v.string()),
      education: v.optional(v.string()),
      website: v.optional(v.string()),
      twitter: v.optional(v.string()),
      isIncumbent: v.optional(v.boolean()),
      endorsements: v.optional(v.string()),
      keyPositions: v.optional(v.string()),
      fundraisingTotal: v.optional(v.number()),
      hometown: v.optional(v.string()),
    }),
  ),
  handler: async (ctx, args) => {
    if (args.raceId) {
      return await ctx.db
        .query("candidates")
        .withIndex("by_race", (q) => q.eq("raceId", args.raceId!))
        .collect();
    }
    return await ctx.db.query("candidates").order("desc").collect();
  },
});

// Get recent activity
export const getRecentActivity = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("activityFeed"),
      _creationTime: v.number(),
      type: v.union(
        v.literal("pledge"),
        v.literal("donation"),
        v.literal("signup"),
        v.literal("candidate_onboard"),
        v.literal("race_added"),
      ),
      description: v.string(),
      state: v.optional(v.string()),
      amount: v.optional(v.number()),
      metadata: v.optional(v.string()),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("activityFeed").order("desc").take(20);
  },
});

// Get pledges by state
export const getPledgesByState = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("pledges"),
      _creationTime: v.number(),
      visitorId: v.optional(v.string()),
      raceId: v.id("races"),
      candidateId: v.id("candidates"),
      status: v.union(v.literal("active"), v.literal("withheld"), v.literal("withdrawn")),
      donationAmount: v.number(),
      state: v.string(),
    }),
  ),
  handler: async (ctx) => {
    return await ctx.db.query("pledges").order("desc").take(100);
  },
});

// Seed demo data
export const seedDemoData = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Check if data already seeded
    const existing = await ctx.db
      .query("platformStats")
      .withIndex("by_key", (q) => q.eq("key", "current"))
      .unique();
    if (existing) return null;

    // Platform stats
    await ctx.db.insert("platformStats", {
      key: "current",
      totalUsers: 2847,
      totalPledges: 1923,
      totalDonations: 48750,
      totalRaces: 12,
      totalCandidates: 28,
      activeStates: 3,
      bluevoteUsers: 1654,
      redvoteUsers: 892,
      civicvoteUsers: 301,
      lastUpdated: new Date().toISOString(),
    });

    // Demo races
    const gaGov = await ctx.db.insert("races", {
      title: "Georgia Governor 2026",
      office: "Governor",
      level: "state",
      state: "GA",
      electionDate: "2026-11-03",
      isExclusive: true,
      status: "active",
    });

    const azSen = await ctx.db.insert("races", {
      title: "Arizona Senate 2026",
      office: "U.S. Senator",
      level: "federal",
      state: "AZ",
      electionDate: "2026-11-03",
      isExclusive: false,
      status: "active",
    });

    const paGov = await ctx.db.insert("races", {
      title: "Pennsylvania Governor 2026",
      office: "Governor",
      level: "state",
      state: "PA",
      electionDate: "2026-11-03",
      isExclusive: false,
      status: "upcoming",
    });

    const gaHouse = await ctx.db.insert("races", {
      title: "GA House District 5",
      office: "State Representative",
      level: "state",
      state: "GA",
      district: "5",
      electionDate: "2026-11-03",
      isExclusive: false,
      status: "active",
    });

    // Demo candidates
    await ctx.db.insert("candidates", {
      raceId: gaGov,
      firstName: "Sarah",
      lastName: "Mitchell",
      party: "democrat",
      status: "active",
      bio: "Former State Senator, education advocate",
      isOnboarded: true,
      saasTier: "pro",
      pledgeCount: 482,
      donationTotal: 12400,
    });

    await ctx.db.insert("candidates", {
      raceId: gaGov,
      firstName: "James",
      lastName: "Crawford",
      party: "republican",
      status: "active",
      bio: "Business leader, former Mayor of Savannah",
      isOnboarded: true,
      saasTier: "growth",
      pledgeCount: 341,
      donationTotal: 8750,
    });

    await ctx.db.insert("candidates", {
      raceId: azSen,
      firstName: "Maria",
      lastName: "Gonzalez",
      party: "democrat",
      status: "active",
      bio: "Current House Rep, immigration reform champion",
      isOnboarded: true,
      saasTier: "starter",
      pledgeCount: 267,
      donationTotal: 6890,
    });

    await ctx.db.insert("candidates", {
      raceId: azSen,
      firstName: "Robert",
      lastName: "Thompson",
      party: "republican",
      status: "active",
      bio: "Retired Army Colonel, national security focus",
      isOnboarded: false,
      saasTier: undefined,
      pledgeCount: 198,
      donationTotal: 5120,
    });

    await ctx.db.insert("candidates", {
      raceId: gaHouse,
      firstName: "Kwame",
      lastName: "Davis",
      party: "democrat",
      status: "active",
      bio: "Community organizer, affordable housing advocate",
      isOnboarded: true,
      saasTier: "starter",
      pledgeCount: 89,
      donationTotal: 2230,
    });

    // Activity feed
    const activities = [
      { type: "pledge" as const, description: "New pledge for Sarah Mitchell (GA Governor)", state: "GA", amount: 25 },
      { type: "donation" as const, description: "$25 donation via BlueVote for GA Governor race", state: "GA", amount: 25 },
      { type: "signup" as const, description: "New verified voter registered in Arizona", state: "AZ" },
      { type: "candidate_onboard" as const, description: "Maria Gonzalez claimed candidate profile (AZ Senate)", state: "AZ" },
      { type: "pledge" as const, description: "New pledge for James Crawford (GA Governor)", state: "GA", amount: 10 },
      { type: "race_added" as const, description: "PA Governor 2026 race added to platform", state: "PA" },
      { type: "donation" as const, description: "$50 donation via RedVote for GA Governor race", state: "GA", amount: 50 },
      { type: "signup" as const, description: "3 new voters registered in PA via campus drive", state: "PA" },
      { type: "pledge" as const, description: "Win My Vote: Voter withheld pledge pending healthcare response", state: "GA", amount: 5 },
      { type: "donation" as const, description: "$15 donation for GA House District 5", state: "GA", amount: 15 },
    ];

    for (const activity of activities) {
      await ctx.db.insert("activityFeed", activity);
    }

    // Demo pledges
    const states = ["GA", "GA", "GA", "AZ", "AZ", "PA", "GA", "AZ", "GA", "PA"];
    const statuses: ("active" | "withheld" | "withdrawn")[] = ["active", "active", "active", "active", "withheld", "active", "active", "active", "withdrawn", "active"];
    const amounts = [25, 10, 5, 50, 5, 15, 20, 30, 5, 10];

    for (let i = 0; i < 10; i++) {
      const raceId = states[i] === "GA" ? gaGov : states[i] === "AZ" ? azSen : paGov;
      const candidateIds = await ctx.db.query("candidates").withIndex("by_race", (q) => q.eq("raceId", raceId)).collect();
      const candidateId = candidateIds[i % candidateIds.length]?._id;
      if (candidateId) {
        await ctx.db.insert("pledges", {
          visitorId: `demo-user-${i}`,
          raceId,
          candidateId,
          status: statuses[i],
          donationAmount: amounts[i],
          state: states[i],
        });
      }
    }

    return null;
  },
});
