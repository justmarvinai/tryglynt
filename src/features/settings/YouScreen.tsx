import * as React from "react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TopBar } from "@/components/ui/top-bar";
import { APP } from "@/config/app";
import { t } from "@/lib/i18n";
import {
  getThemePref,
  onThemePrefChange,
  setThemePref,
  type ThemePref,
} from "@/lib/theme";

function useThemePref(): [ThemePref, (pref: ThemePref) => void] {
  const [pref, setPref] = React.useState<ThemePref>(getThemePref);
  React.useEffect(() => onThemePrefChange(setPref), []);
  return [pref, setThemePref];
}

export function YouScreen() {
  const [themePref, updateTheme] = useThemePref();

  return (
    <>
      <TopBar title={t.you.title} large />
      <Screen className="gap-2 pt-2">
        <Section title={t.you.appearance}>
          <RowGroup>
            <Row
              title={t.you.theme}
              trailing={
                <SegmentedControl
                  size="sm"
                  options={[
                    { value: "system", label: t.you.themeSystem },
                    { value: "light", label: t.you.themeLight },
                    { value: "dark", label: t.you.themeDark },
                  ]}
                  value={themePref}
                  onChange={(v) => updateTheme(v as ThemePref)}
                />
              }
            />
          </RowGroup>
        </Section>

        <Section title={t.you.about}>
          <RowGroup>
            <Row title={t.you.version} value={APP.version} />
          </RowGroup>
        </Section>

        <BottomNavSpacer />
      </Screen>
    </>
  );
}
