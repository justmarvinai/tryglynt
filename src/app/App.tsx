import { Suspense, lazy, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastProvider } from "@/components/ui/toast";
import { useProfile } from "@/lib/db/repo/appRepo";
import { BootSplash } from "./BootSplash";
import { PwaPrompts } from "./PwaPrompts";
import { TabLayout } from "./TabLayout";
import { OnboardingFlow } from "@/features/onboarding/OnboardingFlow";
import { TodayScreen } from "@/features/today/TodayScreen";
const DayNutrientsScreen = lazy(() =>
  import("@/features/nutrients/DayNutrientsScreen").then((m) => ({ default: m.DayNutrientsScreen }))
);
const NutrientDetailScreen = lazy(() =>
  import("@/features/nutrients/NutrientDetailScreen").then((m) => ({ default: m.NutrientDetailScreen }))
);
const InsightsScreen = lazy(() =>
  import("@/features/insights/InsightsScreen").then((m) => ({ default: m.InsightsScreen }))
);
const LibraryScreen = lazy(() =>
  import("@/features/library/LibraryScreen").then((m) => ({ default: m.LibraryScreen }))
);
const FoodFormScreen = lazy(() =>
  import("@/features/library/FoodFormScreen").then((m) => ({ default: m.FoodFormScreen }))
);
const RecipeFormScreen = lazy(() =>
  import("@/features/library/RecipeFormScreen").then((m) => ({ default: m.RecipeFormScreen }))
);
const StackScreen = lazy(() =>
  import("@/features/library/StackScreen").then((m) => ({ default: m.StackScreen }))
);
const YouScreen = lazy(() =>
  import("@/features/settings/YouScreen").then((m) => ({ default: m.YouScreen }))
);
const ProfileEditScreen = lazy(() =>
  import("@/features/settings/ProfileEditScreen").then((m) => ({ default: m.ProfileEditScreen }))
);
const TargetsEditScreen = lazy(() =>
  import("@/features/settings/TargetsEditScreen").then((m) => ({ default: m.TargetsEditScreen }))
);
const MealsEditScreen = lazy(() =>
  import("@/features/settings/MealsEditScreen").then((m) => ({ default: m.MealsEditScreen }))
);
const DataScreen = lazy(() =>
  import("@/features/settings/DataScreen").then((m) => ({ default: m.DataScreen }))
);
const AboutScreen = lazy(() =>
  import("@/features/settings/AboutScreen").then((m) => ({ default: m.AboutScreen }))
);

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
      <PwaPrompts />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingGate />} />
          <Route
            element={
              <RequireProfile>
                <Suspense fallback={<BootSplash />}>
                  <TabLayout />
                </Suspense>
              </RequireProfile>
            }
          >
            <Route path="/heute" element={<TodayScreen />} />
            <Route path="/heute/naehrstoffe" element={<DayNutrientsScreen />} />
            <Route path="/naehrstoff/:id" element={<NutrientDetailScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/bibliothek" element={<LibraryScreen />} />
            <Route path="/bibliothek/lebensmittel/:id" element={<FoodFormScreen />} />
            <Route path="/bibliothek/rezept/:id" element={<RecipeFormScreen />} />
            <Route path="/bibliothek/stack" element={<StackScreen />} />
            <Route path="/du" element={<YouScreen />} />
            <Route path="/du/profil" element={<ProfileEditScreen />} />
            <Route path="/du/ziele" element={<TargetsEditScreen />} />
            <Route path="/du/mahlzeiten" element={<MealsEditScreen />} />
            <Route path="/du/daten" element={<DataScreen />} />
            <Route path="/du/ueber" element={<AboutScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/heute" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
