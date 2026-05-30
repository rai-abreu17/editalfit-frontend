"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DIAG_CRITERIA,
  DIAG_DOCS,
  DIAG_PROJECT,
  DIAG_PROPOSAL,
  DIAG_TEAM_MEMBERS,
  DIAG_TEAM_REQUIRED,
  DIAG_LOADING_STEPS,
  DOC_STATUS,
  scoreToneInfo,
  type DiagCriterion,
} from "@/lib/diag";
import {
  IconArrow,
  IconArrowUp,
  IconBack,
  IconBell,
  IconBook,
  IconCal,
  IconCheck,
  IconChevDown,
  IconChevRight,
  IconClose,
  IconCopy,
  IconDoc,
  IconDownload,
  IconExternal,
  IconLink,
  IconPeople,
  IconQuote,
  IconShare,
  IconShield,
  IconSparkles,
  StatusIcon,
} from "@/components/icons";
import styles from "./diagnostico.module.css";

const TABS = ["Critérios", "Documentos", "Equipe"];

function DiagInner() {
  const sp = useSearchParams();
  const loading = sp.get("state") === "loading";
  const tabParam = sp.get("tab");
  const initialTab = tabParam === "documentos" ? 1 : tabParam === "equipe" ? 2 : 0;

  if (loading) return <LoadingState slow={sp.get("slow") === "1"} />;
  return <Result initialTab={initialTab} />;
}

