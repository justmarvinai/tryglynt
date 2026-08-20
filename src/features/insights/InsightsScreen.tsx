import { ChartColumn } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { EmptyState } from "@/components/ui/empty-state";
import { Screen } from "@/components/ui/screen";
import { TopBar } from "@/components/ui/top-bar";
import { t } from "@/lib/i18n";

export function InsightsScreen() {
  return (
    <>
      <TopBar title={t.insights.title} large />
      <Screen className="pt-2">
        <EmptyState
          icon={<ChartColumn />}
          title={t.insights.emptyTitle}
          description={t.insights.emptyBody}
          className="flex-1"
        />
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
