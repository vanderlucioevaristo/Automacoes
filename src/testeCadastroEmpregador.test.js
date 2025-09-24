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
const rotaUrl = "/Cadastro/empregador";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let params;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Empregador - Plano - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - Paginação maior que 50 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - Paginação maior que 50 - Status code 400";//expect.getState().currentTestName;
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

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - Sem informar parâmetros de Filtro - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - Sem informar parâmetros de Filtro - Status code 200";//expect.getState(),currentTestName;
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
        expect(campos).toHaveProperty("NomeAbreviadoEmpresa");        

    });

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano Inexistente - Status code 400";//expect.getState(),currentTestName;
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request ContratoPlano = 6666
        const sinqiaRequestHeader = "NTMsMTYyLDE4MCw4NiwxMjEsMjQ1LDkzLDc1LDEsMTIsMTExLDIyLDEzOSwxNCw1NCw4LDcsOTcsMTc5LDIxOSw0OSw3OSwzOSwxOSwxMjcsMTcsMTg4LDE5OSwzMCwyMDIsMTUxLDEyMywxNiw4NSwxNywxMTUsMjUsMTA3LDksMjA2LDcwLDEyOSwxNzYsNSwxNzQsMjM1LDE1MiwxOTQsNDUsNDMsMTY3LDIyMywyMzgsMjAsOTIsMCw1MSwxMCwxNTksMTIwLDEyMiwxMjgsNDUsNTYsMTE0LDE0OSwyMDEsNjcsODYsMTI5LDE1NCw0NSwxOTYsOTgsMiwxMiw1OCwxNDUsNTIsMjI4LDE0NywxMjMsNzksMTMsMzAsNDYsMTk4LDksMTYzLDEyNywxMjAsNjQsMTU3LDEsMTgxLDExLDEzNiwzMCwxNTgsMjE3LDEyNywxODMsMTY2LDgsMjksMTA0LDE4NSwxOTcsMTIsNzQsMTY0LDE0MSw1OCwyMzUsMjUsMzIsMTgyLDMzLDIyMiw2MSwxNjEsMTM1LDIxNywxMzcsMTkxLDE4LDIxMywxNzI=";
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
        expect(campo).toHaveProperty("codigo_erro", "erro-cad-1044");
        expect(campo).toHaveProperty("campo", null);
        expect(campo).toHaveProperty("mensagem", "Contrato do Plano não encontrado");
        expect(campo).toHaveProperty("valor", "6666");
   

    });

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano Específico - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano Específico - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request ContratoPlano = 666
        const sinqiaRequestHeader = "NjAsMTQyLDE3MywxNDQsMTk5LDEwMCw5NiwxMDgsMTI4LDUsMjAyLDg2LDEzMywxNTEsODAsMTUxLDI0MywxNywyMDYsMTY5LDExOCw4OSwxMiw2LDE0NiwxMDAsMjUsMTEyLDU1LDE5MiwxMDcsMjIxLDQsMTYwLDIxMSwxNCwxOTIsMjIwLDEyOSwxMjcsMTc5LDIyMiwxODEsNDEsMTI3LDg0LDYwLDE1LDI5LDU2LDUzLDIwLDYwLDIwLDY1LDE5Niw4MiwzMiwxMDIsMzQsMTAyLDg2LDg1LDE1MiwxMzAsMTE4LDIyMCwxODksMTMyLDczLDU5LDE4NiwyNTAsMjUxLDE2OSw5LDI1MSwyMywyMTcsNDIsMzUsMTMzLDk3LDI2LDI0OSw0OSwxNTksNzksMTQyLDIyMCwxOTQsMTQ3LDcsMTU2LDEwNywzNSwyMzEsMTM0LDQ0LDIxMiwyMzMsMTgxLDg5LDk0LDEzNyw0NCwxODYsMTgxLDIsMjEsMjIyLDIzNSw1OCwxLDE2MSwyLDEsMTYzLDgyLDI1MCw3NSwxNTAsMTc2LDE3NSwyNDQsMjE4LDE2LDEzOA==";
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
        const campo = response.body.Data[0];
        expect(campo).toHaveProperty("Id");
        expect(campo).toHaveProperty("Nome");
        expect(campo).toHaveProperty("NomeAbreviadoEmpresa");
    });

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - Retorno vazio - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - Retorno vazio - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request ContratoPlano = 666 IdEmpregador = 36
        const sinqiaRequestHeader = "NjQsMTQ0LDEzOCwyMzcsMjksMTg2LDIyNSw5NCwxMDgsMjI5LDQyLDUzLDE5LDgwLDE5OSw2Niw4MCwxMTYsMTAwLDcwLDE0NCw5LDgxLDEyMSwyNDYsMTg2LDE5NywxMTcsMSwxNDYsMjEyLDU1LDEzOSw1NSwxODAsMTY5LDE1NywxNzMsMTA4LDI1MywxODMsMzMsMTc0LDIwLDE0NywxNTgsMjEwLDgxLDY5LDYyLDg2LDE2MSwxOTcsMTg1LDMwLDExMiwyNTUsODYsNzYsNTQsMTkyLDEyMyw4MiwxMDEsMTQ2LDY0LDE2LDIwNiw1NSwxMzksNjcsNjEsMTE5LDEwOCwxNjAsNywxODAsNjcsOTYsMTgzLDIwNSwxODksMTM5LDEzLDIzNiwxMDIsMTg2LDE2MCwyMCwxNTEsMTIzLDM1LDExLDEyMSwyNDQsMjEsMTM0LDQsMjksMTA1LDkwLDE0NSw5MSwwLDE2OCwyMyw3Myw3LDkyLDEyMCw5NSwxODksMjMyLDE3OSwxOTYsNTYsNCwyMDcsNzMsMTg1LDI3LDgwLDQsMTUwLDE4NCwxNzUsMjE4LDQ3";
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

    });

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano e IdEmpregador específicos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - ContratoPlano e IdEmpregador específicos - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request ContratoPlano = 666 IdEmpregador = 29
        const sinqiaRequestHeader = "NjAsNTEsMTYsMTI3LDE2MywxMTQsMTU5LDE3MSw3MCwyMDQsMTIzLDE3Miw0MywxOTYsMTEwLDE4NiwxNDcsNSwyNDAsMTA1LDM4LDIyMSw5NiwyNywxMDIsMjE0LDkxLDM2LDE5NiwxMzUsMjMwLDEzNywxNDksMjAxLDE5MywxNDIsMTM2LDIzMCwxMywxODYsMTI0LDE4OSwyNTMsMTIzLDI0NiwxMTQsOTAsNjIsMTczLDk3LDExMSwxMjUsMTIyLDEyNiwyNDcsMTEwLDkyLDU3LDEwLDM0LDQ3LDQyLDQxLDE5NSwxMzAsMTU0LDI0MywyNiwyNDYsMzcsMjMxLDE4MiwxMDUsMTM1LDU5LDIwOSwyMTgsMjI3LDEwMCw1OSwxMzEsMzIsMTE4LDI0Nyw1NSwxNDAsMyw3Myw3OSwyMTEsOTEsNTksMjE4LDI0NSwxMywxNzksNzcsMTgxLDYzLDE3NiwxNDAsODcsMzQsMTIsNzEsMzUsMjEyLDE1MCwyMTAsMjQxLDIxOSwxNzAsMjMzLDE5MiwxNjksMTQ0LDc4LDg5LDIxMCwxMjMsMTcyLDI0OCwyMyw0MSwxNDYsNTEsMjMsMTk3";
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
        const campo = response.body.Data[0];
        expect(campo).toHaveProperty("Id");
        expect(campo).toHaveProperty("Nome");
        expect(campo).toHaveProperty("NomeAbreviadoEmpresa");

    });

    it("SCAF - Previdência - Cadastro - Empregador - Plano - Get - Somente IdEmpregador - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Empregador - Plano - Get - Somente IdEmpregador - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request  IdEmpregador = 29
        const sinqiaRequestHeader = "NjAsNTEsMTYsMTI3LDE2MywxMTQsMTU5LDE3MSw3MCwyMDQsMTIzLDE3Miw0MywxOTYsMTEwLDE4NiwxNDcsNSwyNDAsMTA1LDM4LDIyMSw5NiwyNywxMDIsMjE0LDkxLDM2LDE5NiwxMzUsMjMwLDEzNywxNDksMjAxLDE5MywxNDIsMTM2LDIzMCwxMywxODYsMTI0LDE4OSwyNTMsMTIzLDI0NiwxMTQsOTAsNjIsMTczLDk3LDExMSwxMjUsMTIyLDEyNiwyNDcsMTEwLDkyLDU3LDEwLDM0LDQ3LDQyLDQxLDE5NSwxMzAsMTU0LDI0MywyNiwyNDYsMzcsMjMxLDE4MiwxMDUsMTM1LDU5LDIwOSwyMTgsMjI3LDEwMCw1OSwxMzEsMzIsMTE4LDI0Nyw1NSwxNDAsMyw3Myw3OSwyMTEsOTEsNTksMjE4LDI0NSwxMywxNzksNzcsMTgxLDYzLDE3NiwxNDAsODcsMzQsMTIsNzEsMzUsMjEyLDE1MCwyMTAsMjQxLDIxOSwxNzAsMjMzLDE5MiwxNjksMTQ0LDc4LDg5LDIxMCwxMjMsMTcyLDI0OCwyMyw0MSwxNDYsNTEsMjMsMTk3";
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
        const campo = response.body.Data[0];
        expect(campo).toHaveProperty("Id");
        expect(campo).toHaveProperty("Nome");
        expect(campo).toHaveProperty("NomeAbreviadoEmpresa");

    });



	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
