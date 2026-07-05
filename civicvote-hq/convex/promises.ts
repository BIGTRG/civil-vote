import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Promise Ledger -- "Carfax for Politicians"

export const list = query({
  args: {
    candidateId: v.optional(v.id("candidates")),
    status: v.optional(
      v.union(
        v.literal("made"),
        v.literal("kept"),
        v.literal("broken"),
        v.literal("in_progress"),
        v.literal("modified"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("promises").order("desc").collect();
    let filtered = all;
    if (args.candidateId) {
      filtered = filtered.filter((p) => p.candidateId === args.candidateId);
    }
    if (args.status) {
      filtered = filtered.filter((p) => p.status === args.status);
    }
    // Attach candidate info
    const results = [];
    for (const p of filtered) {
      const candidate = await ctx.db.get(p.candidateId);
      results.push({
        ...p,
        candidateName: candidate
          ? `${candidate.firstName} ${candidate.lastName}`
          : "Unknown",
        candidateParty: candidate?.party ?? "other",
      });
    }
    return results;
  },
});

export const create = mutation({
  args: {
    candidateId: v.id("candidates"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    sourceUrl: v.optional(v.string()),
    datePromised: v.string(),
  },
  handler: async (ctx, args) => {
    const candidate = await ctx.db.get(args.candidateId);
    if (!candidate) throw new Error("Candidate not found");
    const id = await ctx.db.insert("promises", {
      ...args,
      status: "made",
      evidenceHash: generateHash(args.title + args.datePromised),
      lastVerified: new Date().toISOString().split("T")[0],
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("promises"),
    status: v.union(
      v.literal("made"),
      v.literal("kept"),
      v.literal("broken"),
      v.literal("in_progress"),
      v.literal("modified"),
    ),
    evidenceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const promise = await ctx.db.get(args.id);
    if (!promise) throw new Error("Promise not found");
    await ctx.db.patch(args.id, {
      status: args.status,
      lastVerified: new Date().toISOString().split("T")[0],
    });
  },
});

export const remove = mutation({
  args: { id: v.id("promises") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

function generateHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}
