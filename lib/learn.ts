/* Conteúdo + tipos da Trilha de Aprendizado (Modo Aprender).
   Módulo educativo gamificado estilo Duolingo, adaptado ao contexto de
   submissão de editais. Mock data — em produção viria da API; mantido aqui
   para a trilha ser navegável e consistente no protótipo.

   Estrutura: 8 módulos → 18 lições → passos (info | quiz | checklist).
   O estado de cada lição (concluída/disponível/bloqueada) é derivado do
   progresso salvo (ver getLessonState). */

export type LessonGlyph =
  | "read"
  | "quiz"
  | "spot"
  | "budget"
  | "doc"
  | "classify"
  | "team"
  | "check";

/* ---------- Exemplos visuais usados dentro dos exercícios ---------- */
export interface ExampleBudget {
  type: "budget";
  caption: string;
  rows: { item: string; detail?: string; value: string }[];
  total: string;
}
export interface ExampleQuote {
  type: "quote";
  caption: string;
  text: string;
}
export type Example = ExampleBudget | ExampleQuote;

/* ---------- Passos de uma lição ---------- */
export interface InfoStep {
  kind: "info";
  title: string;
  body: string[];
  callout?: { tone: "brand" | "ok" | "warn"; title?: string; text: string };
}
export interface QuizStep {
  kind: "quiz";
  /* variant só muda o rótulo/visual do enunciado; a lógica é a mesma */
  variant: "choice" | "boolean" | "spot" | "classify" | "doc";
  prompt: string;
  example?: Example;
  options: string[];
  correct: number;
  /* frase-ensino compartilhada (corpo do feedback) */
  explain: string;
  /* corpo alternativo quando o usuário erra (opcional) */
  explainWrong?: string;
}
export interface ChecklistStep {
  kind: "checklist";
  title: string;
  intro?: string;
  items: string[];
  outro: string;
}
export type LessonStep = InfoStep | QuizStep | ChecklistStep;

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  glyph: LessonGlyph;
  xp: number;
  steps: LessonStep[];
}

export interface LearnModule {
  id: string;
  index: number;
  title: string;
  tagline: string;
  lessons: Lesson[];
}

/* ============================================================
   CONTEÚDO
   ============================================================ */
