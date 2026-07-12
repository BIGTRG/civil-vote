import { Link } from "react-router-dom";
import { SignIn } from "@/components/SignIn";
import { TestUserLoginSection } from "@/components/TestUserLoginSection";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 size-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto size-14 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">BV</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to BlueVote</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to track races, pledge support, and hold candidates accountable
          </p>
        </div>

        <TestUserLoginSection />
        <SignIn />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto font-medium" asChild>
            <Link to="/signup">Create your free account</Link>
          </Button>
        </p>

        <p className="text-center text-xs text-muted-foreground/50">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
