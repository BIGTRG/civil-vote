import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="size-8 rounded-lg bg-[#0F2A4A] flex items-center justify-center">
              <Shield className="size-4 text-[#C9A227]" />
            </div>
            <span className="hidden sm:inline">CivicVote HQ</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>BlueVote</span>
            <span>RedVote</span>
            <span>CivicVote</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