export const MODULES: LearnModule[] = [
  {
    id: "m1",
    index: 1,
    title: "O que é um edital?",
    tagline: "Entenda o convite antes de aceitar",
    lessons: [
      {
        id: "m1-l1",
        title: "O que é um edital",
        subtitle: "O convite oficial",
        glyph: "read",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Edital é um convite com regras",
            body: [
              "Um edital é uma chamada pública: uma agência (de fomento, governo ou empresa) abre recursos para apoiar projetos que cumpram certas regras.",
              "Você envia uma proposta. Ela é avaliada por critérios definidos. Só quem é aprovado recebe o apoio.",
            ],
            callout: {
              tone: "brand",
              title: "Em uma frase",
              text: "Edital = oportunidade + regras + seleção. Entender as três partes já te coloca à frente.",
            },
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt: "Um edital garante o dinheiro assim que você se inscreve.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "O edital é um convite com seleção. Os recursos só chegam para quem é aprovado segundo os critérios.",
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt: "Qual é o objetivo principal de um edital de fomento?",
            options: [
              "Selecionar e financiar projetos que atendam a um objetivo público",
              "Vender um produto da própria agência",
              "Divulgar notícias da instituição",
              "Cobrar uma taxa de inscrição dos participantes",
            ],
            correct: 0,
            explain:
              "O edital existe para escolher e apoiar projetos alinhados a um objetivo público — inovação, pesquisa, impacto social.",
          },
        ],
      },
      {
        id: "m1-l2",
        title: "Quem publica e quem participa",
        subtitle: "Agências e proponentes",
        glyph: "team",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Dos dois lados do edital",
            body: [
              "Quem publica: agências de fomento como FAPs estaduais, CNPq, FINEP, SEBRAE e BNDES.",
              "Quem participa: o proponente — pode ser pessoa física, empresa ou instituição, sempre dentro do público-alvo que o edital define.",
            ],
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt:
              "Você é estudante com uma ideia. O que confirmar primeiro, antes de tudo?",
            options: [
              "Se você se enquadra no público-alvo e nos requisitos de elegibilidade",
              "Quantas pessoas já se inscreveram",
              "Se o site do edital é bonito",
              "Se a logo da agência é colorida",
            ],
            correct: 0,
            explain:
              "Elegibilidade é a primeira porta. Se você não se enquadra no público-alvo, a proposta nem chega a ser avaliada.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Todo edital aceita qualquer pessoa, sem requisitos de quem pode participar.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "Cada edital define um público-alvo e requisitos. Conferir isso evita perder tempo numa chamada que não é para você.",
          },
        ],
      },
    ],
  },
  {
    id: "m2",
    index: 2,
    title: "Como ler um edital sem se perder",
    tagline: "Saiba onde olhar primeiro",
    lessons: [
      {
        id: "m2-l1",
        title: "O mapa do edital",
        subtitle: "As seções que importam",
        glyph: "read",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Todo edital tem as mesmas peças",
            body: [
              "Objeto: o que o edital quer apoiar. Elegibilidade: quem pode participar. Cronograma: as datas, incluindo o prazo final.",
              "Documentos exigidos, critérios de avaliação, recursos/orçamento e anexos completam o mapa. Saber onde cada coisa fica te poupa horas.",
            ],
            callout: {
              tone: "ok",
              title: "Dica de leitura",
              text: "Na primeira leitura, vá direto a: elegibilidade, prazo e critérios. São eles que decidem se vale a pena continuar.",
            },
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt: "Onde você encontra o prazo final de submissão?",
            options: [
              "No cronograma",
              "Na introdução institucional",
              "Nos anexos de identidade visual",
              "No rodapé do e-mail de divulgação",
            ],
            correct: 0,
            explain:
              "O cronograma reúne todas as datas-chave. É a primeira seção que define se o edital ainda está ao seu alcance.",
          },
          {
            kind: "quiz",
            variant: "spot",
            prompt: "Numa primeira leitura, qual informação é mais crítica destacar?",
            example: {
              type: "quote",
              caption: "Trecho do edital",
              text: "“As propostas serão recebidas exclusivamente pelo sistema eletrônico até as 18h do dia 14/06/2026, não sendo aceitas inscrições por e-mail ou em data posterior, sob qualquer justificativa.”",
            },
            options: [
              "O prazo e o canal de envio — improrrogáveis e exclusivos",
              "A formatação do parágrafo",
              "O nome do sistema eletrônico apenas",
              "A presença da palavra ‘exclusivamente’ por estética",
            ],
            correct: 0,
            explain:
              "Prazo e canal de envio obrigatórios são informações que eliminam propostas. Destaque-os logo na primeira leitura.",
          },
        ],
      },
      {
        id: "m2-l2",
        title: "Palavras que mudam tudo",
        subtitle: "‘Deverá’ não é ‘poderá’",
        glyph: "spot",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "O vocabulário do edital",
            body: [
              "‘Deverá’, ‘obrigatório’ e ‘sob pena de inabilitação’ apontam exigências que, se ignoradas, eliminam a proposta.",
              "‘Poderá’, ‘desejável’ e ‘preferencialmente’ indicam o que soma pontos, mas não elimina. Distinguir os dois evita surpresas.",
            ],
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt:
              "“O proponente deverá anexar o plano de trabalho.” Esse documento é:",
            options: [
              "Obrigatório",
              "Opcional",
              "Recomendado, mas dispensável",
              "Apenas um exemplo ilustrativo",
            ],
            correct: 0,
            explain:
              "‘Deverá’ marca uma exigência. Sem o plano de trabalho, a proposta pode ser inabilitada antes mesmo da análise de mérito.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt: "‘Poderá’ e ‘deverá’ têm o mesmo peso em um edital.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "‘Deverá’ é obrigação; ‘poderá’ é possibilidade. Tratar os dois como iguais leva a erros caros.",
          },
        ],
      },
    ],
  },
  {
    id: "m3",
    index: 3,
    title: "Documentos obrigatórios",
    tagline: "O que anexar, como e quando",
    lessons: [
      {
        id: "m3-l1",
        title: "Os documentos de sempre",
        subtitle: "O kit básico",
        glyph: "doc",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "O que quase todo edital pede",
            body: [
              "Plano de trabalho, orçamento detalhado, currículos da equipe (Lattes), comprovantes de elegibilidade e, muitas vezes, cartas de anuência.",
              "Cada documento responde a uma pergunta do avaliador: o que você fará, com quanto, com quem e com qual respaldo.",
            ],
          },
          {
            kind: "quiz",
            variant: "doc",
            prompt:
              "O edital pede comprovação da experiência da equipe. Qual documento é mais adequado?",
            options: [
              "Currículo Lattes atualizado de cada membro",
              "Uma foto da equipe reunida",
              "Print de uma conversa de WhatsApp",
              "Um cartão de visita",
            ],
            correct: 0,
            explain:
              "O Lattes é a forma oficial de comprovar formação e experiência no Brasil. É o que o avaliador espera encontrar.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Anexar um documento a mais, fora do que foi pedido, sempre ajuda na avaliação.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "Enviar só o que foi pedido, no formato pedido, demonstra cuidado. Excesso desorganizado pode atrapalhar a leitura.",
          },
        ],
      },
      {
        id: "m3-l2",
        title: "Formato, prazo e assinatura",
        subtitle: "Detalhes que inabilitam",
        glyph: "spot",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "A forma também conta",
            body: [
              "Formato do arquivo (geralmente PDF), limite de páginas, assinaturas exigidas e validade de certidões são requisitos formais.",
              "Eles são conferidos na triagem, antes do mérito. Um detalhe formal errado pode eliminar uma boa proposta.",
            ],
            callout: {
              tone: "warn",
              title: "Atenção",
              text: "Certidões têm prazo de validade. Confira a data na semana do envio, não no mês anterior.",
            },
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Enviar o documento em formato diferente do exigido pode levar à inabilitação.",
            options: ["Verdadeiro", "Falso"],
            correct: 0,
            explain:
              "Requisitos de formato são conferidos na triagem. Fora do padrão, a proposta pode ser eliminada por motivo formal.",
          },
          {
            kind: "quiz",
            variant: "spot",
            prompt: "Qual é o erro neste checklist de envio?",
            example: {
              type: "quote",
              caption: "Checklist do proponente",
              text: "✓ Plano de trabalho em PDF   ✓ Orçamento detalhado   ✓ Currículos Lattes   ✗ Carta de anuência sem assinatura do responsável",
            },
            options: [
              "A carta de anuência está sem assinatura — não comprova o apoio",
              "O plano de trabalho está em PDF",
              "Há currículos demais",
              "O orçamento está detalhado",
            ],
            correct: 0,
            explain:
              "Uma carta de anuência sem assinatura não tem valor formal. Vale o mesmo que não entregá-la.",
          },
        ],
      },
      {
        id: "m3-l3",
        title: "Anuência e elegibilidade",
        subtitle: "Quem confirma o quê",
        glyph: "doc",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Comprovar o respaldo",
            body: [
              "Cartas de anuência mostram que instituições parceiras apoiam o projeto. Declarações e certidões comprovam que você cumpre as exigências legais.",
              "Esses documentos transformam promessas em compromissos verificáveis — é o que o avaliador precisa para confiar na execução.",
            ],
          },
          {
            kind: "quiz",
            variant: "doc",
            prompt:
              "A instituição parceira precisa confirmar que apoia o projeto. Qual documento resolve isso?",
            options: [
              "Carta de anuência assinada pelo responsável da instituição",
              "Um e-mail informal dizendo ‘apoiamos’",
              "Uma menção em rede social",
              "Nada — o apoio é presumido",
            ],
            correct: 0,
            explain:
              "A carta de anuência assinada é o documento formal que comprova o compromisso da parceira com o projeto.",
          },
        ],
      },
    ],
  },
  {
    id: "m4",
    index: 4,
    title: "Como montar um orçamento",
    tagline: "Cada real precisa de motivo",
    lessons: [
      {
        id: "m4-l1",
        title: "Orçamento que se explica",
        subtitle: "Detalhar e justificar",
        glyph: "budget",
        xp: 25,
        steps: [
          {
            kind: "info",
            title: "Todo item conta uma história",
            body: [
              "Um bom orçamento liga cada item a uma atividade do projeto: o que é, quanto custa e por que é necessário.",
              "Itens genéricos como ‘materiais diversos’ ou ‘serviços’ sem detalhamento levantam suspeita e perdem pontos.",
            ],
          },
          {
            kind: "quiz",
            variant: "spot",
            prompt: "Qual é o principal problema deste orçamento?",
            example: {
              type: "budget",
              caption: "Orçamento enviado pelo proponente",
              rows: [
                { item: "Materiais diversos", value: "R$ 8.000" },
                { item: "Serviços", value: "R$ 12.000" },
                { item: "Equipamentos", value: "R$ 15.000" },
              ],
              total: "R$ 35.000",
            },
            options: [
              "Falta detalhamento dos itens",
              "O valor está muito baixo",
              "O título está grande demais",
              "O orçamento não precisa de justificativa",
            ],
            correct: 0,
            explain:
              "Um bom orçamento detalha cada item e explica por que ele é necessário para executar o projeto.",
            explainWrong:
              "O principal problema é que o orçamento não explica por que cada item é necessário para executar o projeto.",
          },
        ],
      },
      {
        id: "m4-l2",
        title: "Custeio, capital e o que é vedado",
        subtitle: "As regras do dinheiro",
        glyph: "budget",
        xp: 25,
        steps: [
          {
            kind: "info",
            title: "Cada rubrica tem sua regra",
            body: [
              "Custeio cobre o consumível (materiais, serviços, bolsas). Capital cobre bens duráveis (equipamentos). O edital diz quanto cabe em cada uma.",
              "Itens vedados são proibidos: costumam incluir obras, bens de uso pessoal e pagamento de dívidas. Usar um deles invalida a despesa.",
            ],
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt:
              "Qual item normalmente NÃO pode ser pago com recursos do edital?",
            options: [
              "Reforma do imóvel pessoal do proponente",
              "Material de consumo usado no projeto",
              "Bolsa de pesquisa prevista no edital",
              "Serviço de terceiros para uma atividade do projeto",
            ],
            correct: 0,
            explain:
              "Bens e obras de uso pessoal costumam ser itens vedados. Sempre confira a lista de despesas não financiáveis.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Você pode remanejar valores entre rubricas livremente, sem justificar.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "Remanejamentos seguem regras e, em geral, exigem justificativa ou autorização. Não é livre.",
          },
        ],
      },
      {
        id: "m4-l3",
        title: "Analisando linha por linha",
        subtitle: "Bom ou problemático?",
        glyph: "classify",
        xp: 25,
        steps: [
          {
            kind: "quiz",
            variant: "classify",
            prompt: "Este item do orçamento está bem formulado?",
            example: {
              type: "quote",
              caption: "Linha do orçamento",
              text: "Bolsista de iniciação científica (12 meses) — 1 × R$ 700/mês = R$ 8.400, para coletar e analisar os dados de campo do projeto.",
            },
            options: ["Sim — está detalhado e justificado", "Não — falta informação"],
            correct: 0,
            explain:
              "O item traz quantidade, valor unitário, período e a finalidade. É assim que cada linha deve se explicar.",
          },
          {
            kind: "quiz",
            variant: "classify",
            prompt: "E este item, está bem formulado?",
            example: {
              type: "quote",
              caption: "Linha do orçamento",
              text: "Software e outras coisas — R$ 9.500.",
            },
            options: ["Sim — está detalhado e justificado", "Não — falta informação"],
            correct: 1,
            explain:
              "‘E outras coisas’ não diz o que será comprado nem por quê. Sem detalhe e justificativa, o avaliador não consegue aprovar.",
          },
        ],
      },
    ],
  },
  {
    id: "m5",
    index: 5,
    title: "Critérios de avaliação",
    tagline: "Escreva para quem vai pontuar",
    lessons: [
      {
        id: "m5-l1",
        title: "Como sua proposta é pontuada",
        subtitle: "Pesos e nota de corte",
        glyph: "read",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "A avaliação tem uma régua",
            body: [
              "O edital traz uma rubrica: relevância, viabilidade, inovação, impacto e equipe costumam estar entre os critérios — cada um com um peso.",
              "Há também uma nota de corte. Saber o peso de cada critério mostra onde investir mais texto e evidências.",
            ],
            callout: {
              tone: "brand",
              title: "Estratégia",
              text: "Releia os critérios e escreva respondendo cada um, na ordem e com o peso que o edital dá.",
            },
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt:
              "Os critérios têm pesos diferentes. O que isso significa para você?",
            options: [
              "Priorizar e detalhar mais o que vale mais pontos",
              "Ignorar os critérios e escrever livremente",
              "Escrever só sobre o que você mais gosta",
              "Tratar todos os critérios como iguais sempre",
            ],
            correct: 0,
            explain:
              "Pesos indicam prioridade. Dedicar mais evidência aos critérios de maior peso aumenta sua nota total.",
          },
        ],
      },
      {
        id: "m5-l2",
        title: "Escrevendo para o avaliador",
        subtitle: "Evidência vence adjetivo",
        glyph: "classify",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Mostre, não apenas afirme",
            body: [
              "O avaliador procura evidências: dados, metas, métodos e resultados esperados. Adjetivos sozinhos não pontuam.",
              "Responda explicitamente cada critério, com clareza e provas. ‘Somos inovadores’ vale menos que ‘reduzimos o custo em 40% com a técnica X’.",
            ],
          },
          {
            kind: "quiz",
            variant: "classify",
            prompt: "Este trecho de proposta convence o avaliador?",
            example: {
              type: "quote",
              caption: "Trecho da proposta",
              text: "“Nosso projeto é muito inovador e vai ajudar muitas pessoas. Temos certeza de que será um sucesso enorme.”",
            },
            options: ["Sim — está convincente", "Não — falta evidência concreta"],
            correct: 1,
            explain:
              "Faltam dados, metas e método. Troque promessas por evidências: quem, quantos, como e com qual resultado medível.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt: "Repetir a palavra ‘inovador’ várias vezes aumenta sua nota.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "Repetição não é evidência. O que pontua é demonstrar a inovação com dados e comparação concreta.",
          },
        ],
      },
    ],
  },
  {
    id: "m6",
    index: 6,
    title: "Currículo da equipe",
    tagline: "As pessoas certas, comprovadas",
    lessons: [
      {
        id: "m6-l1",
        title: "A equipe certa no papel",
        subtitle: "Comprovar competências",
        glyph: "team",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "O edital pede perfis, não nomes",
            body: [
              "Muitos editais exigem competências específicas na equipe: um responsável técnico, experiência na área, titulação mínima.",
              "Comprove com o Lattes e deixe claro o papel de cada pessoa. O avaliador precisa enxergar que o time consegue executar.",
            ],
          },
          {
            kind: "quiz",
            variant: "doc",
            prompt:
              "O edital exige um responsável técnico com experiência na área. Como comprovar?",
            options: [
              "Currículo Lattes com projetos e produções na área",
              "Apenas afirmar que a pessoa tem experiência",
              "Uma foto da pessoa em um evento",
              "Uma promessa verbal de competência",
            ],
            correct: 0,
            explain:
              "Experiência se comprova com o histórico no Lattes — projetos, publicações e atuação na área exigida.",
          },
        ],
      },
      {
        id: "m6-l2",
        title: "Competências sem inflar",
        subtitle: "Honestidade e parcerias",
        glyph: "classify",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Falta uma competência? Tem solução",
            body: [
              "Exagerar no currículo é arriscado: o avaliador confere. Apresente a experiência real e relevante para o projeto.",
              "Se faltar uma competência, cubra com uma parceria ou consultoria — uma carta de anuência pode formalizar esse apoio.",
            ],
          },
          {
            kind: "quiz",
            variant: "classify",
            prompt: "Esta descrição da equipe é segura de apresentar?",
            example: {
              type: "quote",
              caption: "Trecho do currículo da equipe",
              text: "“Nossa equipe domina todas as áreas necessárias e tem experiência incomparável em qualquer tipo de projeto.”",
            },
            options: ["Sim — passa confiança", "Não — é vago e exagerado"],
            correct: 1,
            explain:
              "Afirmações genéricas e infláveis enfraquecem a proposta. Prefira experiência específica e comprovável no Lattes.",
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Se falta uma competência na equipe, uma parceria ou carta de anuência pode cobrir o requisito.",
            options: ["Verdadeiro", "Falso"],
            correct: 0,
            explain:
              "Parcerias formalizadas ampliam a capacidade do time e podem atender a requisitos que a equipe interna não cobre.",
          },
        ],
      },
    ],
  },
  {
    id: "m7",
    index: 7,
    title: "Erros comuns em submissões",
    tagline: "Aprenda com tropeços alheios",
    lessons: [
      {
        id: "m7-l1",
        title: "Os tropeços clássicos",
        subtitle: "O que mais elimina propostas",
        glyph: "spot",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "A maioria das eliminações é evitável",
            body: [
              "Perder o prazo, esquecer um documento obrigatório, mandar fora do formato e ignorar os critérios são os erros que mais derrubam boas ideias.",
              "Quase todos acontecem na triagem — antes da análise de mérito. Ou seja: nem chegam a ler o seu projeto.",
            ],
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt:
              "Qual erro mais elimina propostas boas logo na triagem?",
            options: [
              "Documento obrigatório faltando ou fora do formato",
              "A fonte escolhida para o texto",
              "A largura da margem da página",
              "A cor da capa do projeto",
            ],
            correct: 0,
            explain:
              "Triagem confere requisitos formais. Documento faltando ou fora do formato elimina antes de avaliarem o mérito.",
          },
          {
            kind: "quiz",
            variant: "spot",
            prompt: "Qual é o erro fatal neste cenário?",
            example: {
              type: "quote",
              caption: "Relato de um proponente",
              text: "“A proposta estava ótima. Anexei tudo, mas terminei o orçamento às 18h05 — o sistema fechou às 18h e não aceitou o envio.”",
            },
            options: [
              "Perder o prazo de submissão",
              "Ter uma proposta boa",
              "Anexar todos os documentos",
              "Detalhar o orçamento",
            ],
            correct: 0,
            explain:
              "Prazos de edital são improrrogáveis. Cinco minutos depois é o mesmo que não enviar. Submeta com folga.",
          },
        ],
      },
      {
        id: "m7-l2",
        title: "Pequenos detalhes, grandes perdas",
        subtitle: "O diabo mora na revisão",
        glyph: "spot",
        xp: 20,
        steps: [
          {
            kind: "info",
            title: "Detalhes que custam caro",
            body: [
              "Certidão vencida, assinatura faltando, limite de páginas estourado, link quebrado: pequenos, mas eliminatórios.",
              "A boa notícia é que todos são pegos numa revisão final cuidadosa, feita com antecedência.",
            ],
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt:
              "Uma certidão vencida no dia da submissão pode inabilitar a proposta.",
            options: ["Verdadeiro", "Falso"],
            correct: 0,
            explain:
              "Documentos precisam estar válidos na data de envio. Confira as validades na semana da submissão.",
          },
          {
            kind: "quiz",
            variant: "classify",
            prompt: "Este hábito de submissão é seguro?",
            example: {
              type: "quote",
              caption: "Hábito do proponente",
              text: "“Sempre confiro as certidões e assinaturas dois dias antes do prazo e faço um envio de teste no sistema.”",
            },
            options: ["Sim — é uma boa prática", "Não — é arriscado"],
            correct: 0,
            explain:
              "Revisar com antecedência e testar o sistema antes do prazo é exatamente o que evita perdas por detalhe.",
          },
        ],
      },
    ],
  },
  {
    id: "m8",
    index: 8,
    title: "Revisão final antes de enviar",
    tagline: "A última volta antes do envio",
    lessons: [
      {
        id: "m8-l1",
        title: "Checklist de submissão",
        subtitle: "Confira antes de clicar",
        glyph: "check",
        xp: 25,
        steps: [
          {
            kind: "info",
            title: "A revisão que salva propostas",
            body: [
              "Antes de enviar, passe por tudo de novo: elegibilidade, documentos, orçamento, critérios, prazos e formatos.",
              "É a etapa mais barata de fazer e a que mais evita arrependimentos.",
            ],
          },
          {
            kind: "checklist",
            title: "Seu checklist final",
            intro: "Marque cada item conforme confirma na sua proposta:",
            items: [
              "Confirmei que me enquadro no público-alvo e na elegibilidade",
              "Todos os documentos obrigatórios estão anexados",
              "Cada item do orçamento está detalhado e justificado",
              "Respondi explicitamente a cada critério de avaliação",
              "Arquivos no formato e dentro do limite de páginas exigidos",
              "Certidões e assinaturas válidas e presentes",
            ],
            outro:
              "Checklist completo é proposta no jeito. Esse hábito vale para qualquer edital que você enfrentar.",
          },
        ],
      },
      {
        id: "m8-l2",
        title: "Hora de enviar",
        subtitle: "Submeta com folga",
        glyph: "check",
        xp: 25,
        steps: [
          {
            kind: "info",
            title: "O envio também tem técnica",
            body: [
              "Envie com antecedência — sistemas travam perto do prazo. Guarde o comprovante e o número de protocolo do envio.",
              "Submeter cedo te dá margem para resolver qualquer imprevisto sem perder a chance.",
            ],
          },
          {
            kind: "quiz",
            variant: "boolean",
            prompt: "É seguro deixar para enviar nos últimos minutos do prazo.",
            options: ["Verdadeiro", "Falso"],
            correct: 1,
            explain:
              "Perto do prazo, o sistema fica lento e instável. Envie com horas de folga e guarde o comprovante.",
          },
          {
            kind: "quiz",
            variant: "choice",
            prompt: "Depois de submeter, o que você sempre guarda?",
            options: [
              "O comprovante e o número de protocolo do envio",
              "Apenas a lembrança de ter enviado",
              "Um print da tela inicial do site",
              "Nada — o sistema cuida de tudo",
            ],
            correct: 0,
            explain:
              "O protocolo é a sua prova de envio dentro do prazo. Guarde-o sempre — pode ser decisivo em caso de dúvida.",
          },
        ],
      },
    ],
  },
];

