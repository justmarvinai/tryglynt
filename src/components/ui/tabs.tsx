import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Small count bubble next to the label. */
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Underline tab bar. Render the active panel yourself:
 * `{tab === "words" && <WordsPanel />}`
 */
export function Tabs({ tabs, value, defaultValue, onChange, className }: TabsProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? tabs[0]?.value,
    onChange: onChange as (v: string | undefined) => void,
  });

  return (
    <div
      role="tablist"
      className={cn(
        "scrollbar-none flex gap-6 overflow-x-auto border-b border-hairline",
        className
      )}
    >
      {tabs.map((tab) => {
        const selected = tab.value === current;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => setCurrent(tab.value)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 pb-3 pt-1 text-headline transition-colors",
              selected ? "text-foreground" : "text-muted hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tabular-nums",
                  selected
                    ? "bg-inverse text-inverse-foreground"
                    : "bg-surface text-muted"
                )}
              >
                {tab.count}
              </span>
            )}
            {selected && (
              <span className="absolute inset-x-0 -bottom-px h-[2.5px] rounded-full bg-foreground" />
            )}
          </button>
        );
      })}
    </div>
  );
}
