import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const promises = await ctx.db.query("promises").collect();
    const results = [];
    for (const p of promises) {
      const candidate = await ctx.db.get(p.candidateId);
      const race = await ctx.db.get(p.raceId);
      results.push({ ...p, candidateName: candidate?.name ?? "Unknown", candidateParty: candidate?.party ?? "other", raceName: race?.title ?? "Unknown" });
    }
    if (args.status) return results.filter((r) => r.status === args.status);
    return results;
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const promises = await ctx.db.query("promises").collect();
    const byStatus: Record<string, number> = { pending: 0, in_progress: 0, fulfilled: 0, broken: 0, modified: 0 };
    for (const p of promises) byStatus[p.status] = (byStatus[p.status] || 0) + 1;
    return { total: promises.length, byStatus };
  },
});
