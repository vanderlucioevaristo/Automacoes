//Solicita a inclusão/atualização dos dados de beneficiário de uma pessoa física e retorna informações sobre o processo iniciado

// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = require("path");
const fs = require("fs");
const supertest = require("supertest");
const entidades = require("./globals/entidades");
const HeaderChamadaPost = require("./globals/headerChamadaPost");
const obterToken = require("./obterToken");
const EscreveLog = require('./globals/escreveLog');
const criptografaDados = require("./criptografaDados");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VALIA");
const entidade1 = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/v2/beneficiario";
let response;
let headers;
let descricaoTeste;
let corpo;
let codigoStatusChamada;
let operador;
let payload;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Pessoas Físicas - Beneficiário - Suite de Teste API POST", () => {

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - Dados obrigatórios válidos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - Dados obrigatórios válidos - Status code 200";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "RAIMUNDO UMBERTO TEIXEIRA",
            "CPF": "26443554604",
            "DataNascimento": "1957-05-08",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": true,
            "PercentualPeculio": 35,
            "PercentualBefMorte": 70,
            "Prazo": 20
        });

        await criptografaDados('Vander', '427012/322641', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("ProcessoDescricao", "ALTERACAO_BENEFICIARIO");
        expect(response.body).toHaveProperty("Situacao",5); 
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
    });

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - Uma pessoa inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - Uma pessoa inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "VANDER LUCIO EVARISTO",
            "CPF": "87656108653",
            "DataNascimento": "1974-08-28",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": true,
            "PercentualPeculio": 35,
            "PercentualBefMorte": 70,
            "Prazo": 20
        });

        await criptografaDados('Vander', '427012/322641', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Pessoa Física não encontrada para o parâmetro informado");
    });

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - Somente com os dados da pessoa - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - Somente com os dados da pessoa - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "RAIMUNDO UMBERTO TEIXEIRA",
            "CPF": "26443554604",
            "DataNascimento": "1957-05-08",
            "Parentesco": null,
            "Indicado": null,
            "Invalido": null,
            "PercentualPeculio": null,
            "PercentualBefMorte": null,
            "Prazo": null
        });

        await criptografaDados('Vander', '427012/322641', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Erro ao fazer requisição. Verifique os valores informados.");
    });

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - Contrato Participante inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - Contrato Participante inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "RAIMUNDO UMBERTO TEIXEIRA",
            "CPF": "26443554604",
            "DataNascimento": "1957-05-08",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": true,
            "PercentualPeculio": 35,
            "PercentualBefMorte": 70,
            "Prazo": 20
        });

        await criptografaDados('Vander', '999999/322641', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante não encontrado para o parâmetro informado");
    });

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - Beneficiário inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - Beneficiário inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "RAIMUNDO UMBERTO TEIXEIRA",
            "CPF": "26443554604",
            "DataNascimento": "1957-05-08",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": true,
            "PercentualPeculio": 35,
            "PercentualBefMorte": 70,
            "Prazo": 20
        });

        await criptografaDados('Vander', '427012/99999', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Beneficiário não encontrado para o parâmetro informado");
    });

    it("SCAF - Previdência - Cadastro - PUT - Beneficiário - ContratoParticipante e Beneficiário nulos - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PUT - Beneficiário - ContratoParticipante e Beneficiário nulos - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "Nome": "RAIMUNDO UMBERTO TEIXEIRA",
            "CPF": "26443554604",
            "DataNascimento": "1957-05-08",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": true,
            "PercentualPeculio": 35,
            "PercentualBefMorte": 70,
            "Prazo": 20
        });

        await criptografaDados('Vander', 'null/null', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Erro ao fazer requisição. Verifique os valores informados.");
        expect(response.body.campos[0]).toHaveProperty("campo", "contratoParticipante, beneficiario");
    });




    afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
