import Link from "next/link";
import { PROJECTS, SUGGESTED_EDITAIS, CURRENT_USER } from "@/lib/data";
import { ProjectCard } from "@/components/app/ProjectCard";
import { IconArrow, IconFolderPlus, IconPlus, IconSparkles } from "@/components/icons";
import styles from "./inicio.module.css";

export default async function InicioPage({
  searchParams,
}: {
  searchParams: Promise<{ vazio?: string }>;
}) {
  const { vazio } = await searchParams;
  const projects = vazio ? [] : PROJECTS;

  if (projects.length === 0) return <EmptyState />;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.greet}>Olá, {CURRENT_USER.name}</span>
          <h1 className={styles.h1}>Seus projetos.</h1>
          <p className={styles.sub}>Acompanhe diagnósticos, anexos pendentes e prazos sem sair daqui.</p>
        </div>
        <Link href="/novo-projeto" className={styles.ctaCard}>
          <span className={styles.ctaPlus}>
            <IconPlus />
          </span>
          <span className={styles.ctaBody}>
            <span className={styles.ctaTitle}>Novo projeto</span>
            <span className={styles.ctaSub}>Cole o edital ou comece em branco</span>
          </span>
          <span className={styles.ctaArrow}>
            <IconArrow />
          </span>
        </Link>
      </section>

      <div className="section-head" style={{ marginTop: 12 }}>
        <span className="section-title">
          Projetos salvos <span className="count">{projects.length}</span>
        </span>
        <button className="section-action" type="button">
          Ver todos
        </button>
      </div>
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerInfo}>
          <span className={styles.bannerEyebrow}>
            <IconSparkles /> Casados com seu perfil
          </span>
          <h2 className={styles.bannerTitle}>3 editais combinam com você agora.</h2>
          <p className={styles.bannerSub}>Selecionados por área, estado e experiência informados no onboarding.</p>
          <Link href="/match" className={styles.bannerLink}>
            Ver todos no Match <IconArrow width={14} height={14} />
          </Link>
        </div>
        <div className={styles.rail}>
          {SUGGESTED_EDITAIS.map((e) => (
            <Link key={e.id} href={`/editais/${e.id}`} className={styles.mini}>
              <div className={styles.miniTag}>{e.agency}</div>
              <div className={styles.miniTitle}>{e.name}</div>
              <div className={styles.miniFoot}>
                <span className={styles.miniMatch}>
                  <IconSparkles /> {e.match}%
                </span>
                <span className={styles.miniDeadline}>{e.deadline}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIllo} aria-hidden="true">
        <IconFolderPlus width={64} height={64} />
      </div>
      <h2>Comece seu primeiro projeto.</h2>
      <p>Cole um edital ou descreva sua ideia — o EditalFit te entrega um diagnóstico em ~90 segundos.</p>
      <div className={styles.tips}>
        {["Cole o link ou PDF do edital", "Descreva seu projeto em 2 frases", "Receba diagnóstico por critério"].map((t, i) => (
          <div key={t} className={styles.tip}>
            <span className={styles.tipNum}>{i + 1}</span>
            {t}
          </div>
        ))}
      </div>
      <Link href="/novo-projeto" className="btn btn--primary btn--lg">
        Criar meu primeiro projeto
        <span className="btn__arrow">
          <IconArrow />
        </span>
      </Link>
    </div>
  );
}
