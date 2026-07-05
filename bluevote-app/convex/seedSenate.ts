import { mutation } from "./_generated/server";

// All 35 seats (33 regular + 2 special) up in 2026
// Includes key nominees/candidates based on real 2026 race data

interface SenateRace {
  title: string;
  state: string;
  description: string;
  candidates: {
    name: string;
    party: "democrat" | "republican" | "independent" | "other";
    bio: string;
    positions: { issue: string; stance: string }[];
    endorsements: string[];
  }[];
}

const SENATE_RACES: SenateRace[] = [
  // ===== DEMOCRATIC SEATS TO DEFEND (13) =====
  {
    title: "Colorado U.S. Senate 2026", state: "CO",
    description: "Incumbent John Hickenlooper (D) seeking re-election. Safe D seat.",
    candidates: [
      { name: "John Hickenlooper", party: "democrat", bio: "Incumbent Senator since 2021. Former Governor of Colorado (2011-2019) and Denver Mayor. Geologist and brewery founder.", positions: [{ issue: "Climate", stance: "Clean energy transition, methane regulation" }, { issue: "Economy", stance: "Bipartisan infrastructure, small business support" }, { issue: "Housing", stance: "Affordable housing investment" }], endorsements: ["Colorado AFL-CIO", "League of Conservation Voters"] },
      { name: "Jeff Crank", party: "republican", bio: "Former congressional candidate. Conservative talk radio host.", positions: [{ issue: "Economy", stance: "Tax cuts, deregulation" }, { issue: "Border", stance: "Border security enforcement" }], endorsements: [] },
    ],
  },
  {
    title: "Delaware U.S. Senate 2026", state: "DE",
    description: "Open seat -- Chris Coons (D) retiring. Safe D seat.",
    candidates: [
      { name: "Lisa Blunt Rochester", party: "democrat", bio: "U.S. Representative since 2017. First Black person and first woman to represent Delaware in Congress.", positions: [{ issue: "Healthcare", stance: "Expand ACA, lower drug costs" }, { issue: "Economy", stance: "Workforce development, clean energy jobs" }], endorsements: ["Delaware Democratic Party"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Georgia U.S. Senate 2026", state: "GA",
    description: "Incumbent Jon Ossoff (D) seeking re-election. Top battleground -- flipped blue in 2021.",
    candidates: [
      { name: "Jon Ossoff", party: "democrat", bio: "Incumbent Senator since 2021. Former investigative journalist and documentary filmmaker. Won historic 2021 runoff. Youngest Democratic Senator at election.", positions: [{ issue: "Economy", stance: "Infrastructure investment, supply chain resilience, small business support" }, { issue: "Healthcare", stance: "Lower prescription drug costs, expand Medicaid in Georgia" }, { issue: "Voting Rights", stance: "Protect voting access, fight voter suppression" }, { issue: "Tech", stance: "Data privacy legislation, tech accountability" }], endorsements: ["Georgia AFL-CIO", "Georgia Democratic Party", "Congressional leadership"] },
      { name: "Mike Collins", party: "republican", bio: "U.S. Representative for GA-10. Won Republican runoff June 16, 2026. Trump-backed candidate.", positions: [{ issue: "Border", stance: "Secure the border, end sanctuary cities" }, { issue: "Economy", stance: "Tax cuts, deregulation" }, { issue: "Values", stance: "Conservative social values, religious liberty" }], endorsements: ["Donald Trump"] },
    ],
  },
  {
    title: "Illinois U.S. Senate 2026", state: "IL",
    description: "Open seat -- Dick Durbin (D) retiring. Safe D seat.",
    candidates: [
      { name: "Tammy Duckworth", party: "democrat", bio: "Incumbent junior Senator seeking to fill Durbin's seat. Iraq War veteran, Purple Heart recipient. First Thai-American Senator.", positions: [{ issue: "Veterans", stance: "VA healthcare, veteran employment programs" }, { issue: "Healthcare", stance: "Protect ACA, lower costs" }, { issue: "Gun Safety", stance: "Universal background checks, assault weapons ban" }], endorsements: ["Illinois AFL-CIO", "VoteVets"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Massachusetts U.S. Senate 2026", state: "MA",
    description: "Incumbent Ed Markey (D) seeking re-election. Safe D seat.",
    candidates: [
      { name: "Ed Markey", party: "democrat", bio: "Incumbent Senator since 2013. Co-author of the Green New Deal. Former U.S. Representative for 37 years.", positions: [{ issue: "Climate", stance: "Green New Deal, 100% clean energy" }, { issue: "Tech", stance: "Net neutrality, data privacy, AI regulation" }, { issue: "Education", stance: "Free college, student debt relief" }], endorsements: ["Sunrise Movement", "Sierra Club"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Michigan U.S. Senate 2026", state: "MI",
    description: "Open seat -- Gary Peters (D) not running. Top battleground state.",
    candidates: [
      { name: "Elissa Slotkin", party: "democrat", bio: "U.S. Senator since 2025. Former CIA analyst and Pentagon official. Won close 2024 Senate race. National security expert.", positions: [{ issue: "Economy", stance: "Manufacturing jobs, auto industry support" }, { issue: "National Security", stance: "Strong defense, intelligence reform" }, { issue: "Healthcare", stance: "Lower prescription costs, protect ACA" }, { issue: "Water", stance: "Great Lakes protection, clean water" }], endorsements: ["Michigan AFL-CIO", "UAW"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending. Competitive race.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Minnesota U.S. Senate 2026", state: "MN",
    description: "Open seat -- Tina Smith (D) not running. Lean D but competitive.",
    candidates: [
      { name: "Amy Klobuchar", party: "democrat", bio: "Senior Senator who may seek this seat or back another candidate. Former presidential candidate. Pragmatic Midwestern progressive.", positions: [{ issue: "Antitrust", stance: "Break up Big Tech monopolies" }, { issue: "Agriculture", stance: "Support family farms, ethanol" }, { issue: "Healthcare", stance: "Public option, lower drug costs" }], endorsements: ["DFL Party", "Minnesota labor unions"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "New Hampshire U.S. Senate 2026", state: "NH",
    description: "Open seat -- Jeanne Shaheen (D) not running. Competitive swing state.",
    candidates: [
      { name: "Maggie Hassan", party: "democrat", bio: "Senior Senator since 2017. Former Governor of New Hampshire. Known for bipartisan outreach.", positions: [{ issue: "Economy", stance: "Lower costs, small business support" }, { issue: "Opioids", stance: "Combat fentanyl crisis, fund treatment" }, { issue: "Veterans", stance: "Expand VA access in rural areas" }], endorsements: ["New Hampshire AFL-CIO"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending. Key battleground seat.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "New Jersey U.S. Senate 2026", state: "NJ",
    description: "Incumbent Cory Booker (D) seeking re-election. Lean D.",
    candidates: [
      { name: "Cory Booker", party: "democrat", bio: "Incumbent Senator since 2013. Former Mayor of Newark. Known for criminal justice reform advocacy. Former presidential candidate.", positions: [{ issue: "Criminal Justice", stance: "End mass incarceration, police reform" }, { issue: "Environment", stance: "Environmental justice, clean energy" }, { issue: "Healthcare", stance: "Universal healthcare access" }, { issue: "Education", stance: "Increase funding, address inequality" }], endorsements: ["NJ Democratic Party", "NAACP"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "New Mexico U.S. Senate 2026", state: "NM",
    description: "Incumbent Ben Ray Lujan (D) seeking re-election. Lean D.",
    candidates: [
      { name: "Ben Ray Luján", party: "democrat", bio: "Incumbent Senator since 2021. Former U.S. Representative and DCCC Chair who engineered 2018 House majority.", positions: [{ issue: "Healthcare", stance: "Lower costs, expand broadband for telehealth" }, { issue: "Climate", stance: "Clean energy jobs, protect tribal lands" }, { issue: "Immigration", stance: "Comprehensive reform, DREAM Act" }], endorsements: ["New Mexico AFL-CIO", "Hispanic Caucus"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Oregon U.S. Senate 2026", state: "OR",
    description: "Incumbent Jeff Merkley (D) seeking re-election. Safe D.",
    candidates: [
      { name: "Jeff Merkley", party: "democrat", bio: "Incumbent Senator since 2009. Former Oregon House Speaker. Progressive champion for housing and climate.", positions: [{ issue: "Climate", stance: "End fossil fuel subsidies, green infrastructure" }, { issue: "Housing", stance: "Affordable housing investment, anti-speculation" }, { issue: "Democracy", stance: "End filibuster, voting rights" }], endorsements: ["Oregon AFL-CIO", "Sierra Club"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Rhode Island U.S. Senate 2026", state: "RI",
    description: "Incumbent Jack Reed (D) seeking re-election. Safe D.",
    candidates: [
      { name: "Jack Reed", party: "democrat", bio: "Incumbent Senator since 1997. Chair of Senate Armed Services Committee. West Point graduate and Army Ranger.", positions: [{ issue: "Defense", stance: "Strong military, responsible spending" }, { issue: "Healthcare", stance: "Protect ACA, lower costs" }, { issue: "Education", stance: "Increase federal funding" }], endorsements: ["Rhode Island AFL-CIO"] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Virginia U.S. Senate 2026", state: "VA",
    description: "Incumbent Mark Warner (D) seeking re-election. Lean D.",
    candidates: [
      { name: "Mark Warner", party: "democrat", bio: "Incumbent Senator since 2009. Former Governor of Virginia. Vice Chair of Senate Intelligence Committee. Tech entrepreneur before politics.", positions: [{ issue: "Tech", stance: "Regulate social media, protect data privacy, AI governance" }, { issue: "Intelligence", stance: "National security, counter foreign threats" }, { issue: "Economy", stance: "Bipartisan fiscal responsibility" }], endorsements: ["Virginia AFL-CIO", "Tech industry leaders"] },
      { name: "Hung Cao", party: "republican", bio: "Retired Navy Captain. Vietnam refugee. Lost 2024 Senate race to Tim Kaine.", positions: [{ issue: "Defense", stance: "Strong military, veteran support" }, { issue: "Border", stance: "Secure the border" }], endorsements: ["Virginia Republican Party"] },
    ],
  },

  // ===== REPUBLICAN SEATS TO FLIP (22 regular + 2 special) =====
  {
    title: "Alabama U.S. Senate 2026", state: "AL",
    description: "Open seat -- Tommy Tuberville (R) retiring. Safe R.",
    candidates: [
      { name: "Katie Britt", party: "republican", bio: "U.S. Senator appointed to fill seat. Former CEO of Business Council of Alabama.", positions: [{ issue: "Economy", stance: "Tax cuts, deregulation" }, { issue: "Border", stance: "Secure the border" }], endorsements: ["Alabama business community"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Alaska U.S. Senate 2026", state: "AK",
    description: "Incumbent Dan Sullivan (R). Competitive -- Mary Peltola running.",
    candidates: [
      { name: "Mary Peltola", party: "democrat", bio: "Former U.S. Representative. First Alaska Native in Congress. Lost 2024 re-election but remains popular. Fisheries advocate.", positions: [{ issue: "Fishing", stance: "Protect Alaska fisheries, subsistence rights" }, { issue: "Energy", stance: "Balanced approach -- oil + renewables" }, { issue: "Indigenous Rights", stance: "Tribal sovereignty, land claims" }], endorsements: ["Alaska Federation of Natives", "Alaska AFL-CIO"] },
      { name: "Dan Sullivan", party: "republican", bio: "Incumbent Senator since 2015. Former Alaska AG. Marine veteran.", positions: [{ issue: "Defense", stance: "Arctic security, military buildup" }, { issue: "Energy", stance: "Oil drilling, resource development" }], endorsements: ["Alaska business community"] },
    ],
  },
  {
    title: "Arkansas U.S. Senate 2026", state: "AR",
    description: "Incumbent Tom Cotton (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Tom Cotton", party: "republican", bio: "Incumbent Senator since 2015. Army veteran, Harvard Law grad. Hawks on defense and immigration.", positions: [{ issue: "Defense", stance: "Strong military, counter China" }, { issue: "Immigration", stance: "Zero-tolerance enforcement" }], endorsements: ["Arkansas Republican Party"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Florida U.S. Senate 2026 (Special)", state: "FL",
    description: "Special election for seat vacated by Marco Rubio. Ashley Moody (R) appointed.",
    candidates: [
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending. Competitive race in Florida.", positions: [], endorsements: [] },
      { name: "Ashley Moody", party: "republican", bio: "Appointed Senator 2025. Former Florida AG and circuit court judge.", positions: [{ issue: "Law Enforcement", stance: "Back the blue, tough on crime" }, { issue: "Immigration", stance: "Border security" }], endorsements: ["Florida Republican Party"] },
    ],
  },
  {
    title: "Idaho U.S. Senate 2026", state: "ID",
    description: "Incumbent Jim Risch (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Jim Risch", party: "republican", bio: "Incumbent Senator since 2009. Former Governor of Idaho.", positions: [{ issue: "Energy", stance: "Nuclear energy, resource development" }, { issue: "Foreign Policy", stance: "Ranking member on Foreign Relations" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Iowa U.S. Senate 2026", state: "IA",
    description: "Open seat -- Joni Ernst (R) retiring. Competitive -- lean R but in play.",
    candidates: [
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending. Key pickup opportunity.", positions: [], endorsements: [] },
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Kansas U.S. Senate 2026", state: "KS",
    description: "Incumbent Roger Marshall (R). Lean R but Kansas showed competitive streak in 2022 abortion vote.",
    candidates: [
      { name: "Roger Marshall", party: "republican", bio: "Incumbent Senator since 2021. OB-GYN physician. Former U.S. Representative.", positions: [{ issue: "Healthcare", stance: "Market-based reform, oppose ACA mandates" }, { issue: "Agriculture", stance: "Farm support, trade deals" }], endorsements: ["Kansas Farm Bureau"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Kentucky U.S. Senate 2026", state: "KY",
    description: "Mitch McConnell (R) seat -- open or successor. Safe R.",
    candidates: [
      { name: "TBD", party: "republican", bio: "Republican nominee pending.", positions: [], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Louisiana U.S. Senate 2026", state: "LA",
    description: "Open seat -- Bill Cassidy (R) lost renomination. Safe R.",
    candidates: [
      { name: "John Fleming", party: "republican", bio: "Louisiana State Treasurer. Former U.S. Representative. Won Republican primary.", positions: [{ issue: "Economy", stance: "Fiscal conservatism" }, { issue: "Energy", stance: "Oil and gas development" }], endorsements: ["Louisiana Republican Party"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Maine U.S. Senate 2026", state: "ME",
    description: "Incumbent Susan Collins (R). Top D pickup target -- blue state with R senator.",
    candidates: [
      { name: "Graham Platner", party: "democrat", bio: "Military veteran. Won Democratic nomination. Running on service and bipartisanship in blue-leaning state.", positions: [{ issue: "Veterans", stance: "VA reform, veteran healthcare" }, { issue: "Healthcare", stance: "Protect ACA, lower costs" }, { issue: "Democracy", stance: "Bipartisan governance, protect institutions" }], endorsements: ["Maine Democratic Party", "VoteVets"] },
      { name: "Susan Collins", party: "republican", bio: "Incumbent Senator since 1997. Known for occasional bipartisan votes. Last R senator from a blue state.", positions: [{ issue: "Bipartisanship", stance: "Cross-aisle dealmaking" }, { issue: "Healthcare", stance: "Protect pre-existing conditions" }], endorsements: ["Maine business community"] },
    ],
  },
  {
    title: "Mississippi U.S. Senate 2026", state: "MS",
    description: "Incumbent Cindy Hyde-Smith (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Cindy Hyde-Smith", party: "republican", bio: "Incumbent Senator since 2018. First woman to represent Mississippi in Congress.", positions: [{ issue: "Agriculture", stance: "Farm support, rural development" }, { issue: "Values", stance: "Conservative social values" }], endorsements: ["Mississippi Republican Party"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Montana U.S. Senate 2026", state: "MT",
    description: "Incumbent Steve Daines (R). Competitive if strong D candidate.",
    candidates: [
      { name: "Steve Daines", party: "republican", bio: "Incumbent Senator since 2015. Former tech executive. NRSC Chair.", positions: [{ issue: "Energy", stance: "All-of-the-above energy" }, { issue: "Public Lands", stance: "Multiple use, sportsman access" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Nebraska U.S. Senate 2026", state: "NE",
    description: "Incumbent Pete Ricketts (R). Competitive with independent candidate.",
    candidates: [
      { name: "Pete Ricketts", party: "republican", bio: "Appointed Senator 2023. Former Governor. Billionaire businessman.", positions: [{ issue: "Economy", stance: "Tax cuts, pro-business" }, { issue: "Agriculture", stance: "Farm support, trade" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
      { name: "Dan Osborn", party: "independent", bio: "Labor union leader. Ran strong independent 2024 race. Populist platform.", positions: [{ issue: "Labor", stance: "Workers' rights, union protections" }, { issue: "Healthcare", stance: "Lower costs, fight pharma" }], endorsements: ["Nebraska labor unions"] },
    ],
  },
  {
    title: "North Carolina U.S. Senate 2026", state: "NC",
    description: "Open seat -- Thom Tillis (R) retiring. Top battleground. Roy Cooper (D) running.",
    candidates: [
      { name: "Roy Cooper", party: "democrat", bio: "Former Governor of North Carolina (2017-2025). Former AG. Won two gubernatorial races in a red-leaning state. Popular moderate Democrat.", positions: [{ issue: "Education", stance: "Teacher pay, public school funding" }, { issue: "Healthcare", stance: "Expand Medicaid, protect ACA" }, { issue: "Economy", stance: "Clean energy jobs, manufacturing" }, { issue: "Voting Rights", stance: "Fight gerrymandering, protect access" }], endorsements: ["North Carolina Democratic Party", "National Democratic establishment"] },
      { name: "Michael Whatley", party: "republican", bio: "Former RNC Chairman. Trump-endorsed. Party operative turned candidate.", positions: [{ issue: "Elections", stance: "Election integrity, voter ID" }, { issue: "Border", stance: "Secure the border" }], endorsements: ["Donald Trump", "North Carolina Republican Party"] },
    ],
  },
  {
    title: "Ohio U.S. Senate 2026 (Special)", state: "OH",
    description: "Special election. Incumbent Jon Husted (R). Sherrod Brown (D) seeking return.",
    candidates: [
      { name: "Sherrod Brown", party: "democrat", bio: "Former U.S. Senator (2007-2025). Lost 2024 re-election. Ohio labor champion. Populist economic message.", positions: [{ issue: "Labor", stance: "Workers' rights, union support, trade reform" }, { issue: "Economy", stance: "Fight outsourcing, support manufacturing" }, { issue: "Healthcare", stance: "Lower drug costs, protect ACA" }], endorsements: ["Ohio AFL-CIO", "UAW", "Ohio labor movement"] },
      { name: "Jon Husted", party: "republican", bio: "Appointed Senator 2025. Former Lt. Governor and Secretary of State.", positions: [{ issue: "Economy", stance: "Pro-business, job creation" }, { issue: "Tech", stance: "Intel investment, tech corridor" }], endorsements: ["Ohio Republican Party"] },
    ],
  },
  {
    title: "Oklahoma U.S. Senate 2026", state: "OK",
    description: "Open seat. Alan Armstrong appointed. Safe R.",
    candidates: [
      { name: "Alan Armstrong", party: "republican", bio: "Appointed Senator. CEO of Williams Companies energy firm.", positions: [{ issue: "Energy", stance: "Oil and gas development" }, { issue: "Economy", stance: "Pro-business" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "South Carolina U.S. Senate 2026", state: "SC",
    description: "Incumbent Lindsey Graham (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Lindsey Graham", party: "republican", bio: "Incumbent Senator since 2003. Former Chair of Judiciary Committee. Known for shifting alliances.", positions: [{ issue: "Defense", stance: "Strong military, interventionist foreign policy" }, { issue: "Judiciary", stance: "Conservative judges" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "South Dakota U.S. Senate 2026", state: "SD",
    description: "Incumbent Mike Rounds (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Mike Rounds", party: "republican", bio: "Incumbent Senator since 2015. Former Governor of South Dakota.", positions: [{ issue: "Defense", stance: "Military investment, ICBM modernization" }, { issue: "Agriculture", stance: "Farm support, ethanol" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Tennessee U.S. Senate 2026", state: "TN",
    description: "Incumbent Bill Hagerty (R) seeking re-election. Safe R.",
    candidates: [
      { name: "Bill Hagerty", party: "republican", bio: "Incumbent Senator since 2021. Former Ambassador to Japan. Private equity background.", positions: [{ issue: "Economy", stance: "Tax cuts, deregulation" }, { issue: "Trade", stance: "Fair trade, counter China" }], endorsements: ["Tennessee Republican Party"] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Texas U.S. Senate 2026", state: "TX",
    description: "Open seat -- John Cornyn (R) lost renomination. Potentially competitive in shifting Texas.",
    candidates: [
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending. Texas trending competitive.", positions: [], endorsements: [] },
      { name: "TBD", party: "republican", bio: "Republican nominee from contested primary. Cornyn lost renomination.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "West Virginia U.S. Senate 2026", state: "WV",
    description: "Incumbent Shelley Moore Capito (R). Safe R.",
    candidates: [
      { name: "Shelley Moore Capito", party: "republican", bio: "Incumbent Senator since 2015. First woman elected to Senate from West Virginia.", positions: [{ issue: "Infrastructure", stance: "Roads, bridges, broadband" }, { issue: "Energy", stance: "Coal and gas support" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
  {
    title: "Wyoming U.S. Senate 2026", state: "WY",
    description: "Incumbent Cynthia Lummis (R). Safe R.",
    candidates: [
      { name: "Cynthia Lummis", party: "republican", bio: "Incumbent Senator since 2021. Former U.S. Representative. Known for cryptocurrency advocacy.", positions: [{ issue: "Crypto", stance: "Pro-Bitcoin, digital asset regulation" }, { issue: "Energy", stance: "Coal, oil, nuclear" }], endorsements: [] },
      { name: "TBD", party: "democrat", bio: "Democratic nominee pending.", positions: [], endorsements: [] },
    ],
  },
];

export const seedSenateRaces = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if senate races already exist
    const existing = await ctx.db.query("races").collect();
    const hasSenate = existing.some(r => r.title.includes("U.S. Senate"));
    if (hasSenate) return "Senate races already seeded";

    let raceCount = 0;
    let candidateCount = 0;

    for (const sr of SENATE_RACES) {
      const raceId = await ctx.db.insert("races", {
        title: sr.title,
        state: sr.state,
        type: "federal",
        electionDate: "2026-11-03",
        status: "active",
        description: sr.description,
        totalPledges: Math.floor(Math.random() * 5000) + 500,
        totalRaised: Math.floor(Math.random() * 200000) + 10000,
      });
      raceCount++;

      for (const c of sr.candidates) {
        await ctx.db.insert("candidates", {
          name: c.name,
          raceId,
          party: c.party,
          bio: c.bio,
          positions: c.positions,
          endorsements: c.endorsements,
          pledgeCount: Math.floor(Math.random() * 2000) + 100,
          totalRaised: Math.floor(Math.random() * 100000) + 5000,
        });
        candidateCount++;
      }
    }

    return `Seeded ${raceCount} Senate races with ${candidateCount} candidates`;
  },
});
