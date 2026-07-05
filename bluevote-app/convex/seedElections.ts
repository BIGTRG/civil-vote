import { mutation } from "./_generated/server";

// All 2026 races with Democratic candidates for BlueVote
// Gubernatorial + key statewide races across all 36 states with governor elections

interface RaceData {
  title: string; state: string; type: "federal" | "state" | "local";
  electionDate: string; status: "active" | "upcoming" | "completed";
  description?: string;
}
interface CandidateData {
  name: string; party: "democrat" | "republican" | "independent" | "other";
  bio: string; positions: { issue: string; stance: string }[];
  endorsements: string[]; website?: string;
}

const ALL_RACES: { race: RaceData; candidates: CandidateData[] }[] = [
  // ============ ALABAMA ============
  { race: { title: "Alabama Governor 2026", state: "AL", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Kay Ivey term-limited" },
    candidates: [
      { name: "Terri Sewell", party: "democrat", bio: "U.S. Representative for AL-7 since 2011. First Black woman elected to Congress from Alabama. Harvard Law and Oxford educated. Focused on infrastructure and voting rights.", positions: [{ issue: "Healthcare", stance: "Expand Medicaid, protect ACA, lower prescription drug costs" }, { issue: "Voting Rights", stance: "Restore Voting Rights Act protections, fight gerrymandering" }, { issue: "Education", stance: "Increase teacher pay, expand pre-K, invest in HBCUs" }, { issue: "Economy", stance: "Infrastructure investment, broadband access, small business support" }], endorsements: ["Congressional Black Caucus", "AFL-CIO", "Alabama Education Association"] },
      { name: "Katie Britt", party: "republican", bio: "U.S. Senator from Alabama since 2023. Former CEO of the Business Council of Alabama. Youngest Republican woman elected to the Senate.", positions: [{ issue: "Border", stance: "Secure the border, end catch and release" }, { issue: "Economy", stance: "Tax cuts, deregulation, support small business" }, { issue: "Education", stance: "School choice, parental rights" }], endorsements: ["Alabama business community"] },
      { name: "Tim James", party: "republican", bio: "Businessman and perennial candidate. Son of former Gov. Fob James.", positions: [{ issue: "Immigration", stance: "Hardline enforcement, E-Verify mandate" }, { issue: "Values", stance: "Conservative social values, religious liberty" }], endorsements: [] },
    ],
  },
  // ============ ALASKA ============
  { race: { title: "Alaska Governor 2026", state: "AK", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Dunleavy eligible for re-election" },
    candidates: [
      { name: "Les Gara", party: "democrat", bio: "Former Alaska state representative (2003-2017). Attorney and child welfare advocate. Ran for governor in 2022.", positions: [{ issue: "Education", stance: "Fully fund public education, increase teacher retention" }, { issue: "Energy", stance: "Invest in renewables while managing oil transition" }, { issue: "Healthcare", stance: "Protect Medicaid expansion, lower costs" }, { issue: "Fiscal Policy", stance: "Responsible Permanent Fund management" }], endorsements: ["Alaska AFL-CIO", "NEA-Alaska"] },
      { name: "Mike Dunleavy", party: "republican", bio: "Incumbent Governor since 2018. Former state senator. Focused on resource development.", positions: [{ issue: "Economy", stance: "Full PFD dividends, oil development" }, { issue: "Government", stance: "Limited government, reduce spending" }], endorsements: [] },
    ],
  },
  // ============ ARIZONA ============
  { race: { title: "Arizona Governor 2026", state: "AZ", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Katie Hobbs eligible. Key swing state." },
    candidates: [
      { name: "Katie Hobbs", party: "democrat", bio: "Incumbent Governor since 2023. Former Secretary of State who oversaw 2020 election certification. First Democratic governor of Arizona since 2009.", positions: [{ issue: "Water", stance: "Long-term water sustainability, Colorado River compact" }, { issue: "Border", stance: "Comprehensive border security with humanitarian approach" }, { issue: "Abortion", stance: "Protect reproductive rights, signed repeal of 1864 ban" }, { issue: "Education", stance: "Increase public school funding, universal pre-K" }, { issue: "Economy", stance: "Semiconductor industry growth, CHIPS Act investment" }], endorsements: ["Arizona Education Association", "Planned Parenthood", "SEIU"], website: "https://katiehobbs.org" },
      { name: "Kari Lake", party: "republican", bio: "Former TV news anchor. Lost 2022 governor's race and 2024 Senate race. Trump ally.", positions: [{ issue: "Border", stance: "Complete border wall, declare invasion" }, { issue: "Elections", stance: "Election integrity reforms, paper ballots only" }], endorsements: ["Donald Trump"] },
      { name: "Karrin Taylor Robson", party: "republican", bio: "Real estate developer and former Regent of University of Arizona.", positions: [{ issue: "Water", stance: "Infrastructure investment, desalination" }, { issue: "Economy", stance: "Pro-business, tax reform" }], endorsements: ["Former Gov. Doug Ducey"] },
    ],
  },
  // ============ ARKANSAS ============
  { race: { title: "Arkansas Governor 2026", state: "AR", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Sanders eligible" },
    candidates: [
      { name: "Chris Jones", party: "democrat", bio: "Nuclear engineer and minister. Rhodes Scholar. Founded a nonprofit focused on economic mobility in the Delta. Lost 2022 governor's race but outperformed expectations.", positions: [{ issue: "Education", stance: "Invest in public schools, increase teacher pay, expand broadband for remote learning" }, { issue: "Healthcare", stance: "Expand Medicaid, address rural hospital closures" }, { issue: "Economy", stance: "Broadband access, Delta economic development, workforce training" }, { issue: "Infrastructure", stance: "Roads, bridges, and rural broadband investment" }], endorsements: ["Arkansas Education Association", "Labor unions"] },
      { name: "Sarah Huckabee Sanders", party: "republican", bio: "Incumbent Governor. Former White House Press Secretary.", positions: [{ issue: "Education", stance: "LEARNS Act, school choice, anti-CRT" }, { issue: "Taxes", stance: "Cut income tax, pro-business" }], endorsements: ["Donald Trump"] },
    ],
  },
  // ============ CALIFORNIA ============
  { race: { title: "California Governor 2026", state: "CA", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Newsom term-limited. Largest state economy." },
    candidates: [
      { name: "Toni Atkins", party: "democrat", bio: "President pro tempore of the California State Senate. Former Speaker of the CA Assembly. First openly LGBTQ+ person to lead either chamber of the CA legislature.", positions: [{ issue: "Housing", stance: "Build 2.5M new homes, streamline permitting, tenant protections" }, { issue: "Climate", stance: "100% clean energy by 2045, green jobs, wildfire prevention" }, { issue: "Healthcare", stance: "Universal healthcare, lower drug costs, mental health investment" }, { issue: "LGBTQ+ Rights", stance: "Protect marriage equality, anti-discrimination protections" }], endorsements: ["California Labor Federation", "Equality California", "CA Democratic Party"], website: "https://toniatkins.com" },
      { name: "Rob Bonta", party: "democrat", bio: "California Attorney General since 2021. First Filipino American AG in U.S. history. Former Assembly member.", positions: [{ issue: "Gun Safety", stance: "Assault weapons ban, red flag laws, gun dealer oversight" }, { issue: "Environment", stance: "Environmental justice, hold polluters accountable" }, { issue: "Consumer Protection", stance: "Fight price gouging, protect data privacy" }], endorsements: ["Everytown for Gun Safety", "Asian Pacific Islander caucus"] },
      { name: "Betty Yee", party: "democrat", bio: "Former California State Controller (2015-2023). First Asian American elected to statewide office in CA.", positions: [{ issue: "Fiscal Policy", stance: "Government transparency, responsible budgeting" }, { issue: "Climate", stance: "Green infrastructure investment" }], endorsements: [] },
      { name: "Nathan Hochman", party: "republican", bio: "LA County District Attorney. Former U.S. Assistant Attorney General.", positions: [{ issue: "Crime", stance: "Tough on crime, reverse progressive DA policies" }, { issue: "Government", stance: "Accountability, fiscal discipline" }], endorsements: [] },
    ],
  },
  // ============ COLORADO ============
  { race: { title: "Colorado Governor 2026", state: "CO", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Polis term-limited" },
    candidates: [
      { name: "Mike Johnston", party: "democrat", bio: "Mayor of Denver since 2023. Former state senator and education reform advocate. Addressed migrant crisis with innovative approach.", positions: [{ issue: "Housing", stance: "Affordable housing, homeless solutions, zoning reform" }, { issue: "Immigration", stance: "Humane migrant integration, federal funding advocacy" }, { issue: "Education", stance: "Teacher pay, universal pre-K, career pathways" }, { issue: "Climate", stance: "Clean energy transition, EV infrastructure" }], endorsements: ["Denver labor unions", "Education reform groups"] },
      { name: "Phil Weiser", party: "democrat", bio: "Colorado Attorney General since 2019. Former CU Boulder law school dean. Led antitrust actions against tech companies.", positions: [{ issue: "Tech", stance: "Regulate Big Tech, protect data privacy" }, { issue: "Consumer Protection", stance: "Fight price gouging, healthcare costs" }, { issue: "Climate", stance: "Clean energy, hold polluters accountable" }], endorsements: ["Colorado Education Association"] },
      { name: "Gabe Evans", party: "republican", bio: "U.S. Representative. Former police officer and Army helicopter pilot.", positions: [{ issue: "Public Safety", stance: "Back the blue, tough on crime" }, { issue: "Border", stance: "Secure the border, end sanctuary policies" }], endorsements: [] },
    ],
  },
  // ============ FLORIDA ============
  { race: { title: "Florida Governor 2026", state: "FL", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- DeSantis term-limited. Third-largest state." },
    candidates: [
      { name: "Nikki Fried", party: "democrat", bio: "Former Florida Commissioner of Agriculture (2019-2023). Only statewide elected Democrat in FL at the time. Attorney and lobbyist. Now FL Democratic Party chair.", positions: [{ issue: "Insurance", stance: "Address insurance crisis, hold companies accountable" }, { issue: "Abortion", stance: "Protect reproductive rights, repeal 6-week ban" }, { issue: "Guns", stance: "Universal background checks, red flag laws" }, { issue: "Environment", stance: "Everglades restoration, climate resilience" }, { issue: "Cannabis", stance: "Full legalization and regulation" }], endorsements: ["FL Democratic Party", "Planned Parenthood Florida", "FL AFL-CIO"] },
      { name: "Maxwell Frost", party: "democrat", bio: "U.S. Representative and youngest member of Congress. Gen Z activist. Former national organizing director for March for Our Lives.", positions: [{ issue: "Gun Violence", stance: "Federal assault weapons ban, community violence intervention" }, { issue: "Climate", stance: "Green New Deal, environmental justice" }, { issue: "Housing", stance: "Affordable housing, rent stabilization" }, { issue: "Student Debt", stance: "Cancel student debt, free community college" }], endorsements: ["March for Our Lives", "Sunrise Movement", "Progressive Caucus"] },
      { name: "Ashley Moody", party: "republican", bio: "Lieutenant Governor. Former FL Attorney General and circuit court judge.", positions: [{ issue: "Law Enforcement", stance: "Back the blue, tough on crime" }, { issue: "Border", stance: "Anti-illegal immigration" }], endorsements: ["Law enforcement unions"] },
      { name: "Jimmy Patronis", party: "republican", bio: "Florida CFO since 2017. Former state representative.", positions: [{ issue: "Insurance", stance: "Market-based reform" }, { issue: "Fiscal Policy", stance: "No state income tax, low regulation" }], endorsements: [] },
    ],
  },
  // ============ GEORGIA ============
  { race: { title: "Georgia Governor 2026", state: "GA", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Kemp term-limited. Major swing state." },
    candidates: [
      { name: "Keisha Lance Bottoms", party: "democrat", bio: "Former Mayor of Atlanta (2018-2022). Former Senior Advisor to President Biden. Led Atlanta through COVID and civil unrest. Endorsed by President Biden. Strong grassroots fundraising -- 93% of donations under $100.", positions: [{ issue: "Healthcare", stance: "Expand Medicaid to 500K+ uninsured Georgians, protect ACA" }, { issue: "Education", stance: "Increase teacher pay, universal pre-K, expand technical education" }, { issue: "Economy", stance: "Small business support, film industry growth, equitable development" }, { issue: "Public Safety", stance: "Community policing, gun violence prevention, mental health response" }, { issue: "Voting Rights", stance: "Restore and expand voting access, fight voter suppression" }], endorsements: ["President Joe Biden", "Atlanta business community", "Georgia AFL-CIO", "Planned Parenthood Southeast"], website: "https://keishaforgovernor.com" },
      { name: "Stacey Abrams", party: "democrat", bio: "Voting rights activist and former state House Minority Leader. Ran for governor in 2018 and 2022. Founded Fair Fight Action.", positions: [{ issue: "Voting Rights", stance: "National voting rights legislation, end gerrymandering" }, { issue: "Healthcare", stance: "Medicaid expansion, rural hospital preservation" }, { issue: "Economy", stance: "Small business, film industry, tech sector growth" }, { issue: "Education", stance: "Teacher pay, universal pre-K" }], endorsements: ["Fair Fight Action", "National Democratic establishment"] },
      { name: "Burt Jones", party: "republican", bio: "Lieutenant Governor since 2023. Former state senator. Trump-endorsed.", positions: [{ issue: "Taxes", stance: "Cut income tax, pro-business regulation" }, { issue: "Elections", stance: "Voter ID, election security measures" }, { issue: "Education", stance: "Parental rights, school choice" }], endorsements: ["Donald Trump"] },
      { name: "Rick Jackson", party: "republican", bio: "Billionaire healthcare executive. Self-funded candidate.", positions: [{ issue: "Healthcare", stance: "Market-based healthcare reform" }, { issue: "Economy", stance: "Business-friendly policies, infrastructure" }], endorsements: [] },
    ],
  },
  // ============ HAWAII ============
  { race: { title: "Hawaii Governor 2026", state: "HI", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Josh Green eligible" },
    candidates: [
      { name: "Josh Green", party: "democrat", bio: "Incumbent Governor since 2022. Emergency physician. Led Maui wildfire recovery. Former Lt. Governor.", positions: [{ issue: "Housing", stance: "Address housing crisis, build affordable units" }, { issue: "Recovery", stance: "Complete Maui wildfire rebuilding" }, { issue: "Energy", stance: "100% renewable energy goal" }, { issue: "Tourism", stance: "Sustainable tourism management" }], endorsements: ["Hawaii Government Employees Association"] },
    ],
  },
  // ============ ILLINOIS ============
  { race: { title: "Illinois Governor 2026", state: "IL", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent JB Pritzker eligible" },
    candidates: [
      { name: "JB Pritzker", party: "democrat", bio: "Incumbent Governor since 2019. Billionaire businessman and Hyatt hotel heir. Nationally prominent Democratic voice. Signed assault weapons ban and reproductive rights protections.", positions: [{ issue: "Abortion", stance: "Protect and expand reproductive rights, made IL a safe haven" }, { issue: "Guns", stance: "Assault weapons ban, universal background checks" }, { issue: "Climate", stance: "Clean energy jobs, CEJA implementation" }, { issue: "Economy", stance: "Infrastructure investment, fair tax advocacy" }], endorsements: ["Illinois AFL-CIO", "Planned Parenthood Illinois", "Illinois Education Association"] },
    ],
  },
  // ============ KANSAS ============
  { race: { title: "Kansas Governor 2026", state: "KS", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Laura Kelly term-limited" },
    candidates: [
      { name: "Sharice Davids", party: "democrat", bio: "U.S. Representative for KS-3 since 2019. First openly LGBTQ+ Native American elected to Congress. Former MMA fighter and White House fellow.", positions: [{ issue: "Healthcare", stance: "Protect ACA, lower prescription drug costs, expand access" }, { issue: "Reproductive Rights", stance: "Protect Kansas constitutional abortion protections" }, { issue: "Veterans", stance: "Expand VA services, support military families" }, { issue: "Economy", stance: "Bipartisan infrastructure, small business support" }], endorsements: ["Emily's List", "Kansas AFL-CIO", "VoteVets"], website: "https://sharicedavids.com" },
      { name: "Derek Schmidt", party: "republican", bio: "Former Kansas Attorney General. Lost to Kelly in 2022.", positions: [{ issue: "Taxes", stance: "Tax reform, limited government" }, { issue: "Public Safety", stance: "Law enforcement support" }], endorsements: [] },
      { name: "Kris Kobach", party: "republican", bio: "Kansas Attorney General. Known for hardline immigration stance.", positions: [{ issue: "Immigration", stance: "Strict enforcement, E-Verify" }, { issue: "Elections", stance: "Voter ID, citizenship verification" }], endorsements: [] },
    ],
  },
  // ============ MARYLAND ============
  { race: { title: "Maryland Governor 2026", state: "MD", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Wes Moore eligible. Rising Democratic star." },
    candidates: [
      { name: "Wes Moore", party: "democrat", bio: "Incumbent Governor since 2023. Combat veteran, Rhodes Scholar, bestselling author. First Black governor of Maryland. Led Francis Scott Key Bridge disaster response.", positions: [{ issue: "Education", stance: "Service year option, Blueprint for Maryland's Future, workforce development" }, { issue: "Economy", stance: "Innovation economy, small business support, cybersecurity hub" }, { issue: "Public Safety", stance: "Community-based violence intervention, gun safety" }, { issue: "Environment", stance: "Chesapeake Bay restoration, clean energy, climate resilience" }], endorsements: ["Maryland State Education Association", "Maryland AFL-CIO", "National Democratic leaders"], website: "https://wesmoore.com" },
      { name: "Larry Hogan", party: "republican", bio: "Former Governor (2015-2023). Known as moderate Republican. Lost 2024 Senate race.", positions: [{ issue: "Bipartisanship", stance: "Work across the aisle" }, { issue: "Fiscal Policy", stance: "Tax cuts, government efficiency" }], endorsements: [] },
    ],
  },
  // ============ MASSACHUSETTS ============
  { race: { title: "Massachusetts Governor 2026", state: "MA", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Maura Healey eligible" },
    candidates: [
      { name: "Maura Healey", party: "democrat", bio: "Incumbent Governor since 2023. Former Attorney General. First openly lesbian governor in U.S. history. Former professional basketball player in Austria.", positions: [{ issue: "Housing", stance: "Address housing crisis, zoning reform, affordable development" }, { issue: "Climate", stance: "Clean energy transition, offshore wind, EV infrastructure" }, { issue: "Education", stance: "Universal pre-K, higher ed affordability" }, { issue: "Healthcare", stance: "Mental health access, substance abuse treatment, cost containment" }], endorsements: ["Massachusetts Teachers Association", "SEIU"], website: "https://maurahealey.com" },
    ],
  },
  // ============ MICHIGAN ============
  { race: { title: "Michigan Governor 2026", state: "MI", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Whitmer term-limited. Key swing state." },
    candidates: [
      { name: "Jocelyn Benson", party: "democrat", bio: "Michigan Secretary of State since 2019. Election law expert. Oversaw 2020 and 2024 elections under intense pressure and threats.", positions: [{ issue: "Voting Rights", stance: "Expand voting access, automatic registration, election security" }, { issue: "Auto Industry", stance: "Support EV transition, protect auto workers" }, { issue: "Education", stance: "Invest in public schools, community colleges" }, { issue: "Government Reform", stance: "Transparency, anti-gerrymandering, ethics reform" }], endorsements: ["Michigan AFL-CIO", "UAW", "Michigan Education Association"] },
      { name: "Dana Nessel", party: "democrat", bio: "Michigan Attorney General since 2019. Civil rights attorney. Led prosecution of fake electors scheme.", positions: [{ issue: "Democracy", stance: "Protect elections, prosecute anti-democratic activity" }, { issue: "LGBTQ+ Rights", stance: "Full equality protections" }, { issue: "Guns", stance: "Red flag laws, safe storage, assault weapons regulation" }, { issue: "Environment", stance: "Hold polluters accountable, clean water" }], endorsements: ["Equality Michigan", "Everytown"] },
      { name: "Tom Barrett", party: "republican", bio: "Former state senator and Army helicopter pilot.", positions: [{ issue: "Economy", stance: "Manufacturing, reduce regulation" }, { issue: "Border", stance: "Secure the border" }], endorsements: [] },
      { name: "John James", party: "republican", bio: "U.S. Representative. Iraq War veteran, West Point grad.", positions: [{ issue: "Economy", stance: "Manufacturing, fiscal discipline" }, { issue: "National Security", stance: "Strong defense, veterans support" }], endorsements: [] },
    ],
  },
  // ============ MINNESOTA ============
  { race: { title: "Minnesota Governor 2026", state: "MN", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Walz term-limited after VP run" },
    candidates: [
      { name: "Keith Ellison", party: "democrat", bio: "Minnesota Attorney General since 2019. Former U.S. Representative. First Muslim elected to Congress. Successfully prosecuted Derek Chauvin for George Floyd's murder.", positions: [{ issue: "Civil Rights", stance: "Police accountability, criminal justice reform, racial equity" }, { issue: "Housing", stance: "Affordable housing, tenant protections, anti-price gouging" }, { issue: "Workers", stance: "Labor rights, minimum wage, workplace safety" }, { issue: "Environment", stance: "Clean energy, protect water resources, environmental justice" }], endorsements: ["Minnesota AFL-CIO", "DFL Party", "Civil rights organizations"], website: "https://keithellison.org" },
      { name: "Scott Jensen", party: "republican", bio: "Physician and former state senator. Lost to Walz in 2022.", positions: [{ issue: "Healthcare", stance: "Market-based reform, lower costs" }, { issue: "Taxes", stance: "Tax cuts, reduce government" }], endorsements: [] },
    ],
  },
  // ============ NEVADA ============
  { race: { title: "Nevada Governor 2026", state: "NV", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Lombardo eligible. Swing state." },
    candidates: [
      { name: "Cisco Aguilar", party: "democrat", bio: "Nevada Secretary of State since 2023. Business attorney. Former head of Nevada State Athletic Commission.", positions: [{ issue: "Economy", stance: "Diversify beyond gaming/tourism, tech sector growth" }, { issue: "Water", stance: "Colorado River conservation, desalination investment" }, { issue: "Voting", stance: "Expand voting access, mail-in voting protection" }, { issue: "Energy", stance: "Solar investment, clean energy jobs" }], endorsements: ["Nevada State AFL-CIO", "Culinary Workers Union"] },
      { name: "Joe Lombardo", party: "republican", bio: "Incumbent Governor. Former Clark County Sheriff.", positions: [{ issue: "Public Safety", stance: "Law enforcement support, tough on crime" }, { issue: "Education", stance: "School choice, Opportunity Scholarships" }], endorsements: [] },
    ],
  },
  // ============ NEW MEXICO ============
  { race: { title: "New Mexico Governor 2026", state: "NM", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Lujan Grisham term-limited" },
    candidates: [
      { name: "Raul Torrez", party: "democrat", bio: "New Mexico Attorney General since 2023. Former Bernalillo County DA. Prosecuted civil rights and public corruption cases.", positions: [{ issue: "Public Safety", stance: "Prosecute violent crime, community intervention programs" }, { issue: "Guns", stance: "Universal background checks, red flag laws" }, { issue: "Education", stance: "Early childhood education, teacher retention" }, { issue: "Water", stance: "Protect water rights, drought resilience" }], endorsements: ["New Mexico AFL-CIO"] },
      { name: "Mark Ronchetti", party: "republican", bio: "Former TV meteorologist. Lost 2022 governor's race.", positions: [{ issue: "Crime", stance: "Tough on crime, support police" }, { issue: "Border", stance: "Border security, anti-sanctuary" }], endorsements: [] },
    ],
  },
  // ============ NEW YORK ============
  { race: { title: "New York Governor 2026", state: "NY", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Hochul faces low approval. Potential primary challenge." },
    candidates: [
      { name: "Kathy Hochul", party: "democrat", bio: "Incumbent Governor since 2021. First female Governor of New York. Implemented congestion pricing. Navigated migrant crisis.", positions: [{ issue: "Housing", stance: "Build 800K new homes, zoning reform, tenant protections" }, { issue: "Climate", stance: "Green buildings, offshore wind, EV mandates" }, { issue: "Economy", stance: "Semiconductor investment, upstate revitalization" }, { issue: "Public Safety", stance: "Gun safety, subway security" }], endorsements: ["NY AFL-CIO", "1199 SEIU"] },
      { name: "Letitia James", party: "democrat", bio: "NY Attorney General since 2019. Pursued major cases against Trump Organization, NRA, and opioid companies. Could primary Hochul.", positions: [{ issue: "Corporate Accountability", stance: "Hold corporations accountable, consumer protection" }, { issue: "Housing", stance: "Tenant rights, affordable housing, anti-fraud" }, { issue: "Civil Rights", stance: "Racial justice, LGBTQ+ protections" }, { issue: "Guns", stance: "Sue gun manufacturers, strengthen regulations" }], endorsements: ["Working Families Party", "Progressive groups"] },
      { name: "Mike Lawler", party: "republican", bio: "U.S. Representative from NY-17. Defeated Sean Patrick Maloney.", positions: [{ issue: "Taxes", stance: "Restore full SALT deduction" }, { issue: "Public Safety", stance: "Support police, fight crime" }], endorsements: [] },
    ],
  },
  // ============ OHIO ============
  { race: { title: "Ohio Governor 2026", state: "OH", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- DeWine term-limited" },
    candidates: [
      { name: "Nan Whaley", party: "democrat", bio: "Former Mayor of Dayton (2014-2022). Led city through 2019 mass shooting and tornado recovery. Lost 2022 governor's race but built statewide profile.", positions: [{ issue: "Guns", stance: "Universal background checks, assault weapons ban, red flag laws" }, { issue: "Abortion", stance: "Protect Issue 1 constitutional amendment, reproductive freedom" }, { issue: "Economy", stance: "Manufacturing revival, Intel investment, workforce training" }, { issue: "Infrastructure", stance: "Roads, bridges, broadband, lead pipe replacement" }], endorsements: ["Ohio AFL-CIO", "Moms Demand Action"] },
      { name: "Jon Husted", party: "republican", bio: "Lt. Governor since 2019. Former Secretary of State.", positions: [{ issue: "Economy", stance: "Intel chip plant, workforce development" }, { issue: "Taxes", stance: "Tax reform, business-friendly" }], endorsements: [] },
      { name: "Frank LaRose", party: "republican", bio: "Secretary of State. Army Green Beret veteran.", positions: [{ issue: "Elections", stance: "Election integrity, voter ID" }, { issue: "Veterans", stance: "Support veterans, fiscal discipline" }], endorsements: [] },
    ],
  },
  // ============ OREGON ============
  { race: { title: "Oregon Governor 2026", state: "OR", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Tina Kotek eligible" },
    candidates: [
      { name: "Tina Kotek", party: "democrat", bio: "Incumbent Governor since 2023. Former Speaker of the Oregon House. First openly lesbian governor elected in the U.S. Focused on homelessness crisis.", positions: [{ issue: "Homelessness", stance: "Emergency shelter funding, supportive housing, mental health services" }, { issue: "Housing", stance: "Build 36,000 units/year, zoning reform, rent stabilization" }, { issue: "Climate", stance: "100% clean electricity by 2040, wildfire prevention" }, { issue: "Education", stance: "Universal pre-K, increase graduation rates" }], endorsements: ["Oregon Education Association", "Oregon AFL-CIO", "Equality Oregon"] },
      { name: "Christine Drazan", party: "republican", bio: "Former Oregon House Republican Leader. Nearly won 2022 in three-way split.", positions: [{ issue: "Homelessness", stance: "Enforce camping bans, mental health and addiction treatment" }, { issue: "Public Safety", stance: "Support police, reverse Measure 110" }], endorsements: [] },
    ],
  },
  // ============ PENNSYLVANIA ============
  { race: { title: "Pennsylvania Governor 2026", state: "PA", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Josh Shapiro eligible. Major swing state." },
    candidates: [
      { name: "Josh Shapiro", party: "democrat", bio: "Incumbent Governor since 2023. Former Attorney General. Known for infrastructure focus, bipartisan approach, and I-95 rapid repair. Considered potential future presidential candidate.", positions: [{ issue: "Infrastructure", stance: "Fix every structurally deficient bridge, expand broadband" }, { issue: "Energy", stance: "All-of-the-above: renewables + natural gas transition" }, { issue: "Education", stance: "School funding equity, career pathways, vo-tech" }, { issue: "Economy", stance: "Manufacturing, semiconductor investment, small business" }, { issue: "Public Safety", stance: "Community policing, gun violence reduction" }], endorsements: ["Pennsylvania AFL-CIO", "PA State Education Association", "Building trades unions"], website: "https://joshshapiro.org" },
    ],
  },
  // ============ SOUTH CAROLINA ============
  { race: { title: "South Carolina Governor 2026", state: "SC", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- McMaster term-limited" },
    candidates: [
      { name: "Jaime Harrison", party: "democrat", bio: "Chair of the Democratic National Committee. Raised record $130M in 2020 Senate race against Lindsey Graham. First Black chair of DNC.", positions: [{ issue: "Education", stance: "Public school investment, teacher pay, rural education access" }, { issue: "Healthcare", stance: "Medicaid expansion, rural hospital preservation" }, { issue: "Voting Rights", stance: "Expand voting access, end gerrymandering" }, { issue: "Economy", stance: "Rural development, broadband, workforce training" }], endorsements: ["DNC", "SC Democratic Party", "National labor unions"] },
      { name: "Alan Wilson", party: "republican", bio: "Attorney General since 2011. Son of U.S. Rep. Joe Wilson.", positions: [{ issue: "Law Enforcement", stance: "Tough on crime, gang prosecution" }, { issue: "Immigration", stance: "Anti-illegal immigration" }], endorsements: [] },
    ],
  },
  // ============ TENNESSEE ============
  { race: { title: "Tennessee Governor 2026", state: "TN", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Bill Lee term-limited" },
    candidates: [
      { name: "Gloria Johnson", party: "democrat", bio: "State Representative and one of the 'Tennessee Three.' Gained national attention for gun reform protest on House floor after Covenant School shooting.", positions: [{ issue: "Gun Safety", stance: "Red flag laws, safe storage, universal background checks" }, { issue: "Education", stance: "Fund public schools, increase teacher pay, oppose vouchers" }, { issue: "Healthcare", stance: "Expand Medicaid, protect rural hospitals" }, { issue: "Workers", stance: "Living wage, union rights, workplace protections" }], endorsements: ["National gun safety groups", "Tennessee Education Association", "Moms Demand Action"] },
      { name: "Bill Hagerty", party: "republican", bio: "U.S. Senator. Former Ambassador to Japan.", positions: [{ issue: "Economy", stance: "Trade, business-friendly, tax cuts" }, { issue: "Foreign Policy", stance: "Strong defense, Japan/Asia expertise" }], endorsements: [] },
    ],
  },
  // ============ TEXAS ============
  { race: { title: "Texas Governor 2026", state: "TX", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Abbott eligible. Second largest state." },
    candidates: [
      { name: "Beto O'Rourke", party: "democrat", bio: "Former U.S. Representative. Lost 2018 Senate race to Cruz by 2.6%, 2022 governor's race by 11%. Nationally known grassroots campaigner. Founded Powered By People nonprofit.", positions: [{ issue: "Guns", stance: "Universal background checks, red flag laws, raise purchase age" }, { issue: "Abortion", stance: "Restore Roe protections, repeal TX trigger ban" }, { issue: "Border", stance: "Comprehensive immigration reform, support border communities" }, { issue: "Education", stance: "Increase public school funding, teacher pay, oppose vouchers" }, { issue: "Energy", stance: "Grid reliability, renewable investment, hold utilities accountable" }], endorsements: ["Texas AFL-CIO", "Planned Parenthood TX", "Moms Demand Action TX"], website: "https://betoorourke.com" },
      { name: "Greg Abbott", party: "republican", bio: "Incumbent Governor since 2015. Led Operation Lone Star border initiative.", positions: [{ issue: "Border", stance: "Border wall, razor wire, bus migrants to sanctuary cities" }, { issue: "Taxes", stance: "Property tax relief, no income tax" }], endorsements: ["Donald Trump"] },
    ],
  },
  // ============ WISCONSIN ============
  { race: { title: "Wisconsin Governor 2026", state: "WI", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Tony Evers eligible. Key swing state." },
    candidates: [
      { name: "Tony Evers", party: "democrat", bio: "Incumbent Governor since 2019. Former State Superintendent. Known for blocking extreme GOP legislative agenda with vetoes -- used veto pen to extend school funding increase for 400 years.", positions: [{ issue: "Education", stance: "Historic school funding increases, public school champion" }, { issue: "Healthcare", stance: "Medicaid expansion, lower drug costs" }, { issue: "Abortion", stance: "Protect reproductive rights, pardoned abortion providers" }, { issue: "Infrastructure", stance: "Fix roads, expand broadband, clean water" }], endorsements: ["Wisconsin Education Association", "WI AFL-CIO", "Planned Parenthood WI"] },
    ],
  },
  // ============ CONNECTICUT ============
  { race: { title: "Connecticut Governor 2026", state: "CT", type: "state", electionDate: "2026-11-03", status: "active", description: "Incumbent Lamont may retire" },
    candidates: [
      { name: "Ned Lamont", party: "democrat", bio: "Incumbent Governor since 2019. Businessman. Balanced budgets and built rainy day fund.", positions: [{ issue: "Fiscal Policy", stance: "Balanced budgets, rainy day fund, debt reduction" }, { issue: "Education", stance: "Invest in public schools, early childhood" }, { issue: "Transportation", stance: "Modernize rail, fix infrastructure" }], endorsements: ["CT AFL-CIO"] },
      { name: "Bob Stefanowski", party: "republican", bio: "Business executive. Two-time gubernatorial candidate.", positions: [{ issue: "Taxes", stance: "Cut taxes, reduce government" }, { issue: "Economy", stance: "Pro-business, reduce regulations" }], endorsements: [] },
    ],
  },
  // ============ IDAHO ============
  { race: { title: "Idaho Governor 2026", state: "ID", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Brad Little", party: "republican", bio: "Incumbent Governor. Rancher and former Lt. Governor.", positions: [{ issue: "Taxes", stance: "Tax cuts, limited government" }, { issue: "Education", stance: "School choice" }], endorsements: [] },
    ],
  },
  // ============ IOWA ============
  { race: { title: "Iowa Governor 2026", state: "IA", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Kim Reynolds", party: "republican", bio: "Incumbent Governor. First woman to serve as Iowa governor.", positions: [{ issue: "Education", stance: "School choice, vouchers" }, { issue: "Taxes", stance: "Flat tax, limited government" }], endorsements: [] },
    ],
  },
  // ============ MAINE ============
  { race: { title: "Maine Governor 2026", state: "ME", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Mills term-limited" },
    candidates: [
      { name: "Aaron Frey", party: "democrat", bio: "Maine Attorney General since 2019. Former state representative. Led opioid crisis response.", positions: [{ issue: "Opioids", stance: "Treatment access, hold pharma accountable" }, { issue: "Healthcare", stance: "Protect Medicaid expansion, lower costs" }, { issue: "Environment", stance: "Protect Maine coast, clean energy" }], endorsements: ["Maine Education Association"] },
      { name: "Paul LePage", party: "republican", bio: "Former Governor (2011-2019). Known for confrontational style.", positions: [{ issue: "Taxes", stance: "Tax reform, reduce welfare" }, { issue: "Energy", stance: "Lower energy costs" }], endorsements: [] },
    ],
  },
  // ============ NEBRASKA ============
  { race: { title: "Nebraska Governor 2026", state: "NE", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Jim Pillen", party: "republican", bio: "Incumbent Governor. Hog farmer and former Husker football player.", positions: [{ issue: "Taxes", stance: "Property tax relief" }, { issue: "Agriculture", stance: "Support farmers, water" }], endorsements: [] },
    ],
  },
  // ============ NEW HAMPSHIRE ============
  { race: { title: "New Hampshire Governor 2026", state: "NH", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Kelly Ayotte", party: "republican", bio: "Governor since 2025. Former U.S. Senator and NH Attorney General.", positions: [{ issue: "Taxes", stance: "No income tax, business-friendly" }, { issue: "Opioids", stance: "Treatment and enforcement" }], endorsements: [] },
    ],
  },
  // ============ OKLAHOMA ============
  { race: { title: "Oklahoma Governor 2026", state: "OK", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Kevin Stitt", party: "republican", bio: "Incumbent Governor. CEO of Gateway Mortgage. First Cherokee Nation citizen elected governor.", positions: [{ issue: "Government", stance: "Efficiency, reduce spending" }, { issue: "Education", stance: "School choice" }], endorsements: [] },
    ],
  },
  // ============ RHODE ISLAND ============
  { race: { title: "Rhode Island Governor 2026", state: "RI", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Dan McKee", party: "democrat", bio: "Incumbent Governor since 2021. Former Lt. Governor and mayor of Cumberland.", positions: [{ issue: "Housing", stance: "Affordable housing development" }, { issue: "Education", stance: "Public school investment" }, { issue: "Economy", stance: "Small business support, infrastructure" }], endorsements: [] },
    ],
  },
  // ============ SOUTH DAKOTA ============
  { race: { title: "South Dakota Governor 2026", state: "SD", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Larry Rhoden", party: "republican", bio: "Governor since 2025 after Noem joined Trump cabinet. Rancher and former state senator.", positions: [{ issue: "Agriculture", stance: "Support ranchers and farmers" }, { issue: "Government", stance: "Limited government, low taxes" }], endorsements: [] },
    ],
  },
  // ============ VERMONT ============
  { race: { title: "Vermont Governor 2026", state: "VT", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Phil Scott", party: "republican", bio: "Incumbent Governor. Moderate Republican in deep-blue state. Former race car driver.", positions: [{ issue: "Fiscal Policy", stance: "Balanced budgets, moderate governance" }, { issue: "Housing", stance: "Address housing shortage" }], endorsements: [] },
    ],
  },
  // ============ WYOMING ============
  { race: { title: "Wyoming Governor 2026", state: "WY", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Mark Gordon", party: "republican", bio: "Incumbent Governor. Rancher and former State Treasurer.", positions: [{ issue: "Energy", stance: "Support coal, oil, gas" }, { issue: "Public Lands", stance: "State control of federal lands" }], endorsements: [] },
    ],
  },

  // ============ KEY SECRETARY OF STATE RACES ============
  { race: { title: "Georgia Secretary of State 2026", state: "GA", type: "state", electionDate: "2026-11-03", status: "active", description: "Open seat -- Raffensperger term-limited" },
    candidates: [
      { name: "Bee Nguyen", party: "democrat", bio: "State representative. Ran for SOS in 2022. First Vietnamese American elected to GA legislature.", positions: [{ issue: "Voting", stance: "Expand voting access, automatic registration" }, { issue: "Elections", stance: "Election security, transparency" }], endorsements: ["GA Democratic Party"] },
    ],
  },
  { race: { title: "Arizona Secretary of State 2026", state: "AZ", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Adrian Fontes", party: "democrat", bio: "Incumbent SOS since 2023. Former Maricopa County Recorder. Marine veteran.", positions: [{ issue: "Elections", stance: "Secure, accessible elections" }, { issue: "Voting", stance: "Expand early and mail voting" }], endorsements: [] },
    ],
  },

  // ============ KEY ATTORNEY GENERAL RACES ============
  { race: { title: "Michigan Attorney General 2026", state: "MI", type: "state", electionDate: "2026-11-03", status: "active" },
    candidates: [
      { name: "Dana Nessel", party: "democrat", bio: "Incumbent AG. Civil rights attorney. May run for governor instead.", positions: [{ issue: "Democracy", stance: "Protect elections, prosecute corruption" }, { issue: "LGBTQ+", stance: "Full equality" }], endorsements: [] },
    ],
  },
];

export const seedAllRaces = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingRaces = await ctx.db.query("races").collect();
    for (const r of existingRaces) {
      const candidates = await ctx.db.query("candidates").withIndex("by_race", q => q.eq("raceId", r._id)).collect();
      for (const c of candidates) {
        const pledges = await ctx.db.query("pledges").withIndex("by_candidate", q => q.eq("candidateId", c._id)).collect();
        for (const p of pledges) await ctx.db.delete(p._id);
        await ctx.db.delete(c._id);
      }
      await ctx.db.delete(r._id);
    }

    let raceCount = 0;
    let candidateCount = 0;

    for (const entry of ALL_RACES) {
      const raceId = await ctx.db.insert("races", {
        ...entry.race,
        totalPledges: 0,
        totalRaised: 0,
      });
      raceCount++;

      for (const c of entry.candidates) {
        await ctx.db.insert("candidates", {
          name: c.name,
          raceId,
          party: c.party,
          bio: c.bio,
          positions: c.positions,
          endorsements: c.endorsements,
          website: c.website,
          pledgeCount: 0,
          totalRaised: 0,
        });
        candidateCount++;
      }
    }

    return `BlueVote seeded: ${raceCount} races, ${candidateCount} candidates`;
  },
});
