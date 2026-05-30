import Link from "next/link";
import {
  IconUser,
  IconTarget,
  IconShield,
  IconBell,
  IconAlert,
  IconChevRight,
} from "@/components/icons";
import styles from "./configuracoes.module.css";

export default function ConfiguracoesHub() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <span className="eyebrow">Configurações da conta</span>
      </header>

      <div className={styles.hubGrid}>
        <Link href="/configuracoes/dados-pessoais" className={styles.hubCard}>
          <div className={styles.hubCardIcon}>
            <IconUser />
          </div>
          <div className={styles.hubCardBody}>
            <div className={styles.hubCardTitle}>Dados pessoais</div>
            <div className={styles.hubCardDesc}>Nome completo, foto de perfil e e-mail</div>
          </div>
          <IconChevRight className={styles.hubCardArrow} />
        </Link>

        <Link href="/configuracoes/perfil" className={styles.hubCard}>
          <div className={styles.hubCardIcon}>
            <IconTarget />
          </div>
          <div className={styles.hubCardBody}>
            <div className={styles.hubCardTitle}>Perfil</div>
            <div className={styles.hubCardDesc}>Tipo de usuário, área de atuação e estado</div>
          </div>
          <IconChevRight className={styles.hubCardArrow} />
        </Link>

        <Link href="/configuracoes/seguranca" className={styles.hubCard}>
          <div className={styles.hubCardIcon}>
            <IconShield />
          </div>
          <div className={styles.hubCardBody}>
            <div className={styles.hubCardTitle}>Segurança</div>
            <div className={styles.hubCardDesc}>Alteração de senha</div>
          </div>
          <IconChevRight className={styles.hubCardArrow} />
        </Link>

        <Link href="/configuracoes/notificacoes" className={styles.hubCard}>
          <div className={styles.hubCardIcon}>
            <IconBell />
          </div>
          <div className={styles.hubCardBody}>
            <div className={styles.hubCardTitle}>Notificações</div>
            <div className={styles.hubCardDesc}>Alertas e lembretes por e-mail</div>
          </div>
          <IconChevRight className={styles.hubCardArrow} />
        </Link>

        <Link href="/configuracoes/zona-de-perigo" className={styles.hubCard}>
          <div className={styles.hubCardIcon} style={{ background: "var(--danger-100)", color: "var(--danger-700)" }}>
            <IconAlert />
          </div>
          <div className={styles.hubCardBody}>
            <div className={styles.hubCardTitle} style={{ color: "var(--danger-700)" }}>Zona de perigo</div>
            <div className={styles.hubCardDesc}>Exclusão de conta e dados</div>
          </div>
          <IconChevRight className={styles.hubCardArrow} />
        </Link>
      </div>
    </div>
  );
}
