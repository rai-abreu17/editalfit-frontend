"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack, IconUser, IconLayers, IconMapPin, IconChevRight, IconCheck } from "@/components/icons";
import { USER_MOCK, OptionSheet } from "../shared";
import { PROFILE_ROLES, PROFILE_AREAS, BR_STATES } from "@/lib/data";
import styles from "../configuracoes.module.css";

export default function PerfilPage() {
  const [role, setRole] = useState(USER_MOCK.role);
  const [areas, setAreas] = useState<string[]>(USER_MOCK.areas);
  const [uf, setUf] = useState(USER_MOCK.uf);
  const [sheet, setSheet] = useState<null | "role" | "areas" | "uf">(null);

  const dirty =
    role !== USER_MOCK.role ||
    JSON.stringify([...areas].sort()) !== JSON.stringify([...USER_MOCK.areas].sort()) ||
    uf !== USER_MOCK.uf;

  const roleLabel = PROFILE_ROLES.find((o) => o.id === role)?.label ?? "—";
  const ufLabel = BR_STATES.find((s) => s.uf === uf)?.name ?? "—";
  const areasLabel = areas.length ? areas.map((a) => PROFILE_AREAS.find((o) => o.id === a)?.label ?? a).join(", ") : "Nenhuma área selecionada";

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/configuracoes" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Perfil</span>
      </header>
      <p className={styles.sectionHint}>Os mesmos dados do onboarding. Edite quando quiser para refinar as sugestões de editais.</p>

      <section>
        <div className={styles.card}>
          <button type="button" className={styles.row} onClick={() => setSheet("role")}>
            <span className={styles.rowIcon}>
              <IconUser />
            </span>
            <span className={styles.rowBody}>
              <span className={styles.rowLabel}>Tipo de usuário</span>
              <span className={styles.rowValue}>{roleLabel}</span>
            </span>
            <IconChevRight style={{ color: "var(--ink-400)" }} />
          </button>
          <button type="button" className={styles.row} onClick={() => setSheet("areas")}>
            <span className={styles.rowIcon}>
              <IconLayers />
            </span>
            <span className={styles.rowBody}>
              <span className={styles.rowLabel}>Área de atuação</span>
              <span className={styles.rowValue}>{areasLabel}</span>
            </span>
            <IconChevRight style={{ color: "var(--ink-400)" }} />
          </button>
          <button type="button" className={styles.row} onClick={() => setSheet("uf")}>
            <span className={styles.rowIcon}>
              <IconMapPin />
            </span>
            <span className={styles.rowBody}>
              <span className={styles.rowLabel}>Estado</span>
              <span className={styles.rowValue}>{ufLabel}</span>
            </span>
            <IconChevRight style={{ color: "var(--ink-400)" }} />
          </button>
        </div>
      </section>

      {dirty && (
        <div className={styles.savebar}>
          <span className={styles.savebarNote}>Você tem alterações não salvas</span>
          <button type="button" className="btn btn--primary">
            Salvar alterações <IconCheck />
          </button>
        </div>
      )}

      {sheet === "role" && <OptionSheet title="Tipo de usuário" options={PROFILE_ROLES} value={[role]} onApply={(v) => { if (v[0]) setRole(v[0]); setSheet(null); }} onClose={() => setSheet(null)} />}
      {sheet === "areas" && <OptionSheet title="Área de atuação" options={PROFILE_AREAS} value={areas} multi onApply={(v) => { setAreas(v); setSheet(null); }} onClose={() => setSheet(null)} />}
      {sheet === "uf" && <OptionSheet title="Estado" options={BR_STATES.map((s) => ({ id: s.uf, label: s.name }))} value={[uf]} search onApply={(v) => { if (v[0]) setUf(v[0]); setSheet(null); }} onClose={() => setSheet(null)} />}
    </div>
  );
}
