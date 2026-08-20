import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastProvider } from "@/components/ui/toast";
import { useProfile } from "@/lib/db/repo/appRepo";
import { BootSplash } from "./BootSplash";
import { TabLayout } from "./TabLayout";
import { OnboardingFlow } from "@/features/onboarding/OnboardingFlow";
import { TodayScreen } from "@/features/today/TodayScreen";
import { InsightsScreen } from "@/features/insights/InsightsScreen";
import { LibraryScreen } from "@/features/library/LibraryScreen";
import { FoodFormScreen } from "@/features/library/FoodFormScreen";
import { RecipeFormScreen } from "@/features/library/RecipeFormScreen";
import { StackScreen } from "@/features/library/StackScreen";
import { YouScreen } from "@/features/settings/YouScreen";

/** Routes that need a profile; redirects new users to onboarding. */
function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useProfile();
  if (profile === undefined) return <BootSplash />;
  if (profile === null) return <Navigate to="/onboarding" replace />;
  return children;
}

/** Onboarding is only reachable while no profile exists. */
function OnboardingGate() {
  const profile = useProfile();
  if (profile === undefined) return <BootSplash />;
  if (profile) return <Navigate to="/heute" replace />;
  return <OnboardingFlow />;
}

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingGate />} />
          <Route
            element={
              <RequireProfile>
                <TabLayout />
              </RequireProfile>
            }
          >
            <Route path="/heute" element={<TodayScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/bibliothek" element={<LibraryScreen />} />
            <Route path="/bibliothek/lebensmittel/:id" element={<FoodFormScreen />} />
            <Route path="/bibliothek/rezept/:id" element={<RecipeFormScreen />} />
            <Route path="/bibliothek/stack" element={<StackScreen />} />
            <Route path="/du" element={<YouScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/heute" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
