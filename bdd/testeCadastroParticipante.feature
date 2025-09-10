Feature: Consulta de participante do cadastro

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  When eu envio uma requisição GET com pagina=1 e tamanho_pagina=51
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1005"
  And deve informar que o tamanho da página deve estar entre 0 e 50

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  When eu envio uma requisição GET com pagina=1 e tamanho_pagina=50
  Then o sistema deve retornar os dados com status code 200
  And deve conter informações de paginação
  And deve retornar 50 elementos na primeira página

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF válido criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante específico
  Then o sistema deve retornar os dados com status code 200
  And deve retornar os dados pessoais do participante
  And deve incluir CPF, nome, data de nascimento e documentos

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF inválido criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1002"
  And deve informar "CPF inválido"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF inexistente criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1510"
  And deve informar "Participante não encontrado para o parâmetro informado"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF válido e ContratoPlano válido criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar os dados com status code 200
  And deve retornar os dados pessoais completos do participante
  And deve incluir todas as informações de identidade e estado civil

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF válido e ContratoPlano inexistente criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1510"
  And deve informar "Participante não encontrado para o parâmetro informado"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF inválido e ContratoPlano válido criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1002"
  And deve informar "CPF inválido"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF inexistente e ContratoPlano válido criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET para consultar um participante
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1510"
  And deve informar "Participante não encontrado para o parâmetro informado"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um CPF nulo e ContratoPlano válido criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanho_pagina=50
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1002"
  And deve informar "CPF inválido"

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um participante com tempoPlano e tempoEmprego nulos no banco
  When eu envio uma requisição GET para consultar este participante
  Then o sistema deve retornar os dados com status code 200
  And os campos TempoPlano e TempoEmprego devem retornar 0

  Given que o endpoint /Cadastro/participante está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um participante com tempoPlano e tempoEmprego zerados no banco
  When eu envio uma requisição GET para consultar este participante
  Then o sistema deve retornar os dados com status code 200
  And os campos TempoPlano e TempoEmprego devem retornar 0
