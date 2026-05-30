/* Diagnosis mock data (T12). Every AI finding carries a traceable
   source in the edital (editalRef + editalQuote) — transparency rule. */

export type DiagStatus = "ok" | "warn" | "danger";

export const DIAG_PROJECT = {
  name: "Sensor IoT para qualidade do ar urbano",
  edital: "FAPEMA · INOVA MARANHÃO 2026",
  editalShort: "Centelha MA · Ideação",
  deadlineLabel: "14 jun",
  daysLeft: 21,
  version: 3,
  totalVersions: 3,
  score: 72,
  prevScore: 64,
  officialUrl: "https://fapema.br/centelha-2026/edital",
};

export interface DiagCriterion {
  id: string;
  status: DiagStatus;
  tag: string;
  name: string;
  detail: string;
  comment: string;
  editalRef: string;
  editalQuote: string;
  excerpt: string;
}

export const DIAG_CRITERIA: DiagCriterion[] = [
  { id: "c1", status: "ok", tag: "OK", name: "Grau de inovação", detail: "Diferencial tecnológico bem evidenciado frente a soluções existentes.", comment: "O diferencial tecnológico está claro e bem descrito. Para fortalecer ainda mais este ponto, vale incluir uma comparação direta com as soluções já disponíveis no mercado.", editalRef: "§3.1", editalQuote: "Serão priorizadas propostas com caráter inovador, assim entendido o diferencial tecnológico ou de modelo de negócio frente a soluções já existentes.", excerpt: "um sensor IoT de baixo custo que mede material particulado em tempo real" },
  { id: "c2", status: "warn", tag: "Atenção", name: "Potencial de mercado", detail: "O texto descreve a necessidade, mas faltam dados de demanda no Maranhão.", comment: "A relevância do problema está bem colocada. Este trecho pode ser reforçado com dados de demanda e tamanho de mercado no Maranhão, para alinhar melhor ao critério de potencial de mercado do edital.", editalRef: "§4.2", editalQuote: "A proposta deverá demonstrar o potencial de mercado por meio de estimativas de demanda e dados sobre o público-alvo no estado do Maranhão.", excerpt: "atende a uma necessidade urbana crescente nas capitais brasileiras" },
  { id: "c3", status: "ok", tag: "OK", name: "Capacidade técnica", detail: "Equipe com experiência compatível com o escopo proposto.", comment: "A composição da equipe sustenta bem a execução técnica. Considere destacar projetos anteriores já concluídos pela equipe para evidenciar a capacidade de entrega.", editalRef: "§5.1", editalQuote: "A capacidade técnica será avaliada pela aderência dos currículos da equipe às competências exigidas para a execução do projeto.", excerpt: "uma equipe com experiência em desenvolvimento de software e gestão de projetos" },
  { id: "c4", status: "danger", tag: "Problema", name: "Viabilidade financeira", detail: "Orçamento detalhado ainda não anexado à proposta.", comment: "Para que a viabilidade financeira possa ser avaliada, é importante anexar o orçamento detalhado previsto pelo edital. Os valores podem ser ajustados depois — o importante é incluir a estrutura de custos.", editalRef: "§6.3", editalQuote: "É obrigatória a apresentação de orçamento detalhado, discriminando itens de custeio e capital, sob pena de não pontuação no critério de viabilidade financeira.", excerpt: "o orçamento será detalhado na fase de execução do projeto" },
];

/* proposal paragraphs — string segments + {crit} highlight markers */
export const DIAG_PROPOSAL: ({ t: string } | { crit: string })[][] = [
  [{ t: "A proposta apresenta " }, { crit: "c1" }, { t: ", voltado a prefeituras de médio porte. A solução combina hardware aberto e um painel de visualização para gestores públicos." }],
  [{ t: "O monitoramento do ar " }, { crit: "c2" }, { t: ". A tração inicial seria conduzida por meio de parcerias com secretarias municipais de meio ambiente." }],
  [{ t: "O projeto será conduzido por " }, { crit: "c3" }, { t: ", responsável pela arquitetura, pela coleta de dados e pela interface com os órgãos públicos." }],
  [{ t: "Quanto aos custos, " }, { crit: "c4" }, { t: ", considerando aquisição de componentes, prototipagem e bolsas para a equipe técnica." }],
];

