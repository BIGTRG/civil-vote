import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { InstallPrompt } from "./InstallPrompt";
import { CookieConsent } from "./CookieConsent";
import { FECFooter } from "./FECFooter";
import { useState } from "react";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0612]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar -- hidden on mobile, fixed on desktop */}
      <div className={`fixed z-50 h-full transition-transform md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:static`}>
        <AppSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with hamburger */}
        <header className="flex items-center h-14 px-4 border-b border-purple-500/10 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-white/60 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs">SV</div>
            <span className="text-lg font-semibold text-white">Swing<span className="text-amber-400">Vote</span></span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
          <FECFooter />
        </main>
      </div>

      <MobileBottomNav />
      <InstallPrompt />
      <CookieConsent />
    </div>
  );
}
