import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ToastProvider } from "@/components/ui/toast";
import { TabLayout } from "./TabLayout";
import { TodayScreen } from "@/features/today/TodayScreen";
import { InsightsScreen } from "@/features/insights/InsightsScreen";
import { LibraryScreen } from "@/features/library/LibraryScreen";
import { YouScreen } from "@/features/settings/YouScreen";

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<TabLayout />}>
            <Route path="/heute" element={<TodayScreen />} />
            <Route path="/insights" element={<InsightsScreen />} />
            <Route path="/bibliothek" element={<LibraryScreen />} />
            <Route path="/du" element={<YouScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/heute" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
