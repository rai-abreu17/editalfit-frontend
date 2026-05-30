import Link from "next/link";
import { Brand } from "@/components/Brand";
import { ProductPeek } from "@/components/ProductPeek";
import { IconArrow, IconCheck } from "@/components/icons";
import styles from "./welcome.module.css";

const BENEFITS = [
  "Veja seu score de aderência antes de submeter",
  "Cada apontamento da IA cita o trecho exato do edital",
  "Corrija e reenvie quantas vezes quiser",
];

export default function WelcomePage() {
  return (
    <main className={`${styles.welcome} on-dark`}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.topbar}>
        <Brand light />
        <Link href="/login" className={styles.entrar}>
          Entrar
        </Link>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>Diagnóstico de aderência por IA</span>
          <h1 className={styles.title}>
            Submeta seu edital
            <br />
            sem achismo.
          </h1>
          <p className={styles.sub}>
            Diagnóstico por critério, com a fonte exata no edital. Em ~90 segundos.
          </p>

          <ul className={styles.benefits}>
            {BENEFITS.map((b) => (
              <li key={b}>
                <IconCheck style={{ color: "#6dd8a0" }} />
                {b}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link href="/cadastro" className="btn btn--primary btn--lg">
              <span>Criar conta grátis</span>
              <span className="btn__arrow">
                <IconArrow />
              </span>
            </Link>
            <Link href="/login" className="btn btn--outline btn--lg">
              Já tenho conta · Entrar
            </Link>
          </div>

          <div className={styles.trust}>Grátis para sempre · Sem cartão · LGPD</div>
          <p className={styles.tos}>
            Ao continuar você concorda com os <a href="#">Termos</a> e a{" "}
            <a href="#">Política de privacidade</a>.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <ProductPeek />
        </div>
      </div>
    </main>
  );
}
