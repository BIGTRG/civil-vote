import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import {
  LayoutDashboard, LogOut, Moon, Settings, Sun,
  Vote, BarChart3, BookCheck, MessageCircle,
  Brain, Calendar, Users, Trophy,
  Target, Heart, Mic, UserPlus,
  DollarSign, Medal, Map, Megaphone, Shield, ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const navGroups = [
  {
    label: "Campaign HQ",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/intelligence", label: "Election Intel", icon: Brain },
      { href: "/media", label: "Media Hub", icon: Mic },
    ],
  },
  {
    label: "Voter Engagement",
    items: [
      { href: "/races", label: "Races", icon: Vote },
      { href: "/pulse", label: "Public Pulse", icon: BarChart3 },
      { href: "/promises", label: "Promise Ledger", icon: BookCheck },
      { href: "/issues", label: "Win My Vote", icon: MessageCircle },
    ],
  },
  {
    label: "Fundraising",
    items: [
      { href: "/donations", label: "Donation Tracking", icon: DollarSign },
      { href: "/donors", label: "Donor Spotlight", icon: Users },
      { href: "/challenges", label: "Challenges", icon: Trophy },
      { href: "/giving", label: "Direct Giving", icon: Target },
      { href: "/endorsements", label: "Endorsements", icon: Heart },
      { href: "/store", label: "Campaign Store", icon: ShoppingBag },
    ],
  },
  {
    label: "Organization",
    items: [
      { href: "/events", label: "Events", icon: Calendar },
      { href: "/supporters", label: "Supporters", icon: UserPlus },
      { href: "/badges", label: "Badges & Ranks", icon: Medal },
      { href: "/strategy", label: "Voter Strategy", icon: Map },
      { href: "/runner-feed", label: "Runner Feed", icon: Megaphone },
      { href: "/moderation", label: "Back Office", icon: Shield },
    ],
  },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={href} onClick={() => setOpenMobile(false)}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarNav() {
  const location = useLocation();

  return (
    <SidebarContent>
      {navGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={location.pathname === item.href || location.pathname.startsWith(item.href + "/")}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

function SidebarUserMenu() {
  const user = useQuery(api.auth.currentUser);
  const { signOut } = useAuthActions();
  const { theme, toggleTheme, switchable } = useTheme();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarFooter className="border-t border-sidebar-border">
      {/* Powered by BlueVote badge */}
      <div className="px-3 py-2 flex items-center gap-2 opacity-40">
        <div className="w-4 h-4 rounded bg-[#1C3C73] flex items-center justify-center text-white font-bold" style={{ fontSize: "7px" }}>BV</div>
        <span className="text-[10px] text-muted-foreground">Powered by BlueVote</span>
      </div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-[#1C3C73] text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium truncate">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              <DropdownMenuItem asChild>
                <Link to="/settings" onClick={() => setOpenMobile(false)}>
                  <Settings className="size-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              {switchable && (
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="size-4" />
                  ) : (
                    <Sun className="size-4" />
                  )}
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

function SidebarHeaderContent() {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarHeader className="border-b border-sidebar-border">
      <Link
        to="/"
        onClick={() => setOpenMobile(false)}
        className="flex items-center gap-2.5 px-2 py-1 font-semibold text-lg"
      >
        <img src="/keisha-logo.png" alt="KLB" className="h-7" />
        <span className="sr-only">Keisha for Governor</span>
      </Link>
    </SidebarHeader>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeaderContent />
      <SidebarNav />
      <SidebarUserMenu />
    </Sidebar>
  );
}
