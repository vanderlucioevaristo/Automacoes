Feature: Atualização de Dados Bancários de Pessoa Física no SCAF Previdência

  Scenario: Solicitação de alteração de dados bancários para Participante
    Given que eu possuo um participante com dados bancários cadastrados
    When eu enviar uma solicitação de alteração dos dados bancários com os dados válidos
    Then a resposta deve ter status code 200
    And deve retornar um processo de alteração com status "Aguardando Autorização"
    And não deve ter justificativa preenchida

  Scenario: Solicitação de alteração de dados bancários para Beneficiário
    Given que eu possuo um beneficiário com dados bancários cadastrados
    When eu enviar uma solicitação de alteração dos dados bancários com os dados válidos
    Then a resposta deve ter status code 200
    And deve retornar um processo de alteração com status "Aguardando Autorização"
    And não deve ter justificativa preenchida

  Scenario: Solicitação de alteração de dados bancários para Beneficiário Associado
    Given que eu possuo um beneficiário associado com dados bancários cadastrados
    When eu enviar uma solicitação de alteração dos dados bancários com os dados válidos
    Then a resposta deve ter status code 200
    And deve retornar um processo de alteração com status "Aguardando Autorização"
    And não deve ter justificativa preenchida

  Scenario: Solicitação de alteração de dados bancários para Pessoa Física Associada
    Given que eu possuo uma pessoa física associada com dados bancários cadastrados
    When eu enviar uma solicitação de alteração dos dados bancários com os dados válidos
    Then a resposta deve ter status code 200
    And deve retornar um processo de alteração com status "Aguardando Autorização"
    And não deve ter justificativa preenchida

  Scenario: Tentativa de alteração de dados bancários sem informar tipo de pessoa
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração sem informar o tipo de pessoa
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1540"
    And deve indicar que o vínculo não foi encontrado para a pessoa física

  Scenario: Tentativa de alteração de dados bancários sem informar forma de pagamento
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração sem informar a forma de pagamento
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1538"
    And deve indicar que a forma de pagamento deve ser preenchida

  Scenario: Tentativa de alteração com solicitação pendente
    Given que eu possuo uma pessoa física com uma solicitação de alteração pendente
    When eu enviar uma nova solicitação de alteração dos dados bancários
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-proc-0001"
    And deve indicar que já existe uma solicitação pendente

  Scenario: Tentativa de alteração com parâmetros nulos
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração com parâmetros nulos
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "The request is invalid."

  Scenario: Tentativa de alteração para pessoa física inexistente
    Given que eu possuo um ID de pessoa física que não existe no sistema
    When eu enviar uma solicitação de alteração dos dados bancários
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1540"
    And deve indicar que o vínculo não foi encontrado para a pessoa física

  Scenario: Tentativa de alteração com contrato de plano inexistente
    Given que eu possuo um número de contrato de plano que não existe no sistema
    When eu enviar uma solicitação de alteração dos dados bancários
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1044"
    And deve indicar que o contrato do plano não foi encontrado

  Scenario: Tentativa de alteração de conta sem dígito verificador
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração sem informar o dígito verificador da conta
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1535"
    And deve indicar que o dígito verificador da conta deve ser preenchido

  Scenario: Tentativa de alteração de conta com dígito verificador inválido
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração com dígito verificador inválido
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1537"
    And deve indicar que o dígito verificador da conta é inválido

  Scenario: Tentativa de alteração com empréstimo não habilitado
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração com empréstimo não habilitado
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1539"
    And deve indicar que a alteração de dados bancários de empréstimo não está configurada

  Scenario: Tentativa de alteração com todos os campos em branco
    Given que eu possuo uma pessoa física com dados bancários cadastrados
    When eu enviar uma solicitação de alteração com todos os campos em branco
    Then a resposta deve ter status code 400
    And deve retornar a mensagem "Solicitação Imprópria"
    And deve indicar o código de erro "erro-cad-1540"
    And deve indicar que o vínculo não foi encontrado para a pessoa física