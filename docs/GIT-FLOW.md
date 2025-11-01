# Guia de Uso do Git Flow — Certificates (IFBA) — Git Flow

Este guia padroniza o fluxo de trabalho com **Git Flow** para todos os times. O objetivo é reduzir conflitos, tornar previsíveis os ciclos de release e facilitar correções em produção.

---

## 1) Visão Geral

**Repositório**: `Certificados-Ifba/certificates` (monorepo TypeScript/NestJS) — pastas principais: `.github/`, `docker/`, `docs/`, `packages/`.

**Branches principais**

* `main`: código em produção (tags `vX.Y.Z`).
* `develop`: integração contínua (branch padrão para PRs de feature).

**Branches de suporte**

* `feature/*`: novas funcionalidades e melhorias.
* `release/*`: estabilização e preparação de versão.
* `hotfix/*`: correções urgentes em produção.
* (Opcional) `support/*`: manutenção de linhas antigas.

> Convenções: prefixos `feature/`, `release/`, `hotfix/`, `support/` e **tags** com `v` (ex.: `v1.4.0`).

---

## 2) Pré‑requisitos

* Git + acesso ao remoto GitHub.
* Ferramenta **git‑flow (AVH Edition)** (opcional).
* Node conforme `.nvmrc` do repo (use `nvm use` antes de rodar scripts).
* Docker instalado (o projeto possui `docker-compose.yml`, `docker-compose.dev.yml`, `docker-compose.prod.yml`).
* Branches `main` e `develop` criadas e **protegidas** no remoto.

Instalação do git‑flow (opcional):

* Ubuntu/Debian: `sudo apt install git-flow`
* macOS (Homebrew): `brew install git-flow-avh`
* Windows: `choco install git-flow-avh` (ou `scoop install git-flow-avh`)

---

## 3) Inicialização do repositório

```bash
# criar develop (se ainda não existir)
git checkout main && git pull
git branch develop
git push -u origin develop

# inicializar git-flow
git flow init -d
```

Padrões após o `init`:

* Production branch: `main`
* Development branch: `develop`
* Prefixos: `feature/`, `release/`, `hotfix/`, `support/` | Tag prefix: `v`

---

## 4) Convenções de nomes e commits (Certificates)

**Branches**

* Feature: `feature/TICKET-servico-resumo` (ex.: `feature/IFBA-42-user-reset-senha`)
* Release: `release/1.5.0`
* Hotfix: `hotfix/1.5.1`

**Commits (Conventional Commits)**

* `feat(gateway): adiciona rate limit`
* `fix(user): corrige validação de CPF`
* `chore(devops): atualiza docker-compose`
* `refactor(token): extrai provider de JWT`

**PRs** (sempre → `develop`)

* Título: `[IFBA-42][user] reset de senha via e-mail`
* Corpo: contexto, checklist, evidências (Swagger/prints/logs), impacto e rollback.

---

## 5) Fluxos de trabalho (dia a dia)

### 5.1 Feature (por serviço do monorepo)

```bash
# criar branch
git flow feature start IFBA-42-user-reset-senha

# desenvolver no(s) pacote(s) em packages/* (user, token, gateway, mailer, permission, events)
# rode local: nvm use && yarn && yarn build && yarn test

# opção A (recomendada): PR para develop
git push -u origin feature/IFBA-42-user-reset-senha
# abra PR → base: develop, aguarde revisão + CI

# opção B: finalizar via git-flow (merge direto em develop)
# git flow feature finish IFBA-42-user-reset-senha
```

Critérios de aceite: CI verde, 1–2 aprovações, integração via `docker-compose.dev.yml` OK.

### 5.2 Release

```bash
git flow release start 1.5.0
# congelar features; atualizar versão e changelog
# validar end-to-end com docker compose (dev/prod)

# finalizar
# A) git-flow: merge em main e develop + tag v1.5.0
git flow release finish 1.5.0
# B) via PRs: release/1.5.0 → main (gera tag) e release/1.5.0 → develop
```

Checklist: versão/changelog, migrações de DB (se houver), variáveis de ambiente `.env`, testes e2e Swagger em `http://localhost:3000/api`.

### 5.3 Hotfix (produção)

```bash
git flow hotfix start 1.5.1
# aplicar fix nos pacotes afetados, atualizar tests
# finalizar (merge main + develop + tag)
git flow hotfix finish 1.5.1
```

Regra: nada vai direto para `main`.

