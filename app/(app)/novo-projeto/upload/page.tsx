"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IconArrow,
  IconBack,
  IconBook,
  IconCheck,
  IconClock,
  IconClose,
  IconDoc,
  IconEye,
  IconLayers,
  IconPaperclip,
  IconPeople,
  IconReplace,
  IconSave,
  IconUpload,
  IconWarn,
} from "@/components/icons";
import styles from "./upload.module.css";

type Status = "AGUARDANDO" | "ENVIADO" | "PENDENTE" | "ERRO";
interface FileInfo {
  name: string;
  size: number;
}
interface Entry {
  status: Status;
  file: FileInfo | null;
  errorMessage?: string;
}
interface DocDef {
  id: string;
  name: string;
  desc: string;
  required: boolean;
  type: string;
}

const PROPOSTA = {
  edital: { name: "Programa Centelha — Ideação 2026", agency: "FAPEMA · Inova Maranhão" },
  stage: { label: "Ideação", tag: "TRL 1–3" },
};

const DOCS: DocDef[] = [
  { id: "d1", name: "Resumo executivo", desc: "Síntese do projeto: problema, solução e impacto esperado.", required: true, type: "resumo" },
  { id: "d2", name: "Memorial descritivo", desc: "Detalhamento técnico da solução proposta e estado da arte.", required: true, type: "memorial" },
  { id: "d3", name: "Plano de trabalho", desc: "Etapas, entregáveis e cronograma físico-financeiro.", required: true, type: "plano" },
  { id: "d4", name: "Orçamento detalhado", desc: "Planilha com rubricas, valores unitários e justificativas.", required: true, type: "orcamento" },
  { id: "d5", name: "Comprovante de vínculo", desc: "Documento que comprove o vínculo institucional do coordenador.", required: true, type: "vinculo" },
  { id: "d6", name: "Carta de anuência", desc: "Concordância formal da instituição proponente.", required: true, type: "anuencia" },
];

const STATUS_LABEL: Record<Status, string> = { AGUARDANDO: "Aguardando", ENVIADO: "Enviado", PENDENTE: "Pendente", ERRO: "Erro" };
const STATUS_TONE: Record<Status, string> = { AGUARDANDO: "draft", ENVIADO: "ok", PENDENTE: "warn", ERRO: "danger" };

