import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Callout } from "@/components/ui/callout";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { TopBar } from "@/components/ui/top-bar";
import { GlyntMark } from "@/components/glynt/GlyntMark";
import { APP } from "@/config/app";
import { t } from "@/lib/i18n";

export function AboutScreen() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        title={t.about.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-5 pt-2 pb-28">
        <div className="flex flex-col items-center py-4 text-center">
          <GlyntMark className="size-14 text-accent-text" />
          <p className="mt-3 text-title2">{APP.name}</p>
          <p className="mt-1 text-subhead text-muted">{t.about.tagline}</p>
          <p className="mt-1 text-footnote text-faint">
            {t.you.version} {APP.version}
          </p>
        </div>

        <Section title={t.about.privacyTitle}>
          <p className="px-1 text-body leading-relaxed text-muted">{t.about.privacyBody}</p>
        </Section>

        <Section title={t.about.sourcesTitle}>
          <ul className="flex flex-col gap-2.5 rounded-card bg-surface p-5">
            {[
              t.about.sourceEfsa,
              t.about.sourceNih,
              t.about.sourceWho,
              t.about.sourceFormula,
            ].map((source) => (
              <li key={source} className="text-subhead leading-relaxed">
                {source}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.about.dataTitle}>
          <p className="px-1 text-body leading-relaxed text-muted">{t.about.dataBody}</p>
        </Section>

        <Callout tone="warning" title={t.about.disclaimerTitle}>
          {t.about.disclaimerBody}
        </Callout>

        <Section title={t.about.licensesTitle}>
          <ul className="flex flex-col gap-2.5 rounded-card bg-surface p-5">
            {[
              t.about.licenseCleanOs,
              t.about.licenseOff,
              t.about.licenseLucide,
              t.about.licenseInter,
            ].map((license) => (
              <li key={license} className="text-subhead leading-relaxed text-muted">
                {license}
              </li>
            ))}
          </ul>
        </Section>
      </Screen>
    </>
  );
}
