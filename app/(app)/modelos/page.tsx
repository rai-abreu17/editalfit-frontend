"use client";

import { Suspense, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  IconArrow,
  IconBook,
  IconCheck,
  IconChevDown,
  IconDoc,
  IconDownload,
  IconLayers,
  IconPeople,
  IconScale,
  IconSparkles,
  IconTarget,
  IconWarn,
} from "@/components/icons";
import styles from "./modelos.module.css";

interface Model {
  id: string;
  type: string;
  name: string;
  category: string;
  format: string;
  size: number;
  desc: string;
  mustHave: string[];
  pitfalls: string[];
}

const MODELS: Model[] = [
  { id: "mdl-resumo", type: "resumo", name: "Resumo executivo", category: "Apresentação", format: "DOCX", size: 38 * 1024, desc: "Síntese de 1 a 2 páginas com o problema, a solução e o impacto esperado. É a porta de entrada da proposta e costuma ser lido primeiro.", mustHave: ["Problema e oportunidade em uma frase clara", "Solução proposta e seu diferencial", "Impacto esperado e público beneficiado"], pitfalls: ["Escrever como introdução acadêmica em vez de resumo direto", "Ultrapassar o limite de páginas previsto no edital", "Deixar o impacto vago, sem nenhum número"] },
  { id: "mdl-memorial", type: "memorial", name: "Memorial descritivo", category: "Técnico", format: "DOCX", size: 64 * 1024, desc: "Detalhamento técnico da solução: como funciona, estado da arte, metodologia e grau de inovação frente ao que já existe.", mustHave: ["Descrição técnica da solução e como ela funciona", "Comparação com o estado da arte e concorrentes", "Metodologia e indicadores de viabilidade técnica"], pitfalls: ["Confundir memorial com plano de trabalho", "Afirmar inovação sem comparar com soluções existentes", "Excesso de jargão sem explicar o diferencial"] },
  { id: "mdl-plano", type: "plano", name: "Plano de trabalho", category: "Execução", format: "DOCX", size: 52 * 1024, desc: "Etapas, entregáveis, responsáveis e cronograma físico-financeiro do projeto. Mostra que a execução é factível no prazo.", mustHave: ["Etapas com entregáveis e marcos verificáveis", "Cronograma compatível com a duração do edital", "Responsável definido para cada atividade"], pitfalls: ["Cronograma genérico, sem marcos mensuráveis", "Somar mais meses do que o edital permite", "Atividades sem entregável associado"] },
  { id: "mdl-orcamento", type: "orcamento", name: "Orçamento detalhado", category: "Financeiro", format: "XLSX", size: 28 * 1024, desc: "Planilha com rubricas, valores unitários, quantidades e justificativas. É onde a maioria das propostas perde pontos por inconsistência.", mustHave: ["Rubricas separadas por categoria (custeio, capital, bolsas)", "Valor unitário, quantidade e total por item", "Justificativa de cada despesa frente ao projeto"], pitfalls: ["Totais que não batem com o plano de trabalho", "Itens fora das rubricas permitidas pelo edital", "Esquecer contrapartidas declaradas"] },
  { id: "mdl-vinculo", type: "vinculo", name: "Comprovante de vínculo", category: "Documental", format: "PDF", size: 120 * 1024, desc: "Modelo de declaração que comprova o vínculo institucional do coordenador com a proponente, com os campos exigidos já estruturados.", mustHave: ["Identificação da instituição e do coordenador", "Tipo e vigência do vínculo", "Assinatura do responsável institucional"], pitfalls: ["Enviar documento sem assinatura ou data", "Vínculo vencido na data de submissão", "Cargo divergente do declarado na proposta"] },
  { id: "mdl-anuencia", type: "anuencia", name: "Carta de anuência", category: "Documental", format: "DOCX", size: 22 * 1024, desc: "Modelo de concordância formal da instituição proponente com a execução do projeto, pronto para preenchimento em papel timbrado.", mustHave: ["Concordância expressa com a execução do projeto", "Dados da instituição e do representante legal", "Papel timbrado e assinatura"], pitfalls: ["Usar carta genérica sem citar o projeto", "Assinante sem poder de representação", "Faltar papel timbrado quando exigido"] },
  { id: "mdl-negocios", type: "negocios", name: "Plano de negócios", category: "Estratégia", format: "DOCX", size: 88 * 1024, desc: "Estrutura de plano de negócios para editais de empreendedorismo: mercado, modelo de receita, concorrência e projeções.", mustHave: ["Tamanho de mercado e público-alvo", "Modelo de receita e estrutura de custos", "Análise de concorrência e diferencial competitivo"], pitfalls: ["Projeções otimistas sem premissas explícitas", "Ignorar concorrentes ou substitutos", "Confundir faturamento com lucro"] },
  { id: "mdl-pitch", type: "pitch", name: "Pitch deck", category: "Apresentação", format: "PPTX", size: 1.4 * 1024 * 1024, desc: "Apresentação de 10 a 12 slides para defesa oral ou submissão em vídeo. Sequência narrativa do problema à tração.", mustHave: ["Problema e solução nos primeiros slides", "Tração ou validação, mesmo que inicial", "Pedido claro (valor, parceria, próxima etapa)"], pitfalls: ["Slides com texto denso, lidos palavra por palavra", "Deixar o problema para o fim", "Mais de 12 slides para um pitch curto"] },
  { id: "mdl-curriculo", type: "curriculo", name: "Currículo de equipe", category: "Equipe", format: "DOCX", size: 34 * 1024, desc: "Modelo de currículo resumido por integrante, destacando a experiência diretamente relacionada ao escopo do projeto.", mustHave: ["Formação e titulação de cada integrante", "Experiência relevante para o papel no projeto", "Dedicação prevista (horas/semana)"], pitfalls: ["Currículo Lattes completo em vez de resumo dirigido", "Não evidenciar o vínculo com o tema do edital", "Omitir a dedicação de cada integrante"] },
];

