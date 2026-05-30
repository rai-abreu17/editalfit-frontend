# EditalFit — Documento de Fluxo e Telas

**Versão 2.0 · Maio 2026**
*Referência para construção do design. Descreve telas, estados e regras de comportamento da interface.*

\---

## 1\. Visão Geral do Produto

O EditalFit é uma plataforma que ajuda estudantes e empreendedores iniciantes a verificar se o projeto deles está alinhado com um edital de inovação — antes de submeter. O usuário escolhe o edital, envia os documentos, recebe um diagnóstico gerado por IA e pode corrigir e reenviar quantas vezes quiser.

**Dois papéis de usuário existem no sistema:**

* **Usuário (estudante/empreendedor):** fluxo principal desta versão
* **Administrador:** gerencia editais cadastrados na plataforma — fora do escopo desta versão

\---

## 2\. Mapa de Telas

```
┌─────────────────────────────────────────────────────────────┐
│  ÁREA PÚBLICA                                               │
│  \\\[T01] Boas-vindas / Landing                                │
│  \\\[T02] Login                                                │
│  \\\[T03] Cadastro                                             │
│  \\\[T04] Recuperação de Senha                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ONBOARDING (primeira vez)                                  │
│  \\\[T05] Onboarding de Perfil                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ÁREA AUTENTICADA                                           │
│                                                             │
│  \\\[T06] Home — Painel de Projetos                            │
│                                                             │
│  Fluxo de Novo Projeto                                      │
│  ├── \\\[T07] Seleção de Edital                                │
│  │     ├── \\\[T08] Detalhes do Edital (condicional)           │
│  │     └── \\\[T09] Solicitar Edital (edital não encontrado)   │
│  ├── \\\[T10] Seleção de Etapa/Categoria (condicional)         │
│  ├── \\\[T11] Upload de Documentos                             │
│  └── \\\[T12] Diagnóstico / Resultado da Análise              │
│         └── \\\[T13] Erro de Análise (condicional)             │
│                                                             │
│  Fluxo de Projeto Salvo                                     │
│  ├── \\\[T14] Detalhes do Projeto Salvo                        │
│  └── \\\[T11] Upload (edição/reenvio)  ──▶  \\\[T12] Diagnóstico │
│                                                             │
│  \\\[T15] Match de Editais ("Tinder de Editais")               │
│  \\\[T16] Biblioteca de Modelos de Documentos                  │
│  \\\[T17] Configurações da Conta                               │
└─────────────────────────────────────────────────────────────┘
```

\---

## 3\. Fluxos Principais

### 3.1 Fluxo de Autenticação e Onboarding

```
\\\[T01] Boas-vindas
  │
  ├── "Entrar"  ──▶  \\\[T02] Login
  │     │
  │     ├── Credenciais válidas  ──▶  \\\[T06] Home
  │     ├── Credenciais inválidas  ──▶  Mensagem de erro inline em \\\[T02]
  │     └── "Esqueci minha senha"  ──▶  \\\[T04] Recuperação de Senha
  │
  └── "Criar conta"  ──▶  \\\[T03] Cadastro
        │
        ├── E-mail já cadastrado  ──▶  Mensagem inline + link para \\\[T02]
        └── Cadastro bem-sucedido  ──▶  \\\[T05] Onboarding de Perfil
              │
              └── Perfil preenchido  ──▶  \\\[T06] Home (primeira vez)
```

**Regra:** Todas as telas a partir de \[T06] exigem autenticação. Qualquer acesso direto por URL sem sessão ativa redireciona para \[T02].

**Regra:** O Onboarding \[T05] só é exibido uma vez, imediatamente após o primeiro cadastro. Nunca é exibido novamente, mesmo que o usuário não tenha preenchido todas as informações — campos omitidos ficam em branco em \[T17] para preenchimento posterior.

\---

### 3.2 Fluxo de Novo Projeto (fluxo principal)

