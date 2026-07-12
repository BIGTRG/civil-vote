import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Auth routes
auth.addHttpRoutes(http);

// ========== ADMIN DATA ENDPOINTS ==========

// Add news articles
http.route({
  path: "/__admin/add_news",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.news.bulkAddArticles, {
      articles: body.articles,
    });
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Add canvassing turfs
http.route({
  path: "/__admin/add_turfs",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.canvassing.bulkAddTurfs, {
      turfs: body.turfs,
    });
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Add civic info
http.route({
  path: "/__admin/add_civic_info",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.civicInfo.bulkAddCivicInfo, {
      items: body.items,
    });
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Add notifications
http.route({
  path: "/__admin/add_notifications",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.notifications.bulkAddNotifications, {
      notifications: body.notifications,
    });
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Add race ratings (bulk)
http.route({
  path: "/addRaceRatings",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const ratings = body.ratings || [];
    let count = 0;
    for (const r of ratings) {
      await ctx.runMutation(api.liveData.addRaceRating, r);
      count++;
    }
    return new Response(JSON.stringify({ inserted: count }), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Add polling data (bulk)
http.route({
  path: "/addPollingData",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const polls = body.polls || [];
    let count = 0;
    for (const p of polls) {
      await ctx.runMutation(api.liveData.addPollingData, p);
      count++;
    }
    return new Response(JSON.stringify({ inserted: count }), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Update candidate finance data
http.route({
  path: "/updateFinanceV2",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const updates = body.updates || [];
    let count = 0;
    for (const u of updates) {
      try {
        await ctx.runMutation(api.candidates.updateFinance, u);
        count++;
      } catch (e) {
        // Skip failed updates
      }
    }
    return new Response(JSON.stringify({ updated: count }), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Health check
http.route({
  path: "/__admin/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }), {
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
