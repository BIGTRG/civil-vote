import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("notifications").order("desc").collect();
    return all.slice(0, args.limit || 50);
  },
});

export const getUnread = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notifications").withIndex("by_read", q => q.eq("read", false)).order("desc").collect();
  },
});

export const markRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true });
  },
});

export const markAllRead = mutation({
  args: {},
  handler: async (ctx) => {
    const unread = await ctx.db.query("notifications").withIndex("by_read", q => q.eq("read", false)).collect();
    for (const n of unread) {
      await ctx.db.patch(n._id, { read: true });
    }
    return { marked: unread.length };
  },
});

export const addNotification = mutation({
  args: {
    title: v.string(),
    message: v.string(),
    type: v.union(v.literal("race_update"), v.literal("poll_result"), v.literal("finance_update"), v.literal("campaign_news"), v.literal("system")),
    actionUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      ...args,
      userId: undefined,
      read: false,
      createdAt: new Date().toISOString(),
    });
  },
});

export const bulkAddNotifications = mutation({
  args: {
    notifications: v.array(v.object({
      title: v.string(),
      message: v.string(),
      type: v.union(v.literal("race_update"), v.literal("poll_result"), v.literal("finance_update"), v.literal("campaign_news"), v.literal("system")),
      actionUrl: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const n of args.notifications) {
      await ctx.db.insert("notifications", {
        ...n,
        userId: undefined,
        read: false,
        createdAt: new Date().toISOString(),
      });
      count++;
    }
    return { inserted: count };
  },
});
