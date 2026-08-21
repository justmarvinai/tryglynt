import * as React from "react";
import { useNavigate } from "react-router";
import {
  Database,
  Info,
  Ruler,
  SlidersHorizontal,
  Sun,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Callout } from "@/components/ui/callout";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TopBar } from "@/components/ui/top-bar";
import { APP } from "@/config/app";
import { useProfile, useSettings, updateSettings } from "@/lib/db/repo/appRepo";
import { fmt, t } from "@/lib/i18n";
import {
  getThemePref,
  onThemePrefChange,
  setThemePref,
  type ThemePref,
} from "@/lib/theme";
import { useBackupReminder } from "./useBackupReminder";

function useThemePref(): [ThemePref, (pref: ThemePref) => void] {
  const [pref, setPref] = React.useState<ThemePref>(getThemePref);
  React.useEffect(() => onThemePrefChange(setPref), []);
  return [pref, setThemePref];
}

export function YouScreen() {
  const navigate = useNavigate();
  const profile = useProfile();
  const settings = useSettings();
  const [themePref, updateTheme] = useThemePref();
  const remindBackup = useBackupReminder();

  return (
    <>
      <TopBar
        title={profile ? fmt(t.you.greeting, { name: profile.name }) : t.you.title}
        large
      />
      <Screen className="gap-2 pt-1">
        {remindBackup && (
          <Callout tone="info" className="mb-2">
            {t.dataScreen.backupReminder}
          </Callout>
        )}

        <Section title={t.you.profileSection}>
          <RowGroup>
            <Row
              leading={<UserRound className="text-accent" />}
              title={t.you.profile}
              subtitle={t.you.profileSubtitle}
              onPress={() => navigate("/du/profil")}
            />
            <Row
              leading={<SlidersHorizontal className="text-accent" />}
              title={t.you.targets}
              subtitle={t.you.targetsSubtitle}
              onPress={() => navigate("/du/ziele")}
            />
            <Row
              leading={<UtensilsCrossed className="text-accent" />}
              title={t.you.mealsWater}
              subtitle={t.you.mealsWaterSubtitle}
              onPress={() => navigate("/du/mahlzeiten")}
            />
          </RowGroup>
        </Section>

        <Section title={t.you.appSection}>
          <div className="flex flex-col gap-3">
            <div className="rounded-row bg-surface p-4">
              <div className="mb-2.5 flex items-center gap-2.5">
                <Sun className="size-5 text-accent" />
                <span className="text-headline">{t.you.theme}</span>
              </div>
              <SegmentedControl
                full
                options={[
                  { value: "system", label: t.you.themeSystem },
                  { value: "light", label: t.you.themeLight },
                  { value: "dark", label: t.you.themeDark },
                ]}
                value={themePref}
                onChange={(v) => updateTheme(v as ThemePref)}
              />
            </div>
            <div className="rounded-row bg-surface p-4">
              <div className="mb-2.5 flex items-center gap-2.5">
                <Ruler className="size-5 text-accent" />
                <span className="text-headline">{t.you.units}</span>
              </div>
              <SegmentedControl
                full
                options={[
                  { value: "metric", label: t.you.unitsMetric },
                  { value: "imperial", label: t.you.unitsImperial },
                ]}
                value={settings?.units ?? "metric"}
                onChange={(v) =>
                  void updateSettings({ units: v as "metric" | "imperial" })
                }
              />
            </div>
          </div>
        </Section>

        <Section title={t.you.dataSection}>
          <RowGroup>
            <Row
              leading={<Database className="text-accent" />}
              title={t.you.data}
              subtitle={t.you.dataSubtitle}
              onPress={() => navigate("/du/daten")}
            />
            <Row
              leading={<Info className="text-accent" />}
              title={t.you.about}
              subtitle={t.you.aboutSubtitle}
              onPress={() => navigate("/du/ueber")}
            />
            <Row title={t.you.version} value={APP.version} trailing="none" />
          </RowGroup>
        </Section>

        <BottomNavSpacer />
      </Screen>
    </>
  );
}
