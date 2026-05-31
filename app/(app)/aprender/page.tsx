"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MODULES,
  LESSON_ORDER,
  TOTAL_LESSONS,
  DEFAULT_PROGRESS,
  EMPTY_PROGRESS,
  STORAGE_KEY,
  getLessonState,
  currentLessonId,
  lessonById,
  moduleOfLesson,
  moduleProgress,
  xpFor,
  levelInfo,
  type Lesson,
  type LearnModule,
  type Progress,
  type LessonGlyph,
  type QuizStep,
  type Example,
} from "@/lib/learn";
import {
  IconBolt,
  IconBook,
  IconCheck,
  IconChevRight,
  IconClose,
  IconDoc,
  IconFlame,
  IconLayers,
  IconLock,
  IconPeople,
  IconPlay,
  IconScale,
  IconSearch,
  IconSparkles,
  IconTarget,
  IconTrophy,
  IconYes,
} from "@/components/icons";
import Image from "next/image";
import styles from "./aprender.module.css";

/* Padrão de balanço do zigue-zague (fator -1..1 multiplicado por --sway no CSS).
   Onda discreta que repete a cada 8 nós, dando a sensação de trilha sinuosa. */
const SWAY = [0, 0.66, 1, 0.66, 0, -0.66, -1, -0.66];

const GLYPHS: Record<LessonGlyph, React.ComponentType<{ width?: number; height?: number }>> = {
  read: IconBook,
  quiz: IconTarget,
  spot: IconSearch,
  budget: IconScale,
  doc: IconDoc,
  classify: IconLayers,
  team: IconPeople,
  check: IconYes,
};

