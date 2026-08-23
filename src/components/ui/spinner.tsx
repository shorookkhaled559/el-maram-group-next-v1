import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  /** Tailwind size class, e.g. "size-4". Defaults to "size-4". */
  size?: string;
}

export function Spinner({ className, size = "size-4" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        size,
        "inline-block shrink-0 animate-spin rounded-full",
        "border-2 border-current border-t-transparent opacity-80",
        className,
      )}
    />
  );
}
