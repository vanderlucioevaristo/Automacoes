// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = require("path");
const fs = require("fs");
const supertest = require("supertest");
const entidades = require("./globals/entidades");
const HeaderChamada = require("./globals/headerChamada");
const obterToken = require("./obterToken");
const EscreveLog = require('./globals/escreveLog');
const PayloadChamada = require("./globals/payloadChamada");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VALIA");
const rotaHeader = "Reserva";
const rotaUrl = "/Reserva/perfilinvestimento/rentabilidade";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

describe("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Suite de Teste API", () => {

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Sem informar Filtros - Status code 200", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Sem informar Filtros - Status code 200";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request ""
    const sinqiaRequestHeader = "" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("Data");
    expect(response.body.Data).toHaveProperty("NomeParticipante", null);
    expect(response.body.Data).toHaveProperty("CPF", null);
    expect(response.body.Data).toHaveProperty("PerfilEmVigor", 0);
    expect(response.body.Data).toHaveProperty("NomePerfilEmVigor", null);
    expect(response.body.Data).toHaveProperty("DataInicioVigor", null);
  });

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Somente perfil sem informar data - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Somente perfil sem informar data - Status code 400";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request 3/null/null
    const sinqiaRequestHeader = "NzEsMzIsODEsMTQ1LDE2LDM2LDcyLDIyNyw0LDE4NiwzNywxOTMsODcsMTMwLDIwMCwyNTUsMTczLDczLDI0OCw2NSwyNDcsMTYsMTk0LDM3LDc4LDIxMiwxMzEsMTkyLDQ0LDYwLDIzMSwxNzIsMTg2LDE1NSwwLDYzLDYwLDI1NSwxNjIsODUsMjIyLDIwMyw4Myw2OCwzMSw1NCw0NCwxMjgsMTc1LDE1NCwxNTYsNjQsOTcsMTYyLDEzMSwyMDcsMjgsNjYsODMsMTU0LDg3LDE3Niw3MCwyMDIsOTAsMjUyLDE0OCwxMzEsMjQsMTMwLDgwLDg1LDE4NiwxOTAsNTIsNDcsMTgsMTEzLDE0OCwyMSwxNzksMTkxLDIyMCwxMjgsODQsMTY5LDI0NywzMSw3MywxMTksMTA5LDczLDE0MSwyMSwxODksMjEzLDYzLDQyLDE1OCwxMTMsNDAsMjIzLDIwNSwxOTEsNjQsOTAsNjksMjI3LDM0LDIwOSwxMjcsNDAsMjAxLDI3LDE1NCwxMzUsMTA0LDE2NCw2NSwyMDIsMTEyLDc5LDk2LDY0LDE1MiwyMjYsMTg2LDE0NA==" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("Message", "The request is invalid.");
  });

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Todos os filtros corretos - Status code 200", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Todos os filtros corretos - Status code 200";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request 36/2024-01-01/2025-01-01
    const sinqiaRequestHeader = "MTMxLDE3LDIxOSw0MywxOTgsOTUsMTI0LDE4MCwxMzgsMTIwLDEwMiwyNTEsMzIsNDAsMjIsMTcxLDIwOSw0MywxMTUsMTg3LDYzLDE0NSwxMjYsMTA4LDUyLDMzLDI0LDgyLDExMiwxNDMsODUsMTQzLDk3LDAsMjI4LDIwLDU1LDIxLDIzMCwyMjgsNDAsMTA1LDYyLDc0LDEyMSwzNiwxMzQsMTYsMCwxNjYsMjI5LDEwMywyMTYsMjMwLDM0LDExMCw5OCwzOCwxMjAsMjM4LDEzOSwyMTUsMTczLDIyMiwyMCwyNDksOTMsMTE2LDQ3LDE4MywyMjcsMTg0LDE3MywxMTUsMTQ1LDIzOSwyNSwxMzYsMjI3LDIyMywzMywzNCwyMDEsMTIxLDI0OCwxMjEsNywxNjQsMTIzLDEzLDEsMTgwLDE4LDg2LDM1LDE5MSwxMjIsNDAsMzUsOTgsNiwxMjgsMTkwLDE4MCw4OSwxMjIsMTA1LDkwLDI0Nyw4NSw3MCwzMiw2NiwxODEsNjUsMTA0LDQ4LDE2LDE5NywyNiw2OCwyMzEsODIsMTA5LDE1OSwyMTIsMTc0LDI=" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        expect(response.body.Data[0]).toHaveProperty("Perfil");
        expect(response.body.Data[0]).toHaveProperty("NomePerfil");
        expect(response.body.Data[0]).toHaveProperty("Plano");
        expect(response.body.Data[0]).toHaveProperty("DescricaoPlano");
        expect(response.body.Data[0]).toHaveProperty("RentabilidadeAcumulada");
        expect(Array.isArray(response.body.Data[0].RentabilidadeMes)).toBe(true);
        expect(response.body.Data[0].RentabilidadeMes.length).toBeGreaterThan(0);
        expect(response.body.Data[0].RentabilidadeMes[0]).toHaveProperty("Data");
        expect(response.body.Data[0].RentabilidadeMes[0]).toHaveProperty("Valor");
  });

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Datas Invertidas - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Datas Invertidas - Status code 400";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request 36/2025-01-01/2024-01-01
    const sinqiaRequestHeader = "MTYyLDksMjIxLDIzOSwwLDE0NSw4MSwxOTMsMTcxLDk2LDE4OCwxMywyMzIsMTE5LDE5MywyMDQsMjA1LDIxNSwxNzYsMjM1LDIzMiwxMTQsMjcsMTA1LDI1LDIzNCw1OSwxMjksMjA4LDE5NSw0MCwxMTgsODAsMjAzLDIwNiwyNDgsNDIsMTQsMjUsMTcyLDIyNywxOTUsNzUsMTY1LDgsMzUsMTgxLDUzLDI5LDE2NiwxMTIsMTkyLDEwMSwyMzIsMjQsMjEsMjE2LDE3OCwyNDYsMTQwLDQ2LDE2MCw1MywxMDMsMTc5LDEyNSw3MywxMTQsMjIxLDkyLDcwLDE3OSwxNTQsMjA5LDE5LDI1MSwyNTIsMTAyLDIxNiw2NywyNCw5MywxMjgsMjU1LDIwNywxOTYsMjA4LDE0Niw1LDE3NSwyMDcsNTUsMjExLDEyMCwxNjYsMjM2LDE2Nyw0MiwxMjksMTQ4LDIyNCwzMiwyMjksMTUsMTA2LDIzMiw5MSw5NywyMDQsMTUsMTg5LDE1OSwxNzQsNDksNDksMjUsMTYsNjksNDQsMTMxLDI0NSw1Myw1MSwyMDgsMjI5LDEwMywyNTQsMTM=" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1016");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataInicial");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "A Data inicial não pode ser maior que a data final");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
  });

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Intervalo de Datas maior que um ano - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Intervalo de Datas maior que um ano - Status code 400";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request 36/2024-01-01/2025-12-01
    const sinqiaRequestHeader = "MTY1LDE1OCwyMCwyMjQsODksNjMsNiwyMDgsMTYzLDE5MCwyNDUsNiwyMzcsMTAsNzAsNzIsMTM0LDIzMywyMzcsMTEsMTQ2LDEwLDEzNywxOTUsMTAyLDUzLDI0NiwxOTEsMTUwLDUxLDExMywyMDUsMTcyLDE1NiwxNjUsMjE2LDE1OSwxOTcsMjU0LDc0LDIyMSwxOSwxNTksMTAwLDEwMCwxNzIsMTI5LDE4NywxMTQsMSwxMjUsMTQyLDQ4LDIyOSwxNzUsMTYxLDk3LDI5LDIwNSwyMDksMTU1LDIzMSwyMywxNDcsMTgxLDE5NCwxLDIzOCwxMDUsNjEsMTU4LDIyOCw2NCw5NywyNDksMjAsNzQsMTAxLDEwNCwyMzUsMTUwLDE0Myw2NCw5NSw3NywyMTIsMTQsMTg5LDIxNywyMDAsMTQ4LDc1LDk5LDcwLDIyMCw1OCwyMzAsMjM3LDU5LDIxOSwxNzIsMTUxLDI4LDEyOSwzOCw4NCwxNDAsMTM1LDE0NCw1MiwxMTAsMTI2LDY2LDI0OCwxMDAsMTczLDE5NCwxMzIsMjgsMTk1LDIzNiwwLDE2Miw5NywxNjMsMjQ1LDgsODc=" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1013");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataInicial");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "A diferença entre as datas não pode ser maior que 12 meses.");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
  });

  it("SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Perfil inexistente - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Reserva - Perfil Investimento - Rentabilidade - Get - Perfil inexistente - Status code 400";
     //Dados para o servidor de virtualização
     const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
     const virtualToken= "";

    //Obtem o token de autenticação para o teste.
    await obterToken(entidade.nome);

    // Montar header X-SINQIA-Request 36/2024-01-01/2025-12-01
    const sinqiaRequestHeader = "MTY1LDE1OCwyMCwyMjQsODksNjMsNiwyMDgsMTYzLDE5MCwyNDUsNiwyMzcsMTAsNzAsNzIsMTM0LDIzMywyMzcsMTEsMTQ2LDEwLDEzNywxOTUsMTAyLDUzLDI0NiwxOTEsMTUwLDUxLDExMywyMDUsMTcyLDE1NiwxNjUsMjE2LDE1OSwxOTcsMjU0LDc0LDIyMSwxOSwxNTksMTAwLDEwMCwxNzIsMTI5LDE4NywxMTQsMSwxMjUsMTQyLDQ4LDIyOSwxNzUsMTYxLDk3LDI5LDIwNSwyMDksMTU1LDIzMSwyMywxNDcsMTgxLDE5NCwxLDIzOCwxMDUsNjEsMTU4LDIyOCw2NCw5NywyNDksMjAsNzQsMTAxLDEwNCwyMzUsMTUwLDE0Myw2NCw5NSw3NywyMTIsMTQsMTg5LDIxNywyMDAsMTQ4LDc1LDk5LDcwLDIyMCw1OCwyMzAsMjM3LDU5LDIxOSwxNzIsMTUxLDI4LDEyOSwzOCw4NCwxNDAsMTM1LDE0NCw1MiwxMTAsMTI2LDY2LDI0OCwxMDAsMTczLDE5NCwxMzIsMjgsMTk1LDIzNiwwLDE2Miw5NywxNjMsMjQ1LDgsODc=" ;
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {};

    //Realiza a chamada para a API
    response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);

    global.apiResponse = response.body

    //Chamada para a ambiente de virtualização

    //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1013");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataInicial");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "A diferença entre as datas não pode ser maior que 12 meses.");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
  });

  afterEach(() => {
    EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
    global.apiResponse = null;
    global.virtualResponse = null;
    global.Bearer = "";
    descricaoTeste = "";
  });

});
