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

    //OK
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

    //ok
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

    //ok
    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - ContratoParticipante inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com PessoaFisica nulo
        const body = JSON.stringify({
            "ContratoParticipante": 666666,
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
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1510");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante não encontrado para o parâmetro informado");
    });

    //ok
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
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
        expect(response.body.campos[0]).toHaveProperty("campo", "ContratoParticipante");
    });

    //ok
    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - CPF Incorreto - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - CPF Incorreto - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com CPF incorreto
        const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "CARLOS ALBERTO PAIZAN",
            "CPF": "03640819881",
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
        expect(response.body.campos[0]).toHaveProperty("mensagem", "CPF inválido");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1002");
        expect(response.body.campos[0]).toHaveProperty("campo", "CPF");
    });

    //ok
    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - CPF Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - CPF Inexistente - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com Nome vazio
        const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "VANDER LUCIO EVARISTO",
            "CPF": "87656108653",
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
        expect(response.body.campos[0]).toHaveProperty("campo", "Parâmetro");
        expect(response.body.campos[0]).toHaveProperty("valor", "87656108653");
    });

    //ok
    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Data de nascimento nula - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Data de nascimento nula - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body data de nascimento nula
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": null, //Data de nascimento nula
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
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Erro ao fazer requisição. Verifique os valores informados.");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataNascimento");
    });

    //ok
    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Grau de parentesco nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Grau de parentesco nulo - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": null,
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
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Erro ao fazer requisição. Verifique os valores informados.");
        expect(response.body.campos[0]).toHaveProperty("campo", "Parentesco");
        expect(response.body.campos[0]).toHaveProperty("valor", "null");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio maior que 100% - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio maior que 100% - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual maior que 100
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 2,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 150,
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
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio negativo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio negativo - Status code 400";
        
        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 3,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": -10,
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
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio com decimal - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual Pecúlio com decimal - Status code 200";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 2,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 30.25,
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
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");

    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte maior que 100% - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte maior que 100% - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual maior que 100
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 2,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 10,
            "PercentualBefMorte": 150,
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
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte negativo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte negativo - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 3,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 45,
            "PercentualBefMorte": -30,
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
        expect(response.body.campos[0]).toHaveProperty("campo", "BenefPercentualPeculio");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte com decimal - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Percentual por morte com decimal - Status code 200";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": 2,
            "Indicado": true,
            "Invalido": false,
            "PercentualPeculio": 30,
            "PercentualBefMorte": 10.11,
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
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Body vazio - Status code 400", async () => {
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
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");

    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Somente dados da pessoa preenchidos - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Somente dados da pessoa preenchidos - Status code 400";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Body com percentual negativo
         const body = JSON.stringify({
            "ContratoParticipante": 283725,
            "Nome": "JOAO DE LOURDES MATIAS",
            "CPF": "42582180653",
            "DataNascimento": "1961-02-11", 
            "Parentesco": null,
            "Indicado": null,
            "Invalido": null,
            "PercentualPeculio": null,
            "PercentualBefMorte": null,
            "Prazo": null
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
        expect(response.body.campos[0]).toHaveProperty("campo", "beneficiarioRequest.Parentesco, beneficiarioRequest.Indicado, beneficiarioRequest.Invalido, beneficiarioRequest.PercentualPeculio, beneficiarioRequest.PercentualBefMorte, beneficiarioRequest.Prazo");
        expect(response.body.campos[0]).toHaveProperty("valor", "null, null, null, null, null, null");
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo negativo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo negativo - Status code 400";

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
            "Prazo": -10
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
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo igual a zero - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo igual a zero - Status code 400";

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
            "Prazo": 0
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
    });

    it.only("SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - POST - Beneficiário - Prazo nulo - Status code 400";

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
            "Prazo": null
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
    });

    afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
