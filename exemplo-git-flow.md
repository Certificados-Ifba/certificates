# Exemplo de Feature usando Git Flow

Este é um arquivo de exemplo criado para demonstrar como o Git Flow funciona neste projeto.

## O que foi feito:

1. **Inicializou Git Flow** com as configurações padrão
2. **Criou branch develop** a partir do main
3. **Configurou prefixos** para os diferentes tipos de branches
4. **Criou documentação** detalhada sobre Git Flow
5. **Atualizou ORIENTACOES.md** para incluir referência ao Git Flow
6. **Criou esta feature de exemplo** usando `git flow feature start exemplo-git-flow`

## Estrutura de branches configurada:

- **main**: Branch de produção (protegida)
- **develop**: Branch de desenvolvimento
- **feature/**: Prefixo para features
- **release/**: Prefixo para releases
- **hotfix/**: Prefixo para hotfixes
- **bugfix/**: Prefixo para correções de bugs
- **support/**: Prefixo para branches de suporte

## Próximos passos:

Para finalizar esta feature de exemplo:

```bash
git flow feature finish exemplo-git-flow
```

Isso irá:
1. Fazer merge da feature na branch develop
2. Apagar a branch feature/exemplo-git-flow
3. Retornar para a branch develop

## Verificação:

Você pode verificar se o Git Flow está funcionando executando:

```bash
git flow feature list
git flow release list  
git flow hotfix list
```

E pode ver a configuração com:

```bash
git config --list | grep gitflow
```