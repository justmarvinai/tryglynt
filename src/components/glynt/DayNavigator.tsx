import { cn } from "@/lib/cn";
import { addDaysISO, dayOfMonth, mondayOfWeekISO, todayISO, weekdayShort } from "@/lib/dates";

/** Week strip: seven tappable days, today marked, future days dimmed. */
export function DayNavigator({
  activeDate,
  onSelect,
  className,
}: {
  activeDate: string;
  onSelect: (date: string) => void;
  className?: string;
}) {
  const monday = mondayOfWeekISO(activeDate);
  const today = todayISO();
  const days = Array.from({ length: 7 }, (_, i) => addDaysISO(monday, i));

  return (
    <div className={cn("flex items-stretch justify-between gap-1", className)}>
      {days.map((date) => {
        const isActive = date === activeDate;
        const isToday = date === today;
        const isFuture = date > today;
        return (
          <button
            key={date}
            type="button"
            onClick={() => onSelect(date)}
            aria-current={isActive ? "date" : undefined}
            className={cn(
              "pressable flex flex-1 flex-col items-center gap-1 rounded-row py-2",
              isActive ? "bg-inverse text-inverse-foreground" : "hover:bg-surface",
              isFuture && !isActive && "opacity-40"
            )}
          >
            <span className="text-caption uppercase opacity-70">
              {weekdayShort(date)}
            </span>
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-subhead font-bold tabular-nums",
                isToday && !isActive && "bg-accent-soft text-accent"
              )}
            >
              {dayOfMonth(date)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
