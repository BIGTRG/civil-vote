import { Link } from "react-router-dom";
import { SignUp } from "@/components/SignUp";
import { Button } from "@/components/ui/button";

export function SignupPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen bg-gradient-to-b from-[#1a0a0a] to-[#0f0a0a]">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">RV</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Join RedVote</h1>
          <p className="text-red-200/50 text-sm">Create your account and make your voice heard</p>
        </div>

        <SignUp />

        <p className="text-center text-sm text-red-200/50">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto font-medium text-red-400" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
