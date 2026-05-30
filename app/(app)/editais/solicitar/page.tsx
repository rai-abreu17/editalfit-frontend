"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IconArrow, IconCheck, IconClock, IconClose, IconExternal, IconInbox, IconLock, IconSearch } from "@/components/icons";
import styles from "./solicitar.module.css";

const urlValid = (url: string) => /^https?:\/\/[^\s]+\.[^\s]+/i.test(url.trim());
const mockTicket = () => `SOL-${String(new Date().getFullYear()).slice(-2)}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

function SolicitarInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const prefill = sp.get("q") ?? "";

  const [url, setUrl] = useState("");
  const [name, setName] = useState(prefill);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState("");

  const trimmed = url.trim();
  const showError = trimmed.length > 0 && !urlValid(trimmed);
  const showOk = trimmed.length > 0 && urlValid(trimmed);
  const canSubmit = urlValid(trimmed) && !submitting;

  const submit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => {
      setTicket(mockTicket());
      setSent(true);
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/novo-projeto" className={styles.back} aria-label="Voltar">
          <IconArrow style={{ transform: "rotate(180deg)" }} />
        </Link>
        <span className="eyebrow">{sent ? "Solicitação enviada" : "Solicitar edital"}</span>
      </header>

      {sent ? (
        <div className={styles.confirm}>
          <div className="success-mark success-mark--ok" aria-hidden="true">
            <IconInbox />
          </div>
          <h1 className={styles.confirmTitle}>Recebemos sua solicitação.</h1>
          <p className={styles.confirmText}>Assim que o edital for cadastrado, você receberá uma notificação.</p>
          <span className={styles.receipt}>
            <IconLock /> {ticket}
          </span>
          <div className={styles.next}>
            {[
              "Nossa equipe revisa o link enviado e valida o edital.",
              "Quando estiver disponível, o edital aparece na sua busca.",
              "Você recebe uma notificação no app e por e-mail.",
            ].map((t, i) => (
              <div key={t} className={styles.nextItem}>
                <span className={styles.nextNum}>{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn--primary" onClick={() => router.push("/novo-projeto")} style={{ minWidth: 220 }}>
            Voltar à busca
            <span className="btn__arrow">
              <IconArrow />
            </span>
          </button>
        </div>
      ) : (
        <>
          <div className={styles.hero}>
            {prefill && (
              <span className={styles.context} title={prefill}>
                <IconSearch /> Sem resultados para “{prefill}”
              </span>
            )}
            <h1 className={styles.h1}>Não encontrou o edital?</h1>
            <p className={styles.lead}>Cole o link oficial do edital abaixo. Nossa equipe vai analisar e cadastrá-lo em breve.</p>
          </div>

          <div className={styles.card}>
            <div className="field">
              <label className="field__label" htmlFor="ereq-url">
                URL do edital oficial
              </label>
              <div className="field__wrap" style={showError ? { borderColor: "var(--danger-500)" } : showOk ? { borderColor: "var(--ok-500)" } : undefined}>
                <input
                  id="ereq-url"
                  type="url"
                  inputMode="url"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="https://orgao.gov.br/edital-2026"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className={`${styles.hint} ${showError ? styles.hintErr : showOk ? styles.hintOk : ""}`}>
                {showError ? (
                  <>
                    <IconClose /> Endereço inválido. Cole o link completo, começando por <strong>https://</strong>
                  </>
                ) : showOk ? (
                  <>
                    <IconCheck /> Link válido.
                  </>
                ) : (
                  <>
                    <IconExternal /> Cole o link da página oficial do órgão — onde o edital está publicado.
                  </>
                )}
              </div>
            </div>

            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field__label" htmlFor="ereq-name">
                <span>Nome do edital</span>
                <span className={styles.opt}>Opcional</span>
              </label>
              <div className="field__wrap">
                <input id="ereq-name" type="text" placeholder="Ex.: Centelha — Ideação 2026" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="info-card" style={{ marginBottom: 18 }}>
            <div className="info-card__icon">
              <IconClock />
            </div>
            <div>
              <div className="info-card__title">Sem prazo fixo de análise</div>
              <div className="info-card__text">Validamos cada solicitação manualmente. Você é avisado assim que o edital for cadastrado — sem previsão garantida.</div>
            </div>
          </div>

          <button type="button" className="btn btn--primary btn--block" disabled={!canSubmit} onClick={submit}>
            {submitting ? "Enviando…" : "Enviar solicitação"}
            {!submitting && (
              <span className="btn__arrow">
                <IconArrow />
              </span>
            )}
          </button>
          <div className="switch">
            Achou na lista? <Link href="/novo-projeto">Voltar à busca →</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function SolicitarEditalPage() {
  return (
    <Suspense fallback={null}>
      <SolicitarInner />
    </Suspense>
  );
}
