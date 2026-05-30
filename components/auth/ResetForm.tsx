"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrow, IconCheck, IconEye, IconLock, IconShield } from "@/components/icons";

const STRENGTH_LABEL = ["Fraca", "Fraca", "Razoável", "Boa", "Forte"];

export function ResetForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [pw, setPw] = useState("Centelha2026!");
  const [pw2, setPw2] = useState("Centelha2026!");

  const reqs = useMemo(
    () => ({
      len: pw.length >= 8,
      up: /[A-Z]/.test(pw),
      num: /[0-9]/.test(pw),
      sym: /[^a-zA-Z0-9]/.test(pw),
    }),
    [pw],
  );
  const strength = Object.values(reqs).filter(Boolean).length;
  const strengthClass = strength >= 3 ? "on" : strength >= 2 ? "warn" : "";
  const pwMatch = pw2.length > 0 && pw === pw2;
  const pwMismatch = pw2.length > 0 && pw !== pw2;
  const canSubmit = strength >= 3 && pwMatch;

  const REQS: [keyof typeof reqs, string][] = [
    ["len", "8+ caracteres"],
    ["up", "1 maiúscula"],
    ["num", "1 número"],
    ["sym", "1 símbolo"],
  ];

  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) router.push("/login?reset=1");
      }}
    >
      <span className="email-tip">
        <IconLock />
        Redefinindo para&nbsp;<strong>ana.lima@usp.br</strong>
      </span>

      <h1 className="screen-title">
        Defina uma
        <br />
        nova senha.
      </h1>
      <p className="screen-sub" style={{ marginBottom: 22 }}>
        Escolha algo forte. Você será desconectado dos outros dispositivos por segurança.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="rp-pw">
          <span>Nova senha</span>
          <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <IconLock /> 8+ caracteres
          </span>
        </label>
        <div className="field__wrap">
          <input id="rp-pw" type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Crie uma senha forte" />
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

      <div className="field">
        <label className="field__label" htmlFor="rp-pw2">
          <span>Confirmar nova senha</span>
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
          <input id="rp-pw2" type={showPw2 ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Repita a nova senha" />
          <button className="field__toggle" type="button" aria-label="Mostrar senha" onClick={() => setShowPw2((v) => !v)}>
            <IconEye open={showPw2} />
          </button>
        </div>
      </div>

      <div className="info-card" style={{ marginTop: 14 }}>
        <div className="info-card__icon">
          <IconShield />
        </div>
        <div>
          <div className="info-card__title">Encerraremos suas outras sessões</div>
          <div className="info-card__text">Por segurança, você será desconectado de outros dispositivos.</div>
        </div>
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={!canSubmit} style={{ marginTop: 20 }}>
        Redefinir senha
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </button>
    </form>
  );
}
