import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  // Races (elections)
  races: defineTable({
    title: v.string(),
    state: v.string(),
    district: v.optional(v.string()),
    type: v.union(v.literal("federal"), v.literal("state"), v.literal("local")),
    electionDate: v.string(),
    status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")),
    description: v.optional(v.string()),
    totalPledges: v.number(),
    totalRaised: v.number(),
  })
    .index("by_state", ["state"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  // Candidates
  candidates: defineTable({
    name: v.string(),
    raceId: v.id("races"),
    party: v.union(v.literal("democrat"), v.literal("republican"), v.literal("independent"), v.literal("other")),
    photo: v.optional(v.string()),
    bio: v.string(),
    positions: v.array(v.object({
      issue: v.string(),
      stance: v.string(),
    })),
    endorsements: v.array(v.string()),
    website: v.optional(v.string()),
    pledgeCount: v.number(),
    totalRaised: v.number(),
  })
    .index("by_race", ["raceId"])
    .index("by_party", ["party"]),

  // Voter pledges (one per race per voter)
  pledges: defineTable({
    oderId: v.id("users"),
    candidateId: v.id("candidates"),
    raceId: v.id("races"),
    amount: v.number(), // $5 minimum
    status: v.union(v.literal("active"), v.literal("withdrawn")),
    createdAt: v.string(),
  })
    .index("by_voter", ["oderId"])
    .index("by_race", ["raceId"])
    .index("by_candidate", ["candidateId"])
    .index("by_voter_race", ["oderId", "raceId"]),

  // Candidate promises (Promise Ledger)
  promises: defineTable({
    candidateId: v.id("candidates"),
    raceId: v.id("races"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("fulfilled"), v.literal("broken"), v.literal("modified")),
    datePromised: v.string(),
    evidence: v.array(v.object({
      date: v.string(),
      note: v.string(),
      sourceUrl: v.optional(v.string()),
    })),
    hash: v.string(),
  })
    .index("by_candidate", ["candidateId"])
    .index("by_race", ["raceId"])
    .index("by_status", ["status"]),

  // Voter issues (Win My Vote)
  voterIssues: defineTable({
    oderId: v.optional(v.id("users")),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    state: v.string(),
    raceId: v.optional(v.id("races")),
    upvotes: v.number(),
    status: v.union(v.literal("open"), v.literal("acknowledged"), v.literal("responded"), v.literal("resolved")),
    createdAt: v.string(),
    responses: v.array(v.object({
      candidateId: v.id("candidates"),
      candidateName: v.string(),
      response: v.string(),
      date: v.string(),
    })),
  })
    .index("by_state", ["state"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_upvotes", ["upvotes"]),

  // Public Pulse aggregated data
  publicPulse: defineTable({
    raceId: v.id("races"),
    candidateId: v.id("candidates"),
    candidateName: v.string(),
    party: v.string(),
    pledgeCount: v.number(),
    totalRaised: v.number(),
    percentageOfVotes: v.number(),
    lastUpdated: v.string(),
  })
    .index("by_race", ["raceId"])
    .index("by_candidate", ["candidateId"]),

  // Activity feed
  activityFeed: defineTable({
    type: v.union(v.literal("pledge"), v.literal("issue"), v.literal("promise_update"), v.literal("new_race"), v.literal("milestone")),
    message: v.string(),
    state: v.optional(v.string()),
    raceId: v.optional(v.id("races")),
    createdAt: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"]),

  // Merch store products
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.union(
      v.literal("apparel"),
      v.literal("accessories"),
      v.literal("yard_signs"),
      v.literal("stickers"),
      v.literal("drinkware"),
      v.literal("digital")
    ),
    imageEmoji: v.string(),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    inStock: v.boolean(),
    featured: v.boolean(),
    sortOrder: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"]),


  // Party organizations directory
  partyOrganizations: defineTable({
    name: v.string(),
    abbreviation: v.optional(v.string()),
    level: v.union(v.literal("federal"), v.literal("state")),
    party: v.union(v.literal("democrat"), v.literal("republican")),
    state: v.optional(v.string()),
    website: v.string(),
    chair: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
  })
    .index("by_party", ["party"])
    .index("by_level", ["level"])
    .index("by_state", ["state"]),

  // Shopping cart
  cartItems: defineTable({
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
    addedAt: v.string(),
  })
    .index("by_session", ["sessionId"])
    .index("by_product", ["productId"]),
});

export default schema;
