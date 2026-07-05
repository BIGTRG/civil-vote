import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("redvote_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("redvote_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("redvote_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[60] animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4 shadow-2xl">
        <p className="text-white/80 text-sm mb-3">
          We use cookies to enhance your experience and analyze platform usage.
          See our <Link to="/privacy" className="text-red-400 underline">Privacy Policy</Link> for details.
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="bg-white/10 hover:bg-white/20 text-white/70 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
