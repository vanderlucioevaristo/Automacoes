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
const rotaHeader = "Cadastro";
const rotaUrl = "/v2/pessoas_fisicas/dados_bancarios";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

describe("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Suite de Teste API", () => {
    
  it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - pessoaFisicaId correto - Status code 200", async () => {
    descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - pessoaFisicaId correto - Status code 200";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PessoaFisicaID = 1
    const siqiaRequestHeader = "";
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

  });

  it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - pessoaFisicaId não existente - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - pessoaFisicaId não existente - Status code 400";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PessoaFisicaID = 1
    const siqiaRequestHeader = "";
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
    expect(response.statusCode).toBe(4);

  });

  it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - sem pessoaFisicaId  - Status code 400", async () => {
    descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancarios - Get - sem pessoaFisicaId - Status code 400";
    //Dados do servidor de virtualização
    const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
    const virutalToken ="";
    
    //Obter token de autenticação para o teste
    await obterToken(entidade.nome);

    //Montar heade X-SINQIA-Request  PessoaFisicaID = 1
    const siqiaRequestHeader = "";
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

  });


    afterEach(() => {
    EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
    global.apiResponse = null;
    global.virtualResponse = null;
    global.Bearer = "";
    descricaoTeste = "";
  });
}); 