export type DocStatus = "entregue" | "formato" | "faltando";
export interface DiagDoc {
  id: string;
  name: string;
  status: DocStatus;
  meta: string;
  ref: string;
  editalQuote: string;
}
export const DIAG_DOCS: DiagDoc[] = [
  { id: "r1", name: "Resumo executivo", status: "entregue", meta: "resumo-executivo-v2.pdf · 412 KB", ref: "§2.1", editalQuote: "O resumo executivo deve sintetizar objetivo, solução e impacto esperado em até duas páginas." },
  { id: "r2", name: "Memorial descritivo da proposta", status: "entregue", meta: "memorial-descritivo.pdf · 1,8 MB", ref: "§2.2", editalQuote: "O memorial descritivo apresenta a fundamentação técnica e a metodologia detalhada do projeto." },
  { id: "r3", name: "Plano de trabalho", status: "entregue", meta: "plano-de-trabalho-v3.docx · 96 KB", ref: "§2.3", editalQuote: "O plano de trabalho deve conter etapas, metas e indicadores de execução." },
  { id: "r4", name: "Cronograma físico-financeiro", status: "formato", meta: "Enviado em .png — o edital exige PDF ou planilha.", ref: "§2.4", editalQuote: "O cronograma físico-financeiro deve ser enviado em formato PDF ou planilha editável (.xlsx/.ods)." },
  { id: "r5", name: "Orçamento detalhado", status: "faltando", meta: "Ainda não enviado.", ref: "§6.3", editalQuote: "É obrigatória a apresentação de orçamento detalhado, discriminando itens de custeio e capital." },
  { id: "r6", name: "Carta de anuência institucional", status: "entregue", meta: "carta-anuencia-assinada.pdf · 520 KB", ref: "§2.6", editalQuote: "A carta de anuência institucional comprova o vínculo do proponente com a instituição executora." },
  { id: "r7", name: "Currículos da equipe (Lattes)", status: "faltando", meta: "3 de 4 currículos enviados.", ref: "§5.1", editalQuote: "Devem ser anexados os currículos Lattes de todos os integrantes formais da equipe." },
];

export const DOC_STATUS: Record<DocStatus, { icon: DiagStatus; tag: string }> = {
  entregue: { icon: "ok", tag: "Entregue" },
  formato: { icon: "danger", tag: "Formato" },
  faltando: { icon: "warn", tag: "Faltando" },
};

export interface TeamReq {
  id: string;
  status: DiagStatus;
  text: string;
  ref: string;
  editalQuote: string;
}
export const DIAG_TEAM_REQUIRED: TeamReq[] = [
  { id: "t1", status: "ok", text: "Coordenador(a) com titulação mínima de mestrado", ref: "§5.2", editalQuote: "A coordenação do projeto deve ser exercida por integrante com titulação mínima de mestrado." },
  { id: "t2", status: "warn", text: "Ao menos um integrante com experiência em hardware embarcado / IoT", ref: "§5.3", editalQuote: "A equipe deve contar com pelo menos um integrante com experiência comprovada em hardware embarcado ou sistemas IoT." },
  { id: "t3", status: "ok", text: "Equipe multidisciplinar com no mínimo 3 integrantes", ref: "§5.4", editalQuote: "A equipe deve ser multidisciplinar e composta por no mínimo três integrantes." },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  match: "ok" | "warn";
  initials: string;
  gaps: { status: DiagStatus; text: string; ref: string | null }[];
}
export const DIAG_TEAM_MEMBERS: TeamMember[] = [
  { id: "m1", name: "Ana Souza", role: "Coordenadora · Doutora em Eng. Ambiental", match: "ok", initials: "AS", gaps: [{ status: "ok", text: "Titulação atende ao requisito de coordenação.", ref: "§5.2" }] },
  { id: "m2", name: "João Pereira", role: "Desenvolvedor · Eng. de Software", match: "warn", initials: "JP", gaps: [{ status: "ok", text: "Experiência sólida em desenvolvimento de software e integração de dados.", ref: null }, { status: "warn", text: "Os currículos enviados ainda não evidenciam experiência com hardware embarcado. Incluir esse perfil reforçaria a aderência ao edital.", ref: "§5.3" }] },
  { id: "m3", name: "Marina Lima", role: "Designer de produto · UX", match: "ok", initials: "ML", gaps: [{ status: "ok", text: "Reforça a multidisciplinaridade exigida pela equipe.", ref: "§5.4" }] },
];

export const DIAG_LOADING_STEPS = [
  "Lendo os documentos enviados",
  "Mapeando os critérios do edital",
  "Comparando proposta e critérios",
  "Analisando os currículos da equipe",
  "Gerando o diagnóstico",
];

export function scoreToneInfo(score: number) {
  if (score >= 75) return { tone: "ok" as const, label: "Alta aderência", from: "#16A34A", to: "#166534", glow: "rgba(22,163,74,0.42)" };
  if (score >= 50) return { tone: "warn" as const, label: "Aderência parcial", from: "#F59E0B", to: "#D97706", glow: "rgba(245,158,11,0.45)" };
  return { tone: "danger" as const, label: "Baixa aderência", from: "#EF4444", to: "#DC2626", glow: "rgba(220,38,38,0.45)" };
}
