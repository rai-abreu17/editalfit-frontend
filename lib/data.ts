/* Shared mock data + domain types for the EditalFit web app.
   In production these would come from the API; kept here so screens
   stay consistent and the prototype is navigable. */

export type BadgeTone = "ok" | "warn" | "danger" | "brand" | "draft";

/* Estados do projeto — seção 5 do documento de fluxo. Exatamente cinco:
   RASCUNHO, ANALISANDO, ANALISADO, ATUALIZADO, ERRO, com as cores sugeridas. */
export type ProjectStatus =
  | "draft"
  | "diagnosing"
  | "analyzed"
  | "updated"
  | "error";

export const PROJECT_STATUS: Record<ProjectStatus, { tone: BadgeTone; label: string }> = {
  draft: { tone: "draft", label: "Rascunho" },
  diagnosing: { tone: "brand", label: "Analisando" },
  analyzed: { tone: "ok", label: "Analisado" },
  updated: { tone: "warn", label: "Atualizado" },
  error: { tone: "danger", label: "Erro" },
};

export interface Project {
  id: string;
  name: string;
  edital: string;
  status: ProjectStatus;
  lastActivity: string;
}

export const PROJECTS: Project[] = [
  { id: "p-001", name: "Sensor agro para pequena produção familiar", edital: "FAPEMA · Inova MA 2026", status: "updated", lastActivity: "Hoje, 14:32" },
  { id: "p-002", name: "Plataforma de telemedicina rural", edital: "FINEP · Centelha 3", status: "diagnosing", lastActivity: "Ontem, 09:18" },
  { id: "p-003", name: "App de letramento financeiro escolar", edital: "FAPESP · PIPE Fase 1", status: "analyzed", lastActivity: "3 dias atrás" },
  { id: "p-004", name: "Compostagem orientada por IoT", edital: "CNPq · MCTI Sustentável", status: "draft", lastActivity: "Há 2 semanas" },
  { id: "p-005", name: "Robótica educacional de baixo custo", edital: "SEBRAE · Inova Jovem", status: "error", lastActivity: "Há 1 hora" },
];

export interface SuggestedEdital {
  id: string;
  agency: string;
  name: string;
  match: number;
  deadline: string;
}

export const SUGGESTED_EDITAIS: SuggestedEdital[] = [
  { id: "e-01", agency: "FAPEMA", name: "Inova Maranhão 2026 — Ideação", match: 92, deadline: "21 dias" },
  { id: "e-02", agency: "FINEP", name: "Programa Centelha — Bolsas", match: 84, deadline: "1 mês" },
  { id: "e-03", agency: "BNDES", name: "Garagem · Pesquisa Aplicada", match: 76, deadline: "45 dias" },
];

export const CURRENT_USER = {
  name: "Ana Lima",
  fullName: "Ana Lima de Souza",
  email: "ana.lima@usp.br",
  initials: "AL",
};

/* ---------- Editais (T07 / T08 / T15) ---------- */
export const STATE_OPTIONS = [
  { id: "nacional", label: "Nacional" },
  { id: "MA", label: "Maranhão" },
  { id: "SP", label: "São Paulo" },
  { id: "RJ", label: "Rio de Janeiro" },
  { id: "MG", label: "Minas Gerais" },
  { id: "RS", label: "Rio Grande do Sul" },
  { id: "PR", label: "Paraná" },
  { id: "BA", label: "Bahia" },
  { id: "PE", label: "Pernambuco" },
  { id: "CE", label: "Ceará" },
];

export const AREA_OPTIONS = [
  { id: "inovacao", label: "Inovação" },
  { id: "tecsocial", label: "Tecnologia social" },
  { id: "agro", label: "Agronegócio" },
  { id: "saude", label: "Saúde" },
  { id: "edu", label: "Educação" },
  { id: "amb", label: "Meio ambiente" },
  { id: "cultura", label: "Cultura" },
];

