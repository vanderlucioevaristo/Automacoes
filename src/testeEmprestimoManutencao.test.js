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
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Emprestimo";
const rotaUrl = "/Emprestimo/v2/manutencaocontrato/listarboleto";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

describe("SCAF - Previdência - Empréstimo - Manutenção - Suite de Teste API", () => {

  it("SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - Todos os dados corretos retorno vazio - Status code 200", async () => {
    descricaoTeste = "SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - Todos os dados corretos retorno vazio - Status code 200";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PlanoSA = 1 Cpf = 19698969810
    const siqiaRequestHeader = "MTY0LDIzNCwyMDQsMTEwLDE3MCw2NCw5NywxOTksNDIsMjQ4LDI1LDExMywyNTQsNzMsMTMxLDIxNywxNSwyMjcsMTE0LDQ5LDg3LDE2MywwLDE3NywxMjEsMTI4LDE5NiwxOTIsNDYsNzEsODIsMjQwLDE2OCw3MiwxNTUsNDgsMTY0LDQwLDg3LDIsMjI0LDkwLDE3NSwzNSw4MCwxMTUsMTQxLDEwMywyNDUsMTM4LDE2NywyMTksMzIsMjUzLDMwLDE0MCwyMywyLDkyLDE0OSw0NCw5Myw3NCw2NCwxNjQsMTg0LDI2LDI0MCwyMzYsMzQsMjQ5LDE0NSwzNSwxODgsMTI0LDE4LDksMjUsOTIsMTUwLDIwMiwxNTAsOTIsOTYsOTIsMTM5LDE4Niw5NywxMDUsMjU0LDI4LDY2LDE5MiwyMSw2OCwxOTMsMTAsNjMsMTQ4LDEwOCwxNjEsMjI5LDE1MCwxNDYsMTg3LDE1MywxMDksMTI2LDc3LDk0LDkzLDE4OCwxMTksMTQyLDQ5LDE2NiwyMTIsMjQ2LDE1Niw0NCw3OCw4NSwyNDEsNjksMjE2LDIwNywxNDksMTEz";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, siqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {}

    //Realiza a chamada para a API
    response =  await supertest(global.baseUrl)
    .get(rotaUrl)
    .set(headers);

    global.apiResponse = response.body;

    //Assert
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.Data)).toBe(true);
    expect(response.body.Data.length).toBe(0);

  });

  it("SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - CPF Inexistente - Status code 200", async () => {
    descricaoTeste = "SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - Todos os dados corretos retorno vazio - Status code 200";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PlanoSA = 1 Cpf = 87656108653
    const siqiaRequestHeader = "NjgsMjM0LDE3Niw3NSwxMzcsMTkzLDEyNiw4NiwxNTgsNywyMTMsMjIzLDExMSwxMjAsMTUxLDI0LDIxOSw3OCwyMTAsMTU2LDE1MCwxNzMsNjQsMzcsMTg1LDEzNSwxOTcsMTQ5LDQwLDYwLDIzMywxMzMsMTAxLDEsMTYzLDUzLDE4NywyMjEsMjQ4LDIyOSw3NiwyNDMsMTgwLDEzNiwxNjcsMTg0LDkxLDU3LDI0NSw1Miw2OCw3MCwxODUsMTM4LDE5MywxODMsNTYsMzEsMTk0LDEyMiwyMDEsMTEyLDE4MiwyMTQsMTM5LDc5LDEwLDE3NCw1Myw0Niw4MywyMCwxMzEsMTYwLDEyMiwxMTMsODUsMTk1LDEwMCw0LDI1MiwxMjMsMjEwLDIzOSwxODAsNTUsMjMyLDYxLDIyNiw4MCwxMDMsMTk3LDc1LDY5LDEyMSwxNTksMjQ2LDIwNywxODIsMTI5LDExNiwxMzUsMTAxLDE1MiwxMTEsMjI0LDEyLDIxOCw2OCwyMzgsMjEzLDYsMjM1LDE3OSwxNDUsMTg2LDE0NCw0MywxMjIsMCwzLDI1NSwxMSwyNDcsNjUsMTQ3LDE5MiwzOQ==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, siqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {}

    //Realiza a chamada para a API
    response =  await supertest(global.baseUrl)
    .get(rotaUrl)
    .set(headers);

    global.apiResponse = response.body;

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
    expect(response.body.campos[0]).toHaveProperty( "codigo_erro", "erro-emp-1030");
    expect(response.body.campos[0]).toHaveProperty( "campo", null);
    expect(response.body.campos[0]).toHaveProperty( "mensagem", "Plano não encontrado para o Participante");
    expect(response.body.campos[0]).toHaveProperty( "valor", null);

  });

  it("SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - CPF Incorreto - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - CPF Incorreto - Status code 400";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PlanoSA = 1 Cpf = 87656108654
    const siqiaRequestHeader = "MTE2LDI1LDQ2LDExNSwxMDYsMzIsOCwxMzMsMTQ1LDEyLDczLDI1MywxOTUsMTA1LDU0LDE3NiwxLDE2MywyNTQsMjQwLDE3NCwyMzIsOCwxMzEsMzYsMjE3LDQ4LDExNCw0MSw4Nyw4MCw2NiwyMTcsMTksMTEwLDMwLDEzNiwyMjYsMjM4LDYzLDE4Nyw1LDMxLDE1LDEyNywyMSwxMzYsNzYsNDYsMjM0LDE0MCwxMTQsMjI5LDI0LDcyLDIzMiwzMywxNjksMTI0LDIxOCw1OSwyMzEsMjMsMjAyLDExNiw1MCwxNzcsNjQsNiwxMDAsNzcsMTkzLDExLDIwMiwzMCwxMDksMzcsMjQ3LDE3NSwxNzYsMjEyLDI0OSw0OSw1MCwyNDYsMzYsODEsNzgsMTAwLDEzNSw2NSwxNCwxNzUsNCw1MSwxNzYsMTE2LDgzLDUyLDE1OCwyMjUsNjgsNDYsMTUzLDE3MCwyMzQsMTU3LDEyMywxOTgsMTI5LDIwOSwxNTksMjM2LDEwOCw1MCw5OCwxNzEsMjM0LDI1LDE3NiwxMDksMTc4LDI1Miw0Myw2NCwxMDksMjIyLDEz";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, siqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {}

    //Realiza a chamada para a API
    response =  await supertest(global.baseUrl)
    .get(rotaUrl)
    .set(headers);

    global.apiResponse = response.body;

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
    expect(response.body.campos[0]).toHaveProperty( "codigo_erro", "erro-cad-1002");
    expect(response.body.campos[0]).toHaveProperty( "campo", "CPF");
    expect(response.body.campos[0]).toHaveProperty( "mensagem", "CPF inválido");
    expect(response.body.campos[0]).toHaveProperty( "valor", "87656108654");

  });

  it("SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - PlanoSa Inexistente - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - PlanoSa Inexistente - Status code 400";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PlanoSA = 9999 Cpf = 19698969810
    const siqiaRequestHeader = "OTMsMjI0LDIyMiwxNjUsMTE4LDE1NSwxMzQsNDksNDIsOTUsMTAyLDY1LDIwNCw2OSw3NSwyNSwxMTcsMTIzLDIyMywxNjUsNTcsMTE5LDE5NiwxMiw5LDE3MiwxMDMsMjksOTMsMTYwLDE5LDI0NiwxNjEsMTUyLDE0LDE0OCwxMzUsMjIyLDIzMiw3OCwxMDQsMzMsOTksMTU3LDExMSw2NSwzOSwxOTEsNDgsMjQwLDc1LDQ2LDEwMSwxNTcsMzksMjIsMTQxLDE5MiwyNTUsMTEyLDIwNCwxNzYsMTIwLDE0OCw4MywxNCw5NSwyNDYsMjU0LDE3MiwzNywzNywyNTAsMTM5LDE1NCw5NCwxOTYsMzYsMTIxLDI0MiwxODcsMTczLDI0OCwxODUsNDUsMjIxLDIxMSw1OSwxNzEsMTc4LDI2LDEzOSwzMyw3LDExNiwxOTgsNDIsMTI2LDExOSw5MCwxMjgsMTgxLDEyOSwyNDUsNDgsMTQzLDIxOCwyNDAsMjksNTksOTYsMTg4LDE0MCwxNTIsNDIsMTM3LDg3LDE3NiwzMSwxMzEsMjE1LDg1LDE3NCw5MSwyNDEsMjIsMjAsMjUx";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, siqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {}

    //Realiza a chamada para a API
    response =  await supertest(global.baseUrl)
    .get(rotaUrl)
    .set(headers);

    global.apiResponse = response.body;

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
    expect(response.body.campos[0]).toHaveProperty( "codigo_erro", "erro-emp-1030");
    expect(response.body.campos[0]).toHaveProperty( "campo", null);
    expect(response.body.campos[0]).toHaveProperty( "mensagem", "Plano não encontrado para o Participante");
    expect(response.body.campos[0]).toHaveProperty( "valor", null);

  });

  it("SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - Com parÂmetros nulos - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Empréstimo - Manutenção - Listar Boleto Get - Com parÂmetros nulos - Status code 400";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PlanoSA = null Cpf = null
    const siqiaRequestHeader = "OCw2MywxMzIsMTUyLDI1MSwxMiwxODUsMTI3LDcsMTI5LDIxMSw3LDE4NCw5OCw1MSw5OSwxMDUsMTA2LDEzMCw0NCwyNCwyMzgsMjE5LDE4MywxNTQsMjcsOSw1MSwxOTMsMjQ4LDE2NywxMTksOTEsMTM4LDIzMCw3Myw4LDE2Myw1MywyMzAsMTc2LDE4MywxNTEsMjA4LDYxLDg2LDgwLDQ3LDE0MSw1LDUyLDE2MiwxODUsMjE4LDIzMSw4NywxNTcsMjIxLDM2LDEzNSw0OCwxNjgsNjksMTY1LDIxNiwxODIsMTM1LDI0MiwyMTYsMTEyLDIxNSw1NCwyMTUsOTQsMTI3LDE5MSw2NSwxNzUsMjU1LDQzLDIwOSw1OCwxOTYsNTAsMjYsMjQ4LDg3LDE0NiwxNDIsMTU5LDIxNCwyMiw4OSwxMTIsMTI3LDEyNywxMzcsMTg2LDE4OCw5Myw2LDE0Nyw2NCw5NSwxMjUsMSwyMDQsMTA1LDIyNiwxMjMsMTc2LDIwLDU5LDI3LDIzNiwxODYsMjIxLDE0OSwyMTYsOTAsMjM0LDIsMTM0LDE4LDk2LDE2NCw5Nyw4Nw==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, siqiaRequestHeader);
    headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;
    params = {}

    //Realiza a chamada para a API
    response =  await supertest(global.baseUrl)
    .get(rotaUrl)
    .set(headers);

    global.apiResponse = response.body;

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("Message", "The request is invalid.");

  });

    afterEach(() => {
    EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
    global.apiResponse = null;
    global.virtualResponse = null;
    global.Bearer = "";
    descricaoTeste = "";
  });
}); 
