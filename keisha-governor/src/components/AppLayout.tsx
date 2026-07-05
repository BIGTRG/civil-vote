import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-3 px-4 md:hidden border-b border-sidebar-border">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <img src="/keisha-logo.png" alt="KLB" className="h-5" />
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
        <MobileBottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
