"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconAlert, IconArrow, IconDoc, IconLayers } from "@/components/icons";
import styles from "./etapa.module.css";

const EDITAL = { name: "Programa Centelha — Ideação 2026", agency: "FAPEMA · Inova Maranhão" };

interface Opt {
  id: string;
  label: string;
  desc: string;
  tag: string;
  docs: number;
}

const OPTIONS: Opt[] = [
  { id: "ideacao", label: "Ideação", desc: "Para times que ainda estão validando a proposta de valor e o modelo de negócio. Documentação mais leve, com foco em problema e mercado.", tag: "TRL 1–3", docs: 6 },
  { id: "validacao", label: "Validação de mercado", desc: "Para soluções com protótipo funcional e ensaios iniciais com clientes. Exige evidências de tração e plano de aquisição.", tag: "TRL 4–5", docs: 9 },
  { id: "operacao", label: "Operação inicial", desc: "Para empresas já operando, com clientes pagantes. Documentação completa, incluindo contábil e regulatório do setor.", tag: "TRL 6+", docs: 12 },
];

export default function EtapaPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, setPending] = useState<Opt | null>(null);

  const pick = (opt: Opt) => {
    if (selectedId && selectedId !== opt.id) {
      setPending(opt); // switching resets the document list — confirm first
      return;
    }
    setSelectedId(opt.id);
  };

  const from = OPTIONS.find((o) => o.id === selectedId) ?? null;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/novo-projeto" className={styles.back} aria-label="Voltar">
          <IconArrow style={{ transform: "rotate(180deg)" }} />
        </Link>
        <span className="eyebrow">Novo projeto · Passo 2 de 3</span>
      </header>

      <div className={styles.hero}>
        <h1 className={styles.h1}>Qual categoria do edital?</h1>
        <p className={styles.lead}>Este edital tem subdivisões com requisitos de documentação diferentes. Escolha a categoria adequada à sua proposta.</p>
      </div>

      <div className={styles.context}>
        <div className={styles.contextEyebrow}>
          <IconDoc /> Edital selecionado
        </div>
        <h2 className={styles.contextName}>{EDITAL.name}</h2>
        <div className={styles.contextAgency}>{EDITAL.agency}</div>
      </div>

      <div className="section-head">
        <span className="section-title">
          <IconLayers /> Categorias disponíveis <span className="count">{OPTIONS.length}</span>
        </span>
      </div>

      <div className={styles.list} role="radiogroup" aria-label="Categorias disponíveis">
        {OPTIONS.map((opt) => {
          const selected = selectedId === opt.id;
          return (
            <div
              key={opt.id}
              className={`${styles.card} ${selected ? styles.cardSel : ""}`}
              role="radio"
              tabIndex={0}
              aria-checked={selected}
              onClick={() => pick(opt)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pick(opt);
                }
              }}
            >
              <div className={styles.radio} />
              <div className={styles.body}>
                <div className={styles.cardHead}>
                  <div className={styles.cardName}>{opt.label}</div>
                  <span className={styles.tag}>{opt.tag}</span>
                </div>
                <div className={styles.desc}>{opt.desc}</div>
                <span className={styles.meta}>
                  <IconDoc /> {opt.docs} documentos exigidos
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.bottomBar}>
        <Link href="/novo-projeto" className="btn btn--secondary">
          <IconArrow style={{ transform: "rotate(180deg)" }} width={14} height={14} /> Voltar
        </Link>
        <button type="button" className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }} disabled={!selectedId} onClick={() => router.push("/novo-projeto/upload")}>
          Continuar
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </button>
      </div>

      {pending && (
        <div className="overlay" onClick={() => setPending(null)}>
          <div className={styles.confirm} role="alertdialog" aria-label="Confirmar troca" onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <IconAlert />
            </div>
            <h2 className={styles.confirmTitle}>Alterar categoria reinicia seus documentos</h2>
            <p className={styles.confirmText}>
              Cada categoria exige documentos diferentes. Ao trocar, a lista de documentos já enviada para esta proposta será <strong>reiniciada</strong>. Esta ação não pode ser desfeita.
            </p>
            <div className={styles.diff} aria-hidden="true">
              <div className={styles.diffCol}>
                <div className={styles.diffLabel}>De</div>
                <div className={styles.diffValue}>{from?.label}</div>
              </div>
              <div className={styles.diffArrow}>
                <IconArrow />
              </div>
              <div className={styles.diffCol}>
                <div className={styles.diffLabel}>Para</div>
                <div className={styles.diffValue}>{pending.label}</div>
              </div>
            </div>
            <div className={styles.confirmFoot}>
              <button type="button" className="btn btn--secondary" onClick={() => setPending(null)}>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setSelectedId(pending.id);
                  setPending(null);
                }}
              >
                Trocar mesmo assim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
