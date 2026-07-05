import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Record an ActBlue donation (called from webhook HTTP handler)
export const recordDonation = mutation({
  args: {
    actblueOrderId: v.string(),
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
    amount: v.number(),
    recurringPeriod: v.optional(v.string()),
    refcode: v.optional(v.string()),
    source: v.optional(v.string()),
    lineItems: v.optional(v.string()),
    rawPayload: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check for duplicate order
    const existing = await ctx.db
      .query("actblueDonations")
      .withIndex("by_actblueOrderId", (q) =>
        q.eq("actblueOrderId", args.actblueOrderId)
      )
      .first();
    if (existing) return { id: existing._id, duplicate: true, autoOnboarded: false };

    const amountDollars = args.amount / 100;
    const isRecurring = !!args.recurringPeriod;

    // Insert ActBlue donation record
    const donationId = await ctx.db.insert("actblueDonations", {
      actblueOrderId: args.actblueOrderId,
      donorFirstName: args.donorFirstName,
      donorLastName: args.donorLastName,
      donorEmail: args.donorEmail,
      donorPhone: args.donorPhone,
      donorAddress: args.donorAddress,
      donorCity: args.donorCity,
      donorState: args.donorState,
      donorZip: args.donorZip,
      donorEmployer: args.donorEmployer,
      donorOccupation: args.donorOccupation,
      amount: args.amount,
      amountDollars,
      recurringPeriod: args.recurringPeriod,
      isRecurring,
      refcode: args.refcode,
      source: args.source,
      lineItems: args.lineItems,
      status: "completed",
      autoOnboarded: false,
      processedAt: new Date().toISOString(),
      rawPayload: args.rawPayload,
    });

    // Auto-onboard: create userProfile if none exists
    let autoOnboarded = false;
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.donorEmail))
      .first();

    if (!existingProfile) {
      await ctx.db.insert("userProfiles", {
        firstName: args.donorFirstName,
        lastName: args.donorLastName,
        email: args.donorEmail,
        phone: args.donorPhone || "",
        city: args.donorCity,
        zipCode: args.donorZip,
        volunteerInterest: false,
        referralCode: args.refcode,
        onboardedAt: new Date().toISOString(),
      });
      autoOnboarded = true;

      // Also add to supporters CRM
      await ctx.db.insert("supporters", {
        firstName: args.donorFirstName,
        lastName: args.donorLastName,
        email: args.donorEmail,
        phone: args.donorPhone || "",
        city: args.donorCity,
        county: undefined,
        zipCode: args.donorZip,
        source: "donor" as const,
        interests: [],
        volunteerWilling: false,
        donorStatus: true,
        totalContributed: amountDollars,
        notes: `ActBlue donation: $${amountDollars.toFixed(2)} (Order ${args.actblueOrderId})`,
        createdAt: new Date().toISOString(),
        tags: ["actblue", "donor", args.refcode ? `ref:${args.refcode}` : "organic"].filter(Boolean),
      });
    } else {
      // Update existing supporter's donor status
      const existingSupporter = await ctx.db
        .query("supporters")
        .filter((q) => q.eq(q.field("email"), args.donorEmail))
        .first();
      if (existingSupporter) {
        await ctx.db.patch(existingSupporter._id, {
          donorStatus: true,
          totalContributed: existingSupporter.totalContributed + amountDollars,
        });
      }
    }

    // Also record in the donations table for the donation tracking page
    const donorName = `${args.donorFirstName} ${args.donorLastName}`;
    const existingDonorLimit = await ctx.db
      .query("donorLimits")
      .withIndex("by_donorEmail", (q) => q.eq("donorEmail", args.donorEmail))
      .first();

    const GA_LIMIT = 7600;
    const prevTotal = existingDonorLimit?.totalContributed || 0;
    const newTotal = prevTotal + amountDollars;
    const isFirstDonation = !existingDonorLimit;

    await ctx.db.insert("donations", {
      donorName,
      donorEmail: args.donorEmail,
      amount: amountDollars,
      isFirstDonation,
      cumulative: newTotal,
      limitRemaining: Math.max(0, GA_LIMIT - newTotal),
      paymentMethod: "actblue",
      timestamp: new Date().toISOString(),
      status: "completed",
    });

    if (existingDonorLimit) {
      await ctx.db.patch(existingDonorLimit._id, {
        totalContributed: newTotal,
        limitRemaining: Math.max(0, GA_LIMIT - newTotal),
        donationCount: existingDonorLimit.donationCount + 1,
        lastDonationDate: new Date().toISOString(),
      });
    } else {
      await ctx.db.insert("donorLimits", {
        donorEmail: args.donorEmail,
        donorName,
        totalContributed: amountDollars,
        gaLimit: GA_LIMIT,
        limitRemaining: Math.max(0, GA_LIMIT - amountDollars),
        donationCount: 1,
        firstDonationDate: new Date().toISOString(),
        lastDonationDate: new Date().toISOString(),
        countsAsVote: true,
      });
    }

    // Update autoOnboarded flag
    if (autoOnboarded) {
      await ctx.db.patch(donationId, { autoOnboarded: true });
    }

    return { id: donationId, duplicate: false, autoOnboarded };
  },
});

// Record a volunteer signup from the support page
export const recordVolunteer = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    county: v.optional(v.string()),
    interests: v.array(v.string()),
    referralCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already onboarded
    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existingProfile) {
      await ctx.db.insert("userProfiles", {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        city: args.city,
        county: args.county,
        zipCode: args.zipCode,
        volunteerInterest: true,
        referralCode: args.referralCode,
        onboardedAt: new Date().toISOString(),
      });
    }

    // Add to supporters CRM
    const existingSupporter = await ctx.db
      .query("supporters")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!existingSupporter) {
      await ctx.db.insert("supporters", {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        city: args.city,
        county: args.county,
        zipCode: args.zipCode,
        source: "volunteer" as const,
        interests: args.interests,
        volunteerWilling: true,
        donorStatus: false,
        totalContributed: 0,
        createdAt: new Date().toISOString(),
        tags: ["volunteer", ...args.interests.map((i) => `interest:${i}`)],
      });
    } else {
      await ctx.db.patch(existingSupporter._id, {
        volunteerWilling: true,
        interests: [...new Set([...existingSupporter.interests, ...args.interests])],
      });
    }

    return { success: true };
  },
});

// Get ActBlue donation stats
export const getDonationStats = query({
  handler: async (ctx) => {
    const donations = await ctx.db.query("actblueDonations").collect();
    const completed = donations.filter((d) => d.status === "completed");
    const totalRaised = completed.reduce((sum, d) => sum + d.amountDollars, 0);
    const uniqueDonors = new Set(completed.map((d) => d.donorEmail)).size;
    const recurring = completed.filter((d) => d.isRecurring);
    const avgDonation = completed.length > 0 ? totalRaised / completed.length : 0;

    return {
      totalRaised,
      totalDonations: completed.length,
      uniqueDonors,
      recurringDonors: recurring.length,
      avgDonation,
      autoOnboarded: completed.filter((d) => d.autoOnboarded).length,
    };
  },
});

// Get recent ActBlue donations
export const getRecentDonations = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    const donations = await ctx.db
      .query("actblueDonations")
      .withIndex("by_processedAt")
      .order("desc")
      .take(limit);
    return donations.map((d) => ({
      id: d._id,
      name: `${d.donorFirstName} ${d.donorLastName.charAt(0)}.`,
      amount: d.amountDollars,
      city: d.donorCity,
      state: d.donorState,
      isRecurring: d.isRecurring,
      processedAt: d.processedAt,
    }));
  },
});
