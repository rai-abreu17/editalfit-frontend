"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECT_STATUS } from "@/lib/data";
import { DIAG_DOCS, DOC_STATUS } from "@/lib/diag";
import { scoreTone } from "@/components/ScoreRing";
import { IconAlert, IconArrow, IconArrowUp, IconBack, IconCal, IconChevRight, IconClock, IconDoc, IconLayers, IconTarget, IconTrash, StatusIcon } from "@/components/icons";
import styles from "./projeto.module.css";

const PROJECT = {
  name: "Sensor IoT para qualidade do ar urbano",
  edital: "FAPEMA · INOVA MARANHÃO 2026",
  status: "updated" as const,
  stage: { label: "Ideação", tag: "TRL 1–3" },
  deadlineLabel: "14 jun 2026",
  daysLeft: 21,
  versions: [
    { id: "v3", version: 3, dateLabel: "14 jun 2026", timeLabel: "14:32", score: 72, prevScore: 64 },
    { id: "v2", version: 2, dateLabel: "10 jun 2026", timeLabel: "09:18", score: 64, prevScore: 58 },
    { id: "v1", version: 1, dateLabel: "02 jun 2026", timeLabel: "16:05", score: 58, prevScore: null as number | null },
  ],
};

function ProjetoInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [confirmDelete, setConfirmDelete] = useState(sp.get("delete") === "1");
  const status = PROJECT_STATUS[PROJECT.status];
  const docsDone = DIAG_DOCS.filter((d) => d.status === "entregue").length;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/inicio" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Detalhes do projeto</span>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <IconDoc /> {PROJECT.edital}
        </div>
        <h1 className={styles.heroName}>{PROJECT.name}</h1>
        <div className={styles.heroMeta}>
          <span className={`badge badge--${status.tone}`}>
            <span className="pip" />
            {status.label}
          </span>
          {PROJECT.stage && (
            <span className="pill">
              <IconLayers /> {PROJECT.stage.label} · {PROJECT.stage.tag}
            </span>
          )}
          <span className="pill">
            <IconCal /> Prazo&nbsp;<strong>{PROJECT.deadlineLabel}</strong>&nbsp;· {PROJECT.daysLeft} dias
          </span>
        </div>
      </div>

      <div className={styles.columns}>
        <section>
          <div className="section-head">
            <span className="section-title">
              <IconClock /> Histórico de análises <span className="count">{PROJECT.versions.length}</span>
            </span>
            <span className={styles.aside}>recente → antiga</span>
          </div>
          <div className={styles.timeline}>
            {PROJECT.versions.map((v, i) => {
              const tone = scoreTone(v.score);
              const delta = v.prevScore == null ? null : v.score - v.prevScore;
              return (
                <div key={v.id} className={`${styles.version} ${i === 0 ? styles.versionLatest : ""}`}>
                  <div className={styles.rail} aria-hidden="true">
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.versionCard}>
                    <div className={styles.versionHead}>
                      <span className={styles.versionLabel}>
                        Versão {v.version}
                        {i === 0 && <span className={styles.latestTag}>Atual</span>}
                      </span>
                      <span className={`${styles.score} ${styles[tone]}`}>
                        <span className={styles.scoreNum}>{v.score}</span>
                        <span className={styles.scoreDen}>/100</span>
                      </span>
                    </div>
                    <div className={styles.versionMeta}>
                      <span className={styles.versionDate}>
                        <IconCal /> {v.dateLabel} · {v.timeLabel}
                      </span>
                      {delta == null && <span className={`${styles.delta} ${styles.flat}`}>1ª análise</span>}
                      {delta === 0 && <span className={`${styles.delta} ${styles.flat}`}>sem variação</span>}
                      {delta != null && delta !== 0 && (
                        <span className={`${styles.delta} ${delta > 0 ? styles.up : styles.down}`}>
                          <span style={{ display: "inline-flex", transform: delta > 0 ? "none" : "rotate(180deg)" }}>
                            <IconArrowUp />
                          </span>
                          {delta > 0 ? "+" : "−"}
                          {Math.abs(delta)} pts
                        </span>
                      )}
                    </div>
                    <Link href="/diagnostico" className={styles.versionView}>
                      Ver diagnóstico desta versão <IconChevRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="section-head">
            <span className="section-title">
              <IconDoc /> Documentos <span className="count">{DIAG_DOCS.length}</span>
            </span>
            <span className={styles.aside}>
              <strong>{docsDone}</strong>/{DIAG_DOCS.length} entregues
            </span>
          </div>
          <div className={styles.docs}>
            {DIAG_DOCS.map((d) => {
              const meta = DOC_STATUS[d.status];
              return (
                <div key={d.id} className={styles.doc}>
                  <span className={`${styles.statusIcon} ${styles[meta.icon]}`}>
                    <StatusIcon status={meta.icon} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={styles.docName}>{d.name}</div>
                    <div className={styles.docMeta}>{d.meta}</div>
                  </div>
                  <span className={`badge badge--${meta.icon}`}>{meta.tag}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className={styles.bottomBar}>
        <Link href="/novo-projeto/upload?modo=edicao" className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }}>
          Editar / Enviar documentos
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </Link>
        <Link href="/diagnostico" className="btn btn--secondary">
          <IconTarget width={14} height={14} /> Último diagnóstico
        </Link>
        <button type="button" className={styles.delete} onClick={() => setConfirmDelete(true)}>
          <IconTrash /> Excluir
        </button>
      </div>

      {confirmDelete && (
        <div className="overlay" onClick={() => setConfirmDelete(false)}>
          <div className={styles.confirm} role="alertdialog" aria-label="Confirmar exclusão" onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <IconAlert />
            </div>
            <h2 className={styles.confirmTitle}>Excluir este projeto?</h2>
            <p className={styles.confirmText}>
              Você vai remover <strong>{PROJECT.name}</strong>, seus documentos e todo o histórico de diagnósticos. Esta ação <strong>não pode ser desfeita</strong>.
            </p>
            <div className={styles.confirmFoot}>
              <button type="button" className="btn btn--secondary" onClick={() => setConfirmDelete(false)}>
                Cancelar
              </button>
              <button type="button" className="btn btn--danger" onClick={() => router.push("/inicio")}>
                Excluir projeto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjetoPage() {
  return (
    <Suspense fallback={null}>
      <ProjetoInner />
    </Suspense>
  );
}
