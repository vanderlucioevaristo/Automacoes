Feature: Exclusão de Processos no SCAF Previdência

  Scenario: Excluir item de processo com sucesso
    Given que eu tenho acesso ao endpoint de processos
    And eu possuo um token de autenticação válido
    And eu tenho um ItemProcessoId válido 164484539
    And eu tenho um ProcessoId válido 2252
    When eu envio uma requisição DELETE para o endpoint
    Then a resposta deve ter status code 200
    And o processo deve ter o Status "Rejeitado"

  Scenario: Tentativa de exclusão com ItemProcessoID inexistente
    Given que eu tenho acesso ao endpoint de processos
    And eu possuo um token de autenticação válido
    And eu tenho um ItemProcessoId inválido
    When eu envio uma requisição DELETE para o endpoint
    Then a resposta deve ter status code 400
    And deve retornar uma mensagem de erro apropriada

  Scenario: Tentativa de exclusão com ProcessoID inexistente
    Given que eu tenho acesso ao endpoint de processos
    And eu possuo um token de autenticação válido
    And eu tenho um ProcessoId inexistente 9999
    When eu envio uma requisição DELETE para o endpoint
    Then a resposta deve ter status code 400
    And deve retornar uma mensagem de erro apropriada

  Scenario: Tentativa de exclusão com ItemProcessoId nulo
    Given que eu tenho acesso ao endpoint de processos
    And eu possuo um token de autenticação válido
    And eu tenho um ItemProcessoId nulo
    And eu tenho um ProcessoId válido 2145
    When eu envio uma requisição DELETE para o endpoint
    Then a resposta deve ter status code 400
    And deve retornar uma mensagem de erro apropriada

  Scenario: Tentativa de exclusão com ProcessoId nulo
    Given que eu tenho acesso ao endpoint de processos
    And eu possuo um token de autenticação válido
    And eu tenho um ItemProcessoId válido 164483187
    And eu tenho um ProcessoId nulo
    When eu envio uma requisição DELETE para o endpoint
    Then a resposta deve ter status code 400
    And deve retornar uma mensagem de erro apropriada