```
\\\[T06] Home
  │
  └── "Novo Projeto"
        │
        ▼
\\\[T07] Seleção de Edital
  │
  ├── Usuário não encontra o edital  ──▶  \\\[T09] Solicitar Edital
  │
  ├── Usuário clica em "Saiba mais" no card do edital  ──▶  \\\[T08] Detalhes do Edital
  │     │
  │     └── "Selecionar este edital"  ──▶  (continua fluxo abaixo)
  │
  └── Usuário seleciona edital diretamente no card
        │
        └── Edital tem etapas/categorias?
              │
              ├── SIM  ──▶  \\\[T10] Seleção de Etapa/Categoria
              │               └── Etapa selecionada  ──▶  \\\[T11] Upload
              │
              └── NÃO  ──▶  \\\[T11] Upload de Documentos
                              │
                              ├── "Analisar"  ──▶  \\\[T12] Diagnóstico
                              │                      └── Falha no processamento  ──▶  \\\[T13] Erro de Análise
                              │
                              └── "Salvar rascunho"  ──▶  \\\[T06] Home
                                  (projeto com status RASCUNHO)
```

\---

### 3.3 Fluxo de Projeto Salvo (retorno e correção)

```
\\\[T06] Home
  │
  └── Clica em projeto existente  ──▶  \\\[T14] Detalhes do Projeto Salvo
        │
        ├── "Ver Diagnóstico"  ──▶  \\\[T12] Diagnóstico (somente leitura)
        │
        └── "Editar / Enviar Documentos"  ──▶  \\\[T11] Upload (modo edição)
              │
              └── "Analisar novamente"  ──▶  \\\[T12] Diagnóstico (nova versão)
```

**Regra:** Cada análise nova gera uma versão do diagnóstico. O histórico de versões fica acessível em \[T14]. Nenhuma versão anterior é apagada.

\---

## 4\. Descrição de Cada Tela

\---

### \[T01] Boas-vindas / Landing

**Objetivo:** apresentar o produto e direcionar o visitante para login ou cadastro.

**Elementos:**

* Nome e tagline da plataforma
* Botão principal: **"Começar agora"** → \[T03]
* Link secundário: **"Já tenho conta"** → \[T02]

Não há formulário aqui. É uma tela de apresentação e direcionamento.

\---

### \[T02] Login

**Objetivo:** autenticar o usuário existente.

**Elementos:**

* Campo: e-mail
* Campo: senha (com toggle mostrar/ocultar)
* Link: **"Esqueci minha senha"** → \[T04]
* Botão: **"Entrar"**
* Link: **"Criar conta"** → \[T03]

**Estados de erro (exibidos inline, abaixo do campo):**

* E-mail não encontrado
* Senha incorreta
* Campo obrigatório não preenchido

\---

### \[T03] Cadastro

**Objetivo:** criar conta nova.

**Campos:**

* Nome completo
* E-mail
* Senha
* Confirmação de senha

**Validações inline:**

* E-mail já cadastrado → mensagem + link para \[T02]
* Senhas não conferem → mensagem abaixo do segundo campo
* Campos obrigatórios em branco → destaque no campo ao tentar avançar

**Após cadastro bem-sucedido:** redireciona para \[T05] Onboarding de Perfil.

\---

### \[T04] Recuperação de Senha

**Objetivo:** permitir redefinição de senha via e-mail.

**Passo 1 — Solicitar:**

* Campo: e-mail cadastrado
* Botão: **"Enviar link de redefinição"**
* Confirmação genérica após envio (mesmo que o e-mail não exista, por segurança)

**Passo 2 — Redefinir (via link recebido no e-mail):**

* Campo: nova senha
* Campo: confirmação da nova senha
* Botão: **"Redefinir senha"** → redireciona para \[T02] com mensagem de sucesso

\---

### \[T05] Onboarding de Perfil *(exibido apenas uma vez, pós-cadastro)*

**Objetivo:** coletar informações mínimas de perfil que alimentam o sistema de match de editais em \[T15]. Sem esses dados, as sugestões de editais serão genéricas.

**Formato:** sequência de 3 a 4 etapas simples, uma pergunta por vez. Barra de progresso visível.

**Perguntas:**

1. **Quem é você?** — Estudante de graduação / Estudante de pós-graduação / Empreendedor iniciante / Pesquisador
2. **Qual é a sua área de atuação?** — seleção múltipla (ex.: Tecnologia, Agronegócio, Saúde, Educação, Meio Ambiente, outro)
3. **Em qual estado você está?** — lista de estados brasileiros
4. **Já submeteu algum edital antes?** — Sim / Não *(ajusta o tom das mensagens da plataforma)*

**Elementos:**

* Botão **"Continuar"** em cada etapa
* Link **"Pular por agora"** disponível em todas as etapas — dados podem ser preenchidos depois em \[T17]
* Na última etapa, botão **"Pronto, vamos começar"** → \[T06] Home