export default function AprenderPage() {
  /* Default idêntico no SSR e no 1º render do cliente → sem mismatch de hidratação. */
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
    }
  }, []);

  const persist = (p: Progress) => {
    setProgress(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch { }
  };

  const completed = progress.completed;
  const doneCount = completed.length;
  const xp = xpFor(completed);
  const lvl = levelInfo(xp);
  const pct = Math.round((doneCount / TOTAL_LESSONS) * 100);
  const curId = currentLessonId(completed);
  const curLesson = curId ? lessonById(curId) : null;
  const trailDone = curId === null;
  const started = doneCount > 0;

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2400);
  };

  const openLesson = (id: string) => {
    const state = getLessonState(id, completed);
    if (state === "locked") {
      showToast("Conclua a lição anterior para desbloquear esta etapa.");
      return;
    }
    setActiveId(id);
  };

  const completeLesson = (id: string) => {
    if (!completed.includes(id)) {
      persist({ completed: [...completed, id], streak: Math.max(progress.streak, 1) });
    }
    setActiveId(null);
  };

  const reset = () => {
    persist(EMPTY_PROGRESS);
    setActiveId(null);
    showToast("Progresso reiniciado. Bons estudos!");
  };

  const activeLesson = activeId ? lessonById(activeId) ?? null : null;
  const completionKind = useMemo<"lesson" | "module" | "trail">(() => {
    if (!activeLesson) return "lesson";
    const after = new Set([...completed, activeLesson.id]);
    const mod = moduleOfLesson(activeLesson.id);
    const trail = LESSON_ORDER.every((x) => after.has(x));
    const modDone = mod ? mod.lessons.every((l) => after.has(l.id)) : false;
    return trail ? "trail" : modDone ? "module" : "lesson";
  }, [activeLesson, completed]);

  /* índice global do nó (atravessa módulos) para o balanço fluir continuamente */
  let nodeIdx = -1;

  return (
    <div className={styles.page}>
      {/* ---------------- CORPO: trilha + trilho lateral ---------------- */}
      <div className={styles.body}>
        <div className={styles.trailWrap} style={{ position: "relative" }}>
          <div className={styles.map}>
            <div id="trail-map" className={styles.trail} style={{ "--fill": `${pct}%` } as React.CSSProperties}>
              <TrailSpineSvg pct={pct} />

              {MODULES.map((mod) => {
                const mp = moduleProgress(mod, completed);
                const active = mod.lessons.some((l) => l.id === curId);
                const state = mp.complete ? "done" : active ? "active" : "locked";
                return (
                  <div key={mod.id} className={styles.modGroup}>
                    <UnitHeader mod={mod} mp={mp} state={state} />
                    <div className={styles.nodes}>
                      {/* Espaço (atividade extra) para o mascote respirar sem bater no cabeçalho */}
                      {["m2", "m4", "m6", "m8"].includes(mod.id) && (
                        <div className={styles.mascotSpacer}>
                          {mod.id === "m2" && (
                            <img src="/mascots/lia.svg" alt="Mascote Lia acenando" className={`${styles.mascot} ${styles.mascotLia}`} />
                          )}
                          {mod.id === "m4" && (
                            <img src="/mascots/theo.svg" alt="Mascote Theo apontando" className={`${styles.mascot} ${styles.mascotTheo}`} />
                          )}
                          {mod.id === "m6" && (
                            <img src="/mascots/nova.svg" alt="Mascote nova com tablet" className={`${styles.mascot} ${styles.mascotNova}`} />
                          )}
                          {mod.id === "m8" && (
                            <img src="/mascots/pingo.svg" alt="Mascote cachorro Pingo sorrindo" className={`${styles.mascot} ${styles.mascotPingo}`} />
                          )}
                        </div>
                      )}
                      {mod.lessons.map((lesson) => {
                        nodeIdx += 1;
                        const f = SWAY[nodeIdx % SWAY.length];
                        const lState = getLessonState(lesson.id, completed);
                        return (
                          <TrailNode
                            key={lesson.id}
                            lesson={lesson}
                            state={lState}
                            factor={f}
                            onOpen={() => openLesson(lesson.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Nó final — troféu da trilha */}
              <div className={styles.nodes}>
                <div className={styles.node} style={{ "--f": 0 } as React.CSSProperties} data-spine-point="node" data-node-state={trailDone ? "completed" : "locked"}>
                  <button
                    type="button"
                    className={`${styles.disc} ${trailDone ? styles.discTrophy : styles.discLocked}`}
                    onClick={() => !trailDone && showToast("Conclua todas as lições para destravar o troféu.")}
                    aria-label="Troféu da trilha"
                  >
                    {trailDone ? <IconTrophy width={30} height={30} /> : <IconLock width={22} height={22} />}
                  </button>
                  <span className={`${styles.nodeCap} ${trailDone ? styles.nodeCapDone : ""}`}>
                    {trailDone ? "Trilha concluída" : "Troféu final"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button type="button" className={styles.resetBtn} onClick={reset}>
            Reiniciar progresso
          </button>
        </div>

        {/* trilho lateral — apenas desktop */}
        <aside className={styles.rail}>
          <div className={styles.railCard}>
            <span className={styles.railKicker}>{trailDone ? "Parabéns" : started ? "Continue de onde parou" : "Sua jornada"}</span>
            {trailDone ? (
              <>
                <div className={styles.railContinueName}>
                  <IconTrophy width={18} height={18} /> Trilha concluída
                </div>
                <p className={styles.railHint}>Você passou por todos os 8 módulos. Que tal revisar um ponto?</p>
              </>
            ) : (
              <>
                <div className={styles.railContinueName}>{curLesson?.title}</div>
                <p className={styles.railHint}>{moduleOfLesson(curId ?? "")?.title}</p>
                <button type="button" className={styles.railBtn} onClick={() => curId && openLesson(curId)}>
                  <IconPlay width={15} height={15} /> {started ? "Continuar lição" : "Começar"}
                </button>
              </>
            )}
          </div>

          <div className={styles.railCard}>
            <div className={styles.railStreak}>
              <span className={styles.railFlame}>
                <IconFlame width={20} height={20} />
              </span>
              <div>
                <div className={styles.railStreakValue}>{progress.streak} dias</div>
                <div className={styles.railHint}>de sequência de estudos</div>
              </div>
            </div>
            <div className={styles.weekDots}>
              {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                <span key={i} className={`${styles.weekDot} ${i < progress.streak ? styles.weekDotOn : ""}`}>
                  {i < progress.streak ? <IconCheck width={10} height={10} /> : d}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.railCard}>
            <span className={styles.railKicker}>Legenda</span>
            <ul className={styles.legend}>
              <li>
                <span className={`${styles.legChip} ${styles.legDone}`}>
                  <IconCheck width={11} height={11} />
                </span>
                Lição concluída
              </li>
              <li>
                <span className={`${styles.legChip} ${styles.legCurrent}`} />
                Disponível agora
              </li>
              <li>
                <span className={`${styles.legChip} ${styles.legLocked}`}>
                  <IconLock width={11} height={11} />
                </span>
                Ainda bloqueada
              </li>
            </ul>
          </div>

          <div className={styles.railTip}>
            <span className={styles.railTipIcon}>
              <IconSparkles />
            </span>
            <p>
              <strong>Dica:</strong> leia os critérios de avaliação antes de escrever a proposta — eles
              dizem onde investir mais texto.
            </p>
          </div>
        </aside>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          <IconSparkles width={14} height={14} /> {toast}
        </div>
      )}

      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          completionKind={completionKind}
          alreadyDone={completed.includes(activeLesson.id)}
          onClose={() => setActiveId(null)}
          onComplete={() => completeLesson(activeLesson.id)}
        />
      )}
    </div>
  );
}

/* ============================================================
   CABEÇALHO DE MÓDULO (unidade)
   ============================================================ */
function UnitHeader({
  mod,
  mp,
  state,
}: {
  mod: LearnModule;
  mp: { done: number; total: number; complete: boolean };
  state: "done" | "active" | "locked";
}) {
  return (
    <div className={`${styles.unit} ${styles[`unit_${state}`]}`} data-spine-point="header" data-node-state={state}>
      <span className={styles.unitNum}>
        {state === "done" ? <IconCheck width={16} height={16} /> : state === "locked" ? <IconLock width={14} height={14} /> : mod.index}
      </span>
      <div className={styles.unitText}>
        <span className={styles.unitKicker}>Módulo {mod.index}</span>
        <span className={styles.unitTitle}>{mod.title}</span>
        <span className={styles.unitTagline}>{mod.tagline}</span>
      </div>
      <span className={styles.unitBadge}>
        {state === "done" ? "Concluído" : state === "active" ? `${mp.done}/${mp.total}` : "Bloqueado"}
      </span>
    </div>
  );
}

/* ============================================================
   NÓ DA TRILHA
   ============================================================ */
function TrailNode({
  lesson,
  state,
  factor,
  onOpen,
}: {
  lesson: Lesson;
  state: "completed" | "current" | "locked";
  factor: number;
  onOpen: () => void;
}) {
  const Glyph = GLYPHS[lesson.glyph];
  return (
    <div className={styles.node} style={{ "--f": factor } as React.CSSProperties} data-spine-point="node" data-node-state={state}>
      {state === "current" && (
        <span className={styles.bubble}>
          Começar
          <span className={styles.bubbleTail} />
        </span>
      )}
      <button
        type="button"
        className={`${styles.disc} ${state === "completed" ? styles.discDone : state === "current" ? styles.discCurrent : styles.discLocked
          }`}
        onClick={onOpen}
        aria-label={`${lesson.title} — ${state === "completed" ? "concluída" : state === "current" ? "disponível" : "bloqueada"
          }`}
        aria-disabled={state === "locked"}
      >
        {state === "current" && <span className={styles.pulse} aria-hidden="true" />}
        {state === "completed" ? (
          <IconCheck width={26} height={26} />
        ) : state === "locked" ? (
          <IconLock width={20} height={20} />
        ) : (
          <Glyph width={24} height={24} />
        )}
      </button>
      <span className={`${styles.nodeCap} ${state === "completed" ? styles.nodeCapDone : ""} ${state === "current" ? styles.nodeCapCurrent : ""} ${state === "locked" ? styles.nodeCapLocked : ""}`}>
        {lesson.title}
      </span>
    </div>
  );
}

/* ============================================================
   PLAYER DA LIÇÃO (overlay em tela cheia)
   ============================================================ */
function LessonPlayer({
  lesson,
  completionKind,
  alreadyDone,
  onClose,
  onComplete,
}: {
  lesson: Lesson;
  completionKind: "lesson" | "module" | "trail";
  alreadyDone: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const steps = lesson.steps;
  const total = steps.length;
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [ticks, setTicks] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const step = steps[idx];
  const isQuiz = step.kind === "quiz";
  const isChecklist = step.kind === "checklist";
  const correct = isQuiz && selected === (step as QuizStep).correct;
  const allTicked = isChecklist && ticks.size === step.items.length;

  const progressPct = finished ? 100 : ((idx + (checked ? 1 : 0)) / total) * 100;

  const next = () => {
    if (idx + 1 >= total) {
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setChecked(false);
      setTicks(new Set());
    }
  };

  const toggleTick = (i: number) => {
    setTicks((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  /* rótulo do botão de ação por tipo de passo / estado */
  let actionLabel = "Continuar";
  let actionDisabled = false;
  if (isQuiz && !checked) {
    actionLabel = "Verificar";
    actionDisabled = selected === null;
  } else if (isChecklist && !checked) {
    actionLabel = allTicked ? "Concluir" : "Marque os itens";
    actionDisabled = !allTicked;
  }

  const onAction = () => {
    if (isQuiz && !checked) {
      setChecked(true);
      return;
    }
    if (isChecklist && !checked) {
      setChecked(true);
      return;
    }
    next();
  };

  if (finished) {
    return (
      <div className={styles.player} role="dialog" aria-label={`${lesson.title} concluída`}>
        <Celebration kind={completionKind} xp={lesson.xp} alreadyDone={alreadyDone} onDone={onComplete} />
      </div>
    );
  }

  const q = step as QuizStep;
  return (
    <div className={styles.player} role="dialog" aria-label={lesson.title}>
      <div className={styles.playerHead}>
        <button type="button" className={styles.playerClose} aria-label="Sair da lição" onClick={onClose}>
          <IconClose />
        </button>
        <div className={styles.playerProgress}>
          <span className={styles.playerProgressFill} style={{ width: `${progressPct}%` }} />
        </div>
        <span className={styles.playerXp}>
          <IconBolt width={13} height={13} /> {lesson.xp}
        </span>
      </div>

      <div className={styles.playerScroll}>
        <div className={styles.playerInner}>
          {step.kind === "info" && (
            <div className={styles.info}>
              <span className={styles.infoMark}>
                <IconBook width={22} height={22} />
              </span>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              {step.body.map((p, i) => (
                <p key={i} className={styles.infoBody}>
                  {p}
                </p>
              ))}
              {step.callout && (
                <div className={`${styles.callout} ${styles[`callout_${step.callout.tone}`]}`}>
                  {step.callout.title && <span className={styles.calloutTitle}>{step.callout.title}</span>}
                  <span>{step.callout.text}</span>
                </div>
              )}
            </div>
          )}

          {step.kind === "quiz" && (
            <div className={styles.quiz}>
              <span className={styles.quizTag}>{quizTag(q.variant)}</span>
              <h2 className={styles.stepTitle}>{q.prompt}</h2>
              {q.example && <ExampleView example={q.example} />}
              <div className={`${styles.options} ${q.variant === "boolean" || q.variant === "classify" ? styles.optionsRow : ""}`}>
                {q.options.map((opt, i) => {
                  const isSel = selected === i;
                  const isAns = i === q.correct;
                  let cls = styles.option;
                  if (checked) {
                    if (isAns) cls += " " + styles.optionRight;
                    else if (isSel) cls += " " + styles.optionWrong;
                    else cls += " " + styles.optionDim;
                  } else if (isSel) {
                    cls += " " + styles.optionSel;
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => setSelected(i)}
                    >
                      <span className={styles.optionMark}>
                        {checked && isAns ? (
                          <IconCheck width={13} height={13} />
                        ) : checked && isSel ? (
                          <IconClose width={12} height={12} />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step.kind === "checklist" && (
            <div className={styles.quiz}>
              <span className={styles.quizTag}>Checklist prático</span>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              {step.intro && <p className={styles.infoBody}>{step.intro}</p>}
              <div className={styles.checklist}>
                {step.items.map((it, i) => {
                  const on = ticks.has(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.checkItem} ${on ? styles.checkItemOn : ""}`}
                      onClick={() => toggleTick(i)}
                      aria-pressed={on}
                    >
                      <span className={styles.checkBox}>{on && <IconCheck width={13} height={13} />}</span>
                      <span>{it}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.playerFoot}>
        {checked && (isQuiz || isChecklist) && (
          <div
            className={`${styles.feedback} ${isChecklist || correct ? styles.feedbackOk : styles.feedbackNudge
              }`}
            role="status"
          >
            <span className={styles.feedbackIcon}>
              {isChecklist || correct ? <IconYes width={18} height={18} /> : <IconSparkles width={16} height={16} />}
            </span>
            <div className={styles.feedbackText}>
              <span className={styles.feedbackLead}>
                {isChecklist ? "Tudo conferido!" : correct ? "Isso! Resposta certa." : "Quase!"}
              </span>
              <span>
                {isChecklist
                  ? step.outro
                  : correct
                    ? q.explain
                    : q.explainWrong ?? q.explain}
              </span>
            </div>
          </div>
        )}
        <button
          type="button"
          className={`${styles.actionBtn} ${actionDisabled ? styles.actionDisabled : ""} ${checked && isQuiz && !correct ? styles.actionNudge : ""
            }`}
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function quizTag(v: QuizStep["variant"]): string {
  switch (v) {
    case "boolean":
      return "Verdadeiro ou falso";
    case "spot":
      return "Encontre o problema";
    case "classify":
      return "Bom ou problemático?";
    case "doc":
      return "Qual documento?";
    default:
      return "Escolha a melhor opção";
  }
}

/* ============================================================
   EXEMPLO VISUAL (orçamento / citação)
   ============================================================ */
function ExampleView({ example }: { example: Example }) {
  if (example.type === "budget") {
    return (
      <div className={styles.example}>
        <span className={styles.exampleCap}>
          <IconScale width={13} height={13} /> {example.caption}
        </span>
        <div className={styles.budget}>
          {example.rows.map((r, i) => (
            <div key={i} className={styles.budgetRow}>
              <span className={styles.budgetItem}>
                {r.item}
                {r.detail && <span className={styles.budgetDetail}>{r.detail}</span>}
              </span>
              <span className={styles.budgetValue}>{r.value}</span>
            </div>
          ))}
          <div className={`${styles.budgetRow} ${styles.budgetTotal}`}>
            <span>Total</span>
            <span className={styles.budgetValue}>{example.total}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.example}>
      <span className={styles.exampleCap}>
        <IconBook width={13} height={13} /> {example.caption}
      </span>
      <blockquote className={styles.quote}>{example.text}</blockquote>
    </div>
  );
}

/* ============================================================
   TELA DE CELEBRAÇÃO
   ============================================================ */
function Celebration({
  kind,
  xp,
  alreadyDone,
  onDone,
}: {
  kind: "lesson" | "module" | "trail";
  xp: number;
  alreadyDone: boolean;
  onDone: () => void;
}) {
  const title = kind === "trail" ? "Trilha concluída!" : kind === "module" ? "Módulo concluído!" : "Lição concluída!";
  const sub =
    kind === "trail"
      ? "Você dominou o caminho completo da submissão de editais. Mandou muito bem!"
      : kind === "module"
        ? "Você fechou um módulo inteiro. Sua proposta agradece."
        : "Mais um passo dado. A prática leva à aprovação.";
  return (
    <div className={styles.celebrate}>
      <div className={styles.celebrateGlow} aria-hidden="true" />
      <div className={`${styles.celebrateMark} ${kind === "trail" ? styles.celebrateTrail : ""}`}>
        {kind === "lesson" ? <IconYes width={44} height={44} /> : <IconTrophy width={44} height={44} />}
      </div>
      <h2 className={styles.celebrateTitle}>{title}</h2>
      <p className={styles.celebrateSub}>{sub}</p>
      {!alreadyDone && (
        <div className={styles.celebrateXp}>
          <IconBolt width={16} height={16} /> +{xp} XP
        </div>
      )}
      <button type="button" className={styles.actionBtn} onClick={onDone}>
        {kind === "trail" ? "Voltar à trilha" : "Continuar"}
      </button>
    </div>
  );
}

/* ============================================================
   SPINE SVG (Caminho Sinuoso Dinâmico)
   ============================================================ */
function TrailSpineSvg({ pct }: { pct: number }) {
  const [path, setPath] = useState("");
  const [activeHeight, setActiveHeight] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      const trail = document.getElementById("trail-map");
      if (!trail) return;

      const nodes = Array.from(trail.querySelectorAll<HTMLElement>("[data-spine-point]"));
      if (nodes.length === 0) return;

      const trailRect = trail.getBoundingClientRect();
      let d = "";
      let maxY = 0;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        let targetEl = node;
        const type = node.getAttribute("data-spine-point");
        if (type === "node") {
          targetEl = node.querySelector("button") || node;
        }

        const rect = targetEl.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - trailRect.left;
        let y = rect.top + rect.height / 2 - trailRect.top;
        if (type === "header") {
          y = rect.bottom - trailRect.top;
        }

        if (i === 0) {
          d += `M ${x} ${y} `;
        } else {
          const prevNode = nodes[i - 1];
          let prevTarget = prevNode;
          if (prevNode.getAttribute("data-spine-point") === "node") {
            prevTarget = prevNode.querySelector("button") || prevNode;
          }
          const prevRect = prevTarget.getBoundingClientRect();
          const prevX = prevRect.left + prevRect.width / 2 - trailRect.left;
          let prevY = prevRect.top + prevRect.height / 2 - trailRect.top;
          if (prevNode.getAttribute("data-spine-point") === "header") {
            prevY = prevRect.bottom - trailRect.top;
          }

          const cy = (prevY + y) / 2;
          d += `C ${prevX} ${cy}, ${x} ${cy}, ${x} ${y} `;
        }

        const state = node.getAttribute("data-node-state");
        if (state === "completed" || state === "current") {
          maxY = Math.max(maxY, y);
        } else if (type === "header" && state === "done") {
          maxY = Math.max(maxY, y);
        }
      }
      setPath(d);
      setActiveHeight(maxY);
    };

    updatePath();
    const to = setTimeout(updatePath, 150);
    window.addEventListener("resize", updatePath);
    return () => {
      clearTimeout(to);
      window.removeEventListener("resize", updatePath);
    };
  }, [pct]);

  if (!path) {
    return <span className={styles.spine} aria-hidden="true" />;
  }

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      {/* Trilha inativa (fundo) */}
      <path d={path} fill="none" stroke="var(--border)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clip path para revelar o caminho verde conforme o progresso vertical */}
      <clipPath id="trail-clip">
        <rect x="0" y="0" width="100%" height={activeHeight} />
      </clipPath>
      {/* Trilha ativa (verde) */}
      <path d={path} fill="none" stroke="var(--ok-500)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#trail-clip)" />
    </svg>
  );
}
