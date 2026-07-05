import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingRaces = await ctx.db.query("races").first();
    if (existingRaces) return "Already seeded";

    // 1. Create the race
    const raceId = await ctx.db.insert("races", {
      title: "Georgia Governor 2026",
      state: "GA",
      type: "state",
      electionDate: "2026-11-03",
      status: "active",
      description: "Georgia gubernatorial election. Democrats aim to win the governor's mansion for the first time since 2002. Former Atlanta Mayor Keisha Lance Bottoms won the Democratic primary on May 19, 2026 with President Biden's endorsement.",
      totalPledges: 4847,
      totalRaised: 2400000,
    });

    // 2. Keisha candidate
    const keishaId = await ctx.db.insert("candidates", {
      name: "Keisha Lance Bottoms",
      raceId,
      party: "democrat",
      bio: "Former Mayor of Atlanta (2018-2022), Senior Adviser to President Biden. Won the 2026 Democratic primary with grassroots support. 93% of donations under $100. Endorsed by President Joe Biden, Stacey Abrams, and the Georgia AFL-CIO.",
      positions: [
        { issue: "Healthcare", stance: "Expand Medicaid to cover 500,000+ uninsured Georgians, cap insulin at $35" },
        { issue: "Voting Rights", stance: "Restore and strengthen the Voting Rights Act, oppose voter suppression" },
        { issue: "Education", stance: "$2B investment in public schools, raise teacher pay to national average" },
        { issue: "Economy", stance: "Lower costs for working families, expand affordable housing, support small business" },
        { issue: "Gun Safety", stance: "Universal background checks, red flag laws, ban assault weapons" },
        { issue: "Infrastructure", stance: "$500M rural broadband expansion, fix crumbling roads and bridges" },
      ],
      endorsements: [
        "President Joe Biden", "Stacey Abrams", "Georgia AFL-CIO", "Planned Parenthood Action Fund",
        "Sierra Club", "Mayor Andre Dickens", "Rep. Nikema Williams", "Atlanta Journal-Constitution Editorial Board",
      ],
      website: "https://keishaforgovernor.com",
      pledgeCount: 3200,
      totalRaised: 1680000,
    });

    // 3. Republican opponent (placeholder - runoff pending)
    const repId = await ctx.db.insert("candidates", {
      name: "Republican Nominee (Runoff June 16)",
      raceId,
      party: "republican",
      bio: "The Republican nominee will be decided in a June 16, 2026 runoff between Lt. Gov. Burt Jones (Trump-endorsed, 38.4% in primary) and Rick Jackson (billionaire healthcare exec, 32.5% in primary).",
      positions: [
        { issue: "Taxes", stance: "Cut state income tax, oppose new taxes" },
        { issue: "Education", stance: "School choice and vouchers" },
        { issue: "Gun Rights", stance: "Oppose any gun restrictions" },
        { issue: "Immigration", stance: "Strict enforcement, cooperate with federal ICE" },
      ],
      endorsements: ["TBD after runoff"],
      pledgeCount: 1647,
      totalRaised: 720000,
    });

    // 4. Public Pulse
    await ctx.db.insert("publicPulse", { raceId, candidateId: keishaId, candidateName: "Keisha Lance Bottoms", party: "democrat", pledgeCount: 3200, totalRaised: 1680000, percentageOfVotes: 66.0, lastUpdated: "2026-06-15" });
    await ctx.db.insert("publicPulse", { raceId, candidateId: repId, candidateName: "Republican Nominee", party: "republican", pledgeCount: 1647, totalRaised: 720000, percentageOfVotes: 34.0, lastUpdated: "2026-06-15" });

    // 5. Campaign Promises
    const promiseData = [
      { title: "Expand Medicaid Day One", description: "Sign executive order to expand Medicaid coverage to 500,000+ uninsured Georgians on the first day in office.", category: "Healthcare", status: "pending" as const, datePromised: "2026-05-19" },
      { title: "Cap Insulin at $35", description: "Pass legislation capping insulin costs at $35/month for all Georgia residents.", category: "Healthcare", status: "pending" as const, datePromised: "2026-05-19" },
      { title: "Raise Teacher Pay", description: "Increase teacher salaries to meet the national average within the first term.", category: "Education", status: "pending" as const, datePromised: "2026-04-15" },
      { title: "$2B Public School Investment", description: "Invest $2 billion in Georgia public schools over four years -- new facilities, technology, and after-school programs.", category: "Education", status: "pending" as const, datePromised: "2026-04-15" },
      { title: "Rural Broadband Expansion", description: "Deploy $500M to bring high-speed internet to every county in Georgia.", category: "Infrastructure", status: "pending" as const, datePromised: "2026-03-20" },
      { title: "Protect Voting Rights", description: "Veto any legislation that restricts voting access. Push for automatic voter registration.", category: "Voting Rights", status: "pending" as const, datePromised: "2026-05-19" },
      { title: "10,000 Affordable Housing Units", description: "Build 10,000 new affordable housing units across metro Atlanta and rural Georgia.", category: "Housing", status: "pending" as const, datePromised: "2026-04-01" },
      { title: "Universal Background Checks", description: "Sign universal background check legislation within the first 100 days.", category: "Gun Safety", status: "pending" as const, datePromised: "2026-05-19" },
      { title: "Small Business Grant Program", description: "Create a $100M small business grant program targeting underserved communities.", category: "Economy", status: "pending" as const, datePromised: "2026-03-01" },
      { title: "Clean Energy Jobs Initiative", description: "Create 25,000 clean energy jobs through solar and EV manufacturing incentives.", category: "Environment", status: "pending" as const, datePromised: "2026-04-22" },
    ];
    for (const p of promiseData) {
      await ctx.db.insert("promises", { ...p, candidateId: keishaId, raceId, evidence: [{ date: p.datePromised, note: "Promise made during campaign" }], hash: Math.random().toString(36).substring(2, 15) });
    }

    // 6. Voter Issues
    const issueData = [
      { title: "Affordable childcare access", description: "Working families in Georgia spend 30%+ of income on childcare. Need state-subsidized options.", category: "Economy", state: "GA", upvotes: 342 },
      { title: "Fix I-285 traffic congestion", description: "Metro Atlanta commuters lose 80+ hours per year in traffic. Need real transit investment.", category: "Infrastructure", state: "GA", upvotes: 289 },
      { title: "Maternal mortality crisis", description: "Georgia has the highest maternal mortality rate in the US. Need immediate action.", category: "Healthcare", state: "GA", upvotes: 456 },
      { title: "Rural hospital closures", description: "8 rural hospitals closed since 2010. Medicaid expansion would save the remaining ones.", category: "Healthcare", state: "GA", upvotes: 378 },
      { title: "Property tax relief for seniors", description: "Fixed-income seniors being priced out of their homes by rising property taxes.", category: "Economy", state: "GA", upvotes: 215 },
      { title: "School resource officers vs counselors", description: "More counselors, fewer cops in schools. Students need mental health support.", category: "Education", state: "GA", upvotes: 198 },
    ];
    for (const i of issueData) {
      await ctx.db.insert("voterIssues", { ...i, status: "open", createdAt: "2026-06-01", responses: [] });
    }

    // 7. Election History (Last 4 GA Governor Races)
    await ctx.db.insert("electionHistory", { year: 2022, race: "GA Governor", winnerName: "Brian Kemp", winnerParty: "Republican", winnerVotes: 2111470, loserName: "Stacey Abrams", loserParty: "Democrat", loserVotes: 1814004, margin: "R+7.5%", turnoutPercent: 56.2, totalRegistered: 7233584, totalVoted: 4064261, notes: "Kemp won re-election decisively. Abrams underperformed 2018 by 6 points." });
    await ctx.db.insert("electionHistory", { year: 2018, race: "GA Governor", winnerName: "Brian Kemp", winnerParty: "Republican", winnerVotes: 1978408, loserName: "Stacey Abrams", loserParty: "Democrat", loserVotes: 1923685, margin: "R+1.4%", turnoutPercent: 55.0, totalRegistered: 6935816, totalVoted: 3939318, notes: "Closest GA governor race in decades. Abrams came within 55K votes. Allegations of voter suppression." });
    await ctx.db.insert("electionHistory", { year: 2014, race: "GA Governor", winnerName: "Nathan Deal", winnerParty: "Republican", winnerVotes: 1345237, loserName: "Jason Carter", loserParty: "Democrat", loserVotes: 1144428, margin: "R+7.9%", turnoutPercent: 38.4, totalRegistered: 6203880, totalVoted: 2554803, notes: "Low turnout midterm. Deal won re-election comfortably." });
    await ctx.db.insert("electionHistory", { year: 2010, race: "GA Governor", winnerName: "Nathan Deal", winnerParty: "Republican", winnerVotes: 1365832, loserName: "Roy Barnes", loserParty: "Democrat", loserVotes: 1107011, margin: "R+10.1%", turnoutPercent: 40.1, totalRegistered: 5756386, totalVoted: 2571088, notes: "Deal won open seat after Sonny Perdue term-limited. Tea Party wave year." });

    // 8. Events
    const eventData = [
      { title: "Keisha for Governor Launch Rally", description: "Official general election campaign kickoff at the Georgia World Congress Center. Live music, speakers, and the candidate.", type: "rally" as const, date: "2026-07-04", time: "6:00 PM", location: "Georgia World Congress Center", city: "Atlanta", county: "Fulton", rsvpCount: 3500, capacity: 5000, featured: true },
      { title: "Macon Town Hall - Healthcare Focus", description: "Town hall on Medicaid expansion and rural healthcare. Bring your questions.", type: "townhall" as const, date: "2026-07-12", time: "2:00 PM", location: "Macon City Auditorium", city: "Macon", county: "Bibb", rsvpCount: 850, capacity: 1200, featured: true },
      { title: "Sunday Service & Endorsement - Ebenezer Baptist", description: "Keisha speaks at Ebenezer Baptist Church. Community leaders announcement.", type: "church" as const, date: "2026-07-20", time: "10:00 AM", location: "Ebenezer Baptist Church", city: "Atlanta", county: "Fulton", rsvpCount: 1200, capacity: 1500, featured: true },
      { title: "Savannah Fundraiser Gala", description: "Black-tie fundraiser dinner. $250/plate. All proceeds to the campaign.", type: "fundraiser" as const, date: "2026-07-26", time: "7:00 PM", location: "Savannah Convention Center", city: "Savannah", county: "Chatham", rsvpCount: 400, capacity: 500, featured: false },
      { title: "Columbus Volunteer Canvass Day", description: "Door-to-door canvassing in Columbus. Training provided. Meet at HQ at 9 AM.", type: "volunteer" as const, date: "2026-08-02", time: "9:00 AM", location: "KLB Columbus HQ", city: "Columbus", county: "Muscogee", rsvpCount: 180, capacity: 300, featured: false },
      { title: "Augusta Education Summit", description: "Panel discussion on public school funding, teacher retention, and K-12 reform.", type: "townhall" as const, date: "2026-08-09", time: "1:00 PM", location: "Augusta University", city: "Augusta", county: "Richmond", rsvpCount: 600, capacity: 800, featured: false },
      { title: "Concert for Georgia - Usher & Friends", description: "Star-studded benefit concert featuring Usher, Ludacris, and more. Tickets from $50.", type: "concert" as const, date: "2026-09-06", time: "7:00 PM", location: "State Farm Arena", city: "Atlanta", county: "Fulton", rsvpCount: 12000, capacity: 18000, featured: true },
      { title: "Gubernatorial Debate", description: "First general election debate. Hosted by WSB-TV and the Atlanta Press Club.", type: "debate" as const, date: "2026-09-20", time: "8:00 PM", location: "Georgia Public Broadcasting Studios", city: "Atlanta", county: "Fulton", rsvpCount: 500, capacity: 500, featured: true },
    ];
    for (const e of eventData) {
      await ctx.db.insert("events", { ...e });
    }

    // 9. Donors
    const donorData = [
      { name: "Rev. Dr. Marcus Williams", title: "Senior Pastor", organization: "Greater New Light Baptist", bio: "Led church fundraising drive that raised over $150K. 30 years of community leadership.", totalRaised: 152000, totalDonated: 25000, tier: "platinum" as const, featured: true, joinedDate: "2026-03-15" },
      { name: "Angela Davis-Mitchell", title: "CEO", organization: "Atlanta Community Foundation", bio: "Organized the 'Georgia United' fundraiser series across 12 counties.", totalRaised: 98000, totalDonated: 15000, tier: "gold" as const, featured: true, joinedDate: "2026-04-01" },
      { name: "Robert Chen", title: "Tech Entrepreneur", organization: "Peachtree Ventures", bio: "Silicon Valley transplant backing Georgia's future. Hosted 3 tech-sector fundraisers.", totalRaised: 75000, totalDonated: 50000, tier: "gold" as const, featured: true, joinedDate: "2026-04-15" },
      { name: "Tamika Johnson", title: "Educator", organization: "Fulton County Schools", bio: "Teacher-turned-fundraiser. Organized the 'Educators for Keisha' network with 400+ members.", totalRaised: 45000, totalDonated: 2500, tier: "silver" as const, featured: false, joinedDate: "2026-05-01" },
      { name: "James & Patricia Wright", title: "Retirees", organization: undefined, bio: "Longtime Democratic donors. Hosted neighborhood canvass events in DeKalb County.", totalRaised: 32000, totalDonated: 10000, tier: "silver" as const, featured: false, joinedDate: "2026-03-20" },
      { name: "LaShonda Peters", title: "Small Business Owner", organization: "Peters Catering Co.", bio: "Donated catering for 15 campaign events. Raised money through her business network.", totalRaised: 28000, totalDonated: 5000, tier: "bronze" as const, featured: false, joinedDate: "2026-05-10" },
    ];
    for (const d of donorData) {
      await ctx.db.insert("donors", d);
    }

    // 10. Fundraising Challenges
    const challengeData = [
      { title: "5K Grassroots Sprint", description: "Raise $5,000 from small-dollar donors in 30 days. Every dollar counts.", goalAmount: 5000, currentAmount: 4200, tier: "5k" as const, participantCount: 45, status: "active" as const, startDate: "2026-06-01", endDate: "2026-06-30" },
      { title: "10K County Captain Challenge", description: "County captains compete to raise $10K for voter registration drives.", goalAmount: 10000, currentAmount: 7800, tier: "10k" as const, participantCount: 28, status: "active" as const, startDate: "2026-06-01", endDate: "2026-07-15" },
      { title: "20K Church Network Drive", description: "Faith leaders unite to raise $20K for community outreach.", goalAmount: 20000, currentAmount: 14500, tier: "20k" as const, participantCount: 15, status: "active" as const, startDate: "2026-05-15", endDate: "2026-07-31" },
      { title: "50K Major Donor Match", description: "Top donors match every dollar raised. Goal: $50K for the final push.", goalAmount: 50000, currentAmount: 22000, tier: "50k" as const, participantCount: 8, status: "active" as const, startDate: "2026-06-01", endDate: "2026-08-31" },
    ];
    for (const c of challengeData) {
      await ctx.db.insert("fundraisingChallenges", c);
    }

    // 11. Challenge Participants (sample)
    const challenges = await ctx.db.query("fundraisingChallenges").collect();
    if (challenges.length > 0) {
      const participantData = [
        { challengeId: challenges[0]._id, name: "Sarah Mitchell", pledgedAmount: 500, raisedAmount: 420, joinedDate: "2026-06-02" },
        { challengeId: challenges[0]._id, name: "David Okafor", pledgedAmount: 300, raisedAmount: 300, joinedDate: "2026-06-03" },
        { challengeId: challenges[1]._id, name: "Maria Gonzalez", pledgedAmount: 1000, raisedAmount: 850, joinedDate: "2026-06-05" },
        { challengeId: challenges[1]._id, name: "Tyler Brooks", pledgedAmount: 750, raisedAmount: 600, joinedDate: "2026-06-04" },
        { challengeId: challenges[2]._id, name: "Rev. Calvin Harris", pledgedAmount: 2000, raisedAmount: 1800, joinedDate: "2026-05-20" },
        { challengeId: challenges[2]._id, name: "Pastor Lisa Coleman", pledgedAmount: 1500, raisedAmount: 1200, joinedDate: "2026-05-22" },
        { challengeId: challenges[3]._id, name: "Robert Chen", pledgedAmount: 10000, raisedAmount: 8000, joinedDate: "2026-06-01" },
        { challengeId: challenges[3]._id, name: "Angela Davis-Mitchell", pledgedAmount: 5000, raisedAmount: 4500, joinedDate: "2026-06-02" },
      ];
      for (const p of participantData) {
        await ctx.db.insert("challengeParticipants", p);
      }
    }

    // 12. Directed Giving
    const givingData = [
      { category: "Voter Registration", description: "Fund voter registration drives across all 159 Georgia counties.", totalAllocated: 420000, donorCount: 1250, goalAmount: 600000, percentageOfTotal: 17.5 },
      { category: "Digital Advertising", description: "Social media and online ads targeting swing counties and young voters.", totalAllocated: 580000, donorCount: 890, goalAmount: 800000, percentageOfTotal: 24.2 },
      { category: "Field Operations", description: "On-the-ground canvassing, phone banking, and community organizing.", totalAllocated: 650000, donorCount: 1100, goalAmount: 900000, percentageOfTotal: 27.1 },
      { category: "Events & Rallies", description: "Campaign events, rallies, town halls, and community forums.", totalAllocated: 380000, donorCount: 720, goalAmount: 500000, percentageOfTotal: 15.8 },
      { category: "Rural Outreach", description: "Dedicated outreach to rural Georgia communities often overlooked by campaigns.", totalAllocated: 220000, donorCount: 450, goalAmount: 400000, percentageOfTotal: 9.2 },
      { category: "Youth Engagement", description: "College campus organizing, young voter registration, and social media.", totalAllocated: 150000, donorCount: 680, goalAmount: 300000, percentageOfTotal: 6.2 },
    ];
    for (const g of givingData) {
      await ctx.db.insert("directedGiving", g);
    }

    // 13. Endorsements
    const endorsementData = [
      { organizationName: "Ebenezer Baptist Church", type: "church" as const, city: "Atlanta", county: "Fulton", memberCount: 6000, contributionTotal: 85000, endorsementDate: "2026-05-01", statement: "Keisha Lance Bottoms represents the values of justice, equity, and community that our church has stood for since Dr. King.", featured: true },
      { organizationName: "Georgia AFL-CIO", type: "union" as const, city: "Atlanta", county: "Fulton", memberCount: 250000, contributionTotal: 150000, endorsementDate: "2026-04-15", statement: "KLB is the champion Georgia's working families need in the governor's mansion.", featured: true },
      { organizationName: "Greater New Light Baptist Church", type: "church" as const, city: "Macon", county: "Bibb", memberCount: 3500, contributionTotal: 45000, endorsementDate: "2026-05-10", featured: false },
      { organizationName: "Planned Parenthood Action Fund GA", type: "nonprofit" as const, city: "Atlanta", county: "Fulton", memberCount: 85000, contributionTotal: 75000, endorsementDate: "2026-04-20", statement: "Keisha will protect reproductive healthcare access for all Georgians.", featured: true },
      { organizationName: "Sierra Club Georgia", type: "nonprofit" as const, city: "Atlanta", county: "DeKalb", memberCount: 42000, contributionTotal: 35000, endorsementDate: "2026-04-25", featured: false },
      { organizationName: "Atlanta Small Business Alliance", type: "business" as const, city: "Atlanta", county: "Fulton", memberCount: 1200, contributionTotal: 28000, endorsementDate: "2026-05-15", featured: false },
      { organizationName: "NAACP Georgia State Conference", type: "civic" as const, city: "Atlanta", county: "Fulton", memberCount: 35000, contributionTotal: 60000, endorsementDate: "2026-03-30", statement: "We endorse Keisha Lance Bottoms as the leader who will advance civil rights and equal opportunity in Georgia.", featured: true },
      { organizationName: "United Auto Workers Local 10", type: "union" as const, city: "Savannah", county: "Chatham", memberCount: 4500, contributionTotal: 22000, endorsementDate: "2026-05-20", featured: false },
    ];
    for (const e of endorsementData) {
      await ctx.db.insert("endorsements", e);
    }

    // 14. Supporters (CRM)
    const supporterData = [
      { firstName: "Marcus", lastName: "Johnson", email: "mjohnson@example.com", city: "Atlanta", county: "Fulton", zipCode: "30301", source: "event" as const, interests: ["voter registration", "canvassing"], volunteerWilling: true, donorStatus: true, totalContributed: 250, createdAt: "2026-03-15", tags: ["volunteer", "donor", "atlanta"] },
      { firstName: "Aisha", lastName: "Williams", email: "awilliams@example.com", city: "Savannah", county: "Chatham", zipCode: "31401", source: "church" as const, interests: ["healthcare", "education"], volunteerWilling: true, donorStatus: false, totalContributed: 0, createdAt: "2026-04-01", tags: ["volunteer", "savannah"] },
      { firstName: "David", lastName: "Park", email: "dpark@example.com", city: "Marietta", county: "Cobb", zipCode: "30060", source: "website" as const, interests: ["infrastructure", "economy"], volunteerWilling: false, donorStatus: true, totalContributed: 500, createdAt: "2026-04-10", tags: ["donor", "cobb-county"] },
      { firstName: "Carmen", lastName: "Rodriguez", email: "crodriguez@example.com", city: "Columbus", county: "Muscogee", zipCode: "31901", source: "social" as const, interests: ["gun safety", "education"], volunteerWilling: true, donorStatus: false, totalContributed: 0, createdAt: "2026-04-20", tags: ["volunteer", "columbus"] },
      { firstName: "Robert", lastName: "Thompson", email: "rthompson@example.com", city: "Augusta", county: "Richmond", zipCode: "30901", source: "referral" as const, interests: ["economy", "healthcare"], volunteerWilling: false, donorStatus: true, totalContributed: 1000, createdAt: "2026-05-01", tags: ["donor", "major-donor", "augusta"] },
      { firstName: "Keyana", lastName: "Brown", email: "kbrown@example.com", city: "Macon", county: "Bibb", zipCode: "31201", source: "volunteer" as const, interests: ["canvassing", "phone banking"], volunteerWilling: true, donorStatus: true, totalContributed: 100, createdAt: "2026-05-05", tags: ["volunteer", "donor", "macon"] },
      { firstName: "James", lastName: "Lee", email: "jlee@example.com", city: "Athens", county: "Clarke", zipCode: "30601", source: "event" as const, interests: ["education", "environment"], volunteerWilling: true, donorStatus: false, totalContributed: 0, createdAt: "2026-05-15", tags: ["volunteer", "athens", "college-outreach"] },
      { firstName: "Patricia", lastName: "Davis", email: "pdavis@example.com", city: "Decatur", county: "DeKalb", zipCode: "30030", source: "donor" as const, interests: ["voting rights", "healthcare"], volunteerWilling: false, donorStatus: true, totalContributed: 2500, createdAt: "2026-03-20", tags: ["donor", "major-donor", "dekalb"] },
    ];
    for (const s of supporterData) {
      await ctx.db.insert("supporters", s);
    }

    // 15. Media Items
    const mediaData = [
      { title: "Keisha Lance Bottoms Wins Democratic Primary", type: "article" as const, description: "Former Atlanta mayor secures Democratic nomination with 62% of the vote.", source: "Atlanta Journal-Constitution", publishDate: "2026-05-19", featured: true },
      { title: "Biden Endorses Bottoms for Georgia Governor", type: "video" as const, description: "President Biden records endorsement video calling Bottoms 'the leader Georgia needs.'", source: "White House", publishDate: "2026-05-15", featured: true, platform: "YouTube" },
      { title: "The Keisha Bottoms Interview - Full Episode", type: "podcast" as const, description: "90-minute deep dive on policy, personal story, and the path to victory.", source: "Pod Save America", publishDate: "2026-06-01", featured: true, platform: "Spotify" },
      { title: "Campaign Raises $2.4M in First Month", type: "press_release" as const, description: "Bottoms campaign announces record-breaking fundraising with 93% from small-dollar donors.", publishDate: "2026-06-10", featured: false },
      { title: "Why Georgia Could Elect Its First Black Woman Governor", type: "article" as const, description: "Analysis of the demographic shifts and political conditions making 2026 different.", source: "The New York Times", publishDate: "2026-06-05", featured: true },
      { title: "Meet Keisha - 60 Second Introduction", type: "social" as const, description: "Campaign launch video for social media. 2.3M views in first week.", publishDate: "2026-05-20", featured: false, platform: "Instagram/TikTok" },
      { title: "Town Hall: Healthcare in Rural Georgia", type: "video" as const, description: "Full recording of the Macon town hall on Medicaid expansion and rural hospitals.", source: "Campaign", publishDate: "2026-06-08", featured: false, platform: "YouTube" },
    ];
    for (const m of mediaData) {
      await ctx.db.insert("mediaItems", m);
    }

    // 16. Activity Feed
    const activityData = [
      { type: "milestone" as const, message: "Campaign surpasses $2.4M raised -- 93% from donations under $100", state: "GA", createdAt: "2026-06-10" },
      { type: "endorsement" as const, message: "NAACP Georgia State Conference endorses Keisha Lance Bottoms", state: "GA", createdAt: "2026-06-08" },
      { type: "event" as const, message: "3,500 RSVPs for July 4th Launch Rally at Georgia World Congress Center", state: "GA", createdAt: "2026-06-07" },
      { type: "fundraising" as const, message: "20K Church Network Drive passes $14,500 -- 72.5% of goal", state: "GA", createdAt: "2026-06-06" },
      { type: "pledge" as const, message: "4,847 total pledges across the campaign", state: "GA", createdAt: "2026-06-05" },
    ];
    for (const a of activityData) {
      await ctx.db.insert("activityFeed", a);
    }

    // === GAMIFICATION BADGES ===
    const badgeData = [
      // Fundraising badges
      { name: "First Dollar", description: "Made your first donation", icon: "dollar", category: "fundraising" as const, tier: "bronze" as const, requirement: "Donate any amount", threshold: 1, metric: "dollars_donated", pointValue: 50 },
      { name: "Hundred Club", description: "Donated $100 or more total", icon: "banknote", category: "fundraising" as const, tier: "silver" as const, requirement: "Donate $100+ total", threshold: 100, metric: "dollars_donated", pointValue: 200 },
      { name: "Major Donor", description: "Donated $1,000 or more total", icon: "gem", category: "fundraising" as const, tier: "gold" as const, requirement: "Donate $1,000+ total", threshold: 1000, metric: "dollars_donated", pointValue: 500 },
      { name: "Fundraiser", description: "Helped raise $500 for the campaign", icon: "trophy", category: "fundraising" as const, tier: "silver" as const, requirement: "Raise $500+ from referrals", threshold: 500, metric: "dollars_raised", pointValue: 300 },
      { name: "Mega Fundraiser", description: "Helped raise $5,000 for the campaign", icon: "crown", category: "fundraising" as const, tier: "gold" as const, requirement: "Raise $5,000+ from referrals", threshold: 5000, metric: "dollars_raised", pointValue: 1000 },
      { name: "Campaign Champion", description: "Helped raise $10,000+", icon: "star", category: "fundraising" as const, tier: "platinum" as const, requirement: "Raise $10,000+ from referrals", threshold: 10000, metric: "dollars_raised", pointValue: 2500 },
      // Volunteer badges
      { name: "First Steps", description: "Completed 1 hour of volunteer work", icon: "footprints", category: "volunteer" as const, tier: "bronze" as const, requirement: "Volunteer 1 hour", threshold: 1, metric: "volunteer_hours", pointValue: 50 },
      { name: "Dedicated", description: "Completed 10 hours of volunteer work", icon: "clock", category: "volunteer" as const, tier: "silver" as const, requirement: "Volunteer 10 hours", threshold: 10, metric: "volunteer_hours", pointValue: 250 },
      { name: "All In", description: "Completed 50 hours of volunteer work", icon: "heart", category: "volunteer" as const, tier: "gold" as const, requirement: "Volunteer 50 hours", threshold: 50, metric: "volunteer_hours", pointValue: 750 },
      { name: "Campaign Hero", description: "Completed 100+ volunteer hours", icon: "medal", category: "volunteer" as const, tier: "platinum" as const, requirement: "Volunteer 100+ hours", threshold: 100, metric: "volunteer_hours", pointValue: 2000 },
      // Events badges
      { name: "Showed Up", description: "Attended your first campaign event", icon: "calendar", category: "events" as const, tier: "bronze" as const, requirement: "Attend 1 event", threshold: 1, metric: "events_attended", pointValue: 50 },
      { name: "Regular", description: "Attended 5 campaign events", icon: "users", category: "events" as const, tier: "silver" as const, requirement: "Attend 5 events", threshold: 5, metric: "events_attended", pointValue: 200 },
      { name: "Rally Captain", description: "Attended 20+ campaign events", icon: "flag", category: "events" as const, tier: "gold" as const, requirement: "Attend 20+ events", threshold: 20, metric: "events_attended", pointValue: 500 },
      // Recruiting badges
      { name: "Recruiter", description: "Referred 3 new supporters", icon: "user-plus", category: "recruiting" as const, tier: "bronze" as const, requirement: "Refer 3 supporters", threshold: 3, metric: "referrals", pointValue: 100 },
      { name: "Ambassador", description: "Referred 10 new supporters", icon: "megaphone", category: "recruiting" as const, tier: "silver" as const, requirement: "Refer 10 supporters", threshold: 10, metric: "referrals", pointValue: 400 },
      { name: "Movement Builder", description: "Referred 50+ new supporters", icon: "globe", category: "recruiting" as const, tier: "gold" as const, requirement: "Refer 50+ supporters", threshold: 50, metric: "referrals", pointValue: 1500 },
      // Social badges
      { name: "Amplifier", description: "Shared 5 campaign posts on social media", icon: "share", category: "social" as const, tier: "bronze" as const, requirement: "Share 5 posts", threshold: 5, metric: "social_shares", pointValue: 75 },
      { name: "Viral Voice", description: "Shared 25 campaign posts", icon: "trending-up", category: "social" as const, tier: "silver" as const, requirement: "Share 25 posts", threshold: 25, metric: "social_shares", pointValue: 300 },
      // Milestone badges
      { name: "Day One", description: "Joined the campaign on launch day", icon: "rocket", category: "milestone" as const, tier: "gold" as const, requirement: "Sign up within first 7 days", threshold: 1, metric: "launch_signup", pointValue: 500 },
      { name: "7-Day Streak", description: "Active 7 days in a row", icon: "flame", category: "milestone" as const, tier: "silver" as const, requirement: "7 consecutive active days", threshold: 7, metric: "streak_days", pointValue: 200 },
      { name: "30-Day Streak", description: "Active 30 days in a row", icon: "zap", category: "milestone" as const, tier: "gold" as const, requirement: "30 consecutive active days", threshold: 30, metric: "streak_days", pointValue: 750 },
    ];
    for (const b of badgeData) {
      await ctx.db.insert("badges", b);
    }

    // === SAMPLE LEADERBOARD ===
    // Note: using placeholder user IDs -- these would be real user IDs in production

    // === COUNTY TARGETS (Top 20 strategic counties) ===
    const countyData = [
      { county: "Fulton", totalRegistered: 820000, targetVoters: 380000, currentPledges: 1200, demRegistered: 520000, repRegistered: 165000, indRegistered: 135000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Max turnout in Atlanta core. Every 1% turnout increase = 5,200 votes." },
      { county: "DeKalb", totalRegistered: 580000, targetVoters: 310000, currentPledges: 890, demRegistered: 440000, repRegistered: 58000, indRegistered: 82000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Strongest D county. Focus on turnout, not persuasion." },
      { county: "Gwinnett", totalRegistered: 640000, targetVoters: 180000, currentPledges: 420, demRegistered: 250000, repRegistered: 210000, indRegistered: 180000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Diverse, fast-growing suburb. Flipped blue 2018. Key persuasion target." },
      { county: "Cobb", totalRegistered: 540000, targetVoters: 155000, currentPledges: 350, demRegistered: 220000, repRegistered: 185000, indRegistered: 135000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Suburban swing county. Win independents with education and healthcare." },
      { county: "Clayton", totalRegistered: 210000, targetVoters: 125000, currentPledges: 280, demRegistered: 180000, repRegistered: 12000, indRegistered: 18000, priority: "high" as const, region: "Metro Atlanta", strategy: "Deep blue. Maximize turnout. Church mobilization." },
      { county: "Chatham", totalRegistered: 210000, targetVoters: 95000, currentPledges: 180, demRegistered: 105000, repRegistered: 62000, indRegistered: 43000, priority: "high" as const, region: "Coastal", strategy: "Savannah area. Union and port worker outreach." },
      { county: "Richmond", totalRegistered: 150000, targetVoters: 70000, currentPledges: 120, demRegistered: 85000, repRegistered: 40000, indRegistered: 25000, priority: "high" as const, region: "Central GA", strategy: "Augusta area. HBCU student engagement at Paine College." },
      { county: "Muscogee", totalRegistered: 135000, targetVoters: 60000, currentPledges: 95, demRegistered: 72000, repRegistered: 38000, indRegistered: 25000, priority: "high" as const, region: "West GA", strategy: "Columbus military community. Veteran outreach critical." },
      { county: "Henry", totalRegistered: 175000, targetVoters: 75000, currentPledges: 140, demRegistered: 95000, repRegistered: 45000, indRegistered: 35000, priority: "high" as const, region: "Metro Atlanta", strategy: "Fast-growing Black suburb. Community events." },
      { county: "Douglas", totalRegistered: 105000, targetVoters: 48000, currentPledges: 65, demRegistered: 58000, repRegistered: 28000, indRegistered: 19000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Suburban shift. Younger families. Childcare messaging." },
      { county: "Bibb", totalRegistered: 115000, targetVoters: 52000, currentPledges: 75, demRegistered: 62000, repRegistered: 33000, indRegistered: 20000, priority: "medium" as const, region: "Central GA", strategy: "Macon area. Mercer University students. Healthcare messaging." },
      { county: "Clarke", totalRegistered: 85000, targetVoters: 42000, currentPledges: 110, demRegistered: 48000, repRegistered: 18000, indRegistered: 19000, priority: "medium" as const, region: "Northeast GA", strategy: "Athens/UGA. Student voter registration drives." },
      { county: "Rockdale", totalRegistered: 70000, targetVoters: 35000, currentPledges: 55, demRegistered: 42000, repRegistered: 14000, indRegistered: 14000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Growing diverse community. Digital-first outreach." },
      { county: "Newton", totalRegistered: 80000, targetVoters: 32000, currentPledges: 40, demRegistered: 40000, repRegistered: 24000, indRegistered: 16000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Exurban growth. Young family messaging." },
      { county: "Cherokee", totalRegistered: 200000, targetVoters: 40000, currentPledges: 20, demRegistered: 45000, repRegistered: 115000, indRegistered: 40000, priority: "low" as const, region: "North GA", strategy: "Deep red but growing moderate suburbanites. Peel off independents." },
      { county: "Forsyth", totalRegistered: 175000, targetVoters: 30000, currentPledges: 15, demRegistered: 35000, repRegistered: 100000, indRegistered: 40000, priority: "low" as const, region: "North GA", strategy: "R stronghold. Minimize losses. Asian-American outreach." },
      { county: "Hall", totalRegistered: 120000, targetVoters: 25000, currentPledges: 12, demRegistered: 28000, repRegistered: 65000, indRegistered: 27000, priority: "low" as const, region: "North GA", strategy: "Gainesville area. Latino community engagement." },
      { county: "Dougherty", totalRegistered: 65000, targetVoters: 32000, currentPledges: 45, demRegistered: 42000, repRegistered: 15000, indRegistered: 8000, priority: "high" as const, region: "South GA", strategy: "Albany area. Strong Black church network. Turnout focus." },
      { county: "Columbia", totalRegistered: 115000, targetVoters: 22000, currentPledges: 10, demRegistered: 25000, repRegistered: 65000, indRegistered: 25000, priority: "low" as const, region: "Central GA", strategy: "Fort Eisenhower military families. Suburban R." },
      { county: "Lowndes", totalRegistered: 70000, targetVoters: 28000, currentPledges: 30, demRegistered: 30000, repRegistered: 28000, indRegistered: 12000, priority: "medium" as const, region: "South GA", strategy: "Valdosta area. Valdosta State students. Tight margins." },
    ];
    for (const c of countyData) {
      await ctx.db.insert("countyTargets", {
        ...c,
        percentComplete: c.targetVoters > 0 ? (c.currentPledges / c.targetVoters) * 100 : 0,
      });
    }

    return "Seeded successfully";
  },
});

// Separate seed for new tables (badges, counties) that can run even if races exist
export const seedNewTables = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if badges already seeded
    const existingBadges = await ctx.db.query("badges").first();
    if (existingBadges) return "New tables already seeded";

    // === GAMIFICATION BADGES ===
    const badgeData = [
      { name: "First Dollar", description: "Made your first donation", icon: "dollar", category: "fundraising" as const, tier: "bronze" as const, requirement: "Donate any amount", threshold: 1, metric: "dollars_donated", pointValue: 50 },
      { name: "Hundred Club", description: "Donated $100 or more total", icon: "banknote", category: "fundraising" as const, tier: "silver" as const, requirement: "Donate $100+ total", threshold: 100, metric: "dollars_donated", pointValue: 200 },
      { name: "Major Donor", description: "Donated $1,000 or more total", icon: "gem", category: "fundraising" as const, tier: "gold" as const, requirement: "Donate $1,000+ total", threshold: 1000, metric: "dollars_donated", pointValue: 500 },
      { name: "Fundraiser", description: "Helped raise $500 for the campaign", icon: "trophy", category: "fundraising" as const, tier: "silver" as const, requirement: "Raise $500+ from referrals", threshold: 500, metric: "dollars_raised", pointValue: 300 },
      { name: "Mega Fundraiser", description: "Helped raise $5,000 for the campaign", icon: "crown", category: "fundraising" as const, tier: "gold" as const, requirement: "Raise $5,000+ from referrals", threshold: 5000, metric: "dollars_raised", pointValue: 1000 },
      { name: "Campaign Champion", description: "Helped raise $10,000+", icon: "star", category: "fundraising" as const, tier: "platinum" as const, requirement: "Raise $10,000+ from referrals", threshold: 10000, metric: "dollars_raised", pointValue: 2500 },
      { name: "First Steps", description: "Completed 1 hour of volunteer work", icon: "footprints", category: "volunteer" as const, tier: "bronze" as const, requirement: "Volunteer 1 hour", threshold: 1, metric: "volunteer_hours", pointValue: 50 },
      { name: "Dedicated", description: "Completed 10 hours of volunteer work", icon: "clock", category: "volunteer" as const, tier: "silver" as const, requirement: "Volunteer 10 hours", threshold: 10, metric: "volunteer_hours", pointValue: 250 },
      { name: "All In", description: "Completed 50 hours of volunteer work", icon: "heart", category: "volunteer" as const, tier: "gold" as const, requirement: "Volunteer 50 hours", threshold: 50, metric: "volunteer_hours", pointValue: 750 },
      { name: "Campaign Hero", description: "Completed 100+ volunteer hours", icon: "medal", category: "volunteer" as const, tier: "platinum" as const, requirement: "Volunteer 100+ hours", threshold: 100, metric: "volunteer_hours", pointValue: 2000 },
      { name: "Showed Up", description: "Attended your first campaign event", icon: "calendar", category: "events" as const, tier: "bronze" as const, requirement: "Attend 1 event", threshold: 1, metric: "events_attended", pointValue: 50 },
      { name: "Regular", description: "Attended 5 campaign events", icon: "users", category: "events" as const, tier: "silver" as const, requirement: "Attend 5 events", threshold: 5, metric: "events_attended", pointValue: 200 },
      { name: "Rally Captain", description: "Attended 20+ campaign events", icon: "flag", category: "events" as const, tier: "gold" as const, requirement: "Attend 20+ events", threshold: 20, metric: "events_attended", pointValue: 500 },
      { name: "Recruiter", description: "Referred 3 new supporters", icon: "user-plus", category: "recruiting" as const, tier: "bronze" as const, requirement: "Refer 3 supporters", threshold: 3, metric: "referrals", pointValue: 100 },
      { name: "Ambassador", description: "Referred 10 new supporters", icon: "megaphone", category: "recruiting" as const, tier: "silver" as const, requirement: "Refer 10 supporters", threshold: 10, metric: "referrals", pointValue: 400 },
      { name: "Movement Builder", description: "Referred 50+ new supporters", icon: "globe", category: "recruiting" as const, tier: "gold" as const, requirement: "Refer 50+ supporters", threshold: 50, metric: "referrals", pointValue: 1500 },
      { name: "Amplifier", description: "Shared 5 campaign posts on social media", icon: "share", category: "social" as const, tier: "bronze" as const, requirement: "Share 5 posts", threshold: 5, metric: "social_shares", pointValue: 75 },
      { name: "Viral Voice", description: "Shared 25 campaign posts", icon: "trending-up", category: "social" as const, tier: "silver" as const, requirement: "Share 25 posts", threshold: 25, metric: "social_shares", pointValue: 300 },
      { name: "Day One", description: "Joined the campaign on launch day", icon: "rocket", category: "milestone" as const, tier: "gold" as const, requirement: "Sign up within first 7 days", threshold: 1, metric: "launch_signup", pointValue: 500 },
      { name: "7-Day Streak", description: "Active 7 days in a row", icon: "flame", category: "milestone" as const, tier: "silver" as const, requirement: "7 consecutive active days", threshold: 7, metric: "streak_days", pointValue: 200 },
      { name: "30-Day Streak", description: "Active 30 days in a row", icon: "zap", category: "milestone" as const, tier: "gold" as const, requirement: "30 consecutive active days", threshold: 30, metric: "streak_days", pointValue: 750 },
    ];
    for (const b of badgeData) {
      await ctx.db.insert("badges", b);
    }

    // === COUNTY TARGETS ===
    const countyData = [
      { county: "Fulton", totalRegistered: 820000, targetVoters: 380000, currentPledges: 1200, demRegistered: 520000, repRegistered: 165000, indRegistered: 135000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Max turnout in Atlanta core. Every 1% turnout increase = 5,200 votes." },
      { county: "DeKalb", totalRegistered: 580000, targetVoters: 310000, currentPledges: 890, demRegistered: 440000, repRegistered: 58000, indRegistered: 82000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Strongest D county. Focus on turnout, not persuasion." },
      { county: "Gwinnett", totalRegistered: 640000, targetVoters: 180000, currentPledges: 420, demRegistered: 250000, repRegistered: 210000, indRegistered: 180000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Diverse, fast-growing suburb. Flipped blue 2018. Key persuasion target." },
      { county: "Cobb", totalRegistered: 540000, targetVoters: 155000, currentPledges: 350, demRegistered: 220000, repRegistered: 185000, indRegistered: 135000, priority: "critical" as const, region: "Metro Atlanta", strategy: "Suburban swing county. Win independents with education and healthcare." },
      { county: "Clayton", totalRegistered: 210000, targetVoters: 125000, currentPledges: 280, demRegistered: 180000, repRegistered: 12000, indRegistered: 18000, priority: "high" as const, region: "Metro Atlanta", strategy: "Deep blue. Maximize turnout. Church mobilization." },
      { county: "Chatham", totalRegistered: 210000, targetVoters: 95000, currentPledges: 180, demRegistered: 105000, repRegistered: 62000, indRegistered: 43000, priority: "high" as const, region: "Coastal", strategy: "Savannah area. Union and port worker outreach." },
      { county: "Richmond", totalRegistered: 150000, targetVoters: 70000, currentPledges: 120, demRegistered: 85000, repRegistered: 40000, indRegistered: 25000, priority: "high" as const, region: "Central GA", strategy: "Augusta area. HBCU student engagement at Paine College." },
      { county: "Muscogee", totalRegistered: 135000, targetVoters: 60000, currentPledges: 95, demRegistered: 72000, repRegistered: 38000, indRegistered: 25000, priority: "high" as const, region: "West GA", strategy: "Columbus military community. Veteran outreach critical." },
      { county: "Henry", totalRegistered: 175000, targetVoters: 75000, currentPledges: 140, demRegistered: 95000, repRegistered: 45000, indRegistered: 35000, priority: "high" as const, region: "Metro Atlanta", strategy: "Fast-growing Black suburb. Community events." },
      { county: "Douglas", totalRegistered: 105000, targetVoters: 48000, currentPledges: 65, demRegistered: 58000, repRegistered: 28000, indRegistered: 19000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Suburban shift. Younger families. Childcare messaging." },
      { county: "Bibb", totalRegistered: 115000, targetVoters: 52000, currentPledges: 75, demRegistered: 62000, repRegistered: 33000, indRegistered: 20000, priority: "medium" as const, region: "Central GA", strategy: "Macon area. Mercer University students. Healthcare messaging." },
      { county: "Clarke", totalRegistered: 85000, targetVoters: 42000, currentPledges: 110, demRegistered: 48000, repRegistered: 18000, indRegistered: 19000, priority: "medium" as const, region: "Northeast GA", strategy: "Athens/UGA. Student voter registration drives." },
      { county: "Rockdale", totalRegistered: 70000, targetVoters: 35000, currentPledges: 55, demRegistered: 42000, repRegistered: 14000, indRegistered: 14000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Growing diverse community. Digital-first outreach." },
      { county: "Newton", totalRegistered: 80000, targetVoters: 32000, currentPledges: 40, demRegistered: 40000, repRegistered: 24000, indRegistered: 16000, priority: "medium" as const, region: "Metro Atlanta", strategy: "Exurban growth. Young family messaging." },
      { county: "Cherokee", totalRegistered: 200000, targetVoters: 40000, currentPledges: 20, demRegistered: 45000, repRegistered: 115000, indRegistered: 40000, priority: "low" as const, region: "North GA", strategy: "Deep red but growing moderate suburbanites. Peel off independents." },
      { county: "Forsyth", totalRegistered: 175000, targetVoters: 30000, currentPledges: 15, demRegistered: 35000, repRegistered: 100000, indRegistered: 40000, priority: "low" as const, region: "North GA", strategy: "R stronghold. Minimize losses. Asian-American outreach." },
      { county: "Hall", totalRegistered: 120000, targetVoters: 25000, currentPledges: 12, demRegistered: 28000, repRegistered: 65000, indRegistered: 27000, priority: "low" as const, region: "North GA", strategy: "Gainesville area. Latino community engagement." },
      { county: "Dougherty", totalRegistered: 65000, targetVoters: 32000, currentPledges: 45, demRegistered: 42000, repRegistered: 15000, indRegistered: 8000, priority: "high" as const, region: "South GA", strategy: "Albany area. Strong Black church network. Turnout focus." },
      { county: "Columbia", totalRegistered: 115000, targetVoters: 22000, currentPledges: 10, demRegistered: 25000, repRegistered: 65000, indRegistered: 25000, priority: "low" as const, region: "Central GA", strategy: "Fort Eisenhower military families. Suburban R." },
      { county: "Lowndes", totalRegistered: 70000, targetVoters: 28000, currentPledges: 30, demRegistered: 30000, repRegistered: 28000, indRegistered: 12000, priority: "medium" as const, region: "South GA", strategy: "Valdosta area. Valdosta State students. Tight margins." },
    ];
    for (const c of countyData) {
      await ctx.db.insert("countyTargets", { ...c, percentComplete: c.targetVoters > 0 ? (c.currentPledges / c.targetVoters) * 100 : 0 });
    }

    return "New tables seeded successfully";
  },
});

// Seed Runner Feed with sample posts
export const seedRunnerFeed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("runnerPosts").first();
    if (existing) return "Runner feed already seeded";

    const posts = [
      {
        authorName: "Marcus Williams",
        authorRole: "Community Captain",
        authorCity: "Atlanta",
        authorCounty: "Fulton",
        content: "Just finished a 4-hour voter registration drive at West End Mall. Signed up 47 new voters today. The energy is incredible -- people are excited about Keisha's Medicaid expansion plan. One woman told me she hasn't voted in 12 years but Keisha made her believe again. This is what grassroots looks like.",
        mediaType: "none" as const,
        peopleRecruited: 47,
        hoursVolunteered: 4,
        likes: 134,
        comments: 12,
        shares: 28,
        status: "approved" as const,
        createdAt: "2026-06-14T10:30:00Z",
        publishedAt: "2026-06-14T10:35:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-14T10:35:00Z",
        tags: ["voter-registration", "west-end", "grassroots"],
        pinned: true,
      },
      {
        authorName: "Tamika Johnson",
        authorRole: "Volunteer",
        authorCity: "Savannah",
        authorCounty: "Chatham",
        content: "Savannah is READY. We had 200+ people at the town hall last night at First African Baptist Church. Standing room only. People asking about education funding, affordable housing, and gun safety. Keisha answered every single question. She's the real deal. Signed up 31 new volunteers on the spot.",
        mediaType: "none" as const,
        peopleRecruited: 31,
        hoursVolunteered: 6,
        likes: 89,
        comments: 8,
        shares: 15,
        status: "approved" as const,
        createdAt: "2026-06-14T08:15:00Z",
        publishedAt: "2026-06-14T08:20:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-14T08:20:00Z",
        tags: ["town-hall", "savannah", "church"],
        pinned: false,
      },
      {
        authorName: "James Carter",
        authorRole: "Team Lead",
        authorCity: "Macon",
        authorCounty: "Bibb",
        content: "Week 3 of door-to-door in Bibb County. We've knocked on 1,200 doors. The message that resonates most: lower costs and Medicaid expansion. People are struggling and they need a governor who gets it. Keisha gets it. 15 more volunteers joined our team this week alone.",
        mediaType: "none" as const,
        peopleRecruited: 15,
        hoursVolunteered: 20,
        likes: 67,
        comments: 5,
        shares: 11,
        status: "approved" as const,
        createdAt: "2026-06-13T14:00:00Z",
        publishedAt: "2026-06-13T14:10:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-13T14:10:00Z",
        tags: ["canvassing", "macon", "door-to-door"],
        pinned: false,
      },
      {
        authorName: "Angela Reeves",
        authorRole: "Church Liaison",
        authorCity: "Augusta",
        authorCounty: "Richmond",
        content: "5 churches in Richmond County endorsed Keisha this week. That's over 8,000 congregation members. Pastor Williams at New Hope AME said 'She's the leader Georgia families deserve.' We're organizing a multi-church rally for July 4th weekend. This movement is growing every single day.",
        mediaType: "none" as const,
        peopleRecruited: 0,
        hoursVolunteered: 12,
        likes: 156,
        comments: 19,
        shares: 42,
        status: "approved" as const,
        createdAt: "2026-06-13T09:30:00Z",
        publishedAt: "2026-06-13T09:40:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-13T09:40:00Z",
        tags: ["church", "endorsement", "augusta"],
        pinned: true,
      },
      {
        authorName: "DeShawn Thomas",
        authorRole: "Student Organizer",
        authorCity: "Athens",
        authorCounty: "Clarke",
        content: "UGA campus blitz results: 89 new voter registrations in ONE DAY. We set up outside Tate Student Center and the line was nonstop. Young voters are fired up about education funding and student debt relief. Keisha's education platform is exactly what this generation needs. We're hitting Georgia State and Spelman next week.",
        mediaType: "none" as const,
        peopleRecruited: 89,
        hoursVolunteered: 8,
        likes: 201,
        comments: 24,
        shares: 56,
        status: "approved" as const,
        createdAt: "2026-06-12T16:45:00Z",
        publishedAt: "2026-06-12T17:00:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-12T17:00:00Z",
        tags: ["campus", "uga", "youth-vote", "voter-registration"],
        pinned: false,
      },
      {
        authorName: "Patricia Moore",
        authorRole: "Volunteer",
        authorCity: "Columbus",
        authorCounty: "Muscogee",
        content: "First time volunteering for any campaign. I'm 62 years old and I've never been this motivated. Keisha's plan to lower healthcare costs is personal to me -- I pay $800/month for prescriptions. Knocked on 40 doors today and had real conversations with real people. Everyone I talked to said the same thing: it's time for change.",
        mediaType: "none" as const,
        peopleRecruited: 3,
        hoursVolunteered: 5,
        likes: 312,
        comments: 31,
        shares: 67,
        status: "approved" as const,
        createdAt: "2026-06-12T11:20:00Z",
        publishedAt: "2026-06-12T11:30:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-12T11:30:00Z",
        tags: ["canvassing", "healthcare", "personal-story"],
        pinned: false,
      },
      {
        authorName: "Terrance Jackson",
        authorRole: "Regional Coordinator",
        authorCity: "Albany",
        authorCounty: "Dougherty",
        content: "South Georgia update: We now have active volunteer teams in 12 counties across the region. Albany alone has 45 active volunteers. Set up a phone bank this week and made 2,300 calls. People in rural Georgia feel forgotten -- Keisha's infrastructure plan speaks directly to them. Roads, broadband, jobs. Let's go.",
        mediaType: "none" as const,
        peopleRecruited: 45,
        hoursVolunteered: 30,
        likes: 98,
        comments: 7,
        shares: 19,
        status: "approved" as const,
        createdAt: "2026-06-11T13:00:00Z",
        publishedAt: "2026-06-11T13:15:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-11T13:15:00Z",
        tags: ["south-georgia", "phone-bank", "rural"],
        pinned: false,
      },
      {
        authorName: "Lisa Chen",
        authorRole: "Volunteer",
        authorCity: "Roswell",
        authorCounty: "Fulton",
        content: "Suburban moms for Keisha! Organized a house party in Roswell with 35 neighbors. Gun safety and public education are the top issues here. Had three Republican women say they're crossing over. The suburbs are in play and Keisha's message is breaking through.",
        mediaType: "none" as const,
        peopleRecruited: 12,
        hoursVolunteered: 3,
        likes: 178,
        comments: 15,
        shares: 38,
        status: "approved" as const,
        createdAt: "2026-06-11T19:45:00Z",
        publishedAt: "2026-06-11T20:00:00Z",
        moderatedBy: "admin",
        moderatedAt: "2026-06-11T20:00:00Z",
        tags: ["suburbs", "house-party", "crossover"],
        pinned: false,
      },
      // Pending posts for moderation demo
      {
        authorName: "Kevin Brown",
        authorRole: "Volunteer",
        authorCity: "Decatur",
        authorCounty: "DeKalb",
        content: "Had an amazing conversation with a veteran today who said Keisha's infrastructure plan would bring jobs to his neighborhood. He signed up to volunteer on the spot. Every conversation matters.",
        mediaType: "none" as const,
        peopleRecruited: 1,
        hoursVolunteered: 2,
        likes: 0,
        comments: 0,
        shares: 0,
        status: "pending" as const,
        createdAt: "2026-06-14T15:00:00Z",
        tags: ["canvassing", "veteran", "decatur"],
        pinned: false,
      },
      {
        authorName: "Sarah Mitchell",
        authorRole: "Team Lead",
        authorCity: "Marietta",
        authorCounty: "Cobb",
        content: "Cobb County volunteer training complete! 22 new volunteers trained and ready to canvas this weekend. We're covering 6 neighborhoods in Marietta and Kennesaw. Who's joining us Saturday at 9am?",
        mediaType: "none" as const,
        peopleRecruited: 22,
        hoursVolunteered: 4,
        likes: 0,
        comments: 0,
        shares: 0,
        status: "pending" as const,
        createdAt: "2026-06-14T16:30:00Z",
        tags: ["training", "cobb-county", "volunteer"],
        pinned: false,
      },
    ];

    for (const post of posts) {
      await ctx.db.insert("runnerPosts", post);
    }

    return "Runner feed seeded with " + posts.length + " posts";
  },
});

// Seed Merch Store
export const seedStore = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").first();
    if (existing) return "Store already seeded";

    const products = [
      // APPAREL
      { name: "Keisha for Governor Classic Tee", description: "Premium cotton crew neck tee with the official Keisha for Governor logo front and center. Navy blue with white and red print. Comfortable, durable, and ready for the campaign trail.", category: "apparel" as const, price: 32.00, campaignDonationPercent: 35, imageUrl: "/store/tee-classic.png", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: ["Navy", "White", "Red"], inStock: true, featured: true, sortOrder: 1, sku: "KLB-TEE-001" },
      { name: "Georgia First Hoodie", description: "Heavyweight pullover hoodie. Front: Keisha for Governor logo. Back: 'Georgia First' in bold letters. Kangaroo pocket. Perfect for rallies and canvassing in cooler weather.", category: "apparel" as const, price: 55.00, campaignDonationPercent: 30, imageUrl: "/store/hoodie-ga.png", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Navy", "Black"], inStock: true, featured: true, sortOrder: 2, sku: "KLB-HOOD-001" },
      { name: "Campaign Trail Tank Top", description: "Lightweight tank for hot Georgia summers. Keisha for Governor logo on front. 'For the People' on back. Moisture-wicking fabric.", category: "apparel" as const, price: 28.00, campaignDonationPercent: 35, imageUrl: "/store/tank.png", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: ["Navy", "White"], inStock: true, featured: false, sortOrder: 3, sku: "KLB-TANK-001" },
      { name: "Keisha 2026 Long Sleeve", description: "Long sleeve tee with 'KEISHA 2026' across the chest. Slim fit. Campaign navy with red and white accents.", category: "apparel" as const, price: 38.00, campaignDonationPercent: 30, imageUrl: "/store/longsleeve.png", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy"], inStock: true, featured: false, sortOrder: 4, sku: "KLB-LS-001" },
      { name: "Volunteer Crew Polo", description: "Official volunteer polo shirt. Embroidered Keisha logo on chest. 'Volunteer' on back. Professional look for events and voter registration drives.", category: "apparel" as const, price: 42.00, campaignDonationPercent: 25, imageUrl: "/store/polo.png", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy", "Red"], inStock: true, featured: false, sortOrder: 5, sku: "KLB-POLO-001" },

      // ACCESSORIES
      { name: "Official Campaign Hat", description: "Structured snapback cap. Embroidered Keisha for Governor logo on front. Georgia state outline on side. Adjustable fit.", category: "accessories" as const, price: 30.00, campaignDonationPercent: 35, imageUrl: "/store/hat-snap.png", sizes: ["One Size"], colors: ["Navy", "Red", "White"], inStock: true, featured: true, sortOrder: 6, sku: "KLB-HAT-001" },
      { name: "Dad Hat - Peach State Edition", description: "Relaxed fit dad hat. Embroidered peach with 'KLB 2026' underneath. Unstructured, low profile. Adjustable strap.", category: "accessories" as const, price: 28.00, campaignDonationPercent: 35, imageUrl: "/store/hat-dad.png", sizes: ["One Size"], colors: ["Navy", "Khaki", "Black"], inStock: true, featured: false, sortOrder: 7, sku: "KLB-HAT-002" },
      { name: "Campaign Pin Set (5 Pack)", description: "Set of 5 enamel lapel pins. Includes: Keisha logo, Georgia outline, 'I Voted', peach, and BlueVote pins. Gold finish. Butterfly clutch backs.", category: "accessories" as const, price: 15.00, campaignDonationPercent: 40, imageUrl: "/store/pins.png", inStock: true, featured: true, sortOrder: 8, sku: "KLB-PIN-001" },
      { name: "Keisha Wristband Pack (3)", description: "Silicone wristbands. Navy, red, and white. Debossed 'Keisha for Governor 2026' text. One size fits most.", category: "accessories" as const, price: 8.00, campaignDonationPercent: 50, imageUrl: "/store/wristband.png", inStock: true, featured: false, sortOrder: 9, sku: "KLB-WRIST-001" },
      { name: "Campaign Lanyard & Badge Holder", description: "Navy lanyard with repeating Keisha logo. Includes clear ID badge holder. Perfect for events and rallies.", category: "accessories" as const, price: 10.00, campaignDonationPercent: 45, imageUrl: "/store/lanyard.png", inStock: true, featured: false, sortOrder: 10, sku: "KLB-LANY-001" },
      { name: "Phone Case - Keisha 2026", description: "Durable phone case with Keisha for Governor branding. Available for iPhone and Samsung Galaxy. Slim profile with raised edges.", category: "accessories" as const, price: 22.00, campaignDonationPercent: 30, imageUrl: "/store/phonecase.png", sizes: ["iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 16 Pro", "Samsung S24", "Samsung S25"], inStock: true, featured: false, sortOrder: 11, sku: "KLB-PHONE-001" },

      // DRINKWARE
      { name: "Campaign Coffee Mug", description: "15oz ceramic mug. Keisha for Governor logo on one side, 'Georgia First' on the other. Microwave and dishwasher safe. Navy blue interior.", category: "drinkware" as const, price: 18.00, campaignDonationPercent: 40, imageUrl: "/store/mug.png", inStock: true, featured: true, sortOrder: 12, sku: "KLB-MUG-001" },
      { name: "Insulated Travel Tumbler", description: "20oz stainless steel tumbler. Double-wall vacuum insulated. Keisha logo laser engraved. Keeps drinks hot 6hrs, cold 12hrs. BPA-free lid.", category: "drinkware" as const, price: 28.00, campaignDonationPercent: 30, imageUrl: "/store/tumbler.png", colors: ["Navy", "Red", "Black"], inStock: true, featured: false, sortOrder: 13, sku: "KLB-TUMB-001" },
      { name: "Water Bottle - For Georgia", description: "32oz sport water bottle. 'For Georgia' etched on front. Flip-top straw lid. BPA-free. Campaign navy.", category: "drinkware" as const, price: 20.00, campaignDonationPercent: 35, imageUrl: "/store/bottle.png", inStock: true, featured: false, sortOrder: 14, sku: "KLB-BOTTLE-001" },

      // SIGNS & POSTERS
      { name: "Yard Sign - Standard", description: "18x24 inch corrugated plastic yard sign. Double-sided. Keisha for Governor logo with 'Governor 2026'. Includes H-frame stake. Weather-resistant.", category: "signs" as const, price: 15.00, campaignDonationPercent: 40, imageUrl: "/store/yardsign.png", inStock: true, featured: true, sortOrder: 15, sku: "KLB-SIGN-001" },
      { name: "Yard Sign - Large", description: "24x36 inch large yard sign. Double-sided. Premium corrugated plastic. 'Keisha Lance Bottoms for Governor' with endorsement badges. Includes stake.", category: "signs" as const, price: 22.00, campaignDonationPercent: 40, imageUrl: "/store/yardsign-lg.png", inStock: true, featured: false, sortOrder: 16, sku: "KLB-SIGN-002" },
      { name: "Campaign Poster - Official", description: "18x24 inch glossy poster. Official campaign portrait with 'Keisha for Governor 2026'. Perfect for windows, walls, and events.", category: "signs" as const, price: 12.00, campaignDonationPercent: 50, imageUrl: "/store/poster.png", inStock: true, featured: false, sortOrder: 17, sku: "KLB-POST-001" },
      { name: "Window Cling", description: "12x12 inch static window cling. Reusable, leaves no residue. Keisha for Governor logo. Perfect for car windows and storefronts.", category: "signs" as const, price: 6.00, campaignDonationPercent: 55, imageUrl: "/store/windowcling.png", inStock: true, featured: false, sortOrder: 18, sku: "KLB-CLING-001" },
      { name: "Rally Banner - 3ft x 6ft", description: "Large vinyl banner for events and rallies. Grommets on all corners. Full color Keisha for Governor design. Indoor/outdoor use.", category: "signs" as const, price: 45.00, campaignDonationPercent: 25, imageUrl: "/store/banner.png", inStock: true, featured: false, sortOrder: 19, sku: "KLB-BAN-001" },

      // STICKERS
      { name: "Bumper Sticker", description: "11.5x3 inch vinyl bumper sticker. 'Keisha for Governor 2026'. UV-resistant, waterproof. Easy to apply and remove.", category: "stickers" as const, price: 5.00, campaignDonationPercent: 60, imageUrl: "/store/bumper.png", inStock: true, featured: true, sortOrder: 20, sku: "KLB-BUMP-001" },
      { name: "Sticker Sheet (10 Pack)", description: "Sheet of 10 die-cut vinyl stickers. Mix of Keisha logo, peach, 'I'm With Her', Georgia outline, and BlueVote designs. Waterproof.", category: "stickers" as const, price: 8.00, campaignDonationPercent: 55, imageUrl: "/store/stickers.png", inStock: true, featured: false, sortOrder: 21, sku: "KLB-STICK-001" },
      { name: "Car Magnet", description: "12x4 inch magnetic car sign. 'Keisha for Governor'. Easy on, easy off. No damage to paint. UV-coated.", category: "stickers" as const, price: 10.00, campaignDonationPercent: 45, imageUrl: "/store/magnet.png", inStock: true, featured: false, sortOrder: 22, sku: "KLB-MAG-001" },

      // BAGS
      { name: "Canvas Tote Bag", description: "Heavy-duty 12oz canvas tote. 'Keisha for Governor' screen printed on front. Interior pocket. Reinforced handles. Perfect for groceries and rallies.", category: "bags" as const, price: 22.00, campaignDonationPercent: 35, imageUrl: "/store/tote.png", colors: ["Natural", "Navy"], inStock: true, featured: true, sortOrder: 23, sku: "KLB-TOTE-001" },
      { name: "Drawstring Backpack", description: "Lightweight drawstring bag. Keisha logo on front. Great for events and door-to-door canvassing. Water-resistant material.", category: "bags" as const, price: 15.00, campaignDonationPercent: 40, imageUrl: "/store/drawstring.png", colors: ["Navy", "Red"], inStock: true, featured: false, sortOrder: 24, sku: "KLB-DRAW-001" },
      { name: "Fanny Pack - Campaign Edition", description: "Adjustable fanny pack with Keisha logo. Two zippered compartments. Perfect for rallies and volunteer shifts.", category: "bags" as const, price: 18.00, campaignDonationPercent: 35, imageUrl: "/store/fanny.png", colors: ["Navy", "Red"], inStock: true, featured: false, sortOrder: 25, sku: "KLB-FANNY-001" },

      // OTHER
      { name: "Campaign Button (3 Pack)", description: "2.25 inch round buttons. Pin back. Set of 3: 'Keisha 2026', 'Georgia First', and 'I Support Keisha'. Bold campaign colors.", category: "other" as const, price: 6.00, campaignDonationPercent: 60, imageUrl: "/store/buttons.png", inStock: true, featured: false, sortOrder: 26, sku: "KLB-BTN-001" },
      { name: "Campaign Pen Set (5)", description: "Blue ink ballpoint pens. 'Keisha for Governor 2026' printed on barrel. Black rubber grip. Box of 5.", category: "other" as const, price: 8.00, campaignDonationPercent: 50, imageUrl: "/store/pens.png", inStock: true, featured: false, sortOrder: 27, sku: "KLB-PEN-001" },
      { name: "Keisha Keychain", description: "Metal keychain with Keisha for Governor enamel charm. Split ring. Durable zinc alloy with campaign colors.", category: "other" as const, price: 8.00, campaignDonationPercent: 50, imageUrl: "/store/keychain.png", inStock: true, featured: false, sortOrder: 28, sku: "KLB-KEY-001" },
      { name: "Rally Foam Finger", description: "18 inch foam finger. '#1 Keisha' on front. Campaign navy and red. A rally must-have.", category: "other" as const, price: 10.00, campaignDonationPercent: 45, imageUrl: "/store/foam.png", inStock: true, featured: false, sortOrder: 29, sku: "KLB-FOAM-001" },
      { name: "Campaign Supporter Bundle", description: "The full package: Classic Tee, Hat, Yard Sign, Bumper Sticker, Pin Set, and Mug. Save 20% vs buying individually. Everything you need to show your support.", category: "other" as const, price: 89.00, campaignDonationPercent: 30, imageUrl: "/store/bundle.png", sizes: ["S", "M", "L", "XL", "2XL"], inStock: true, featured: true, sortOrder: 0, sku: "KLB-BUNDLE-001" },

      // EXPANDED CATALOG
      // More Apparel
      { name: "Keisha Windbreaker Jacket", description: "Lightweight zip-up windbreaker. Embroidered Keisha for Governor logo on left chest. 'Georgia First' across the back. Water-resistant. Packable.", category: "apparel" as const, price: 65.00, campaignDonationPercent: 25, imageUrl: "/store/windbreaker.png", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Navy", "Red", "Black"], inStock: true, featured: true, sortOrder: 30, sku: "KLB-WIND-001" },
      { name: "Fleece Full-Zip Jacket", description: "Heavyweight fleece jacket. Embroidered campaign logo. Two zippered pockets. Inner storm flap. Perfect for fall canvassing.", category: "apparel" as const, price: 58.00, campaignDonationPercent: 25, imageUrl: "/store/fleece.png", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy", "Charcoal"], inStock: true, featured: false, sortOrder: 31, sku: "KLB-FLEECE-001" },
      { name: "Quarter-Zip Pullover", description: "Midweight quarter-zip. Embroidered Keisha logo. Great layering piece for campaign events.", category: "apparel" as const, price: 48.00, campaignDonationPercent: 28, imageUrl: "/store/quarterzip.png", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy", "Gray"], inStock: true, featured: false, sortOrder: 32, sku: "KLB-QZ-001" },
      { name: "Crewneck Sweatshirt", description: "Classic crewneck sweatshirt. 'Keisha for Governor' bold print across chest. Fleece-lined interior. Ribbed cuffs and hem.", category: "apparel" as const, price: 45.00, campaignDonationPercent: 30, imageUrl: "/store/crewneck.png", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Navy", "Gray", "White"], inStock: true, featured: false, sortOrder: 33, sku: "KLB-CREW-001" },
      { name: "Women's V-Neck Tee", description: "Fitted women's V-neck tee. Soft cotton blend. Keisha for Governor logo. Slightly longer length.", category: "apparel" as const, price: 30.00, campaignDonationPercent: 35, imageUrl: "/store/vneck.png", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: ["Navy", "White", "Red"], inStock: true, featured: false, sortOrder: 34, sku: "KLB-VNECK-001" },
      { name: "Youth Campaign Tee", description: "Kids' tee. 'Future Georgia Voter' on front with Keisha logo. Soft ringspun cotton. Ages 4-14.", category: "apparel" as const, price: 22.00, campaignDonationPercent: 40, imageUrl: "/store/youth-tee.png", sizes: ["YS (4-6)", "YM (8-10)", "YL (12-14)"], colors: ["Navy", "White"], inStock: true, featured: false, sortOrder: 35, sku: "KLB-YTEE-001" },
      { name: "Campaign Joggers", description: "French terry joggers with embroidered Keisha logo on left thigh. Elastic waist with drawstring. Tapered leg. Side pockets.", category: "apparel" as const, price: 48.00, campaignDonationPercent: 25, imageUrl: "/store/joggers.png", sizes: ["S", "M", "L", "XL", "2XL"], colors: ["Navy", "Black"], inStock: true, featured: false, sortOrder: 36, sku: "KLB-JOG-001" },
      { name: "Keisha Socks (3 Pack)", description: "Crew-length socks. Campaign navy, red, and white pair. Knit-in Keisha logo. Reinforced toe and heel.", category: "apparel" as const, price: 16.00, campaignDonationPercent: 45, imageUrl: "/store/socks.png", sizes: ["S/M (6-9)", "L/XL (10-13)"], inStock: true, featured: false, sortOrder: 37, sku: "KLB-SOCK-001" },

      // More Car & Visibility Items
      { name: "Car Door Magnet (Pair)", description: "12x18 inch magnetic car door signs. Set of 2 for both sides. 'Keisha for Governor 2026' with full logo. Easy on/off, no damage.", category: "signs" as const, price: 25.00, campaignDonationPercent: 35, imageUrl: "/store/car-magnet-lg.png", inStock: true, featured: true, sortOrder: 38, sku: "KLB-CMAG-001" },
      { name: "Rear Window Decal", description: "Large 12x12 inch die-cut vinyl decal for rear windows. White Keisha logo. Visible from behind. Easy application.", category: "stickers" as const, price: 8.00, campaignDonationPercent: 50, imageUrl: "/store/rear-decal.png", inStock: true, featured: false, sortOrder: 39, sku: "KLB-RDECAL-001" },
      { name: "Side Window Flag (Pair)", description: "Car window flags that clip to side windows. Double-sided Keisha for Governor print. Set of 2. Fits most vehicles.", category: "signs" as const, price: 18.00, campaignDonationPercent: 40, imageUrl: "/store/window-flag.png", inStock: true, featured: false, sortOrder: 40, sku: "KLB-WFLAG-001" },
      { name: "License Plate Frame", description: "Chrome metal license plate frame. 'Keisha for Governor' on top, 'Georgia 2026' on bottom. Fits standard US plates.", category: "accessories" as const, price: 15.00, campaignDonationPercent: 40, imageUrl: "/store/plate-frame.png", inStock: true, featured: false, sortOrder: 41, sku: "KLB-LPF-001" },
      { name: "Rearview Mirror Hang Tag", description: "Double-sided hanging card for rearview mirror. Campaign logo on front, 'Vote 2026' on back. Includes string.", category: "accessories" as const, price: 5.00, campaignDonationPercent: 60, imageUrl: "/store/hangtag.png", inStock: true, featured: false, sortOrder: 42, sku: "KLB-HANG-001" },
      { name: "Visor Clip Badge", description: "Campaign badge that clips to your car sun visor. Metal and enamel. Show your support every time you flip down the visor.", category: "accessories" as const, price: 8.00, campaignDonationPercent: 50, imageUrl: "/store/visor-clip.png", inStock: true, featured: false, sortOrder: 43, sku: "KLB-VISOR-001" },

      // Wallet & Personal
      { name: "Campaign Wallet - Bifold", description: "Faux leather bifold wallet. Debossed Keisha for Governor seal on front. RFID blocking. Multiple card slots. Navy blue.", category: "accessories" as const, price: 25.00, campaignDonationPercent: 30, imageUrl: "/store/wallet.png", inStock: true, featured: false, sortOrder: 44, sku: "KLB-WALL-001" },
      { name: "Card Holder / Slim Wallet", description: "Slim card holder. Debossed KLB initials. Holds up to 6 cards. Perfect front-pocket wallet.", category: "accessories" as const, price: 18.00, campaignDonationPercent: 35, imageUrl: "/store/cardholder.png", colors: ["Navy", "Black"], inStock: true, featured: false, sortOrder: 45, sku: "KLB-CARD-001" },
      { name: "Keisha Sunglasses", description: "Campaign-branded sunglasses. Navy frames with 'Keisha 2026' on the arms. UV400 protection. Great for outdoor rallies.", category: "accessories" as const, price: 12.00, campaignDonationPercent: 45, imageUrl: "/store/sunglasses.png", inStock: true, featured: false, sortOrder: 46, sku: "KLB-SUN-001" },
      { name: "Rally Hand Fan", description: "Paddle-style hand fan. Campaign design on front, platform priorities on back. Perfect for Georgia summer events.", category: "other" as const, price: 5.00, campaignDonationPercent: 60, imageUrl: "/store/fan.png", inStock: true, featured: false, sortOrder: 47, sku: "KLB-FAN-001" },
      { name: "Umbrella - Full Size", description: "44 inch arc automatic open umbrella. Campaign navy with Keisha logo. Fiberglass shaft. Rubberized handle.", category: "accessories" as const, price: 22.00, campaignDonationPercent: 30, imageUrl: "/store/umbrella.png", inStock: true, featured: false, sortOrder: 48, sku: "KLB-UMB-001" },
      { name: "Rally Towel", description: "15x18 inch microfiber rally towel. Wave it at events. 'Keisha for Governor' print. Campaign navy.", category: "other" as const, price: 10.00, campaignDonationPercent: 50, imageUrl: "/store/towel.png", inStock: true, featured: false, sortOrder: 49, sku: "KLB-TOWEL-001" },
      { name: "Supporter Dog Bandana", description: "Triangle bandana for dogs. 'Paws for Keisha' print. Adjustable tie. Small, Medium, Large sizes.", category: "other" as const, price: 14.00, campaignDonationPercent: 45, imageUrl: "/store/dog-bandana.png", sizes: ["Small", "Medium", "Large"], inStock: true, featured: false, sortOrder: 50, sku: "KLB-DOG-001" },
    ];

    for (const p of products) {
      await ctx.db.insert("products", p);
    }

    return "Store seeded with " + products.length + " products";
  },
});

