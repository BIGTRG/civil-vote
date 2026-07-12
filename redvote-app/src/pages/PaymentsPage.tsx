import { useState } from "react";

const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2800];

const RECENT_DONATIONS = [
  { name: "Sarah M.", amount: 100, time: "2 min ago", recurring: true },
  { name: "James T.", amount: 250, time: "5 min ago", recurring: false },
  { name: "Anonymous", amount: 50, time: "12 min ago", recurring: true },
  { name: "Patricia L.", amount: 1000, time: "18 min ago", recurring: false },
  { name: "Robert K.", amount: 25, time: "24 min ago", recurring: true },
  { name: "Maria G.", amount: 500, time: "31 min ago", recurring: false },
];

export function PaymentsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ name: "", email: "", employer: "", occupation: "" });
  const [step, setStep] = useState(1);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDonate = () => {
    if (!finalAmount || finalAmount < 1) return;
    setStep(2);
  };

  const handleSubmitPayment = () => {
    setStep(3);
    // In production, this would call Stripe API
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Donate</h1>
          <p className="text-red-400 mt-1">Support the candidates and causes you believe in</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? "bg-red-500 text-white" : "bg-white/10 text-white/40"
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-red-500" : "bg-white/10"}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-white/50">
            {step === 1 ? "Choose Amount" : step === 2 ? "Your Information" : "Confirmation"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Select Donation Amount</h2>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {DONATION_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-3 rounded-lg font-semibold text-sm transition-all ${
                        selectedAmount === amt && !customAmount
                          ? "bg-red-500 text-white ring-2 ring-red-500"
                          : "bg-white/5 hover:bg-white/10 text-white/70"
                      }`}
                    >${amt.toLocaleString()}</button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="text-sm text-white/50 mb-1 block">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      placeholder="Enter amount"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Recurring toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-6">
                  <div>
                    <p className="font-medium">Make it monthly</p>
                    <p className="text-sm text-white/50">Recurring donations have 3x the impact</p>
                  </div>
                  <button
                    onClick={() => setIsRecurring(!isRecurring)}
                    className={`w-12 h-6 rounded-full transition-all ${isRecurring ? "bg-red-500" : "bg-white/20"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isRecurring ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>

                <button
                  onClick={handleDonate}
                  disabled={!finalAmount || finalAmount < 1}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    finalAmount && finalAmount >= 1
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  {finalAmount ? `Continue with $${finalAmount.toLocaleString()}${isRecurring ? "/mo" : ""}` : "Select an amount"}
                </button>

                <p className="text-xs text-white/30 text-center mt-3">
                  FEC requires us to collect donor information for contributions over $200.
                  All donations are subject to FEC contribution limits ($2,800 per candidate per election).
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Donor Information</h2>
                <p className="text-sm text-white/50 mb-4">Required by the Federal Election Commission</p>
                <div className="space-y-4">
                  {[
                    { key: "name", label: "Full Legal Name", placeholder: "John Smith", type: "text" },
                    { key: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                    { key: "employer", label: "Employer", placeholder: "Company name or Self-Employed", type: "text" },
                    { key: "occupation", label: "Occupation", placeholder: "Your occupation", type: "text" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-sm text-white/50 mb-1 block">{field.label}</label>
                      <input
                        type={field.type}
                        value={donorInfo[field.key as keyof typeof donorInfo]}
                        onChange={e => setDonorInfo({...donorInfo, [field.key]: e.target.value})}
                        placeholder={field.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  ))}

                  <div className="flex items-start gap-2 mt-4">
                    <input type="checkbox" className="mt-1" defaultChecked />
                    <p className="text-xs text-white/50">
                      I confirm that I am a U.S. citizen or lawful permanent resident and that this contribution
                      is made from my own funds, not from a corporation, labor organization, or foreign national.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium">
                    Back
                  </button>
                  <button
                    onClick={handleSubmitPayment}
                    className={"flex-1 py-3 rounded-lg font-bold bg-red-500 hover:bg-red-600 text-white"}
                  >
                    Pay ${finalAmount?.toLocaleString()}{isRecurring ? "/mo" : ""} with Stripe
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-red-400 text-lg mb-2">${finalAmount?.toLocaleString()}{isRecurring ? " monthly " : " "}donation</p>
                <p className="text-white/50 mb-6">A receipt has been sent to your email address.</p>
                <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-white/50 mb-1">Transaction ID</p>
                  <p className="font-mono text-sm">TXN-{Date.now().toString(36).toUpperCase()}</p>
                </div>
                <button
                  onClick={() => { setStep(1); setSelectedAmount(100); setCustomAmount(""); setDonorInfo({ name: "", email: "", employer: "", occupation: "" }); }}
                  className={"px-6 py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white"}
                >
                  Make Another Donation
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-4">Campaign Fundraising</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">This Quarter</span>
                    <span className="font-semibold">$2.4M</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={"h-full rounded-full bg-red-500"} style={{width: "68%"}} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className={"p-3 rounded-lg bg-red-500/10"}>
                    <p className="text-2xl font-bold">14.2K</p>
                    <p className="text-xs text-white/50">Total Donors</p>
                  </div>
                  <div className={"p-3 rounded-lg bg-red-500/10"}>
                    <p className="text-2xl font-bold">$168</p>
                    <p className="text-xs text-white/50">Avg Donation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent donations */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-4">Recent Donations</h3>
              <div className="space-y-3">
                {RECENT_DONATIONS.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={"w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-xs font-bold text-red-400"}>
                        {d.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{d.name}</p>
                        <p className="text-xs text-white/40">{d.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${d.amount}</p>
                      {d.recurring && <p className={"text-xs text-red-400"}>Monthly</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-semibold">Secure Payments</h3>
              </div>
              <p className="text-xs text-white/50">
                All transactions are processed securely through Stripe.
                Your payment information is encrypted and never stored on our servers.
                PCI DSS compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
