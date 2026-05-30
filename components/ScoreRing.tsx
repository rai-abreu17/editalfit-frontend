"use client";

import { useEffect, useState } from "react";

export type Tone = "ok" | "warn" | "danger" | "brand";

const TONE_COLOR: Record<Tone, string> = {
  ok: "var(--ok-500)",
  warn: "var(--warn-500)",
  danger: "var(--danger-500)",
  brand: "var(--brand-500)",
};

export function scoreTone(score: number): Tone {
  if (score >= 75) return "ok";
  if (score >= 50) return "warn";
  return "danger";
}

export function scoreLabel(score: number): string {
  if (score >= 75) return "Alta aderência";
  if (score >= 50) return "Aderência parcial";
  return "Baixa aderência";
}

interface ScoreRingProps {
  value: number;
  size?: number;
  stroke?: number;
  tone?: Tone;
  animate?: boolean;
  glow?: boolean;
  dark?: boolean;
  track?: string;
  bigSize?: number;
  smallSize?: number;
}

export function ScoreRing({
  value,
  size = 116,
  stroke = 9,
  tone,
  animate = true,
  glow = false,
  dark = false,
  track,
  bigSize,
  smallSize,
}: ScoreRingProps) {
  const [v, setV] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate) {
      setV(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setV(Math.round(e * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);

  const t = tone ?? scoreTone(value);
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const offset = C - (v / 100) * C;
  const color = TONE_COLOR[t];
  const trackColor = track ?? (dark ? "rgba(255,255,255,0.08)" : "rgba(13,46,107,0.08)");

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.05s linear",
            filter: glow ? `drop-shadow(0 0 6px ${color})` : undefined,
          }}
        />
      </svg>
      <div className="score-ring__value">
        <div className="big" style={{ fontSize: bigSize, color: dark ? "#fff" : undefined }}>
          {v}
        </div>
        <div className="small" style={{ fontSize: smallSize, color: dark ? "rgba(255,255,255,0.85)" : undefined }}>
          de 100
        </div>
      </div>
    </div>
  );
}
