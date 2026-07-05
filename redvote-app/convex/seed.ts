import { mutation } from "./_generated/server";

export const seedDemoData = mutation({
  handler: async (ctx) => {
    const existingRaces = await ctx.db.query("races").first();
    if (existingRaces) return "Data already seeded";

    // Create 3 pilot state races
    const gaGov = await ctx.db.insert("races", {
      title: "Georgia Governor 2026",
      state: "GA",
      type: "state",
      electionDate: "2026-11-03",
      status: "active",
      description: "Georgia gubernatorial race — one of the most watched state races in the nation.",
      totalPledges: 1247,
      totalRaised: 18420,
    });

    const azSenate = await ctx.db.insert("races", {
      title: "Arizona U.S. Senate 2026",
      state: "AZ",
      type: "federal",
      electionDate: "2026-11-03",
      status: "active",
      description: "Critical Senate seat that could determine majority control.",
      totalPledges: 2103,
      totalRaised: 42850,
    });

    const paCongress = await ctx.db.insert("races", {
      title: "Pennsylvania 7th Congressional District",
      state: "PA",
      district: "7th",
      type: "federal",
      electionDate: "2026-11-03",
      status: "active",
      description: "Swing district with national implications for House control.",
      totalPledges: 893,
      totalRaised: 12670,
    });

    // GA candidates
    const stacey = await ctx.db.insert("candidates", {
      name: "Stacey Williams",
      raceId: gaGov,
      party: "democrat",
      bio: "Former state senator and voting rights advocate. Focused on education reform, healthcare expansion, and economic opportunity for all Georgians.",
      positions: [
        { issue: "Education", stance: "Increase teacher pay 25%, universal pre-K statewide" },
        { issue: "Healthcare", stance: "Expand Medicaid, cap insulin at $35/month" },
        { issue: "Economy", stance: "Small business grants, job training programs" },
        { issue: "Voting Rights", stance: "Automatic voter registration, expand early voting" },
      ],
      endorsements: ["Georgia Education Association", "AFL-CIO Georgia"],
      website: "https://example.com/williams",
      pledgeCount: 465,
      totalRaised: 6820,
    });

    const marcus = await ctx.db.insert("candidates", {
      name: "Marcus Thompson",
      raceId: gaGov,
      party: "republican",
      bio: "Business owner and former county commissioner. Running on fiscal responsibility, public safety, and limited government.",
      positions: [
        { issue: "Economy", stance: "Cut business taxes 15%, reduce regulations, attract investment" },
        { issue: "Public Safety", stance: "Increase law enforcement funding, tough-on-crime policies" },
        { issue: "Education", stance: "Universal school choice, parental rights, merit-based pay" },
        { issue: "Infrastructure", stance: "Highway expansion, rural broadband, private-public partnerships" },
      ],
      endorsements: ["Georgia Chamber of Commerce", "Fraternal Order of Police GA"],
      website: "https://example.com/thompson",
      pledgeCount: 782,
      totalRaised: 11600,
    });

    // AZ candidates
    const elena = await ctx.db.insert("candidates", {
      name: "Elena Rodriguez",
      raceId: azSenate,
      party: "democrat",
      bio: "Immigration attorney turned state representative. Champion for border communities.",
      positions: [
        { issue: "Immigration", stance: "Comprehensive reform, pathway to citizenship" },
        { issue: "Water", stance: "Colorado River conservation, desalination" },
        { issue: "Energy", stance: "100% clean energy by 2035" },
        { issue: "Healthcare", stance: "Public option, lower drug prices" },
      ],
      endorsements: ["Arizona AFL-CIO"],
      website: "https://example.com/rodriguez",
      pledgeCount: 763,
      totalRaised: 13950,
    });

    const james = await ctx.db.insert("candidates", {
      name: "James Crawford",
      raceId: azSenate,
      party: "republican",
      bio: "Retired military officer and rancher. Focused on border security, veterans affairs, and limited government. 25 years of service.",
      positions: [
        { issue: "Border Security", stance: "Complete the wall, increase Border Patrol, end catch-and-release" },
        { issue: "Veterans", stance: "Expanded VA benefits, reduce wait times, veteran hiring tax credits" },
        { issue: "Economy", stance: "Flat tax proposal, slash regulations, energy independence" },
        { issue: "Second Amendment", stance: "Protect constitutional carry, oppose federal gun registry" },
      ],
      endorsements: ["Veterans of Foreign Wars AZ", "NRA", "Arizona Farm Bureau"],
      website: "https://example.com/crawford",
      pledgeCount: 1340,
      totalRaised: 28900,
    });

    // PA candidates
    const sarah = await ctx.db.insert("candidates", {
      name: "Sarah Chen",
      raceId: paCongress,
      party: "democrat",
      bio: "Former school principal and community organizer. Running on kitchen table issues.",
      positions: [
        { issue: "Healthcare", stance: "Protect ACA, add public option" },
        { issue: "Education", stance: "Fully fund Title I, student debt relief" },
        { issue: "Labor", stance: "Pro-union, $15 minimum wage" },
        { issue: "Climate", stance: "Green jobs transition" },
      ],
      endorsements: ["Pennsylvania Education Association"],
      website: "https://example.com/chen",
      pledgeCount: 372,
      totalRaised: 5250,
    });

    const robert = await ctx.db.insert("candidates", {
      name: "Robert Miller",
      raceId: paCongress,
      party: "republican",
      bio: "Small business owner and city councilman. Job creator who built his company from nothing. Focused on economic growth, energy jobs, and community values.",
      positions: [
        { issue: "Economy", stance: "Lower taxes for families and small business, opportunity zones" },
        { issue: "Energy", stance: "All-of-the-above energy, protect fracking jobs, energy exports" },
        { issue: "Public Safety", stance: "Back the blue, community policing, victim rights" },
        { issue: "Government", stance: "Term limits, balanced budget amendment, audit the Fed" },
      ],
      endorsements: ["PA Chamber of Business and Industry", "Fraternal Order of Police"],
      website: "https://example.com/miller",
      pledgeCount: 521,
      totalRaised: 7420,
    });

    // Public Pulse — RedVote shows Republican candidates leading
    await ctx.db.insert("publicPulse", {
      raceId: gaGov, candidateId: marcus, candidateName: "Marcus Thompson", party: "republican",
      pledgeCount: 782, totalRaised: 11600, percentageOfVotes: 62.7, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: gaGov, candidateId: stacey, candidateName: "Stacey Williams", party: "democrat",
      pledgeCount: 465, totalRaised: 6820, percentageOfVotes: 37.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: azSenate, candidateId: james, candidateName: "James Crawford", party: "republican",
      pledgeCount: 1340, totalRaised: 28900, percentageOfVotes: 63.7, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: azSenate, candidateId: elena, candidateName: "Elena Rodriguez", party: "democrat",
      pledgeCount: 763, totalRaised: 13950, percentageOfVotes: 36.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: paCongress, candidateId: robert, candidateName: "Robert Miller", party: "republican",
      pledgeCount: 521, totalRaised: 7420, percentageOfVotes: 58.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: paCongress, candidateId: sarah, candidateName: "Sarah Chen", party: "democrat",
      pledgeCount: 372, totalRaised: 5250, percentageOfVotes: 41.7, lastUpdated: new Date().toISOString(),
    });

    // Promises — feature Republican candidate promises
    await ctx.db.insert("promises", {
      candidateId: marcus, raceId: gaGov,
      title: "Cut Business Taxes 15%",
      description: "Reduce state business tax rate by 15% in the first year to attract investment and create jobs.",
      category: "Economy", status: "pending", datePromised: "2026-03-10",
      evidence: [{ date: "2026-03-10", note: "Announced at Georgia Chamber of Commerce annual dinner" }],
      hash: "r1a2b3c4d5e6",
    });
    await ctx.db.insert("promises", {
      candidateId: james, raceId: azSenate,
      title: "Complete Border Wall in Arizona",
      description: "Secure federal funding to complete all remaining border wall sections in Arizona within first term.",
      category: "Border Security", status: "pending", datePromised: "2026-02-14",
      evidence: [{ date: "2026-02-14", note: "Policy address at Yuma Border Patrol station" }],
      hash: "r2b3c4d5e6f7",
    });
    await ctx.db.insert("promises", {
      candidateId: robert, raceId: paCongress,
      title: "Term Limits Constitutional Amendment",
      description: "Co-sponsor constitutional amendment for 12-year congressional term limits on Day 1.",
      category: "Government Reform", status: "pending", datePromised: "2026-04-05",
      evidence: [{ date: "2026-04-05", note: "Signed Term Limits Pledge at town hall in Chester County" }],
      hash: "r3c4d5e6f7g8",
    });

    // Voter issues
    await ctx.db.insert("voterIssues", {
      title: "Property Tax Relief for Seniors",
      description: "Fixed-income seniors are being taxed out of their homes. We need a property tax cap or freeze for residents over 65.",
      category: "Economy", state: "GA", upvotes: 891, status: "acknowledged",
      createdAt: "2026-05-10T10:00:00Z", responses: [],
    });
    await ctx.db.insert("voterIssues", {
      title: "Secure the Southern Border Now",
      description: "Drug trafficking and illegal crossings are impacting our communities. We need immediate action on border security.",
      category: "Public Safety", state: "AZ", upvotes: 1243, status: "acknowledged",
      createdAt: "2026-05-18T14:00:00Z", responses: [],
    });

    // Activity feed
    const activities = [
      { type: "pledge" as const, message: "782 patriots have pledged for Marcus Thompson in Georgia", state: "GA", createdAt: "2026-06-14T12:00:00Z" },
      { type: "milestone" as const, message: "James Crawford crosses $28,000 in pledges -- Arizona is fired up!", state: "AZ", createdAt: "2026-06-14T10:00:00Z" },
      { type: "new_race" as const, message: "Pennsylvania 7th Congressional District added to RedVote", state: "PA", createdAt: "2026-06-13T08:00:00Z" },
      { type: "issue" as const, message: "Top issue: Secure the Southern Border Now (1,243 upvotes)", state: "AZ", createdAt: "2026-06-12T14:00:00Z" },
      { type: "promise_update" as const, message: "Marcus Thompson pledges 15% business tax cut for Georgia", state: "GA", createdAt: "2026-06-11T09:00:00Z" },
    ];
    for (const a of activities) {
      await ctx.db.insert("activityFeed", a);
    }

    return "Demo data seeded successfully";
  },
});
