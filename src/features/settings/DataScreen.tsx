import * as React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Download, HardDriveDownload, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import {
  BackupError,
  applyBackup,
  createBackup,
  downloadBackup,
  eraseAllData,
  inspectBackup,
  requestPersistentStorage,
  type BackupFile,
  type BackupSummary,
  type ImportMode,
} from "@/lib/db/backup";
import { fmt, t } from "@/lib/i18n";
import { markBackupDone } from "./useBackupReminder";

const ERASE_WORD = "GLYNT";

export function DataScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [pending, setPending] = React.useState<{
    backup: BackupFile;
    summary: BackupSummary;
  } | null>(null);
  const [eraseOpen, setEraseOpen] = React.useState(false);
  const [eraseInput, setEraseInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const exportBackup = async () => {
    setBusy(true);
    try {
      downloadBackup(await createBackup());
      await markBackupDone();
      toast({ title: t.dataScreen.exported, tone: "success" });
    } finally {
      setBusy(false);
    }
  };

  const onFile = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      setPending(inspectBackup(parsed));
    } catch (error) {
      toast({
        title:
          error instanceof BackupError && error.reason === "version"
            ? t.dataScreen.importErrorVersion
            : t.dataScreen.importErrorFormat,
        tone: "danger",
      });
    }
  };

  const runImport = async (mode: ImportMode) => {
    if (!pending) return;
    setBusy(true);
    try {
      await applyBackup(pending.backup, mode);
      setPending(null);
      toast({ title: t.dataScreen.imported, tone: "success" });
      navigate("/heute");
    } finally {
      setBusy(false);
    }
  };

  const persist = async () => {
    const granted = await requestPersistentStorage();
    toast({
      title: granted ? t.dataScreen.storageGranted : t.dataScreen.storageDenied,
      tone: granted ? "success" : "default",
    });
  };

  const erase = async () => {
    setBusy(true);
    try {
      await eraseAllData();
      setEraseOpen(false);
      toast({ title: t.dataScreen.erased });
      window.location.href = "/";
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <TopBar
        title={t.dataScreen.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <Callout tone="info">{t.dataScreen.intro}</Callout>

        <Section title={t.dataScreen.export}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.dataScreen.exportHint}</p>
          <Button size="lg" full loading={busy} onClick={() => void exportBackup()}>
            <Download /> {t.dataScreen.export}
          </Button>
        </Section>

        <Section title={t.dataScreen.import}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.dataScreen.importHint}</p>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onFile(file);
              e.target.value = "";
            }}
          />
          <Button size="lg" full variant="soft" onClick={() => fileRef.current?.click()}>
            <Upload /> {t.dataScreen.import}
          </Button>
        </Section>

        <Section title={t.dataScreen.storage}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.dataScreen.storageHint}</p>
          <Button size="lg" full variant="soft" onClick={() => void persist()}>
            <HardDriveDownload /> {t.dataScreen.storage}
          </Button>
        </Section>

        <Section title={t.dataScreen.erase}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.dataScreen.eraseHint}</p>
          <Button
            size="lg"
            full
            variant="danger-soft"
            onClick={() => {
              setEraseInput("");
              setEraseOpen(true);
            }}
          >
            <Trash2 /> {t.dataScreen.erase}
          </Button>
        </Section>
      </Screen>

      {/* Import: dry-run summary, then merge or replace */}
      <Sheet
        open={pending != null}
        onOpenChange={(o) => (o ? undefined : setPending(null))}
        title={t.dataScreen.importTitle}
        desktop="sheet"
      >
        {pending && (
          <div className="flex flex-col gap-4 pb-2">
            <div className="rounded-card bg-surface p-4">
              <p className="text-subhead">
                {fmt(t.dataScreen.importSummary, {
                  entries: pending.summary.entries,
                  foods: pending.summary.foods,
                  recipes: pending.summary.recipes,
                  weights: pending.summary.weights,
                })}
              </p>
              {pending.summary.exportedAt && (
                <p className="mt-1 text-footnote text-muted">
                  {fmt(t.dataScreen.importFrom, {
                    date: new Date(pending.summary.exportedAt).toLocaleDateString("de-DE"),
                  })}
                </p>
              )}
            </div>
            <Button size="lg" full loading={busy} onClick={() => void runImport("merge")}>
              {t.dataScreen.importMerge}
            </Button>
            <p className="-mt-2 px-1 text-footnote text-muted">
              {t.dataScreen.importMergeHint}
            </p>
            <Button
              size="lg"
              full
              variant="danger-soft"
              loading={busy}
              onClick={() => void runImport("replace")}
            >
              {t.dataScreen.importReplace}
            </Button>
            <p className="-mt-2 px-1 text-footnote text-muted">
              {t.dataScreen.importReplaceHint}
            </p>
          </div>
        )}
      </Sheet>

      <Dialog
        open={eraseOpen}
        onOpenChange={setEraseOpen}
        title={t.dataScreen.eraseTitle}
        description={t.dataScreen.eraseBody}
        actions={
          <>
            <TextField
              placeholder={t.dataScreen.eraseConfirm}
              value={eraseInput}
              onChange={(e) => setEraseInput(e.target.value)}
              className="mb-2"
            />
            <Button
              variant="danger"
              full
              disabled={eraseInput.trim().toUpperCase() !== ERASE_WORD}
              loading={busy}
              onClick={() => void erase()}
            >
              {t.dataScreen.erase}
            </Button>
            <Button variant="ghost" full onClick={() => setEraseOpen(false)}>
              {t.common.cancel}
            </Button>
          </>
        }
      />
    </>
  );
}
