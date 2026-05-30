"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { IconBack, IconLock, IconEye, IconCheck } from "@/components/icons";
import { STRENGTH_LABEL } from "../shared";
import styles from "../configuracoes.module.css";

export default function SegurancaPage() {
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwCur, setPwCur] = useState("");
  const [pwNew, setPwNew] = useState("");
  const reqs = useMemo(() => ({ len: pwNew.length >= 8, up: /[A-Z]/.test(pwNew), num: /[0-9]/.test(pwNew), sym: /[^a-zA-Z0-9]/.test(pwNew) }), [pwNew]);
  const strength = Object.values(reqs).filter(Boolean).length;
  const strengthClass = strength >= 3 ? "on" : strength >= 2 ? "warn" : "";
  const canUpdatePw = pwCur.length > 0 && strength >= 3;

  const REQS: [keyof typeof reqs, string][] = [["len", "8+ caracteres"], ["up", "1 maiúscula"], ["num", "1 número"], ["sym", "1 símbolo"]];

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/configuracoes" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Segurança</span>
      </header>

      <section>
        <div className={styles.card}>
          <div className="field">
            <label className="field__label" htmlFor="cur">
              Senha atual
            </label>
            <div className="field__wrap">
              <input id="cur" type={showCur ? "text" : "password"} value={pwCur} onChange={(e) => setPwCur(e.target.value)} placeholder="Sua senha atual" />
              <button className="field__toggle" type="button" onClick={() => setShowCur((v) => !v)} aria-label="Mostrar senha">
                <IconEye open={showCur} />
              </button>
            </div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="field__label" htmlFor="new">
              <span>Nova senha</span>
              <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <IconLock /> 8+ caracteres
              </span>
            </label>
            <div className="field__wrap">
              <input id="new" type={showNew ? "text" : "password"} value={pwNew} onChange={(e) => setPwNew(e.target.value)} placeholder="Crie uma senha forte" />
              <button className="field__toggle" type="button" onClick={() => setShowNew((v) => !v)} aria-label="Mostrar senha">
                <IconEye open={showNew} />
              </button>
            </div>
            <div className="pw-strength">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`pw-bar ${i < strength ? strengthClass : ""}`} />
              ))}
              <span className="pw-label">{STRENGTH_LABEL[strength]}</span>
            </div>
            <div className="pw-reqs">
              {REQS.map(([k, label]) => (
                <span key={k} className={`pw-req ${reqs[k] ? "met" : ""}`}>
                  <span className="pip">
                    <IconCheck />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn--primary" disabled={!canUpdatePw} onClick={() => { setPwCur(""); setPwNew(""); }} style={{ marginTop: 16 }}>
            <IconLock /> Atualizar senha
          </button>
        </div>
      </section>
    </div>
  );
}
