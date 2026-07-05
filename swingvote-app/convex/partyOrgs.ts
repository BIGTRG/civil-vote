import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    party: v.optional(v.string()),
    level: v.optional(v.string()),
    state: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let orgs;
    if (args.party) {
      orgs = await ctx.db.query("partyOrganizations").withIndex("by_party", q => q.eq("party", args.party as "democrat" | "republican")).collect();
    } else if (args.level) {
      orgs = await ctx.db.query("partyOrganizations").withIndex("by_level", q => q.eq("level", args.level as "federal" | "state")).collect();
    } else if (args.state) {
      orgs = await ctx.db.query("partyOrganizations").withIndex("by_state", q => q.eq("state", args.state)).collect();
    } else {
      orgs = await ctx.db.query("partyOrganizations").collect();
    }

    if (args.search) {
      const s = args.search.toLowerCase();
      orgs = orgs.filter(o => o.name.toLowerCase().includes(s) || (o.state && o.state.toLowerCase().includes(s)) || (o.abbreviation && o.abbreviation.toLowerCase().includes(s)));
    }

    return orgs;
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("partyOrganizations").collect();
    const federal = all.filter(o => o.level === "federal");
    const state = all.filter(o => o.level === "state");
    const dem = all.filter(o => o.party === "democrat");
    const rep = all.filter(o => o.party === "republican");
    return { total: all.length, federal: federal.length, state: state.length, democrat: dem.length, republican: rep.length };
  },
});
