import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// AI voter matching -- compares user's issue priorities to candidate positions
export const matchCandidates = mutation({
  args: {
    raceId: v.id("races"),
    priorities: v.array(v.object({
      issue: v.string(),
      importance: v.union(v.literal("critical"), v.literal("important"), v.literal("nice_to_have")),
      stance: v.string(),
    })),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const candidates = await ctx.db.query("candidates")
      .withIndex("by_race", q => q.eq("raceId", args.raceId))
      .collect();

    const results = [];
    for (const candidate of candidates) {
      let totalScore = 0;
      let totalWeight = 0;
      const breakdown = [];

      for (const priority of args.priorities) {
        const weight = priority.importance === "critical" ? 3 : priority.importance === "important" ? 2 : 1;
        totalWeight += weight;

        const match = candidate.positions.find(p =>
          p.issue.toLowerCase().includes(priority.issue.toLowerCase()) ||
          priority.issue.toLowerCase().includes(p.issue.toLowerCase())
        );

        let alignment: "strong_match" | "partial_match" | "mismatch" = "mismatch";
        if (match) {
          const stanceLower = match.stance.toLowerCase();
          const userLower = priority.stance.toLowerCase();
          if (stanceLower.includes(userLower) || userLower.includes(stanceLower)) {
            alignment = "strong_match";
            totalScore += weight * 100;
          } else {
            alignment = "partial_match";
            totalScore += weight * 50;
          }
        }

        breakdown.push({ issue: priority.issue, alignment, weight });
      }

      const matchScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
      await ctx.db.insert("voterMatches", {
        sessionId: args.sessionId,
        userId: undefined,
        candidateId: candidate._id,
        raceId: args.raceId,
        matchScore,
        matchBreakdown: breakdown,
        createdAt: new Date().toISOString(),
      });

      results.push({
        candidateId: candidate._id,
        candidateName: candidate.name,
        party: candidate.party,
        matchScore,
        breakdown,
      });
    }

    return results.sort((a, b) => b.matchScore - a.matchScore);
  },
});

export const getMatchHistory = query({
  args: { sessionId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.sessionId) return [];
    const matches = await ctx.db.query("voterMatches").collect();
    return matches.filter(m => m.sessionId === args.sessionId).sort((a, b) => b.matchScore - a.matchScore);
  },
});
