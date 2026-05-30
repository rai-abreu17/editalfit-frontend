"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AREA_OPTIONS,
  STATE_OPTIONS,
  EDITAIS,
  areaLabel,
  deadlineLabel,
  deadlineTone,
  type Edital,
} from "@/lib/data";
import {
  IconArrow,
  IconAward,
  IconCheck,
  IconChevDown,
  IconClock,
  IconClose,
  IconDoc,
  IconFilter,
  IconInbox,
  IconSearch,
} from "@/components/icons";
import styles from "./novo-projeto.module.css";

export default function NovoProjetoPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [states, setStates] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [openOnly, setOpenOnly] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheet, setSheet] = useState<null | "state" | "area">(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EDITAIS.filter((e) => {
      if (q && !e.name.toLowerCase().includes(q) && !e.agency.toLowerCase().includes(q)) return false;
      if (states.length > 0 && !states.includes(e.state)) return false;
      if (areas.length > 0 && !e.areas.some((a) => areas.includes(a))) return false;
      if (openOnly && !e.open) return false;
      return true;
    });
  }, [query, states, areas, openOnly]);

  const isEmpty = results.length === 0;
  const selected = results.find((e) => e.id === selectedId) ?? null;
  // T10 (Seleção de Etapa/Categoria) é condicional — fluxo 3.2 do documento:
  // edital com etapas/categorias → passa por /etapa; sem → vai direto ao upload.
  const totalSteps = selected ? (selected.hasStages ? 3 : 2) : 3;
  const continueHref = selected && !selected.hasStages ? "/novo-projeto/upload?total=2" : "/novo-projeto/etapa";

  const clearFilters = () => {
    setStates([]);
    setAreas([]);
    setOpenOnly(false);
    setQuery("");
  };

  const stateChip = states.length === 0 ? "Estado" : states.length === 1 ? STATE_OPTIONS.find((s) => s.id === states[0])?.label ?? "Estado" : `Estado · ${states.length}`;
  const areaChip = areas.length === 0 ? "Área de atuação" : areas.length === 1 ? AREA_OPTIONS.find((a) => a.id === areas[0])?.label ?? "Área" : `Áreas · ${areas.length}`;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/inicio" className={styles.back} aria-label="Voltar">
          <IconArrow style={{ transform: "rotate(180deg)" }} />
        </Link>
        <span className="eyebrow">Novo projeto · Passo 1 de {totalSteps}</span>
      </header>

      <div className={styles.hero}>
        <h1 className={styles.h1}>Qual edital você vai submeter?</h1>
        <p className={styles.lead}>Busque pelo nome ou filtre por estado, área e prazo. Você só avança após escolher um edital.</p>

        <div className={styles.search}>
          <IconSearch />
          <input type="search" placeholder="Buscar pelo nome do edital…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Buscar edital" />
          {query && (
            <button type="button" className={styles.searchClear} aria-label="Limpar busca" onClick={() => setQuery("")}>
              <IconClose />
            </button>
          )}
        </div>

        <div className={styles.filters} role="toolbar" aria-label="Filtros">
          <button type="button" className={`${styles.filter} ${states.length ? styles.filterActive : ""}`} onClick={() => setSheet("state")}>
            <IconFilter /> {stateChip} <IconChevDown />
          </button>
          <button type="button" className={`${styles.filter} ${areas.length ? styles.filterActive : ""}`} onClick={() => setSheet("area")}>
            <IconFilter /> {areaChip} <IconChevDown />
          </button>
          <button type="button" className={`${styles.filter} ${openOnly ? styles.filterActive : ""}`} aria-pressed={openOnly} onClick={() => setOpenOnly((v) => !v)}>
            <IconClock /> {openOnly ? "Abertos" : "Todos os prazos"}
          </button>
        </div>
      </div>

      {!isEmpty && (
        <div className={styles.summary}>
          <span>
            <strong>{results.length}</strong> {results.length === 1 ? "edital encontrado" : "editais encontrados"}
          </span>
          <button type="button" className={styles.sort}>
            Mais relevantes <IconChevDown />
          </button>
        </div>
      )}

      {isEmpty ? (
        <div className={styles.empty} role="status">
          <div className={styles.emptyIllo} aria-hidden="true">
            <IconInbox />
          </div>
          <h2>Não encontramos esse edital na nossa base ainda.</h2>
          <p>Verifique se há diferença no nome, remova filtros ativos ou peça para cadastrarmos esse edital — sem prazo fixo, avisamos assim que ele entrar na base.</p>
          {query.trim() && <div className={styles.emptyQuery}>“{query.trim()}”</div>}
          <div className={styles.emptyActions}>
            <Link href={`/editais/solicitar${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`} className="btn btn--primary">
              Solicitar cadastro deste edital
              <span className="btn__arrow">
                <IconArrow />
              </span>
            </Link>
            <button type="button" className="btn btn--secondary" onClick={clearFilters}>
              Limpar filtros e tentar de novo
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {results.map((e) => (
            <EditalCard key={e.id} edital={e} selected={selectedId === e.id} onSelect={() => setSelectedId((p) => (p === e.id ? null : e.id))} />
          ))}
        </div>
      )}

      {selected && (
        <div className={styles.bottomBar}>
          <div className={styles.bottomInfo}>
            <span className={styles.bottomLabel}>Selecionado</span>
            <span className={styles.bottomName}>{selected.name}</span>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => router.push(continueHref)}>
            Continuar
            <span className="btn__arrow">
              <IconArrow />
            </span>
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

function EditalCard({ edital, selected, onSelect }: { edital: Edital; selected: boolean; onSelect: () => void }) {
  const tone = deadlineTone(edital.daysLeft);
  const deadline = deadlineLabel(edital.daysLeft, edital.deadlineLabel);
  return (
    <div className={`${styles.card} ${selected ? styles.cardSel : ""}`} role="button" tabIndex={0} aria-pressed={selected} onClick={onSelect} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}>
      <div className={styles.cardHead}>
        <div style={{ minWidth: 0 }}>
          <div className={styles.agency}>
            <IconDoc /> {edital.agency}
          </div>
          <div className={styles.name}>{edital.name}</div>
        </div>
        <span className={`badge badge--${tone}`}>
          <span className="pip" />
          {deadline}
        </span>
      </div>

      <div className={styles.tags}>
        {edital.areas.map((a) => (
          <span key={a} className="tag">
            {areaLabel(a)}
          </span>
        ))}
      </div>

      {edital.evaluatorManual && (
        <span className={styles.evaluator}>
          <IconAward /> Manual do avaliador disponível
        </span>
      )}

      <div className={styles.cardFoot}>
        <Link href={`/editais/${edital.id}`} className={styles.more} onClick={(e) => e.stopPropagation()}>
          Saiba mais <IconArrow width={14} height={14} />
        </Link>
        <button type="button" className={`${styles.select} ${selected ? styles.selectOn : ""}`} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
          {selected ? "Selecionado" : "Selecionar"}
          {selected ? <IconCheck /> : <IconArrow width={14} height={14} />}
        </button>
      </div>
    </div>
  );
}

function FilterSheet({
  title,
  options,
  value,
  onApply,
  onClose,
}: {
  title: string;
  options: { id: string; label: string }[];
  value: string[];
  onApply: (v: string[]) => void;
  onClose: () => void;
}) {
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
