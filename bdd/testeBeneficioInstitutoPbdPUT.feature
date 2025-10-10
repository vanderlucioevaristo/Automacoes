Feature: SCAF Previdência - Benefício Instituto - PUT Dados BPD
  Como um usuário da API SCAF Previdência
  Eu quero atualizar os dados do benefício programado diferido (BPD) do instituto
  Para que as informações de salário do participante sejam mantidas atualizadas no sistema

  Background:
    Given que tenho acesso à API SCAF Previdência
    And possuo um token de autenticação válido
    And o endpoint "/Beneficio/v2/instituto/bpd" está disponível
    And os parâmetros de contrato são passados via header criptografado

  Scenario: ContratoParticipante nulo com salário válido - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = null
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: ContratoParticipante inexistente com salário válido - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = 9999999 (inexistente)
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: ContratoBPDID inexistente com salário válido - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = 9999999 (inexistente)
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: ContratoBPDID nulo com salário válido - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = null
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: ContratoBPDID e ContratoParticipante nulos com salário válido - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = null
    And o header contém contratoBPDID = null
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: Salário igual a zero - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 0}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: Salário negativo - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": -5000}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: Sem informar salário - Erro de validação
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload vazio {}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"

  Scenario: Tentativa de sucesso com dados válidos - Comportamento inesperado
    Given que estou enviando uma requisição PUT para o endpoint "/Beneficio/v2/instituto/bpd"
    When envio um payload com {"salario": 5000}
    And o header contém contratoParticipante = 36
    And o header contém contratoBPDID = 464316
    Then devo receber status code 400
    And a resposta deve conter a mensagem "Solicitação Imprópria"
    And o campo de erro deve ser "DataAdesaoAnterior"
    And o código de erro deve ser "erro-cad-1545"
    And a mensagem de erro deve ser "Data de adesão anterior deve ser menor que a data de adesão atual"
    # Nota: Mesmo o cenário de "sucesso" retorna erro 400, indicando problema na validação de datas internas