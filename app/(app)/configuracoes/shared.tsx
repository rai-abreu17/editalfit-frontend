"use client";

import { useState } from "react";
import { IconSearch, IconCheck, IconAlert } from "@/components/icons";
import styles from "./configuracoes.module.css";

export const USER_MOCK = {
  name: "Ana Lima",
  email: "ana.lima@usp.br",
  role: "posgrad",
  areas: ["tec", "saude"],
  uf: "MA",
  notifications: { suggested: true, deadline: true, requested: false },
};

export const STRENGTH_LABEL = ["Fraca", "Fraca", "Razoável", "Boa", "Forte"];

export function OptionSheet({ title, options, value, multi, search, onApply, onClose }: { title: string; options: { id: string; label: string }[]; value: string[]; multi?: boolean; search?: boolean; onApply: (v: string[]) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<string[]>(value);
  const [query, setQuery] = useState("");
  const filtered = search ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()) || o.id.toLowerCase().includes(query.trim().toLowerCase())) : options;
  const toggle = (id: string) => {
    if (multi) setDraft((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
    else setDraft([id]);
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className={styles.sheet} role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetTitle}>{title}</div>
        {search && (
          <div className={styles.sheetSearch}>
            <IconSearch />
            <input type="text" placeholder="Buscar por estado ou UF…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        )}
        <div className={styles.sheetList}>
          {filtered.map((opt) => {
            const active = draft.includes(opt.id);
            return (
              <button key={opt.id} type="button" className={`${styles.sheetOpt} ${active ? styles.sheetOptOn : ""}`} onClick={() => toggle(opt.id)}>
                <span>{opt.label}</span>
                {active && <IconCheck />}
              </button>
            );
          })}
        </div>
        <div className={styles.sheetFoot}>
          {multi && (
            <button type="button" className="btn btn--secondary" onClick={() => setDraft([])}>
              Limpar
            </button>
          )}
          <button type="button" className="btn btn--primary" style={{ flex: 1 }} onClick={() => onApply(draft)}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteSheet({ email, onCancel, onConfirm }: { email: string; onCancel: () => void; onConfirm: () => void }) {
  const [ack, setAck] = useState(false);
  return (
    <div className="overlay" onClick={onCancel}>
      <div className={styles.confirm} role="alertdialog" aria-label="Confirmar exclusão da conta" onClick={(e) => e.stopPropagation()}>
        <div className={styles.confirmIcon}>
          <IconAlert />
        </div>
        <h2 className={styles.confirmTitle}>Excluir sua conta?</h2>
        <p className={styles.confirmText}>
          Isto remove permanentemente <strong>{email}</strong>, todos os seus projetos, documentos e diagnósticos. Esta ação <strong>não pode ser desfeita</strong>.
        </p>
        <label className="check-row" style={{ margin: "2px 0 16px", textAlign: "left" }}>
          <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
          <span>Entendo que esta ação é permanente e apaga todos os meus dados.</span>
        </label>
        <div className={styles.confirmFoot}>
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn--danger" disabled={!ack} onClick={onConfirm}>
            Excluir conta
          </button>
        </div>
      </div>
    </div>
  );
}

export function ToggleRow({ icon, label, desc, checked, onChange }: { icon: React.ReactNode; label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className={styles.toggleRow}>
      <span className={styles.rowIcon}>{icon}</span>
      <div className={styles.rowBody}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowDesc}>{desc}</span>
      </div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`${styles.switch} ${checked ? styles.switchOn : ""}`} onClick={() => onChange(!checked)}>
        <span className={styles.knob} />
      </button>
    </div>
  );
}
