export function CandidatePortalPage() {
  const tiers = [
    {
      name: "Local",
      price: "$5,000",
      period: "/mo",
      description: "Municipal & county races",
      features: [
        "Branded campaign app",
        "Voter engagement dashboard",
        "Promise Ledger tracking",
        "Donation processing (4.5% fee)",
        "Basic analytics",
        "Merch store",
        "Up to 50K voter reach",
      ],
    },
    {
      name: "Statewide",
      price: "$50,000",
      period: "/mo",
      description: "House, AG, SoS, State Legislature",
      popular: true,
      features: [
        "Everything in Local, plus:",
        "Full voter intelligence suite",
        "Advanced analytics & reporting",
        "Win My Vote integration",
        "Endorsement management",
        "Event calendar & RSVP",
        "Up to 500K voter reach",
        "Dedicated support",
      ],
    },
    {
      name: "Governor / Senate",
      price: "$125,000",
      period: "/mo",
      description: "Top-tier statewide & federal races",
      features: [
        "Everything in Statewide, plus:",
        "Full white-label campaign app",
        "Real-time election intelligence",
        "Cross-platform data insights",
        "Unlimited voter reach",
        "Priority feature development",
        "Strategy consultation",
        "Dedicated account team",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Candidate Portal</h1>
        <p className="text-blue-300/60 mt-1">Get your campaign on CivilVote's platform</p>
      </div>

      {/* Hero */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-800/10 border border-blue-500/20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">The Most Advanced Campaign Technology Platform</h2>
        <p className="text-blue-200/60 mt-3 max-w-2xl mx-auto">
          CivilVote gives your campaign a fully branded voter engagement app, real-time analytics, promise tracking, and donation processing -- all under one roof. No other platform offers what we do.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-blue-300/50">
          <span>36+ Active Races</span>
          <span>Multi-State Coverage</span>
          <span>Real-Time Data</span>
          <span>FEC Compliant</span>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map(tier => (
          <div key={tier.name} className={`p-6 rounded-2xl border ${tier.popular ? "bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20" : "bg-white/5 border-white/10"}`}>
            {tier.popular && (
              <span className="px-3 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</span>
            )}
            <h3 className="text-xl font-bold text-white mt-3">{tier.name}</h3>
            <p className="text-white/40 text-sm">{tier.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-white">{tier.price}</span>
              <span className="text-white/40">{tier.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full mt-6 py-3 rounded-xl font-semibold transition-colors ${tier.popular ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white/10 text-white hover:bg-white/15"}`}>
              Contact Sales
            </button>
          </div>
        ))}
      </div>

      {/* What You Get */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6 text-center">What Sets CivilVote Apart</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "White-Label Apps", desc: "Your campaign gets its own branded app with your colors, your logo, and your messaging. Not a template -- a full custom application.", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
            { title: "Promise Ledger", desc: "Every campaign promise is cryptographically hashed and publicly tracked. Show voters you mean what you say with verifiable accountability.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { title: "Cross-Party Intelligence", desc: "Understand voter sentiment across the entire political spectrum. No other platform captures data from Democrats, Republicans, and Independents simultaneously.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
          ].map(item => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-white mt-3">{item.title}</h3>
              <p className="text-sm text-white/40 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-blue-500/10 border border-blue-500/20 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to Win Your Race?</h2>
        <p className="text-blue-200/50 mt-2">Contact our team to get your campaign on CivilVote.</p>
        <div className="mt-4 text-blue-400 font-medium">sales@civilvotetechnologies.com</div>
      </div>
    </div>
  );
}
