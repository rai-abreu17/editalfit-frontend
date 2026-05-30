"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrow, IconCheck, IconEye, IconGoogle } from "@/components/icons";

export function LoginForm({ successMessage }: { successMessage?: string }) {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  return (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/inicio");
      }}
    >
      {successMessage && (
        <div className="success-banner" role="status">
          <span className="success-banner__icon">
            <IconCheck />
          </span>
          <div>
            <div className="success-banner__title">{successMessage}</div>
            <div className="success-banner__text">Use sua nova senha para entrar.</div>
          </div>
        </div>
      )}

      <h1 className="screen-title">Continue de onde parou.</h1>
      <p className="screen-sub" style={{ marginBottom: 28 }}>
        Seus diagnósticos, projetos salvos e editais sugeridos te esperam.
      </p>

      <div className="field">
        <label className="field__label" htmlFor="li-email">
          E-mail
        </label>
        <div className="field__wrap">
          <input id="li-email" type="email" placeholder="voce@instituicao.br" defaultValue="ana.lima@usp.br" />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="li-pw">
          <span>Senha</span>
          <Link className="hint" href="/recuperar-senha">
            Esqueci minha senha
          </Link>
        </label>
        <div className="field__wrap">
          <input id="li-pw" type={showPw ? "text" : "password"} placeholder="Sua senha" defaultValue="Centelha2026!" />
          <button className="field__toggle" type="button" aria-label="Mostrar senha" onClick={() => setShowPw((v) => !v)}>
            <IconEye open={showPw} />
          </button>
        </div>
      </div>

      <button className="btn btn--primary btn--block" type="submit" style={{ marginTop: 8 }}>
        Entrar
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </button>

      <div className="divider">ou continue com</div>

      <button className="btn btn--secondary btn--block" type="button">
        <IconGoogle /> Entrar com Google
      </button>

      <div className="switch">
        Ainda não tem conta? <Link href="/cadastro">Criar conta gratuita →</Link>
      </div>
    </form>
  );
}
