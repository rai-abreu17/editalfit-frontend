"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrow, IconClock, IconEnvelope, IconLock } from "@/components/icons";

export function ForgotForm() {
  const router = useRouter();
  const [email, setEmail] = useState("ana.lima@usp.br");
  const [sent, setSent] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);

  if (sent) return <SentState onBack={() => router.push("/login")} />;

  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setSent(true);
      }}
    >
      <h1 className="screen-title">Esqueceu sua senha?</h1>
      <p className="screen-sub" style={{ marginBottom: 26 }}>
        Sem problema. Informe o e-mail da sua conta e enviaremos um link para você redefinir.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="fp-email">
          E-mail cadastrado
        </label>
        <div className="field__wrap">
          <input id="fp-email" type="email" placeholder="voce@instituicao.br" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="info-card" style={{ marginTop: 6 }}>
        <div className="info-card__icon">
          <IconLock />
        </div>
        <div>
          <div className="info-card__title">Por segurança</div>
          <div className="info-card__text">
            Não confirmamos se um e-mail está cadastrado. Você verá o mesmo retorno em qualquer caso.
          </div>
        </div>
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={!valid} style={{ marginTop: 20 }}>
        Enviar link de redefinição
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </button>

      <div className="switch">
        Lembrou a senha? <Link href="/login">Voltar para o login →</Link>
      </div>
    </form>
  );
}

function SentState({ onBack }: { onBack: () => void }) {
  const [seconds, setSeconds] = useState(45);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);
  const canResend = seconds <= 0;

  return (
    <div className="stack">
      <div className="success-mark" aria-hidden="true">
        <IconEnvelope />
      </div>
      <h1 className="screen-title" style={{ marginTop: 24 }}>
        Pedido recebido.
        <br />
        Olhe seu e-mail.
      </h1>
      <p className="screen-sub" style={{ marginBottom: 18 }}>
        Se houver uma conta associada ao e-mail informado, enviaremos em instantes um link para redefinir sua senha. Confira também a caixa de spam.
      </p>

      <div className="info-card" style={{ marginBottom: 6 }}>
        <div className="info-card__icon">
          <IconClock />
        </div>
        <div>
          <div className="info-card__title">O link expira em 30 minutos</div>
          <div className="info-card__text">Por segurança, só pode ser usado uma vez.</div>
        </div>
      </div>

      <button className="btn btn--primary btn--block" type="button" onClick={onBack} style={{ marginTop: 18 }}>
        Voltar para o login
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </button>

      <div className="switch">
        Não recebeu?{" "}
        {canResend ? (
          <button type="button" onClick={() => setSeconds(45)}>
            Reenviar link
          </button>
        ) : (
          <span style={{ color: "var(--ink-500)", fontWeight: 600 }}>
            Reenviar em 0:{String(seconds).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}
