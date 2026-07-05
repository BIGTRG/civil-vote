import { mutation } from "./_generated/server";

// Key competitive 2026 House races -- battleground districts that will decide majority
// Focus on R-held seats in Harris-won districts + competitive swing districts

const HOUSE_RACES = [
  // ===== REPUBLICAN SEATS IN HARRIS-WON DISTRICTS (Top D targets) =====
  { title: "California CD-22 (2026)", state: "CA", district: "CD-22", description: "Redrawn Fresno-area district. Blue-leaning after redistricting. Top D pickup target." },
  { title: "California CD-27 (2026)", state: "CA", district: "CD-27", description: "Mike Garcia seat. Los Angeles suburbs. Redistricted bluer. Perennial battleground." },
  { title: "California CD-40 (2026)", state: "CA", district: "CD-40", description: "Young Kim seat. Orange County. Harris+3 district. Competitive suburban swing." },
  { title: "California CD-45 (2026)", state: "CA", district: "CD-45", description: "Michelle Steel seat. Orange County/coastal. Redistricted to favor Democrats." },
  { title: "New York CD-04 (2026)", state: "NY", district: "CD-04", description: "Anthony D'Esposito seat. Long Island. Biden+15 in 2020. Prime D target." },
  { title: "New York CD-17 (2026)", state: "NY", district: "CD-17", description: "Mike Lawler seat. Hudson Valley. Narrow R win in 2024. Key suburban swing." },
  { title: "New York CD-19 (2026)", state: "NY", district: "CD-19", description: "Marc Molinaro seat. Hudson Valley/Catskills. Competitive swing district." },
  { title: "Pennsylvania CD-01 (2026)", state: "PA", district: "CD-01", description: "Brian Fitzpatrick seat. Bucks County. Biden+5 district. Moderate R incumbent." },
  { title: "Utah CD-02 (2026)", state: "UT", district: "CD-02", description: "Court-ordered redistricting created competitive Salt Lake City district." },

  // ===== NARROW TRUMP DISTRICTS (Competitive swing) =====
  { title: "Arizona CD-01 (2026)", state: "AZ", district: "CD-01", description: "David Schweikert seat. Scottsdale/Phoenix suburbs. Narrowly R. Suburban swing." },
  { title: "Arizona CD-06 (2026)", state: "AZ", district: "CD-06", description: "Juan Ciscomani seat. Tucson area. Trump+2. Competitive border district." },
  { title: "Colorado CD-08 (2026)", state: "CO", district: "CD-08", description: "Yadira Caraveo lost this seat in 2024. Denver suburbs. Newly competitive." },
  { title: "Iowa CD-01 (2026)", state: "IA", district: "CD-01", description: "Mariannette Miller-Meeks seat. Eastern Iowa. Won by 6 in 2024 but trending." },
  { title: "Michigan CD-07 (2026)", state: "MI", district: "CD-07", description: "Tom Barrett seat. Lansing area. Swing district in swing state." },
  { title: "Michigan CD-08 (2026)", state: "MI", district: "CD-08", description: "Northern Michigan/Flint suburbs. Competitive swing district." },
  { title: "Nebraska CD-02 (2026)", state: "NE", district: "CD-02", description: "Omaha district. Split electoral vote. D pickup opportunity in red state." },
  { title: "Nevada CD-03 (2026)", state: "NV", district: "CD-03", description: "Las Vegas suburbs. Susie Lee (D) defending. Key hold for D majority." },
  { title: "North Carolina CD-01 (2026)", state: "NC", district: "CD-01", description: "Don Davis (D) defending. Eastern NC. Competitive after redistricting." },
  { title: "Ohio CD-09 (2026)", state: "OH", district: "CD-09", description: "Toledo/Cleveland suburbs. Marcy Kaptur lost in 2024. D wants it back." },
  { title: "Oregon CD-05 (2026)", state: "OR", district: "CD-05", description: "Lori Chavez-DeRemer won in 2024 then joined cabinet. Special election swing." },
  { title: "Pennsylvania CD-07 (2026)", state: "PA", district: "CD-07", description: "Susan Wild lost in 2024. Lehigh Valley. D recapture target." },
  { title: "Pennsylvania CD-08 (2026)", state: "PA", district: "CD-08", description: "Matt Cartwright lost in 2024. NE Pennsylvania. Working-class swing." },
  { title: "Pennsylvania CD-10 (2026)", state: "PA", district: "CD-10", description: "Scott Perry retired seat. Harrisburg area. Suburban shift creates opportunity." },
  { title: "Texas CD-34 (2026)", state: "TX", district: "CD-34", description: "South Texas border district. Flipped R in 2024. D wants to reclaim." },
  { title: "Wisconsin CD-01 (2026)", state: "WI", district: "CD-01", description: "Bryan Steil seat. Kenosha/Racine. Competitive SE Wisconsin." },
  { title: "Wisconsin CD-03 (2026)", state: "WI", district: "CD-03", description: "Derrick Van Orden seat. Western Wisconsin. Rural swing district." },
  { title: "Virginia CD-02 (2026)", state: "VA", district: "CD-02", description: "Jen Kiggans seat. Virginia Beach. Military/suburban. Swing district." },
  { title: "Virginia CD-07 (2026)", state: "VA", district: "CD-07", description: "Richmond suburbs. Competitive suburban swing district." },
];

export const seedHouseRaces = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("races").collect();
    const hasHouse = existing.some(r => r.title.includes("CD-"));
    if (hasHouse) return "House races already seeded";

    let count = 0;
    for (const race of HOUSE_RACES) {
      const raceId = await ctx.db.insert("races", {
        title: race.title,
        state: race.state,
        district: race.district,
        type: "federal",
        electionDate: "2026-11-03",
        status: "active",
        description: race.description,
        totalPledges: Math.floor(Math.random() * 3000) + 200,
        totalRaised: Math.floor(Math.random() * 100000) + 5000,
      });

      // Placeholder D and R candidates
      await ctx.db.insert("candidates", {
        name: "Democratic Nominee",
        raceId,
        party: "democrat",
        bio: "Democratic candidate for this competitive district. Details to follow as campaigns develop.",
        positions: [{ issue: "Economy", stance: "Working families first" }, { issue: "Healthcare", stance: "Protect and expand ACA" }],
        endorsements: [],
        pledgeCount: Math.floor(Math.random() * 1000) + 50,
        totalRaised: Math.floor(Math.random() * 50000) + 2000,
      });
      await ctx.db.insert("candidates", {
        name: "Republican Nominee",
        raceId,
        party: "republican",
        bio: "Republican candidate for this competitive district. Details to follow as campaigns develop.",
        positions: [{ issue: "Economy", stance: "Tax cuts, deregulation" }, { issue: "Border", stance: "Border security" }],
        endorsements: [],
        pledgeCount: Math.floor(Math.random() * 1000) + 50,
        totalRaised: Math.floor(Math.random() * 50000) + 2000,
      });
      count++;
    }
    return `Seeded ${count} competitive House races`;
  },
});
