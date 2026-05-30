import { ScoreRing } from "./ScoreRing";
import styles from "./ProductPeek.module.css";

interface ProductPeekProps {
  float?: boolean;
}

/** Floating diagnostic preview card shown on dark surfaces (welcome hero, auth stage). */
export function ProductPeek({ float = true }: ProductPeekProps) {
  return (
    <div className={`${styles.peek} ${float ? styles.float : ""}`}>
      <div className={styles.head}>
        <div>
          <div className={styles.tag}>FAPEMA · Inova MA 2026</div>
          <div className={styles.title}>Programa Centelha — Ideação</div>
        </div>
        <span className={styles.version}>v3</span>
      </div>

      <div className={styles.scoreRow}>
        <ScoreRing value={72} size={64} stroke={6} tone="warn" dark glow bigSize={22} smallSize={9} />
        <div>
          <span className={styles.label}>
            <span className={styles.labelPip} />
            Aderência parcial
          </span>
          <div className={styles.summary}>Base técnica sólida; reforce mercado.</div>
        </div>
      </div>

      <div className={styles.crits}>
        <div className={styles.crit}>
          <span className={`${styles.pip} ${styles.ok}`} /> Inovação
        </div>
        <div className={styles.crit}>
          <span className={`${styles.pip} ${styles.warn}`} /> Mercado
        </div>
        <div className={styles.crit}>
          <span className={`${styles.pip} ${styles.ok}`} /> Time
        </div>
        <div className={styles.crit}>
          <span className={`${styles.pip} ${styles.danger}`} /> Orçamento
        </div>
      </div>
    </div>
  );
}
