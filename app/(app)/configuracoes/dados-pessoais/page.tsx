"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack, IconCamera, IconLock, IconCheck } from "@/components/icons";
import { USER_MOCK } from "../shared";
import styles from "../configuracoes.module.css";

export default function DadosPessoaisPage() {
  const [name, setName] = useState(USER_MOCK.name);
  const initials = (name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("") || "AL").toUpperCase();
  const dirty = name !== USER_MOCK.name;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/configuracoes" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Dados pessoais</span>
      </header>

      <section>
        <div className={styles.card}>
          <div className={styles.identity}>
            <div className={styles.avatarBig}>
              {initials}
              <label className={styles.avatarEdit} aria-label="Trocar foto de perfil">
                <IconCamera />
                <input type="file" hidden accept="image/*" />
              </label>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className={styles.identityName}>{name || "Seu nome"}</div>
              <div className={styles.identityMail}>{USER_MOCK.email}</div>
              <label className={styles.photoLink}>
                Trocar foto
                <input type="file" hidden accept="image/*" />
              </label>
            </div>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="set-name">
              Nome completo
            </label>
            <div className="field__wrap">
              <input id="set-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" />
            </div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label className="field__label">
              <span>E-mail</span>
              <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <IconLock /> Somente leitura
              </span>
            </label>
            <div className="field__wrap" style={{ background: "var(--surface-2)" }}>
              <input type="email" value={USER_MOCK.email} readOnly tabIndex={-1} />
              <span style={{ padding: "0 14px", color: "var(--ink-400)" }}>
                <IconLock />
              </span>
            </div>
            <div className={styles.fieldNote}>O e-mail de cadastro não pode ser alterado.</div>
          </div>
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
    </div>
  );
}
