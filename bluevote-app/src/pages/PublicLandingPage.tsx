import { Link } from "react-router-dom";

export function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0f2140] to-[#162d50]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-medium tracking-wide">VERIFIED VOTER PLATFORM</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
            Blue<span className="text-blue-400">Vote</span>
          </h1>
          <p className="text-2xl md:text-3xl text-blue-200/80 font-light mb-8">
            Your voice. Your vote. Your power.
          </p>
          <p className="text-lg text-blue-300/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            The civic participation platform for verified voters. Browse real races, pledge support 
            to candidates who earn it, and hold every politician accountable with our Promise Ledger.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/signup"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 hover:-translate-y-0.5"
            >
              Register to Vote
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all text-lg border border-white/20"
            >
              Sign In
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "4,243", label: "Verified Voters" },
              { value: "$73,940", label: "Total Pledged" },
              { value: "48", label: "States Covered" },
              { value: "179", label: "Active Races" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-blue-300/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 bg-[#0d1f3c]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How BlueVote Works</h2>
            <p className="text-blue-300/60 text-lg max-w-xl mx-auto">
              Real democracy requires real accountability. Here's how we make it happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Verify Your Identity",
                description: "Confirm you're a real voter. One person, one vote, one pledge per race. No bots, no duplicates.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
                title: "Pledge Your Support",
                description: "Back the candidate who earns your vote with a minimum $5 pledge. Your money follows your values.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                title: "Hold Them Accountable",
                description: "The Promise Ledger tracks every campaign promise. Like a Carfax for politicians -- nothing gets forgotten.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-300/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform pillars */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Features</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Public Pulse",
                description: "Real-time verified voter sentiment. Not polls from random samples -- actual pledges from verified voters.",
                color: "from-blue-500/20 to-blue-600/10",
                borderColor: "border-blue-500/20",
              },
              {
                title: "Win My Vote",
                description: "Tell candidates what matters to you. Submit issues, upvote what's important, and see which candidates respond.",
                color: "from-cyan-500/20 to-cyan-600/10",
                borderColor: "border-cyan-500/20",
              },
              {
                title: "Promise Ledger",
                description: "Every campaign promise recorded, hashed, and tracked. Fulfilled, broken, or modified -- we keep the receipts.",
                color: "from-indigo-500/20 to-indigo-600/10",
                borderColor: "border-indigo-500/20",
              },
              {
                title: "Support Vote",
                description: "One verified pledge per race. $5 minimum donation. Your financial commitment signals real support, not just clicks.",
                color: "from-purple-500/20 to-purple-600/10",
                borderColor: "border-purple-500/20",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-8 rounded-2xl bg-gradient-to-br ${pillar.color} border ${pillar.borderColor} hover:scale-[1.02] transition-transform`}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
                <p className="text-blue-200/50 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#060e1a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Democracy needs you.
          </h2>
          <p className="text-blue-300/60 text-lg mb-10">
            Join thousands of verified voters already using BlueVote to make their voices heard.
            Available in Georgia, Arizona, and Pennsylvania.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-blue-300/40 text-sm">
            BlueVote by Civic Verified, Inc. -- FEC Compliant
          </div>
          <div className="flex gap-6 text-blue-300/40 text-sm">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
