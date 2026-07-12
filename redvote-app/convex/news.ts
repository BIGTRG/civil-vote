import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLatest = query({
  args: { limit: v.optional(v.number()), category: v.optional(v.string()), state: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let articles;
    if (args.state) {
      articles = await ctx.db.query("newsArticles").withIndex("by_state", q => q.eq("state", args.state!)).order("desc").collect();
    } else if (args.category) {
      articles = await ctx.db.query("newsArticles").withIndex("by_category", q => q.eq("category", args.category as any)).order("desc").collect();
    } else {
      articles = await ctx.db.query("newsArticles").withIndex("by_published").order("desc").collect();
    }
    return articles.slice(0, args.limit || 50);
  },
});

export const addArticle = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    source: v.string(),
    url: v.string(),
    imageUrl: v.optional(v.string()),
    publishedAt: v.string(),
    category: v.union(v.literal("national"), v.literal("state"), v.literal("local"), v.literal("policy"), v.literal("campaign"), v.literal("opinion")),
    state: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    sentiment: v.optional(v.union(v.literal("positive"), v.literal("negative"), v.literal("neutral"))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("newsArticles", { ...args, relatedRaceIds: [] });
  },
});

export const bulkAddArticles = mutation({
  args: {
    articles: v.array(v.object({
      title: v.string(),
      summary: v.string(),
      source: v.string(),
      url: v.string(),
      imageUrl: v.optional(v.string()),
      publishedAt: v.string(),
      category: v.union(v.literal("national"), v.literal("state"), v.literal("local"), v.literal("policy"), v.literal("campaign"), v.literal("opinion")),
      state: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
      sentiment: v.optional(v.union(v.literal("positive"), v.literal("negative"), v.literal("neutral"))),
    })),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const a of args.articles) {
      await ctx.db.insert("newsArticles", { ...a, relatedRaceIds: [] });
      count++;
    }
    return { inserted: count };
  },
});
