import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) return "Products already seeded";

    const products = [
      // APPAREL
      { name: "SwingVote Classic Tee", description: "Premium cotton tee with the SV emblem. Wear your independence.", price: 29.99, category: "apparel" as const, imageEmoji: "👕", sizes: ["S","M","L","XL","2XL"], colors: ["Purple","Gold","Black"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Independent Hoodie", description: "Heavyweight hoodie with gradient purple-to-gold embroidery. Cozy and bold.", price: 59.99, category: "apparel" as const, imageEmoji: "🧥", sizes: ["S","M","L","XL","2XL"], colors: ["Purple","Charcoal"], inStock: true, featured: true, sortOrder: 2 },
      { name: "'You Decide' Tank", description: "Lightweight tank with the SwingVote motto. For rallies, runs, and real talk.", price: 24.99, category: "apparel" as const, imageEmoji: "👚", sizes: ["S","M","L","XL"], colors: ["Purple","White"], inStock: true, featured: false, sortOrder: 3 },
      { name: "Centrist Polo", description: "Sharp polo for debates and town halls. Neither left nor right -- forward.", price: 39.99, category: "apparel" as const, imageEmoji: "👔", sizes: ["S","M","L","XL","2XL"], colors: ["Purple","Gold"], inStock: true, featured: false, sortOrder: 4 },
      { name: "Swing State Joggers", description: "Comfortable joggers with purple accent stripe. Relaxed but ready.", price: 44.99, category: "apparel" as const, imageEmoji: "👖", sizes: ["S","M","L","XL"], colors: ["Purple","Grey"], inStock: true, featured: false, sortOrder: 5 },

      // ACCESSORIES
      { name: "SwingVote Dad Hat", description: "Unstructured cap with embroidered SV logo. Classic, clean, independent.", price: 27.99, category: "accessories" as const, imageEmoji: "🧢", sizes: ["One Size"], colors: ["Purple/Gold","Black/Gold"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Balancer Pin Set (5-Pack)", description: "Five enamel pins -- Swing, Balance, Think, Vote, Decide. Conversation starters.", price: 14.99, category: "accessories" as const, imageEmoji: "📌", inStock: true, featured: false, sortOrder: 2 },
      { name: "Canvas Tote -- 'Think First'", description: "Heavy-duty canvas tote for daily use. Purple and gold accent stitching.", price: 19.99, category: "accessories" as const, imageEmoji: "👜", colors: ["Natural/Purple","Black/Gold"], inStock: true, featured: false, sortOrder: 3 },
      { name: "SwingVote Phone Case", description: "Slim protective case with gradient purple-gold finish and SV monogram.", price: 24.99, category: "accessories" as const, imageEmoji: "📱", inStock: true, featured: false, sortOrder: 4 },
      { name: "Independent Wristband 3-Pack", description: "Silicone wristbands -- THINK, DECIDE, VOTE. Share at events.", price: 9.99, category: "accessories" as const, imageEmoji: "⌚", colors: ["Purple","Gold","White"], inStock: true, featured: false, sortOrder: 5 },

      // YARD SIGNS
      { name: "SwingVote Yard Sign (18x24)", description: "Purple and gold yard sign -- 'I Vote Issues, Not Parties.' Weatherproof.", price: 12.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: true, sortOrder: 1 },
      { name: "'You Decide' Yard Sign (24x36)", description: "Oversized statement yard sign. Double-sided with metal frame.", price: 19.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: false, sortOrder: 2 },
      { name: "Window Cling -- 'Independent Voter'", description: "Removable window cling for car or home. 6-inch diameter.", price: 4.99, category: "yard_signs" as const, imageEmoji: "🏠", inStock: true, featured: false, sortOrder: 3 },

      // STICKERS
      { name: "SwingVote Sticker Pack (10)", description: "10 die-cut vinyl stickers -- laptops, bottles, everywhere. Waterproof.", price: 7.99, category: "stickers" as const, imageEmoji: "🏷️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Bumper Sticker -- 'You Decide 2026'", description: "UV-resistant bumper sticker. Built to last through November and beyond.", price: 3.99, category: "stickers" as const, imageEmoji: "🚗", inStock: true, featured: false, sortOrder: 2 },
      { name: "Holographic SV Sticker", description: "Premium holographic sticker with shifting purple-gold colors. Limited edition.", price: 5.99, category: "stickers" as const, imageEmoji: "✨", inStock: true, featured: false, sortOrder: 3 },

      // DRINKWARE
      { name: "SwingVote Insulated Tumbler", description: "20oz stainless steel tumbler with gradient finish. Hot or cold, stay independent.", price: 32.99, category: "drinkware" as const, imageEmoji: "🥤", colors: ["Purple Gradient","Gold Gradient"], inStock: true, featured: true, sortOrder: 1 },
      { name: "'Think First' Mug", description: "Ceramic mug with 'Think first. Vote second. No regrets.' 15oz.", price: 16.99, category: "drinkware" as const, imageEmoji: "☕", colors: ["White/Purple","Black/Gold"], inStock: true, featured: false, sortOrder: 2 },
      { name: "Campaign Water Bottle", description: "BPA-free 24oz water bottle with flip lid. Stay clear-headed.", price: 14.99, category: "drinkware" as const, imageEmoji: "🫗", colors: ["Purple","Clear/Gold"], inStock: true, featured: false, sortOrder: 3 },

      // DIGITAL
      { name: "SwingVote Digital Wallpaper Pack", description: "Phone + desktop wallpapers. 12 independent-minded designs.", price: 2.99, category: "digital" as const, imageEmoji: "🖼️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Social Media Frame Kit", description: "Profile frames, story templates, and shareable graphics. Purple and gold.", price: 4.99, category: "digital" as const, imageEmoji: "📲", inStock: true, featured: false, sortOrder: 2 },
      { name: "Printable Poster Pack", description: "High-resolution posters and flyers for local organizing. Print at home.", price: 6.99, category: "digital" as const, imageEmoji: "🖨️", inStock: true, featured: false, sortOrder: 3 },
    ];

    for (const p of products) {
      await ctx.db.insert("products", p);
    }
    return `Seeded ${products.length} products`;
  },
});
