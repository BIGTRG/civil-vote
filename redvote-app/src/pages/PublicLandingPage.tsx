import { useNavigate } from "react-router-dom";

export function PublicLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a0a] via-[#2d1111] to-[#1a0a0a]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-red-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-sm">RV</div>
          <span className="text-xl font-bold text-white">Red<span className="text-red-500">Vote</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-red-300/70 hover:text-white transition-colors text-sm">Sign In</button>
          <button onClick={() => navigate("/signup")} className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">Join RedVote</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-red-400 text-sm font-medium">Accountability in Action</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your Voice.<br />Your Vote.<br /><span className="text-red-500">Your Power.</span>
        </h1>
        <p className="text-red-200/60 text-lg max-w-2xl mx-auto mb-10">
          RedVote puts the power back where it belongs -- with the people. Track races, hold candidates accountable, and make your pledge count. Real transparency for real Americans.
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <button onClick={() => navigate("/races")} className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">Browse Races</button>
          <button onClick={() => navigate("/pulse")} className="border border-red-500/30 text-red-300 hover:bg-red-500/10 px-8 py-3 rounded-lg font-medium text-lg transition-colors">See the Pulse</button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "4,243", label: "Patriots Pledged" },
            { value: "$73,940", label: "Total Pledged" },
            { value: "36", label: "States Covered" },
            { value: "36", label: "Active Races" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-red-500/10 rounded-xl px-4 py-4">
              <div className="text-2xl font-bold text-red-400">{s.value}</div>
              <div className="text-red-200/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How RedVote Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Browse Races", desc: "Find the races that matter in your state. See every candidate, their positions, and their track record." },
            { step: "02", title: "Make Your Pledge", desc: "Put your money where your vote is. Pledge support to the candidates who earn it -- starting at just $5." },
            { step: "03", title: "Hold Them Accountable", desc: "Track every promise with our blockchain-verified Promise Ledger. No more empty campaign talk." },
          ].map((item) => (
            <div key={item.step} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
              <div className="text-red-500 font-bold text-sm mb-3">{item.step}</div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-red-200/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Platform Features</h2>
        <p className="text-red-200/50 text-center mb-12 max-w-2xl mx-auto">Built for transparency. Designed for the people.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Public Pulse", desc: "Real-time voter sentiment based on verified pledges -- not media polls. See where real Americans stand." },
            { title: "Promise Ledger", desc: "The Carfax for politicians. Every campaign promise recorded, tracked, and hash-verified on the blockchain." },
            { title: "Win My Vote", desc: "Tell candidates what matters to you. Two-way accountability that makes politicians listen to constituents." },
            { title: "Pledge System", desc: "Put your money behind your values. $5 minimum pledges that show candidates real grassroots support." },
          ].map((f) => (
            <div key={f.title} className="bg-white/5 border border-red-500/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-red-200/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Make Your Voice Heard?</h2>
        <p className="text-red-200/50 mb-8">Join thousands of Americans already using RedVote to hold their elected officials accountable.</p>
        <button onClick={() => navigate("/signup")} className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-lg font-medium text-lg transition-colors">
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-900/30 px-8 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xs">RV</div>
            <span className="text-white font-bold">Red<span className="text-red-500">Vote</span></span>
          </div>
          <div className="text-red-200/30 text-sm">Part of the CivicVote Platform</div>
        </div>
      </footer>
    </div>
  );
}
