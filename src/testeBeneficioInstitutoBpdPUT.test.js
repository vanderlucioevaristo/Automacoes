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
const obterTokenLogin = require("./obterTokenLogin");
const EscreveLog = require('./globals/escreveLog');
const PayloadChamada = require("./globals/payloadChamada");
const criptografaDados = require("./criptografaDados");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VALIA");
const entidade1 = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Beneficio";
const rotaUrl = "/Beneficio/v2/instituto/bpd";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Beneficio - Instituto - Suite de Teste API", () => {

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - ContratoParticipante nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - ContratoParticipante nulo - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = null, contratoBPDID = 433
        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', 'null/433', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        //const sinqiaRequestHeader = 'OTIsMTAyLDEzNCwyMTUsMTk2LDIwMCwxMzYsMTkyLDU2LDkwLDE0MywxMzMsMTEsMTg2LDQ1LDc2LDYzLDE0NiwxMzQsMTcyLDE0NiwyMzUsMTM4LDIxNiw1NSwxNDUsNzIsMTQ4LDE5MywxNjYsMTcyLDI1MywyNyw0MCwxOTEsMTQ5LDIxLDEwLDE1MSwxMzgsMTYyLDIwLDEyMSwzMSwyMDAsMjI0LDIxOCwyNTEsMTU2LDIwMiwyMSwxNzksMjQsMTE5LDE2OCwxMjMsNjYsMjA1LDE4MCwxNDMsMTkzLDExMywyMDQsMTY3LDQ0LDEzNyw1NywxMywxNjQsOTksMzMsMTczLDEzMiwxNDQsMjIsMTE4LDksMTQ5LDIwMCwxNDcsOTQsMjE5LDE3OCwxOTUsNDMsMTc4LDY3LDIyNiwyNDksMzEsMjMxLDEzNiwxODEsNTgsMTg1LDU3LDIzOCw5MiwyMjgsMjQ4LDMsMjE3LDE1LDQzLDMzLDIzLDkyLDIyOCwxNjMsOSwyMDcsMjQ4LDE0NCwxNjgsOTcsMTQ2LDE5Niw4NSwxMzgsMjM3LDIzLDEzNywyMDEsNjksMTEsMTEsMTYzLDE2';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "NzMsMTYsMywyMDYsMzMsMTYwLDUxLDE4OSwxNTcsMjQyLDIzLDIzNSw2NywxNDcsMTM2LDEyOCw1LDE1MSwyMTYsMTUwLDExMSw1NCwxNDMsNzEsMjM0LDUsNzUsMjA0LDU3LDgzLDEyMCwxNDksNjcsMTEwLDE1MiwxMjksMTY4LDEzNSwxOTEsMTksMTk5LDE4LDEyMywyMiwyNDUsMTIwLDk5LDExNCwyNTEsMTIyLDE1MywxMSwxNTUsMjUzLDIzNiwyNTAsMTAyLDYwLDIwNiwxMjEsMTAsMTgzLDAsMTQsMzAsMTg2LDEzMCwxNjAsNzMsMTgyLDEyNSwyMDAsMTIxLDc5LDEwMiwxOTQsMTg1LDY5LDI0Myw5NCw2OCwzOCw1OCwxMjcsNTcsMTYxLDE0MCwyMDgsMjMzLDIzLDIyMiwzMSwyMjIsMTAsMTgxLDI1LDExNSw5NywxNDYsMTU1LDE2NCw2MywzOCwxODksMTA1LDE1MiwxNTMsMTk3LDIzMSwxMDQsMTY0LDM1LDUxLDYxLDE0NiwyMDMsMTcxLDIyMywxMzAsMjE4LDIwOCwyMTYsNjMsMTA0LDksMTkwLDIyOCw1sQia4z3rAOLDHex6H2wmMjsnyXZKQyrY/+ReQp17eHZZyyNw=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
        expect(response.body.campos[0]).toHaveProperty("campo", "contratoParticipante");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Erro ao fazer requisição. Verifique os valores informados.");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - ContratoParticipante inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - ContratoParticipante inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 666, contratoBPDID = 433

        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', '666/433', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        //const sinqiaRequestHeader = 'MTExLDE1Niw2MiwxMDQsMjAyLDksMTg5LDE5OCwyMDMsNjAsMTcxLDEzMywyMTcsMTgxLDEzMCwxNzgsMjAzLDE4LDE1NCwyMiw2MCw3OSwyMzAsMTYxLDIzMCwzMSwxMTUsNDUsMTY3LDEyNCwxNTcsMTkzLDIyMCw4MywxNzEsMjEyLDEwNiwyMjIsMTU0LDExNCwxMTUsMjU1LDg2LDEsMzIsMzQsNjEsMjA2LDIzOSwxMjAsMjQsMjgsNCwxMTQsMjE0LDg3LDE5MSwxNzEsMjA0LDExNSwxODksNjUsMTIwLDMyLDEwNiwxODMsMjE0LDI0Miw0OCw5NSwxMjAsMiw5MywyNTQsMTcxLDE0MiwxNDMsMTU1LDE0OCw4MSwxMCwxODAsMTY0LDIzNiw4MywyNDIsMTE1LDEsMTczLDE2NCwxMDAsMTIwLDE4MCwyNDYsMTYwLDIyOCwxMjksMTQzLDI0MiwxNzAsOSwyMjUsNjgsMTU5LDIzLDEwMCwyMjksMTM0LDEwMywyMjgsOTMsMTk3LDE4NCwzNywxOSwxMjEsMzksMTgxLDksMjQzLDEzOSw0MCw0LDExNSwxMTAsMjExLDIxNCw4NA==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "MTEzLDUzLDkxLDE0LDE0MCwyMjQsNiw5LDE3MywyMTUsNzQsMTUwLDEsNDMsMTA0LDE5OCwxODQsMTAxLDEwMCwxNTEsMTMwLDI0Niw4NSwxNDUsMjMwLDE3LDIxOCwxNDksMTY2LDg1LDMzLDk1LDIxNywyNywzMSwyMDcsMjA3LDQ4LDEyMywxODIsMTU3LDU2LDIwNCw3MiwxNTQsMjQ5LDIyNCw5OSwxMDAsMjA3LDkxLDI0MSwxNDksMzIsMzgsMTMzLDE4MCwxNzcsMjMwLDgzLDQwLDMyLDEyOCw5NywyMTMsMzcsMTQ0LDI0MiwxMjUsODYsMTIyLDM1LDI0NiwyMjEsMTI4LDcsMTY0LDE2MSw0NywxOCw0NiwyMzIsMTUwLDExNiw0MCw1OSwxNTQsMTYwLDEzMSwxMzEsMTYzLDIyMCwyMywxNjIsMTc5LDQxLDE2NywyMjgsMjQ5LDEzMCwyMSwxMTUsMjQxLDQwLDIwOCw0OSw5NywxODAsMTIxLDEyMSwxMzQsMjI3LDE5Nyw0LDYsMjgsODUsMTIyLDExNSwyMTAsMTU3LDkwLDE3MSwxODYsMiw1MCwxMzksNzc=sQia4z3rAOLDHex6H2wmMjsnyXZKQyrY/+ReQp17eHZZyyNw=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty( "mensagem", "Solicitacao Impropria");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

       // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 321031, contratoBPDID = 666

        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', '321031/666', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        //const sinqiaRequestHeader = 'MzcsMTYsMTQyLDEwMCwyNywxNTUsOTYsMjI5LDEsMzEsNDAsNjMsMTMxLDI0NCwzNCwyMiw1MSwxODgsNywxNywyMDQsMTgsNywxOTcsMTE3LDE5NCwxNjcsMzMsMTA3LDY3LDI1NCwyMjMsMTE1LDU2LDE1MCw3MSwxODcsOTAsMTQ1LDEzNiwyNDUsMjA3LDIwMiw1OSwyNDIsMTcyLDU2LDEyLDYxLDE2OCw5NiwzNCwxMTYsMTI5LDI0MCwyMTQsOTQsNzMsMzAsOCw2OCwyMDksMTkyLDIwMSwyMiwxNzMsMTMzLDcwLDIwNywzNyw2MCwxMTUsNzUsMjA5LDEwOCwyMjcsNDgsNzksMTQ4LDExMCwyLDI0NCwwLDE5MiwyMTAsMTk3LDE3NCw4Miw2OSwxMTgsMTMyLDAsNDUsNzEsNTIsMTEwLDgwLDIzMSw3Miw0MCwxNjgsMTY1LDIwNywyMzcsMTUxLDIyLDc3LDMxLDM1LDE2NCwxNTksMzAsMTY5LDkyLDE2MSwyNDcsMjcsMTgxLDE5OSwxOTMsMTgxLDkzLDExOSwyOCwxNTAsMjE4LDIxMywxMjk=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "MTAzLDY3LDg0LDE5MywxMjAsMTk3LDE5MSwxMzMsMTA5LDIzOSw3MCw5MiwyOCw0MCwyMzgsMTM0LDEwMSw0OSwyMDUsNTEsMjE3LDI0OCw3NiwxMzcsNDgsMjEzLDExMiw0NiwxNiwxMzMsMjUwLDE3OCwxNDEsMTg5LDE2NSwxMzIsMjM2LDc5LDE1MCw1LDExMywyMzIsOTAsNzMsNjYsMjQsMTg0LDc4LDE2Myw4NSwyNywxMDksMTM2LDE4MSwxNDMsMTg0LDI2LDIwMywxNDEsMTU3LDQxLDUzLDExMSwzMCw1NCw0Myw0NywxMjQsMjQzLDkxLDM2LDEwNCwwLDE0MiwyMDMsMTIzLDE1NSwyMjYsMTI1LDExNSwyMzIsMTcxLDEzMiw0NiwxMzYsNzIsNjIsMTE5LDksNDcsMjMsNjIsOTIsNTMsMTQyLDIwOCwxMDEsMjE1LDg0LDk4LDU1LDE2OCwyMTksNTIsMTI5LDQsMjE5LDk0LDUyLDEzOCwxNyw4NSwxMjEsMjEzLDE2MCwyNDUsMywxODMsMzYsMjQyLDg3LDE5NywxMzAsNTYsNDIsMTMxLDIzLDE1NA==sQia4z3rAOLDHex6H2wmMjsnyXZKQyrY/+ReQp17eHZZyyNw=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");

    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID nulo - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

       // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 36, contratoBPDID = null
        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', '36/null', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;



        //const sinqiaRequestHeader = 'MTY3LDI1NCwxMzcsMTg4LDEyMiw5NywxNjYsOTcsMTgyLDM1LDIyMCwyMDAsMzIsMTI2LDk3LDExOSw3MSwxMjQsMTQsMTQsNTEsMTg2LDI0Nyw5NCwyMTEsMzUsMjE3LDIyMCwyNDQsMTI2LDE3Nyw4NSw1NSwyMjgsMjM5LDE1MSwyNTAsMTQwLDI0Myw5OCwxNzAsNjEsOTYsMjI0LDcyLDE0MCwxNjUsMjcsNzUsMjI1LDE5OSwxODgsMjYsMTQxLDQyLDE1OCwxNDIsMTUsOTksMjYsMTA2LDE5MCwyNTMsMTQ5LDE0OSw3NywyMjcsMTMxLDEyMywxMzQsMTgwLDMsMTksODksMTcsODAsNDMsMTA5LDUzLDE5MCwxMDcsODksMjgsNTksMTc4LDIyMiwyMjUsNywxNDMsMTAyLDE2LDE2MCwxNDcsMTk3LDYzLDI2LDEyLDY4LDEwMywxNTcsMjEwLDIwNiw5NywxNzksMzMsMTMxLDExMiw4LDI1LDIyMywxNjIsMjI5LDIzOCwxMjQsMTkzLDE4Nyw2MCw1OCwyOSwxOTAsMjQ4LDEzMCwyMiwyMjYsMTMzLDU3LDE3Myw1Mg==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "OTUsNzQsMTE1LDE2MCwyLDQzLDYzLDEsMTY1LDEzMywxNDgsNTIsMTMsMjA0LDQ3LDUxLDIyMCwxMDksMTk2LDE1NSwxNzAsMTA2LDE4LDgwLDIwNCw3LDE1NywxNTYsMTcwLDgsMTI0LDIyNiwxODYsMTA0LDU5LDQ5LDg4LDgwLDE5MywzNCwxNDUsMTY5LDUwLDc0LDEyNywxNDcsMTU1LDIzNywxMSw2OCwxMjMsMTU1LDczLDExMCwxMTYsNzksMTMzLDU0LDc2LDE5OSwxMTIsMjE4LDE4OSwxNzQsMjM4LDE5LDIxNywyNiw3MCwyMzIsODYsOTgsMTMzLDQ3LDE2MCwxMTAsOTIsMTU2LDY4LDE2MiwxNDEsMjIsNzYsMTMzLDUwLDE5Miw4MCw0NywxNTcsMiw3NiwxMjQsMTE1LDEzLDE2MCw4Miw4NCw4MywxOTYsMTE3LDExNywxOTgsNDcsMTgyLDk4LDIzNyw3NywxNDEsMTU1LDI1MiwyNDIsMTIxLDE1NSwyMTMsNiwxNzcsMjMsMTg0LDkzLDIwLDY2LDE2OSwyNDcsMTA2LDU3LDU3LDM0LDEwMg==sQia4z3rAOLDHex6H2wmMjsnyXZKQyrY/+ReQp17eHZZyyNw=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID e contratoParticipante nulos - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - contratoBPDID e contratoParticipante nulos  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = null, contratoBPDID = null
        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', 'null/null', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;


        //const sinqiaRequestHeader = 'MTgsMjE5LDEyOSwyMDksMTUyLDgzLDQzLDg0LDIwMiwxODIsMTgxLDE1NiwzNywzNCwxOTQsMjI5LDIyNCwyMjAsMywxMjksMTg2LDIxNiwyMTcsMTMxLDI0MSwyMTEsMTA1LDQ5LDEwOCwyMjEsMTA0LDEyOCwyMjIsMTEzLDI1NSwxMDksOTIsMjE0LDE2MiwyMTgsMjI0LDk4LDI0OSwyMjcsMTIxLDE4MiwyNTQsNiwxMTgsMjQ5LDE4OCwxNTEsOTIsMTc4LDU5LDE3MSw2MSwxNzIsNjgsMTk4LDk1LDE2LDI1NCw3Niw2MiwyNSwyOSwxMSw2MCwxNTUsMjM4LDcyLDIyMCw5MiwxNzQsMjQ3LDE3Niw0MSw2NCwxMzQsMTA2LDE4MywzNSwxOTIsMjE1LDI0MCwyMzQsMjEyLDIwMiwxNTYsMTY1LDc1LDEzOSwxNTQsNjEsMTAsODIsMTI3LDMyLDEzMywxODEsNzYsMTMsMTc3LDE4NiwxNjksNjUsMTYwLDIzMSwyNDUsMTU2LDM2LDE3Miw0OSwxNCw3NywxMDQsOTQsMTE3LDE0Nyw4Niw5OCw0OCwyMDAsMjA5LDExNSwxMjYsMjU1';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "MTM4LDg0LDE5NywxMzEsMTg2LDE2NCwyMiwyMjIsODgsMTA4LDE2NCwyOCwxNDAsODksMTAxLDcwLDIxMywxOSwxNDcsMTk4LDIwNyw1NywyMjYsMTIzLDExNiw2MiwzLDIyMiwyMTIsMTg3LDUzLDIzMywxMjAsMTkwLDgsMjM0LDIxMyw0NywyMzYsMTg5LDIzOSwyMzYsMTk3LDE4MiwzOSwxODcsMTI0LDIzNiwxNDAsMzksOTEsMTQ3LDIzNSwxODEsMzYsMjA1LDEyMywyMzYsMTM1LDUzLDE1Niw3OSwyMzcsMjEzLDUwLDE4OCwyMCwyNTIsNTAsMTc0LDM4LDUzLDYzLDIwNiwxMzksOTEsMTA2LDEzNiwxOTIsMTU0LDg5LDM2LDI5LDE5NywxODgsNDQsMTgxLDI3LDgwLDE3OCwxMSwxNTMsMTI3LDEyNywxMDEsNDQsMTgzLDE1NCw4MCwyMTMsODMsMjQzLDEwMSwyMzUsMTUwLDgwLDIxNywyNywxNTUsMjMyLDI0LDc0LDU1LDYsNDIsMTcyLDc4LDEzNSwxMzEsOTksMjAzLDI3LDIxNywyNDQsNTUsODgsMjUzLDI1NQ==sQia4z3rAOLDHex6H2wmMjsnyXZKQyrY/+ReQp17eHZZyyNw=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-req-0001");
        expect(response.body.campos[0]).toHaveProperty("campo", "contratoParticipante, contratoBPDID");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - com salário igual a zero - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - com salário igual a zero  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 0 }
        //sinqiaRequestHeader: contratoParticipante = 464311, contratoBPDID = 6385

        const body = JSON.stringify({
            "salario":0        
        });
        await criptografaDados('Vander', '464311/6385', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

 
        //const sinqiaRequestHeader = 'NjAsNywxMjIsNDMsNjUsMTUwLDE4NCwxMDIsNTksNDcsMjE1LDEyMiwxMDMsNDksMTQ1LDEyNiwwLDUzLDI0OCwxODksODEsNzQsMTQ2LDE2Niw1Nyw1LDEsMjM1LDY0LDQ4LDE3NywxNDYsMTY5LDM1LDI0OSw3OSw0OSwxNzMsMTQ0LDExNywyNiw5OSwxNzYsMjA3LDEzNiwxMjMsMjE5LDE1OSw1MSwxMzQsMTA3LDY0LDM1LDI0MiwxNjgsMTU4LDcxLDIzMiwyMiwyMTgsMTA0LDExOCwyNCw3MywzNiwzNiwyNTAsMTI0LDE5Miw4NywxMTMsMTgyLDUsMTk1LDEsMTg5LDg2LDEyNiwyNDksMTczLDE2NywyMiw4MiwxODMsMTMzLDc5LDg4LDk5LDk3LDE0Miw5OSwxNDYsNDMsMjI3LDE4Nyw4MywxNTQsMTI3LDEyOSw5NSw1NywyNTMsMjU1LDcyLDE0NCwyMzIsMTMsMTc4LDEyMiwyLDE0LDIyNSwyMTAsMjcsMzgsNjgsMjUzLDc0LDIwNSw3NywxNSw3NywxNTUsMTM1LDEzNiwzNSwxMzgsMjA2';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "MTAzLDEzNywzMiwxNTksNjcsMTQzLDYxLDEyMiw4NCwxMDAsMTE5LDE4NSwxMTUsMTQ4LDE3NiwxMzksMjAzLDEyNiw0OSwyMDgsMjQ0LDE3OCwxMzUsMjAxLDIyOSwyMjYsNzQsMzIsNDAsOTQsMTYwLDcwLDEzLDEwMywxNzgsMTU0LDQsMTE4LDIzNCwxNTUsOTksMjIyLDY2LDI0NywyMzQsNjEsOTgsNDMsNSwxMTgsMTg1LDE4NSw4OSwxOTIsMTQ0LDExNiwyMTYsNTksMjQwLDIxOSw1Niw5OCwyNDMsNjksMTAyLDEyLDE4NSwyNDIsMjI4LDEyOCwyMDgsMTQ2LDEyMCwxOTUsMTU2LDc3LDIxOCwxMzksOTAsMjAyLDE0MiwyNDYsMjA5LDE3NCw0NSw2Nyw1NCw5MywyMzksMTg5LDE3Nyw0OCwyMjIsNDQsMTU0LDUzLDg1LDEyOCwxMDUsMTQ4LDE3NSwxNywyMzksNTAsOTYsNDQsNDMsMjAzLDk2LDE0MCw2NCwyNDcsMjE2LDIzLDE1Myw3OSwxNzksMTMwLDE1MCwxMTksOTMsMyw3OCw4LDQ0LDIwNCwxODQsMTUzsQia4y4I62YMv30PFWcI1WUVQMg==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1035");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Payload não pode ser nulo!");

    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - com salário negativo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - com salário negativo  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": -5000 }
        //sinqiaRequestHeader: contratoParticipante = 36, contratoBPDID = 464316
        
        const body = JSON.stringify({
            "salario":-5000        
        });
        await criptografaDados('Vander', '36/464316', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;


        //const sinqiaRequestHeader = 'OCwyMTEsMTI2LDg4LDI4LDE3MywxNDksODIsNDcsMjM1LDk1LDc5LDIxMSwyNTAsNzgsMzYsMTc0LDE0NCw5OCwxOTAsMjQxLDQ3LDE5LDY4LDcyLDg1LDI0LDI1NSwxOTIsNDIsMTkyLDU2LDIyNiwxODcsMTA3LDE0OSw5Myw2MiwxMTMsNTQsODksMTI5LDMxLDE1Nyw1Niw2LDgsMTgzLDc1LDU1LDE0MywxMjAsNjAsMTEwLDMsODEsMzUsNTQsMTU1LDE1LDE2NiwxMzIsMjYsMjM2LDE0LDg1LDEwNiwyMzQsMTIwLDEzNCw4MywxMzQsMzEsNjgsMTEwLDExMCwxNDIsMTU5LDEzOSwyNDQsMzksMTY0LDI0NCwxODQsODAsMjQsOTIsMTU0LDEwMSwxOTQsMTAsNjMsMTEyLDE0MywxODgsMTUwLDE4OSwxMzksMTc5LDg3LDIsMTg5LDIyOCwyMDAsMjQxLDIyMiw3NSwxMywxNzQsMTkwLDIzNCwxODIsMzgsMjIwLDIyNiwxMjQsNjUsMjAzLDcsNjMsMTcyLDIzMSwxNjYsMTI2LDE2MiwxMzEsMTksNjg=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "NTQsMTc2LDE5LDE2NCwyNTIsMjU0LDc0LDI0NCwxMDAsMjMzLDE4NSwyMDEsNjcsMTkzLDEyNywxMjcsOTgsMTEyLDIxMiwzNyw3Niw2NSw2NiwyMzYsMjQwLDkwLDExMCw0NCwyMTcsMjUzLDIwNiw4NCwxNTQsMjMsMTI2LDIyMSw3MywyNiwxNjYsMTQ5LDczLDI0NCwyMzksMjI3LDIyOCw5Myw5LDE2MywyMiwxNjksMTU1LDE3MywyMzQsNzAsMjQ2LDIwNCwxMzQsNTMsNzEsNjcsMjQ0LDI0LDEzNCwyNTMsMTg0LDY1LDQsMjUwLDIwNCwxNjQsMTczLDE5Myw5NSw5MCw2LDEyLDE3NiwyMDMsNTAsOTQsMTExLDE0OSwxMCwyMDEsMTk4LDE4LDY3LDI0NSwxMjEsMjE2LDY2LDIwNywyMjEsMjQ0LDIwNCw5MCw1NSw0Miw0OSwyNiwyOCw0NiwxOCw3NCwzMSw5OSwyMTAsNTksMjMwLDIxOCwxMzQsOTAsMTI3LDE3MiwxNTcsMTA0LDE5NiwyOSw1MCwxMzIsMjMzLDgzLDE2MywyMiw2MCwxODksNiw2MQ==sQia4SCgNkZwVllGcCcsVq8AfOJo8abrOle4wBmZFHTbTT2g=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1035");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Payload não pode ser nulo!");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - sem informar salário - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - sem informar salário  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);       
  
        // body {}
        //sinqiaRequestHeader: contratoParticipante = 65645, contratoBPDID = 9570

        const body = JSON.stringify({}); 
        //await criptografaDados('Vander', '65645/9570','{\"salario\":5000}', entidade.publicKey);
        await criptografaDados('Vander', '65645/9570', body, entidade.publicKey);

        //const sinqiaRequestHeader = 'ODYsMTcyLDI0NywxOTcsMzUsMTExLDIzNSwxNDksMTkyLDIwMCwxNjQsNzcsMTYsMjE5LDkzLDE2MywzOCwyMjEsMjQ1LDMzLDIxMCwyMTUsMzgsOTEsMjMxLDE2Myw4NywyMDgsNiwxNDUsMjEzLDE5MCwzMywxNzksODYsNzAsMjEyLDIyNSwyMDksMTA0LDIwMCw4MSwyMjgsMTA5LDEwMCw5Niw0NSwyNCwyNSwyMDMsMjIwLDEwMSwxOTcsMTU0LDM5LDIwMiwxNDksMjM0LDgzLDEwNCwxOTAsNzcsMjQ1LDExNSwxNjgsMjQ3LDY3LDE3LDExLDE3MiwxNDAsMTg5LDI0MSwzMCwxNDksNjEsMTQ2LDIxLDIzOSwxOTIsMTQzLDE0MCwyNDgsMTExLDIyOSwxMzUsMTMwLDIzMiw2MywxNjksMTMxLDcxLDU5LDg3LDYzLDE5NSwxMjgsNzEsMTE4LDExNCw4NywxODYsNzAsMjksNTAsMTAyLDE5NCwyMzAsMjI3LDExMSw4NywxNDQsMjQ3LDE3NywyMzksMjEsMjQ2LDE0Miw5NCwyMzQsMjEzLDEwOSw2LDI1MSwzMCwyNDMsMTA4LDIwNQ==';
        const sinqiaRequestHeader = global.queryStringCripto;
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = global.bodyStringCripto;
        //corpo = "NTMsMjIxLDEzMywxNTIsNzEsMTUzLDkzLDAsMTI2LDEyNCwzNSw0MiwyMjUsMjM3LDIyMCwxMjMsMTE2LDgsOTksODUsMjAzLDEzOSw1Myw4LDE5NywxMzYsMTY0LDE2NCw0NiwxOTQsMTgzLDExMSwyNDcsMjAyLDExNyw4OSwxMSw0NSwyMzksMTU2LDI1NSwyMzksMjM5LDE4MCwyNDIsMTQsMTU0LDEsMjYsNTYsMTcyLDc4LDkyLDIwOSw4MiwxNzgsMjI3LDIxLDYxLDczLDEzNSwxNzMsNjIsNDAsMjExLDE0MywxODksMSwyMjcsMjI2LDcxLDE1OSwxNjAsMTkzLDIwMSwxMjksMjI2LDE2MiwxOTMsNDMsMTc2LDI1NCw5MSwxNzEsMTkzLDIxNCwyNDEsMTQxLDEyNCwyMzgsMjEwLDI0MCwxMjUsMjUwLDgzLDIxMCwyLDEwMCwxMzcsNDgsMTU0LDIzNiwyNTUsMTMzLDEzMSwxMjEsMzIsMTM2LDExMywxNTMsMTIzLDIsMjksMjEzLDIyNSw4MiwxMTAsMjU1LDIyOCwyLDExNywzNSwxMDUsMjUwLDE5NywyNSwxMTEsMjI0sQia4DTJzUMYlHpifrEzjNpE7Og==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitacao Impropria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1035");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Payload não pode ser nulo!");
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - Sucesso - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - Sucesso - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 458671, contratoBPDID = 16621
        const body = JSON.stringify({
            "salario":5000        
        });
        await criptografaDados('Vander', '458671/16621', body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;


       // const sinqiaRequestHeader = 'MTM4LDE3Nyw5NiwxOTUsMjksMzQsODYsMTMxLDUwLDE3LDE0OCw3NiwxMTMsNDgsMTU4LDgyLDE0NSw3OSwxMDIsNDgsNzEsMTQ0LDI1MywyNDYsMTU5LDE2MCwxNTgsMTQxLDEzNiwxMTAsMTM3LDUxLDIwNiwzNywxNTcsODUsMTI0LDg4LDIyMCw4MSwxNCwxOTMsMjUxLDk1LDE2NSwxODUsOTQsMTU5LDE5Myw4MCwxMzcsMTgyLDUyLDEyNiw2NSwyMTIsMTAxLDE0Niw0OCw5LDE5OCwyNCwyMjgsMTUyLDEyMSw5MSw2NCwwLDIwNCwyMCw2LDc4LDE2LDMxLDI0NywxNjQsNTIsMTc3LDE3MiwxMjUsMjUsMjI4LDIyOCwzNywxMTksMTIyLDY3LDE0NiwyMTUsODcsMTYsNTIsMTU3LDIwOSwxNTAsMTM4LDM1LDE2MCw5NywxMjQsNzEsMjIzLDIxNiwyMywxNzMsODEsMTYsMjAyLDIwNSwxOTcsOTcsNjUsMjMsNTQsODgsMTUsODcsNjEsMTg2LDE4OSwxNDIsMTYxLDY0LDcwLDE3MCwxMjYsMTEzLDIyMQ==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "NTksNjAsMTM1LDIzNywxMSwyMDIsMTMzLDIyNiwxMDIsNTUsMjIwLDE3NiwxNDksNDQsMjM3LDQyLDEwOCwxOTAsMTk2LDY2LDAsMTEzLDE3MCwxODIsMjYsMjUsODQsMTM3LDIyOCwxMjUsMjQ5LDEyNSwxNSwxODAsMTU0LDIzNiw5MiwxMTIsMTUzLDEyMSw5OSwzNiwzNSwxMjMsNDAsMTc3LDQxLDE1MSwxOTAsMjEsMTU5LDc4LDU4LDExLDg1LDUzLDI0MSwxMDIsNzUsNDMsMTczLDIsMjEwLDIyOSwxODksMjQzLDczLDk4LDksMjQ3LDEzNSwxOTEsMTY5LDIwMyw0MiwxNjEsMjUsNDEsMTkwLDcyLDE4MCwzNSwyNSw2OCwzNSwxNTEsMTcsODQsMTc1LDIzOSwxNTksMjgsMTM4LDY3LDI0NiwxODIsNDgsMjA2LDI0NCwxNDIsMTk4LDE1NCwxNjQsMjI0LDI0NywxMzMsNzgsMTkyLDk2LDI0OSwxMDMsMjUwLDcxLDIwMCw2NSwxNTIsMTY1LDY3LDIwMSwyMDQsODAsNTEsMTEsMTAsMjA3LDExNywxOTcsMTkwsQia4lRk/NJX+x0tytJXDvo/Bb6eWoz2SK6CO1riYwRwQosU=";
      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
    });

    it("SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - Sucesso - Status code 200 - Visão", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - Sucesso - Status code 200 - Visão";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade1.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 65645, contratoBPDID = 9570
        const body = JSON.stringify({
            "salario":5000        
        }); 
        await criptografaDados('Vander', '82398/11918',body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        //const sinqiaRequestHeader = 'MTExLDY1LDI1NCw2NiwxNzYsMTIyLDIwNSwyMjcsOTcsMCwxMDIsMTUyLDUyLDEwNCw5NCw0MSw1OSw3MCwxODQsMTA1LDg0LDExOCwxMzcsNjgsOTQsMTY2LDEzOSwxMjIsMTcyLDExMiwyMDEsMTcxLDE2MiwxMDgsMTE5LDMsMTM5LDUyLDEyLDI4LDYyLDE1OCw5MSwyMzksNjIsMTEyLDIyMiwxOTEsMTY4LDMwLDI2LDYsODMsMTQzLDIzOSwzLDE4Miw0OSw0MiwxMTgsMTUsOCwyMDIsOSwxMDIsMTAyLDEyNiwxNjYsNCw4LDEyOCwzOCwxOTcsMzcsMTQ1LDk2LDI3LDE3NSwyMTUsMTkzLDE2MSwxNTUsODAsMzgsNTAsMCw4MCwxNzUsMjE5LDI1NCwxMSwxODksODIsMTU3LDE3NCwyMTUsMTU1LDY2LDQwLDExNCwyNDcsMjE3LDE4NywxMTEsODcsMTE5LDIxMywyNDgsNzUsMjEzLDEzOSwxMzMsMTQ2LDQ5LDIxOCwyOSwxMjMsMjIsODMsMCwxMjQsNTIsNTUsMTY0LDEzNyw4NSwxNDAsMTk5';
        let headerChamadaPost = new HeaderChamadaPost(entidade1, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "MzIsMTYsOCwyMTEsMjUxLDI0OCwxNjAsNzEsMjE1LDEzLDEyMywyMDUsNCwxODMsNzIsMTI2LDEzNSwzNiwxMjIsMjI4LDE1MSwxNjEsMjQ2LDE3MywyMTYsMTUxLDEyOCwxMTksNzUsMjIyLDQ4LDI0OSwyMiw1LDE2NywxODEsMTc5LDE3NCwyMjAsMTA5LDIyMiwxNzgsMTI2LDY5LDU1LDk4LDQ1LDQ5LDE2Myw0MSw0MCwyMTcsMSwyMjgsMTQ3LDE0OCwyMjEsODMsMSwyNDIsMTAxLDIyMiwxMTAsMTAzLDI0NSwxOTEsMTMyLDE4MCw2Nyw2OSw1NywyNDUsMTk5LDIxNyw1MywxNzksMjUsNDUsMTE3LDE0Nyw4MCwxNDksMjEyLDIwMSw1LDI4LDEyMSwxNCw2LDE4NCwxMTUsMTIsMTY5LDU0LDIyNSwyMjcsMTcwLDY4LDEyNiwxODEsMTUxLDE5LDY4LDE3MywxODIsMTE0LDIzMCwxMjgsMjI2LDQwLDIwMCwxNjEsMjIyLDE4NSwxMywxMTUsMTY5LDI0LDY3LDE0NSwyMzMsMTI4LDIxMSw1OCwxODgsODUsMjI2LDY4sQia4YKjO9yNg4K4KYLGm4TxYvn6UxV7bCc5QJI95quPUIIs=";
      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
    });
    
    it("SCAF - Previdência - Beneficio - Instituto - PUT - Com solicitação Pendente  - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Beneficio - Instituto - PUT - Manutenção BPD - Com solicitação Pendente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"salario": 5000 }
        //sinqiaRequestHeader: contratoParticipante = 320913, contratoBPDID = 433
        const body = JSON.stringify({
            "salario":5000        
        }); 
        await criptografaDados('Vander', '320913/433',body, entidade.publicKey);
        const sinqiaRequestHeader = global.queryStringCripto;
        corpo = global.bodyStringCripto;

        //const sinqiaRequestHeader = 'MTM4LDE3Nyw5NiwxOTUsMjksMzQsODYsMTMxLDUwLDE3LDE0OCw3NiwxMTMsNDgsMTU4LDgyLDE0NSw3OSwxMDIsNDgsNzEsMTQ0LDI1MywyNDYsMTU5LDE2MCwxNTgsMTQxLDEzNiwxMTAsMTM3LDUxLDIwNiwzNywxNTcsODUsMTI0LDg4LDIyMCw4MSwxNCwxOTMsMjUxLDk1LDE2NSwxODUsOTQsMTU5LDE5Myw4MCwxMzcsMTgyLDUyLDEyNiw2NSwyMTIsMTAxLDE0Niw0OCw5LDE5OCwyNCwyMjgsMTUyLDEyMSw5MSw2NCwwLDIwNCwyMCw2LDc4LDE2LDMxLDI0NywxNjQsNTIsMTc3LDE3MiwxMjUsMjUsMjI4LDIyOCwzNywxMTksMTIyLDY3LDE0NiwyMTUsODcsMTYsNTIsMTU3LDIwOSwxNTAsMTM4LDM1LDE2MCw5NywxMjQsNzEsMjIzLDIxNiwyMywxNzMsODEsMTYsMjAyLDIwNSwxOTcsOTcsNjUsMjMsNTQsODgsMTUsODcsNjEsMTg2LDE4OSwxNDIsMTYxLDY0LDcwLDE3MCwxMjYsMTEzLDIyMQ==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //corpo = "NTksNjAsMTM1LDIzNywxMSwyMDIsMTMzLDIyNiwxMDIsNTUsMjIwLDE3NiwxNDksNDQsMjM3LDQyLDEwOCwxOTAsMTk2LDY2LDAsMTEzLDE3MCwxODIsMjYsMjUsODQsMTM3LDIyOCwxMjUsMjQ5LDEyNSwxNSwxODAsMTU0LDIzNiw5MiwxMTIsMTUzLDEyMSw5OSwzNiwzNSwxMjMsNDAsMTc3LDQxLDE1MSwxOTAsMjEsMTU5LDc4LDU4LDExLDg1LDUzLDI0MSwxMDIsNzUsNDMsMTczLDIsMjEwLDIyOSwxODksMjQzLDczLDk4LDksMjQ3LDEzNSwxOTEsMTY5LDIwMyw0MiwxNjEsMjUsNDEsMTkwLDcyLDE4MCwzNSwyNSw2OCwzNSwxNTEsMTcsODQsMTc1LDIzOSwxNTksMjgsMTM4LDY3LDI0NiwxODIsNDgsMjA2LDI0NCwxNDIsMTk4LDE1NCwxNjQsMjI0LDI0NywxMzMsNzgsMTkyLDk2LDI0OSwxMDMsMjUwLDcxLDIwMCw2NSwxNTIsMTY1LDY3LDIwMSwyMDQsODAsNTEsMTEsMTAsMjA3LDExNywxOTcsMTkwsQia4lRk/NJX+x0tytJXDvo/Bb6eWoz2SK6CO1riYwRwQosU=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        
        expect(response.statusCode).toBe(400);
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-proc-0001");
    });

    	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
        
    });
});