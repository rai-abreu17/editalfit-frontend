import Link from "next/link";
import { Brand } from "./Brand";
import { ProductPeek } from "./ProductPeek";

interface AuthShellProps {
  children: React.ReactNode;
  stageEyebrow?: string;
  stageTitle?: string;
  stageSub?: string;
}

export function AuthShell({
  children,
  stageEyebrow = "O que você vai ver lá dentro",
  stageTitle = "Diagnóstico claro, critério a critério.",
  stageSub = "Cada apontamento da IA cita o trecho exato do edital. Você corrige e reenvia quantas vezes quiser.",
}: AuthShellProps) {
  return (
    <div className="auth">
      <section className="auth__panel">
        <div className="auth__inner">
          <Link href="/" aria-label="EditalFit — início">
            <Brand className="auth__brand" />
          </Link>
          {children}
        </div>
      </section>

      <aside className="auth__stage on-dark">
        <div className="auth__stage-glow" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 440 }}>
          <span
            className="eyebrow"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#9ec3ff",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {stageEyebrow}
          </span>
          <h2
            style={{
              color: "#fff",
              fontSize: 30,
              margin: "20px 0 12px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {stageTitle}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.82)",
              fontWeight: 300,
              marginBottom: 30,
              lineHeight: 1.55,
              maxWidth: 400,
            }}
          >
            {stageSub}
          </p>
          <ProductPeek float={false} />
        </div>
      </aside>
    </div>
  );
}