const fmtSize = (b: number) => (b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

function UploadInner() {
  const router = useRouter();
  const sp = useSearchParams();
  // Modo edição = retorno de T14 (Detalhes do projeto) ou T13 (Erro) para reenvio.
  const editMode = sp.get("modo") === "edicao";
  // Caminho sem etapa (T10 pulado) tem 2 passos; com etapa, 3.
  const totalSteps = sp.get("total") === "2" ? 2 : 3;
  const backHref = editMode ? "/inicio" : totalSteps === 2 ? "/novo-projeto" : "/novo-projeto/etapa";

  const [entries, setEntries] = useState<Record<string, Entry>>(() => {
    const init: Record<string, Entry> = {};
    DOCS.forEach((d) => (init[d.id] = { status: "AGUARDANDO", file: null }));
    if (editMode) {
      // Documentos já enviados voltam como ENVIADO (com opção de substituir);
      // os marcados como "ainda não tenho" permanecem PENDENTE.
      init.d1 = { status: "ENVIADO", file: { name: "resumo-executivo-v2.pdf", size: 412 * 1024 } };
      init.d2 = { status: "ENVIADO", file: { name: "memorial-descritivo.pdf", size: Math.round(1.8 * 1024 * 1024) } };
      init.d3 = { status: "ENVIADO", file: { name: "plano-de-trabalho-v3.docx", size: 96 * 1024 } };
      init.d4 = { status: "PENDENTE", file: null };
    }
    return init;
  });
  const [projectName, setProjectName] = useState(editMode ? "Sensor IoT para qualidade do ar urbano" : "");
  const [cvs, setCvs] = useState<{ id: string; name: string; size: number }[]>(
    editMode
      ? [
          { id: "cv-1", name: "curriculo-ana-souza.pdf", size: 240 * 1024 },
          { id: "cv-2", name: "curriculo-joao-pereira.pdf", size: 198 * 1024 },
          { id: "cv-3", name: "curriculo-marina-lima.pdf", size: 210 * 1024 },
        ]
      : [],
  );

  const summary = useMemo(() => {
    const c = { AGUARDANDO: 0, ENVIADO: 0, PENDENTE: 0, ERRO: 0 };
    Object.values(entries).forEach((e) => (c[e.status] += 1));
    return c;
  }, [entries]);
  const canAnalyze = summary.ENVIADO > 0;

  const patch = (id: string, p: Partial<Entry>) => setEntries((prev) => ({ ...prev, [id]: { ...prev[id], ...p } }));
  const upload = (doc: DocDef, file: File) => patch(doc.id, { status: "ENVIADO", file: { name: file.name, size: file.size }, errorMessage: undefined });
  const togglePending = (doc: DocDef) => patch(doc.id, entries[doc.id].status === "PENDENTE" ? { status: "AGUARDANDO", file: null } : { status: "PENDENTE", file: null });
  const clearErr = (doc: DocDef) => patch(doc.id, { status: "AGUARDANDO", file: null, errorMessage: undefined });

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href={backHref} className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">{editMode ? "Editar documentos" : `Novo projeto · Passo ${totalSteps} de ${totalSteps}`}</span>
        <button type="button" className={styles.draftLink} onClick={() => router.push("/inicio")}>
          Salvar rascunho
        </button>
      </header>

      <div className={styles.context}>
        <div className={styles.contextEyebrow}>
          <IconDoc /> Proposta para
        </div>
        <h2 className={styles.contextName}>{PROPOSTA.edital.name}</h2>
        <div className={styles.contextMeta}>
          <span className="pill">
            <IconBook /> <strong>{PROPOSTA.edital.agency}</strong>
          </span>
          <span className="pill">
            <IconLayers /> {PROPOSTA.stage.label} · {PROPOSTA.stage.tag}
          </span>
        </div>
      </div>

      {editMode && (
        <div className={styles.editNotice} role="status">
          <span className={styles.editNoticeIcon}>
            <IconReplace />
          </span>
          <div>
            <div className={styles.editNoticeTitle}>Você está atualizando o projeto</div>
            <div className={styles.editNoticeText}>Uma nova versão do diagnóstico será gerada.</div>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className="section-head">
          <span className="section-title">Nome do projeto</span>
        </div>
        <div className="field" style={{ margin: 0 }}>
          <div className="field__wrap">
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex.: Plataforma de monitoramento ambiental" aria-label="Nome do projeto" />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className="section-head">
          <span className="section-title">
            <IconDoc /> Documentos obrigatórios <span className="count">{DOCS.length}</span>
          </span>
          <span className={styles.aside}>
            <strong>{summary.ENVIADO}</strong>/{DOCS.length} enviados
          </span>
        </div>
        <div className={styles.list}>
          {DOCS.map((doc) => (
            <DocItem key={doc.id} doc={doc} entry={entries[doc.id]} onUpload={upload} onTogglePending={togglePending} onClearError={clearErr} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className="section-head">
          <span className="section-title">
            <IconPeople /> Equipe
          </span>
        </div>
        <CVList files={cvs} onAdd={(f) => setCvs((p) => [...p, { id: `cv-${Date.now()}`, name: f.name, size: f.size }])} onRemove={(i) => setCvs((p) => p.filter((_, idx) => idx !== i))} />
      </div>

      {(summary.ENVIADO > 0 || summary.PENDENTE > 0 || summary.ERRO > 0) && (
        <div className={styles.progressMeta}>
          {summary.ENVIADO > 0 && <span className="badge badge--ok"><span className="pip" />{summary.ENVIADO} enviado{summary.ENVIADO > 1 ? "s" : ""}</span>}
          {summary.PENDENTE > 0 && <span className="badge badge--warn"><span className="pip" />{summary.PENDENTE} pendente{summary.PENDENTE > 1 ? "s" : ""}</span>}
          {summary.ERRO > 0 && <span className="badge badge--danger"><span className="pip" />{summary.ERRO} com erro</span>}
        </div>
      )}

      <div className={styles.bottomBar}>
        <button type="button" className="btn btn--secondary" onClick={() => router.push("/inicio")}>
          <IconSave width={14} height={14} /> Rascunho
        </button>
        <button type="button" className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }} disabled={!canAnalyze} onClick={() => router.push("/diagnostico")}>
          {editMode ? "Analisar novamente" : "Analisar"}
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </button>
      </div>
    </div>
  );
}

function DocItem({ doc, entry, onUpload, onTogglePending, onClearError }: { doc: DocDef; entry: Entry; onUpload: (d: DocDef, f: File) => void; onTogglePending: (d: DocDef) => void; onClearError: (d: DocDef) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const status = entry.status;
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onUpload(doc, f);
    e.target.value = "";
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onUpload(doc, f);
  };
  const statusIcon = { AGUARDANDO: <IconPaperclip />, ENVIADO: <IconCheck />, PENDENTE: <IconClock width={13} height={13} />, ERRO: <IconWarn /> }[status];

  return (
    <div
      className={`${styles.item} ${styles[`is_${status.toLowerCase()}` as keyof typeof styles] ?? ""} ${dragOver ? styles.dragOver : ""}`}
      onDragOver={status !== "ENVIADO" ? (e) => { e.preventDefault(); setDragOver(true); } : undefined}
      onDragLeave={() => setDragOver(false)}
      onDrop={status !== "ENVIADO" ? onDrop : undefined}
    >
      <div className={styles.itemHead}>
        <div className={styles.itemIcon}>{statusIcon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className={styles.itemName}>
            {doc.name}
            {doc.required && <span className={styles.req}>obrig.</span>}
          </div>
          <div className={styles.itemDesc}>{doc.desc}</div>
        </div>
        <span className={`badge badge--${STATUS_TONE[status]}`}>
          <span className="pip" />
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className={styles.itemBody}>
        {status === "AGUARDANDO" && (
          <label className={styles.drop}>
            <span className={styles.dropText}>
              <strong>Arraste o arquivo</strong> aqui ou selecione do dispositivo. PDF, DOCX ou PNG · até 10 MB.
            </span>
            <span className={styles.dropCta}>
              <IconUpload /> Selecionar
              <input type="file" hidden accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onPick} />
            </span>
          </label>
        )}
        {status === "ENVIADO" && entry.file && (
          <div className={styles.file}>
            <div className={styles.fileIcon}>
              <IconPaperclip />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={styles.fileName} title={entry.file.name}>{entry.file.name}</div>
              <div className={styles.fileSize}>{fmtSize(entry.file.size)}</div>
            </div>
          </div>
        )}
        {status === "PENDENTE" && (
          <div className={`${styles.note} ${styles.notePend}`}>
            <IconClock width={13} height={13} /> Marcado como “ainda não tenho”. Você poderá anexar depois sem perder o progresso.
          </div>
        )}
        {status === "ERRO" && (
          <div className={`${styles.note} ${styles.noteErr}`}>
            <IconWarn /> {entry.errorMessage || "Não conseguimos processar este arquivo. Verifique o formato e tente novamente."}
          </div>
        )}

        <div className={styles.actions}>
          {status === "AGUARDANDO" && (
            <button type="button" className={styles.action} onClick={() => onTogglePending(doc)}>
              <IconClock width={13} height={13} /> Ainda não tenho
            </button>
          )}
          {status === "ENVIADO" && (
            <label className={styles.action} style={{ cursor: "pointer" }}>
              <IconReplace /> Substituir
              <input type="file" hidden accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onPick} />
            </label>
          )}
          {status === "PENDENTE" && (
            <>
              <label className={styles.action} style={{ cursor: "pointer" }}>
                <IconUpload /> Enviar arquivo
                <input type="file" hidden accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onPick} />
              </label>
              <button type="button" className={styles.action} onClick={() => onTogglePending(doc)}>
                <IconClose width={12} height={12} /> Desfazer
              </button>
            </>
          )}
          {status === "ERRO" && (
            <>
              <label className={styles.action} style={{ cursor: "pointer" }}>
                <IconReplace /> Tentar novamente
                <input type="file" hidden accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={onPick} />
              </label>
              <button type="button" className={`${styles.action} ${styles.actionDanger}`} onClick={() => onClearError(doc)}>
                <IconClose width={12} height={12} /> Descartar
              </button>
            </>
          )}
          {(status === "AGUARDANDO" || status === "PENDENTE") && (
            <Link href={`/modelos?type=${doc.type}`} className={styles.action} onClick={(e) => e.stopPropagation()}>
              <IconEye open width={14} height={14} /> Ver modelo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function CVList({ files, onAdd, onRemove }: { files: { id: string; name: string; size: number }[]; onAdd: (f: File) => void; onRemove: (i: number) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const max = 5;
  const full = files.length >= max;
  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).slice(0, max - files.length).forEach(onAdd);
    e.target.value = "";
  };
  return (
    <div className={styles.cv}>
      <div className={styles.cvHead}>
        <span className={styles.cvTitle}>
          <IconPeople /> Currículos da equipe
        </span>
        <span className={styles.cvCount}>
          <strong>{files.length}</strong>/{max}
        </span>
      </div>
      <label
        className={`${styles.drop} ${dragOver ? styles.dragOver : ""} ${full ? styles.dropFull : ""}`}
        onDragOver={(e) => { if (!full) { e.preventDefault(); setDragOver(true); } }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (!full) Array.from(e.dataTransfer.files).slice(0, max - files.length).forEach(onAdd); }}
      >
        <span className={styles.dropText}>
          {full ? <><strong>Limite atingido.</strong> Remova um item para adicionar outro.</> : <><strong>Adicione os currículos</strong> dos integrantes. PDF · até {max} arquivos.</>}
        </span>
        {!full && (
          <span className={styles.dropCta}>
            <IconUpload /> Adicionar
            <input type="file" hidden multiple accept=".pdf,.doc,.docx" onChange={pick} />
          </span>
        )}
      </label>
      {files.length > 0 && (
        <div className={styles.cvList}>
          {files.map((f, i) => (
            <div className={styles.cvItem} key={f.id}>
              <div className={styles.fileIcon}>
                <IconPaperclip />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={styles.fileName} title={f.name}>{f.name}</div>
                <div className={styles.fileSize}>{fmtSize(f.size)}</div>
              </div>
              <button type="button" className={styles.cvRemove} aria-label={`Remover ${f.name}`} onClick={() => onRemove(i)}>
                <IconClose width={12} height={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={null}>
      <UploadInner />
    </Suspense>
  );
}
