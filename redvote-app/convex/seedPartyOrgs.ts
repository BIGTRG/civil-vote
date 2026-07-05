import { mutation } from "./_generated/server";

export const seedPartyOrgs = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("partyOrganizations").first();
    if (existing) {
      console.log("Party organizations already seeded");
      return "already_seeded";
    }

    const orgs = [
      { name: "Republican National Committee", abbreviation: "RNC", level: "federal" as const, party: "republican" as const, website: "https://www.gop.com", category: "National Committee", description: "The formal governing body for the United States Republican Party" },
      { name: "National Republican Congressional Committee", abbreviation: "NRCC", level: "federal" as const, party: "republican" as const, website: "https://www.nrcc.org", category: "Campaign Committee", description: "Works to elect Republicans to the U.S. House of Representatives" },
      { name: "National Republican Senatorial Committee", abbreviation: "NRSC", level: "federal" as const, party: "republican" as const, website: "https://www.nrsc.org", category: "Campaign Committee", description: "Works to elect Republicans to the U.S. Senate" },
      { name: "Republican Governors Association", abbreviation: "RGA", level: "federal" as const, party: "republican" as const, website: "https://www.rga.org", category: "Governors", description: "Supports Republican gubernatorial candidates across the country" },
      { name: "Republican State Leadership Committee", abbreviation: "RSLC", level: "federal" as const, party: "republican" as const, website: "https://www.rslc.gop", category: "State Legislatures", description: "Dedicated to winning state legislative seats for Republicans" },
      { name: "Young Republicans National Federation", abbreviation: "YRNF", level: "federal" as const, party: "republican" as const, website: "https://www.yrnf.com", category: "Youth", description: "National organization for young Republican activists" },
      { name: "College Republican National Committee", abbreviation: "CRNC", level: "federal" as const, party: "republican" as const, website: "https://www.crnc.org", category: "Youth", description: "Student wing of the Republican Party on college campuses" },
      { name: "Republican Attorneys General Association", abbreviation: "RAGA", level: "federal" as const, party: "republican" as const, website: "https://www.republicanags.com", category: "Attorneys General", description: "Supports the election of Republican attorneys general" },
      { name: "Alabama Republican Party", level: "state" as const, party: "republican" as const, state: "Alabama", website: "https://www.algop.org", category: "State Party" },
      { name: "Alaska Republican Party", level: "state" as const, party: "republican" as const, state: "Alaska", website: "https://www.alaskagop.net", category: "State Party" },
      { name: "Arizona Republican Party", level: "state" as const, party: "republican" as const, state: "Arizona", website: "https://www.azgop.org", category: "State Party" },
      { name: "Arkansas Republican Party", level: "state" as const, party: "republican" as const, state: "Arkansas", website: "https://www.arkansasgop.org", category: "State Party" },
      { name: "California Republican Party", level: "state" as const, party: "republican" as const, state: "California", website: "https://www.cagop.org", category: "State Party" },
      { name: "Colorado Republican Party", level: "state" as const, party: "republican" as const, state: "Colorado", website: "https://www.cologop.org", category: "State Party" },
      { name: "Connecticut Republican Party", level: "state" as const, party: "republican" as const, state: "Connecticut", website: "https://www.ctgop.org", category: "State Party" },
      { name: "Delaware Republican Party", level: "state" as const, party: "republican" as const, state: "Delaware", website: "https://www.delawaregop.com", category: "State Party" },
      { name: "District of Columbia Republican Party", level: "state" as const, party: "republican" as const, state: "District of Columbia", website: "https://www.dcgop.com", category: "State Party" },
      { name: "Florida Republican Party", level: "state" as const, party: "republican" as const, state: "Florida", website: "https://www.florida.gop", category: "State Party" },
      { name: "Georgia Republican Party", level: "state" as const, party: "republican" as const, state: "Georgia", website: "https://www.gagop.org", category: "State Party" },
      { name: "Hawaii Republican Party", level: "state" as const, party: "republican" as const, state: "Hawaii", website: "https://www.gophawaii.com", category: "State Party" },
      { name: "Idaho Republican Party", level: "state" as const, party: "republican" as const, state: "Idaho", website: "https://www.idgop.org", category: "State Party" },
      { name: "Illinois Republican Party", level: "state" as const, party: "republican" as const, state: "Illinois", website: "https://www.ilgop.org", category: "State Party" },
      { name: "Indiana Republican Party", level: "state" as const, party: "republican" as const, state: "Indiana", website: "https://www.indiana.gop", category: "State Party" },
      { name: "Iowa Republican Party", level: "state" as const, party: "republican" as const, state: "Iowa", website: "https://www.iowagop.org", category: "State Party" },
      { name: "Kansas Republican Party", level: "state" as const, party: "republican" as const, state: "Kansas", website: "https://www.kansas.gop", category: "State Party" },
      { name: "Kentucky Republican Party", level: "state" as const, party: "republican" as const, state: "Kentucky", website: "https://www.rpk.org", category: "State Party" },
      { name: "Louisiana Republican Party", level: "state" as const, party: "republican" as const, state: "Louisiana", website: "https://www.lagop.com", category: "State Party" },
      { name: "Maine Republican Party", level: "state" as const, party: "republican" as const, state: "Maine", website: "https://www.mainegop.com", category: "State Party" },
      { name: "Maryland Republican Party", level: "state" as const, party: "republican" as const, state: "Maryland", website: "https://www.mdgop.org", category: "State Party" },
      { name: "Massachusetts Republican Party", level: "state" as const, party: "republican" as const, state: "Massachusetts", website: "https://www.massgop.com", category: "State Party" },
      { name: "Michigan Republican Party", level: "state" as const, party: "republican" as const, state: "Michigan", website: "https://www.migop.org", category: "State Party" },
      { name: "Minnesota Republican Party", level: "state" as const, party: "republican" as const, state: "Minnesota", website: "https://www.mngop.com", category: "State Party" },
      { name: "Mississippi Republican Party", level: "state" as const, party: "republican" as const, state: "Mississippi", website: "https://www.msgop.org", category: "State Party" },
      { name: "Missouri Republican Party", level: "state" as const, party: "republican" as const, state: "Missouri", website: "https://www.mogop.org", category: "State Party" },
      { name: "Montana Republican Party", level: "state" as const, party: "republican" as const, state: "Montana", website: "https://www.mtgop.org", category: "State Party" },
      { name: "Nebraska Republican Party", level: "state" as const, party: "republican" as const, state: "Nebraska", website: "https://www.negop.org", category: "State Party" },
      { name: "Nevada Republican Party", level: "state" as const, party: "republican" as const, state: "Nevada", website: "https://www.nevadagop.org", category: "State Party" },
      { name: "New Hampshire Republican Party", level: "state" as const, party: "republican" as const, state: "New Hampshire", website: "https://www.nhgop.org", category: "State Party" },
      { name: "New Jersey Republican Party", level: "state" as const, party: "republican" as const, state: "New Jersey", website: "https://www.njgop.org", category: "State Party" },
      { name: "New Mexico Republican Party", level: "state" as const, party: "republican" as const, state: "New Mexico", website: "https://www.gopnm.org", category: "State Party" },
      { name: "New York Republican Party", level: "state" as const, party: "republican" as const, state: "New York", website: "https://www.nygop.org", category: "State Party" },
      { name: "North Carolina Republican Party", level: "state" as const, party: "republican" as const, state: "North Carolina", website: "https://www.ncgop.org", category: "State Party" },
      { name: "North Dakota Republican Party", level: "state" as const, party: "republican" as const, state: "North Dakota", website: "https://www.ndgop.org", category: "State Party" },
      { name: "Ohio Republican Party", level: "state" as const, party: "republican" as const, state: "Ohio", website: "https://www.ohiogop.org", category: "State Party" },
      { name: "Oklahoma Republican Party", level: "state" as const, party: "republican" as const, state: "Oklahoma", website: "https://www.okgop.com", category: "State Party" },
      { name: "Oregon Republican Party", level: "state" as const, party: "republican" as const, state: "Oregon", website: "https://www.oregon.gop", category: "State Party" },
      { name: "Pennsylvania Republican Party", level: "state" as const, party: "republican" as const, state: "Pennsylvania", website: "https://www.pagop.org", category: "State Party" },
      { name: "Rhode Island Republican Party", level: "state" as const, party: "republican" as const, state: "Rhode Island", website: "https://www.rigop.org", category: "State Party" },
      { name: "South Carolina Republican Party", level: "state" as const, party: "republican" as const, state: "South Carolina", website: "https://www.scgop.com", category: "State Party" },
      { name: "South Dakota Republican Party", level: "state" as const, party: "republican" as const, state: "South Dakota", website: "https://www.sdgop.com", category: "State Party" },
      { name: "Tennessee Republican Party", level: "state" as const, party: "republican" as const, state: "Tennessee", website: "https://www.tngop.org", category: "State Party" },
      { name: "Texas Republican Party", level: "state" as const, party: "republican" as const, state: "Texas", website: "https://www.texasgop.org", category: "State Party" },
      { name: "Utah Republican Party", level: "state" as const, party: "republican" as const, state: "Utah", website: "https://www.utgop.org", category: "State Party" },
      { name: "Vermont Republican Party", level: "state" as const, party: "republican" as const, state: "Vermont", website: "https://www.vtgop.org", category: "State Party" },
      { name: "Virginia Republican Party", level: "state" as const, party: "republican" as const, state: "Virginia", website: "https://www.virginia.gop", category: "State Party" },
      { name: "Washington Republican Party", level: "state" as const, party: "republican" as const, state: "Washington", website: "https://www.wsrp.org", category: "State Party" },
      { name: "West Virginia Republican Party", level: "state" as const, party: "republican" as const, state: "West Virginia", website: "https://www.wvgop.org", category: "State Party" },
      { name: "Wisconsin Republican Party", level: "state" as const, party: "republican" as const, state: "Wisconsin", website: "https://www.wisgop.org", category: "State Party" },
      { name: "Wyoming Republican Party", level: "state" as const, party: "republican" as const, state: "Wyoming", website: "https://www.wyoming.gop", category: "State Party" },
    ];

    for (const org of orgs) {
      await ctx.db.insert("partyOrganizations", org);
    }

    console.log(`Seeded ${orgs.length} party organizations`);
    return `seeded_${orgs.length}`;
  },
});