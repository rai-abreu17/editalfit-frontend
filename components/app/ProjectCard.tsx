"use client";

import { useRouter } from "next/navigation";
import type { Project } from "@/lib/data";
import { PROJECT_STATUS } from "@/lib/data";
import { IconArrow, IconClock, IconCopy, IconDoc, IconStar, IconTrash } from "@/components/icons";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const status = PROJECT_STATUS[project.status];
  const open = () => router.push(`/projetos/${project.id}`);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className={styles.actions}>
        <button className={styles.action} type="button" aria-label="Favoritar" onClick={stop}>
          <IconStar />
        </button>
        <button className={styles.action} type="button" aria-label="Duplicar" onClick={stop}>
          <IconCopy />
        </button>
        <button className={`${styles.action} ${styles.danger}`} type="button" aria-label="Excluir" onClick={stop}>
          <IconTrash />
        </button>
      </div>

      <div className={styles.head}>
        <div style={{ minWidth: 0 }}>
          <div className={styles.name}>{project.name}</div>
          <div className={styles.edital}>
            <IconDoc />
            {project.edital}
          </div>
        </div>
        <span className={styles.statusWrap}>
          <span className={`badge badge--${status.tone}`}>
            <span className="pip" />
            {status.label}
          </span>
        </span>
      </div>

      <div className={styles.foot}>
        <span className={styles.meta}>
          <IconClock width={14} height={14} />
          {project.lastActivity}
        </span>
        <span className={styles.cta}>
          Ver <IconArrow width={14} height={14} />
        </span>
      </div>
    </div>
  );
}
