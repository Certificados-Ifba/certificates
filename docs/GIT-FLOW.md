# Git Flow

Este projeto agora utiliza o Git Flow como estratégia de branching. O Git Flow é uma estratégia robusta para gerenciar o ciclo de desenvolvimento de software.

## Configuração

O Git Flow já está configurado neste projeto com as seguintes configurações:

- **Branch de produção**: `main` - contém o código estável em produção
- **Branch de desenvolvimento**: `develop` - contém as últimas funcionalidades desenvolvidas
- **Prefixos de branches**:
  - Features: `feature/`
  - Bugfixes: `bugfix/`
  - Releases: `release/`
  - Hotfixes: `hotfix/`
  - Support: `support/`

## Instalação do Git Flow

Para usar o Git Flow, você precisa instalá-lo primeiro:

### Ubuntu/Debian
```bash
sudo apt-get install git-flow
```

### macOS
```bash
brew install git-flow
```

### Windows
Instale através do Git for Windows ou baixe de [nvie/gitflow](https://github.com/nvie/gitflow).

## Comandos Principais

### Inicialização (já feito neste projeto)
```bash
git flow init
```

### Trabalhando com Features

#### Iniciar uma nova feature
```bash
git flow feature start nome-da-feature
```

#### Finalizar uma feature
```bash
git flow feature finish nome-da-feature
```

#### Publicar uma feature (para colaboração)
```bash
git flow feature publish nome-da-feature
```

#### Baixar uma feature publicada
```bash
git flow feature pull origin nome-da-feature
```

### Trabalhando com Releases

#### Iniciar uma nova release
```bash
git flow release start v1.0.0
```

#### Finalizar uma release
```bash
git flow release finish v1.0.0
```

### Trabalhando with Hotfixes

#### Iniciar um hotfix
```bash
git flow hotfix start nome-do-hotfix
```

#### Finalizar um hotfix
```bash
git flow hotfix finish nome-do-hotfix
```

## Workflow Recomendado

### Para Desenvolvedores

1. **Começar uma nova feature:**
   ```bash
   git checkout develop
   git pull origin develop
   git flow feature start minha-nova-feature
   ```

2. **Desenvolver a feature:**
   - Faça seus commits normalmente
   - Mantenha commits atômicos e com mensagens descritivas

3. **Finalizar a feature:**
   ```bash
   git flow feature finish minha-nova-feature
   ```

4. **Enviar para o repositório:**
   ```bash
   git push origin develop
   ```

### Para Releases

1. **Criar uma release a partir de develop:**
   ```bash
   git checkout develop
   git pull origin develop
   git flow release start v1.0.0
   ```

2. **Preparar a release:**
   - Atualizar versões
   - Atualizar documentação
   - Fazer testes finais

3. **Finalizar a release:**
   ```bash
   git flow release finish v1.0.0
   git push origin main
   git push origin develop
   git push origin --tags
   ```

### Para Hotfixes

1. **Criar hotfix a partir de main:**
   ```bash
   git checkout main
   git pull origin main
   git flow hotfix start hotfix-1.0.1
   ```

2. **Corrigir o problema:**
   - Fazer a correção necessária
   - Testar a correção

3. **Finalizar o hotfix:**
   ```bash
   git flow hotfix finish hotfix-1.0.1
   git push origin main
   git push origin develop
   git push origin --tags
   ```

## Estrutura de Branches

```
main
├── hotfix/hotfix-1.0.1
├── release/v1.0.0
└── develop
    ├── feature/nova-funcionalidade
    ├── feature/melhorar-performance
    └── bugfix/corrigir-bug
```

## Boas Práticas

1. **Sempre começar features a partir de develop**
2. **Manter develop sempre funcional**
3. **Usar nomes descritivos para branches**
4. **Fazer merge requests/pull requests para revisão de código**
5. **Testar antes de finalizar features**
6. **Usar semantic versioning para releases (v1.0.0, v1.1.0, v2.0.0)**

## Integração com CI/CD

- **develop**: Deploy automático para ambiente de desenvolvimento/staging
- **main**: Deploy automático para ambiente de produção
- **feature/***: Execução de testes automáticos

## Comandos de Apoio

### Ver todas as features
```bash
git flow feature list
```

### Ver todas as releases
```bash
git flow release list
```

### Ver todos os hotfixes
```bash
git flow hotfix list
```

### Ajuda
```bash
git flow help
git flow feature help
```

## Links Úteis

- [Git Flow Original](https://nvie.com/posts/a-successful-git-branching-model/)
- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [Atlassian Git Flow Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)