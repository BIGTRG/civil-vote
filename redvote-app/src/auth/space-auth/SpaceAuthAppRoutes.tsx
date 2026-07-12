import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicLayout } from "@/components/PublicLayout";
import { PublicOnlyRoute } from "@/components/PublicOnlyRoute";
import {
  DashboardPage,
  LoginPage,
  SettingsPage,
  SignupPage,
  RacesPage,
  RaceDetailPage,
  PublicPulsePage,
  PromiseLedgerPage,
  WinMyVotePage,
  FundingPage,
  StorePage,
  PartyDirectoryPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  NewsPage,
  AnalyticsPage,
  CandidatePortalPage,
  PollingPage,
} from "@/pages";
import { PublicLandingPage } from "@/pages/PublicLandingPage";
import { convex } from "../convexClient";

export function SpaceAuthAppRoutes() {
  return (
    <ConvexAuthProvider client={convex}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicLandingPage />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>

        {/* Public browsing — no login required */}
        <Route element={<AppLayout />}>
          <Route path="/races" element={<RacesPage />} />
          <Route path="/race/:id" element={<RaceDetailPage />} />
          <Route path="/pulse" element={<PublicPulsePage />} />
          <Route path="/promises" element={<PromiseLedgerPage />} />
          <Route path="/issues" element={<WinMyVotePage />} />
          <Route path="/funding" element={<FundingPage />} />
          <Route path="/directory" element={<PartyDirectoryPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/candidate-portal" element={<CandidatePortalPage />} />
          <Route path="/polling" element={<PollingPage />} />
        </Route>

        {/* Auth-required pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConvexAuthProvider>
  );
}
