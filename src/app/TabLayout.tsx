import { Outlet, useLocation, useNavigate } from "react-router";
import { ChartColumn, CircleUserRound, House, LibraryBig } from "lucide-react";
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav";
import { t } from "@/lib/i18n";

const tabs = [
  { path: "/heute", label: t.nav.today, icon: <House /> },
  { path: "/insights", label: t.nav.insights, icon: <ChartColumn /> },
  { path: "/bibliothek", label: t.nav.library, icon: <LibraryBig /> },
  { path: "/du", label: t.nav.you, icon: <CircleUserRound /> },
] as const;

/** App shell: routed screen + fixed bottom tab bar. */
export function TabLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <BottomNav>
        {tabs.map((tab) => (
          <BottomNavItem
            key={tab.path}
            icon={tab.icon}
            label={tab.label}
            active={pathname.startsWith(tab.path)}
            onPress={() => navigate(tab.path)}
          />
        ))}
      </BottomNav>
    </>
  );
}
