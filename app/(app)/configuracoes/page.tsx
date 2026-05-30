"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PROFILE_ROLES, PROFILE_AREAS, BR_STATES } from "@/lib/data";
import {
  IconAlert,
  IconBack,
  IconBell,
  IconCamera,
  IconCheck,
  IconChevDown,
  IconChevRight,
  IconClock,
  IconEye,
  IconInbox,
  IconLayers,
  IconLock,
  IconMapPin,
  IconSearch,
  IconShield,
  IconSparkles,
  IconTarget,
  IconTrash,
  IconUser,
} from "@/components/icons";
import styles from "./configuracoes.module.css";

const USER = {
  name: "Ana Lima",
  email: "ana.lima@usp.br",
  role: "posgrad",
  areas: ["tec", "saude"],
  uf: "MA",
  notifications: { suggested: true, deadline: true, requested: false },
};

const STRENGTH_LABEL = ["Fraca", "Fraca", "Razoável", "Boa", "Forte"];

function ConfigInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [name, setName] = useState(USER.name);
  const [role, setRole] = useState(USER.role);
  const [areas, setAreas] = useState<string[]>(USER.areas);
  const [uf, setUf] = useState(USER.uf);
  const [notifs, setNotifs] = useState(USER.notifications);
  const [sheet, setSheet] = useState<null | "role" | "areas" | "uf">(null);
  const [pwOpen, setPwOpen] = useState(sp.get("senha") === "1");
  const [confirmDelete, setConfirmDelete] = useState(sp.get("excluir") === "1");

  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwCur, setPwCur] = useState("");
  const [pwNew, setPwNew] = useState("");
  const reqs = useMemo(() => ({ len: pwNew.length >= 8, up: /[A-Z]/.test(pwNew), num: /[0-9]/.test(pwNew), sym: /[^a-zA-Z0-9]/.test(pwNew) }), [pwNew]);
  const strength = Object.values(reqs).filter(Boolean).length;
  const strengthClass = strength >= 3 ? "on" : strength >= 2 ? "warn" : "";
  const canUpdatePw = pwCur.length > 0 && strength >= 3;

  const dirty =
    name !== USER.name ||
    role !== USER.role ||
    JSON.stringify([...areas].sort()) !== JSON.stringify([...USER.areas].sort()) ||
    uf !== USER.uf ||
    notifs.suggested !== USER.notifications.suggested ||
    notifs.deadline !== USER.notifications.deadline ||
    notifs.requested !== USER.notifications.requested;

  const roleLabel = PROFILE_ROLES.find((o) => o.id === role)?.label ?? "—";
  const ufLabel = BR_STATES.find((s) => s.uf === uf)?.name ?? "—";
  const areasLabel = areas.length ? areas.map((a) => PROFILE_AREAS.find((o) => o.id === a)?.label ?? a).join(", ") : "Nenhuma área selecionada";
  const initials = (name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("") || "AL").toUpperCase();

  const REQS: [keyof typeof reqs, string][] = [["len", "8+ caracteres"], ["up", "1 maiúscula"], ["num", "1 número"], ["sym", "1 símbolo"]];

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <Link href="/inicio" className={styles.back} aria-label="Voltar">
          <IconBack />
        </Link>
        <span className="eyebrow">Configurações da conta</span>
      </header>

      {/* Dados pessoais */}
      <Section icon={<IconUser />} title="Dados pessoais">
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
              <div className={styles.identityMail}>{USER.email}</div>
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
              <input type="email" value={USER.email} readOnly tabIndex={-1} />
              <span style={{ padding: "0 14px", color: "var(--ink-400)" }}>
                <IconLock />
              </span>
            </div>
            <div className={styles.fieldNote}>O e-mail de cadastro não pode ser alterado.</div>
          </div>
        </div>
      </Section>

      {/* Perfil */}
      <Section icon={<IconTarget />} title="Perfil" hint="Os mesmos dados do onboarding. Edite quando quiser para refinar as sugestões de editais.">
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
      </Section>

      {/* Segurança */}
      <Section icon={<IconShield />} title="Segurança">
        <div className={styles.card}>
          <button type="button" className={`${styles.row} ${styles.rowToggle}`} aria-expanded={pwOpen} onClick={() => setPwOpen((v) => !v)}>
            <span className={styles.rowIcon}>
              <IconLock />
            </span>
            <span className={styles.rowBody}>
              <span className={styles.rowLabel}>Alterar senha</span>
              <span className={styles.rowValue}>Última alteração há 3 meses</span>
            </span>
            <IconChevDown style={{ color: "var(--ink-400)", transform: pwOpen ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }} />
          </button>
          {pwOpen && (
            <div className={styles.pwBox}>
              <div className="field">
                <label className="field__label" htmlFor="cur">
                  Senha atual
                </label>
                <div className="field__wrap">
                  <input id="cur" type={showCur ? "text" : "password"} value={pwCur} onChange={(e) => setPwCur(e.target.value)} placeholder="Sua senha atual" />
                  <button className="field__toggle" type="button" onClick={() => setShowCur((v) => !v)} aria-label="Mostrar senha">
                    <IconEye open={showCur} />
                  </button>
                </div>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label className="field__label" htmlFor="new">
                  <span>Nova senha</span>
                  <span className="hint" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <IconLock /> 8+ caracteres
                  </span>
                </label>
                <div className="field__wrap">
                  <input id="new" type={showNew ? "text" : "password"} value={pwNew} onChange={(e) => setPwNew(e.target.value)} placeholder="Crie uma senha forte" />
                  <button className="field__toggle" type="button" onClick={() => setShowNew((v) => !v)} aria-label="Mostrar senha">
                    <IconEye open={showNew} />
                  </button>
                </div>
                <div className="pw-strength">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`pw-bar ${i < strength ? strengthClass : ""}`} />
                  ))}
                  <span className="pw-label">{STRENGTH_LABEL[strength]}</span>
                </div>
                <div className="pw-reqs">
                  {REQS.map(([k, label]) => (
                    <span key={k} className={`pw-req ${reqs[k] ? "met" : ""}`}>
                      <span className="pip">
                        <IconCheck />
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <button type="button" className="btn btn--primary" disabled={!canUpdatePw} onClick={() => { setPwCur(""); setPwNew(""); setPwOpen(false); }} style={{ marginTop: 16 }}>
                <IconLock /> Atualizar senha
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* Notificações */}
      <Section icon={<IconBell />} title="Notificações">
        <div className={styles.card}>
          <ToggleRow icon={<IconSparkles />} label="Novos editais sugeridos" desc="Avisar quando surgir um edital com alta aderência ao seu perfil." checked={notifs.suggested} onChange={(v) => setNotifs((n) => ({ ...n, suggested: v }))} />
          <ToggleRow icon={<IconClock />} label="Prazo se aproximando" desc="Lembrar quando faltar pouco para o fim de um edital dos seus projetos." checked={notifs.deadline} onChange={(v) => setNotifs((n) => ({ ...n, deadline: v }))} />
          <ToggleRow icon={<IconInbox />} label="Edital solicitado cadastrado" desc="Avisar quando um edital que você pediu for adicionado à base." checked={notifs.requested} onChange={(v) => setNotifs((n) => ({ ...n, requested: v }))} />
        </div>
      </Section>

      {/* Zona de perigo */}
      <Section icon={<IconAlert />} title="Zona de perigo" danger>
        <div className={`${styles.card} ${styles.danger}`}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={styles.dangerTitle}>Excluir conta</div>
            <div className={styles.dangerText}>Remove permanentemente sua conta, projetos, documentos e diagnósticos.</div>
          </div>
          <button type="button" className={styles.dangerBtn} onClick={() => setConfirmDelete(true)}>
            <IconTrash /> Excluir conta
          </button>
        </div>
      </Section>

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

      {confirmDelete && <DeleteSheet email={USER.email} onCancel={() => setConfirmDelete(false)} onConfirm={() => router.push("/")} />}
    </div>
  );
}

function Section({ icon, title, hint, danger, children }: { icon: React.ReactNode; title: string; hint?: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={`${styles.sectionTitle} ${danger ? styles.sectionDanger : ""}`}>
        {icon} {title}
      </div>
      {hint && <p className={styles.sectionHint}>{hint}</p>}
      {children}
    </section>
  );
}

function ToggleRow({ icon, label, desc, checked, onChange }: { icon: React.ReactNode; label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
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

function OptionSheet({ title, options, value, multi, search, onApply, onClose }: { title: string; options: { id: string; label: string }[]; value: string[]; multi?: boolean; search?: boolean; onApply: (v: string[]) => void; onClose: () => void }) {
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

function DeleteSheet({ email, onCancel, onConfirm }: { email: string; onCancel: () => void; onConfirm: () => void }) {
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

export default function ConfiguracoesPage() {
  return (
    <Suspense fallback={null}>
      <ConfigInner />
    </Suspense>
  );
}
