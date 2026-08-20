import { LibraryBig } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { EmptyState } from "@/components/ui/empty-state";
import { Screen } from "@/components/ui/screen";
import { TopBar } from "@/components/ui/top-bar";
import { t } from "@/lib/i18n";

export function LibraryScreen() {
  return (
    <>
      <TopBar title={t.library.title} large />
      <Screen className="pt-2">
        <EmptyState
          icon={<LibraryBig />}
          title={t.library.emptyTitle}
          description={t.library.emptyBody}
          className="flex-1"
        />
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
