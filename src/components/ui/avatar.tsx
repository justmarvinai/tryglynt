import * as React from "react";
import { cn } from "@/lib/cn";

export interface AvatarProps extends React.ComponentProps<"span"> {
  src?: string;
  /** Used for initials and alt text. */
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "squircle";
}

const sizes = {
  sm: "size-8 text-[0.6875rem]",
  md: "size-10 text-[0.8125rem]",
  lg: "size-12 text-[0.9375rem]",
  xl: "size-16 text-[1.25rem]",
};

const palettes = [
  "bg-accent-soft text-accent",
  "bg-success-soft text-success",
  "bg-pink-soft text-pink-strong",
  "bg-warning-soft text-warning",
  "bg-surface-2 text-muted",
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

/** Circular avatar with automatic tinted initials fallback. */
export function Avatar({
  src,
  name,
  size = "md",
  shape = "circle",
  className,
  ...props
}: AvatarProps) {
  const [errored, setErrored] = React.useState(false);
  const palette =
    palettes[
      Math.abs([...name].reduce((a, c) => a + c.charCodeAt(0), 0)) % palettes.length
    ];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-bold",
        shape === "circle" ? "rounded-full" : "rounded-field",
        sizes[size],
        palette,
        className
      )}
      {...props}
    >
      {src && !errored ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        initialsOf(name)
      )}
    </span>
  );
}
