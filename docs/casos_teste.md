# CENÁRIO 01

## 🛒 Cenário Carrinho de Compras

### Comportamento do Carrinho

Funcionalidade: Gestão e Cálculos do Carrinho de Compras

  [Como] cliente do e-commerce<br>
  [Quero] adicionar produtos e aplicar cupons no carrinho<br>
  [Para] visualizar os valores de subtotal, descontos e frete calculados corretamente


### 📋 Casos de Teste (Caminho Feliz e Negativo)

| ID        | TIPO                | CENÁRIO / REGRA VALIDADA                          | CRITÉRIO DE ACEITE      | DADOS DE ENTRADA                 | RESULTADO ESPERADO                                                                               | STATUS  |
| --------- | ------------------- | ------------------------------------------------- | ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| CT_CAR_01 | Caminho Feliz       | Aplicação de cupom válido com desconto            | CA01, CA02, CA09, CA11  | Cupom bemvindo10 em minúsculas   | Desconto de 10% aplicado sobre os produtos (não sobre o frete), arredondado.                    | PASS    |
| CT_CAR_02 | Caminho Feliz       | Regra de frete grátis por subtotal bruto          | CA07, CA08              | Subtotal = R$ 250,00 + Cupom 10% | Frete continua R$ 0,00 pois o valor bruto antes do cupom ultrapassa R$ 200,00.                 | PASS    |
| CT_CAR_03 | Negativo / Sad Path | Aplicação de cupom inválido                       | CA03                    | Cupom INVALIDO10                 | Exibir mensagem de erro e manter valor total sem alterações.                                     | PASS    |
| CT_CAR_04 | Negativo / Sad Path | Aplicação de cupom vencido                        | CA04                    | Cupom VERAO2026                  | Exibir mensagem "Cupom expirado" e não conceder desconto.                                        | PASS    |
| CT_CAR_05 | Negativo / BUG      | Concessão de frete grátis no limite de R$ 200,00 | CA06                    | Subtotal exato = R$ 200,00       | Esperado: Frete R$ 0,00 / Obtido: Cobrou R$ 19,90                                                | FAIL    |


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<br>
<br>
<br>


# CENÁRIO 02

## 💳 Cenário Checkout (Finalizar Compra)

### Comportamento do Checkout


Funcionalidade: Finalização do Pedido e Cadastro de Entrega

  [Como] cliente do e-commerce<br>
  [Quero] preencher meus dados de entrega e revisar o informações<br>
  [Para] confirmar e concluir o meu pedido com sucesso


### 📋 Casos de Teste (Caminho Feliz e Negativo)

| ID        | TIPO                | CENÁRIO / REGRA VALIDADA                          | CRITÉRIO DE ACEITE      | DADOS DE ENTRADA                 | RESULTADO ESPERADO                                                                               | STATUS  |
| --------- | ------------------- | ------------------------------------------------- | ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| CT_CHK_01 | Caminho Feliz       | Submissão de pedido com dados válidos             | CA11 + Checkout UI      | Nome, E-mail e CEP válidos       | Pedido processado com sucesso com resumo exibindo 2 casas decimais.                              | PASS    |
| CT_CHK_02 | Caminho Feliz       | Resumo do pedido coerente com o carrinho          | Resumo do Pedido UI     | Subtotal R$ 139,90 + Frete R$ 19,90 | Exibir no resumo exatamente os itens e totais calculados na etapa anterior.                      | PASS    |
| CT_CHK_03 | Negativo / Sad Path | Submissão com campos obrigatórios vazios          | Validação Checkout UI   | Clicar em Confirmar com vazios   | Bloquear envio do pedido e exibir mensagens de alerta abaixo dos campos.                         | PASS    |
| CT_CHK_04 | Negativo / BUG      | Limite máximo de unidades por produto             | CA10                    | Adicionar 6 unidades do item     | Esperado: Bloquear e aceitar máx 5 itens / Obtido: API permitiu 6 itens                          | FAIL    |

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<br>
<br>
<br>


# CENÁRIO 03

## 🔍 Cenário API de Consulta de Produtos (GET)

### Comportamento da API de Produtos


Funcionalidade: Consulta de Produtos no Catálogo via API

  [Como] sistema integrado / cliente<br>
  [Quero] consultar a lista completa de produtos ou obter dados de um item por ID<br>
  [Para] exibir o catálogo atualizado e validar as informações das mercadorias


### 📋 Casos de Teste (Caminho Feliz e Negativo)

| ID        | TIPO                | CENÁRIO / REGRA VALIDADA                          | CRITÉRIO DE ACEITE      | DADOS DE ENTRADA                 | RESULTADO ESPERADO                                                                               | STATUS  |
| --------- | ------------------- | ------------------------------------------------- | ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| CT_API_01 | Caminho Feliz       | Listar todos os produtos do catálogo              | GET /api/produtos       | Requisição GET sem parâmetros    | Status 200 OK retornando a lista com todos os produtos disponíveis (P001 ao P008).              | PASS    |
| CT_API_02 | Caminho Feliz       | Consultar dados de um produto por ID existente    | GET /api/produtos/{id}  | ID = P001                        | Status 200 OK com contrato de dados completo (id, nome, preco, descricao, categoria).            | PASS    |
| CT_API_03 | Negativo / Sad Path | Consultar produto com ID inexistente              | GET /api/produtos/{id}  | ID = P009                        | Status 404 Not Found com mensagem tratada indicando que o produto não foi encontrado.            | PASS    |
