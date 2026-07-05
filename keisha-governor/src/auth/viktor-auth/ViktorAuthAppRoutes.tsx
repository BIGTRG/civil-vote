import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { beginViktorAuthentication } from "@/lib/viktor-spaces-access/client";
import {
  getViktorAuthBaseUrl,
  getViktorAuthClientId,
  getViktorSpacesSpaceId,
} from "@/lib/viktor-spaces-access/config";
import {
  SPACE_CALLBACK_PATH,
  SPACE_ME_PATH,
} from "@/lib/viktor-spaces-access/constants";
import type { ViktorAuthStatus } from "@/lib/viktor-spaces-access/types";
import {
  ViktorAuthGlobalGate,
  type ViktorAuthSession,
} from "@/lib/viktor-spaces-access/ViktorAuthGlobalGate";
import { ViktorSpaceAccessProvider } from "@/lib/viktor-spaces-access/ViktorSpaceAccessProvider";
import {
  PublicLandingPage,
  DashboardPage,
  SettingsPage,
  RacesPage,
  RaceDetailPage,
  PublicPulsePage,
  PromiseLedgerPage,
  WinMyVotePage,
  ElectionIntelligencePage,
  EventsCalendarPage,
  DonorSpotlightPage,
  FundraisingChallengesPage,
  DirectedGivingPage,
  EndorsementsPage,
  SupporterListPage,
  MediaHubPage,
  GamificationPage,
  DonationTrackingPage,
  StrategyPage,
  RunnerFeedPage,
  ModerationPage,
} from "@/pages";
import { convex } from "../convexClient";

function ViktorPublicShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

function toViktorSession(status: ViktorAuthStatus): ViktorAuthSession {
  if (status.status !== "allowed") {
    return null;
  }
  return {
    user: {
      id: status.user.id,
      email: status.user.email,
      name: status.user.display_name,
    },
    resource: status.resource,
  };
}

function useViktorAuthSession(enabled: boolean): ViktorAuthSession | undefined {
  const [session, setSession] = useState<ViktorAuthSession | undefined>(
    enabled ? undefined : null,
  );

  useEffect(() => {
    if (!enabled) {
      setSession(null);
      return;
    }
    let cancelled = false;
    setSession(undefined);
    void fetch(SPACE_ME_PATH, {
      cache: "no-store",
      credentials: "include",
    })
      .then(async response => {
        if (!response.ok) return null;
        const status = (await response.json()) as ViktorAuthStatus;
        return toViktorSession(status);
      })
      .catch(() => null)
      .then(nextSession => {
        if (!cancelled) {
          setSession(nextSession);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return session;
}

function AuthenticatedRoutes({
  session,
  onSignInRequired,
}: {
  session?: ViktorAuthSession;
  onSignInRequired?: () => void;
}) {
  return (
    <ViktorAuthGlobalGate
      session={session}
      onSignInRequired={onSignInRequired}
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/races" element={<RacesPage />} />
          <Route path="/race/:id" element={<RaceDetailPage />} />
          <Route path="/pulse" element={<PublicPulsePage />} />
          <Route path="/promises" element={<PromiseLedgerPage />} />
          <Route path="/issues" element={<WinMyVotePage />} />
          <Route path="/intelligence" element={<ElectionIntelligencePage />} />
          <Route path="/events" element={<EventsCalendarPage />} />
          <Route path="/donors" element={<DonorSpotlightPage />} />
          <Route path="/challenges" element={<FundraisingChallengesPage />} />
          <Route path="/giving" element={<DirectedGivingPage />} />
          <Route path="/endorsements" element={<EndorsementsPage />} />
          <Route path="/supporters" element={<SupporterListPage />} />
          <Route path="/media" element={<MediaHubPage />} />
          <Route path="/badges" element={<GamificationPage />} />
          <Route path="/donations" element={<DonationTrackingPage />} />
          <Route path="/strategy" element={<StrategyPage />} />
          <Route path="/runner-feed" element={<RunnerFeedPage />} />
          <Route path="/moderation" element={<ModerationPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ViktorAuthGlobalGate>
  );
}

export function ViktorAuthAppRoutes({
  session,
  onSignInRequired,
}: {
  session?: ViktorAuthSession;
  onSignInRequired?: () => void;
}) {
  const fetchedSession = useViktorAuthSession(session === undefined);
  const activeSession = session === undefined ? fetchedSession : session;
  const startedSignIn = useRef(false);
  const beginSignIn = useCallback(() => {
    if (startedSignIn.current) return;
    startedSignIn.current = true;
    if (onSignInRequired) {
      onSignInRequired();
      return;
    }
    const resourceId = getViktorSpacesSpaceId();
    const clientId = getViktorAuthClientId();
    const viktorAuthBaseUrl = getViktorAuthBaseUrl();
    if (!resourceId || !clientId || !viktorAuthBaseUrl) {
      return;
    }
    void beginViktorAuthentication({
      clientId,
      resourceId,
      viktorAuthBaseUrl,
      redirectUri: `${window.location.origin}${SPACE_CALLBACK_PATH}`,
    });
  }, [onSignInRequired]);

  return (
    <ConvexAuthProvider client={convex}>
      <ViktorSpaceAccessProvider>
        <Routes>
          {/* Public landing page -- no auth required */}
          <Route element={<ViktorPublicShell />}>
            <Route path="/" element={<PublicLandingPage />} />
          </Route>

          {/* All other routes go through auth gate */}
          <Route
            path="/*"
            element={
              <AuthenticatedRoutes
                session={activeSession}
                onSignInRequired={beginSignIn}
              />
            }
          />
        </Routes>
      </ViktorSpaceAccessProvider>
    </ConvexAuthProvider>
  );
}
