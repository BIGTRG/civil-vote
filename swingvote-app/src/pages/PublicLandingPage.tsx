import { useNavigate } from "react-router-dom";

const STATS = [
  { label: "Races Tracked", value: "36" },
  { label: "Candidates", value: "69" },
  { label: "Independent Voices", value: "30%" },
  { label: "States Covered", value: "36" },
];

const FEATURES = [
  { title: "Side-by-Side Compare", desc: "See exactly where every candidate stands -- issue by issue, no spin, no filter.", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  { title: "Promise Ledger", desc: "Blockchain-verified record of every campaign promise. Hold them accountable.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Public Pulse", desc: "Real-time sentiment data across all parties. See where the momentum really is.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "Win My Vote", desc: "Tell candidates what matters to you. Force them to respond on the issues you care about.", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { title: "Party Funding Intel", desc: "Follow the money across both parties. Transparency is non-negotiable.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Merch Store", desc: "Independent gear for independent thinkers. Every purchase is a statement.", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
];

export function PublicLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0612]">
      {/* Header */}
      <header className="border-b border-purple-900/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-bold">SV</div>
            <span className="text-xl font-bold text-white">Swing<span className="text-amber-400">Vote</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="px-4 py-2 text-white/60 hover:text-white text-sm transition-colors">Log In</button>
            <button onClick={() => navigate("/signup")} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-sm font-semibold rounded-xl hover:from-purple-700 hover:to-amber-600 transition-all">Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-400/20 rounded-full text-amber-400 text-sm font-medium mb-6">
          30% of voters are independent -- you decide elections
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          You Decide<br /><span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">Elections.</span>
        </h1>
        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          The bipartisan voter intelligence platform. Compare every candidate, track every promise, follow every dollar -- across party lines.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate("/compare")} className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-xl text-lg hover:from-purple-700 hover:to-amber-600 transition-all shadow-lg shadow-purple-500/20">
            Compare Candidates
          </button>
          <button onClick={() => navigate("/races")} className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-lg hover:bg-white/10 transition-all">
            Browse Races
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-purple-900/20 bg-purple-900/5">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">No party. No filter. Just facts.</h2>
          <p className="text-white/40 max-w-lg mx-auto">SwingVote gives independent voters the tools to cut through the noise and make informed decisions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-[#130e1d] border border-purple-500/10 rounded-2xl p-6 hover:border-purple-400/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-amber-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-purple-900/30 to-amber-900/20 border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Neither left nor right -- forward.</h2>
          <p className="text-white/50 max-w-lg mx-auto mb-8">
            Join the growing movement of voters who refuse to be told what to think. Compare candidates on issues, not party lines.
          </p>
          <button onClick={() => navigate("/signup")} className="px-10 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold rounded-xl text-lg hover:from-purple-700 hover:to-amber-600 transition-all shadow-lg shadow-purple-500/20">
            Join SwingVote
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-xs font-bold">SV</div>
            <span className="text-white/40 text-sm">SwingVote -- A CivilVote Platform</span>
          </div>
          <div className="text-white/20 text-xs">You decide elections.</div>
        </div>
      </footer>
    </div>
  );
}
