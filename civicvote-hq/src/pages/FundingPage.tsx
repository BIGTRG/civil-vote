import { useState } from "react";

type Tab = "overview" | "democratic" | "republican" | "state" | "paths";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "democratic", label: "Democratic" },
  { id: "republican", label: "Republican" },
  { id: "state", label: "State Parties" },
  { id: "paths", label: "Vendor Paths" },
];

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
      <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/10">
            {headers.map((h, i) => (
              <th key={i} className={`py-2.5 px-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ${i > 0 ? "text-right" : "text-left"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100 dark:border-white/5">
              {row.map((cell, ci) => (
                <td key={ci} className={`py-2.5 px-3 ${ci > 0 ? "text-right font-mono text-xs" : ""} text-gray-700 dark:text-gray-300`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$2.53B" label="All Party Committees" sub="2024 Cycle Combined" />
        <StatCard value="$834M" label="2025-2026 Receipts" sub="Through Dec 2025" />
        <StatCard value="$311M" label="Cash on Hand" sub="All Committees Combined" />
        <StatCard value="$11.6B" label="2026 Midterm Spend" sub="Projected Total" />
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">National Committee Comparison -- 2024 Cycle</h3>
        <DataTable
          headers={["Committee", "Raised", "Spent", "Cash on Hand"]}
          rows={[
            ["DNC", "$189M", "$197M", "$15.2M"],
            ["All Democratic Committees", "$2.05B", "$2.04B", "$98.3M"],
            ["RNC", "$247M", "$452M", "$80.7M"],
            ["All Republican Committees", "$476M", "$452M", "$38.1M"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">2026 Midterm Spending Breakdown</h3>
          <DataTable
            headers={["Category", "Projected"]}
            rows={[
              ["Congressional Advertising", "$5.0B"],
              ["Connected TV Advertising", "$2.48B"],
              ["State Legislative Advertising", "$700M"],
              ["Digital Advertising (~36%)", "$4.2B"],
              ["Total Political + Advocacy", "$11.6B"],
            ]}
          />
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">2025-2026 Cycle Activity</h3>
          <DataTable
            headers={["Metric", "Amount"]}
            rows={[
              ["House + Senate Candidates Raised", "$1.5B"],
              ["House Candidates Receipts", "$1.0B"],
              ["Federal PAC Receipts", "$4.6B"],
              ["Individual Contributions (Dem)", "$258.8M"],
              ["Individual Contributions (GOP)", "$220.3M"],
              ["PAC Contributions to Dems", "$35.1M"],
              ["PAC Contributions to GOP", "$27.5M"],
            ]}
          />
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4 text-sm text-amber-800 dark:text-amber-200">
        <span className="font-semibold">Source:</span> FEC filings, OpenSecrets, Ballotpedia, AdImpact projections. Data as of June 2026.
      </div>
    </div>
  );
}

function DemocraticTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$2.05B" label="All Dem Committees" sub="2024 Cycle" />
        <StatCard value="$189M" label="DNC Raised" sub="2024 Cycle" />
        <StatCard value="$171M" label="DCCC Raised" sub="2024 Cycle" />
        <StatCard value="$165M" label="DNC to State Transfers" sub="2024" />
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Democratic Committee Breakdown</h3>
        <DataTable
          headers={["Committee", "Raised", "Spent", "Role"]}
          rows={[
            ["DNC (National Committee)", "$189M", "$197M", "National operations, voter file, tech"],
            ["DCCC (Congressional)", "$171M", "--", "House race support"],
            ["DSCC (Senatorial)", "Significant", "--", "Senate race support"],
            ["State/Local Committees (federal)", "$87.7M", "$69.7M", "State-level operations"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">DNC Expenditure Categories</h3>
          <DataTable
            headers={["Category", "Amount", "Share"]}
            rows={[
              ["Transfers", "$277M", "40.4%"],
              ["Administrative", "$88.9M", "13.0%"],
              ["Campaign Expenses", "$73.4M", "10.7%"],
              ["Media", "$35.2M", "5.1%"],
              ["Strategy & Research", "$34.5M", "5.0%"],
              ["Fundraising", "$12.4M", "1.8%"],
            ]}
          />
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">DNC State Partnership Program</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Baseline per state/month</span>
              <span className="font-mono font-semibold">$17,500</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Red State Fund bonus/month</span>
              <span className="font-mono font-semibold">+$5,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Red state total/month</span>
              <span className="font-mono font-semibold">$22,500</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Data & tooling per state/year</span>
              <span className="font-mono font-semibold">Six figures</span>
            </div>
            <div className="flex justify-between py-2">
              <span>DNC to state transfers (2024)</span>
              <span className="font-mono font-semibold">$165M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Top DNC Vendor Payments (2024)</h3>
        <DataTable
          headers={["Vendor", "Amount"]}
          rows={[
            ["MissionWired", "$32.6M"],
            ["2024 Democratic National Convention Cmte", "$16.3M"],
            ["Democratic Party of Wisconsin", "$14.9M"],
            ["DCCC (transfer)", "$12.6M"],
            ["DSCC (transfer)", "$12.5M"],
            ["WilmerHale LLP", "$11.8M"],
          ]}
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-4 text-sm text-blue-800 dark:text-blue-200">
        <span className="font-semibold">Vendor Opportunity:</span> The DNC "I Will Run" Marketplace is the official vendor approval program. Contact tech-ecosystem@dnc.org to apply. Approved vendors are recommended to every Democratic candidate nationally.
      </div>
    </div>
  );
}

function RepublicanTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$476M" label="All GOP Committees" sub="2024 Cycle" />
        <StatCard value="$247M" label="RNC Raised" sub="2024 Cycle" />
        <StatCard value="$172M" label="RNC Raised in 2025" sub="Calendar Year" />
        <StatCard value="$95.1M" label="RNC Cash on Hand" sub="Start of 2026" />
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Republican Committee Breakdown</h3>
        <DataTable
          headers={["Committee", "Raised", "Spent", "Role"]}
          rows={[
            ["RNC (National Committee)", "$247M", "$452M", "National operations, voter data, tech"],
            ["NRCC (Congressional)", "$200M+", "$200M+", "House race support"],
            ["NRSC (Senatorial)", "Significant", "--", "Senate race support"],
            ["Data Trust", "--", "--", "Voter data management (for-profit)"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">RNC Financial Position</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>2025 total raised</span>
              <span className="font-mono font-semibold">$172M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>December 2025 haul</span>
              <span className="font-mono font-semibold">$16M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Cash on hand (start 2026)</span>
              <span className="font-mono font-semibold">$95.1M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Cash advantage over DNC (mid-2025)</span>
              <span className="font-mono font-semibold">$65.6M</span>
            </div>
            <div className="flex justify-between py-2">
              <span>RNC H1 2025 receipts</span>
              <span className="font-mono font-semibold">$96M</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">RNC Data Operations</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Data operations investment (est.)</span>
              <span className="font-mono font-semibold">$100M+</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Data Trust voter file</span>
              <span className="font-mono font-semibold">200M+ records</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Data vendor spend (2014 example)</span>
              <span className="font-mono font-semibold">$11.5M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Top NRCC Vendor Payments (2024)</h3>
        <DataTable
          headers={["Vendor", "Amount"]}
          rows={[
            ["National Media Inc", "$35.8M"],
            ["Targeted Victory", "$20.0M"],
            ["Insperity", "$14.4M"],
            ["Lukens Co", "$8.6M"],
            ["OnMessage Inc", "$6.0M"],
            ["WinRed", "$2.5M"],
            ["SMART Media Group", "$2.3M"],
          ]}
        />
      </div>

      <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 text-sm text-red-800 dark:text-red-200">
        <span className="font-semibold">Vendor Opportunity:</span> The RNC approves vendors through direct review (no public marketplace). Vottiv was approved in 2023 and is now deployed across state parties. Contact RNC at (202) 863-8500 to begin vendor approval.
      </div>
    </div>
  );
}

function StatePartiesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$87.7M" label="State Dem Committees" sub="Federal Funds, 2025-26" />
        <StatCard value="$165M" label="DNC to State Transfers" sub="2024" />
        <StatCard value="$700M" label="State Legislative Ads" sub="2026 Projected" />
        <StatCard value="36" label="Gubernatorial Races" sub="2026" />
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Priority Swing States -- 2026 Gubernatorial</h3>
        <DataTable
          headers={["State", "Significance", "Dem Party Contact", "GOP Party Contact"]}
          rows={[
            ["Georgia", "Open seat, top-tier swing", "info@georgiademocrat.org", "info@gagop.org"],
            ["Arizona", "Competitive swing state", "info@azdem.org", "info@azgop.org"],
            ["Michigan", "Competitive swing state", "midemparty@michigandems.com", "info@migop.org"],
            ["Nevada", "Competitive swing state", "admin@nvdems.com", "info@nevadagop.org"],
            ["Pennsylvania", "Open seat, key battleground", "info@padems.com", "info@pagop.org"],
            ["Florida", "$50M+ projected investment", "info@floridadems.org", "rpofdigital@rpof.org"],
            ["Texas", "$50M+ projected investment", "info@txdemocrats.org", "info@texasgop.org"],
            ["Virginia", "Competitive gubernatorial", "info@vademocrats.org", "info@virginia.gop"],
            ["Illinois", "$50M+ projected investment", "contact@ildems.com", "info@ilgop.org"],
            ["North Carolina", "Competitive swing state", "team@ncdp.org", "info@ncgop.org"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">NRSC Transfers to State Parties (2024)</h3>
          <DataTable
            headers={["State GOP", "Amount"]}
            rows={[
              ["Montana GOP", "$1.54M"],
              ["Ohio GOP", "$1.35M"],
              ["West Virginia GOP", "$676K"],
              ["Nevada GOP", "$595K"],
              ["Indiana GOP", "$587K"],
              ["Maine GOP", "$578K"],
              ["Texas GOP", "$564K"],
              ["Florida GOP", "$561K"],
            ]}
          />
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Key State Spending Projections (2026)</h3>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>States with $50M+ investment</span>
              <span className="font-mono font-semibold">7 states</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>FL, IL, NC, PA, TX, VA</span>
              <span className="font-mono font-semibold">$50M+ each</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
              <span>Swing gov races (AZ, GA, MI, NV, VA)</span>
              <span className="font-mono font-semibold">~1/3 of all gov spend</span>
            </div>
            <div className="flex justify-between py-2">
              <span>State legislative total</span>
              <span className="font-mono font-semibold">$700M (19% up)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorPathsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">Path 1: DNC "I Will Run" Marketplace</h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Apply to be an approved vendor on the DNC's official tech marketplace. Approved vendors are recommended to every Democratic candidate.</p>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-white/5 text-xs">
              <div className="font-semibold mb-1">Contact:</div>
              <div className="font-mono">tech-ecosystem@dnc.org</div>
              <div className="mt-2 font-semibold mb-1">Categories:</div>
              <div>Voter Contact, Digital, Finance</div>
              <div className="mt-2 font-semibold mb-1">Pricing Required:</div>
              <div>Free tier or DNC-negotiated rate (up to 25% discount)</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 mb-4">Path 2: RNC Vendor Approval</h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Apply directly to the RNC for vendor approval. Study the Vottiv model: they got approved in 2023 and are now deployed across state parties.</p>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-white/5 text-xs">
              <div className="font-semibold mb-1">Contact:</div>
              <div className="font-mono">RNC: (202) 863-8500</div>
              <div className="font-mono">310 First Street SE, Washington, DC 20003</div>
              <div className="mt-2 font-semibold mb-1">Key Integration:</div>
              <div>Data Trust voter file access</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Path 3: ActBlue / WinRed Integration</h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Integrate with existing donation platforms rather than competing. BlueVote embeds ActBlue; RedVote embeds WinRed.</p>
            <DataTable
              headers={["Platform", "Fee", "Volume"]}
              rows={[
                ["ActBlue (standard)", "3.95%", "$8B+ total"],
                ["ActBlue (Raise)", "3.50%", "Small campaigns"],
                ["WinRed (grassroots)", "3.94%", "$2.2B+ (2020)"],
                ["WinRed (high-dollar)", "3.20%", "Major donors"],
                ["WinRed (ACH)", "0.80%", "Capped at $5"],
              ]}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Path 4: State Party Contracts</h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Pitch directly to state party chairs in swing states. State parties contract vendors independently of national committees.</p>
            <div className="mt-3 p-3 bg-gray-50 dark:bg-white/5 text-xs">
              <div className="font-semibold mb-1">Target First:</div>
              <div>GA, AZ, MI, NV, PA (competitive gubernatorial)</div>
              <div className="mt-2 font-semibold mb-1">Dem State Parties:</div>
              <div className="font-mono">democrats.org/state-parties</div>
              <div className="mt-2 font-semibold mb-1">ASDC:</div>
              <div>Association of State Democratic Committees -- can reach all 50 states</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Path 5: SaaS Revenue Model</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Operate as a SaaS vendor selling platform access. No FEC registration required. Campaigns pay for software; donations flow through ActBlue/WinRed.</p>
        <DataTable
          headers={["Revenue Stream", "Per Unit", "Target Volume", "Annual Revenue"]}
          rows={[
            ["Candidate SaaS (standard)", "$99/month", "50 candidates", "$59,400"],
            ["Candidate SaaS (premium)", "$499/month", "15 candidates", "$89,820"],
            ["State party contracts", "$2,500/month", "5 states", "$150,000"],
            ["National committee contract", "$10,000/month", "1-2 committees", "$120-240K"],
            ["Total Year 1 Target", "", "", "$419-539K"],
          ]}
        />
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">FEC Compliance Note</h3>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p><strong>SaaS vendor model (recommended):</strong> No FEC registration needed. Sell software/services at fair market value. Standard commercial vendor relationship per FEC AO 2021-07.</p>
          <p><strong>If processing donations directly:</strong> Must register as conduit/intermediary PAC or structure under FEC AO 2011-06 (Democracy Engine model). More complex -- integrate ActBlue/WinRed instead.</p>
        </div>
      </div>
    </div>
  );
}

export function FundingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Party Funding Intelligence</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          National and state-level party committee funding data for the 2024-2026 election cycle
        </p>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto border-b border-gray-200 dark:border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#0F2A4A] dark:border-[#C9A227] text-[#0F2A4A] dark:text-[#C9A227]"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "democratic" && <DemocraticTab />}
      {activeTab === "republican" && <RepublicanTab />}
      {activeTab === "state" && <StatePartiesTab />}
      {activeTab === "paths" && <VendorPathsTab />}
    </div>
  );
}
