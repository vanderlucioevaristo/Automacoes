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
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/local";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let params;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Local - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro -  Local - Get - Paginação maior que 50 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Paginação maior que 50 - Status code 400";//expect.getState().currentTestName;
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request apenas com CPF 60031926312
        const sinqiaRequestHeader = "";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 51 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.codigo_erro).toBe("string");
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro", "erro-cad-1005");
        expect(campo).toHaveProperty("campo", "TamanhoPagina");
        expect(campo).toHaveProperty("mensagem", "Tamanho da página deve estar entre 0 e 50.");
        expect(campo).toHaveProperty("valor", null);

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Sem informar parâmetros de Filtro - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Sem informar parâmetros de Filtro - Status code 200";//expect.getState(),currentTestName;
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request apenas com CPF 60031926312
        const sinqiaRequestHeader = "";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        const campos = response.body.Data[0];
        expect(campos).toHaveProperty("Id");
        expect(campos).toHaveProperty("Nome");
        expect(campos).toHaveProperty("Bairro"); 
        expect(campos).toHaveProperty("Cidade");   
        expect(campos).toHaveProperty("Uf");
        expect(campos).toHaveProperty("Cep");         

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Somente empregador - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Somente empregador - Status code 200";//expect.getState(),currentTestName;
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request Empregador = 29
        const sinqiaRequestHeader = "NzUsODcsMTU2LDExOCwxNDgsMjAzLDIzNywyMDksMTY3LDU2LDE1MCwxOTIsMTA1LDE0Nyw3NywzMywxNTEsMTM0LDEwNywyNDcsMTU1LDIyNCwzNSwzOSw5MiwxOTUsODMsMjQzLDc4LDEyMywxMDMsMTU5LDE3Myw0MCw3NCwxNjIsMTM5LDM2LDE1NywxMjMsMTIwLDExLDgwLDIzNyw2MCwyMDQsMTI4LDQ5LDEwNSw4LDE2NSw4NSwxMTEsMjMzLDcsMTQsOTMsNjEsMTIwLDc3LDIzLDIzNywxNTIsMjIxLDIyOSwxMTMsNDEsOCwxMzYsMTM0LDIzOCw5NSwzNiwxNTksODcsMTQyLDE4LDE2MCw1MCwxNCw5NSwyMjEsMjYsMjA2LDM1LDgzLDIyMSwxOTQsMjAzLDE3MSw5MCwxMDksMTMsNzIsMTU0LDUyLDE4OCwyOSwyNiwyMDUsNjQsNDAsMTYxLDI1LDEyOSw4NywxMzcsMzksMzUsNjksMTksODQsMTE3LDIzOCw5MCwxMCw4LDE1NiwyMzcsMTQsMTA2LDEyNSwxNzMsMTc3LDIwOSwzNSwxMjYsMjE1";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        const campos = response.body.Data[0];
        expect(campos).toHaveProperty("Id");
        expect(campos).toHaveProperty("Nome");
        expect(campos).toHaveProperty("Bairro"); 
        expect(campos).toHaveProperty("Cidade");   
        expect(campos).toHaveProperty("Uf");
        expect(campos).toHaveProperty("Cep");     

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Somente o local - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Somente o local - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request Local = 234
        const sinqiaRequestHeader = "MTAwLDIzNywxNCwxMCwxOCwxOSw4NCw5LDk5LDk0LDI2LDIxOSwxMTksNDksMjQyLDE1NywyNDYsNzEsMjI5LDIyNyw1MSwyNCwxNDAsMTMyLDIxNCwyNDUsOTksMTI4LDE5MSwyNDQsMiwyMTcsMjQ0LDIwMiwxMTAsMjUxLDIyNSwyMTAsMjI5LDg1LDc3LDExMSwzMSwyMjUsOSwxNzYsMTU2LDE2OSwxMTAsMTI5LDIyMSw0OCwyMDIsNjMsMTc3LDI1NSwyMTEsMTI5LDEyLDc4LDIwMyw5LDIxLDIxLDEyMSwxNTgsNTYsMTczLDE0MywxMzcsMTg5LDYxLDQ2LDEwOSwxMTQsNjAsNDEsMTE2LDc1LDk1LDE1Myw5MSwxMDAsMjMsMTU4LDE3NCwyMzUsOTAsMTE2LDUyLDE3LDIxLDExMSwyNDYsNSwxMzAsMTI2LDEzOCw1NiwxMjUsMTksMjQ5LDI0NywyLDYzLDIxOSw3MywxMjcsMjIwLDI1MCw1MSwxNDksMTU4LDIyMywxNzAsMTYsNzQsMTAwLDE4NCw0MCwyMjYsMjUyLDExNywyNDUsNzQsMTQsMjE5LDEwMQ==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        const campos = response.body.Data[0];
        expect(campos).toHaveProperty("Id");
        expect(campos).toHaveProperty("Nome");
        expect(campos).toHaveProperty("Bairro"); 
        expect(campos).toHaveProperty("Cidade");   
        expect(campos).toHaveProperty("Uf");
        expect(campos).toHaveProperty("Cep");     
    });

    it("SCAF - Previdência - Cadastro - Local - Get - Empregador e Local - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Empregador e Local - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request Empregador = 84 Local = 234
        const sinqiaRequestHeader = "OTQsNDgsMTA2LDUyLDEwMCwyNTEsMjI2LDc0LDE1MCwyNTMsMTQ2LDEzLDIyNiwxNDMsMjE3LDE1Niw4LDIyOSw0NCwxMDcsODksMTkzLDkzLDEzNSw4NiwxNjQsNjQsMTEyLDIzMCwxOTksMjE0LDI2LDExLDcyLDEzMSwyNDYsMTg5LDEwMCw5OCwxODMsMTUwLDI0NywxOSw4MSw0NSw5MSw3Nyw5OSwyMjQsMzgsODgsMTEwLDEwNSwxMjgsMTMxLDM5LDIzNyw4MCwxNzgsMTU1LDIzNywyMDgsMjQ0LDIxNyw5OSwyMjksMTk1LDIwOSwyMDAsOTAsMTA0LDE4NCwxNzMsMTIyLDIyNywxODQsMjQ3LDgzLDExMywxNjgsMTc3LDI1MiwxOTQsNjIsNTgsMTk0LDE4Nyw3NCwyNDUsMTQ5LDE4NywxOSwxMjIsMTQsMTgwLDcwLDE0OSw0MywxOTksMTQ2LDE5NiwzNCwxNTIsMTY4LDE2MCwxMzYsMjMxLDg3LDEwMywxNjQsMTY2LDIzMSwyNDIsMTI4LDE1OCwxNjgsMTg5LDE4LDE2MSwxODUsNTEsOTMsMjIwLDk3LDIxMiw4NywyMjQsMTM3";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        const campos = response.body.Data[0];
        expect(campos).toHaveProperty("Id");
        expect(campos).toHaveProperty("Nome");
        expect(campos).toHaveProperty("Bairro"); 
        expect(campos).toHaveProperty("Cidade");   
        expect(campos).toHaveProperty("Uf");
        expect(campos).toHaveProperty("Cep");    

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Local inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Local inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request Empregador = 84 Local = 504
        const sinqiaRequestHeader = "NTIsMTE2LDQsMjA3LDI2LDEyNSwxNjYsMjE4LDk1LDE2OSw1NCwyNDAsMTkyLDQ0LDE3NCwyNDIsMTU5LDEwOCwxMjcsMTEyLDIwNiwyMDQsNzAsMTE3LDE0MywxMywxMzgsMTEyLDE1OSwyMDIsMTczLDI0NywxODksMTc5LDMzLDYsMTc3LDk2LDE0NywyMiwxOTYsMzAsMjA4LDE0OSwxMjgsMjM2LDExNiwxOTYsNjEsODMsMjE4LDIyMiwyMzUsMTQxLDExMSwxMzQsMTkwLDI1MywxODMsNDcsNTgsMTM2LDEzNiwxNiwwLDE2NCw3LDEyNywxNTIsMTE2LDEyMCwyMzAsNDAsMjE5LDExOSwzNiwyNDYsMjMsMjAxLDgxLDEwOSwxODYsMTk3LDIyNCwxNTUsMzUsMTgxLDE0NiwxMjAsNDYsMTczLDEzMSwyMTAsOTcsMTc4LDEwMiwyMDYsMTUsNzQsOTksMTkxLDY5LDE1LDcxLDM3LDIxLDU4LDIwNCwyMDEsMjQ3LDEyMiwyMDcsMjEzLDE5MywzOCw4OSwxNzUsMjEyLDE1MSwyMjcsMTQ5LDc0LDEwMiw5MywyMjQsMTA2LDEzOCw4MA==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.codigo_erro).toBe("string");
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro", "erro-cad-1529");
        expect(campo).toHaveProperty("campo", "Local");
        expect(campo).toHaveProperty("mensagem", "Local não encontrado para o parâmetro informado");
        expect(campo).toHaveProperty("valor", "504");

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Empregador inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Empregador inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request Empregador = 300 Local = 504
        const sinqiaRequestHeader = "MTI3LDIxNiwyMTIsMjA0LDEzOSwxNjMsOTUsMjIsOTcsNzEsMTk3LDE4OSw5OSw1MSwxNTIsMTYsMTk5LDE0MywxNDAsMzUsMjMyLDE4MiwxLDk3LDE3MywyMzQsMTUwLDgzLDE2MCw3MSwxMCwxNTQsMTk0LDE1MywxNDYsOTksNjUsMTk0LDYyLDE0MywxMTcsMTA4LDEwOSw1LDc1LDI0MiwxMTAsOCwxMDIsMyw5NSwzLDU3LDUsNTQsMjExLDk1LDUzLDE1OCwxMjgsMTc1LDIyMywxNTgsMTMxLDExOSwxMCwyNDQsMTU2LDEzNywyNDQsMTEwLDIwNiwxNDYsMTMwLDE5OSwxNjcsNjcsMjIwLDIyMCwxMjcsMTEwLDE5MCwxOTAsNTMsMjQ3LDY4LDI1NSw3NCw0NywxMDQsNjEsMjI1LDE5Miw2NCwxMTIsODgsMTQ1LDk4LDQzLDIzMywxMjYsMjUzLDI0OCwxNTQsMjMxLDE4MSwzOCw0NSw4Niw1OCwzNCwxMDMsMTQ4LDEwMCw5Niw3MSwwLDMyLDMsMTUsMTMsMTIwLDU3LDUyLDU0LDExLDE2NiwxMzk=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.codigo_erro).toBe("string");
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro", "erro-cad-1527");
        expect(campo).toHaveProperty("campo", "Empregador");
        expect(campo).toHaveProperty("mensagem", "Empregador não encontrado para o parâmetro informado");
        expect(campo).toHaveProperty("valor", "300");

    });

    it("SCAF - Previdência - Cadastro - Local - Get - Retorno vazio - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Local - Get - Retorno vazio - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request  Empregador = 1 Local = 234
        const sinqiaRequestHeader = "NzEsODYsOTQsMTgsMjA0LDIxMSwzLDEyLDQwLDE2NCwyOSw4MiwyNTUsMTUyLDIwOCw1Miw5NiwxMTIsNjQsMTcwLDYxLDIsMjU0LDYwLDIwOCwyMzMsMjI0LDEzNywzMCwyMywxODAsMTc0LDE4Nyw1MywyMTcsMTk0LDE1NywxOTIsMzAsMjIzLDc0LDI1NSwyMDUsMjA3LDI0NiwzNSwxNTMsMTQ5LDEwNyw3NiwxMTQsNjIsMTksMTc0LDI5LDIsMjEsMTU5LDI1MiwxNjMsNjUsMSw3NiwyMzMsOTMsODgsNjYsMTk2LDE0LDI5LDE0MywyMzksOTksMTYxLDkyLDIzNCw4MiwxNDcsNzUsODAsMTY0LDE3MywxMjAsMjI5LDY5LDEwNSwxMTQsMjQzLDE2OSwxNjYsNCwyMTYsMTk0LDIwMywzMCwyMjYsMTg3LDEzLDE4LDEyNiwyNywyOSwxMDcsMTEyLDEyNiwyMTIsMTMsMTA0LDE4NCwzMiwxMjMsMjMyLDEzMCwxMjAsMTAzLDIwOSwxMjUsMjA5LDcxLDk4LDE5NywxNzIsMTMwLDg5LDE2MiwyMTUsMjI0LDEyNw==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBe(0);
        const campo = response.body.Data[0];
    });



	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
