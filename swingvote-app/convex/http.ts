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


// ========== PUBLIC API v1 ENDPOINTS ==========

// GET /api/v1/races - List all races
http.route({
  path: "/api/v1/races",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const races = await ctx.runQuery(api.races.list, {});
    const filtered = state ? races.filter((r: any) => r.state === state) : races;
    return new Response(JSON.stringify({ races: filtered, total: filtered.length }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }),
});

// GET /api/v1/polling - Latest polling data
http.route({
  path: "/api/v1/polling",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const polls = await ctx.runQuery(api.liveData.getLatestPolls, {});
    return new Response(JSON.stringify({ polls: polls || [] }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }),
});

// GET /api/v1/ratings - Race ratings
http.route({
  path: "/api/v1/ratings",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const ratings = await ctx.runQuery(api.liveData.getRatings, {});
    return new Response(JSON.stringify({ ratings: ratings || [] }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }),
});

// GET /api/v1/news - Latest news
http.route({
  path: "/api/v1/news",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const news = await ctx.runQuery(api.news.getLatest, {});
    return new Response(JSON.stringify({ articles: news || [] }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }),
});

// GET /api/v1/canvassing/stats - Canvassing statistics
http.route({
  path: "/api/v1/canvassing/stats",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const stats = await ctx.runQuery(api.canvassing.getStats, {});
    return new Response(JSON.stringify({ stats }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }),
});

export default http;
