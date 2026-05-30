"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DIAG_PROJECT } from "@/lib/diag";
import { IconArrow, IconBack, IconCheck, IconErrorBig, IconFileX, IconPencil, IconSpinner, IconWarn } from "@/components/icons";
import styles from "./erro.module.css";

const FAILED_FILES = [
  { id: "f1", name: "cronograma-fisico-financeiro.png", reason: "Não conseguimos ler este arquivo. Verifique se ele está corrompido ou em um formato inválido." },
];

function ErroInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const isFile = (sp.get("reason") ?? "file") === "file";
  const previousStatusLabel = "Rascunho";
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    if (retrying) return;
    setRetrying(true);
    setTimeout(() => router.push("/diagnostico?state=loading"), 1400);
  };

  const heading = isFile ? "Não foi possível concluir a análise." : "Algo deu errado do nosso lado.";
  const lede = isFile
    ? "Um dos arquivos enviados não pôde ser lido. Ajuste o item abaixo e tente de novo — o restante da sua proposta continua salvo."
    : "Tivemos um problema interno ao processar sua análise. Não foi nada que você fez, e seus documentos estão a salvo.";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/novo-projeto/upload" className={styles.iconBtn} aria-label="Voltar">
          <IconBack />
        </Link>
        <div className={styles.headerTitle}>
          <div className={styles.headerSub}>Diagnóstico</div>
          <div className={styles.headerName}>{DIAG_PROJECT.editalShort}</div>
        </div>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.head} role="alert">
        <div className="success-mark success-mark--danger" aria-hidden="true">
          <IconErrorBig />
        </div>
        <h1 className={styles.h1}>{heading}</h1>
        <p className={styles.lede}>{lede}</p>
      </div>

      {isFile && (
        <div className={styles.cause}>
          <div className={styles.causeLabel}>
            <IconWarn /> {FAILED_FILES.length === 1 ? "Arquivo com problema" : `${FAILED_FILES.length} arquivos com problema`}
          </div>
          {FAILED_FILES.map((f) => (
            <div key={f.id} className={styles.file}>
              <span className={styles.fileIcon}>
                <IconFileX />
              </span>
              <div>
                <div className={styles.fileName}>{f.name}</div>
                <div className={styles.fileReason}>{f.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.reassure} role="status">
        <span className={styles.reassureIcon}>
          <IconCheck />
        </span>
        <div>
          <div className={styles.reassureTitle}>Seus documentos estão preservados</div>
          <div className={styles.reassureText}>
            Nada foi perdido. O projeto voltou para <strong>{previousStatusLabel}</strong>, exatamente como estava antes de você clicar em Analisar.
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <button type="button" className="btn btn--primary btn--block" onClick={retry} disabled={retrying} aria-busy={retrying}>
          {retrying ? (
            <>
              <span style={{ display: "grid", placeItems: "center" }} className="spin">
                <IconSpinner />
              </span>
              Reprocessando…
            </>
          ) : (
            <>
              Tentar analisar novamente
              <span className="btn__arrow">
                <IconArrow />
              </span>
            </>
          )}
        </button>
        <Link href="/novo-projeto/upload?modo=edicao" className="btn btn--secondary btn--block">
          <IconPencil /> Revisar documentos
        </Link>
        <Link href="/inicio" className={styles.homeLink}>
          Voltar ao Home
        </Link>
      </div>
    </div>
  );
}

export default function DiagErroPage() {
  return (
    <Suspense fallback={null}>
      <ErroInner />
    </Suspense>
  );
}
