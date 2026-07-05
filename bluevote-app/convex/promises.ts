import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    candidateId: v.optional(v.id("candidates")),
    raceId: v.optional(v.id("races")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let promises;
    if (args.candidateId) {
      promises = await ctx.db.query("promises").withIndex("by_candidate", q => q.eq("candidateId", args.candidateId!)).collect();
    } else if (args.raceId) {
      promises = await ctx.db.query("promises").withIndex("by_race", q => q.eq("raceId", args.raceId!)).collect();
    } else if (args.status) {
      promises = await ctx.db.query("promises").withIndex("by_status", q => q.eq("status", args.status as any)).collect();
    } else {
      promises = await ctx.db.query("promises").collect();
    }

    // Enrich with candidate info
    const enriched = await Promise.all(
      promises.map(async (p) => {
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

export const get = query({
  args: { id: v.id("promises") },
  handler: async (ctx, args) => {
    const promise = await ctx.db.get(args.id);
    if (!promise) return null;
    const candidate = await ctx.db.get(promise.candidateId);
    const race = await ctx.db.get(promise.raceId);
    return { ...promise, candidate, race };
  },
});

export const stats = query({
  handler: async (ctx) => {
    const promises = await ctx.db.query("promises").collect();
    const byStatus = {
      pending: promises.filter(p => p.status === "pending").length,
      in_progress: promises.filter(p => p.status === "in_progress").length,
      fulfilled: promises.filter(p => p.status === "fulfilled").length,
      broken: promises.filter(p => p.status === "broken").length,
      modified: promises.filter(p => p.status === "modified").length,
    };
    return { total: promises.length, byStatus };
  },
});
