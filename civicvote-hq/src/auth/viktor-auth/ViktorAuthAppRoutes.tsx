import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PublicHeader } from "@/components/PublicHeader";
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
import { PublicLandingPage } from "@/pages/PublicLandingPage";
import {
  DashboardPage,
  RacesPage,
  CandidatesPage,
  PledgesPage,
  PromisesPage,
  IssuesPage,
  AnalyticsPage,
  SettingsPage,
  FundingPage,
} from "@/pages";

function ViktorPublicShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
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
    <ViktorSpaceAccessProvider>
      <ViktorAuthGlobalGate
        session={activeSession}
        onSignInRequired={beginSignIn}
      >
        <Routes>
          <Route element={<ViktorPublicShell />}>
            <Route path="/" element={<PublicLandingPage />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/races" element={<RacesPage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/pledges" element={<PledgesPage />} />
            <Route path="/promises" element={<PromisesPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ViktorAuthGlobalGate>
    </ViktorSpaceAccessProvider>
  );
}
