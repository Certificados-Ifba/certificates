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

## Configurações do projeto

Para saber como configurar o projeto, clique [aqui](https://github.com/Certificados-Ifba/certificates/blob/main/docs/CONFIGURACOES.md)
