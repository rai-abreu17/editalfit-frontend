"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { IconArrow, IconBack, IconCheck, IconNo, IconSearch, IconYes } from "@/components/icons";
import styles from "./onboarding.module.css";

const TOTAL = 4;

const ROLE_OPTIONS = [
  { id: "grad", label: "Estudante de graduação", desc: "Cursando ensino superior" },
  { id: "posgrad", label: "Estudante de pós-graduação", desc: "Mestrado, doutorado, especialização" },
  { id: "empreendedor", label: "Empreendedor iniciante", desc: "Tocando um projeto ou negócio" },
  { id: "pesquisador", label: "Pesquisador", desc: "Atua em laboratório, ICT ou instituição" },
];

const AREA_OPTIONS = [
  { id: "tec", label: "Tecnologia", desc: "Software, IA, dados, hardware" },
  { id: "agro", label: "Agronegócio", desc: "Agro-tech, bioeconomia" },
  { id: "saude", label: "Saúde", desc: "Healthtech, biotec, dispositivos" },
  { id: "edu", label: "Educação", desc: "Edtech, formação, ensino" },
  { id: "amb", label: "Meio Ambiente", desc: "Sustentabilidade, ESG, clima" },
  { id: "outro", label: "Outro", desc: "Conto depois pelo perfil" },
];

const STATES: { uf: string; name: string }[] = [
  { uf: "AC", name: "Acre" }, { uf: "AL", name: "Alagoas" }, { uf: "AP", name: "Amapá" }, { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" }, { uf: "CE", name: "Ceará" }, { uf: "DF", name: "Distrito Federal" }, { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" }, { uf: "MA", name: "Maranhão" }, { uf: "MT", name: "Mato Grosso" }, { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" }, { uf: "PA", name: "Pará" }, { uf: "PB", name: "Paraíba" }, { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" }, { uf: "PI", name: "Piauí" }, { uf: "RJ", name: "Rio de Janeiro" }, { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" }, { uf: "RO", name: "Rondônia" }, { uf: "RR", name: "Roraima" }, { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" }, { uf: "SE", name: "Sergipe" }, { uf: "TO", name: "Tocantins" },
];

const EYEBROW = ["Sobre você · 1 de 4", "Área de atuação · 2 de 4", "Localização · 3 de 4", "Experiência · 4 de 4"];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [uf, setUf] = useState("");
  const [exp, setExp] = useState("");

  const progressPct = Math.round((step / TOTAL) * 100);
  const canContinue =
    (step === 1 && !!role) ||
    (step === 2 && areas.length > 0) ||
    (step === 3 && !!uf) ||
    (step === 4 && !!exp);
  const isLast = step === TOTAL;

  const finish = () => router.push("/inicio");
  const handleContinue = () => {
    if (!canContinue) return;
    if (isLast) finish();
    else setStep((s) => s + 1);
  };

  return (
    <div className={styles.wrap}>
      <Brand className={styles.brand} />

      <div className={styles.card}>
        <div className={styles.topbar}>
          <button
            className={styles.back}
            type="button"
            aria-label="Voltar"
            onClick={() => step > 1 && setStep((s) => s - 1)}
            style={step === 1 ? { visibility: "hidden" } : undefined}
          >
            <IconBack />
          </button>
          <span className={styles.topbarTitle}>Onboarding</span>
          <button className={styles.skip} type="button" onClick={finish}>
            Pular por agora
          </button>
        </div>

        <div className={styles.progress}>
          <span>
            {String(step).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progressPct}%` }} />
          </div>
          <span>{progressPct}%</span>
        </div>

        <div className={styles.body}>
          <div className={styles.eyebrow}>{EYEBROW[step - 1]}</div>

          {step === 1 && (
            <Step title="Quem é você?" sub="Ajustamos a linguagem e o ranking de editais ao seu perfil.">
              <div className={styles.opts} role="radiogroup">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={role === opt.id}
                    className={`${styles.opt} ${role === opt.id ? styles.active : ""}`}
                    onClick={() => setRole(opt.id)}
                  >
                    <span className={styles.radio} />
                    <span className={styles.optText}>
                      <span className={styles.optLabel}>{opt.label}</span>
                      <span className={styles.optDesc}>{opt.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="Qual é a sua área de atuação?" sub="Pode marcar mais de uma. Usamos pra casar projetos com editais certos.">
              <div className={styles.optsGrid} role="group">
                {AREA_OPTIONS.map((opt) => {
                  const on = areas.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      className={`${styles.opt} ${on ? styles.active : ""}`}
                      onClick={() => setAreas((v) => (v.includes(opt.id) ? v.filter((x) => x !== opt.id) : [...v, opt.id]))}
                    >
                      <span className={styles.check}>{on && <IconCheck style={{ color: "#fff" }} />}</span>
                      <span className={styles.optText}>
                        <span className={styles.optLabel}>{opt.label}</span>
                        <span className={styles.optDesc}>{opt.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>
          )}

          {step === 3 && <StateStep value={uf} onChange={setUf} />}

          {step === 4 && (
            <Step title="Já submeteu algum edital antes?" sub="Ajustamos o tom das mensagens — de orientações iniciais a atalhos avançados.">
              <div className={styles.binary} role="radiogroup">
                <button type="button" role="radio" aria-checked={exp === "yes"} className={`${styles.binaryCard} ${exp === "yes" ? styles.active : ""}`} onClick={() => setExp("yes")}>
                  <span className={styles.binaryIcon}>
                    <IconYes />
                  </span>
                  <span className={styles.binaryLabel}>Sim</span>
                  <span className={styles.binaryDesc}>Já passei por um edital — pula o básico.</span>
                </button>
                <button type="button" role="radio" aria-checked={exp === "no"} className={`${styles.binaryCard} ${exp === "no" ? styles.active : ""}`} onClick={() => setExp("no")}>
                  <span className={styles.binaryIcon}>
                    <IconNo />
                  </span>
                  <span className={styles.binaryLabel}>Não</span>
                  <span className={styles.binaryDesc}>É a primeira vez — me oriente desde o início.</span>
                </button>
              </div>
            </Step>
          )}
        </div>

        <button className="btn btn--primary btn--block" type="button" disabled={!canContinue} onClick={handleContinue} style={{ marginTop: 24 }}>
          {isLast ? "Pronto, vamos começar" : "Continuar"}
          <span className="btn__arrow">
            <IconArrow />
          </span>
        </button>
      </div>
    </div>
  );
}

function Step({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>{sub}</p>
      {children}
    </>
  );
}

function StateStep({ value, onChange }: { value: string; onChange: (uf: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATES;
    return STATES.filter((s) => s.name.toLowerCase().includes(q) || s.uf.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <h1 className={styles.title}>Em qual estado você está?</h1>
      <p className={styles.sub}>Priorizamos editais estaduais e federais com janela na sua região.</p>

      <div className={styles.search}>
        <IconSearch />
        <input type="text" placeholder="Buscar por estado ou UF…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className={styles.stateList} role="listbox">
        {filtered.length === 0 && <div className={styles.stateEmpty}>Nenhum estado encontrado.</div>}
        {filtered.map((s) => (
          <button key={s.uf} type="button" role="option" aria-selected={value === s.uf} className={`${styles.stateRow} ${value === s.uf ? styles.active : ""}`} onClick={() => onChange(s.uf)}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className={styles.stateUf}>{s.uf}</span>
              <span className={styles.stateName}>{s.name}</span>
            </span>
            <span className={styles.stateCheck}>{value === s.uf && <IconCheck />}</span>
          </button>
        ))}
      </div>
    </>
  );
}
