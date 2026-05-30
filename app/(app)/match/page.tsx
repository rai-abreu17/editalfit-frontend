"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AREA_OPTIONS, STATE_OPTIONS, areaLabel, deadlineLabel, deadlineTone } from "@/lib/data";
import { IconArrow, IconBack, IconCheck, IconChevDown, IconClock, IconDoc, IconFilter, IconInbox, IconPlus, IconSparkles, IconUser } from "@/components/icons";
import styles from "./match.module.css";

interface Suggestion {
  id: string;
  name: string;
  agency: string;
  state: string;
  areas: string[];
  daysLeft: number;
  deadlineLabel: string;
  match: number;
  reasonProject: string;
  reasonProfile: string;
  reasonGeneric: string;
}

const SUGGESTIONS: Suggestion[] = [
  { id: "e-101", name: "Tecnologias para Cidades Inteligentes", agency: "FINEP", state: "nacional", areas: ["inovacao", "amb"], daysLeft: 28, deadlineLabel: "25 jun 2026", match: 94, reasonProject: "Seu sensor IoT de qualidade do ar conversa direto com o foco em monitoramento ambiental urbano deste edital.", reasonProfile: "Combina com seu perfil em Tecnologia e Meio ambiente — eixo central deste programa.", reasonGeneric: "Edital com alta procura entre projetos de tecnologia urbana." },
  { id: "e-102", name: "PIPE Fase 1 — Pesquisa Inovativa", agency: "FAPESP", state: "SP", areas: ["inovacao", "saude"], daysLeft: 45, deadlineLabel: "08 jul 2026", match: 88, reasonProject: "A maturidade de protótipo do seu sensor atende ao estágio de pesquisa inovativa exigido aqui.", reasonProfile: "Seu interesse em pesquisa aplicada e inovação se alinha ao escopo deste edital.", reasonGeneric: "Um dos editais de inovação mais buscados na plataforma." },
  { id: "e-103", name: "MCTI Sustentável — Bioeconomia & Agro", agency: "CNPq · MCTI", state: "nacional", areas: ["agro", "amb"], daysLeft: 7, deadlineLabel: "02 jun 2026", match: 81, reasonProject: "Seu hardware embarcado se encaixa no eixo de tecnologia para o campo e baixo carbono.", reasonProfile: "Suas áreas de Meio ambiente e tecnologia aderem ao foco socioambiental do edital.", reasonGeneric: "Edital nacional aberto com foco em sustentabilidade." },
  { id: "e-104", name: "Garagem · Pesquisa Aplicada em Tecnologia", agency: "BNDES", state: "nacional", areas: ["inovacao"], daysLeft: 60, deadlineLabel: "25 jul 2026", match: 76, reasonProject: "Soluções de IoT com potencial de escala nacional são exatamente o público-alvo deste programa.", reasonProfile: "Seu perfil de inovação tecnológica casa com o critério de escalabilidade do edital.", reasonGeneric: "Programa nacional de tecnologia com inscrições abertas." },
  { id: "e-105", name: "Tecnologia Social no Semiárido", agency: "Fundação Banco do Brasil", state: "nacional", areas: ["tecsocial", "amb"], daysLeft: -3, deadlineLabel: "23 mai 2026", match: 63, reasonProject: "Adaptar seu monitoramento ambiental para o semiárido ampliaria o impacto social do projeto.", reasonProfile: "Há sobreposição parcial com seu interesse em meio ambiente e impacto social.", reasonGeneric: "Edital de tecnologia social — aderência apenas parcial." },
];

const badgeTone = (m: number) => (m >= 85 ? "high" : m >= 70 ? "mid" : "low");

