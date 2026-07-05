import { useState, type ReactNode } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function OnboardingForm({ prefillEmail, prefillName, onComplete }: {
  prefillEmail?: string;
  prefillName?: string;
  onComplete: () => void;
}) {
  const [firstName, setFirstName] = useState(prefillName?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(prefillName?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(prefillEmail || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [volunteerInterest, setVolunteerInterest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const completeOnboarding = useMutation(api.onboarding.completeOnboardingByEmail);

  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("ref") || undefined;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) { setError("Please enter a valid phone number."); return; }

    setSubmitting(true);
    try {
      await completeOnboarding({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: formatPhone(phone),
        city: city.trim() || undefined,
        zipCode: zipCode.trim() || undefined,
        volunteerInterest,
        referralCode,
      });
      onComplete();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/keisha-logo.png" alt="Keisha for Governor" className="h-16 mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <h1 className="text-2xl font-bold text-white">Welcome to the Movement</h1>
          <p className="text-white/50 text-sm mt-1">Join thousands of Georgians supporting Keisha Lance Bottoms for Governor</p>
          {referralCode && (
            <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5 inline-block">
              <span className="text-green-400 text-xs font-medium">You were invited by a supporter</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">First Name *</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" autoFocus />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Last Name *</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" />
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Phone Number *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(404) 555-0123" maxLength={14} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Atlanta" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Zip Code</label>
              <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="30301" maxLength={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#1C3C73] focus:ring-1 focus:ring-[#1C3C73] outline-none transition-colors" />
            </div>
          </div>

          <label className="flex items-center gap-3 bg-[#1C3C73]/10 border border-[#1C3C73]/20 rounded-lg p-3 cursor-pointer hover:bg-[#1C3C73]/15 transition-colors">
            <input type="checkbox" checked={volunteerInterest} onChange={(e) => setVolunteerInterest(e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#1C3C73] focus:ring-[#1C3C73]" />
            <div>
              <div className="text-white text-sm font-medium">I want to volunteer</div>
              <div className="text-white/30 text-xs">Help canvass, phone bank, or organize events</div>
            </div>
          </label>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-xs">{error}</div>}

          <button type="submit" disabled={submitting} className="w-full bg-[#BF0F06] hover:bg-[#BF0F06]/90 disabled:bg-[#BF0F06]/50 text-white font-bold py-3 rounded-lg transition-colors text-sm">
            {submitting ? "Joining..." : "Join the Movement"}
          </button>

          <p className="text-white/20 text-[10px] text-center">
            By joining, you agree to receive campaign updates via email and text. Msg & data rates may apply.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OnboardingGate({ children }: { children: ReactNode }) {
  const user = useQuery(api.auth.currentUser);
  const userEmail = user?.email;
  const userName = user?.name;

  const profile = useQuery(
    api.onboarding.getProfileByEmail,
    userEmail ? { email: userEmail } : "skip"
  );

  const [justCompleted, setJustCompleted] = useState(false);

  // Still loading
  if (profile === undefined && !justCompleted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading...</div>
      </div>
    );
  }

  // Already onboarded or just completed
  if (profile || justCompleted) {
    return <>{children}</>;
  }

  // Need onboarding
  return (
    <OnboardingForm
      prefillEmail={userEmail}
      prefillName={userName}
      onComplete={() => setJustCompleted(true)}
    />
  );
}
