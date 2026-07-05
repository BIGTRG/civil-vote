import {
  ArrowRight,
  Check,
  Shield,
  Vote,
  BarChart3,
  Users,
  Scale,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicLandingPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A4A]/5 via-transparent to-[#C9A227]/5" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 text-xs font-semibold text-[#0F2A4A] tracking-wide uppercase">
            <Shield className="size-3" />
            Civic Verified, Inc.
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            CivicVote
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2A4A] via-[#1652F0] to-[#C9A227]">
              HQ Command Center
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The operating system for modern civic participation. Monitor races,
            track pledges, manage candidates, and oversee the entire CivicVote
            platform from one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              className="text-base h-12 px-8 bg-[#0F2A4A] hover:bg-[#1A3D66] text-white"
            >
              Enter HQ
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="size-4 text-[#059669]" />
              <span>36 States Covered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-4 text-[#059669]" />
              <span>FEC Compliant</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Check className="size-4 text-[#059669]" />
              <span>Bipartisan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform overview */}
      <section className="py-20 md:py-32 border-t bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#C9A227] mb-3 tracking-wide uppercase">
              Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              One Backend. Three Brands. Full Control.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              BlueVote, RedVote, and CivicVote all powered by a single verified
              civic infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/50 border p-6 md:p-8 transition-all hover:shadow-lg hover:border-foreground/20">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-[#1652F0]/10 blur-2xl transition-all group-hover:bg-[#1652F0]/20" />
              <div className="relative">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#1652F0]/10 mb-5">
                  <Vote className="size-5 text-[#1652F0]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Support Vote</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  In-app pledge + $5 minimum donation. One pledge per race per
                  voter. The core engagement loop.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/50 border p-6 md:p-8 transition-all hover:shadow-lg hover:border-foreground/20">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-[#D22B2B]/10 blur-2xl transition-all group-hover:bg-[#D22B2B]/20" />
              <div className="relative">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#D22B2B]/10 mb-5">
                  <BarChart3 className="size-5 text-[#D22B2B]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Public Pulse</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Aggregated verified-voter sentiment. Real-time polling from
                  actual verified voters, not random samples.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/50 border p-6 md:p-8 transition-all hover:shadow-lg hover:border-foreground/20">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-[#C9A227]/10 blur-2xl transition-all group-hover:bg-[#C9A227]/20" />
              <div className="relative">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#C9A227]/10 mb-5">
                  <Scale className="size-5 text-[#C9A227]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Win My Vote</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Two-way accountability. Voters submit issues, candidates
                  respond publicly. Democracy with teeth.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/50 border p-6 md:p-8 md:col-span-2 lg:col-span-2 transition-all hover:shadow-lg hover:border-foreground/20">
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 size-32 rounded-full bg-[#0F2A4A]/10 blur-2xl transition-all group-hover:bg-[#0F2A4A]/20" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#0F2A4A]/10">
                  <Users className="size-7 text-[#0F2A4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Campaign SaaS + Down-Ballot CaaS
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    $99-$5,000/mo tiers for candidates. Down-ballot
                    Campaign-as-a-Service targeting 520,000 elected offices
                    nationwide. The $24M ARR path.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-[#0F2A4A] text-white p-6 md:p-8 transition-all hover:shadow-lg">
              <div className="relative">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#C9A227]/20 mb-5">
                  <Globe className="size-5 text-[#C9A227]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Promise Ledger
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  "Carfax for Politicians" -- hash-chained evidence tracking
                  for every campaign promise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-[#C9A227]" />
            <span className="font-semibold text-foreground">Civic Verified, Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>BlueVote</span>
            <span>RedVote</span>
            <span>CivicVote</span>
            <span>CivicAuth</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