function MatchInner() {
  const sp = useSearchParams();
  const origin = sp.get("origem") === "project" ? "project" : "menu";
  const profileComplete = sp.get("perfil") !== "incompleto";
  const proj = origin === "project" ? { name: "Sensor IoT para qualidade do ar urbano", areas: ["inovacao", "amb"] } : null;

  const [states, setStates] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>(origin === "project" && proj ? proj.areas : []);
  const [openOnly, setOpenOnly] = useState(true);
  const [sheet, setSheet] = useState<null | "state" | "area">(null);

  const results = useMemo(() => {
    return SUGGESTIONS.filter((e) => {
      if (states.length > 0 && !states.includes(e.state)) return false;
      if (areas.length > 0 && !e.areas.some((a) => areas.includes(a))) return false;
      if (openOnly && e.daysLeft < 0) return false;
      return true;
    }).sort((a, b) => b.match - a.match);
  }, [states, areas, openOnly]);

  const reasonFor = (e: Suggestion) => (!profileComplete ? e.reasonGeneric : origin === "project" ? e.reasonProject : e.reasonProfile);
  const stateChip = states.length === 0 ? "Estado" : states.length === 1 ? STATE_OPTIONS.find((s) => s.id === states[0])?.label ?? "Estado" : `Estado · ${states.length}`;
  const areaChip = areas.length === 0 ? "Área" : areas.length === 1 ? AREA_OPTIONS.find((a) => a.id === areas[0])?.label ?? "Área" : `Áreas · ${areas.length}`;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/inicio" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">
          <IconSparkles /> Match de editais
        </span>
      </header>

      <div className={styles.hero}>
        <h1 className={styles.h1}>Editais que combinam com você</h1>
        <p className={styles.lead}>
          {origin === "project"
            ? "Cruzamos os dados deste projeto com a nossa base e separamos outros editais onde ele também se encaixa."
            : "Cruzamos o seu perfil com a nossa base de editais e separamos as melhores oportunidades para os seus projetos."}
        </p>
      </div>

      {origin === "project" && proj && (
        <div className={styles.context}>
          <span className={styles.contextIcon}>
            <IconSparkles />
          </span>
          <div>
            <div className={styles.contextLabel}>Sugestões a partir do projeto</div>
            <div className={styles.contextName}>{proj.name}</div>
          </div>
        </div>
      )}

      {!profileComplete && (
        <div className={styles.alert} role="status">
          <span className={styles.alertIcon}>
            <IconUser />
          </span>
          <div>
            <div className={styles.alertTitle}>Complete seu perfil para receber sugestões mais precisas</div>
            <div className={styles.alertText}>Sem as suas áreas de atuação e estado, mostramos apenas sugestões genéricas.</div>
            <Link href="/configuracoes" className={styles.alertLink}>
              Completar perfil <IconArrow width={14} height={14} />
            </Link>
          </div>
        </div>
      )}

      <div className={styles.filters}>
        <button type="button" className={`${styles.filter} ${areas.length ? styles.filterActive : ""}`} onClick={() => setSheet("area")}>
          <IconFilter /> {areaChip} <IconChevDown />
        </button>
        <button type="button" className={`${styles.filter} ${states.length ? styles.filterActive : ""}`} onClick={() => setSheet("state")}>
          <IconFilter /> {stateChip} <IconChevDown />
        </button>
        <button type="button" className={`${styles.filter} ${openOnly ? styles.filterActive : ""}`} aria-pressed={openOnly} onClick={() => setOpenOnly((v) => !v)}>
          <IconClock /> {openOnly ? "Abertos" : "Todos os prazos"}
        </button>
      </div>

      {results.length > 0 ? (
        <>
          <div className={styles.summary}>
            <span>
              <strong>{results.length}</strong> {results.length === 1 ? "edital sugerido" : "editais sugeridos"}
            </span>
          </div>
          <div className={styles.grid}>
            {results.map((e, idx) => {
              const mt = profileComplete ? badgeTone(e.match) : "low";
              const tone = deadlineTone(e.daysLeft);
              const isFeatured = idx === 0;
              return (
                <div key={e.id} className={`${styles.card} ${isFeatured ? styles.cardFeatured : ""}`} tabIndex={0}>
                  <div className={styles.cardHead}>
                    <div style={{ minWidth: 0 }}>
                      <div className={styles.agency}>
                        <IconDoc /> {e.agency}
                      </div>
                      <div className={styles.name}>{e.name}</div>
                    </div>
                    <span className={`${styles.matchBadge} ${styles[mt]}`}>
                      <IconSparkles />
                      <span className={styles.matchNum}>
                        {e.match}
                        <span className={styles.matchPct}>%</span>
                      </span>
                      <span className={styles.matchCap}>aderência</span>
                    </span>
                  </div>
                  <div className={styles.meta}>
                    <span className={`badge badge--${tone}`}>
                      <span className="pip" />
                      {deadlineLabel(e.daysLeft, e.deadlineLabel)}
                    </span>
                    {e.areas.map((a) => (
                      <span key={a} className="tag">
                        {areaLabel(a)}
                      </span>
                    ))}
                  </div>
                  <div className={styles.reason}>
                    <div className={styles.reasonLabel}>
                      <IconSparkles /> Por que sugerimos
                    </div>
                    <p>{reasonFor(e)}</p>
                  </div>
                  <div className={styles.cardFoot}>
                    <Link href={`/editais/${e.id}?from=match`} className={styles.more}>
                      Saiba mais <IconArrow width={14} height={14} />
                    </Link>
                    <Link href="/novo-projeto" className={styles.create}>
                      <IconPlus width={14} height={14} /> Criar projeto
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.empty} role="status">
          <div className={styles.emptyIllo}>
            <IconInbox />
          </div>
          <h2>Nenhuma sugestão com esses filtros.</h2>
          <p>Remova um filtro de área, estado ou prazo para ver mais editais compatíveis com seu perfil.</p>
          <button type="button" className="btn btn--secondary" onClick={() => { setStates([]); setAreas([]); setOpenOnly(false); }}>
            Limpar filtros
          </button>
        </div>
      )}

      {sheet && (
        <FilterSheet
          title={sheet === "state" ? "Filtrar por estado" : "Filtrar por área de atuação"}
          options={sheet === "state" ? STATE_OPTIONS : AREA_OPTIONS}
          value={sheet === "state" ? states : areas}
          onApply={(v) => {
            if (sheet === "state") setStates(v);
            else setAreas(v);
            setSheet(null);
          }}
          onClose={() => setSheet(null)}
        />
      )}
    </div>
  );
}

function FilterSheet({ title, options, value, onApply, onClose }: { title: string; options: { id: string; label: string }[]; value: string[]; onApply: (v: string[]) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<string[]>(value);
  const toggle = (id: string) => setDraft((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  return (
    <div className="overlay" onClick={onClose}>
      <div className={styles.sheet} role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetTitle}>{title}</div>
        <div className={styles.sheetList}>
          {options.map((opt) => {
            const active = draft.includes(opt.id);
            return (
              <button key={opt.id} type="button" className={`${styles.sheetOpt} ${active ? styles.sheetOptOn : ""}`} onClick={() => toggle(opt.id)}>
                <span>{opt.label}</span>
                {active && <IconCheck />}
              </button>
            );
          })}
        </div>
        <div className={styles.sheetFoot}>
          <button type="button" className="btn btn--secondary" onClick={() => setDraft([])}>
            Limpar
          </button>
          <button type="button" className="btn btn--primary" onClick={() => onApply(draft)}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MatchPage() {
  return (
    <Suspense fallback={null}>
      <MatchInner />
    </Suspense>
  );
}
