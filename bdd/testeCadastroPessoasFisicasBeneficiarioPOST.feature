Feature: Cadastro de Pessoas Físicas - Beneficiário - POST
    Como um usuário do sistema SCAF Previdência
    Eu quero cadastrar beneficiários de pessoas físicas
    Para manter as informações atualizadas no sistema

    Scenario: Cadastro de beneficiário com dados obrigatórios válidos
        Given que tenho um token de autenticação válido
        And possuo dados obrigatórios válidos do beneficiário
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 200
        And a resposta contém uma mensagem de sucesso

    Scenario: Cadastro de beneficiário com PessoaFisica nulo
        Given que tenho um token de autenticação válido
        And envio dados com PessoaFisica nulo
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "PessoaFisica"

    Scenario: Cadastro de beneficiário com ContratoParticipante nulo
        Given que tenho um token de autenticação válido
        And envio dados com ContratoParticipante nulo
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "ContratoParticipante"

    Scenario: Cadastro de beneficiário com ContratoPlano nulo
        Given que tenho um token de autenticação válido
        And envio dados com ContratoPlano nulo
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "ContratoPlano"

    Scenario: Cadastro de beneficiário com Nome vazio
        Given que tenho um token de autenticação válido
        And envio dados com Nome vazio
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "Nome"

    Scenario: Cadastro de beneficiário com CPF inválido
        Given que tenho um token de autenticação válido
        And envio dados com CPF inválido
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "CPF"

    Scenario: Cadastro de beneficiário com CPF em formato incorreto
        Given que tenho um token de autenticação válido
        And envio dados com CPF contendo máscara
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "CPF"

    Scenario: Cadastro de beneficiário com data de nascimento futura
        Given que tenho um token de autenticação válido
        And envio dados com data de nascimento futura
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "DataNascimento"

    Scenario: Cadastro de beneficiário com sexo inválido
        Given que tenho um token de autenticação válido
        And envio dados com sexo diferente de M ou F
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "Sexo"

    Scenario: Cadastro de beneficiário com percentual de pecúlio maior que 100
        Given que tenho um token de autenticação válido
        And envio dados com BenefPercentualPeculio maior que 100
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "BenefPercentualPeculio"

    Scenario: Cadastro de beneficiário com percentual de pecúlio negativo
        Given que tenho um token de autenticação válido
        And envio dados com BenefPercentualPeculio negativo
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "BenefPercentualPeculio"

    Scenario: Cadastro de beneficiário com email inválido
        Given que tenho um token de autenticação válido
        And envio dados com email sem formato válido
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "Email"

    Scenario: Cadastro de beneficiário com CEP inválido
        Given que tenho um token de autenticação válido
        And envio dados com CEP muito curto
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "CEP"

    Scenario: Cadastro de beneficiário com telefone inválido
        Given que tenho um token de autenticação válido
        And envio dados com telefone muito curto
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "Telefone"

    Scenario: Cadastro de beneficiário com body vazio
        Given que tenho um token de autenticação válido
        And envio um body vazio
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"

    Scenario: Cadastro de beneficiário com todos os campos opcionais preenchidos
        Given que tenho um token de autenticação válido
        And possuo dados completos do beneficiário com todos os campos opcionais
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 200
        And a resposta contém uma mensagem de sucesso

    Scenario: Cadastro de beneficiário com data de óbito anterior ao nascimento
        Given que tenho um token de autenticação válido
        And envio dados com data de óbito anterior à data de nascimento
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "DataObito"

    Scenario: Cadastro de beneficiário com campos numéricos com valores extremos
        Given que tenho um token de autenticação válido
        And envio dados com PessoaFisica negativo
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 400
        And a resposta contém mensagem "Solicitação Imprópria"
        And o campo com erro é "PessoaFisica"

    Scenario: Cadastro de beneficiário sem token de autorização
        Given que não possuo token de autenticação
        And possuo dados válidos do beneficiário
        When faço uma requisição POST para "/Cadastro/pessoas_fisicas/beneficiario/solicitacao/atualizacao"
        Then recebo status code 401
        And a resposta contém mensagem de erro de autorização