Feature: Cadastro de Pessoas Físicas - Beneficiário - PUT
    Como operador do sistema SCAF Previdência
    Eu quero atualizar os dados de beneficiário de uma pessoa física
    Para garantir que as informações estejam corretas e integradas

    Scenario: Atualização de beneficiário com dados obrigatórios válidos
        Given que tenho um token de autenticação válido
        And possuo dados obrigatórios válidos do beneficiário
        When faço uma requisição PUT para "/Cadastro/v2/beneficiario" com os dados:
            | Nome                     | CPF          | DataNascimento | Parentesco | Indicado | Invalido | PercentualPeculio | PercentualBefMorte | Prazo |
            | RAIMUNDO UMBERTO TEIXEIRA| 26443554604  | 1957-05-08     | 1          | true     | true     | 35                | 70                 | 20    |
        Then recebo status code 200
        And a resposta contém "ProcessoDescricao" igual a "ALTERACAO_BENEFICIARIO"
        And a resposta contém "Situacao" igual a 5
        And a resposta contém "SituacaoDescricao" igual a "Aguardando Autorização"

    Scenario: Atualização de beneficiário para pessoa inexistente
        Given que tenho um token de autenticação válido
        And envio dados de beneficiário inexistente
        When faço uma requisição PUT para "/Cadastro/v2/beneficiario" com os dados:
            | Nome                   | CPF          | DataNascimento | Parentesco | Indicado | Invalido | PercentualPeculio | PercentualBefMorte | Prazo |
            | VANDER LUCIO EVARISTO | 87656108653  | 1974-08-28     | 1          | true     | true     | 35                | 70                 | 20    |
        Then recebo status code 400
        And a resposta contém "mensagem" igual a "Solicitacao Impropria"
        And a resposta contém "mensagem" igual a "Pessoa Física não encontrada para o parâmetro informado"