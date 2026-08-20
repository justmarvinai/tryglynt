import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface DisclosureProps {
  title: React.ReactNode;
  /** Small text right of the title, e.g. a count. */
  meta?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/** Collapsible card. Stack several in a `space-y-3` for an accordion. */
export function Disclosure({
  title,
  meta,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: DisclosureProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <div className={cn("rounded-row bg-surface", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className="flex min-h-14 w-full items-center gap-3 px-5 py-3 text-left"
      >
        <span className="flex-1 text-headline">{title}</span>
        {meta != null && (
          <span className="shrink-0 text-subhead text-muted">{meta}</span>
        )}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-faint transition-transform duration-300 ease-[var(--ease-out-quart)]",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quart)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 text-subhead leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