function Result({ initialTab }: { initialTab: number }) {
  const project = DIAG_PROJECT;
  const tone = scoreToneInfo(project.score);
  const r = 50;
  const C = 2 * Math.PI * r;

  const [score, setScore] = useState(0);
  const [tab, setTab] = useState(initialTab);
  const [openCrit, setOpenCrit] = useState<DiagCriterion | null>(null);
  const [activeCrit, setActiveCrit] = useState<string | null>(null);
  const [source, setSource] = useState<{ title: string; ref: string; quote: string } | null>(null);
  const [share, setShare] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setScore(Math.round((1 - Math.pow(1 - t, 3)) * project.score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [project.score]);

  const docsDone = DIAG_DOCS.filter((d) => d.status === "entregue").length;
  const delta = project.score - project.prevScore;
  const byId = useMemo(() => Object.fromEntries(DIAG_CRITERIA.map((c) => [c.id, c])), []);

  const openCriterion = (c: DiagCriterion) => {
    setActiveCrit(c.id);
    setOpenCrit(c);
  };
  const exportPdf = () => {
    setToast("Diagnóstico exportado em PDF");
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/inicio" className={styles.iconBtn} aria-label="Voltar">
          <IconBack />
        </Link>
        <div className={styles.headerTitle}>
          <div className={styles.headerSub}>Diagnóstico · V{project.version}</div>
          <div className={styles.headerName}>{project.editalShort}</div>
        </div>
        <button type="button" className={styles.iconBtn} aria-label="Compartilhar" onClick={() => setShare(true)}>
          <IconShare />
        </button>
      </header>

      <div className={styles.context}>
        <div className={styles.contextMeta}>{project.edital}</div>
        <h1 className={styles.contextName}>{project.name}</h1>
        <div className={styles.pills}>
          <span className="pill">
            <IconCal />
            Prazo&nbsp;<strong>{project.deadlineLabel}</strong>&nbsp;· {project.daysLeft} dias
          </span>
          <span className="pill">
            <IconDoc />
            Versão&nbsp;<strong>{project.version}</strong>&nbsp;de {project.totalVersions}
          </span>
        </div>
      </div>

      {/* Área 1 — score */}
      <div className={styles.hero}>
        <div className={styles.ring}>
          <svg width="124" height="124" viewBox="0 0 116 116">
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={tone.from} />
                <stop offset="100%" stopColor={tone.to} />
              </linearGradient>
            </defs>
            <circle cx="58" cy="58" r={r} fill="none" stroke="#EAF1FB" strokeWidth="10" />
            <circle cx="58" cy="58" r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (score / 100) * C} transform="rotate(-90 58 58)" style={{ filter: `drop-shadow(0 0 8px ${tone.glow})` }} />
          </svg>
          <div className={styles.ringValue}>
            <div className={styles.ringBig}>{score}</div>
            <div className={styles.ringSmall}>de 100</div>
          </div>
        </div>
        <div className={styles.heroInfo}>
          <div className={styles.heroLabels}>
            <span className={`badge badge--${tone.tone}`}>
              <span className="pip" /> {tone.label}
            </span>
            {delta !== 0 && (
              <span className={styles.evolution}>
                <IconArrowUp /> {delta > 0 ? "+" : ""}
                {delta} pts
              </span>
            )}
          </div>
          <p className={styles.heroSummary}>
            Base técnica sólida e <span className={styles.mark}>time alinhado</span>. Reforce o mercado e anexe o orçamento para subir de faixa.
          </p>
        </div>
      </div>

      {/* tabs */}
      <div className={styles.tabs} role="tablist">
        <span className={styles.tabIndicator} style={{ transform: `translateX(${tab * 100}%)` }} />
        {TABS.map((label, i) => (
          <button key={label} type="button" role="tab" aria-selected={tab === i} className={`${styles.tab} ${tab === i ? styles.tabActive : ""}`} onClick={() => setTab(i)}>
            {label}
            {i === 0 && <span className={styles.tabCount}>{DIAG_CRITERIA.length}</span>}
            {i === 1 && <span className={styles.tabCount}>{docsDone}/{DIAG_DOCS.length}</span>}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className={styles.critLayout}>
          <div className={styles.critList}>
            {DIAG_CRITERIA.map((c) => (
              <button key={c.id} type="button" className={`${styles.critCard} ${activeCrit === c.id ? styles.critActive : ""}`} onClick={() => openCriterion(c)}>
                <span className={`${styles.statusIcon} ${styles[c.status]}`}>
                  <StatusIcon status={c.status} />
                </span>
                <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                  <div className={styles.critName}>{c.name}</div>
                  <div className={styles.critDetail}>{c.detail}</div>
                </div>
                <IconChevRight style={{ color: "var(--ink-400)", flexShrink: 0 }} />
              </button>
            ))}
          </div>

          <div className={styles.proposal}>
            <div className={styles.proposalHead}>
              <span className={styles.proposalTitle}>
                <IconQuote /> Proposta analisada
              </span>
              <span className={styles.proposalHint}>clique nos trechos</span>
            </div>
            <div className={styles.proposalBody}>
              {DIAG_PROPOSAL.map((para, pi) => (
                <p key={pi}>
                  {para.map((seg, si) => {
                    if ("t" in seg) return <span key={si}>{seg.t}</span>;
                    const c = byId[seg.crit];
                    if (!c) return null;
                    return (
                      <button key={si} type="button" className={`${styles.hl} ${styles[`hl_${c.status}`]} ${activeCrit === c.id ? styles.hlActive : ""}`} onClick={() => openCriterion(c)}>
                        {c.excerpt}
                      </button>
                    );
                  })}
                </p>
              ))}
            </div>
            <div className={styles.legend}>
              <span><span className={`${styles.swatch} ${styles.ok}`} /> OK</span>
              <span><span className={`${styles.swatch} ${styles.warn}`} /> Atenção</span>
              <span><span className={`${styles.swatch} ${styles.danger}`} /> Problema</span>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <>
          <div className={styles.note}>
            <IconDoc />
            <span>Documentos exigidos pelo edital. Itens faltantes não bloqueiam — a IA os reporta como parte do diagnóstico.</span>
          </div>
          <div className={styles.docGrid}>
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
                    <button type="button" className={styles.docSource} onClick={() => setSource({ title: d.name, ref: d.ref, quote: d.editalQuote })}>
                      <IconBook /> Ver no edital {d.ref}
                    </button>
                  </div>
                  <span className={`badge badge--${meta.icon}`}>{meta.tag}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === 2 && (
        <>
          <div className={styles.teamReq}>
            <div className={styles.teamReqHead}>
              <IconPeople /> Perfil de equipe exigido
            </div>
            {DIAG_TEAM_REQUIRED.map((rq) => (
              <div key={rq.id} className={styles.teamReqRow}>
                <span className={`${styles.reqPip} ${styles[rq.status]}`}>
                  <StatusIcon status={rq.status} />
                </span>
                <span style={{ flex: 1 }}>{rq.text}</span>
                <button type="button" className={styles.refChip} onClick={() => setSource({ title: rq.text, ref: rq.ref, quote: rq.editalQuote })}>
                  {rq.ref}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.docGrid}>
            {DIAG_TEAM_MEMBERS.map((m) => (
              <div key={m.id} className={styles.member}>
                <div className={styles.memberHead}>
                  <span className="avatar" style={{ width: 38, height: 38, fontSize: 13 }}>
                    {m.initials}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={styles.memberName}>{m.name}</div>
                    <div className={styles.memberRole}>{m.role}</div>
                  </div>
                  <span className={`badge badge--${m.match === "ok" ? "ok" : "warn"}`}>{m.match === "ok" ? "Aderente" : "Gap"}</span>
                </div>
                <div className={styles.gaps}>
                  {m.gaps.map((g, gi) => (
                    <div key={gi} className={styles.gap}>
                      <span className={`${styles.gapPip} ${styles[g.status]}`}>
                        <StatusIcon status={g.status} />
                      </span>
                      <span style={{ flex: 1 }}>{g.text}</span>
                      {g.ref && (
                        <button type="button" className={styles.refChip} onClick={() => setSource({ title: `${m.name} · requisito`, ref: g.ref!, quote: DIAG_TEAM_REQUIRED.find((r) => r.ref === g.ref)?.editalQuote ?? "" })}>
                          {g.ref}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.secondaryActions}>
        <button type="button" className="btn btn--secondary" onClick={exportPdf}>
          <IconDownload /> Exportar PDF
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => setShare(true)}>
          <IconShare /> Compartilhar
        </button>
        <Link href="/match" className={styles.moreEditais}>
          Ver outros editais onde esse projeto se encaixa <IconChevRight />
        </Link>
      </div>

      <div className={styles.bottomBar}>
        <Link href="/novo-projeto/upload?modo=edicao" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
          Editar documentos e analisar novamente
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </Link>
      </div>

      {openCrit && <CommentModal criterion={openCrit} onClose={() => setOpenCrit(null)} />}
      {source && <SourceModal {...source} onClose={() => setSource(null)} />}
      {share && <ShareModal onClose={() => setShare(false)} />}
      {toast && (
        <div className={styles.toast} role="status">
          <span style={{ color: "#6DD8A0", display: "grid", placeItems: "center" }}>
            <IconCheck />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

function CommentModal({ criterion, onClose }: { criterion: DiagCriterion; onClose: () => void }) {
  const [showSource, setShowSource] = useState(false);
  return (
    <div className="overlay" onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-label={`Comentário · ${criterion.name}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <span className={`badge badge--${criterion.status === "ok" ? "ok" : criterion.status === "warn" ? "warn" : "danger"}`}>
            <span className="pip" /> {criterion.tag}
          </span>
          <span className={styles.modalCrit}>{criterion.name}</span>
          <button type="button" className={styles.modalClose} aria-label="Fechar" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <div className={`${styles.excerpt} ${styles[`hl_${criterion.status}`]}`}>
          <span className={styles.excerptTag}>
            <IconQuote /> Trecho da proposta
          </span>
          “{criterion.excerpt}”
        </div>
        <div className={styles.aiComment}>
          <span className={styles.aiIcon}>
            <IconSparkles />
          </span>
          <div>
            <div className={styles.aiLabel}>Comentário da IA</div>
            <p>{criterion.comment}</p>
          </div>
        </div>
        <button type="button" className={styles.sourceBtn} aria-expanded={showSource} onClick={() => setShowSource((v) => !v)}>
          <span className={styles.sourceIcon}>
            <IconBook />
          </span>
          <span style={{ flex: 1, textAlign: "left" }}>
            Ver no edital <span className={styles.sourceRef}>{criterion.editalRef}</span>
          </span>
          <IconChevDown style={{ transform: showSource ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }} />
        </button>
        {showSource && (
          <div className={styles.sourceQuote}>
            <div className={styles.sourceQuoteHead}>
              <IconBook /> Trecho do edital que fundamenta
            </div>
            <p>“{criterion.editalQuote}”</p>
            <span className={styles.sourceQuoteRef}>{criterion.editalRef}</span>
            <button type="button" className={styles.sourceExternal}>
              Abrir edital oficial <IconExternal />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SourceModal({ title, ref: editalRef, quote, onClose }: { title: string; ref: string; quote: string; onClose: () => void }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-label={`Fonte no edital · ${editalRef}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <span className="badge badge--brand">
            <span className="pip" /> Requisito do edital
          </span>
          <button type="button" className={styles.modalClose} aria-label="Fechar" onClick={onClose} style={{ marginLeft: "auto" }}>
            <IconClose />
          </button>
        </div>
        <div className={styles.modalCrit} style={{ marginBottom: 10 }}>{title}</div>
        <div className={styles.sourceQuote} style={{ borderTop: 0, paddingTop: 0 }}>
          <div className={styles.sourceQuoteHead}>
            <IconBook /> Trecho do edital que fundamenta
          </div>
          <p>“{quote}”</p>
          <span className={styles.sourceQuoteRef}>{editalRef}</span>
          <button type="button" className={styles.sourceExternal}>
            Abrir edital oficial <IconExternal />
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareModal({ onClose }: { onClose: () => void }) {
  const link = "editalfit.app/d/centelha-ma-7f3a";
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard?.writeText("https://" + link);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-label="Compartilhar diagnóstico" onClick={(e) => e.stopPropagation()}>
        <div className={styles.shareHead}>
          <span className={styles.shareIcon}>
            <IconLink />
          </span>
          <span className={styles.modalCrit}>Compartilhar diagnóstico</span>
          <button type="button" className={styles.modalClose} aria-label="Fechar" onClick={onClose} style={{ marginLeft: "auto" }}>
            <IconClose />
          </button>
        </div>
        <p className={styles.shareSub}>Gere um link de visualização somente leitura. Quem receber consegue ver o diagnóstico sem precisar criar conta.</p>
        <div className={styles.shareField}>
          <span className={styles.shareLink}>{link}</span>
          <button type="button" className={`${styles.shareCopy} ${copied ? styles.shareCopied : ""}`} onClick={copy}>
            {copied ? <><IconCheck /> Copiado</> : <><IconCopy /> Copiar</>}
          </button>
        </div>
        <div className={styles.shareNote}>
          <IconShield /> Link somente leitura. Não dá acesso à edição nem aos seus arquivos.
        </div>
      </div>
    </div>
  );
}

function LoadingState({ slow: forceSlow }: { slow: boolean }) {
  const [active, setActive] = useState(0);
  const [slow, setSlow] = useState(forceSlow);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const step = setInterval(() => {
      setActive((a) => {
        const next = Math.min(a + 1, DIAG_LOADING_STEPS.length - 1);
        if (next === DIAG_LOADING_STEPS.length - 1) clearInterval(step);
        return next;
      });
    }, 1100);
    let slowT: ReturnType<typeof setTimeout>;
    if (!forceSlow) slowT = setTimeout(() => setSlow(true), 5200);
    return () => {
      clearInterval(step);
      clearTimeout(slowT);
    };
  }, [forceSlow]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/novo-projeto/upload" className={styles.iconBtn} aria-label="Voltar">
          <IconBack />
        </Link>
        <div className={styles.headerTitle}>
          <div className={styles.headerSub}>Diagnóstico</div>
          <div className={styles.headerName}>{DIAG_PROJECT.editalShort}</div>
        </div>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.loading} role="status" aria-live="polite">
        <div className={styles.orb}>
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" className="spin">
            <circle cx="48" cy="48" r="40" stroke="#DCE6F6" strokeWidth="7" />
            <path d="M48 8a40 40 0 0136 24" stroke="var(--brand-700)" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <span className={styles.orbCore}>
            <IconSparkles />
          </span>
        </div>
        <h2 className={styles.loadingTitle}>Analisando sua proposta</h2>
        <p className={styles.loadingSub}>A IA está cruzando seus documentos com os critérios do edital. Isso costuma levar menos de um minuto.</p>
        <div className={styles.steps}>
          {DIAG_LOADING_STEPS.map((label, i) => (
            <div key={label} className={`${styles.step} ${i < active ? styles.stepDone : i === active ? styles.stepActive : ""}`}>
              <span className={styles.stepPip}>{i < active ? <IconCheck /> : null}</span>
              {label}
            </div>
          ))}
        </div>
        {slow && (
          <div className={styles.notice} role="alert">
            <div className={styles.noticeHead}>
              <IconBell /> Está levando mais que o esperado
            </div>
            <p>Você não precisa esperar aqui. Pode sair desta tela que avisamos assim que o diagnóstico ficar pronto.</p>
            <button type="button" className={`${styles.notify} ${armed ? styles.notifyArmed : ""}`} onClick={() => setArmed(true)}>
              {armed ? <><IconCheck /> Avisaremos você</> : <><IconBell /> Me notificar quando estiver pronto</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiagnosticoPage() {
  return (
    <Suspense fallback={null}>
      <DiagInner />
    </Suspense>
  );
}
