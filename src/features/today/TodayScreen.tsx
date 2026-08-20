import { NotebookPen } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { EmptyState } from "@/components/ui/empty-state";
import { Screen } from "@/components/ui/screen";
import { TopBar } from "@/components/ui/top-bar";
import { t } from "@/lib/i18n";

export function TodayScreen() {
  return (
    <>
      <TopBar title={t.today.title} large />
      <Screen className="pt-2">
        <EmptyState
          icon={<NotebookPen />}
          title={t.today.emptyTitle}
          description={t.today.emptyBody}
          className="flex-1"
        />
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
