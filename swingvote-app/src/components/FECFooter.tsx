import { Link } from "react-router-dom";

export function FECFooter() {
  return (
    <footer className="border-t border-purple-500/20 bg-black/20 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center md:text-left">
            Paid for by CivilVote Technologies, Inc.. Not authorized by any candidate or candidate&apos;s committee.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="text-white/40 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <p className="text-white/25 text-[10px] text-center mt-2">
          &copy; {new Date().getFullYear()} CivilVote Technologies, Inc.. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