**Regra:** esta tela não volta a aparecer após ser concluída ou pulada. O reaparecimento nunca ocorre, nem após logout e novo login.

\---

### \[T06] Home — Painel de Projetos

**Objetivo:** visão geral dos projetos do usuário e ponto de entrada para ações principais.

**Elementos:**

* Botão de destaque: **"+ Novo Projeto"** → \[T07]
* Lista de projetos salvos, cada card exibe:

  * Nome do projeto (definido pelo usuário)
  * Nome do edital vinculado
  * Status do projeto (ver seção 5)
  * Data da última atividade
  * Botão **"Ver"** → \[T14]
* Seção lateral ou banner: **"Editais que combinam com você"** → \[T15]

**Estado vazio (nenhum projeto ainda):**

* Ilustração + mensagem encorajadora
* Botão **"Criar meu primeiro projeto"** → \[T07]

\---

### \[T07] Seleção de Edital

**Objetivo:** o usuário escolhe a qual edital o projeto será submetido.

**Elementos:**

* Campo de busca por nome do edital
* Filtros:

  * Estado (ex.: Maranhão, São Paulo, Nacional)
  * Área de atuação (ex.: inovação, tecnologia social, agronegócio)
  * Prazo (abertos / todos)
* Lista de resultados em cards, cada card exibe:

  * Nome do edital
  * Órgão responsável
  * Prazo final
  * Tags de área
  * Indicador: "Manual do avaliador disponível" (quando aplicável)
  * Botão **"Saiba mais"** → \[T08] Detalhes do Edital
  * Botão **"Selecionar"** → avança direto para \[T10] ou \[T11]

**Estado: edital não encontrado:**

* Quando a busca retorna zero resultados, exibir:

  * Mensagem: *"Não encontramos esse edital na nossa base ainda."*
  * Botão **"Solicitar cadastro deste edital"** → \[T09]

**Regra:** o usuário só avança ao selecionar um edital. O fluxo não prossegue sem seleção.

\---

### \[T08] Detalhes do Edital *(condicional)*

**Objetivo:** exibir informações completas do edital antes de o usuário confirmar a seleção.

*Acessível pelo botão "Saiba mais" em qualquer card de edital — no T07 e no T15.*

**Elementos:**

* Nome completo do edital e órgão responsável
* Prazo final de submissão
* Descrição do objetivo do edital
* Lista dos critérios de avaliação (com pesos, quando disponíveis)
* Etapas ou categorias disponíveis (quando aplicável)
* Link: **"Acessar edital oficial"** → abre em nova aba
* Link: **"Ver manual do avaliador"** → abre em nova aba (quando disponível)
* Botão principal: **"Selecionar este edital"** → avança para \[T10] ou \[T11]
* Botão secundário: **"Voltar"** → retorna para \[T07] ou \[T15]

\---

### \[T09] Solicitar Edital *(edital não encontrado)*

**Objetivo:** permitir que o usuário indique um edital ausente da base, alimentando a curadoria da plataforma.

**Elementos:**

* Mensagem explicativa: *"Cole o link oficial do edital abaixo. Nossa equipe vai analisar e cadastrá-lo em breve."*
* Campo: URL do edital oficial
* Campo opcional: nome do edital (para facilitar a identificação)
* Botão: **"Enviar solicitação"**
* Após envio: mensagem de confirmação + botão **"Voltar à busca"** → \[T07]

**Regra:** não há promessa de prazo para o cadastro. A mensagem de confirmação deve ser genérica e honesta: *"Recebemos sua solicitação. Assim que o edital for cadastrado, você receberá uma notificação."*

\---

### \[T10] Seleção de Etapa / Categoria *(condicional)*

**Objetivo:** refinamento dentro do edital selecionado, quando ele possui subdivisões internas com requisitos de documentação diferentes.

*Esta tela só aparece se o edital selecionado em \[T07] ou \[T08] tiver etapas ou categorias distintas.*

**Exemplo de uso:** o Centelha possui categorias como "Ideação" e categorias para empresas com maturidade tecnológica maior (TRL avançado). Cada categoria exige documentos diferentes.

**Elementos:**

* Título do edital selecionado (somente leitura)
* Lista de etapas/categorias disponíveis com descrição curta de cada uma
* Botão **"Continuar"** (habilitado apenas após seleção)
* Botão **"Voltar"** → \[T07]

