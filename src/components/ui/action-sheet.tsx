import { cn } from "@/lib/cn";
import { Sheet } from "@/components/ui/sheet";

export interface ActionSheetAction {
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Red text for dangerous actions. */
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  /** Small muted text under the title. */
  message?: React.ReactNode;
  actions: ActionSheetAction[];
  cancelLabel?: React.ReactNode;
}

/**
 * iOS-style action sheet: a stack of tappable actions with a cancel button.
 * Selecting an action closes the sheet automatically.
 */
export function ActionSheet({
  open,
  onOpenChange,
  title,
  message,
  actions,
  cancelLabel = "Cancel",
}: ActionSheetProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={message}
    >
      <div className="flex flex-col gap-2.5">
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            disabled={action.disabled}
            onClick={() => {
              action.onSelect?.();
              onOpenChange(false);
            }}
            className={cn(
              "pressable flex min-h-14 w-full items-center gap-3 rounded-row bg-surface px-5 text-left",
              "text-[1.0625rem] font-semibold hover:bg-surface-2",
              "disabled:pointer-events-none disabled:opacity-40",
              action.destructive ? "text-danger" : "text-foreground",
              "[&_svg]:size-5 [&_svg]:shrink-0"
            )}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="pressable mt-1 flex min-h-14 w-full items-center justify-center rounded-row bg-surface-2 text-[1.0625rem] font-bold text-foreground hover:opacity-90"
        >
          {cancelLabel}
        </button>
      </div>
    </Sheet>
  );
}
