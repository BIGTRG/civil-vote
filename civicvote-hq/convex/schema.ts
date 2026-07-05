import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Races
  races: defineTable({
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
  })
    .index("by_state", ["state"])
    .index("by_status", ["status"])
    .index("by_office", ["office"]),

  // Candidates
  candidates: defineTable({
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
    // Enhanced profile fields
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
  })
    .index("by_race", ["raceId"])
    .index("by_party", ["party"]),

  // Pledges
  pledges: defineTable({
    visitorId: v.optional(v.string()),
    raceId: v.id("races"),
    candidateId: v.id("candidates"),
    status: v.union(v.literal("active"), v.literal("withheld"), v.literal("withdrawn")),
    donationAmount: v.number(),
    state: v.string(),
  })
    .index("by_candidate", ["candidateId"])
    .index("by_race", ["raceId"])
    .index("by_state", ["state"]),

  // Daily metrics snapshots
  dailyMetrics: defineTable({
    date: v.string(),
    totalUsers: v.number(),
    totalPledges: v.number(),
    totalDonations: v.number(),
    newUsersToday: v.number(),
    newPledgesToday: v.number(),
    newDonationsToday: v.number(),
    activeStates: v.number(),
    topState: v.string(),
  }).index("by_date", ["date"]),

  // Platform stats (single doc, updated frequently)
  platformStats: defineTable({
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
  }).index("by_key", ["key"]),

  // Activity feed
  activityFeed: defineTable({
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

  // Promise Ledger -- "Carfax for Politicians"
  promises: defineTable({
    candidateId: v.id("candidates"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    status: v.union(
      v.literal("made"),
      v.literal("kept"),
      v.literal("broken"),
      v.literal("in_progress"),
      v.literal("modified"),
    ),
    sourceUrl: v.optional(v.string()),
    datePromised: v.string(),
    evidenceHash: v.string(),
    lastVerified: v.string(),
  })
    .index("by_candidate", ["candidateId"])
    .index("by_status", ["status"]),

  // Win My Vote -- voter issues
  voterIssues: defineTable({
    raceId: v.id("races"),
    category: v.string(),
    title: v.string(),
    description: v.string(),
    voterState: v.string(),
    status: v.union(
      v.literal("submitted"),
      v.literal("acknowledged"),
      v.literal("responded"),
      v.literal("declined"),
    ),
    upvotes: v.number(),
  })
    .index("by_race", ["raceId"])
    .index("by_status", ["status"]),
});
