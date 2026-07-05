import { Link } from "react-router-dom";

export function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* =========== HERO =========== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C3C73]/40 via-[#0a0f1a] to-[#BF0F06]/15" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1C3C73]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#BF0F06]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#BF0F06]/15 border border-[#BF0F06]/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#BF0F06] rounded-full animate-pulse" />
                <span className="text-[#BF0F06] text-sm font-medium tracking-wide">
                  Endorsed by President Joe Biden
                </span>
              </div>

              <img
                src="/keisha-logo.png"
                alt="Keisha Lance Bottoms for Governor"
                className="w-full max-w-lg mb-8"
              />

              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                Former Mayor of Atlanta. Biden White House Senior Adviser.
                Fighting for Medicaid expansion, voting rights, public
                education, and every Georgia family.
              </p>

              {/* PRIMARY CTA: Support Keisha */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/support"
                  className="px-10 py-5 bg-[#BF0F06] hover:bg-[#a00d05] text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#BF0F06]/30 text-xl text-center"
                >
                  Support Keisha
                </Link>
                <Link
                  to="/support?tab=volunteer"
                  className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/15 transition-all hover:border-white/30 text-lg text-center"
                >
                  Volunteer
                </Link>
              </div>

              <p className="text-white/25 text-xs mt-4">
                93% of donations are under $100. Every dollar counts.
              </p>
            </div>

            {/* Right - Hero Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent z-10 rounded-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-br from-[#1C3C73]/40 to-[#BF0F06]/20 rounded-2xl blur-sm" />
                <img
                  src="/keisha-hero.jpg"
                  alt="Keisha Lance Bottoms"
                  className="relative z-[5] w-80 md:w-96 rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========== IMPACT STRIP =========== */}
      <div className="bg-[#BF0F06]/10 border-y border-[#BF0F06]/15">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">
          <span className="text-white/70 text-sm font-medium">
            Your support makes an impact:
          </span>
          <span className="text-white/50 text-sm">
            <strong className="text-[#BF0F06]">$5</strong> sends 50 voter texts
          </span>
          <span className="text-white/50 text-sm">
            <strong className="text-[#BF0F06]">$25</strong> prints 500 door
            flyers
          </span>
          <span className="text-white/50 text-sm">
            <strong className="text-[#BF0F06]">$100</strong> runs 1 day of
            digital ads
          </span>
        </div>
      </div>

      {/* =========== STATS ROW =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Raised",
              value: "$2.4M",
              sub: "93% small-dollar",
              accent: "text-green-400",
            },
            {
              label: "Supporters",
              value: "4,847",
              sub: "from all 159 counties",
              accent: "text-blue-400",
            },
            {
              label: "Volunteers",
              value: "1,200+",
              sub: "across Georgia",
              accent: "text-amber-400",
            },
            {
              label: "Events Planned",
              value: "32",
              sub: "rallies, town halls, more",
              accent: "text-purple-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center hover:bg-white/[0.05] transition-colors"
            >
              <div className={`text-3xl md:text-4xl font-bold ${s.accent}`}>
                {s.value}
              </div>
              <div className="text-sm text-white/40 mt-2 font-medium">
                {s.label}
              </div>
              <div className="text-xs text-white/25 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* =========== WHY KEISHA =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-2">Why Keisha</h2>
        <p className="text-white/40 mb-8 max-w-xl">
          A track record of leadership when it matters most.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Mayor of Atlanta",
              desc: "Led Atlanta through COVID-19 and civil unrest. Cut crime, expanded affordable housing, invested in infrastructure.",
              stat: "4 years",
            },
            {
              title: "Biden White House",
              desc: "Senior Adviser to President Biden. Shaped national policy on infrastructure, equity, and community investment.",
              stat: "3 years",
            },
            {
              title: "Grassroots Leader",
              desc: "93% of campaign donations under $100. Built a people-powered movement from the ground up across all 159 Georgia counties.",
              stat: "159 counties",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <div className="text-[#BF0F06] text-xs font-bold tracking-widest uppercase mb-3">
                {item.stat}
              </div>
              <h3 className="text-white text-lg font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========== PLATFORM POSITIONS =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          What Keisha Will Fight For
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              issue: "Medicaid Expansion",
              detail:
                "Expand Medicaid to cover 500,000+ uninsured Georgians. Day one priority.",
              color: "border-l-green-500",
            },
            {
              issue: "Voting Rights",
              detail:
                "Restore the John Lewis Voting Rights Act at the state level. Automatic voter registration.",
              color: "border-l-blue-500",
            },
            {
              issue: "Public Education",
              detail:
                "Raise teacher pay to the national average. Fully fund pre-K. Expand trade programs.",
              color: "border-l-amber-500",
            },
            {
              issue: "Economic Growth",
              detail:
                "Small business tax credits, broadband expansion, workforce training for every county.",
              color: "border-l-purple-500",
            },
            {
              issue: "Criminal Justice Reform",
              detail:
                "End cash bail for non-violent offenses. Invest in diversion and re-entry programs.",
              color: "border-l-red-500",
            },
            {
              issue: "Gun Safety",
              detail:
                "Universal background checks, red flag laws, and community violence intervention programs.",
              color: "border-l-cyan-500",
            },
          ].map((p) => (
            <div
              key={p.issue}
              className={`p-5 bg-white/[0.03] border border-white/[0.06] ${p.color} border-l-2 rounded-r-xl hover:bg-white/[0.05] transition-colors`}
            >
              <h3 className="text-white font-bold text-sm mb-1">{p.issue}</h3>
              <p className="text-white/40 text-sm">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =========== PATH TO VICTORY =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1C3C73]/15 to-[#BF0F06]/10 border border-white/[0.06]">
          <h2 className="text-2xl font-bold text-white mb-2">
            The Path to Victory
          </h2>
          <p className="text-white/40 mb-8">
            Georgia hasn't elected a Democratic governor since 2002. Here's how
            we flip it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "2.1M+",
                label: "Votes Needed",
                desc: "Surpass the 2018 high-water mark with record turnout",
              },
              {
                num: "55%+",
                label: "Independent Vote",
                desc: "Win the 2.27M independent voters who decide Georgia",
              },
              {
                num: "57%+",
                label: "Turnout Target",
                desc: "Match or exceed 2018's historic turnout across all demographics",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="text-center p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl"
              >
                <div className="text-3xl font-bold text-[#BF0F06]">
                  {m.num}
                </div>
                <div className="text-white/80 font-semibold text-sm mt-2">
                  {m.label}
                </div>
                <div className="text-white/30 text-xs mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========== KEY ENDORSEMENTS =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Key Endorsements
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            "President Joe Biden",
            "Georgia AFL-CIO",
            "Planned Parenthood Action Fund",
            "Georgia NAACP",
            "Sierra Club Georgia",
            "EMILY's List",
            "Human Rights Campaign",
            "Georgia Association of Educators",
          ].map((name) => (
            <div
              key={name}
              className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center hover:bg-white/[0.06] transition-colors"
            >
              <span className="text-white/70 text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =========== CAMPAIGN HIGHLIGHTS =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Campaign Highlights
        </h2>
        <div className="space-y-3">
          {[
            {
              type: "milestone",
              msg: "Keisha Lance Bottoms wins Democratic primary with 62% of the vote",
              loc: "Statewide",
              date: "May 19, 2026",
            },
            {
              type: "endorsement",
              msg: "President Joe Biden officially endorses Keisha for Governor",
              loc: "Washington, D.C.",
              date: "April 2026",
            },
            {
              type: "fundraising",
              msg: "Campaign crosses $2M raised -- 93% from small-dollar donors under $100",
              loc: "Georgia",
              date: "May 2026",
            },
            {
              type: "event",
              msg: "Atlanta rally draws 5,000+ supporters to Georgia World Congress Center",
              loc: "Fulton County",
              date: "May 2026",
            },
            {
              type: "endorsement",
              msg: "Georgia AFL-CIO endorses Keisha Lance Bottoms for Governor",
              loc: "Statewide",
              date: "April 2026",
            },
          ].map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  a.type === "milestone"
                    ? "bg-amber-400"
                    : a.type === "endorsement"
                      ? "bg-green-400"
                      : a.type === "event"
                        ? "bg-blue-400"
                        : "bg-purple-400"
                }`}
              />
              <div className="flex-1">
                <p className="text-white/80 text-sm font-medium">{a.msg}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-white/25 text-xs">{a.loc}</span>
                  <span className="text-white/25 text-xs">{a.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========== GA RACE HISTORY =========== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 className="text-2xl font-bold text-white mb-6">
            Georgia Governor Race History
          </h2>
          <p className="text-white/40 mb-6">
            Republicans have held the Georgia governor's mansion for 24 straight
            years. The margins are shrinking.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                year: "2022",
                margin: "R+7.5%",
                dem: "Stacey Abrams",
                rep: "Brian Kemp",
                note: "1.91M D vs 2.11M R",
              },
              {
                year: "2018",
                margin: "R+1.4%",
                dem: "Stacey Abrams",
                rep: "Brian Kemp",
                note: "1.92M D vs 1.98M R",
              },
              {
                year: "2014",
                margin: "R+7.9%",
                dem: "Jason Carter",
                rep: "Nathan Deal",
                note: "Low turnout year",
              },
              {
                year: "2010",
                margin: "R+10.1%",
                dem: "Roy Barnes",
                rep: "Nathan Deal",
                note: "Tea Party wave",
              },
            ].map((r) => (
              <div
                key={r.year}
                className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl"
              >
                <div className="text-2xl font-bold text-white">{r.year}</div>
                <div className="text-[#BF0F06] font-bold text-lg mt-1">
                  {r.margin}
                </div>
                <div className="text-white/40 text-xs mt-2">D: {r.dem}</div>
                <div className="text-white/40 text-xs">R: {r.rep}</div>
                <div className="text-white/25 text-xs mt-2 italic">
                  {r.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========== FINAL CTA =========== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C3C73]/30 to-[#BF0F06]/20" />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center relative">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Georgia Is Ready for Change
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Add your voice. Make history. Support Keisha today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/support"
              className="px-12 py-5 bg-[#BF0F06] hover:bg-[#a00d05] text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#BF0F06]/25 text-xl"
            >
              Support Keisha
            </Link>
            <Link
              to="/support?tab=volunteer"
              className="px-10 py-5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-all text-lg"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* =========== FOOTER =========== */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/keisha-logo.png"
              alt="KLB"
              className="h-8 opacity-60"
            />
            <span className="text-white/30 text-sm">
              Keisha for Governor 2026
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com/KeishaForGA"
              target="_blank"
              rel="noopener"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/keishabottoms"
              target="_blank"
              rel="noopener"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com/keishabottoms"
              target="_blank"
              rel="noopener"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              X
            </a>
            <a
              href="https://tiktok.com/@keishaforga"
              target="_blank"
              rel="noopener"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              TikTok
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#1C3C73]/40 flex items-center justify-center text-white font-bold text-[8px]">
              BV
            </div>
            <span className="text-white/20 text-xs">Powered by BlueVote</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
