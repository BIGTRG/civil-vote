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
      { name: "Democratic National Committee", abbreviation: "DNC", level: "federal" as const, party: "democrat" as const, website: "https://democrats.org", category: "National Committee", description: "The formal governing body for the United States Democratic Party" },
      { name: "Democratic Congressional Campaign Committee", abbreviation: "DCCC", level: "federal" as const, party: "democrat" as const, website: "https://www.dccc.org", category: "Campaign Committee", description: "Works to elect Democrats to the U.S. House of Representatives" },
      { name: "Democratic Senatorial Campaign Committee", abbreviation: "DSCC", level: "federal" as const, party: "democrat" as const, website: "https://www.dscc.org", category: "Campaign Committee", description: "Works to elect Democrats to the U.S. Senate" },
      { name: "Democratic Governors Association", abbreviation: "DGA", level: "federal" as const, party: "democrat" as const, website: "https://www.democraticgovernors.org", category: "Governors", description: "Supports Democratic gubernatorial candidates across the country" },
      { name: "Democratic Legislative Campaign Committee", abbreviation: "DLCC", level: "federal" as const, party: "democrat" as const, website: "https://www.dlcc.org", category: "State Legislatures", description: "Dedicated to winning state legislative seats for Democrats" },
      { name: "Young Democrats of America", abbreviation: "YDA", level: "federal" as const, party: "democrat" as const, website: "https://www.yda.org", category: "Youth", description: "Largest partisan youth organization in the United States" },
      { name: "College Democrats of America", abbreviation: "CDA", level: "federal" as const, party: "democrat" as const, website: "https://www.collegedems.com", category: "Youth", description: "Student wing of the Democratic Party on college campuses" },
      { name: "National Democratic Training Committee", abbreviation: "NDTC", level: "federal" as const, party: "democrat" as const, website: "https://www.traindemocrats.org", category: "Training", description: "Trains Democratic candidates and campaign staff nationwide" },
      { name: "Democratic Attorneys General Association", abbreviation: "DAGA", level: "federal" as const, party: "democrat" as const, website: "https://www.dfriehold.org", category: "Attorneys General", description: "Supports the election of Democratic attorneys general" },
      { name: "Alabama Democratic Party", level: "state" as const, party: "democrat" as const, state: "Alabama", website: "https://www.aladems.org", category: "State Party" },
      { name: "Alaska Democratic Party", level: "state" as const, party: "democrat" as const, state: "Alaska", website: "https://www.alaskademocrats.org", category: "State Party" },
      { name: "Arizona Democratic Party", level: "state" as const, party: "democrat" as const, state: "Arizona", website: "https://www.azdem.org", category: "State Party" },
      { name: "Arkansas Democratic Party", level: "state" as const, party: "democrat" as const, state: "Arkansas", website: "https://www.arkdems.org", category: "State Party" },
      { name: "California Democratic Party", level: "state" as const, party: "democrat" as const, state: "California", website: "https://www.cadem.org", category: "State Party" },
      { name: "Colorado Democratic Party", level: "state" as const, party: "democrat" as const, state: "Colorado", website: "https://www.coloradodems.org", category: "State Party" },
      { name: "Connecticut Democratic Party", level: "state" as const, party: "democrat" as const, state: "Connecticut", website: "https://www.ctdems.org", category: "State Party" },
      { name: "Delaware Democratic Party", level: "state" as const, party: "democrat" as const, state: "Delaware", website: "https://www.deldems.org", category: "State Party" },
      { name: "District of Columbia Democratic Party", level: "state" as const, party: "democrat" as const, state: "District of Columbia", website: "https://www.dcdemocraticparty.org", category: "State Party" },
      { name: "Florida Democratic Party", level: "state" as const, party: "democrat" as const, state: "Florida", website: "https://www.floridadems.org", category: "State Party" },
      { name: "Georgia Democratic Party", level: "state" as const, party: "democrat" as const, state: "Georgia", website: "https://www.georgiademocrat.org", category: "State Party" },
      { name: "Hawaii Democratic Party", level: "state" as const, party: "democrat" as const, state: "Hawaii", website: "https://www.hawaiidemocrats.org", category: "State Party" },
      { name: "Idaho Democratic Party", level: "state" as const, party: "democrat" as const, state: "Idaho", website: "https://www.idahodems.org", category: "State Party" },
      { name: "Illinois Democratic Party", level: "state" as const, party: "democrat" as const, state: "Illinois", website: "https://www.ildems.com", category: "State Party" },
      { name: "Indiana Democratic Party", level: "state" as const, party: "democrat" as const, state: "Indiana", website: "https://www.indems.org", category: "State Party" },
      { name: "Iowa Democratic Party", level: "state" as const, party: "democrat" as const, state: "Iowa", website: "https://www.iowademocrats.org", category: "State Party" },
      { name: "Kansas Democratic Party", level: "state" as const, party: "democrat" as const, state: "Kansas", website: "https://www.ksdp.org", category: "State Party" },
      { name: "Kentucky Democratic Party", level: "state" as const, party: "democrat" as const, state: "Kentucky", website: "https://www.kydemocrats.org", category: "State Party" },
      { name: "Louisiana Democratic Party", level: "state" as const, party: "democrat" as const, state: "Louisiana", website: "https://www.ladp.org", category: "State Party" },
      { name: "Maine Democratic Party", level: "state" as const, party: "democrat" as const, state: "Maine", website: "https://www.mainedems.org", category: "State Party" },
      { name: "Maryland Democratic Party", level: "state" as const, party: "democrat" as const, state: "Maryland", website: "https://www.mddems.org", category: "State Party" },
      { name: "Massachusetts Democratic Party", level: "state" as const, party: "democrat" as const, state: "Massachusetts", website: "https://www.massdems.org", category: "State Party" },
      { name: "Michigan Democratic Party", level: "state" as const, party: "democrat" as const, state: "Michigan", website: "https://www.michigandems.com", category: "State Party" },
      { name: "Minnesota Democratic-Farmer-Labor Party", level: "state" as const, party: "democrat" as const, state: "Minnesota", website: "https://www.dfl.org", category: "State Party" },
      { name: "Mississippi Democratic Party", level: "state" as const, party: "democrat" as const, state: "Mississippi", website: "https://www.mississippidemocrats.org", category: "State Party" },
      { name: "Missouri Democratic Party", level: "state" as const, party: "democrat" as const, state: "Missouri", website: "https://www.missouridemocrats.org", category: "State Party" },
      { name: "Montana Democratic Party", level: "state" as const, party: "democrat" as const, state: "Montana", website: "https://www.montanademocrats.org", category: "State Party" },
      { name: "Nebraska Democratic Party", level: "state" as const, party: "democrat" as const, state: "Nebraska", website: "https://www.nebraskademocrats.org", category: "State Party" },
      { name: "Nevada Democratic Party", level: "state" as const, party: "democrat" as const, state: "Nevada", website: "https://www.nvdems.com", category: "State Party" },
      { name: "New Hampshire Democratic Party", level: "state" as const, party: "democrat" as const, state: "New Hampshire", website: "https://www.nhdp.org", category: "State Party" },
      { name: "New Jersey Democratic Party", level: "state" as const, party: "democrat" as const, state: "New Jersey", website: "https://www.njdems.org", category: "State Party" },
      { name: "New Mexico Democratic Party", level: "state" as const, party: "democrat" as const, state: "New Mexico", website: "https://www.dpnm.org", category: "State Party" },
      { name: "New York Democratic Party", level: "state" as const, party: "democrat" as const, state: "New York", website: "https://www.nydems.org", category: "State Party" },
      { name: "North Carolina Democratic Party", level: "state" as const, party: "democrat" as const, state: "North Carolina", website: "https://www.ncdp.org", category: "State Party" },
      { name: "North Dakota Democratic Party", level: "state" as const, party: "democrat" as const, state: "North Dakota", website: "https://www.demnpl.com", category: "State Party" },
      { name: "Ohio Democratic Party", level: "state" as const, party: "democrat" as const, state: "Ohio", website: "https://www.ohiodems.org", category: "State Party" },
      { name: "Oklahoma Democratic Party", level: "state" as const, party: "democrat" as const, state: "Oklahoma", website: "https://www.okdemocrats.org", category: "State Party" },
      { name: "Oregon Democratic Party", level: "state" as const, party: "democrat" as const, state: "Oregon", website: "https://www.dpo.org", category: "State Party" },
      { name: "Pennsylvania Democratic Party", level: "state" as const, party: "democrat" as const, state: "Pennsylvania", website: "https://www.padems.com", category: "State Party" },
      { name: "Rhode Island Democratic Party", level: "state" as const, party: "democrat" as const, state: "Rhode Island", website: "https://www.ridemocrats.org", category: "State Party" },
      { name: "South Carolina Democratic Party", level: "state" as const, party: "democrat" as const, state: "South Carolina", website: "https://www.scdp.org", category: "State Party" },
      { name: "South Dakota Democratic Party", level: "state" as const, party: "democrat" as const, state: "South Dakota", website: "https://www.sddp.org", category: "State Party" },
      { name: "Tennessee Democratic Party", level: "state" as const, party: "democrat" as const, state: "Tennessee", website: "https://www.tndp.org", category: "State Party" },
      { name: "Texas Democratic Party", level: "state" as const, party: "democrat" as const, state: "Texas", website: "https://www.texasdemocrats.org", category: "State Party" },
      { name: "Utah Democratic Party", level: "state" as const, party: "democrat" as const, state: "Utah", website: "https://www.utahdemocrats.org", category: "State Party" },
      { name: "Vermont Democratic Party", level: "state" as const, party: "democrat" as const, state: "Vermont", website: "https://www.vtdemocrats.org", category: "State Party" },
      { name: "Virginia Democratic Party", level: "state" as const, party: "democrat" as const, state: "Virginia", website: "https://www.vademocrats.org", category: "State Party" },
      { name: "Washington Democratic Party", level: "state" as const, party: "democrat" as const, state: "Washington", website: "https://www.wa-democrats.org", category: "State Party" },
      { name: "West Virginia Democratic Party", level: "state" as const, party: "democrat" as const, state: "West Virginia", website: "https://www.wvdemocrats.com", category: "State Party" },
      { name: "Wisconsin Democratic Party", level: "state" as const, party: "democrat" as const, state: "Wisconsin", website: "https://www.wisdems.org", category: "State Party" },
      { name: "Wyoming Democratic Party", level: "state" as const, party: "democrat" as const, state: "Wyoming", website: "https://www.wyodems.org", category: "State Party" },
    ];

    for (const org of orgs) {
      await ctx.db.insert("partyOrganizations", org);
    }

    console.log(`Seeded ${orgs.length} party organizations`);
    return `seeded_${orgs.length}`;
  },
});