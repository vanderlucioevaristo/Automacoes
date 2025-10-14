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

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Dados obrigatórios válidos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Dados obrigatórios válidos - Status code 200";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11",
            "Parentesco": 1,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 20,
            "PercentualBefMorte": 10,
            "Prazo": 15
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("ProcessoDescricao","INCLUSAO_BENEFICIARIO");
        expect(response.body).toHaveProperty("Situacao",5); 
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Dados obrigatórios válidos - Status code 200 - Visão", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Dados obrigatórios válidos - Status code 200 - Visão";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade1.nome);

        // Body com dados obrigatórios válidos
        const body = JSON.stringify({
            "ContratoParticipante": 90003,
            "Nome": "CARLOS ALBERTO PAIZAN",
            "CPF": "03640819888",
            "DataNascimento": "1961-07-16",
            "Parentesco": 1,
            "Indicado": false,
            "Invalido": true,
            "PercentualPeculio": 20,
            "PercentualBefMorte": 10,
            "Prazo": 15
        });

        await criptografaDados('Vander', '', body, entidade1.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade1, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("ProcessoDescricao","INCLUSAO_BENEFICIARIO");
        expect(response.body).toHaveProperty("Situacao",5); 
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
    });


    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com PessoaFisica nulo
        const body = JSON.stringify({
            "ContratoParticipante": 666666,
            "Nome": "CARLOS ALBERTO PAIZAN",
            "CPF": "03640819888",
            "DataNascimento": "1961-07-16",
            "Parentesco": 1,
            "Indicado": false,
            "Invalido": true,
            "PercentualPeculio": 20,
            "PercentualBefMorte": 10,
            "Prazo": 15
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1516");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Pessoa Física não encontrada para o parâmetro informado");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante nulo - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com ContratoParticipante nulo
        const body = JSON.stringify({
            "ContratoParticipante": null,
            "Nome": "CARLOS ALBERTO PAIZAN",
            "CPF": "03640819888",
            "DataNascimento": "1961-07-16",
            "Parentesco": 1,
            "Indicado": false,
            "Invalido": true,
            "PercentualPeculio": 20,
            "PercentualBefMorte": 10,
            "Prazo": 15
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "ContratoParticipante");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoPlano nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoPlano nulo - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com ContratoPlano nulo
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": null,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "ContratoPlano");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Nome vazio - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Nome vazio - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com Nome vazio
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "Nome");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - CPF inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - CPF inválido - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com CPF inválido
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678900", // CPF inválido
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "CPF");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - CPF com formato incorreto - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - CPF com formato incorreto - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com CPF em formato incorreto
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "123.456.789-01", // CPF com máscara
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "CPF");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Data de nascimento futura - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Data de nascimento futura - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com data de nascimento futura
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "2030-05-15T00:00:00.000Z", // Data futura
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataNascimento");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Sexo inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Sexo inválido - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com sexo inválido
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "X", // Sexo inválido
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;
        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "Sexo");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio maior que 100 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio maior que 100 - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual maior que 100
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 150.0, // Percentual maior que 100
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio negativo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio negativo - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": -10.0, // Percentual negativo
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Email inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Email inválido - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com email inválido
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "Email": "email_invalido", // Email sem @
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "Email");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - CEP inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - CEP inválido - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com CEP inválido
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "CEP": "123", // CEP muito curto
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "CEP");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Telefone inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Telefone inválido - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com telefone inválido
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "Telefone": "123", // Telefone muito curto
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "Telefone");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Body vazio - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Body vazio - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body vazio
        const body = JSON.stringify({});

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Com todos os campos opcionais preenchidos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Com todos os campos opcionais preenchidos - Status code 200";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com todos os campos preenchidos
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "Maria Oliveira Santos",
            "NomePai": "José Oliveira",
            "NomeMae": "Ana Santos Oliveira",
            "CPF": "98765432101",
            "NumeroIdentificacaoFiscal": "12345678901",
            "DataNascimento": "1985-03-20T00:00:00.000Z",
            "DataObito": null,
            "Identidade": "123456789",
            "UFIdentidade": "SP",
            "OrgaoExpedidor": "SSP",
            "DataExpedicao": "2010-01-15T00:00:00.000Z",
            "Nacionalidade": "Brasileira",
            "Naturalidade": "São Paulo",
            "Sexo": "F",
            "EstadoCivil": "Solteira",
            "DependentesIRF": 2,
            "MolestiaGrave": false,
            "DataInicioMolestiaGrave": null,
            "DataFinalMolestiaGrave": null,
            "DataRecadastramento": "2024-01-10T00:00:00.000Z",
            "PoliticamenteExposto": false,
            "IAT": true,
            "BenefEscolaridade": 3,
            "BenefParentesco": 2,
            "BenefPercentualPeculio": 100.0,
            "BenefPercentualPeculioUnico": 50.0,
            "BenefPercentualSeguroVidaVG": 75.0,
            "BenefPercentualSeguroVidaAPC": 25.0,
            "BenefIndicado": true,
            "Ocupacao": "Engenheira",
            "NumeroINSS": 123456789,
            "DigitoINSS": 12,
            "EspecieINSS": 1,
            "DataFiliacaoInss": "2010-05-01T00:00:00.000Z",
            "ResidenteExterior": 0,
            "CEP": "01234567",
            "ZipCode": "",
            "Pais": "Brasil",
            "UF": "SP",
            "Cidade": "São Paulo",
            "Bairro": "Centro",
            "Endereco": "Rua das Flores, 123",
            "Telefone": "11987654321",
            "TelefoneComercial": "1133334444",
            "TelefoneCelular": "11999887766",
            "Email": "maria@email.com",
            "EmailPessoal": "maria.pessoal@email.com",
            "DestinoEmail": 1,
            "TipoDeficiencia": 0,
            "Prazo": 30,
            "UnidadeTempoPrazo": "DIAS",
            "ParticipanteSA": 0,
            "PepOcupacao": 0,
            "PepParentesco": 0,
            "DependenteIRF": true,
            "DescricaoTipoGrauParentesco": "Filha",
            "NomeSocial": "Maria Oliveira"
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("mensagem");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Data de óbito anterior ao nascimento - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Data de óbito anterior ao nascimento - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com data de óbito anterior ao nascimento
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "DataObito": "1985-03-20T00:00:00.000Z", // Data anterior ao nascimento
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataObito");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Campos numéricos com valores extremos - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Campos numéricos com valores extremos - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com valores extremos
        const body = JSON.stringify({
            "PessoaFisica": -1, // Valor negativo
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro");
        expect(response.body.campos[0]).toHaveProperty("campo", "PessoaFisica");
    });

    it("SCAF - Previdência - Cadastro - POST - Beneficiário - Sem token de autorização - Status code 401", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Sem token de autorização - Status code 401";
        
        // Body com dados válidos
        const body = JSON.stringify({
            "PessoaFisica": 12345,
            "ContratoParticipante": 54321,
            "ContratoPlano": 98765,
            "Nome": "João Silva Santos",
            "CPF": "12345678901",
            "DataNascimento": "1990-05-15T00:00:00.000Z",
            "Sexo": "M",
            "BenefParentesco": 1,
            "BenefPercentualPeculio": 50.0,
            "BenefIndicado": true
        });

        await criptografaDados('Vander', '', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body;

        //Assert
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("mensagem");
    });

    afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
