Feature: SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Suite de Teste API

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu não informo filtros no header X-SINQIA-Request (header vazio)
  When eu envio uma requisição GET sem parâmetros
  Then o sistema deve retornar os dados com status code 200
  And deve retornar um objeto Data com propriedades padrão
  And deve conter NomeParticipante como null
  And deve conter CPF como null
  And deve conter PerfilEmVigor como 0
  And deve conter NomePerfilEmVigor como null
  And deve conter DataInicioVigor como null

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu informo somente perfil sem data no header X-SINQIA-Request (perfil 3 com datas null)
  When eu envio uma requisição GET
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "The request is invalid."

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu informo todos os filtros corretos no header X-SINQIA-Request (perfil 36 com período 2024-01-01 a 2025-01-01)
  When eu envio uma requisição GET
  Then o sistema deve retornar os dados com status code 200
  And deve retornar um array de dados válido
  And deve conter pelo menos um registro
  And deve incluir informações de Perfil e NomePerfil
  And deve incluir informações de Plano e DescricaoPlano
  And deve incluir RentabilidadeAcumulada
  And deve conter array RentabilidadeMes com pelo menos um item
  And cada item do RentabilidadeMes deve ter Data e Valor

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu informo datas invertidas no header X-SINQIA-Request (perfil 36 com período 2025-01-01 a 2024-01-01)
  When eu envio uma requisição GET
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve retornar um array de campos com erro
  And deve conter o código de erro "erro-res-1016"
  And deve informar "A Data inicial não pode ser maior que a data final"
  And deve indicar o campo "DataInicial" como problemático
  And deve conter valor null no campo erro

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu informo intervalo de datas maior que um ano no header X-SINQIA-Request (perfil 36 com período 2024-01-01 a 2025-12-01)
  When eu envio uma requisição GET
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve retornar um array de campos com erro
  And deve conter o código de erro "erro-res-1013"
  And deve informar "A diferença entre as datas não pode ser maior que 12 meses."
  And deve indicar o campo "DataInicial" como problemático
  And deve conter valor null no campo erro

  Given que o endpoint /Reserva/perfilinvestimento/rentabilidade está disponível
  And eu tenho um token de autenticação válido
  And eu informo perfil inexistente no header X-SINQIA-Request (mesmo parâmetro do teste anterior)
  When eu envio uma requisição GET
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve retornar um array de campos com erro
  And deve conter o código de erro "erro-res-1013"
  And deve informar "A diferença entre as datas não pode ser maior que 12 meses."
  And deve indicar o campo "DataInicial" como problemático
  And deve conter valor null no campo erro