export interface Edital {
  id: string;
  name: string;
  agency: string;
  state: string;
  areas: string[];
  daysLeft: number;
  deadlineLabel: string;
  open: boolean;
  evaluatorManual: boolean;
  /* Tem etapas/categorias com documentação distinta? Decide se o fluxo passa
     pela tela T10 (Seleção de Etapa/Categoria) ou vai direto ao T11 (Upload). */
  hasStages: boolean;
}

export const EDITAIS: Edital[] = [
  { id: "e-001", name: "Programa Centelha — Ideação 2026", agency: "FAPEMA · Inova Maranhão", state: "MA", areas: ["inovacao", "tecsocial"], daysLeft: 21, deadlineLabel: "14 jun 2026", open: true, evaluatorManual: true, hasStages: true },
  { id: "e-002", name: "PIPE Fase 1 — Pesquisa Inovativa em PE", agency: "FAPESP", state: "SP", areas: ["inovacao", "saude"], daysLeft: 45, deadlineLabel: "08 jul 2026", open: true, evaluatorManual: true, hasStages: true },
  { id: "e-003", name: "MCTI Sustentável — Bioeconomia & Agro", agency: "CNPq · MCTI", state: "nacional", areas: ["agro", "amb"], daysLeft: 7, deadlineLabel: "02 jun 2026", open: true, evaluatorManual: false, hasStages: false },
  { id: "e-004", name: "Garagem · Pesquisa Aplicada em Tecnologia", agency: "BNDES", state: "nacional", areas: ["inovacao"], daysLeft: 60, deadlineLabel: "25 jul 2026", open: true, evaluatorManual: true, hasStages: false },
  { id: "e-005", name: "Edital Tecnologia Social no Semiárido", agency: "Fundação Banco do Brasil", state: "nacional", areas: ["tecsocial", "edu"], daysLeft: -3, deadlineLabel: "23 mai 2026", open: false, evaluatorManual: false, hasStages: false },
];

export const areaLabel = (id: string): string =>
  AREA_OPTIONS.find((a) => a.id === id)?.label ?? id;

export const stateLabel = (id: string): string =>
  STATE_OPTIONS.find((s) => s.id === id)?.label ?? id;

export function deadlineTone(days: number): BadgeTone {
  if (days < 0) return "danger";
  if (days <= 7) return "warn";
  return "ok";
}

export function deadlineLabel(days: number, label: string): string {
  if (days < 0) return "Encerrado";
  if (days === 0) return "Encerra hoje";
  if (days === 1) return "Resta 1 dia";
  if (days <= 30) return `Restam ${days} dias`;
  return label;
}

/* ---------- Profile options (onboarding T05 / settings T17) ---------- */
export const PROFILE_ROLES = [
  { id: "grad", label: "Estudante de graduação" },
  { id: "posgrad", label: "Estudante de pós-graduação" },
  { id: "empreendedor", label: "Empreendedor iniciante" },
  { id: "pesquisador", label: "Pesquisador" },
];

export const PROFILE_AREAS = [
  { id: "tec", label: "Tecnologia" },
  { id: "agro", label: "Agronegócio" },
  { id: "saude", label: "Saúde" },
  { id: "edu", label: "Educação" },
  { id: "amb", label: "Meio Ambiente" },
  { id: "outro", label: "Outro" },
];

export const BR_STATES: { uf: string; name: string }[] = [
  { uf: "AC", name: "Acre" }, { uf: "AL", name: "Alagoas" }, { uf: "AP", name: "Amapá" }, { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" }, { uf: "CE", name: "Ceará" }, { uf: "DF", name: "Distrito Federal" }, { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" }, { uf: "MA", name: "Maranhão" }, { uf: "MT", name: "Mato Grosso" }, { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" }, { uf: "PA", name: "Pará" }, { uf: "PB", name: "Paraíba" }, { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" }, { uf: "PI", name: "Piauí" }, { uf: "RJ", name: "Rio de Janeiro" }, { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" }, { uf: "RO", name: "Rondônia" }, { uf: "RR", name: "Roraima" }, { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" }, { uf: "SE", name: "Sergipe" }, { uf: "TO", name: "Tocantins" },
];
