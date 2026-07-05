import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("endorsements").collect();
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("endorsements").withIndex("by_featured", (q) => q.eq("featured", true)).collect();
  },
});
