"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PROGRESS,
  STORAGE_KEY,
  xpFor,
  type Progress,
} from "@/lib/learn";
import { IconBolt, IconFlame } from "@/components/icons";

export function AprenderTopbarStats() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {}
    }
  }, []);

  if (!mounted) return null;

  const xp = xpFor(progress.completed);

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", marginRight: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--warn-500)", fontWeight: 800 }}>
        <IconBolt width={20} height={20} />
        {xp}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--danger-500)", fontWeight: 800 }}>
        <IconFlame width={20} height={20} />
        {progress.streak}
      </div>
    </div>
  );
}
