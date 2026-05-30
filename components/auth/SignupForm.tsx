"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrow, IconCheck, IconEye, IconGoogle, IconLock } from "@/components/icons";

const STRENGTH_LABEL = ["Fraca", "Fraca", "Razoável", "Boa", "Forte"];

export function SignupForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [pw, setPw] = useState("Centelha2026!");
  const [pw2, setPw2] = useState("Centelha2026!");

  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    return s;
  }, [pw]);

  const strengthClass = strength >= 3 ? "on" : strength >= 2 ? "warn" : "";
  const pwMatch = pw2.length > 0 && pw === pw2;
  const pwMismatch = pw2.length > 0 && pw !== pw2;

  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/onboarding");
      }}
    >
      <h1 className="screen-title">Vamos começar.</h1>
      <p className="screen-sub" style={{ marginBottom: 22 }}>
        Crie sua conta gratuita e analise seu primeiro edital em minutos.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="su-name">
          Nome completo
        </label>
        <div className="field__wrap">
          <input id="su-name" type="text" placeholder="Como você assina projetos" defaultValue="Ana Lima de Souza" />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="su-email">
          E-mail
        </label>
        <div className="field__wrap">
          <input id="su-email" type="email" placeholder="voce@instituicao.br" defaultValue="ana.lima@usp.br" />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="su-pw">
          <span>Senha</span>
          <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <IconLock /> 8+ caracteres
          </span>
        </label>
        <div className="field__wrap">
          <input id="su-pw" type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Crie uma senha forte" />
          <button className="field__toggle" type="button" aria-label="Mostrar senha" onClick={() => setShowPw((v) => !v)}>
            <IconEye open={showPw} />
          </button>
        </div>
        <div className="pw-strength">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`pw-bar ${i < strength ? strengthClass : ""}`} />
          ))}
          <span className="pw-label">{STRENGTH_LABEL[strength]}</span>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="su-pw2">
          <span>Confirmar senha</span>
          {pwMatch && (
            <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--ok-700)" }}>
              <IconCheck /> Senhas coincidem
            </span>
          )}
          {pwMismatch && <span className="hint" style={{ color: "var(--danger-700)" }}>Senhas diferentes</span>}
        </label>
        <div
          className="field__wrap"
          style={pwMismatch ? { borderColor: "var(--danger-500)" } : pwMatch ? { borderColor: "var(--ok-500)" } : undefined}
        >
          <input id="su-pw2" type={showPw2 ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Repita a senha" />
          <button className="field__toggle" type="button" aria-label="Mostrar senha" onClick={() => setShowPw2((v) => !v)}>
            <IconEye open={showPw2} />
          </button>
        </div>
      </div>

      <label className="check-row" htmlFor="su-tos" style={{ marginTop: 6 }}>
        <input id="su-tos" type="checkbox" defaultChecked />
        <span>
          Concordo com os <a href="#">Termos</a> e a <a href="#">Política de privacidade</a> do EditalFit.
        </span>
      </label>

      <button className="btn btn--primary btn--block" type="submit" style={{ marginTop: 20 }}>
        Criar minha conta
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </button>

      <div className="divider">ou cadastre-se com</div>

      <button className="btn btn--secondary btn--block" type="button">
        <IconGoogle /> Continuar com Google
      </button>

      <div className="switch">
        Já tem conta? <Link href="/login">Entrar →</Link>
      </div>
    </form>
  );
}