const fmtSize = (b: number) => (b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

function iconForType(type: string): ReactNode {
  switch (type) {
    case "orcamento": return <IconScale />;
    case "memorial":
    case "negocios": return <IconBook />;
    case "plano": return <IconLayers />;
    case "pitch": return <IconTarget />;
    case "curriculo": return <IconPeople />;
    default: return <IconDoc />;
  }
}

function ModelosInner() {
  const sp = useSearchParams();
  const initialType = sp.get("type");
  const [type, setType] = useState<string | null>(initialType);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    if (initialType) MODELS.filter((m) => m.type === initialType).forEach((m) => (init[m.id] = true));
    return init;
  });

  const filtered = useMemo(() => (type ? MODELS.filter((m) => m.type === type) : MODELS), [type]);
  const activeName = type ? MODELS.find((m) => m.type === type)?.name ?? "este documento" : "";

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className="eyebrow">Biblioteca</span>
        <h1 className={styles.h1}>Modelos de documentos</h1>
        <p className={styles.lead}>Modelos editáveis de referência para os documentos da sua proposta. Baixe, preencha e use como ponto de partida.</p>
      </div>

      <div className="info-card" style={{ marginBottom: 18 }}>
        <div className="info-card__icon">
          <IconSparkles />
        </div>
        <div>
          <div className="info-card__title">Modelos genéricos, ajuste sob medida depois</div>
          <div className="info-card__text">Eles não são específicos de um edital. Ao analisar o documento preenchido, a IA aponta onde melhorá-lo para o seu edital.</div>
        </div>
      </div>

      {type ? (
        <div className={styles.filterbar} role="status">
          <span className={styles.filterbarLabel}>
            <IconDoc /> Modelo para <strong>{activeName}</strong>
          </span>
          <button type="button" className={styles.filterbarClear} onClick={() => setType(null)}>
            Ver todos <IconArrow width={14} height={14} />
          </button>
        </div>
      ) : (
        <div className={styles.summary}>
          <span>
            <strong>{filtered.length}</strong> modelos disponíveis
          </span>
        </div>
      )}

      <div className={styles.grid}>
        {filtered.map((m) => {
          const open = !!expanded[m.id];
          return (
            <div key={m.id} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardIcon}>{iconForType(m.type)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={styles.cardName}>{m.name}</div>
                  <div className={styles.cardCat}>{m.category}</div>
                </div>
                <span className={styles.format}>{m.format}</span>
              </div>
              <p className={styles.cardDesc}>{m.desc}</p>
              <div className={styles.cardFoot}>
                <button type="button" className={styles.download}>
                  <IconDownload /> Baixar modelo
                  <span className={styles.downloadMeta}>
                    {m.format} · {fmtSize(m.size)}
                  </span>
                </button>
                <button type="button" className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`} aria-expanded={open} onClick={() => setExpanded((p) => ({ ...p, [m.id]: !p[m.id] }))}>
                  Orientações <IconChevDown />
                </button>
              </div>
              {open && (
                <div className={styles.notes}>
                  <div className={styles.noteGroup}>
                    <div className={`${styles.noteLabel} ${styles.noteOk}`}>
                      <IconCheck /> O que não pode faltar
                    </div>
                    <ul className={styles.noteList}>
                      {m.mustHave.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.noteGroup}>
                    <div className={`${styles.noteLabel} ${styles.notePit}`}>
                      <IconWarn /> Armadilhas comuns
                    </div>
                    <ul className={styles.noteList}>
                      {m.pitfalls.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ModelosPage() {
  return (
    <Suspense fallback={null}>
      <ModelosInner />
    </Suspense>
  );
}
