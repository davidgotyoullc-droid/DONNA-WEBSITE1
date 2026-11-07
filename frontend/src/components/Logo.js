export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5" data-testid="brand-logo">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#D96B43" />
        <g fill="#FDFBF7">
          <ellipse cx="32" cy="40" rx="9" ry="7.5" />
          <ellipse cx="20.5" cy="29" rx="4" ry="5" transform="rotate(-14 20.5 29)" />
          <ellipse cx="28.5" cy="24.5" rx="4" ry="5.4" />
          <ellipse cx="36.5" cy="24.5" rx="4" ry="5.4" />
          <ellipse cx="44.5" cy="29" rx="4" ry="5" transform="rotate(14 44.5 29)" />
        </g>
      </svg>
      <span className="leading-none">
        <span className={`font-serif-display block text-lg font-semibold tracking-tight ${light ? "text-[#FDFBF7]" : "text-[#1C2A39]"}`}>
          Donna Devlin
        </span>
        <span className={`font-mono-accent block text-[10px] tracking-[0.35em] ${light ? "text-[#FDFBF7]/70" : "text-[#D96B43]"}`}>
          DESIGNS
        </span>
      </span>
    </span>
  );
}
