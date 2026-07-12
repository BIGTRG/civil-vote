import { Link } from "react-router-dom";
import { SignUp } from "@/components/SignUp";
import { Button } from "@/components/ui/button";

export function SignupPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 size-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto size-14 rounded-xl bg-red-500 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">RV</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Join RedVote</h1>
          <p className="text-muted-foreground text-sm">
            Create your free account to engage with races and candidates
          </p>
        </div>

        <SignUp />

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto font-medium" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </p>

        <p className="text-center text-xs text-muted-foreground/50">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="underline">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
