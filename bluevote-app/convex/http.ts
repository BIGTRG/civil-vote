import { httpRouter } from "convex/server";
import { createViktorAuthRoutes } from "../src/lib/viktor-spaces-access/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();
auth.addHttpRoutes(http);

declare const process: { env: Record<string, string | undefined> };

function viktorAuthRoutes() {
  const resourceId =
    process.env.VIKTOR_AUTH_RESOURCE_ID ||
    process.env.VITE_VIKTOR_SPACES_SPACE_ID ||
    "";
  return createViktorAuthRoutes({
    clientId: process.env.VIKTOR_AUTH_CLIENT_ID || `space-${resourceId}`,
    resourceId,
    viktorAuthBaseUrl:
      process.env.VIKTOR_AUTH_BASE_URL ||
      process.env.VIKTOR_SPACES_API_URL ||
      "",
    successRedirectPath: "/dashboard",
  });
}

http.route({
  path: "/__viktor_auth/callback",
  method: "GET",
  handler: httpAction(async (_ctx, request) =>
    viktorAuthRoutes().callback(request),
  ),
});

http.route({
  path: "/__viktor_auth/me",
  method: "GET",
  handler: httpAction(async (_ctx, request) => viktorAuthRoutes().me(request)),
});

http.route({
  path: "/__viktor_auth/logout",
  method: "POST",
  handler: httpAction(async (_ctx, request) =>
    viktorAuthRoutes().logout(request),
  ),
});


http.route({
  path: "/__admin/seed_party_orgs",
  method: "POST",
  handler: httpAction(async (ctx, _request) => {
    const result = await ctx.runMutation(api.seedPartyOrgs.seedPartyOrgs, {});
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

// Bulk data refresh endpoint -- called by auto-refresh cron
http.route({
  path: "/__admin/refresh_data",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.refreshData.bulkRefresh, body);
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});


// Finance data update endpoint -- called by FEC data refresh
http.route({
  path: "/__admin/update_finance",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.refreshData.updateFinance, body);
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});


http.route({
  path: "/__admin/update_finance_v2",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.refreshData.updateFinanceV2, body);
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

http.route({
  path: "/__admin/add_polling",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.refreshData.addPollingData, body);
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

http.route({
  path: "/__admin/upsert_rating",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const result = await ctx.runMutation(api.refreshData.upsertRaceRating, body);
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

export default http;
