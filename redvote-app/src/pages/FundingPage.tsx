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
    <div className="bg-[#1a0a0a] border border-white/10 p-5">
      <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-red-300/50 mt-1">{label}</div>
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
              <th key={i} className={`py-2.5 px-3 text-xs font-medium uppercase tracking-wider text-red-300/50 ${i > 0 ? "text-right" : "text-left"}`}>{h}</th>
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
        <StatCard value="$476M" label="All GOP Committees" sub="2024 Cycle" />
        <StatCard value="$247M" label="RNC Raised" sub="2024 Cycle" />
        <StatCard value="$172M" label="RNC Raised in 2025" sub="Calendar Year" />
        <StatCard value="$95.1M" label="RNC Cash on Hand" sub="Start of 2026" />
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Republican Committee Breakdown -- 2024 Cycle</h3>
        <DataTable
          headers={["Committee", "Raised", "Spent", "Cash on Hand"]}
          rows={[
            ["RNC (National Committee)", "$247M", "$452M", "$80.7M"],
            ["NRCC (Congressional)", "$200M+", "$200M+", "--"],
            ["NRSC (Senatorial)", "Significant", "--", "--"],
            ["All Republican Combined", "$476M", "$452M", "$38.1M"],
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1a0a0a] border border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">RNC Financial Position</h3>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>2025 total raised</span>
              <span className="font-mono font-semibold text-white">$172M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>H1 2025 receipts</span>
              <span className="font-mono font-semibold text-white">$96M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>December 2025 haul</span>
              <span className="font-mono font-semibold text-white">$16M</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Cash on hand (start 2026)</span>
              <span className="font-mono font-semibold text-white">$95.1M</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Cash advantage over DNC (mid-2025)</span>
              <span className="font-mono font-semibold text-white">$65.6M</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1a0a0a] border border-white/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">RNC Data Operations</h3>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Data operations investment (est.)</span>
              <span className="font-mono font-semibold text-white">$100M+</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Data Trust voter file</span>
              <span className="font-mono font-semibold text-white">200M+ records</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span>Data vendor spend (2014 example)</span>
              <span className="font-mono font-semibold text-white">$11.5M</span>
            </div>
            <div className="flex justify-between py-2">
              <span>WinRed processed (2020 cycle)</span>
              <span className="font-mono font-semibold text-white">$2.2B+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">2026 Midterm Spending Projections</h3>
        <DataTable
          headers={["Category", "Projected"]}
          rows={[
            ["Total Political + Advocacy Advertising", "$11.6B"],
            ["Congressional Campaigns Advertising", "$5.0B"],
            ["Connected TV Advertising", "$2.48B"],
            ["State Legislative Advertising", "$700M"],
            ["House + Senate Candidates Raised (thru Dec '25)", "$1.5B"],
          ]}
        />
      </div>

      <div className="bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200">
        <span className="font-semibold">Source:</span> FEC filings, OpenSecrets, Ballotpedia, AdImpact projections. Data as of June 2026.
      </div>
    </div>
  );
}

function NationalTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$247M" label="RNC Raised" sub="2024 Cycle" />
        <StatCard value="$200M+" label="NRCC Raised" sub="2024 Cycle" />
        <StatCard value="$220.3M" label="Individual Contributions" sub="To GOP Committees, 2025-26" />
        <StatCard value="$27.5M" label="PAC Contributions" sub="To GOP, 2025-26" />
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Top NRCC Vendor Payments (2024)</h3>
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

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">NRSC Transfers to State Parties (2024)</h3>
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

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">vs. Democratic Committees (Comparison)</h3>
        <DataTable
          headers={["Metric", "Republican", "Democratic"]}
          rows={[
            ["National committee raised (2024)", "$247M", "$189M"],
            ["All committees raised (2024)", "$476M", "$2.05B"],
            ["Cash on hand (mid-2025)", "$80.7M", "$15.2M"],
            ["Cash advantage", "+$65.6M", "--"],
            ["Individual contributions (2025-26)", "$220.3M", "$258.8M"],
          ]}
        />
      </div>
    </div>
  );
}

function StateTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="$1.54M" label="Top State Transfer" sub="Montana GOP from NRSC" />
        <StatCard value="$700M" label="State Legislative Ads" sub="2026 Projected" />
        <StatCard value="36" label="Gubernatorial Races" sub="2026" />
        <StatCard value="$100M+" label="RNC Data Ops" sub="Estimated Investment" />
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Priority Republican State Parties -- 2026 Gubernatorial</h3>
        <DataTable
          headers={["State", "Significance", "Party Contact"]}
          rows={[
            ["Georgia", "Open seat, top-tier swing", "info@gagop.org"],
            ["Arizona", "Competitive swing state", "info@azgop.org"],
            ["Michigan", "Competitive swing state", "info@migop.org"],
            ["Nevada", "Competitive swing state", "info@nevadagop.org"],
            ["Pennsylvania", "Open seat, key battleground", "info@pagop.org"],
            ["Florida", "$50M+ projected investment", "rpofdigital@rpof.org"],
            ["Texas", "$50M+ projected investment", "info@texasgop.org"],
            ["Virginia", "Competitive gubernatorial", "info@virginia.gop"],
            ["Illinois", "$50M+ projected investment", "info@ilgop.org"],
            ["North Carolina", "Competitive swing state", "info@ncgop.org"],
          ]}
        />
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">State Spending Projections (2026)</h3>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>States with $50M+ investment</span>
            <span className="font-mono font-semibold text-white">7 states</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>FL, IL, NC, PA, TX, VA</span>
            <span className="font-mono font-semibold text-white">$50M+ each</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span>Swing gov races share</span>
            <span className="font-mono font-semibold text-white">~1/3 of all gov spend</span>
          </div>
          <div className="flex justify-between py-2">
            <span>State legislative total</span>
            <span className="font-mono font-semibold text-white">$700M (19% up)</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Vottiv State Adoption Model</h3>
        <div className="text-sm text-white/70 space-y-2">
          <p>Vottiv was approved as an RNC vendor in 2023. Now deployed across state parties:</p>
          <div className="mt-3 p-3 bg-white/5 text-xs">
            <div>-- CAGOP (California) requires Vottiv for endorsed candidates</div>
            <div className="mt-1">-- State party chairs approve vendor access for local organizations</div>
            <div className="mt-1">-- County chairs gate access to platform data</div>
            <div className="mt-1">-- Model: get RNC approval first, then state adoption follows</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorTab() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a0a0a] border border-red-500/20 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-4">RNC Vendor Approval -- Direct Application</h3>
        <div className="space-y-3 text-sm text-white/80">
          <p>The RNC does not have a public vendor marketplace. Vendors are approved through direct review. Study Vottiv's approach: approved in 2023, now deployed across state parties.</p>
          <div className="mt-3 p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-red-300/50 mb-2">Contact</div>
            <div className="font-mono text-red-400">RNC: (202) 863-8500</div>
            <div className="font-mono text-white/50 text-xs mt-1">310 First Street SE, Washington, DC 20003</div>
            <div className="mt-3 text-xs uppercase tracking-wider text-red-300/50 mb-2">Key Integration</div>
            <div>Data Trust voter file access (200M+ records)</div>
            <div className="mt-3 text-xs uppercase tracking-wider text-red-300/50 mb-2">Study</div>
            <div className="font-mono text-xs">Vottiv -- support@vottiv.com</div>
            <div className="font-mono text-xs">CAGOP Data -- data@cagop.org</div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Application Steps</h3>
        <div className="space-y-4 text-sm text-white/70">
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-red-300/40 mb-1">Step 1 -- Contact RNC Technology Team</div>
            <div>Direct outreach to RNC CTO / data operations. Pitch RedVote as voter engagement + pledge platform for Republican candidates.</div>
          </div>
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-red-300/40 mb-1">Step 2 -- Data Trust Integration</div>
            <div>Contact Data Trust for voter data integration. This is the key differentiator for approved RNC vendors.</div>
          </div>
          <div className="p-3 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-red-300/40 mb-1">Step 3 -- State Party Partnerships</div>
            <div>Target state GOP parties independently. They can adopt vendors without national approval. Start with swing states running gubernatorial races in 2026.</div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">WinRed Integration Strategy</h3>
        <div className="text-sm text-white/70 space-y-2">
          <p>Do not compete with WinRed. Embed WinRed donation links into RedVote. Campaigns keep their WinRed account; RedVote adds the engagement layer.</p>
          <DataTable
            headers={["Tier", "Fee", "Notes"]}
            rows={[
              ["Grassroots", "3.94%", "Standard donation pages"],
              ["High-dollar pages", "3.20%", "Major donor fundraising"],
              ["ACH payments", "0.80%", "Capped at $5 per transaction"],
              ["Total WinRed volume (2020)", "$2.2B+", "--"],
            ]}
          />
        </div>
      </div>

      <div className="bg-[#1a0a0a] border border-white/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300/50 mb-4">Revenue Model -- SaaS Vendor</h3>
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
          SaaS vendor model: No FEC registration required. Sell platform access at fair market value (FEC AO 2021-07). Donations flow through WinRed.
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
          Republican national and state-level funding data for the 2024-2026 election cycle
        </p>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-red-400 text-red-400"
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
