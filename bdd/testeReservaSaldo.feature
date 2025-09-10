Feature: Consulta de saldo de reserva

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho parâmetros de período criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=51
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1005"
  And deve informar que o tamanho da página deve estar entre 0 e 50

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho parâmetros de período criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=0
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1005"
  And deve informar que o tamanho da página deve estar entre 0 e 50

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho parâmetros de período criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=0
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o campo "TamanhoPagina" com erro

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho parâmetros de período válidos criptografados no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=50
  Then o sistema deve retornar os dados com status code 200
  And deve retornar um array de dados de saldo de reserva
  And deve incluir informações de Plano, NomePlano, Perfil, NomePerfil
  And deve incluir CtaSeguridade, NomeCta, ValorMoeda, QuantidadeCota
  And deve incluir QuantidadeIndice e DescricaoTipoOrigem
  And deve conter informações de paginação

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho datas invertidas criptografadas no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=999 e tamanhoPagina=10
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1016"
  And deve informar "A Data inicial não pode ser maior que a data final"

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um participanteSA inexistente criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=1
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1017"
  And deve informar "Participante ativo não encontrado para o parâmetro informado"
  And deve retornar o valor do participante e contrato plano consultado

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um contrato plano inexistente criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=50
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1017"
  And deve informar "Participante ativo não encontrado para o parâmetro informado"
  And deve retornar o valor do participante SA e contrato plano consultado

  Given que o endpoint /Reserva/saldo está disponível
  And eu não tenho um token de autenticação
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=10
  Then o sistema deve retornar um erro com status code 401
  And deve negar o acesso por falta de autorização

  Given que o endpoint /Reserva/saldo está disponível
  And eu tenho um token de autenticação válido
  And eu tenho um participante inválido criptografado no header X-SINQIA-Request
  When eu envio uma requisição GET com pagina=1 e tamanhoPagina=50
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-res-1014"
  And deve informar "Informe um ID de participante válido"
