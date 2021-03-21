### Descrição das Mudanças ###

<!--
Primeiramente muito obrigado por sua contribuição, antes de abrir o PR tenha certeza de preencher todos os campos necessários, o não preenchimento dos campos pode resultar em um atraso para revisão do seu código ou até mesmo fechamento do PR.
-->

Descrevas as mudanças feitas no código neste espaço.

### *Bugs* Corrigidos ###

<!-- 
Se for mais de uma issue, liste seguindo o padrão. Copie e cole a estrutura do fixes, pois assim a Issue é fecheada quando o ocorrer o Merge do PR.
-->

- fixes #

**Tenha certeza de que existe uma issue aberta neste repositório para esta funcionalidade antes de enviar o PR**

### Mudanças na API ###

Liste todas as alterações na API (ou adicione *Nenhuma*), exemplo:

Adicionado:

- `const server = http.createServer((req, res) => {})`
- `export default () => {}`

Modificado:

- `const server` => `const internalServer`

É um código completamente novo? Então você pode usar um estilo mais verboso para descrever:

```ts
import fs from 'fs'
import { syncBuiltinESMExports } from 'module'

fs.readFile = null

delete fs.readFileSync

fs.newAPI = () => {}

syncBuiltinESMExports()

import('fs').then((esmFS) => { });

```

### Mudanças de comportamento ###

Descreva o comportamento da funcionalidade implementada neste PR.

### Testing Procedure ###

Por favor descreva os procedimentos de teste da sua implementação, caso tenha.

### PR Checklist ###
<!-- A ser preenchido por você -->

- [ ] Possui testes (se não, por favor descreva o motivo de não ter teste)
- [ ] Foi feito Rebase para a master no momento que o PR foi aberto
- [ ] Modificações estão de acordo com o padrão de código
- [ ] Atualizado documentação

### PR Checklist  do time ###
<!-- A ser preenchido por quem for revisar o código -->

- [ ] O PR está apontando para a branch correta
- [ ] Os testes estão passando (ou as falha não são relacionadas a este PR)
