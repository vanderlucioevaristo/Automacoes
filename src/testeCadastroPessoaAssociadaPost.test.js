//Solicita a alteração dos dados bancários de uma pessoa física e retorna informações sobre o processo de alteração iniciado

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
const PayloadChamada = require("./globals/payloadChamada");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/pessoas_fisicas_associadas/solicitacao/atualizacao";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Pessoas Físicas Associadadas - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Pessoas Físicas Associadas - POST - Incluir pessoa - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas Associadas - POST - Incluir pessoa - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {   "PessoaFisica": 39,   "ContratoPlano": 254,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 1,   "FormaPagamento": 1, }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NDcsMjQ3LDIyOCwyMDksMTM3LDIyNSw0MywyMzcsMjEzLDIxMiw0MywxODEsMTQ2LDE1NSw2MSwyMDYsNjQsMjQ2LDEwOCwzNCwyMjksMjM4LDE2MywyNDgsMTQxLDQsMTg3LDg1LDI0NiwxNTUsMTc3LDIwLDE4MywyNDYsMjcsMTA0LDcxLDI0OCw4MiwxNTAsMjQsMTMzLDEzMywxNDQsMTg5LDI1LDIwOSwwLDE2OSwyMTYsMTgyLDE0MCwxMTYsNjgsNTMsNTUsOTUsMTkxLDE0MywxMjcsMTEwLDE3MSwxNTcsMzIsMTQ1LDc0LDIyNCwxNjUsMjE0LDE0NywxOCwxMjIsMjIzLDk2LDIzOCwxNDYsNTgsOCwxNTAsMTc4LDE1MiwxOTMsMTgxLDE5MywyMDAsOCwxNzMsMjQxLDIwMSwyNTMsMjA3LDc4LDE3MCwxOTgsMTQzLDExMiwzMywxMDEsMjIwLDIxLDI1MywyMjMsMTMyLDQ3LDE0Miw3NCwxNDksMTUyLDcxLDIwOCwxNTYsMjUxLDEyLDE3NiwyNTAsMjI3LDM5LDEwMSwyMzIsOTksMzUsMjAwLDcyLDExMiwyMDEsMTU2LDIyLDIxNA==sQia4ZbdD40r7MKW2Q/G2H983TsMLByC1oeJhn/srouK35IvZ97EmItfPX4soYjmH0KRPPntG/Qcks6Zi+7bXSsEgaHMVIoSRPBj6APu8oEWpWKLDcvsCFk2gwKHe/qHH/7BZ8nYthMy07X1DHjOF+1DUs+d/sAxq1gKXaWCzp1Bf3/zqvhPKNWxfOKaX+5/WoJWHACcC+/E/YjAYP18xIVqMLy//QahA95AEHozshrHjQSuxNL+dYoVv98S/4zzl1Zlogum1XgTnVN9/NgAkuKNvbA==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Processo");
        expect(response.body).toHaveProperty("ProcessoDescricao");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
        expect(response.body).toHaveProperty("Justificativa", null);
    });


	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