**Regra:** a seleção feita aqui define quais documentos serão listados em \[T11]. Alterar a etapa depois significa que a lista de documentos é reiniciada — uma confirmação é exibida antes de prosseguir.

\---

### \[T11] Upload de Documentos

**Objetivo:** o usuário envia os arquivos que compõem a proposta para o edital selecionado.

**Elementos:**

* Cabeçalho: nome do edital + etapa selecionada (somente leitura)
* Lista de documentos obrigatórios (gerada automaticamente com base no edital + etapa)

  * Para cada documento da lista, o usuário pode:

    * **Fazer upload do arquivo** (arrastar ou selecionar)
    * **Marcar como "Ainda não tenho"** → item fica com status PENDENTE, sem bloquear os demais
    * **"Ver modelo"** → \[T16] filtrado pelo tipo de documento
* Campo: **"Nome do projeto"** (livre, definido pelo usuário — usado para identificação em \[T06])
* Seção de currículos da equipe (upload separado, até 5 arquivos)
* Botão **"Salvar rascunho"** → salva sem analisar, status RASCUNHO em \[T06]
* Botão principal **"Analisar"** → dispara a análise de IA e vai para \[T12]

**Regra — botão "Analisar":**
O botão é habilitado quando ao menos um documento foi enviado. Não é exigido que todos os documentos estejam presentes — a IA reportará os que estão faltando como parte do diagnóstico.

**Estado de cada item da lista:**

|Ícone / Cor|Status|Significado|
|-|-|-|
|🔘 Cinza|AGUARDANDO|Ainda não foi feita nenhuma ação|
|✅ Verde|ENVIADO|Arquivo carregado com sucesso|
|⏳ Amarelo|PENDENTE|Marcado como "ainda não tenho"|
|❌ Vermelho|ERRO|Falha no upload (formato inválido, arquivo corrompido)|

**Tela em modo edição (retorno de \[T14]):**

* Documentos já enviados aparecem com status ENVIADO e opção de substituir
* Documentos marcados como PENDENTE mantêm essa marcação, podendo ser atualizados
* O botão principal se chama **"Analisar novamente"**
* Aviso exibido: *"Você está atualizando o projeto. Uma nova versão do diagnóstico será gerada."*

\---

### \[T12] Diagnóstico / Resultado da Análise

**Objetivo:** apresentar o resultado da análise de IA de forma clara e acionável.

**Estado de carregamento:**
Enquanto a análise está sendo processada, a tela exibe uma animação com mensagem de espera. Se o tempo de processamento ultrapassar o esperado, exibir aviso com opção de **"Me notificar quando estiver pronto"** — o usuário pode sair da tela e será notificado ao concluir.

**Após análise concluída, a tela é dividida em três áreas:**

**Área 1 — Pontuação Geral:**

* Score de aderência de 0 a 100 com leitura semafórica:

  * 🔴 0–49: Baixa aderência
  * 🟡 50–74: Aderência parcial
  * 🟢 75–100: Alta aderência
* Frase resumo do diagnóstico em linguagem simples

**Área 2 — Painel de Critérios (esquerda):**

* Lista de todos os critérios de avaliação do edital
* Cada critério tem um indicador de status:

  * 🟢 OK
  * 🟡 Atenção (atendido parcialmente)
  * 🔴 Problema identificado
* Clicar em um critério rola o painel central até o trecho correspondente

**Área 3 — Análise Detalhada (centro):**

* A proposta exibida com trechos destacados por cor conforme o status do critério
* Cada destaque abre um balão com o comentário da IA
* Todo comentário tem botão **"Ver no edital"** → abre trecho exato do edital que fundamenta o apontamento

**Abas adicionais na mesma tela:**

* **Checklist de Documentação:** lista de todos os documentos exigidos com status (entregue / faltando / formato incorreto)
* **Análise da Equipe:** comparação entre os currículos enviados e o perfil de equipe exigido pelo edital, com indicação de gaps por membro

**Ações disponíveis:**

* Botão **"Editar documentos e analisar novamente"** → \[T11] em modo edição
* Botão **"Exportar diagnóstico"** → gera PDF do resultado completo para download
* Botão **"Compartilhar diagnóstico"** → gera link de visualização somente leitura, sem exigir login de quem recebe
* Link **"Ver outros editais onde esse projeto também se encaixa"** → \[T15]

**Regra — Transparência dos apontamentos:**
Nenhum apontamento da IA pode ser exibido sem o link ou citação da fonte no edital. Se não houver fundamentação, o item não é exibido.

