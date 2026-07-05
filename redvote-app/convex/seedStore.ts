import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) return "Products already seeded";

    const products = [
      // APPAREL
      { name: "Vote Red Classic Tee", description: "Premium cotton tee with bold VOTE RED lettering. Show your strength.", price: 29.99, category: "apparel" as const, imageEmoji: "👕", sizes: ["S","M","L","XL","2XL"], colors: ["Red","Burgundy","Black"], inStock: true, featured: true, sortOrder: 1 },
      { name: "American Eagle Hoodie", description: "Heavyweight hoodie with embroidered eagle and flag crest. Built tough.", price: 59.99, category: "apparel" as const, imageEmoji: "🧥", sizes: ["S","M","L","XL","2XL"], colors: ["Red","Charcoal"], inStock: true, featured: true, sortOrder: 2 },
      { name: "RedWave 2026 Tank", description: "Lightweight tank for rallies and town halls. Let them know where you stand.", price: 24.99, category: "apparel" as const, imageEmoji: "👚", sizes: ["S","M","L","XL"], colors: ["Red","White"], inStock: true, featured: false, sortOrder: 3 },
      { name: "Freedom First Polo", description: "Professional polo for fundraisers and debates. Sharp and patriotic.", price: 39.99, category: "apparel" as const, imageEmoji: "👔", sizes: ["S","M","L","XL","2XL"], colors: ["Red","Navy"], inStock: true, featured: false, sortOrder: 4 },
      { name: "Patriot Joggers", description: "Comfortable joggers with red accent stripe. Relax, but stay ready.", price: 44.99, category: "apparel" as const, imageEmoji: "👖", sizes: ["S","M","L","XL"], colors: ["Red","Grey"], inStock: true, featured: false, sortOrder: 5 },

      // ACCESSORIES
      { name: "RedVote Trucker Cap", description: "Structured trucker cap with embroidered RV logo. Classic American look.", price: 27.99, category: "accessories" as const, imageEmoji: "🧢", sizes: ["One Size"], colors: ["Red/White","All Red"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Liberty Pin Set (5-Pack)", description: "Five enamel pins -- Vote Red, 2A, Freedom, Patriots, Lead. Collect them all.", price: 14.99, category: "accessories" as const, imageEmoji: "📌", inStock: true, featured: false, sortOrder: 2 },
      { name: "Canvas Tote -- 'Carry Freedom'", description: "Heavy-duty canvas tote for daily use. Stars and stripes accent. 100% cotton.", price: 19.99, category: "accessories" as const, imageEmoji: "👜", colors: ["Natural","Red"], inStock: true, featured: false, sortOrder: 3 },
      { name: "RedVote Phone Case", description: "Slim protective case with matte red finish and RV monogram. Fits iPhone & Samsung.", price: 24.99, category: "accessories" as const, imageEmoji: "📱", inStock: true, featured: false, sortOrder: 4 },
      { name: "Patriot Wristband 3-Pack", description: "Silicone wristbands -- VOTE, FREEDOM, STRENGTH. Share at rallies.", price: 9.99, category: "accessories" as const, imageEmoji: "⌚", colors: ["Red","White","Blue"], inStock: true, featured: false, sortOrder: 5 },

      // YARD SIGNS
      { name: "Vote Red Yard Sign (18x24)", description: "Corrugated plastic yard sign with H-stake. Weatherproof all season.", price: 12.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: true, sortOrder: 1 },
      { name: "RedWave Yard Sign (24x36)", description: "Oversized yard sign -- loud and proud. Double-sided. Metal frame included.", price: 19.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: false, sortOrder: 2 },
      { name: "Window Cling -- 'I Voted Red'", description: "Removable window cling for car or home. 6-inch diameter.", price: 4.99, category: "yard_signs" as const, imageEmoji: "🏠", inStock: true, featured: false, sortOrder: 3 },

      // STICKERS
      { name: "RedVote Sticker Pack (10)", description: "10 die-cut vinyl stickers -- laptops, trucks, everywhere. Waterproof.", price: 7.99, category: "stickers" as const, imageEmoji: "🏷️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Bumper Sticker -- 'Vote Red 2026'", description: "UV-resistant bumper sticker. Built to last through November.", price: 3.99, category: "stickers" as const, imageEmoji: "🚗", inStock: true, featured: false, sortOrder: 2 },
      { name: "Metallic 'RV' Sticker", description: "Premium metallic sticker with red chrome finish. Limited edition.", price: 5.99, category: "stickers" as const, imageEmoji: "✨", inStock: true, featured: false, sortOrder: 3 },

      // DRINKWARE
      { name: "RedVote Insulated Tumbler", description: "20oz stainless steel tumbler. Keeps coffee hot through a sunrise rally.", price: 32.99, category: "drinkware" as const, imageEmoji: "🥤", colors: ["Red","Red Gradient"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Freedom Mug", description: "Ceramic mug with 'Freedom isn't free -- but your vote is' quote. 15oz.", price: 16.99, category: "drinkware" as const, imageEmoji: "☕", colors: ["White/Red","Red"], inStock: true, featured: false, sortOrder: 2 },
      { name: "Campaign Water Bottle", description: "BPA-free 24oz water bottle with flip lid. Stay strong, stay hydrated.", price: 14.99, category: "drinkware" as const, imageEmoji: "🫗", colors: ["Red","Clear/Red"], inStock: true, featured: false, sortOrder: 3 },

      // DIGITAL
      { name: "RedVote Digital Wallpaper Pack", description: "Phone + desktop wallpapers. 12 patriotic designs through November.", price: 2.99, category: "digital" as const, imageEmoji: "🖼️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Social Media Frame Kit", description: "Profile frames, story templates, and shareable graphics for all platforms.", price: 4.99, category: "digital" as const, imageEmoji: "📲", inStock: true, featured: false, sortOrder: 2 },
      { name: "Printable Poster Pack", description: "High-resolution posters and flyers for local organizing. Print at home.", price: 6.99, category: "digital" as const, imageEmoji: "🖨️", inStock: true, featured: false, sortOrder: 3 },
    ];

    for (const p of products) {
      await ctx.db.insert("products", p);
    }
    return `Seeded ${products.length} products`;
  },
});
