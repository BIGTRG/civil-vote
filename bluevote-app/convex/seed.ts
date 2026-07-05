import { mutation } from "./_generated/server";

export const seedDemoData = mutation({
  handler: async (ctx) => {
    // Check if data already exists
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
      pledgeCount: 782,
      totalRaised: 11600,
    });

    const marcus = await ctx.db.insert("candidates", {
      name: "Marcus Thompson",
      raceId: gaGov,
      party: "republican",
      bio: "Business owner and former county commissioner. Running on fiscal responsibility and public safety platform.",
      positions: [
        { issue: "Economy", stance: "Cut business taxes, reduce regulations" },
        { issue: "Public Safety", stance: "Increase law enforcement funding" },
        { issue: "Education", stance: "School choice, parental rights" },
        { issue: "Infrastructure", stance: "Highway expansion, rural broadband" },
      ],
      endorsements: ["Georgia Chamber of Commerce"],
      website: "https://example.com/thompson",
      pledgeCount: 465,
      totalRaised: 6820,
    });

    // AZ candidates
    const elena = await ctx.db.insert("candidates", {
      name: "Elena Rodriguez",
      raceId: azSenate,
      party: "democrat",
      bio: "Immigration attorney turned state representative. Champion for border communities, water conservation, and renewable energy.",
      positions: [
        { issue: "Immigration", stance: "Comprehensive reform, pathway to citizenship, humane border policy" },
        { issue: "Water", stance: "Colorado River conservation, desalination investment" },
        { issue: "Energy", stance: "100% clean energy by 2035, solar manufacturing jobs" },
        { issue: "Healthcare", stance: "Public option, lower drug prices" },
      ],
      endorsements: ["Arizona AFL-CIO", "League of Conservation Voters"],
      website: "https://example.com/rodriguez",
      pledgeCount: 1340,
      totalRaised: 28900,
    });

    const james = await ctx.db.insert("candidates", {
      name: "James Crawford",
      raceId: azSenate,
      party: "republican",
      bio: "Retired military officer and rancher. Focused on border security, veterans affairs, and limited government.",
      positions: [
        { issue: "Border Security", stance: "Complete the wall, increase agents" },
        { issue: "Veterans", stance: "Expanded VA benefits, reduce wait times" },
        { issue: "Economy", stance: "Tax cuts, deregulation" },
        { issue: "Second Amendment", stance: "Protect gun rights, oppose restrictions" },
      ],
      endorsements: ["Veterans of Foreign Wars AZ"],
      website: "https://example.com/crawford",
      pledgeCount: 763,
      totalRaised: 13950,
    });

    // PA candidates
    const sarah = await ctx.db.insert("candidates", {
      name: "Sarah Chen",
      raceId: paCongress,
      party: "democrat",
      bio: "Former school principal and community organizer. Running on kitchen table issues — healthcare, education, and good-paying jobs.",
      positions: [
        { issue: "Healthcare", stance: "Protect ACA, add public option" },
        { issue: "Education", stance: "Fully fund Title I, student debt relief" },
        { issue: "Labor", stance: "Pro-union, $15 minimum wage, paid family leave" },
        { issue: "Climate", stance: "Green jobs transition, environmental justice" },
      ],
      endorsements: ["Pennsylvania Education Association", "SEIU"],
      website: "https://example.com/chen",
      pledgeCount: 521,
      totalRaised: 7420,
    });

    const robert = await ctx.db.insert("candidates", {
      name: "Robert Miller",
      raceId: paCongress,
      party: "republican",
      bio: "Small business owner and city councilman. Focused on economic growth and community values.",
      positions: [
        { issue: "Economy", stance: "Lower taxes, support small business" },
        { issue: "Energy", stance: "All-of-the-above energy, protect fracking jobs" },
        { issue: "Public Safety", stance: "Back the blue, tough on crime" },
        { issue: "Government", stance: "Term limits, balanced budget amendment" },
      ],
      endorsements: ["PA Chamber of Business and Industry"],
      website: "https://example.com/miller",
      pledgeCount: 372,
      totalRaised: 5250,
    });

    // Public Pulse data
    await ctx.db.insert("publicPulse", {
      raceId: gaGov, candidateId: stacey, candidateName: "Stacey Williams", party: "democrat",
      pledgeCount: 782, totalRaised: 11600, percentageOfVotes: 62.7, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: gaGov, candidateId: marcus, candidateName: "Marcus Thompson", party: "republican",
      pledgeCount: 465, totalRaised: 6820, percentageOfVotes: 37.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: azSenate, candidateId: elena, candidateName: "Elena Rodriguez", party: "democrat",
      pledgeCount: 1340, totalRaised: 28900, percentageOfVotes: 63.7, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: azSenate, candidateId: james, candidateName: "James Crawford", party: "republican",
      pledgeCount: 763, totalRaised: 13950, percentageOfVotes: 36.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: paCongress, candidateId: sarah, candidateName: "Sarah Chen", party: "democrat",
      pledgeCount: 521, totalRaised: 7420, percentageOfVotes: 58.3, lastUpdated: new Date().toISOString(),
    });
    await ctx.db.insert("publicPulse", {
      raceId: paCongress, candidateId: robert, candidateName: "Robert Miller", party: "republican",
      pledgeCount: 372, totalRaised: 5250, percentageOfVotes: 41.7, lastUpdated: new Date().toISOString(),
    });

    // Promises
    await ctx.db.insert("promises", {
      candidateId: stacey, raceId: gaGov,
      title: "Raise Teacher Pay 25%",
      description: "Increase all public school teacher salaries by 25% within the first two years of office.",
      category: "Education", status: "pending", datePromised: "2026-03-15",
      evidence: [{ date: "2026-03-15", note: "Announced at Georgia Education Rally in Atlanta" }],
      hash: "a1b2c3d4e5f6",
    });
    await ctx.db.insert("promises", {
      candidateId: elena, raceId: azSenate,
      title: "100% Clean Energy by 2035",
      description: "Introduce legislation to transition Arizona to 100% renewable energy sources by 2035.",
      category: "Energy", status: "pending", datePromised: "2026-02-20",
      evidence: [{ date: "2026-02-20", note: "Policy paper released, endorsed by League of Conservation Voters" }],
      hash: "b2c3d4e5f6g7",
    });
    await ctx.db.insert("promises", {
      candidateId: sarah, raceId: paCongress,
      title: "$15 Minimum Wage",
      description: "Co-sponsor federal $15/hour minimum wage legislation in first 100 days.",
      category: "Labor", status: "pending", datePromised: "2026-04-01",
      evidence: [{ date: "2026-04-01", note: "Campaign pledge at SEIU endorsement event" }],
      hash: "c3d4e5f6g7h8",
    });

    // Voter issues
    await ctx.db.insert("voterIssues", {
      title: "Water Infrastructure in Rural Georgia",
      description: "Many rural communities still lack clean drinking water. We need state investment in water infrastructure.",
      category: "Infrastructure", state: "GA", upvotes: 234, status: "open",
      createdAt: "2026-05-15T10:00:00Z", responses: [],
    });
    await ctx.db.insert("voterIssues", {
      title: "Affordable Housing Crisis in Phoenix",
      description: "Housing costs have doubled in 5 years. Working families are being priced out of the city.",
      category: "Housing", state: "AZ", upvotes: 567, status: "acknowledged",
      createdAt: "2026-05-20T14:00:00Z", responses: [],
    });

    // Activity feed
    const activities = [
      { type: "pledge" as const, message: "1,247 voters have pledged in the Georgia Governor race", state: "GA", createdAt: "2026-06-14T12:00:00Z" },
      { type: "milestone" as const, message: "Arizona Senate race crossed $40,000 in total pledges!", state: "AZ", createdAt: "2026-06-14T10:00:00Z" },
      { type: "new_race" as const, message: "Pennsylvania 7th Congressional District added to BlueVote", state: "PA", createdAt: "2026-06-13T08:00:00Z" },
      { type: "issue" as const, message: "New voter issue: Affordable Housing Crisis in Phoenix", state: "AZ", createdAt: "2026-06-12T14:00:00Z" },
      { type: "promise_update" as const, message: "Stacey Williams added promise: Raise Teacher Pay 25%", state: "GA", createdAt: "2026-06-11T09:00:00Z" },
    ];
    for (const a of activities) {
      await ctx.db.insert("activityFeed", a);
    }

    return "Demo data seeded successfully";
  },
});