**Regra — Tom dos apontamentos:**
A redação dos comentários deve ser sempre orientativa, nunca punitiva. Exemplo correto: *"Este trecho pode ser reforçado para alinhar melhor ao critério X do edital."* Exemplo incorreto: *"Você errou aqui."*

\---

### \[T13] Erro de Análise *(condicional)*

**Objetivo:** informar o usuário quando a análise não pôde ser concluída e oferecer saída clara.

*Esta tela aparece quando o processamento da IA falha por qualquer motivo — seja por problema nos arquivos enviados, seja por falha interna do sistema.*

**Elementos:**

* Ícone e mensagem de erro em linguagem simples (sem jargão técnico)
* Identificação da causa, quando possível:

  * *"Não conseguimos ler o arquivo X. Verifique se ele está corrompido ou em formato inválido."*
  * *"Ocorreu um problema interno. Seus documentos estão salvos."*
* Botão principal: **"Tentar analisar novamente"** → tenta reprocessar sem exigir reenvio dos arquivos
* Botão secundário: **"Revisar documentos"** → \[T11] em modo edição, para o usuário substituir arquivos problemáticos
* Link: **"Voltar ao Home"** → \[T06]

**Regra:** o erro nunca apaga os documentos já enviados. O projeto retorna ao status anterior ao clique em "Analisar". O usuário nunca perde o que já tinha.

**Regra:** o botão "Tentar analisar novamente" deve funcionar sem exigir nenhuma ação adicional do usuário — se o problema foi interno, um clique já reprocessa.

\---

### \[T14] Detalhes do Projeto Salvo

**Objetivo:** visão consolidada de um projeto específico, com histórico de versões de análise.

**Elementos:**

* Nome do projeto + edital vinculado + etapa (quando aplicável)
* Status atual do projeto
* **Histórico de versões:** linha do tempo com cada análise realizada

  * Data e hora de cada versão
  * Score de aderência de cada versão (permite ver evolução)
  * Botão **"Ver diagnóstico desta versão"** → \[T12] em modo somente leitura
* Lista de documentos do estado atual (com status de cada um)
* Botão principal: **"Editar / Enviar Documentos"** → \[T11] em modo edição
* Botão secundário: **"Ver último diagnóstico"** → \[T12]
* Link: **"Excluir projeto"** (com confirmação em modal antes de executar)

\---

### \[T15] Match de Editais ("Tinder de Editais")

**Objetivo:** sugerir ao usuário outros editais nos quais o projeto dele também se encaixaria.

**Como funciona:**
A plataforma cruza as informações do perfil do usuário (coletadas em \[T05] e \[T17]) e os dados dos projetos salvos com a base de editais cadastrados. O resultado é uma lista de editais sugeridos com justificativa.

**Elementos:**

* Cards de editais sugeridos, cada um exibe:

  * Nome do edital e órgão responsável
  * Prazo final
  * **Por que foi sugerido:** frase curta explicando o match (ex.: *"Seu projeto de IoT para agricultores se alinha ao foco em tecnologia para o campo deste edital"*)
  * Botão **"Saiba mais"** → \[T08] Detalhes do Edital
  * Botão **"Criar projeto para este edital"** → \[T07] com o edital pré-selecionado
* Filtros: área de atuação, estado, prazo

**Regra:** quando acessada a partir do link em \[T12], os resultados são pré-filtrados pelo projeto que originou o acesso. Quando acessada pelo menu, usa o perfil geral do usuário.

**Regra — perfil incompleto:** se o usuário pulou o onboarding em \[T05] e não preencheu o perfil em \[T17], os resultados serão genéricos. Nesse caso, exibir um banner de aviso: *"Complete seu perfil para receber sugestões mais precisas"* com link para \[T17].

\---

### \[T16] Biblioteca de Modelos de Documentos

**Objetivo:** oferecer modelos de referência para documentos que o usuário ainda não sabe como fazer.

**Acesso:** botão **"Ver modelo"** disponível em \[T11], ao lado de cada documento com status AGUARDANDO ou PENDENTE. Também acessível pelo menu principal.

**Elementos:**

* Lista de tipos de documento (ex.: Plano de Negócios, Orçamento, Pitch Deck, Currículo de Equipe)
* Para cada tipo:

  * Descrição do que é o documento e para que serve
  * Botão **"Baixar modelo"** → download de arquivo template editável
  * Notas de orientação: o que não pode faltar, armadilhas comuns

