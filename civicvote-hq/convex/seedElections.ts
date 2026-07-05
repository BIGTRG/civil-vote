import { mutation } from "./_generated/server";

// 2026 Gubernatorial Elections -- All 36 states
// Plus key statewide races: Secretary of State, Attorney General, Lt. Governor, Treasurer

const RACES_AND_CANDIDATES = [
  // ============ ALABAMA ============
  {
    race: { title: "Alabama Governor 2026", office: "Governor", level: "state" as const, state: "AL", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Kay Ivey term-limited", incumbentParty: "republican" },
    candidates: [
      { firstName: "Katie", lastName: "Britt", party: "republican" as const, bio: "U.S. Senator from Alabama since 2023. Former CEO of the Business Council of Alabama. Youngest Republican woman elected to the Senate.", currentRole: "U.S. Senator", age: 44, hometown: "Enterprise, AL", keyPositions: "Border security, economic development, education reform, pro-life", endorsements: "Alabama business community" },
      { firstName: "Tim", lastName: "James", party: "republican" as const, bio: "Businessman and perennial gubernatorial candidate. Son of former Gov. Fob James. Ran in 2002, 2010, and 2022 primaries.", currentRole: "Businessman", age: 63, hometown: "Greenville, AL", keyPositions: "Immigration, conservative values, business development" },
      { firstName: "Terri", lastName: "Sewell", party: "democrat" as const, bio: "U.S. Representative for Alabama's 7th congressional district since 2011. First Black woman elected to Congress from Alabama. Harvard and Oxford educated.", currentRole: "U.S. Representative", age: 61, hometown: "Selma, AL", keyPositions: "Voting rights, healthcare access, infrastructure, education funding", endorsements: "Congressional Black Caucus" },
    ],
  },
  // ============ ALASKA ============
  {
    race: { title: "Alaska Governor 2026", office: "Governor", level: "state" as const, state: "AK", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Mike Dunleavy eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Mike", lastName: "Dunleavy", party: "republican" as const, bio: "Incumbent Governor since 2018. Former state senator. Focused on resource development and Permanent Fund dividends.", currentRole: "Governor of Alaska", age: 65, hometown: "Wasilla, AK", isIncumbent: true, keyPositions: "Permanent Fund dividends, oil development, limited government, education choice" },
      { firstName: "Les", lastName: "Gara", party: "democrat" as const, bio: "Former Alaska state representative (2003-2017). Attorney and advocate for child welfare. Ran for governor in 2022.", currentRole: "Attorney", age: 64, hometown: "Anchorage, AK", keyPositions: "Education funding, renewable energy, healthcare, fiscal responsibility" },
    ],
  },
  // ============ ARIZONA ============
  {
    race: { title: "Arizona Governor 2026", office: "Governor", level: "state" as const, state: "AZ", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Katie Hobbs eligible for re-election. Key swing state.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Katie", lastName: "Hobbs", party: "democrat" as const, bio: "Incumbent Governor since 2023. Former Secretary of State who oversaw 2020 election. First Democratic governor of Arizona since 2009.", currentRole: "Governor of Arizona", age: 57, hometown: "Phoenix, AZ", isIncumbent: true, keyPositions: "Water policy, border security, abortion rights, public education, semiconductor industry" },
      { firstName: "Kari", lastName: "Lake", party: "republican" as const, bio: "Former TV news anchor. Lost 2022 governor's race and 2024 Senate race. Prominent Trump ally.", currentRole: "Political candidate", age: 57, hometown: "Scottsdale, AZ", keyPositions: "Border wall, election integrity, parental rights, energy independence" },
      { firstName: "Karrin", lastName: "Taylor Robson", party: "republican" as const, bio: "Real estate developer and Regent of University of Arizona. Ran in 2022 GOP primary, endorsed by outgoing Gov. Ducey.", currentRole: "Businesswoman", age: 58, hometown: "Paradise Valley, AZ", keyPositions: "Water infrastructure, economic growth, border security, education" },
    ],
  },
  // ============ ARKANSAS ============
  {
    race: { title: "Arkansas Governor 2026", office: "Governor", level: "state" as const, state: "AR", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Sarah Huckabee Sanders eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Sarah Huckabee", lastName: "Sanders", party: "republican" as const, bio: "Incumbent Governor since 2023. Former White House Press Secretary under President Trump. Daughter of former Gov. Mike Huckabee.", currentRole: "Governor of Arkansas", age: 44, hometown: "Little Rock, AR", isIncumbent: true, keyPositions: "Education reform (LEARNS Act), tax cuts, law enforcement, anti-CRT" },
      { firstName: "Chris", lastName: "Jones", party: "democrat" as const, bio: "Nuclear engineer and minister. Rhodes Scholar. Founded a nonprofit focused on economic mobility in the Delta. Lost 2022 governor's race.", currentRole: "Nonprofit executive", age: 41, hometown: "Pine Bluff, AR", keyPositions: "Education, broadband access, healthcare expansion, economic development" },
    ],
  },
  // ============ CALIFORNIA ============
  {
    race: { title: "California Governor 2026", office: "Governor", level: "state" as const, state: "CA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Gavin Newsom term-limited. Largest state economy.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Toni", lastName: "Atkins", party: "democrat" as const, bio: "President pro tempore of the California State Senate. Former Speaker of the CA Assembly. First openly LGBTQ+ person to lead either chamber.", currentRole: "State Senate President", age: 64, hometown: "San Diego, CA", keyPositions: "Housing, climate action, healthcare, LGBTQ+ rights" },
      { firstName: "Rob", lastName: "Bonta", party: "democrat" as const, bio: "California Attorney General since 2021. Former Assembly member. First Filipino American AG in U.S. history.", currentRole: "Attorney General", age: 53, hometown: "Alameda, CA", keyPositions: "Gun safety, environmental justice, consumer protection, criminal justice reform" },
      { firstName: "Betty", lastName: "Yee", party: "democrat" as const, bio: "Former California State Controller (2015-2023). First Asian American elected to statewide office in CA.", currentRole: "Former State Controller", age: 67, hometown: "San Francisco, CA", keyPositions: "Fiscal responsibility, climate investment, government transparency" },
      { firstName: "Nathan", lastName: "Hochman", party: "republican" as const, bio: "Los Angeles County District Attorney. Former U.S. Assistant Attorney General. Won DA race as independent, now running as Republican.", currentRole: "LA County District Attorney", age: 60, hometown: "Los Angeles, CA", keyPositions: "Public safety, tough on crime, government accountability, fiscal discipline" },
    ],
  },
  // ============ COLORADO ============
  {
    race: { title: "Colorado Governor 2026", office: "Governor", level: "state" as const, state: "CO", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Jared Polis term-limited", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Phil", lastName: "Weiser", party: "democrat" as const, bio: "Colorado Attorney General since 2019. Former dean of CU Boulder law school. Led antitrust actions against tech companies.", currentRole: "Attorney General", age: 55, hometown: "Denver, CO", keyPositions: "Consumer protection, climate action, tech regulation, healthcare costs" },
      { firstName: "Mike", lastName: "Johnston", party: "democrat" as const, bio: "Mayor of Denver since 2023. Former state senator and education reform advocate. Addressed migrant crisis.", currentRole: "Mayor of Denver", age: 52, hometown: "Denver, CO", keyPositions: "Housing, immigration, education, climate, homelessness" },
      { firstName: "Gabe", lastName: "Evans", party: "republican" as const, bio: "U.S. Representative. Former police officer and Army helicopter pilot. Flipped a competitive district in 2024.", currentRole: "U.S. Representative", age: 40, hometown: "Arvada, CO", keyPositions: "Public safety, border security, water, cost of living, energy" },
    ],
  },
  // ============ CONNECTICUT ============
  {
    race: { title: "Connecticut Governor 2026", office: "Governor", level: "state" as const, state: "CT", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Ned Lamont eligible for re-election but may retire", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Ned", lastName: "Lamont", party: "democrat" as const, bio: "Incumbent Governor since 2019. Businessman who built a cable TV company. Managed state through COVID and balanced budgets.", currentRole: "Governor of Connecticut", age: 72, hometown: "Greenwich, CT", isIncumbent: true, keyPositions: "Fiscal discipline, education, infrastructure, business climate" },
      { firstName: "Bob", lastName: "Stefanowski", party: "republican" as const, bio: "Business executive and CEO of DFC Global. Two-time gubernatorial candidate (2018, 2022). Narrowly lost in 2022.", currentRole: "Businessman", age: 63, hometown: "Madison, CT", keyPositions: "Tax cuts, economic growth, government efficiency, education choice" },
    ],
  },
  // ============ FLORIDA ============
  {
    race: { title: "Florida Governor 2026", office: "Governor", level: "state" as const, state: "FL", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Ron DeSantis term-limited. Third-largest state.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Ashley", lastName: "Moody", party: "republican" as const, bio: "Lieutenant Governor (assumed role after DeSantis appointment). Former FL Attorney General. Former circuit court judge.", currentRole: "Lieutenant Governor", age: 50, hometown: "Plant City, FL", keyPositions: "Law enforcement, border security, anti-drug trafficking, parental rights" },
      { firstName: "Jimmy", lastName: "Patronis", party: "republican" as const, bio: "Florida Chief Financial Officer since 2017. Former state representative. Business owner.", currentRole: "Chief Financial Officer of FL", age: 54, hometown: "Panama City, FL", keyPositions: "Insurance reform, hurricane preparedness, fiscal conservatism, business growth" },
      { firstName: "Nikki", lastName: "Fried", party: "democrat" as const, bio: "Former Florida Commissioner of Agriculture (2019-2023). Only statewide elected Democrat in FL at the time. Attorney and lobbyist.", currentRole: "Chair, FL Democratic Party", age: 47, hometown: "Fort Lauderdale, FL", keyPositions: "Insurance crisis, abortion rights, gun safety, environment, cannabis legalization" },
      { firstName: "Maxwell", lastName: "Frost", party: "democrat" as const, bio: "U.S. Representative and youngest member of Congress. Gen Z activist. Former national organizing director for March for Our Lives.", currentRole: "U.S. Representative", age: 27, hometown: "Orlando, FL", keyPositions: "Gun violence prevention, climate, affordable housing, student debt, reproductive rights" },
    ],
  },
  // ============ GEORGIA ============
  {
    race: { title: "Georgia Governor 2026", office: "Governor", level: "state" as const, state: "GA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Brian Kemp term-limited. Major swing state.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Keisha Lance", lastName: "Bottoms", party: "democrat" as const, bio: "Former Mayor of Atlanta (2018-2022). Former Senior Advisor to President Biden. Led Atlanta through COVID and civil unrest. Endorsed by President Biden.", currentRole: "Political candidate", age: 55, hometown: "Atlanta, GA", keyPositions: "Healthcare expansion, education, economic equity, public safety, voting rights", endorsements: "President Joe Biden, Atlanta business community", fundraisingTotal: 8500000 },
      { firstName: "Burt", lastName: "Jones", party: "republican" as const, bio: "Lieutenant Governor of Georgia since 2023. Former state senator. Trump-endorsed. Won Republican runoff.", currentRole: "Lieutenant Governor", age: 53, hometown: "Jackson, GA", keyPositions: "Tax cuts, election security, parental rights, law enforcement, business-friendly regulation", endorsements: "Former President Donald Trump" },
      { firstName: "Rick", lastName: "Jackson", party: "republican" as const, bio: "Billionaire healthcare executive. Self-funded candidate. Ran second in GOP primary.", currentRole: "Healthcare CEO", age: 61, hometown: "Atlanta, GA", keyPositions: "Healthcare innovation, fiscal conservatism, education, infrastructure" },
      { firstName: "Stacey", lastName: "Abrams", party: "democrat" as const, bio: "Voting rights activist and former state House Minority Leader. Ran for governor in 2018 and 2022. Founded Fair Fight Action.", currentRole: "Voting rights advocate", age: 52, hometown: "Atlanta, GA", keyPositions: "Voting rights, Medicaid expansion, education, small business, criminal justice reform" },
    ],
  },
  // ============ HAWAII ============
  {
    race: { title: "Hawaii Governor 2026", office: "Governor", level: "state" as const, state: "HI", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Josh Green eligible for re-election", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Josh", lastName: "Green", party: "democrat" as const, bio: "Incumbent Governor since 2022. Emergency physician. Led Maui wildfire recovery. Former Lt. Governor.", currentRole: "Governor of Hawaii", age: 55, hometown: "Kailua-Kona, HI", isIncumbent: true, keyPositions: "Housing affordability, Maui recovery, healthcare, renewable energy, tourism management" },
    ],
  },
  // ============ IDAHO ============
  {
    race: { title: "Idaho Governor 2026", office: "Governor", level: "state" as const, state: "ID", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Brad Little eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Brad", lastName: "Little", party: "republican" as const, bio: "Incumbent Governor since 2019. Former Lt. Governor and rancher. Led Idaho through economic boom and population growth.", currentRole: "Governor of Idaho", age: 72, hometown: "Emmett, ID", isIncumbent: true, keyPositions: "Tax cuts, education, property tax relief, water resources, limited government" },
      { firstName: "Raul", lastName: "Labrador", party: "republican" as const, bio: "Idaho Attorney General since 2023. Former U.S. Representative (2011-2019). Tea Party-aligned conservative.", currentRole: "Attorney General", age: 59, hometown: "Eagle, ID", keyPositions: "Constitutional rights, immigration, parental rights, government accountability" },
    ],
  },
  // ============ ILLINOIS ============
  {
    race: { title: "Illinois Governor 2026", office: "Governor", level: "state" as const, state: "IL", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent JB Pritzker eligible for re-election", incumbentParty: "democrat" },
    candidates: [
      { firstName: "JB", lastName: "Pritzker", party: "democrat" as const, bio: "Incumbent Governor since 2019. Billionaire businessman and Hyatt hotel heir. Nationally prominent Democratic voice.", currentRole: "Governor of Illinois", age: 61, hometown: "Chicago, IL", isIncumbent: true, keyPositions: "Abortion rights, gun safety, clean energy, education, infrastructure" },
    ],
  },
  // ============ IOWA ============
  {
    race: { title: "Iowa Governor 2026", office: "Governor", level: "state" as const, state: "IA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Kim Reynolds eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Kim", lastName: "Reynolds", party: "republican" as const, bio: "Incumbent Governor since 2017. First woman to serve as Iowa governor. Led education reform with school choice.", currentRole: "Governor of Iowa", age: 67, hometown: "Osceola, IA", isIncumbent: true, keyPositions: "School choice, tax reform, workforce development, limited government, pro-life" },
    ],
  },
  // ============ KANSAS ============
  {
    race: { title: "Kansas Governor 2026", office: "Governor", level: "state" as const, state: "KS", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Laura Kelly term-limited. Open seat.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Derek", lastName: "Schmidt", party: "republican" as const, bio: "Former Kansas Attorney General (2011-2023). Lost to Kelly in 2022 governor's race. State senator prior.", currentRole: "Attorney", age: 58, hometown: "Independence, KS", keyPositions: "Tax reform, public safety, education, water, limited government" },
      { firstName: "Kris", lastName: "Kobach", party: "republican" as const, bio: "Kansas Attorney General since 2023. Former KS Secretary of State. Known for hardline immigration stance.", currentRole: "Attorney General", age: 60, hometown: "Lecompton, KS", keyPositions: "Immigration enforcement, election integrity, constitutional rights, tax cuts" },
      { firstName: "Sharice", lastName: "Davids", party: "democrat" as const, bio: "U.S. Representative for KS-3 since 2019. First openly LGBTQ+ Native American elected to Congress. Former MMA fighter.", currentRole: "U.S. Representative", age: 46, hometown: "Kansas City, KS", keyPositions: "Healthcare, reproductive rights, veterans, bipartisan infrastructure, education" },
    ],
  },
  // ============ MAINE ============
  {
    race: { title: "Maine Governor 2026", office: "Governor", level: "state" as const, state: "ME", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Janet Mills term-limited", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Aaron", lastName: "Frey", party: "democrat" as const, bio: "Maine Attorney General since 2019. Former state representative. Focused on consumer protection and opioid crisis.", currentRole: "Attorney General", age: 48, hometown: "Bangor, ME", keyPositions: "Opioid crisis, healthcare, environment, affordable housing" },
      { firstName: "Paul", lastName: "LePage", party: "republican" as const, bio: "Former Governor of Maine (2011-2019). Business executive. Known for confrontational style.", currentRole: "Former Governor", age: 78, hometown: "Waterville, ME", keyPositions: "Tax reform, welfare reform, energy costs, business growth" },
    ],
  },
  // ============ MARYLAND ============
  {
    race: { title: "Maryland Governor 2026", office: "Governor", level: "state" as const, state: "MD", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Wes Moore eligible for re-election. Rising Democratic star.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Wes", lastName: "Moore", party: "democrat" as const, bio: "Incumbent Governor since 2023. Combat veteran, Rhodes Scholar, bestselling author. First Black governor of Maryland.", currentRole: "Governor of Maryland", age: 38, hometown: "Baltimore, MD", isIncumbent: true, keyPositions: "Education, service year option, economic development, public safety, environment", endorsements: "Broad Democratic coalition" },
      { firstName: "Larry", lastName: "Hogan", party: "republican" as const, bio: "Former Governor of Maryland (2015-2023). Known as moderate Republican. Lost 2024 Senate race. Remains popular.", currentRole: "Former Governor", age: 70, hometown: "Annapolis, MD", keyPositions: "Bipartisanship, fiscal responsibility, education, transportation, public safety" },
    ],
  },
  // ============ MASSACHUSETTS ============
  {
    race: { title: "Massachusetts Governor 2026", office: "Governor", level: "state" as const, state: "MA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Maura Healey eligible for re-election", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Maura", lastName: "Healey", party: "democrat" as const, bio: "Incumbent Governor since 2023. Former Attorney General. First openly lesbian governor in U.S. history.", currentRole: "Governor of Massachusetts", age: 55, hometown: "Charlestown, MA", isIncumbent: true, keyPositions: "Housing, climate, education, healthcare, LGBTQ+ rights, tech industry" },
    ],
  },
  // ============ MICHIGAN ============
  {
    race: { title: "Michigan Governor 2026", office: "Governor", level: "state" as const, state: "MI", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Gretchen Whitmer term-limited. Key swing state.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Dana", lastName: "Nessel", party: "democrat" as const, bio: "Michigan Attorney General since 2019. Civil rights attorney. Led prosecution of fake electors scheme.", currentRole: "Attorney General", age: 55, hometown: "Plymouth, MI", keyPositions: "Democracy protection, LGBTQ+ rights, gun safety, environmental protection" },
      { firstName: "Jocelyn", lastName: "Benson", party: "democrat" as const, bio: "Michigan Secretary of State since 2019. Election law expert. Oversaw 2020 and 2024 elections under intense pressure.", currentRole: "Secretary of State", age: 48, hometown: "Detroit, MI", keyPositions: "Voting rights, election security, auto industry, education, government reform" },
      { firstName: "Tom", lastName: "Barrett", party: "republican" as const, bio: "Former state senator and Army helicopter pilot. Nearly upset Elissa Slotkin in 2022 congressional race.", currentRole: "Army officer / former state senator", age: 43, hometown: "Charlotte, MI", keyPositions: "Auto industry, border security, education choice, tax reform, veterans" },
      { firstName: "John", lastName: "James", party: "republican" as const, bio: "U.S. Representative since 2023. Iraq War veteran, West Point grad, former business CEO. Lost two Senate races.", currentRole: "U.S. Representative", age: 44, hometown: "Farmington Hills, MI", keyPositions: "Manufacturing, national security, fiscal responsibility, border security" },
    ],
  },
  // ============ MINNESOTA ============
  {
    race: { title: "Minnesota Governor 2026", office: "Governor", level: "state" as const, state: "MN", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Tim Walz term-limited after VP run. Open seat.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Keith", lastName: "Ellison", party: "democrat" as const, bio: "Minnesota Attorney General since 2019. Former U.S. Representative. First Muslim elected to Congress. Led George Floyd case prosecution.", currentRole: "Attorney General", age: 63, hometown: "Minneapolis, MN", keyPositions: "Civil rights, affordable housing, workers' rights, gun safety, environment" },
      { firstName: "Scott", lastName: "Jensen", party: "republican" as const, bio: "Physician and former state senator. Lost to Walz in 2022 governor's race. Named Family Physician of the Year by MNAFP.", currentRole: "Physician", age: 67, hometown: "Chaska, MN", keyPositions: "Healthcare costs, tax reform, education, public safety, government efficiency" },
    ],
  },
  // ============ NEBRASKA ============
  {
    race: { title: "Nebraska Governor 2026", office: "Governor", level: "state" as const, state: "NE", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Jim Pillen eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Jim", lastName: "Pillen", party: "republican" as const, bio: "Incumbent Governor since 2023. Hog farmer and former Husker football player. University of Nebraska Regent.", currentRole: "Governor of Nebraska", age: 70, hometown: "Columbus, NE", isIncumbent: true, keyPositions: "Property tax relief, school choice, pro-life, agriculture, border security" },
    ],
  },
  // ============ NEVADA ============
  {
    race: { title: "Nevada Governor 2026", office: "Governor", level: "state" as const, state: "NV", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Joe Lombardo eligible for re-election. Swing state.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Joe", lastName: "Lombardo", party: "republican" as const, bio: "Incumbent Governor since 2023. Former Clark County Sheriff. Retired Army Colonel.", currentRole: "Governor of Nevada", age: 65, hometown: "Las Vegas, NV", isIncumbent: true, keyPositions: "Public safety, school choice, economic diversification, water, tourism" },
      { firstName: "Cisco", lastName: "Aguilar", party: "democrat" as const, bio: "Nevada Secretary of State since 2023. Business attorney. Former head of Nevada State Athletic Commission.", currentRole: "Secretary of State", age: 51, hometown: "Las Vegas, NV", keyPositions: "Voting access, business development, water conservation, renewable energy" },
    ],
  },
  // ============ NEW HAMPSHIRE ============
  {
    race: { title: "New Hampshire Governor 2026", office: "Governor", level: "state" as const, state: "NH", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Kelly Ayotte first term but may face competitive race", incumbentParty: "republican" },
    candidates: [
      { firstName: "Kelly", lastName: "Ayotte", party: "republican" as const, bio: "Governor since 2025. Former U.S. Senator (2011-2017) and NH Attorney General.", currentRole: "Governor of New Hampshire", age: 58, hometown: "Nashua, NH", isIncumbent: true, keyPositions: "Tax policy (no income tax), education, opioid crisis, business climate" },
    ],
  },
  // ============ NEW MEXICO ============
  {
    race: { title: "New Mexico Governor 2026", office: "Governor", level: "state" as const, state: "NM", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Michelle Lujan Grisham term-limited", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Raul", lastName: "Torrez", party: "democrat" as const, bio: "New Mexico Attorney General since 2023. Former Bernalillo County DA. Prosecuted civil rights and public corruption cases.", currentRole: "Attorney General", age: 48, hometown: "Albuquerque, NM", keyPositions: "Public safety, gun violence, education, water policy, renewable energy" },
      { firstName: "Mark", lastName: "Ronchetti", party: "republican" as const, bio: "Former TV meteorologist. Lost to Lujan Grisham in 2022 governor's race by 6 points. Running again.", currentRole: "Political candidate", age: 51, hometown: "Albuquerque, NM", keyPositions: "Crime reduction, border security, energy, education, government reform" },
    ],
  },
  // ============ NEW YORK ============
  {
    race: { title: "New York Governor 2026", office: "Governor", level: "state" as const, state: "NY", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Kathy Hochul eligible for re-election but faces low approval", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Kathy", lastName: "Hochul", party: "democrat" as const, bio: "Incumbent Governor since 2021 (assumed after Cuomo resignation). First female Governor of New York. Former Lt. Governor and congressional rep.", currentRole: "Governor of New York", age: 68, hometown: "Buffalo, NY", isIncumbent: true, keyPositions: "Congestion pricing, housing, public safety, migrants, education" },
      { firstName: "Letitia", lastName: "James", party: "democrat" as const, bio: "New York Attorney General since 2019. Pursued major cases against Trump Organization, NRA, and opioid companies.", currentRole: "Attorney General", age: 67, hometown: "Brooklyn, NY", keyPositions: "Consumer protection, corporate accountability, housing, civil rights" },
      { firstName: "Andrew", lastName: "Giuliani", party: "republican" as const, bio: "Former Trump White House aide. Son of former NYC Mayor Rudy Giuliani. Ran in 2022 GOP primary.", currentRole: "Political commentator", age: 40, hometown: "New York, NY", keyPositions: "Public safety, tax cuts, anti-mandate, government reform" },
      { firstName: "Mike", lastName: "Lawler", party: "republican" as const, bio: "U.S. Representative from NY-17 since 2023. Defeated Sean Patrick Maloney in upset. Rising GOP star.", currentRole: "U.S. Representative", age: 38, hometown: "Pearl River, NY", keyPositions: "Tax relief (SALT), public safety, immigration, bipartisanship" },
    ],
  },
  // ============ OHIO ============
  {
    race: { title: "Ohio Governor 2026", office: "Governor", level: "state" as const, state: "OH", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Mike DeWine term-limited", incumbentParty: "republican" },
    candidates: [
      { firstName: "Jon", lastName: "Husted", party: "republican" as const, bio: "Lieutenant Governor since 2019. Former Ohio Secretary of State and state legislator. DeWine's running mate.", currentRole: "Lieutenant Governor", age: 57, hometown: "Columbus, OH", keyPositions: "Economic development, workforce, Intel chip plant, tax reform, education" },
      { firstName: "Frank", lastName: "LaRose", party: "republican" as const, bio: "Ohio Secretary of State since 2019. Former state senator. Army Green Beret veteran.", currentRole: "Secretary of State", age: 47, hometown: "Copley, OH", keyPositions: "Election integrity, fiscal discipline, veterans, education, small business" },
      { firstName: "Nan", lastName: "Whaley", party: "democrat" as const, bio: "Former Mayor of Dayton (2014-2022). Led city through 2019 mass shooting and tornado recovery. Lost 2022 governor's race.", currentRole: "Former Mayor", age: 48, hometown: "Dayton, OH", keyPositions: "Gun safety, economic revitalization, healthcare, education, infrastructure" },
    ],
  },
  // ============ OKLAHOMA ============
  {
    race: { title: "Oklahoma Governor 2026", office: "Governor", level: "state" as const, state: "OK", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Kevin Stitt eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Kevin", lastName: "Stitt", party: "republican" as const, bio: "Incumbent Governor since 2019. Businessman and CEO of Gateway Mortgage. First Cherokee Nation citizen elected governor.", currentRole: "Governor of Oklahoma", age: 52, hometown: "Norman, OK", isIncumbent: true, keyPositions: "Government efficiency, tax reform, tribal relations, school choice, pro-business" },
    ],
  },
  // ============ OREGON ============
  {
    race: { title: "Oregon Governor 2026", office: "Governor", level: "state" as const, state: "OR", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Tina Kotek eligible for re-election", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Tina", lastName: "Kotek", party: "democrat" as const, bio: "Incumbent Governor since 2023. Former Speaker of the Oregon House. First openly lesbian governor elected in the U.S.", currentRole: "Governor of Oregon", age: 58, hometown: "Portland, OR", isIncumbent: true, keyPositions: "Homelessness, housing, climate, education, reproductive rights" },
      { firstName: "Christine", lastName: "Drazan", party: "republican" as const, bio: "Former Oregon House Republican Leader. Nearly won 2022 governor's race in three-way split. Attorney.", currentRole: "Political candidate", age: 52, hometown: "Oregon City, OR", keyPositions: "Homelessness, public safety, fiscal discipline, forest management, education" },
    ],
  },
  // ============ PENNSYLVANIA ============
  {
    race: { title: "Pennsylvania Governor 2026", office: "Governor", level: "state" as const, state: "PA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Josh Shapiro eligible for re-election. Major swing state.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Josh", lastName: "Shapiro", party: "democrat" as const, bio: "Incumbent Governor since 2023. Former Attorney General. Known for infrastructure focus and bipartisan approach. Considered potential future presidential candidate.", currentRole: "Governor of Pennsylvania", age: 53, hometown: "Abington, PA", isIncumbent: true, keyPositions: "Infrastructure, education, energy (all-of-the-above), public safety, economic development" },
    ],
  },
  // ============ RHODE ISLAND ============
  {
    race: { title: "Rhode Island Governor 2026", office: "Governor", level: "state" as const, state: "RI", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Dan McKee eligible for re-election", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Dan", lastName: "McKee", party: "democrat" as const, bio: "Incumbent Governor since 2021. Assumed office after Raimondo joined Biden cabinet. Former Lt. Governor and mayor.", currentRole: "Governor of Rhode Island", age: 72, hometown: "Cumberland, RI", isIncumbent: true, keyPositions: "Housing, education, economic development, infrastructure, healthcare" },
    ],
  },
  // ============ SOUTH CAROLINA ============
  {
    race: { title: "South Carolina Governor 2026", office: "Governor", level: "state" as const, state: "SC", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Henry McMaster term-limited. Open seat.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Alan", lastName: "Wilson", party: "republican" as const, bio: "South Carolina Attorney General since 2011. Led legal challenges on immigration and federal overreach. Son of U.S. Rep. Joe Wilson.", currentRole: "Attorney General", age: 51, hometown: "Columbia, SC", keyPositions: "Law enforcement, constitutional rights, pro-life, border security" },
      { firstName: "Drew", lastName: "McKissick", party: "republican" as const, bio: "Former chair of the South Carolina Republican Party. RNC national committeeman. Attorney.", currentRole: "RNC committeeman", age: 40, hometown: "Easley, SC", keyPositions: "Conservative governance, economic growth, education reform, Second Amendment" },
      { firstName: "Jaime", lastName: "Harrison", party: "democrat" as const, bio: "Chair of the Democratic National Committee. Raised $130M in 2020 Senate race against Lindsey Graham. Associate chair of DNC before chair.", currentRole: "DNC Chair", age: 49, hometown: "Orangeburg, SC", keyPositions: "Education, healthcare expansion, voting rights, rural development" },
    ],
  },
  // ============ SOUTH DAKOTA ============
  {
    race: { title: "South Dakota Governor 2026", office: "Governor", level: "state" as const, state: "SD", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Kristi Noem left for DHS Secretary. Lt. Gov. Larry Rhoden is governor.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Larry", lastName: "Rhoden", party: "republican" as const, bio: "Governor since 2025 after Noem joined Trump cabinet. Former Lt. Governor and state senator. Rancher.", currentRole: "Governor of South Dakota", age: 70, hometown: "Union Center, SD", isIncumbent: true, keyPositions: "Agriculture, limited government, tax reform, Second Amendment, tribal relations" },
    ],
  },
  // ============ TENNESSEE ============
  {
    race: { title: "Tennessee Governor 2026", office: "Governor", level: "state" as const, state: "TN", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Gov. Bill Lee term-limited", incumbentParty: "republican" },
    candidates: [
      { firstName: "Andy", lastName: "Ogles", party: "republican" as const, bio: "U.S. Representative from TN-5 since 2023. Former mayor of Maury County. Conservative firebrand.", currentRole: "U.S. Representative", age: 53, hometown: "Columbia, TN", keyPositions: "Border security, fiscal conservatism, school choice, Second Amendment" },
      { firstName: "Bill", lastName: "Hagerty", party: "republican" as const, bio: "U.S. Senator since 2021. Former U.S. Ambassador to Japan under Trump. Private equity executive.", currentRole: "U.S. Senator", age: 65, hometown: "Nashville, TN", keyPositions: "Economic development, trade, foreign policy, fiscal discipline, pro-business" },
      { firstName: "Gloria", lastName: "Johnson", party: "democrat" as const, bio: "State Representative and one of the 'Tennessee Three.' Gained national attention for gun reform protest on House floor.", currentRole: "State Representative", age: 62, hometown: "Knoxville, TN", keyPositions: "Gun safety, public education, healthcare, workers' rights, reproductive rights" },
    ],
  },
  // ============ TEXAS ============
  {
    race: { title: "Texas Governor 2026", office: "Governor", level: "state" as const, state: "TX", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Greg Abbott eligible for re-election. Second largest state.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Greg", lastName: "Abbott", party: "republican" as const, bio: "Incumbent Governor since 2015. Former Attorney General. Led Operation Lone Star border initiative.", currentRole: "Governor of Texas", age: 69, hometown: "Austin, TX", isIncumbent: true, keyPositions: "Border security, property tax relief, school choice, energy independence, law and order" },
      { firstName: "Beto", lastName: "O'Rourke", party: "democrat" as const, bio: "Former U.S. Representative. Lost 2018 Senate race to Cruz by 2.6%, 2022 governor's race. Nationally known grassroots campaigner.", currentRole: "Political activist / nonprofit founder", age: 54, hometown: "El Paso, TX", keyPositions: "Gun reform, reproductive rights, border communities, public education, healthcare" },
    ],
  },
  // ============ VERMONT ============
  {
    race: { title: "Vermont Governor 2026", office: "Governor", level: "state" as const, state: "VT", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Phil Scott eligible for re-election (2-year terms)", incumbentParty: "republican" },
    candidates: [
      { firstName: "Phil", lastName: "Scott", party: "republican" as const, bio: "Incumbent Governor since 2017. Moderate Republican in deep-blue state. Former race car driver. Won by large margins.", currentRole: "Governor of Vermont", age: 68, hometown: "Berlin, VT", isIncumbent: true, keyPositions: "Fiscal responsibility, housing, childcare, broadband, moderate governance" },
    ],
  },
  // ============ WISCONSIN ============
  {
    race: { title: "Wisconsin Governor 2026", office: "Governor", level: "state" as const, state: "WI", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Tony Evers eligible for re-election. Key swing state.", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Tony", lastName: "Evers", party: "democrat" as const, bio: "Incumbent Governor since 2019. Former State Superintendent of Public Instruction. Blocked GOP legislative agenda with vetoes.", currentRole: "Governor of Wisconsin", age: 75, hometown: "Madison, WI", isIncumbent: true, keyPositions: "Education, healthcare, infrastructure, abortion rights, Medicaid expansion" },
    ],
  },
  // ============ WYOMING ============
  {
    race: { title: "Wyoming Governor 2026", office: "Governor", level: "state" as const, state: "WY", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Mark Gordon term-limited. Open seat.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Mark", lastName: "Gordon", party: "republican" as const, bio: "Incumbent Governor since 2019. Rancher and former State Treasurer. Moderate conservative.", currentRole: "Governor of Wyoming", age: 69, hometown: "Kaycee, WY", isIncumbent: true, keyPositions: "Energy, public lands, fiscal conservatism, education, mineral revenues" },
    ],
  },

  // ============ KEY SECRETARY OF STATE RACES ============
  {
    race: { title: "Georgia Secretary of State 2026", office: "Secretary of State", level: "state" as const, state: "GA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open seat -- Brad Raffensperger term-limited. Key election integrity role.", incumbentParty: "republican" },
    candidates: [
      { firstName: "Brad", lastName: "Raffensperger", party: "republican" as const, bio: "Incumbent Secretary of State. Famously resisted Trump pressure on 2020 election results. Cannot run again.", currentRole: "Secretary of State (term-limited)", age: 60, hometown: "Johns Creek, GA", keyPositions: "Election integrity, voter access, business registration modernization" },
      { firstName: "Bee", lastName: "Nguyen", party: "democrat" as const, bio: "State representative. Ran for SOS in 2022. First Vietnamese American elected to GA legislature.", currentRole: "State Representative", age: 43, hometown: "Atlanta, GA", keyPositions: "Voting access, election security, transparency, government modernization" },
    ],
  },
  {
    race: { title: "Michigan Secretary of State 2026", office: "Secretary of State", level: "state" as const, state: "MI", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Jocelyn Benson term-limited (if running for governor)", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Jocelyn", lastName: "Benson", party: "democrat" as const, bio: "Incumbent Secretary of State. May run for governor instead. Election security champion.", currentRole: "Secretary of State", age: 48, hometown: "Detroit, MI", keyPositions: "Voting access, election security, auto industry regulations" },
    ],
  },
  {
    race: { title: "Arizona Secretary of State 2026", office: "Secretary of State", level: "state" as const, state: "AZ", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Key election administration role in swing state", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Adrian", lastName: "Fontes", party: "democrat" as const, bio: "Incumbent Secretary of State since 2023. Former Maricopa County Recorder. Marine veteran.", currentRole: "Secretary of State", age: 55, hometown: "Phoenix, AZ", isIncumbent: true, keyPositions: "Election security, voter access, government transparency" },
    ],
  },

  // ============ KEY ATTORNEY GENERAL RACES ============
  {
    race: { title: "Georgia Attorney General 2026", office: "Attorney General", level: "state" as const, state: "GA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Chris Carr term-limited", incumbentParty: "republican" },
    candidates: [
      { firstName: "Chris", lastName: "Carr", party: "republican" as const, bio: "Incumbent Attorney General since 2016. Led gang prosecution efforts. Cannot seek re-election.", currentRole: "Attorney General (term-limited)", age: 54, hometown: "Dunwoody, GA", keyPositions: "Gang prosecution, consumer protection, anti-human trafficking" },
    ],
  },
  {
    race: { title: "Texas Attorney General 2026", office: "Attorney General", level: "state" as const, state: "TX", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Incumbent Ken Paxton eligible for re-election", incumbentParty: "republican" },
    candidates: [
      { firstName: "Ken", lastName: "Paxton", party: "republican" as const, bio: "Incumbent Attorney General since 2015. Survived impeachment trial. Filed numerous lawsuits against Biden administration.", currentRole: "Attorney General", age: 63, hometown: "McKinney, TX", isIncumbent: true, keyPositions: "Border enforcement, religious liberty, anti-federal overreach, election integrity" },
    ],
  },
  {
    race: { title: "California Attorney General 2026", office: "Attorney General", level: "state" as const, state: "CA", electionDate: "2026-11-03", isExclusive: false, status: "active" as const, description: "Open if Rob Bonta runs for Governor", incumbentParty: "democrat" },
    candidates: [
      { firstName: "Rob", lastName: "Bonta", party: "democrat" as const, bio: "Incumbent AG. May run for governor instead.", currentRole: "Attorney General", age: 53, hometown: "Alameda, CA", isIncumbent: true, keyPositions: "Gun safety, environmental justice, consumer protection" },
    ],
  },
];

