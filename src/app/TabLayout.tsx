import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ChartColumn, CircleUserRound, House, LibraryBig, Plus } from "lucide-react";
import { BottomNav, BottomNavItem } from "@/components/ui/bottom-nav";
import { Fab } from "@/components/ui/fab";
import { seedIfNeeded } from "@/lib/db/seed";
import { t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { LogSheet } from "@/features/log/LogSheet";
import { PortionSheet } from "@/features/log/PortionSheet";
import { QuickAddSheet } from "@/features/log/QuickAddSheet";

const tabs = [
  { path: "/heute", label: t.nav.today, icon: <House /> },
  { path: "/insights", label: t.nav.insights, icon: <ChartColumn /> },
  { path: "/bibliothek", label: t.nav.library, icon: <LibraryBig /> },
  { path: "/du", label: t.nav.you, icon: <CircleUserRound /> },
] as const;

/** Routes on which the floating log button is shown. */
const FAB_ROUTES = ["/heute", "/bibliothek"];

/** App shell: routed screen + bottom tabs + global logging sheets. */
export function TabLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const openLog = useUiStore((s) => s.openLog);

  // Bundled food DB: seed/upgrade once per app start (idempotent).
  React.useEffect(() => {
    void seedIfNeeded();
  }, []);

  const showFab = FAB_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      <Outlet />

      {showFab && (
        <Fab
          label={t.log.title}
          fixed
          className="bottom-24 mb-safe"
          onClick={() => openLog()}
        >
          <Plus strokeWidth={2.5} />
        </Fab>
      )}

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

      <LogSheet />
      <PortionSheet />
      <QuickAddSheet />
    </>
  );
}