---

## 6) Versionamento e tags

* SemVer: `MAJOR.MINOR.PATCH`
* Tags na `main` com prefixo `v` (ex.: `v1.5.0`).
* Releases e hotfixes tagueiam automaticamente com `git flow ... finish`; em PRs manuais, crie tag após merge em `main`.

---

## 7) Proteções de branch e CI/CD (GitHub Actions)

**Proteções**

* Bloquear push direto em `main` e `develop`.
* Exigir PR + revisão + CI.

**Workflow sugerido**: `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
    branches: [develop]
  push:
    tags: ['v*']
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: yarn test --ci --passWithNoTests
  release:
    if: startsWith(github.ref, 'refs/tags/v')
    needs: build-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'yarn'
      - run: yarn install --frozen-lockfile
      - run: yarn build
      # publique imagens/artefatos aqui (Docker/ghcr)
```

**Integração Docker (local)**

```bash
# subir stack de exemplo
cp .env.example .env
docker network create infrastructure 2>/dev/null || true
docker compose up -d
# API: http://localhost:3000 | Swagger: /api
```

---

## 8) Exemplo de ciclo completo no Certificates

1. **Feature**: `feature/IFBA-42-user-reset-senha` → PR → `develop` (merge)
2. **Release**: `release/1.5.0` → PR → `main` (merge + tag `v1.5.0`) e PR → `develop`
3. **Hotfix**: `hotfix/1.5.1` → PR → `main` (tag `v1.5.1`) e PR → `develop`

---

## 9) Padrões de Templates

### 9.1 Template de PR (repo Certificates)

```
[TICKET][serviço] Título conciso

## Contexto
- O que foi feito e por quê

## Mudanças
- [ ] Lista resumida

## Testes
- [ ] Unitários (yarn test)
- [ ] Integração (se aplicável)
- [ ] E2E manual via Swagger (/api)

## Deploy/Infra
- .env atualizado? docker-compose OK?

## Riscos/Impactos
- DB / Performance / Segurança

## Rollback
- Plano de reversão
```

### 9.2 Template de commit

```
<tipo>(serviço): descrição

Refs: IFBA-123
```

---

## 10) Hooks úteis (opcional)

**commit-msg** para Conventional Commits (igual ao modelo original). Instalar em `.git/hooks/commit-msg`.

---

## 11) Boas práticas adicionais

* PRs pequenos e focados num serviço por vez (`packages/*`).
* `rebase` apenas local antes do push; PRs via `merge`.
* Feature flags quando integrar partes incompletas.
* Automatize changelog (Changesets/Conventional Changelog).

---

## 12) Monorepo — como organizar

* Escopo nos commits: `feat(user)`, `fix(token)`, `chore(gateway)` etc.
* CI pode usar **matrix** por pacote quando necessário.
* Releases por tag global (`vX.Y.Z`) ou por pacote (se adotarem changesets).

---

## 13) Troubleshooting

* **Node errado**: `nvm use` (lê `.nvmrc`).
* **Swagger não sobe**: confira `.env` e portas do compose; API padrão em `:3000` (`/api`).
* **Branch desatualizada**: `git fetch origin && git merge origin/develop` (ou rebase local) antes do PR.
* **Tag errada**: não reescreva histórico; crie nova tag `vX.Y.Z+fix` e documente.
* **CI vermelho**: corrigir antes do merge.

---

## 14) Cheatsheet de comandos

```bash
# inicialização
git flow init -d

# feature
git flow feature start IFBA-123
# ...
git push -u origin feature/IFBA-123
# abrir PR → develop

# release
git flow release start 1.5.0
# ...
git flow release finish 1.5.0

# hotfix
git flow hotfix start 1.5.1
# ...
git flow hotfix finish 1.5.1
```

---

## 15) FAQ

**Posso commitar direto em `develop`?**

> Evite. Prefira `feature/*` + PR.

**E sem a ferramenta git‑flow?**

> Siga a estratégia com branches e PRs. Tags manuais após merge em `main`.

**Como nomear branch sem ticket?**

> `feature/servico-descricao-curta` — mas prefira sempre referenciar um ticket.

**Como validar tudo local?**

> `cp .env.example .env && docker compose up -d` e acesse Swagger em `http://localhost:3000/api`.

**Quando usar `support/*`?**

> Para manter linha antiga (ex.: `support/1.4.x`) recebendo patches críticos.

---
