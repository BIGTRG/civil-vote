import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0f0a0a]">
      <Outlet />
    </div>
  );
}
