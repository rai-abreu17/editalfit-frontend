"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TOTAL_LESSONS,
  DEFAULT_PROGRESS,
  STORAGE_KEY,
  currentLessonId,
  lessonById,
  xpFor,
  levelInfo,
  type Progress,
} from "@/lib/learn";
import {
  IconBolt,
  IconChevRight,
  IconFlame,
  IconPlay,
  IconSparkles,
  IconTrophy,
} from "@/components/icons";
import styles from "@/app/(app)/aprender/aprender.module.css";

export function AprenderHero() {
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

  const completed = progress.completed;
  const doneCount = completed.length;
  const xp = xpFor(completed);
  const lvl = levelInfo(xp);
  const pct = Math.round((doneCount / TOTAL_LESSONS) * 100);
  const curId = currentLessonId(completed);
  const curLesson = curId ? lessonById(curId) : null;
  const trailDone = curId === null;
  const started = doneCount > 0;

  return (
    <section className={styles.hero} style={{ marginBottom: 32 }}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroMain}>
        <span className={styles.eyebrow}>
          <IconSparkles /> Modo Aprender
        </span>
        <h1 className={styles.h1}>Trilha de Aprendizado</h1>
        <p className={styles.sub}>
          Aprenda, passo a passo, a entender editais e submeter projetos mais fortes — do primeiro documento à revisão final.
        </p>

        <div className={styles.progressLine}>
          <div className={styles.progressBar}>
            <span className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressLabel}>
            <strong>{doneCount}</strong> de {TOTAL_LESSONS} lições
          </span>
        </div>

        <div className={styles.heroActions}>
          {trailDone ? (
            <span className={styles.heroDone}>
              <IconTrophy width={18} height={18} /> Trilha concluída!
            </span>
          ) : (
            <Link href="/aprender" className={styles.continueBtn}>
              <IconPlay width={16} height={16} />
              <span className={styles.continueText}>
                <span className={styles.continueKicker}>{started ? "Continuar" : "Começar agora"}</span>
                <span className={styles.continueName}>{curLesson?.title}</span>
              </span>
              <span className={styles.continueArrow}>
                <IconChevRight />
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.heroStats}>
        <div className={styles.stat}>
          <span className={`${styles.statIcon} ${styles.statXp}`}>
            <IconBolt />
          </span>
          <span className={styles.statBody}>
            <span className={styles.statValue}>{xp} XP</span>
            <span className={styles.statLabel}>Nível {lvl.level}</span>
          </span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statIcon} ${styles.statStreak}`}>
            <IconFlame />
          </span>
          <span className={styles.statBody}>
            <span className={styles.statValue}>{progress.streak} dias</span>
            <span className={styles.statLabel}>Sequência</span>
          </span>
        </div>
      </div>
    </section>
  );
}
