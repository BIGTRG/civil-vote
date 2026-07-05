import { useState } from "react";

type Tab = "overview" | "national" | "state" | "vendor";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "national", label: "National Funding" },
  { id: "state", label: "State Parties" },
  { id: "vendor", label: "Vendor Paths" },
];

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-[#130e1d] border border-white/10 p-5">
      <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-purple-300/50 mt-1">{label}</div>
      {sub && <div className="text-xs text-white/30 mt-1">{sub}</div>}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((h, i) => (
              <th key={i} className={`py-2.5 px-3 text-xs font-medium uppercase tracking-wider text-purple-300/50 ${i > 0 ? "text-right" : "text-left"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5">
              {row.map((cell, ci) => (
                <td key={ci} className={`py-2.5 px-3 ${ci > 0 ? "text-right font-mono text-xs" : ""} text-white/80`}>{cell}</td>
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
        <StatCard value="$2.05B" label="All Dem Committees" sub="2024 Cycle" />
        <StatCard value="$189M" label="DNC Raised" sub="2024 Cycle" />
        <StatCard value="$165M" label="DNC to State Transfers" sub="2024" />
        <StatCard value="$11.6B" label="2026 Midterm Spend" sub="Projected Total" />
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">Democratic Committee Breakdown -- 2024 Cycle</h3>
        <DataTable
          headers={["Committee", "Raised", "Spent", "Cash on Hand"]}
          rows={[
            ["DNC (National Committee)", "$189M", "$197M", "$15.2M"],
            ["DCCC (Congressional)", "$171M", "--", "--"],
            ["DSCC (Senatorial)", "Significant", "--", "--"],
            ["State/Local (federal, 2025-26)", "$87.7M", "$69.7M", "$39.3M"],
            ["All Democratic Combined", "$2.05B", "$2.04B", "$98.3M"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#130e1d] border border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">DNC Expenditure Categories</h3>
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
        <div className="bg-[#130e1d] border border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">DNC State Partnership Program</h3>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Baseline per state/month</span>
              <span className="font-mono font-semibold text-white">$17,500</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Red State Fund bonus/month</span>
              <span className="font-mono font-semibold text-white">+$5,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Data & tooling per state/year</span>
              <span className="font-mono font-semibold text-white">Six figures</span>
            </div>
            <div className="flex justify-between py-2">
              <span>DNC to state transfers (2024)</span>
              <span className="font-mono font-semibold text-white">$165M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">2026 Midterm Spending Projections</h3>
        <DataTable
          headers={["Category", "Projected"]}
          rows={[
            ["Total Political + Advocacy Advertising", "$11.6B"],
            ["Congressional Campaigns Advertising", "$5.0B"],
            ["Connected TV Advertising", "$2.48B"],
            ["State Legislative Advertising", "$700M"],
            ["Digital Advertising (~36% of total)", "$4.2B"],
            ["House + Senate Candidates Raised (thru Dec '25)", "$1.5B"],
          ]}
        />
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 p-4 text-sm text-purple-200">
        <span className="font-semibold">Source:</span> FEC filings, OpenSecrets, Ballotpedia, AdImpact projections. Data as of June 2026.
      </div>
    </div>
  );
}

function NationalTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$189M" label="DNC Raised" sub="2024 Cycle" />
        <StatCard value="$171M" label="DCCC Raised" sub="2024 Cycle" />
        <StatCard value="$87.7M" label="State/Local Dem" sub="Federal, 2025-26" />
        <StatCard value="$258.8M" label="Individual Contributions" sub="To Dem Committees, 2025-26" />
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">Top DNC Vendor Payments (2024)</h3>
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

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">vs. Republican Committees (Comparison)</h3>
        <DataTable
          headers={["Metric", "Democratic", "Republican"]}
          rows={[
            ["All committees raised (2024)", "$2.05B", "$476M"],
            ["National committee raised", "$189M", "$247M"],
            ["Cash on hand (mid-2025)", "$15.2M", "$80.7M"],
            ["Individual contributions (2025-26)", "$258.8M", "$220.3M"],
            ["PAC contributions (2025-26)", "$35.1M", "$27.5M"],
          ]}
        />
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">ActBlue Fundraising Platform</h3>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>Total processed to date</span>
            <span className="font-mono font-semibold text-white">$8B+</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>2020 cycle processed</span>
            <span className="font-mono font-semibold text-white">$4.3B</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>Standard processing fee</span>
            <span className="font-mono font-semibold text-white">3.95%</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Raise by ActBlue (small campaigns)</span>
            <span className="font-mono font-semibold text-white">3.50%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StateTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$165M" label="DNC to State Transfers" sub="2024" />
        <StatCard value="$87.7M" label="State/Local Dem" sub="Federal Funds, 2025-26" />
        <StatCard value="$700M" label="State Legislative Ads" sub="2026 Projected" />
        <StatCard value="36" label="Gubernatorial Races" sub="2026" />
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">Priority Democratic State Parties -- 2026 Gubernatorial</h3>
        <DataTable
          headers={["State", "Significance", "Party Contact"]}
          rows={[
            ["Georgia", "Open seat, top-tier swing", "info@georgiademocrat.org"],
            ["Arizona", "Competitive swing state", "info@azdem.org"],
            ["Michigan", "Competitive swing state", "midemparty@michigandems.com"],
            ["Nevada", "Competitive swing state", "admin@nvdems.com"],
            ["Pennsylvania", "Open seat, key battleground", "info@padems.com"],
            ["Florida", "$50M+ projected investment", "info@floridadems.org"],
            ["Texas", "$50M+ projected investment", "info@txdemocrats.org"],
            ["Virginia", "Competitive gubernatorial", "info@vademocrats.org"],
            ["Illinois", "$50M+ projected investment", "contact@ildems.com"],
            ["North Carolina", "Competitive swing state", "team@ncdp.org"],
          ]}
        />
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">State Spending Projections (2026)</h3>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>States with $50M+ investment</span>
            <span className="font-mono font-semibold text-white">7 states</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>Swing gov races share of all gov spend</span>
            <span className="font-mono font-semibold text-white">~1/3</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>State legislative total</span>
            <span className="font-mono font-semibold text-white">$700M (19% up)</span>
          </div>
          <div className="flex justify-between py-2">
            <span>All state parties directory</span>
            <span className="font-mono text-purple-400 text-xs">democrats.org/state-parties</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorTab() {
  return (
    <div className="space-y-6">
      <div className="bg-[#130e1d] border border-purple-500/20 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-4">DNC "I Will Run" Marketplace -- Vendor Application</h3>
        <div className="space-y-3 text-sm text-white/80">
          <p>The DNC operates an official approved vendor marketplace. Approved vendors are recommended to every Democratic candidate nationally.</p>
          <div className="mt-3 p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-purple-300/50 mb-2">Contact</div>
            <div className="font-mono text-purple-400">tech-ecosystem@dnc.org</div>
            <div className="mt-3 text-xs uppercase tracking-wider text-purple-300/50 mb-2">Categories for SwingVote</div>
            <div>Voter Contact, Digital, Finance</div>
            <div className="mt-3 text-xs uppercase tracking-wider text-purple-300/50 mb-2">Required Pricing</div>
            <div>Free tier or DNC-negotiated rate (up to 25% discount)</div>
          </div>
        </div>
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">Application Steps</h3>
        <div className="space-y-4 text-sm text-white/70">
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-purple-300/40 mb-1">Step 1 -- Initial Contact</div>
            <div>Email tech-ecosystem@dnc.org with company info, product description, live demo URL, vendor category, pricing structure</div>
          </div>
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-purple-300/40 mb-1">Step 2 -- Product Review</div>
            <div>DNC tech team reviews security (2FA, encryption), uptime (99% min), data privacy, election season support</div>
          </div>
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-purple-300/40 mb-1">Step 3 -- Contract</div>
            <div>Negotiate standard rate + DNC-discounted rate. Free tier for down-ballot. Data sharing requirements.</div>
          </div>
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-purple-300/40 mb-1">Step 4 -- Onboarding</div>
            <div>Listed on I Will Run marketplace, included in DNC training sessions, state party introductions</div>
          </div>
        </div>
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">ActBlue Integration Strategy</h3>
        <div className="text-sm text-white/70 space-y-2">
          <p>Do not compete with ActBlue. Embed ActBlue donation forms into SwingVote. Campaigns keep their ActBlue account; SwingVote adds the engagement layer.</p>
          <DataTable
            headers={["Platform", "Fee", "Volume"]}
            rows={[
              ["ActBlue (standard)", "3.95%", "$8B+ total"],
              ["ActBlue (Raise for small campaigns)", "3.50%", "--"],
            ]}
          />
        </div>
      </div>

      <div className="bg-[#130e1d] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300/50 mb-4">Revenue Model -- SaaS Vendor</h3>
        <DataTable
          headers={["Revenue Stream", "Per Unit", "Target", "Annual"]}
          rows={[
            ["Candidate SaaS (standard)", "$99/mo", "50 candidates", "$59,400"],
            ["Candidate SaaS (premium)", "$499/mo", "15 candidates", "$89,820"],
            ["State party contracts", "$2,500/mo", "5 states", "$150,000"],
            ["National committee contract", "$10,000/mo", "1 committee", "$120,000"],
            ["Total Year 1 Target", "", "", "$419-539K"],
          ]}
        />
        <div className="mt-3 text-xs text-white/40">
          SaaS vendor model: No FEC registration required. Sell platform access at fair market value (FEC AO 2021-07). Donations flow through ActBlue.
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
        <h1 className="text-2xl font-bold text-white">Party Funding Intelligence</h1>
        <p className="text-sm text-white/40 mt-1">
          Democratic national and state-level funding data for the 2024-2026 election cycle
        </p>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-purple-400 text-purple-400"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "national" && <NationalTab />}
      {activeTab === "state" && <StateTab />}
      {activeTab === "vendor" && <VendorTab />}
    </div>
  );
}
