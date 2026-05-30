import Link from "next/link";
import { getEditalDetail } from "@/lib/editalDetail";
import { deadlineLabel, deadlineTone } from "@/lib/data";
import {
  IconArrow,
  IconAward,
  IconBook,
  IconCal,
  IconDoc,
  IconExternal,
  IconLayers,
  IconScale,
  IconTarget,
} from "@/components/icons";
import styles from "./edital.module.css";

export default async function EditalDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const edital = getEditalDetail(id);
  const tone = deadlineTone(edital.daysLeft);
  const deadline = deadlineLabel(edital.daysLeft, edital.deadlineLabel);
  const totalWeight = edital.criteria.reduce((acc, c) => acc + c.weight, 0);
  // "Saiba mais" pode vir de T07 ou T15 → o "Voltar" retorna à origem.
  const backHref = from === "match" ? "/match" : "/novo-projeto";
  // T10 condicional (fluxo 3.2): só passa por /etapa se o edital tiver etapas/categorias.
  const selectHref = edital.hasStages ? "/novo-projeto/etapa" : "/novo-projeto/upload?total=2";

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href={backHref} className={styles.back} aria-label="Voltar">
          <IconArrow style={{ transform: "rotate(180deg)" }} />
        </Link>
        <span className="eyebrow">Detalhes do edital</span>
      </header>

      <div className={styles.hero}>
        <div className={styles.agency}>
          <IconDoc /> {edital.agency}
        </div>
        <h1 className={styles.name}>{edital.name}</h1>
        <div className={styles.pills}>
          <span className={`badge badge--${tone}`}>
            <span className="pip" />
            {deadline}
          </span>
          <span className="pill">
            <IconCal />
            Prazo final&nbsp;<strong>{edital.deadlineLabel}</strong>
          </span>
          <span className="pill">
            <IconAward />
            {edital.modality}
          </span>
          <span className="pill">
            <IconTarget />
            {edital.scope}
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className="section-title">
          <IconTarget /> Objetivo do edital
        </h2>
        <p className={styles.objective}>{edital.objective}</p>
      </section>

      <section className={styles.section}>
        <div className="section-head">
          <span className="section-title">
            <IconScale /> Critérios de avaliação <span className="count">{edital.criteria.length}</span>
          </span>
          {totalWeight > 0 && <span className={styles.sigma}>Σ {totalWeight}%</span>}
        </div>
        <div className={styles.critGrid}>
          {edital.criteria.map((c) => (
            <div key={c.id} className={styles.critCard} tabIndex={0}>
              <div className={styles.critHead}>
                <div style={{ minWidth: 0 }}>
                  <div className={styles.critName}>{c.name}</div>
                  <div className={styles.critDesc}>{c.desc}</div>
                </div>
                <span className={styles.critWeight}>Peso {c.weight}%</span>
              </div>
              <div className={styles.critBar} aria-hidden="true">
                <span style={{ width: `${c.weight}%` }} />
              </div>
              <span className={styles.critSource}>
                <IconDoc /> {c.source}
              </span>
            </div>
          ))}
        </div>
      </section>

      {edital.stages && (
        <section className={styles.section}>
          <div className="section-head">
            <span className="section-title">
              <IconLayers /> Etapas do edital <span className="count">{edital.stages.length}</span>
            </span>
          </div>
          <div className={styles.stages}>
            {edital.stages.map((s) => (
              <div key={s.id} className={`${styles.stage} ${s.status === "current" ? styles.stageCurrent : ""} ${s.status === "done" ? styles.stageDone : ""}`}>
                <div className={styles.stageNum}>{s.num}</div>
                <div className={styles.stageBody}>
                  <div className={styles.stageLabel}>
                    {s.label}
                    {s.status === "current" && <span className="badge badge--brand">Aberta</span>}
                    {s.status === "done" && <span className="badge badge--ok">Concluída</span>}
                  </div>
                  <div className={styles.stageDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {edital.categories && (
        <section className={styles.section}>
          <div className="section-head">
            <span className="section-title">
              <IconLayers /> Categorias disponíveis <span className="count">{edital.categories.length}</span>
            </span>
          </div>
          <div className={styles.cats}>
            {edital.categories.map((c) => (
              <span key={c.id} className={styles.cat}>
                {c.label}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className="section-title">
          <IconExternal /> Documentos oficiais
        </h2>
        <div className={styles.links}>
          <a className={styles.link} href={edital.officialUrl} target="_blank" rel="noopener noreferrer">
            <span className={styles.linkIcon}>
              <IconDoc />
            </span>
            <span className={styles.linkBody}>
              <span className={styles.linkTitle}>Acessar edital oficial</span>
              <span className={styles.linkSub}>{edital.officialUrl}</span>
            </span>
            <IconExternal style={{ color: "var(--ink-400)" }} />
          </a>
          {edital.evaluatorUrl && (
            <a className={styles.link} href={edital.evaluatorUrl} target="_blank" rel="noopener noreferrer">
              <span className={`${styles.linkIcon} ${styles.linkIconAccent}`}>
                <IconBook />
              </span>
              <span className={styles.linkBody}>
                <span className={styles.linkTitle}>Ver manual do avaliador</span>
                <span className={styles.linkSub}>PDF · rubricas e pontuação detalhada</span>
              </span>
              <IconExternal style={{ color: "var(--ink-400)" }} />
            </a>
          )}
        </div>
      </section>

      <div className={styles.bottomBar}>
        <Link href={backHref} className="btn btn--secondary">
          <IconArrow style={{ transform: "rotate(180deg)" }} width={14} height={14} /> Voltar
        </Link>
        <Link href={selectHref} className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }}>
          Selecionar este edital
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
