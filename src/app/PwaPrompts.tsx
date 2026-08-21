import * as React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast";
import { GlyntMark } from "@/components/glynt/GlyntMark";
import { db } from "@/lib/db/db";
import { requestPersistentStorage } from "@/lib/db/backup";
import { t } from "@/lib/i18n";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const INSTALL_META_KEY = "installPromptDismissedAt";
const INSTALL_DELAY_MS = 60_000;

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true
  );
}

/**
 * Service-worker update toast + install nudge. Installed PWAs get durable
 * storage on iOS, which is why we ask at all (docs/DATA.md §5).
 */
export function PwaPrompts() {
  const { toast } = useToast();
  const [installEvent, setInstallEvent] = React.useState<InstallPromptEvent | null>(null);
  const [installOpen, setInstallOpen] = React.useState(false);
  const [iosHint, setIosHint] = React.useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onOfflineReady() {
      toast({ title: t.pwa.offlineReady, tone: "success" });
    },
  });

  React.useEffect(() => {
    if (!needRefresh) return;
    toast({
      title: t.pwa.updateTitle,
      description: t.pwa.updateBody,
      duration: 12_000,
      action: {
        label: t.pwa.updateAction,
        onPress: () => {
          setNeedRefresh(false);
          void updateServiceWorker(true);
        },
      },
    });
  }, [needRefresh, setNeedRefresh, updateServiceWorker, toast]);

  // Capture the install event; ask once the user has actually used the app.
  React.useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  React.useEffect(() => {
    if (isStandalone()) return;
    const timer = window.setTimeout(async () => {
      const dismissed = await db.meta.get(INSTALL_META_KEY);
      if (dismissed) return;
      const entries = await db.diaryEntries.count();
      if (entries < 3) return; // only after the app proved useful
      if (installEvent) setInstallOpen(true);
      else if (isIos()) {
        setIosHint(true);
        setInstallOpen(true);
      }
    }, INSTALL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [installEvent]);

  const dismiss = async () => {
    setInstallOpen(false);
    await db.meta.put({ key: INSTALL_META_KEY, value: Date.now() });
  };

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") await requestPersistentStorage();
    await dismiss();
  };

  return (
    <Sheet
      open={installOpen}
      onOpenChange={(open) => (open ? undefined : void dismiss())}
      title={t.pwa.installTitle}
      desktop="dialog"
      footer={
        <div className="flex flex-col gap-2">
          {!iosHint && (
            <Button full size="lg" onClick={() => void install()}>
              <Download /> {t.pwa.installAction}
            </Button>
          )}
          <Button full size="lg" variant="ghost" onClick={() => void dismiss()}>
            {t.pwa.installLater}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <GlyntMark className="size-12 text-accent-text" />
        <p className="text-body leading-relaxed text-muted">{t.pwa.installBody}</p>
        {iosHint && (
          <p className="rounded-row bg-surface px-4 py-3 text-subhead">
            {t.pwa.installIosHint}
          </p>
        )}
      </div>
    </Sheet>
  );
}