/* ============================================================
   DERIVADOS + HELPERS
   ============================================================ */
export const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons);
export const TOTAL_LESSONS = ALL_LESSONS.length;
export const LESSON_ORDER: string[] = ALL_LESSONS.map((l) => l.id);

/* Progresso salvo. Mantido idêntico no servidor e no primeiro render do
   cliente (ver page.tsx) para não quebrar a hidratação. */
export interface Progress {
  completed: string[];
  streak: number;
}

/* Semente de demonstração: 3 lições concluídas → casa com "3 de 18" e deixa
   a 4ª disponível, mostrando a trilha em andamento já na primeira tela. */
export const DEFAULT_PROGRESS: Progress = {
  completed: LESSON_ORDER.slice(0, 3),
  streak: 4,
};

export const EMPTY_PROGRESS: Progress = { completed: [], streak: 0 };

export const STORAGE_KEY = "editalfit:aprender:v1";

export type LessonState = "completed" | "current" | "locked";

/* A trilha desbloqueia em sequência: a lição disponível é a primeira ainda
   não concluída; tudo depois dela fica bloqueado. */
export function getLessonState(lessonId: string, completed: string[]): LessonState {
  if (completed.includes(lessonId)) return "completed";
  const firstOpen = LESSON_ORDER.find((id) => !completed.includes(id));
  return lessonId === firstOpen ? "current" : "locked";
}

export function currentLessonId(completed: string[]): string | null {
  return LESSON_ORDER.find((id) => !completed.includes(id)) ?? null;
}

export function lessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function moduleOfLesson(id: string): LearnModule | undefined {
  return MODULES.find((m) => m.lessons.some((l) => l.id === id));
}

export function xpFor(completed: string[]): number {
  return ALL_LESSONS.filter((l) => completed.includes(l.id)).reduce(
    (sum, l) => sum + l.xp,
    0,
  );
}

export const XP_PER_LEVEL = 100;

export function levelInfo(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return { level, into, toNext: XP_PER_LEVEL - into, pct: (into / XP_PER_LEVEL) * 100 };
}

export function moduleProgress(mod: LearnModule, completed: string[]) {
  const done = mod.lessons.filter((l) => completed.includes(l.id)).length;
  return { done, total: mod.lessons.length, complete: done === mod.lessons.length };
}
