import * as React from "react";
import { Leaf, ScanSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Screen } from "@/components/ui/screen";
import { GlyntMark } from "@/components/glynt/GlyntMark";
import { t } from "@/lib/i18n";

const slideIcons = [
  { icon: <ScanSearch />, tint: "bg-accent-soft text-accent" },
  { icon: <Leaf />, tint: "bg-success-soft text-success" },
  { icon: <ShieldCheck />, tint: "bg-pink-soft text-pink-strong" },
];

export function WelcomeStep({ onStart }: { onStart: () => void }) {
  const [index, setIndex] = React.useState(0);

  return (
    <Screen className="flex min-h-dvh flex-col pt-safe">
      <div className="flex items-center gap-2.5 pt-6">
        <GlyntMark className="size-8 text-accent" />
        <span className="text-title3">{t.app.name}</span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Carousel index={index} onIndexChange={setIndex}>
          {t.onboarding.slides.map((slide, i) => (
            <div
              key={slide.title}
              className="flex flex-col items-center px-4 py-6 text-center"
            >
              <span
                className={`flex size-20 items-center justify-center rounded-card ${slideIcons[i].tint} [&_svg]:size-9`}
              >
                {slideIcons[i].icon}
              </span>
              <h1 className="mt-8 text-title1">{slide.title}</h1>
              <p className="mt-3 max-w-[19rem] text-body leading-relaxed text-muted">
                {slide.body}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="pb-6 pt-8">
        <Button size="xl" full onClick={onStart}>
          {t.onboarding.start}
        </Button>
      </div>
    </Screen>
  );
}
