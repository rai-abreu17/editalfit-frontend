"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack, IconSparkles, IconClock, IconInbox } from "@/components/icons";
import { USER_MOCK, ToggleRow } from "../shared";
import styles from "../configuracoes.module.css";

export default function NotificacoesPage() {
  const [notifs, setNotifs] = useState(USER_MOCK.notifications);

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/configuracoes" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Notificações</span>
      </header>

      <section>
        <div className={styles.card}>
          <ToggleRow icon={<IconSparkles />} label="Novos editais sugeridos" desc="Avisar quando surgir um edital com alta aderência ao seu perfil." checked={notifs.suggested} onChange={(v) => setNotifs((n) => ({ ...n, suggested: v }))} />
          <ToggleRow icon={<IconClock />} label="Prazo se aproximando" desc="Lembrar quando faltar pouco para o fim de um edital dos seus projetos." checked={notifs.deadline} onChange={(v) => setNotifs((n) => ({ ...n, deadline: v }))} />
          <ToggleRow icon={<IconInbox />} label="Edital solicitado cadastrado" desc="Avisar quando um edital que você pediu for adicionado à base." checked={notifs.requested} onChange={(v) => setNotifs((n) => ({ ...n, requested: v }))} />
        </div>
      </section>
    </div>
  );
}
