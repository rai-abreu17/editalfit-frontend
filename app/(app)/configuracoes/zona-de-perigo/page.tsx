"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconBack, IconAlert, IconTrash } from "@/components/icons";
import { USER_MOCK, DeleteSheet } from "../shared";
import styles from "../configuracoes.module.css";

export default function ZonaDePerigoPage() {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/configuracoes" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Zona de perigo</span>
      </header>

      <section>
        <div className={`${styles.card} ${styles.danger}`}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.dangerTitle}>Excluir conta</div>
            <div className={styles.dangerText}>Remove permanentemente sua conta, projetos, documentos e diagnósticos.</div>
          </div>
          <button type="button" className={styles.dangerBtn} onClick={() => setConfirmDelete(true)}>
            <IconTrash /> Excluir conta
          </button>
        </div>
      </section>

      {confirmDelete && <DeleteSheet email={USER_MOCK.email} onCancel={() => setConfirmDelete(false)} onConfirm={() => router.push("/")} />}
    </div>
  );
}
