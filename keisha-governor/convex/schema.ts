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
    type: v.union(v.literal("pledge"), v.literal("issue"), v.literal("promise_update"), v.literal("new_race"), v.literal("milestone"), v.literal("event"), v.literal("endorsement"), v.literal("fundraising")),
    message: v.string(),
    state: v.optional(v.string()),
    raceId: v.optional(v.id("races")),
    createdAt: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"]),

  // === NEW TABLES FOR KEISHA APP ===

  // Events calendar
  events: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.union(v.literal("rally"), v.literal("fundraiser"), v.literal("church"), v.literal("concert"), v.literal("townhall"), v.literal("volunteer"), v.literal("debate"), v.literal("other")),
    date: v.string(),
    time: v.optional(v.string()),
    location: v.string(),
    city: v.string(),
    county: v.optional(v.string()),
    rsvpCount: v.number(),
    capacity: v.optional(v.number()),
    featured: v.boolean(),
    organizerName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  })
    .index("by_date", ["date"])
    .index("by_type", ["type"])
    .index("by_featured", ["featured"]),

  // Donor spotlight
  donors: defineTable({
    name: v.string(),
    title: v.optional(v.string()),
    organization: v.optional(v.string()),
    bio: v.optional(v.string()),
    totalRaised: v.number(),
    totalDonated: v.number(),
    tier: v.union(v.literal("platinum"), v.literal("gold"), v.literal("silver"), v.literal("bronze")),
    featured: v.boolean(),
    imageUrl: v.optional(v.string()),
    contactInfo: v.optional(v.string()),
    joinedDate: v.string(),
  })
    .index("by_tier", ["tier"])
    .index("by_featured", ["featured"])
    .index("by_totalRaised", ["totalRaised"]),

  // Fundraising challenges
  fundraisingChallenges: defineTable({
    title: v.string(),
    description: v.string(),
    goalAmount: v.number(),
    currentAmount: v.number(),
    tier: v.union(v.literal("5k"), v.literal("10k"), v.literal("20k"), v.literal("50k"), v.literal("custom")),
    participantCount: v.number(),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("upcoming")),
    startDate: v.string(),
    endDate: v.string(),
    createdBy: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_tier", ["tier"]),

  // Challenge participants
  challengeParticipants: defineTable({
    challengeId: v.id("fundraisingChallenges"),
    name: v.string(),
    pledgedAmount: v.number(),
    raisedAmount: v.number(),
    joinedDate: v.string(),
  })
    .index("by_challenge", ["challengeId"])
    .index("by_raised", ["raisedAmount"]),

  // Directed giving categories
  directedGiving: defineTable({
    category: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    totalAllocated: v.number(),
    donorCount: v.number(),
    goalAmount: v.optional(v.number()),
    percentageOfTotal: v.number(),
  })
    .index("by_totalAllocated", ["totalAllocated"]),

  // Church/org endorsements
  endorsements: defineTable({
    organizationName: v.string(),
    type: v.union(v.literal("church"), v.literal("union"), v.literal("nonprofit"), v.literal("business"), v.literal("civic"), v.literal("other")),
    city: v.string(),
    county: v.optional(v.string()),
    memberCount: v.number(),
    contributionTotal: v.number(),
    endorsementDate: v.string(),
    contactPerson: v.optional(v.string()),
    statement: v.optional(v.string()),
    featured: v.boolean(),
  })
    .index("by_type", ["type"])
    .index("by_city", ["city"])
    .index("by_featured", ["featured"]),

  // Supporter list builder (CRM)
  supporters: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
    county: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    source: v.union(v.literal("website"), v.literal("event"), v.literal("church"), v.literal("referral"), v.literal("social"), v.literal("volunteer"), v.literal("donor"), v.literal("other")),
    interests: v.array(v.string()),
    volunteerWilling: v.boolean(),
    donorStatus: v.boolean(),
    totalContributed: v.number(),
    notes: v.optional(v.string()),
    createdAt: v.string(),
    lastContactDate: v.optional(v.string()),
    tags: v.array(v.string()),
  })
    .index("by_source", ["source"])
    .index("by_city", ["city"])
    .index("by_county", ["county"])
    .index("by_createdAt", ["createdAt"])
    .index("by_volunteerWilling", ["volunteerWilling"]),

  // Election history data
  electionHistory: defineTable({
    year: v.number(),
    race: v.string(),
    winnerName: v.string(),
    winnerParty: v.string(),
    winnerVotes: v.number(),
    loserName: v.string(),
    loserParty: v.string(),
    loserVotes: v.number(),
    margin: v.string(),
    turnoutPercent: v.number(),
    totalRegistered: v.number(),
    totalVoted: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_year", ["year"])
    .index("by_race", ["race"]),

  // Media items
  mediaItems: defineTable({
    title: v.string(),
    type: v.union(v.literal("video"), v.literal("podcast"), v.literal("article"), v.literal("press_release"), v.literal("social")),
    url: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    source: v.optional(v.string()),
    publishDate: v.string(),
    featured: v.boolean(),
    platform: v.optional(v.string()),
  })
    .index("by_type", ["type"])
    .index("by_publishDate", ["publishDate"])
    .index("by_featured", ["featured"]),
  // === DONATION TRACKING ===
  // Individual donations with GA contribution limits tracking
  donations: defineTable({
    userId: v.optional(v.id("users")),
    supporterId: v.optional(v.id("supporters")),
    donorName: v.string(),
    donorEmail: v.optional(v.string()),
    amount: v.number(),
    isFirstDonation: v.boolean(), // First donation = vote/pledge
    cumulative: v.number(), // Running total for this donor
    limitRemaining: v.number(), // GA governor limit: $7,600 per election cycle
    paymentMethod: v.optional(v.string()),
    directedCategory: v.optional(v.string()), // Where they want money to go
    timestamp: v.string(),
    status: v.union(v.literal("completed"), v.literal("pending"), v.literal("refunded")),
  })
    .index("by_userId", ["userId"])
    .index("by_supporterId", ["supporterId"])
    .index("by_donorEmail", ["donorEmail"])
    .index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),

  // Donation summary per donor (for limit tracking)
  donorLimits: defineTable({
    donorEmail: v.string(),
    donorName: v.string(),
    totalContributed: v.number(), // Running total
    gaLimit: v.number(), // $7,600 per election cycle
    limitRemaining: v.number(),
    donationCount: v.number(),
    firstDonationDate: v.string(),
    lastDonationDate: v.string(),
    countsAsVote: v.boolean(), // First signup + donate = vote
    userId: v.optional(v.id("users")),
  })
    .index("by_donorEmail", ["donorEmail"])
    .index("by_userId", ["userId"])
    .index("by_totalContributed", ["totalContributed"]),

  // === GAMIFICATION ===
  // Badge definitions
  badges: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.string(), // emoji or icon name
    category: v.union(v.literal("fundraising"), v.literal("volunteer"), v.literal("social"), v.literal("events"), v.literal("recruiting"), v.literal("milestone")),
    tier: v.union(v.literal("bronze"), v.literal("silver"), v.literal("gold"), v.literal("platinum"), v.literal("diamond")),
    requirement: v.string(), // Human-readable requirement
    threshold: v.number(), // Numeric threshold to earn
    metric: v.string(), // What is measured: "dollars_raised", "volunteer_hours", "events_attended", etc.
    pointValue: v.number(), // Points awarded for earning this badge
  })
    .index("by_category", ["category"])
    .index("by_tier", ["tier"]),

  // Badges earned by users
  userBadges: defineTable({
    userId: v.id("users"),
    badgeId: v.id("badges"),
    earnedDate: v.string(),
    progress: v.number(), // 0-100 percentage toward next badge
    currentValue: v.number(), // Current metric value
  })
    .index("by_userId", ["userId"])
    .index("by_badgeId", ["badgeId"])
    .index("by_userId_badgeId", ["userId", "badgeId"]),

  // User gamification profile
  userGameProfile: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    totalPoints: v.number(),
    rank: v.number(), // Overall leaderboard rank
    level: v.number(), // 1-50 progressive level
    badgeCount: v.number(),
    // Activity metrics
    dollarsRaised: v.number(),
    dollarsDonated: v.number(),
    volunteerHours: v.number(),
    eventsAttended: v.number(),
    referralsCount: v.number(),
    socialShares: v.number(),
    // Streaks
    currentStreak: v.number(), // Consecutive days active
    longestStreak: v.number(),
    lastActiveDate: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_totalPoints", ["totalPoints"])
    .index("by_rank", ["rank"])
    .index("by_level", ["level"]),

  // Leaderboard entries (weekly/monthly/all-time)
  leaderboard: defineTable({
    userId: v.id("users"),
    displayName: v.string(),
    period: v.union(v.literal("weekly"), v.literal("monthly"), v.literal("allTime")),
    category: v.union(v.literal("overall"), v.literal("fundraising"), v.literal("volunteer"), v.literal("events"), v.literal("recruiting")),
    score: v.number(),
    rank: v.number(),
    county: v.optional(v.string()),
    updatedAt: v.string(),
  })
    .index("by_period_category", ["period", "category"])
    .index("by_userId", ["userId"])
    .index("by_rank", ["rank"]),

  // === STRATEGY & CAMPAIGN TARGETS ===
  // County-level voter acquisition targets
  countyTargets: defineTable({
    county: v.string(),
    totalRegistered: v.number(),
    targetVoters: v.number(), // How many we need from this county
    currentPledges: v.number(),
    percentComplete: v.number(),
    demRegistered: v.number(),
    repRegistered: v.number(),
    indRegistered: v.number(),
    priority: v.union(v.literal("critical"), v.literal("high"), v.literal("medium"), v.literal("low")),
    strategy: v.optional(v.string()), // Brief strategy note for this county
    region: v.string(), // Metro Atlanta, South GA, etc.
  })
    .index("by_priority", ["priority"])
    .index("by_region", ["region"])
    .index("by_percentComplete", ["percentComplete"]),

  // === ONBOARDING PROFILES ===
  userProfiles: defineTable({
    userId: v.optional(v.id("users")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    county: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    volunteerInterest: v.boolean(),
    referralCode: v.optional(v.string()), // who referred them
    onboardedAt: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_phone", ["phone"])
    .index("by_referralCode", ["referralCode"]),

  // === MERCH STORE ===
  products: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("apparel"), v.literal("accessories"), v.literal("drinkware"),
      v.literal("signs"), v.literal("stickers"), v.literal("bags"), v.literal("other")
    ),
    price: v.number(),
    campaignDonationPercent: v.number(), // % going to campaign
    imageUrl: v.string(),
    sizes: v.optional(v.array(v.string())),
    colors: v.optional(v.array(v.string())),
    inStock: v.boolean(),
    featured: v.boolean(),
    sortOrder: v.number(),
    sku: v.string(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_sortOrder", ["sortOrder"]),

  orders: defineTable({
    customerEmail: v.string(),
    customerName: v.string(),
    customerPhone: v.optional(v.string()),
    items: v.array(v.object({
      productId: v.id("products"),
      productName: v.string(),
      quantity: v.number(),
      size: v.optional(v.string()),
      color: v.optional(v.string()),
      unitPrice: v.number(),
      lineTotal: v.number(),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    total: v.number(),
    campaignDonation: v.number(), // amount going to campaign
    shippingAddress: v.object({
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
    }),
    status: v.union(
      v.literal("pending"), v.literal("paid"), v.literal("processing"),
      v.literal("shipped"), v.literal("delivered"), v.literal("cancelled")
    ),
    paymentMethod: v.optional(v.string()),
    trackingNumber: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_customerEmail", ["customerEmail"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  cartItems: defineTable({
    sessionId: v.string(), // email or session token
    productId: v.id("products"),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
    addedAt: v.string(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_sessionId_productId", ["sessionId", "productId"]),

  // === RUNNER FEED ===
  // Posts from volunteers/supporters in the field
  runnerPosts: defineTable({
    authorName: v.string(),
    authorRole: v.optional(v.string()), // "Volunteer", "Team Lead", "Community Captain", etc.
    authorCity: v.optional(v.string()),
    authorCounty: v.optional(v.string()),
    authorImageUrl: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    // Content
    content: v.string(), // Text content of the post
    mediaType: v.optional(v.union(v.literal("image"), v.literal("video"), v.literal("none"))),
    mediaUrl: v.optional(v.string()),
    // Metrics
    peopleRecruited: v.optional(v.number()), // How many they signed up
    hoursVolunteered: v.optional(v.number()),
    // Engagement
    likes: v.number(),
    comments: v.number(),
    shares: v.number(),
    // Moderation
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    moderatedBy: v.optional(v.string()),
    moderatedAt: v.optional(v.string()),
    rejectionReason: v.optional(v.string()),
    // Timestamps
    createdAt: v.string(),
    publishedAt: v.optional(v.string()),
    // Tags
    tags: v.array(v.string()), // e.g. ["canvassing", "voter-registration", "rally"]
    pinned: v.boolean(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"])
    .index("by_publishedAt", ["publishedAt"])
    .index("by_userId", ["userId"])
    .index("by_pinned", ["pinned"])
    .index("by_county", ["authorCounty"]),

  // Referral tracking -- each user gets a unique code
  referrals: defineTable({
    referrerUserId: v.optional(v.id("users")),
    referrerName: v.string(),
    referralCode: v.string(), // unique short code e.g. "marcus-atl-47"
    totalSignups: v.number(),
    totalShares: v.number(),
    createdAt: v.string(),
    lastShareAt: v.optional(v.string()),
  })
    .index("by_referralCode", ["referralCode"])
    .index("by_referrerUserId", ["referrerUserId"])
    .index("by_totalSignups", ["totalSignups"]),

  // Individual referral events (when someone signs up via a link)
  referralSignups: defineTable({
    referralCode: v.string(),
    referrerName: v.string(),
    signupName: v.optional(v.string()),
    signupEmail: v.optional(v.string()),
    source: v.union(v.literal("facebook"), v.literal("twitter"), v.literal("instagram"), v.literal("tiktok"), v.literal("whatsapp"), v.literal("sms"), v.literal("link"), v.literal("other")),
    postId: v.optional(v.id("runnerPosts")), // which post drove the signup
    createdAt: v.string(),
  })
    .index("by_referralCode", ["referralCode"])
    .index("by_source", ["source"])
    .index("by_createdAt", ["createdAt"]),

  // Share events (track every share for analytics)
  shareEvents: defineTable({
    postId: v.id("runnerPosts"),
    sharedBy: v.optional(v.string()),
    platform: v.union(v.literal("facebook"), v.literal("twitter"), v.literal("instagram"), v.literal("tiktok"), v.literal("whatsapp"), v.literal("sms"), v.literal("native"), v.literal("copy"), v.literal("other")),
    referralCode: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_postId", ["postId"])
    .index("by_platform", ["platform"])
    .index("by_createdAt", ["createdAt"]),

  // ActBlue donation webhook events
  actblueDonations: defineTable({
    actblueOrderId: v.string(), // ActBlue's order number
    donorFirstName: v.string(),
    donorLastName: v.string(),
    donorEmail: v.string(),
    donorPhone: v.optional(v.string()),
    donorAddress: v.optional(v.string()),
    donorCity: v.optional(v.string()),
    donorState: v.optional(v.string()),
    donorZip: v.optional(v.string()),
    donorEmployer: v.optional(v.string()),
    donorOccupation: v.optional(v.string()),
    amount: v.number(), // in cents
    amountDollars: v.number(),
    recurringPeriod: v.optional(v.string()), // "monthly", "weekly", or undefined for one-time
    isRecurring: v.boolean(),
    refcode: v.optional(v.string()), // tracking code from URL params
    source: v.optional(v.string()),
    lineItems: v.optional(v.string()), // JSON string of line items
    status: v.union(v.literal("completed"), v.literal("refunded"), v.literal("pending")),
    autoOnboarded: v.boolean(), // whether we auto-created a user profile
    processedAt: v.string(),
    rawPayload: v.optional(v.string()), // store full webhook payload for debugging
  })
    .index("by_actblueOrderId", ["actblueOrderId"])
    .index("by_donorEmail", ["donorEmail"])
    .index("by_processedAt", ["processedAt"])
    .index("by_status", ["status"]),

  // Comments on runner posts
  runnerComments: defineTable({
    postId: v.id("runnerPosts"),
    authorName: v.string(),
    userId: v.optional(v.id("users")),
    content: v.string(),
    likes: v.number(),
    status: v.union(v.literal("visible"), v.literal("hidden")),
    createdAt: v.string(),
  })
    .index("by_postId", ["postId"])
    .index("by_createdAt", ["createdAt"]),
});

export default schema;
