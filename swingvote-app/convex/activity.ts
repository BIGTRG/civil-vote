import { query } from "./_generated/server";

export const recent = query({
  handler: async (ctx) => {
    const activities = await ctx.db
      .query("activityFeed")
      .order("desc")
      .take(50);
    return activities;
  },
});