export const seedAllRaces = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingRaces = await ctx.db.query("races").collect();
    for (const r of existingRaces) {
      // Delete candidates for this race
      const candidates = await ctx.db.query("candidates").withIndex("by_race", q => q.eq("raceId", r._id)).collect();
      for (const c of candidates) {
        // Delete pledges for this candidate
        const pledges = await ctx.db.query("pledges").withIndex("by_candidate", q => q.eq("candidateId", c._id)).collect();
        for (const p of pledges) await ctx.db.delete(p._id);
        // Delete promises
        const promises = await ctx.db.query("promises").withIndex("by_candidate", q => q.eq("candidateId", c._id)).collect();
        for (const pr of promises) await ctx.db.delete(pr._id);
        await ctx.db.delete(c._id);
      }
      await ctx.db.delete(r._id);
    }

    let raceCount = 0;
    let candidateCount = 0;

    for (const entry of RACES_AND_CANDIDATES) {
      const raceId = await ctx.db.insert("races", entry.race);
      raceCount++;

      for (const c of entry.candidates) {
        await ctx.db.insert("candidates", {
          raceId,
          firstName: c.firstName,
          lastName: c.lastName,
          party: c.party as "democrat" | "republican" | "independent" | "other",
          status: "active",
          bio: c.bio,
          isOnboarded: false,
          pledgeCount: 0,
          donationTotal: 0,
          age: c.age,
          currentRole: c.currentRole,
          hometown: c.hometown,
          keyPositions: c.keyPositions,
          endorsements: (c as any).endorsements,
          isIncumbent: (c as any).isIncumbent,
          fundraisingTotal: (c as any).fundraisingTotal,
        });
        candidateCount++;
      }
    }

    // Update platform stats
    const existingStats = await ctx.db.query("platformStats").withIndex("by_key", q => q.eq("key", "current")).first();
    const statsData = {
      key: "current" as const,
      totalUsers: 0,
      totalPledges: 0,
      totalDonations: 0,
      totalRaces: raceCount,
      totalCandidates: candidateCount,
      activeStates: 36,
      bluevoteUsers: 0,
      redvoteUsers: 0,
      civicvoteUsers: 0,
      lastUpdated: new Date().toISOString(),
    };
    if (existingStats) {
      await ctx.db.patch(existingStats._id, statsData);
    } else {
      await ctx.db.insert("platformStats", statsData);
    }

    return `Seeded ${raceCount} races with ${candidateCount} candidates across all 2026 elections`;
  },
});
