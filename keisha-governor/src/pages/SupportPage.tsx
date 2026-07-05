import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, useSearchParams } from "react-router-dom";

const ACTBLUE_URL = "https://secure.actblue.com/donate/keisha-for-governor"; // placeholder until real URL

const DONATION_AMOUNTS = [5, 10, 25, 50, 100, 250];

const VOLUNTEER_INTERESTS = [
  { id: "canvass", label: "Door-to-Door Canvassing", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "phonebank", label: "Phone Banking", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { id: "textbank", label: "Text Banking", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { id: "events", label: "Event Organizing", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "social", label: "Social Media", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
  { id: "church", label: "Faith Community Outreach", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

export default function SupportPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "volunteer" ? "volunteer" : "donate";
  const [activeTab, setActiveTab] = useState<"donate" | "volunteer">(initialTab);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  // Volunteer form state
  const [volForm, setVolForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zipCode: "",
    interests: [] as string[],
  });
  const [volSubmitted, setVolSubmitted] = useState(false);
  const [volSubmitting, setVolSubmitting] = useState(false);

  const recordVolunteer = useMutation(api.actblue.recordVolunteer);

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount) || 25;
    const params = new URLSearchParams({
      amount: amount.toString(),
      recurring: isMonthly ? "monthly" : "",
    });
    // Redirect to ActBlue hosted contribution form
    window.open(`${ACTBLUE_URL}?${params.toString()}`, "_blank");
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolSubmitting(true);
    try {
      await recordVolunteer({
        firstName: volForm.firstName,
        lastName: volForm.lastName,
        email: volForm.email,
        phone: volForm.phone,
        city: volForm.city || undefined,
        zipCode: volForm.zipCode || undefined,
        interests: volForm.interests,
      });
      setVolSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setVolSubmitting(false);
    }
  };

  const toggleInterest = (id: string) => {
    setVolForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/keisha-logo.png" alt="KLB" className="h-10" />
          </Link>
          <Link
            to="/"
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Support Keisha for Governor
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every dollar donated and every hour volunteered brings Georgia closer to change. Choose how you want to help.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
            <button
              onClick={() => setActiveTab("donate")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "donate"
                  ? "bg-[#BF0F06] text-white shadow-lg"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Donate
            </button>
            <button
              onClick={() => setActiveTab("volunteer")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "volunteer"
                  ? "bg-[#1C3C73] text-white shadow-lg"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Volunteer
            </button>
          </div>
        </div>

        {/* ===================== DONATE TAB ===================== */}
        {activeTab === "donate" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              {/* Amount Selection */}
              <div className="mb-8">
                <label className="text-white/60 text-sm font-medium mb-3 block">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-4 rounded-xl text-lg font-bold transition-all ${
                        selectedAmount === amt
                          ? "bg-[#BF0F06] text-white shadow-lg shadow-[#BF0F06]/20 scale-105"
                          : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08] border border-white/[0.06]"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="text-white/60 text-sm font-medium mb-2 block">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="7600"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Other amount"
                    className="w-full py-4 pl-8 pr-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-lg placeholder:text-white/25 focus:outline-none focus:border-[#BF0F06]/50 focus:ring-1 focus:ring-[#BF0F06]/30"
                  />
                </div>
                <p className="text-white/25 text-xs mt-2">
                  Georgia contribution limit: $7,600 per election cycle
                </p>
              </div>

              {/* Monthly Toggle */}
              <div className="flex items-center justify-between mb-8 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div>
                  <div className="text-white/80 font-medium text-sm">
                    Make this monthly
                  </div>
                  <div className="text-white/30 text-xs mt-0.5">
                    Recurring donations sustain the campaign
                  </div>
                </div>
                <button
                  onClick={() => setIsMonthly(!isMonthly)}
                  className={`w-12 h-7 rounded-full transition-all relative ${
                    isMonthly ? "bg-[#BF0F06]" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                      isMonthly ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full py-5 bg-[#BF0F06] hover:bg-[#a00d05] text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#BF0F06]/25"
              >
                Donate ${selectedAmount || customAmount || 25}
                {isMonthly ? "/month" : ""} via ActBlue
              </button>

              <div className="mt-4 text-center">
                <p className="text-white/25 text-xs">
                  Processed securely through ActBlue. Your donation info
                  automatically creates your campaign account.
                </p>
              </div>

              {/* Impact Callout */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { amount: "$5", impact: "Sends 50 voter texts" },
                  { amount: "$25", impact: "Prints 500 door flyers" },
                  { amount: "$100", impact: "Runs 1 day of digital ads" },
                ].map((item) => (
                  <div
                    key={item.amount}
                    className="text-center p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg"
                  >
                    <div className="text-[#BF0F06] font-bold text-sm">
                      {item.amount}
                    </div>
                    <div className="text-white/30 text-[10px] mt-1 leading-tight">
                      {item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Switch to Volunteer */}
            <div className="text-center mt-6">
              <p className="text-white/30 text-sm">
                Can't donate right now?{" "}
                <button
                  onClick={() => setActiveTab("volunteer")}
                  className="text-[#1C3C73] hover:text-blue-400 font-medium underline underline-offset-2"
                >
                  Volunteer your time instead
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ===================== VOLUNTEER TAB ===================== */}
        {activeTab === "volunteer" && (
          <div className="max-w-xl mx-auto">
            {volSubmitted ? (
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to the Team
                </h2>
                <p className="text-white/50 mb-6">
                  You're now part of the Keisha for Governor volunteer force. We'll be in touch with your first assignment.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block px-8 py-3 bg-[#1C3C73] hover:bg-[#1C3C73]/80 text-white font-semibold rounded-xl transition-all"
                >
                  Enter the Campaign Hub
                </Link>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit}>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-white mb-1">
                    Join the Volunteer Force
                  </h2>
                  <p className="text-white/40 text-sm mb-6">
                    Your time is just as valuable as any donation. Tell us how
                    you want to help.
                  </p>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1 block">
                        First Name *
                      </label>
                      <input
                        required
                        value={volForm.firstName}
                        onChange={(e) =>
                          setVolForm((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1 block">
                        Last Name *
                      </label>
                      <input
                        required
                        value={volForm.lastName}
                        onChange={(e) =>
                          setVolForm((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="text-white/50 text-xs font-medium mb-1 block">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={volForm.email}
                      onChange={(e) =>
                        setVolForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                      placeholder="you@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="text-white/50 text-xs font-medium mb-1 block">
                      Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={volForm.phone}
                      onChange={(e) =>
                        setVolForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                      placeholder="(404) 555-0123"
                    />
                  </div>

                  {/* City & Zip */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1 block">
                        City
                      </label>
                      <input
                        value={volForm.city}
                        onChange={(e) =>
                          setVolForm((p) => ({ ...p, city: e.target.value }))
                        }
                        className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                        placeholder="Atlanta"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-medium mb-1 block">
                        Zip Code
                      </label>
                      <input
                        value={volForm.zipCode}
                        onChange={(e) =>
                          setVolForm((p) => ({
                            ...p,
                            zipCode: e.target.value,
                          }))
                        }
                        className="w-full py-3 px-4 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#1C3C73]/50"
                        placeholder="30301"
                      />
                    </div>
                  </div>

                  {/* Volunteer Interests */}
                  <div className="mb-6">
                    <label className="text-white/50 text-xs font-medium mb-3 block">
                      How do you want to help? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {VOLUNTEER_INTERESTS.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-all ${
                            volForm.interests.includes(interest.id)
                              ? "bg-[#1C3C73]/30 border border-[#1C3C73]/50 text-white"
                              : "bg-white/[0.03] border border-white/[0.06] text-white/50 hover:bg-white/[0.05]"
                          }`}
                        >
                          <svg
                            className="w-4 h-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d={interest.icon}
                            />
                          </svg>
                          <span className="text-xs font-medium">
                            {interest.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={volSubmitting}
                    className="w-full py-4 bg-[#1C3C73] hover:bg-[#1C3C73]/80 disabled:opacity-50 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#1C3C73]/25"
                  >
                    {volSubmitting ? "Joining..." : "Join the Volunteer Force"}
                  </button>
                </div>
              </form>
            )}

            {/* Switch to Donate */}
            {!volSubmitted && (
              <div className="text-center mt-6">
                <p className="text-white/30 text-sm">
                  Want to donate too?{" "}
                  <button
                    onClick={() => setActiveTab("donate")}
                    className="text-[#BF0F06] hover:text-red-400 font-medium underline underline-offset-2"
                  >
                    Make a contribution
                  </button>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Processing
          </div>
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            FEC Compliant
          </div>
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <div className="w-4 h-4 rounded bg-[#1C3C73]/40 flex items-center justify-center text-white font-bold text-[6px]">
              BV
            </div>
            Powered by BlueVote
          </div>
        </div>
      </div>
    </div>
  );
}
