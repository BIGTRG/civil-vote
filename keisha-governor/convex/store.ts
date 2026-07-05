import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ========= PRODUCTS =========

export const getAllProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").withIndex("by_sortOrder").collect();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category as any))
      .collect();
  },
});

export const getFeaturedProducts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

export const getProduct = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

// ========= CART =========

export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    // Enrich with product data
    const enriched = [];
    for (const item of items) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        enriched.push({
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        });
      }
    }
    return enriched;
  },
});

export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if item already in cart
    const existing = await ctx.db
      .query("cartItems")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    const match = existing.find(
      (i) => i.productId === args.productId && i.size === args.size && i.color === args.color
    );
    if (match) {
      await ctx.db.patch(match._id, { quantity: match.quantity + args.quantity });
      return match._id;
    }
    return await ctx.db.insert("cartItems", {
      sessionId: args.sessionId,
      productId: args.productId,
      quantity: args.quantity,
      size: args.size,
      color: args.color,
      addedAt: new Date().toISOString(),
    });
  },
});

export const updateCartQuantity = mutation({
  args: { cartItemId: v.id("cartItems"), quantity: v.number() },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.cartItemId);
    } else {
      await ctx.db.patch(args.cartItemId, { quantity: args.quantity });
    }
  },
});

export const removeFromCart = mutation({
  args: { cartItemId: v.id("cartItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cartItemId);
  },
});

export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    for (const item of items) {
      await ctx.db.delete(item._id);
    }
  },
});

// ========= ORDERS =========

export const placeOrder = mutation({
  args: {
    sessionId: v.string(),
    customerEmail: v.string(),
    customerName: v.string(),
    customerPhone: v.optional(v.string()),
    shippingAddress: v.object({
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    if (cartItems.length === 0) throw new Error("Cart is empty");

    let subtotal = 0;
    let campaignDonation = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (!product) continue;
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      campaignDonation += lineTotal * (product.campaignDonationPercent / 100);
      orderItems.push({
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        unitPrice: product.price,
        lineTotal,
      });
    }

    const shipping = subtotal >= 75 ? 0 : 7.99;
    const total = subtotal + shipping;

    const orderId = await ctx.db.insert("orders", {
      customerEmail: args.customerEmail,
      customerName: args.customerName,
      customerPhone: args.customerPhone,
      items: orderItems,
      subtotal,
      shipping,
      total,
      campaignDonation: Math.round(campaignDonation * 100) / 100,
      shippingAddress: args.shippingAddress,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Clear cart
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }

    return { orderId, total, campaignDonation: Math.round(campaignDonation * 100) / 100 };
  },
});

export const getOrders = query({
  args: { customerEmail: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.customerEmail) {
      return await ctx.db
        .query("orders")
        .withIndex("by_customerEmail", (q) => q.eq("customerEmail", args.customerEmail!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("orders").order("desc").collect();
  },
});

export const getStoreStats = query({
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    const completed = orders.filter((o) => o.status !== "cancelled" && o.status !== "pending");
    return {
      totalOrders: orders.length,
      totalRevenue: completed.reduce((s, o) => s + o.total, 0),
      totalCampaignDonations: completed.reduce((s, o) => s + o.campaignDonation, 0),
      productCount: (await ctx.db.query("products").collect()).length,
    };
  },
});
