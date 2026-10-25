interface IconProps {
  className?: string;
}

const base = "inline-block h-[1em] w-[1em] shrink-0";

export function ArrowDown({ className = "" }: IconProps) {
  return (
    <svg
      className={`${base} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 2v10.5M3.5 8.5 8 13l4.5-4.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg
      className={`${base} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 8h10.5M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg
      className={`${base} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 13 13 3M5 3h8v8" strokeLinecap="square" />
    </svg>
  );
}
