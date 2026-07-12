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
    totalSpent: v.optional(v.number()),
    cashOnHand: v.optional(v.number()),
    pollingAverage: v.optional(v.number()),
    fecCandidateId: v.optional(v.string()),
  })
    .index("by_race", ["raceId"])
    .index("by_party", ["party"]),

  // Voter pledges
  pledges: defineTable({
    oderId: v.id("users"),
    candidateId: v.id("candidates"),
    raceId: v.id("races"),
    amount: v.number(),
    status: v.union(v.literal("active"), v.literal("withdrawn")),
    createdAt: v.string(),
  })
    .index("by_voter", ["oderId"])
    .index("by_race", ["raceId"])
    .index("by_candidate", ["candidateId"])
    .index("by_voter_race", ["oderId", "raceId"]),

  // Candidate promises
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

  // Voter issues
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

  // Public Pulse
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

  // Merch store
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

  // Polling data
  pollingData: defineTable({
    raceId: v.id("races"),
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
  })
    .index("by_race", ["raceId"])
    .index("by_date", ["date"]),

  // Race ratings
  raceRatings: defineTable({
    raceTitle: v.string(),
    state: v.string(),
    office: v.string(),
    rating: v.string(),
    source: v.string(),
    previousRating: v.optional(v.string()),
    lastUpdated: v.string(),
  })
    .index("by_state", ["state"])
    .index("by_rating", ["rating"]),

  // ======== NEW TABLES ========

  // News articles from feeds and scrapers
  newsArticles: defineTable({
    title: v.string(),
    summary: v.string(),
    source: v.string(),
    url: v.string(),
    imageUrl: v.optional(v.string()),
    publishedAt: v.string(),
    category: v.union(
      v.literal("national"),
      v.literal("state"),
      v.literal("local"),
      v.literal("policy"),
      v.literal("campaign"),
      v.literal("opinion")
    ),
    state: v.optional(v.string()),
    relatedRaceIds: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    sentiment: v.optional(v.union(v.literal("positive"), v.literal("negative"), v.literal("neutral"))),
  })
    .index("by_category", ["category"])
    .index("by_state", ["state"])
    .index("by_published", ["publishedAt"]),

  // Canvassing activities
  canvassingTurf: defineTable({
    name: v.string(),
    state: v.string(),
    county: v.optional(v.string()),
    district: v.optional(v.string()),
    assignedTo: v.optional(v.string()),
    totalDoors: v.number(),
    doorsKnocked: v.number(),
    positiveContacts: v.number(),
    negativeContacts: v.number(),
    notHome: v.number(),
    status: v.union(v.literal("unassigned"), v.literal("in_progress"), v.literal("completed")),
    lastUpdated: v.string(),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    zipCodes: v.optional(v.array(v.string())),
  })
    .index("by_state", ["state"])
    .index("by_status", ["status"]),

  // Canvassing door records
  doorRecords: defineTable({
    turfId: v.id("canvassingTurf"),
    address: v.string(),
    voterName: v.optional(v.string()),
    result: v.union(
      v.literal("strong_support"),
      v.literal("lean_support"),
      v.literal("undecided"),
      v.literal("lean_oppose"),
      v.literal("strong_oppose"),
      v.literal("not_home"),
      v.literal("refused")
    ),
    notes: v.optional(v.string()),
    canvasserName: v.string(),
    knockedAt: v.string(),
    issuesConcerned: v.optional(v.array(v.string())),
  })
    .index("by_turf", ["turfId"])
    .index("by_result", ["result"]),

  // Notifications
  notifications: defineTable({
    userId: v.optional(v.id("users")),
    title: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("race_update"),
      v.literal("poll_result"),
      v.literal("finance_update"),
      v.literal("campaign_news"),
      v.literal("system")
    ),
    read: v.boolean(),
    actionUrl: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_read", ["read"])
    .index("by_type", ["type"]),

  // Civic info from Google Civic API
  civicInfo: defineTable({
    state: v.string(),
    type: v.union(
      v.literal("polling_location"),
      v.literal("early_voting"),
      v.literal("election_official"),
      v.literal("ballot_measure")
    ),
    name: v.string(),
    address: v.optional(v.string()),
    hours: v.optional(v.string()),
    notes: v.optional(v.string()),
    url: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    lastUpdated: v.string(),
  })
    .index("by_state", ["state"])
    .index("by_type", ["type"]),

  // Donations / payment tracking
  donations: defineTable({
    userId: v.optional(v.id("users")),
    email: v.optional(v.string()),
    candidateId: v.optional(v.id("candidates")),
    raceId: v.optional(v.id("races")),
    amount: v.number(),
    platform: v.union(v.literal("stripe"), v.literal("actblue"), v.literal("winred"), v.literal("manual")),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("refunded"), v.literal("failed")),
    transactionId: v.optional(v.string()),
    donorName: v.optional(v.string()),
    recurring: v.boolean(),
    createdAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_candidate", ["candidateId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  // Voter match scores (AI matching)
  voterMatches: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.string()),
    candidateId: v.id("candidates"),
    raceId: v.id("races"),
    matchScore: v.number(),
    matchBreakdown: v.array(v.object({
      issue: v.string(),
      alignment: v.union(v.literal("strong_match"), v.literal("partial_match"), v.literal("mismatch")),
      weight: v.number(),
    })),
    createdAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_candidate", ["candidateId"])
    .index("by_score", ["matchScore"]),
});

export default schema;
