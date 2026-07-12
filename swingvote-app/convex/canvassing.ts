import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTurfs = query({
  args: { state: v.optional(v.string()), status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.state) {
      return await ctx.db.query("canvassingTurf").withIndex("by_state", q => q.eq("state", args.state!)).collect();
    }
    if (args.status) {
      return await ctx.db.query("canvassingTurf").withIndex("by_status", q => q.eq("status", args.status as any)).collect();
    }
    return await ctx.db.query("canvassingTurf").collect();
  },
});

export const getDoorRecords = query({
  args: { turfId: v.id("canvassingTurf") },
  handler: async (ctx, args) => {
    return await ctx.db.query("doorRecords").withIndex("by_turf", q => q.eq("turfId", args.turfId)).collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const turfs = await ctx.db.query("canvassingTurf").collect();
    const totalDoors = turfs.reduce((s, t) => s + t.totalDoors, 0);
    const doorsKnocked = turfs.reduce((s, t) => s + t.doorsKnocked, 0);
    const positiveContacts = turfs.reduce((s, t) => s + t.positiveContacts, 0);
    const completed = turfs.filter(t => t.status === "completed").length;
    return { totalTurfs: turfs.length, totalDoors, doorsKnocked, positiveContacts, completedTurfs: completed, contactRate: totalDoors > 0 ? Math.round((doorsKnocked / totalDoors) * 100) : 0 };
  },
});

export const addTurf = mutation({
  args: {
    name: v.string(),
    state: v.string(),
    county: v.optional(v.string()),
    district: v.optional(v.string()),
    totalDoors: v.number(),
    zipCodes: v.optional(v.array(v.string())),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("canvassingTurf", {
      ...args,
      assignedTo: undefined,
      doorsKnocked: 0,
      positiveContacts: 0,
      negativeContacts: 0,
      notHome: 0,
      status: "unassigned",
      lastUpdated: new Date().toISOString(),
    });
  },
});

export const recordDoorKnock = mutation({
  args: {
    turfId: v.id("canvassingTurf"),
    address: v.string(),
    voterName: v.optional(v.string()),
    result: v.union(
      v.literal("strong_support"), v.literal("lean_support"), v.literal("undecided"),
      v.literal("lean_oppose"), v.literal("strong_oppose"), v.literal("not_home"), v.literal("refused")
    ),
    notes: v.optional(v.string()),
    canvasserName: v.string(),
    issuesConcerned: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db.insert("doorRecords", {
      ...args,
      knockedAt: new Date().toISOString(),
    });
    const turf = await ctx.db.get(args.turfId);
    if (turf) {
      const updates: Record<string, any> = { doorsKnocked: turf.doorsKnocked + 1, lastUpdated: new Date().toISOString() };
      if (["strong_support", "lean_support"].includes(args.result)) updates.positiveContacts = turf.positiveContacts + 1;
      if (["strong_oppose", "lean_oppose"].includes(args.result)) updates.negativeContacts = turf.negativeContacts + 1;
      if (args.result === "not_home") updates.notHome = turf.notHome + 1;
      if (turf.doorsKnocked + 1 >= turf.totalDoors) updates.status = "completed";
      else if (turf.status === "unassigned") updates.status = "in_progress";
      await ctx.db.patch(args.turfId, updates);
    }
    return record;
  },
});

export const bulkAddTurfs = mutation({
  args: {
    turfs: v.array(v.object({
      name: v.string(),
      state: v.string(),
      county: v.optional(v.string()),
      district: v.optional(v.string()),
      totalDoors: v.number(),
      zipCodes: v.optional(v.array(v.string())),
      lat: v.optional(v.number()),
      lng: v.optional(v.number()),
    })),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const t of args.turfs) {
      await ctx.db.insert("canvassingTurf", {
        ...t,
        assignedTo: undefined,
        doorsKnocked: 0,
        positiveContacts: 0,
        negativeContacts: 0,
        notHome: 0,
        status: "unassigned",
        lastUpdated: new Date().toISOString(),
      });
      count++;
    }
    return { inserted: count };
  },
});
