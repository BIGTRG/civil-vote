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
  PublicLandingPage,
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
  StorePage,
  SupportPage,
} from "@/pages";
import { convex } from "../convexClient";

export function SpaceAuthAppRoutes() {
  return (
    <ConvexAuthProvider client={convex}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicLandingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
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
            <Route path="/donations" element={<DonationTrackingPage />} />
            <Route path="/badges" element={<GamificationPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/runner-feed" element={<RunnerFeedPage />} />
            <Route path="/moderation" element={<ModerationPage />} />
            <Route path="/store" element={<StorePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ConvexAuthProvider>
  );
}
