import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if products already exist
    const existing = await ctx.db.query("products").first();
    if (existing) return "Products already seeded";

    const products = [
      // APPAREL
      { name: "Vote Blue Classic Tee", description: "Premium cotton tee with bold VOTE BLUE lettering. Wear your values.", price: 29.99, category: "apparel" as const, imageEmoji: "👕", sizes: ["S","M","L","XL","2XL"], colors: ["Navy","Royal Blue","Black"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Democracy Defender Hoodie", description: "Heavyweight hoodie with embroidered Democracy Defender crest. Stay warm, stay engaged.", price: 59.99, category: "apparel" as const, imageEmoji: "🧥", sizes: ["S","M","L","XL","2XL"], colors: ["Navy","Charcoal"], inStock: true, featured: true, sortOrder: 2 },
      { name: "BlueWave 2026 Tank", description: "Lightweight tank top perfect for canvassing and rallies. Let them see your commitment.", price: 24.99, category: "apparel" as const, imageEmoji: "👚", sizes: ["S","M","L","XL"], colors: ["Blue","White"], inStock: true, featured: false, sortOrder: 3 },
      { name: "Every Vote Counts Polo", description: "Professional polo for campaign events and debates. Show up sharp.", price: 39.99, category: "apparel" as const, imageEmoji: "👔", sizes: ["S","M","L","XL","2XL"], colors: ["Navy","Light Blue"], inStock: true, featured: false, sortOrder: 4 },
      { name: "Midterm Momentum Joggers", description: "Comfortable joggers with subtle blue accent stripe. Democracy doesn't rest.", price: 44.99, category: "apparel" as const, imageEmoji: "👖", sizes: ["S","M","L","XL"], colors: ["Navy","Grey"], inStock: true, featured: false, sortOrder: 5 },

      // ACCESSORIES
      { name: "BlueVote Trucker Cap", description: "Structured trucker cap with embroidered BV logo. Shade the sun, not your vote.", price: 27.99, category: "accessories" as const, imageEmoji: "🧢", sizes: ["One Size"], colors: ["Navy/White","All Blue"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Democracy Pin Set (5-Pack)", description: "Five enamel pins -- Vote Blue, Register, Volunteer, Donate, Run. Collect them all.", price: 14.99, category: "accessories" as const, imageEmoji: "📌", inStock: true, featured: false, sortOrder: 2 },
      { name: "Canvas Tote -- 'Carry Democracy'", description: "Heavy-duty canvas tote for groceries, books, and ballots. 100% cotton.", price: 19.99, category: "accessories" as const, imageEmoji: "👜", colors: ["Natural","Navy"], inStock: true, featured: false, sortOrder: 3 },
      { name: "BlueVote Phone Case", description: "Slim protective case with matte blue finish and BV monogram. Fits iPhone & Samsung.", price: 24.99, category: "accessories" as const, imageEmoji: "📱", inStock: true, featured: false, sortOrder: 4 },
      { name: "Voter Wristband 3-Pack", description: "Silicone wristbands -- VOTE, ENGAGE, LEAD. Share with friends at the polls.", price: 9.99, category: "accessories" as const, imageEmoji: "⌚", colors: ["Blue","Navy","White"], inStock: true, featured: false, sortOrder: 5 },

      // YARD SIGNS
      { name: "Vote Blue Yard Sign (18x24)", description: "Corrugated plastic yard sign with H-stake included. Weatherproof for the full campaign season.", price: 12.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: true, sortOrder: 1 },
      { name: "BlueWave Yard Sign (24x36)", description: "Oversized yard sign -- impossible to miss. Double-sided. Metal frame included.", price: 19.99, category: "yard_signs" as const, imageEmoji: "🪧", inStock: true, featured: false, sortOrder: 2 },
      { name: "Window Cling -- 'I Voted Blue'", description: "Removable window cling for car or home. 6-inch diameter.", price: 4.99, category: "yard_signs" as const, imageEmoji: "🏠", inStock: true, featured: false, sortOrder: 3 },

      // STICKERS
      { name: "BlueVote Sticker Pack (10)", description: "10 die-cut vinyl stickers -- laptops, water bottles, everywhere. Waterproof.", price: 7.99, category: "stickers" as const, imageEmoji: "🏷️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Bumper Sticker -- 'Vote Blue 2026'", description: "UV-resistant bumper sticker. Won't fade through Election Day.", price: 3.99, category: "stickers" as const, imageEmoji: "🚗", inStock: true, featured: false, sortOrder: 2 },
      { name: "Holographic 'BV' Sticker", description: "Premium holographic sticker with shifting blue colors. Limited edition.", price: 5.99, category: "stickers" as const, imageEmoji: "✨", inStock: true, featured: false, sortOrder: 3 },

      // DRINKWARE
      { name: "BlueVote Insulated Tumbler", description: "20oz stainless steel tumbler. Keeps your drink cold through a 4-hour canvass.", price: 32.99, category: "drinkware" as const, imageEmoji: "🥤", colors: ["Navy","Blue Gradient"], inStock: true, featured: true, sortOrder: 1 },
      { name: "Democracy Mug", description: "Ceramic mug with 'Democracy is not a spectator sport' quote. 15oz.", price: 16.99, category: "drinkware" as const, imageEmoji: "☕", colors: ["White/Blue","Navy"], inStock: true, featured: false, sortOrder: 2 },
      { name: "Campaign Water Bottle", description: "BPA-free 24oz water bottle with flip lid. Hydrate and advocate.", price: 14.99, category: "drinkware" as const, imageEmoji: "🫗", colors: ["Blue","Clear/Blue"], inStock: true, featured: false, sortOrder: 3 },

      // DIGITAL
      { name: "BlueVote Digital Wallpaper Pack", description: "Phone + desktop wallpapers. 12 designs for every month through November.", price: 2.99, category: "digital" as const, imageEmoji: "🖼️", inStock: true, featured: false, sortOrder: 1 },
      { name: "Social Media Frame Kit", description: "Profile frames, story templates, and shareable graphics for all platforms.", price: 4.99, category: "digital" as const, imageEmoji: "📲", inStock: true, featured: false, sortOrder: 2 },
      { name: "Printable Poster Pack", description: "High-resolution posters and flyers for local organizing. Print at home.", price: 6.99, category: "digital" as const, imageEmoji: "🖨️", inStock: true, featured: false, sortOrder: 3 },
    ];

    for (const p of products) {
      await ctx.db.insert("products", p);
    }
    return `Seeded ${products.length} products`;
  },
});
