import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all products
export const listProducts = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category as any))
        .collect();
    }
    return await ctx.db.query("products").collect();
  },
});

// Get featured products
export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

// Get cart items for session
export const getCartItems = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    // Join with product data
    const enriched = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return { ...item, product };
      })
    );
    return enriched.filter((i) => i.product !== null);
  },
});

// Add to cart
export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    size: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already in cart
    const existing = await ctx.db
      .query("cartItems")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    const match = existing.find(
      (i) =>
        i.productId === args.productId &&
        i.size === args.size &&
        i.color === args.color
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

// Update cart item quantity
export const updateCartQuantity = mutation({
  args: { itemId: v.id("cartItems"), quantity: v.number() },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.itemId);
    } else {
      await ctx.db.patch(args.itemId, { quantity: args.quantity });
    }
  },
});

// Remove from cart
export const removeFromCart = mutation({
  args: { itemId: v.id("cartItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.itemId);
  },
});

// Clear cart
export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    for (const item of items) {
      await ctx.db.delete(item._id);
    }
  },
});
