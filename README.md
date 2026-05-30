# EditalFit — Web (SaaS)

Aplicação web responsiva do EditalFit, construída em **Next.js 15 (App Router) + TypeScript + React 19**.
Adapta para desktop/web o design mobile de alta fidelidade entregue pelo Claude Design
(paleta **azul safira `#0D2E6B`** + tipografia **Sora**, status semafóricos verde/âmbar/vermelho).

As 17 telas (T01–T17) do documento de fluxo foram implementadas, com layouts desktop
(split de autenticação, shell com sidebar, diagnóstico em múltiplos painéis) que colapsam
de forma responsiva para mobile (bottom-nav + telas empilhadas).

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # serve o build
```

> **Windows + OneDrive:** se `next build` falhar com `EINVAL: readlink ... .next/...`,
> apague a pasta `.next` e rode de novo (é um conflito de sincronização do OneDrive, não do código).

## Mapa de rotas → telas

| Rota | Tela |
|---|---|
| `/` | T01 · Boas-vindas / Landing |
| `/login` | T02 · Login (`?reset=1` mostra banner de sucesso) |
| `/cadastro` | T03 · Cadastro |
| `/recuperar-senha` · `/redefinir-senha` | T04 · Recuperação de senha |
| `/onboarding` | T05 · Onboarding de perfil (4 etapas) |
| `/inicio` | T06 · Home / Painel de projetos (`?vazio=1` = estado vazio) |
| `/novo-projeto` | T07 · Seleção de edital |
| `/editais/[id]` | T08 · Detalhes do edital (`?from=match` faz o "Voltar" retornar ao Match) |
| `/editais/solicitar` | T09 · Solicitar edital |
| `/novo-projeto/etapa` | T10 · Seleção de etapa/categoria (**condicional** — só editais com etapas/categorias; ver fluxo 3.2) |
| `/novo-projeto/upload` | T11 · Upload de documentos (`?modo=edicao` = modo edição/reenvio; `?total=2` = fluxo que pulou o T10) |
| `/diagnostico` | T12 · Diagnóstico (`?state=loading`, `?tab=documentos\|equipe`) |
| `/diagnostico/erro` | T13 · Erro de análise (`?reason=internal`) |
| `/projetos/[id]` | T14 · Detalhes do projeto salvo (`?delete=1`) |
| `/match` | T15 · Match de editais (`?origem=project`, `?perfil=incompleto`) |
| `/modelos` | T16 · Biblioteca de modelos (`?type=orcamento` etc.) |
| `/configuracoes` | T17 · Configurações da conta (`?senha=1`, `?excluir=1`) |

## Estrutura

```
app/
  (public)/        # telas sem shell (welcome, auth, onboarding)
  (app)/           # área autenticada — layout com sidebar + topbar (AppShell)
  globals.css      # design system: tokens, base, primitivos, shell, responsivo
components/        # icons, ScoreRing, Brand, ProductPeek, AppShell, AuthShell, auth/*, app/*
lib/               # data.ts, diag.ts, editalDetail.ts, nav.ts (mocks tipados)
```

Estilo: design system global (`globals.css`) com primitivos reutilizáveis (`.btn`, `.field`,
`.card`, `.badge`, `.pill`, etc.) + **CSS Modules** por tela para o layout específico.
Os dados são mocks tipados em `lib/` (sem backend) — os pontos de integração com API estão
indicados nos comentários, espelhando o protótipo original.
