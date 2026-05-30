interface BrandProps {
  light?: boolean;
  size?: number;
  className?: string;
}

/** EditalFit wordmark: sapphire glyph tile + name. */
export function Brand({ light = false, size = 18, className }: BrandProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.02em",
        color: light ? "#fff" : "var(--ink-900)",
      }}
    >
      <span className="brandmark" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/editalfit-logo.png" alt="" />
      </span>
      EditalFit
    </span>
  );
}
