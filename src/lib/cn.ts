import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know the CleanOS type-scale utilities are font
 * sizes — otherwise it treats `text-display` as a text color and drops
 * it when merged with e.g. `text-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-title1",
        "text-title2",
        "text-title3",
        "text-headline",
        "text-body",
        "text-callout",
        "text-subhead",
        "text-footnote",
        "text-caption",
      ],
    },
  },
});

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