**Regra:** quando acessada pelo botão "Ver modelo" em \[T11], a biblioteca abre já filtrada para o tipo de documento correspondente. Quando acessada pelo menu, exibe todos os tipos disponíveis.

**Regra:** os modelos são genéricos (não específicos a um edital). A IA analisa o documento preenchido em \[T12] e aponta onde ele pode ser melhorado para o edital específico.

\---

### \[T17] Configurações da Conta

**Objetivo:** gerenciamento dos dados pessoais e preferências do usuário.

**Seções:**

* **Dados pessoais:** nome, e-mail (somente leitura após cadastro), foto de perfil
* **Perfil:** tipo de usuário, área de atuação, estado — os mesmos dados do onboarding \[T05], editáveis aqui a qualquer momento
* **Segurança:** alteração de senha
* **Notificações:** preferências de alertas (novos editais sugeridos, prazo se aproximando, edital solicitado cadastrado)
* **Zona de perigo:** exclusão de conta (com confirmação em modal)

\---

## 5\. Estados do Projeto

Todo projeto salvo tem um status visível em \[T06] e \[T14]:

|Status|Quando ocorre|Cor sugerida|
|-|-|-|
|**RASCUNHO**|Projeto criado mas análise ainda não foi executada|Cinza|
|**ANALISANDO**|Análise em processamento após clique em "Analisar"|Azul (animado)|
|**ANALISADO**|Diagnóstico disponível|Verde|
|**ATUALIZADO**|Documentos editados após um diagnóstico — nova análise pendente|Laranja|
|**ERRO**|Falha no processamento da análise|Vermelho|

\---

## 6\. Regras Gerais de Comportamento da Interface

1. **Nenhuma análise é automática.** A IA só processa quando o usuário clica explicitamente em "Analisar" ou "Analisar novamente". Não há análise em background.
2. **Todo apontamento tem fonte.** Cada feedback exibido em \[T12] deve ter uma referência rastreável ao edital. Se não houver, o item não é exibido.
3. **Documentos pendentes não bloqueiam análise.** Marcar um documento como "Ainda não tenho" em \[T11] não impede o usuário de rodar a análise — a IA listará os documentos faltantes como parte do resultado.
4. **Histórico de versões é imutável.** Nenhuma versão de diagnóstico anterior é sobrescrita ou deletada. O usuário pode consultar qualquer versão passada de um projeto.
5. **Erro nunca apaga dados.** Qualquer falha de processamento em \[T13] preserva os documentos e o estado anterior do projeto.
6. **Tom da interface é sempre respeitoso.** Mensagens de erro, avisos e feedbacks da IA nunca usam linguagem punitiva ou condescendente.
7. **Seleção de etapa reinicia a lista de documentos.** Se o usuário voltar em \[T10] e trocar a etapa/categoria, os documentos já carregados em \[T11] são removidos — uma confirmação é exibida antes de prosseguir.
8. **Match de editais é contextual.** Quando acessado via \[T12], o \[T15] usa os dados do projeto atual como referência. Quando acessado via menu, usa o perfil geral do usuário.
9. **Compartilhamento de diagnóstico é público por link.** O link gerado em \[T12] não exige login de quem recebe. Serve para que membros da equipe sem conta possam visualizar o resultado.
10. **Onboarding não se repete.** A tela \[T05] é exibida uma única vez. Mesmo que o usuário pule todas as etapas, ela não volta a aparecer.

\---

## 7\. Módulo Educativo *(escopo futuro)*

**Não entra nesta versão**, mas deve ser considerado no design system para inclusão posterior sem grandes reestruturações visuais.

**Conceito:** módulo gamificado, estilo Duolingo, com lições curtas sobre como funcionam editais de inovação. Cada lição combina texto explicativo + exercício prático (ex.: identificar erros em um orçamento fictício, classificar trechos de proposta como corretos ou incorretos). Ao errar, o usuário recebe explicação detalhada do conceito.

**Ponto de entrada previsto:** seção no menu principal, acessível independentemente de qualquer projeto.

\---

*Documento gerado a partir da transcrição de áudio do produto e do documento de Design Thinking — EditalFit. v2.0 inclui Onboarding de Perfil \[T05], Detalhes do Edital \[T08], Solicitar Edital \[T09], Erro de Análise \[T13] e ações de Exportar/Compartilhar diagnóstico em \[T12].*

