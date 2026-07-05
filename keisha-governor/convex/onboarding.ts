import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Check if current user has completed onboarding
export const getProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Check by email
export const getProfileByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Complete onboarding
export const completeOnboarding = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    county: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    volunteerInterest: v.boolean(),
    referralCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already onboarded
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    if (existing) return existing._id;

    // Create profile
    const profileId = await ctx.db.insert("userProfiles", {
      ...args,
      onboardedAt: new Date().toISOString(),
    });

    // Also add to supporters table for CRM
    await ctx.db.insert("supporters", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      city: args.city,
      county: args.county,
      zipCode: args.zipCode,
      source: "website" as const,
      interests: args.volunteerInterest ? ["volunteer"] : [],
      volunteerWilling: args.volunteerInterest,
      donorStatus: false,
      totalContributed: 0,
      notes: args.referralCode ? `Referred by: ${args.referralCode}` : undefined,
      createdAt: new Date().toISOString(),
      tags: args.referralCode ? ["referral", `ref:${args.referralCode}`] : ["organic"],
    });

    // If referred, increment referral signup count
    if (args.referralCode) {
      const referral = await ctx.db
        .query("referrals")
        .withIndex("by_referralCode", (q) => q.eq("referralCode", args.referralCode!))
        .first();
      if (referral) {
        await ctx.db.patch(referral._id, {
          totalSignups: referral.totalSignups + 1,
        });
        await ctx.db.insert("referralSignups", {
          referralCode: args.referralCode!,
          referrerName: referral.referrerName,
          signupName: `${args.firstName} ${args.lastName}`,
          signupEmail: args.email,
          source: "link" as const,
          createdAt: new Date().toISOString(),
        });
      }
    }

    return profileId;
  },
});

// Complete onboarding by email (no Convex userId needed -- for Viktor Spaces auth)
export const completeOnboardingByEmail = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    county: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    volunteerInterest: v.boolean(),
    referralCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already onboarded by email
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) return existing._id;

    // Insert profile without userId (Viktor Spaces auth uses email as key)
    const profileId = await ctx.db.insert("userProfiles", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      city: args.city,
      county: args.county,
      zipCode: args.zipCode,
      volunteerInterest: args.volunteerInterest,
      referralCode: args.referralCode,
      onboardedAt: new Date().toISOString(),
    });

    // Also add to supporters table for CRM
    await ctx.db.insert("supporters", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      city: args.city,
      county: args.county,
      zipCode: args.zipCode,
      source: "website" as const,
      interests: args.volunteerInterest ? ["volunteer"] : [],
      volunteerWilling: args.volunteerInterest,
      donorStatus: false,
      totalContributed: 0,
      notes: args.referralCode ? `Referred by: ${args.referralCode}` : undefined,
      createdAt: new Date().toISOString(),
      tags: args.referralCode ? ["referral", `ref:${args.referralCode}`] : ["organic"],
    });

    // If referred, increment referral signup count
    if (args.referralCode) {
      const referral = await ctx.db
        .query("referrals")
        .withIndex("by_referralCode", (q) => q.eq("referralCode", args.referralCode!))
        .first();
      if (referral) {
        await ctx.db.patch(referral._id, {
          totalSignups: referral.totalSignups + 1,
        });
        await ctx.db.insert("referralSignups", {
          referralCode: args.referralCode!,
          referrerName: referral.referrerName,
          signupName: `${args.firstName} ${args.lastName}`,
          signupEmail: args.email,
          source: "link" as const,
          createdAt: new Date().toISOString(),
        });
      }
    }

    return profileId;
  },
});

// Get onboarding stats (for admin)
export const getOnboardingStats = query({
  handler: async (ctx) => {
    const profiles = await ctx.db.query("userProfiles").collect();
    const volunteers = profiles.filter((p) => p.volunteerInterest);
    const referred = profiles.filter((p) => p.referralCode);
    return {
      totalOnboarded: profiles.length,
      totalVolunteers: volunteers.length,
      totalReferred: referred.length,
    };
  },
});
