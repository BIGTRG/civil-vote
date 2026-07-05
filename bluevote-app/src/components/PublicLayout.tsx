import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a1628]">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
