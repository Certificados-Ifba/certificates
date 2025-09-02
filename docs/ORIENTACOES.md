# Orientações

Guia para código fonte.
O objetivo desse documento é descrever as decisões tomadas para definição da estrutura do código e guiar os desenvolvedores

## Nomenclatura

A nomenclatura segue as seguintes regras:

- Arquivos: Nome em minúsculo, separado por `-`. `nome-de-arquivo.ts`.
- Código: [CamelCase](https://pt.wikipedia.org/wiki/CamelCase). `minhaVariavel`.
- Objetos JSON: Nome das chaves em [snake_case](https://en.wikipedia.org/wiki/Snake_case).

```json
{
  "campo_com_multiplas_palavras": "valor"
}
```

## Scripts

O projeto conta com vários scripts que irão auxiliar no desenvolvimento e podem ser utilizados das seguintes formas:

### Comandos Docker

- `docker-compose up --build`: Inicia o projeto e suas dependências no Docker

## Git Flow

Este projeto utiliza Git Flow como estratégia de branching. Para informações detalhadas sobre como usar, consulte o [guia de Git Flow](https://github.com/Certificados-Ifba/certificates/blob/main/docs/GIT-FLOW.md).

### Comandos básicos:
- `git flow feature start nome-da-feature` - Iniciar nova feature
- `git flow feature finish nome-da-feature` - Finalizar feature
- `git flow release start v1.0.0` - Iniciar nova release
- `git flow hotfix start nome-do-hotfix` - Iniciar hotfix

## Configurações do projeto

Para saber como configurar o projeto, clique [aqui](https://github.com/Certificados-Ifba/certificates/blob/main/docs/CONFIGURACOES.md)
