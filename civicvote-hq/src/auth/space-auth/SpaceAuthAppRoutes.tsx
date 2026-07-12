import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicLayout } from "@/components/PublicLayout";
import { PublicOnlyRoute } from "@/components/PublicOnlyRoute";
import {
  DashboardPage,
  LandingPage,
  LoginPage,
  SettingsPage,
  SignupPage,
  RacesPage,
  CandidatesPage,
  PledgesPage,
  PromisesPage,
  IssuesPage,
  AnalyticsPage,
  FundingPage,
  OperationsPage,
  WhiteLabelPage,
  LoadTestPage,
} from "@/pages";
import { convex } from "../convexClient";

export function SpaceAuthAppRoutes() {
  return (
    <ConvexAuthProvider client={convex}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/races" element={<RacesPage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/pledges" element={<PledgesPage />} />
            <Route path="/promises" element={<PromisesPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/white-label" element={<WhiteLabelPage />} />
            <Route path="/load-testing" element={<LoadTestPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConvexAuthProvider>
  );
}
