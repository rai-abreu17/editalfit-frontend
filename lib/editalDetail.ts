export interface EditalCriterion {
  id: string;
  name: string;
  desc: string;
  weight: number;
  source: string;
}

export interface EditalStage {
  id: string;
  num: string;
  label: string;
  desc: string;
  status: "current" | "upcoming" | "done";
}

export interface EditalDetail {
  id: string;
  name: string;
  agency: string;
  scope: string;
  deadlineLabel: string;
  daysLeft: number;
  modality: string;
  objective: string;
  criteria: EditalCriterion[];
  stages: EditalStage[] | null;
  categories: { id: string; label: string }[] | null;
  /* Exige a tela T10 (Seleção de Etapa/Categoria) antes do upload? */
  hasStages: boolean;
  officialUrl: string;
  evaluatorUrl: string | null;
}

const CENTELHA: EditalDetail = {
  id: "e-001",
  name: "Programa Centelha — Ideação 2026",
  agency: "FAPEMA · Inova Maranhão",
  scope: "Estadual · Maranhão",
  deadlineLabel: "14 jun 2026",
  daysLeft: 21,
  modality: "Subvenção · até R$ 80 mil",
  objective:
    "Apoiar a geração de novos negócios inovadores no Maranhão por meio de subvenção econômica para ideação, prototipagem e validação de mercado de soluções com potencial de impacto regional e aderência aos eixos estratégicos da FAPEMA.",
  criteria: [
    { id: "c1", name: "Grau de inovação", desc: "Diferencial técnico e originalidade da solução proposta.", weight: 30, source: "§4.2 a" },
    { id: "c2", name: "Potencial de mercado", desc: "Demanda, escala e viabilidade comercial no estado.", weight: 25, source: "§4.2 b" },
    { id: "c3", name: "Capacidade da equipe", desc: "Currículos compatíveis e dedicação prevista ao projeto.", weight: 20, source: "§4.2 c" },
    { id: "c4", name: "Viabilidade financeira", desc: "Orçamento detalhado e contrapartidas declaradas.", weight: 15, source: "§4.2 d" },
    { id: "c5", name: "Aderência regional", desc: "Impacto efetivo no Maranhão e cadeias produtivas locais.", weight: 10, source: "§4.2 e" },
  ],
  stages: [
    { id: "s1", num: "01", label: "Inscrição", desc: "Submissão de propostas via portal FAPEMA.", status: "current" },
    { id: "s2", num: "02", label: "Avaliação técnica", desc: "Análise por comitê externo, em 2 rodadas.", status: "upcoming" },
    { id: "s3", num: "03", label: "Entrevista", desc: "Pitch para finalistas, presencial em SLZ.", status: "upcoming" },
    { id: "s4", num: "04", label: "Resultado final", desc: "Divulgação dos selecionados no DO/MA.", status: "upcoming" },
  ],
  categories: null,
  hasStages: true,
  officialUrl: "https://fapema.br/centelha-2026",
  evaluatorUrl: "https://fapema.br/centelha-2026/manual-avaliador.pdf",
};

const MCTI: EditalDetail = {
  id: "e-003",
  name: "MCTI Sustentável — Bioeconomia & Agro",
  agency: "CNPq · MCTI",
  scope: "Nacional",
  deadlineLabel: "02 jun 2026",
  daysLeft: 7,
  modality: "Bolsa + custeio · até R$ 120 mil",
  objective:
    "Fomentar pesquisas aplicadas em bioeconomia e agricultura sustentável, com foco em soluções escaláveis para cadeias produtivas brasileiras de baixo carbono.",
  criteria: [
    { id: "c1", name: "Mérito científico", desc: "Robustez metodológica e contribuição original.", weight: 35, source: "§5.1" },
    { id: "c2", name: "Impacto socioambiental", desc: "Redução de emissões e benefício a cadeias locais.", weight: 30, source: "§5.2" },
    { id: "c3", name: "Capacidade institucional", desc: "Infraestrutura e parcerias declaradas.", weight: 20, source: "§5.3" },
    { id: "c4", name: "Orçamento e cronograma", desc: "Coerência entre meta, prazo e custo.", weight: 15, source: "§5.4" },
  ],
  stages: null,
  categories: [
    { id: "k1", label: "Bioeconomia amazônica" },
    { id: "k2", label: "Agricultura de baixo carbono" },
    { id: "k3", label: "Bioinsumos" },
    { id: "k4", label: "Florestas plantadas" },
  ],
  hasStages: false,
  officialUrl: "https://cnpq.br/mcti-sustentavel-2026",
  evaluatorUrl: null,
};

const DETAILS: Record<string, EditalDetail> = {
  "e-001": CENTELHA,
  "e-003": MCTI,
  "e-01": CENTELHA,
  "e-03": MCTI,
};

export function getEditalDetail(id: string): EditalDetail {
  return DETAILS[id] ?? CENTELHA;
}
