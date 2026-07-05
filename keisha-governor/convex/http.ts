import { httpRouter } from "convex/server";
import { createViktorAuthRoutes } from "../src/lib/viktor-spaces-access/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();
auth.addHttpRoutes(http);

// ============================================================
// ActBlue Webhook -- receives donation notifications
// ============================================================
http.route({
  path: "/api/actblue/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();

      // ActBlue sends donation data in this shape:
      // { contribution: { orderNumber, amount, createdAt, ... }, donor: { ... }, lineitems: [...] }
      const contribution = body.contribution || body;
      const donor = body.donor || {};
      const lineitems = body.lineitems || [];

      const orderNumber =
        contribution.orderNumber ||
        contribution.order_number ||
        `manual-${Date.now()}`;
      const amountCents = Math.round(
        (parseFloat(contribution.amount || contribution.amountCents || "0")) *
          (contribution.amount ? 100 : 1)
      );

      await ctx.runMutation(api.actblue.recordDonation, {
        actblueOrderId: String(orderNumber),
        donorFirstName: donor.firstname || donor.first_name || "Anonymous",
        donorLastName: donor.lastname || donor.last_name || "Donor",
        donorEmail: donor.email || "",
        donorPhone: donor.phone || undefined,
        donorAddress: donor.addr1 || donor.address || undefined,
        donorCity: donor.city || undefined,
        donorState: donor.state || undefined,
        donorZip: donor.zip || undefined,
        donorEmployer: donor.employerData?.employer || donor.employer || undefined,
        donorOccupation: donor.employerData?.occupation || donor.occupation || undefined,
        amount: amountCents,
        recurringPeriod: contribution.recurringPeriod || contribution.recurring_period || undefined,
        refcode: contribution.refcode || contribution.refcodeUri || undefined,
        source: contribution.paidAt ? "actblue" : "manual",
        lineItems: lineitems.length > 0 ? JSON.stringify(lineitems) : undefined,
        rawPayload: JSON.stringify(body),
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("ActBlue webhook error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to process webhook" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// CORS preflight for ActBlue webhook
http.route({
  path: "/api/actblue/webhook",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }),
});

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

export default http;
