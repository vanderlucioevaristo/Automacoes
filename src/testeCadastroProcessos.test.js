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
const rotaUrl = "/Cadastro/processos";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Processos - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Processos - DELETE - Excluir item processo - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Processos - DELETE - Excluir item processo - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para DELETE - ItemProcessoId = 164484539 ProcessoId = 2252
        const sinqiaRequestHeader = 'MTU2LDEzMiwzNSw4LDIzMyw4MiwyNTUsMjI0LDk3LDExOSwxODcsMTU0LDE5MSwxOTAsMTU3LDE3MywxOTgsMTA2LDEwNywxNjIsODAsMTk1LDIwMiwyNTAsMTYzLDIxNSw2LDE2OSw5NiwxNDYsMTg2LDE3OSwyMjIsMTE2LDEyMywxNCw2OCwyMjgsMTc5LDkzLDU5LDY5LDk1LDExMywyMTksMzcsMTY3LDc5LDI3LDEzMywxNjAsNDAsMTY2LDkxLDI3LDE4NCwxNzAsODMsMTY0LDI0MCwxMTAsNzgsMTQyLDgsMTcxLDQ5LDM4LDE3MCw1NCwxMDcsNTIsMjgsMTk3LDE4NCwxNiwyMyw0MCw3Nyw3NCwzOSwyMSwxMTEsMTMzLDQ0LDIwMywxODYsMjQyLDQwLDE1MSwyMTIsMjUsMTEzLDM0LDE2NiwyMzYsNjIsNDgsMTA4LDQ2LDE1MCwxNTUsMjA2LDE4LDM1LDI1NCwyNDMsNzMsMjcsMTQ2LDExNywxNDksMTA0LDE4OCwxOTEsNjMsNDcsOTgsMTk3LDQxLDE5OCwyMDYsMTYyLDI0MywxMywyMCwxNzMsMzMsMzg=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .delete(rotaUrl)
            .set(headers);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.Data).toHaveProperty("Status", "Rejeitado");
    });

    it("SCAF - Previdência - Cadastro - Processos - DELETE - ItemProcessoID inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Processos - DELETE - ItemProcessoID inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para DELETE - ItemProcessoId = 164484539 ProcessoId = 2252
        const sinqiaRequestHeader = 'NjksMjgsMTgsMTU1LDE1NCwyMjYsMjEsMTM1LDE4MywxNDUsNzYsMjA4LDExMiwxMzIsMjE1LDEwMiw4MiwxLDEyOCw0NywyNDYsODksMTAyLDI0MCwxNTcsMTEsMTgsMTM0LDEyNCwxLDE2NCw2NywyMzEsMTUwLDI5LDc3LDEzOSw5MiwzNSwxNTQsMjYsNTcsMjQ2LDE3MywyMzUsMjQ5LDI0MywyMzEsOTcsMTE2LDExMCw2MiwyMzMsMTg1LDExMSwxNSwyMDQsMjMxLDEyOCw0NywyMTcsNDUsNDYsNDAsNTksOSwxMzYsNTAsMTIzLDE1OSw2OCwxODMsNzMsMTMwLDIxNiwxODcsOCwxMjgsMTczLDIzMCw4NCwxNTgsMTI2LDg4LDIxMiwyMjAsMTU2LDE2MSwxMSw5MiwyMzMsNyw4MCwyMDUsMTI0LDEyOCwxNTgsMTg0LDIyOCwzOCwyNTEsMTUzLDUsMTM4LDU0LDEyLDY4LDI5LDIyNSwyNDAsMTcsMTkzLDksMTU4LDExMCwxMzUsNDgsODcsMjMxLDczLDE5OCwxNzQsOSwxNCwyMDQsMTczLDI0NCwzMQ==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .delete(rotaUrl)
            .set(headers);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
       // expect(response.body.Data).toHaveProperty("Status", "Rejeitado");
    });

    it("SCAF - Previdência - Cadastro - Processos - DELETE - ProcessoID inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Processos - DELETE - ProcessoID inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para DELETE - ItemProcessoId = 164484540 ProcessoId = 9999
        const sinqiaRequestHeader = 'NjIsMjE2LDY1LDcyLDE2MywxMTIsMTYxLDE4MiwyMjIsMTM2LDU3LDE0NiwyNDgsMjQsMTkxLDE5MywxNDAsNTYsMTg3LDIwMSwxMDcsODAsMjI4LDIwMiwzNywxOTksMTEsMzYsMjQ4LDIzOCwxOCwxNjQsMTE4LDEwMiwxMDAsMTY5LDU0LDcyLDI0OCwyNTUsMTM0LDEwMCwxOTMsNjEsNjEsNjksNTgsNywyMjMsMjI0LDE1OSwxMDIsMjgsNjIsNjUsMTM5LDIwNyw5LDE3Miw1OCw1OCw2NiwyNDEsMTIwLDEwLDIzOSwxNDQsNzEsMjA3LDIzMSwxMCwxMzAsMTk4LDE4NSwxNzMsMTQ0LDE0Myw2LDMyLDE1MSwyMTUsMTc2LDEyNyw2NiwxMjEsMTExLDI0LDIyOCwyMjksNjEsMjA2LDIwLDEsMTg1LDkyLDIwOSwxNTksMTgyLDE5NSw0LDE2OSwxNzQsMjUwLDE2NCwxMCwxNDAsMTk1LDIxMCwxNTIsMTkyLDAsMTY0LDc0LDE1Miw1NiwyOCw1OCw1NSwxOTEsNTcsMjE1LDIyOSwxOTEsMjM3LDE2OCw1MCw4OCw5Ng==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .delete(rotaUrl)
            .set(headers);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
       // expect(response.body.Data).toHaveProperty("Status", "Rejeitado");
    });

    it("SCAF - Previdência - Cadastro - Processos - DELETE - ItemProcessoId Nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Processos - DELETE - ItemProcessoId Nulo - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para DELETE - ItemProcessoId = null ProcessoId = 2145
        const sinqiaRequestHeader = 'MjgsMjIwLDE4Miw5MiwxNjMsMTQzLDcxLDM0LDU3LDMxLDEsMTYwLDE5NSw3MywxNDYsMjQxLDYsODUsMjI3LDk4LDE0OSwxOTMsNTQsMTM4LDIyMiwyNyw0LDE1NiwyMzYsMjU1LDIxMiwxNTMsMjA4LDE0MCwxOTYsMTQsMTU5LDE5MCwyMTksMjA2LDY1LDUyLDIwMCwyMjUsMTEwLDE3LDE4MywxNzgsMTU1LDgsMjYsMjA2LDExNSwyMzksOTUsOTIsODksMTU4LDE5OSw1OSwzOSw2OCwxMTEsNDMsMTExLDE4NCwyMDUsNywxMTcsMTgyLDk1LDIzMSwyMzcsNywxMTgsMTM3LDEyOSwyMzMsMjQ5LDEwMywyMTksOTksMTMsMTQ4LDEwMCwxNjUsMjM2LDE2OCwyMjYsMTM2LDk0LDQ5LDU5LDI0MCwxNzMsMjU1LDIyMywyMDAsNDcsMjI4LDIxMCwxMTksMTg0LDEzMywxNTksODYsNjYsMTk3LDcsNzAsNSwxODMsMjU0LDEzMSw2NCwxMDEsMTk0LDE1OCwxNTAsMzIsMjI0LDM0LDE5NSw3Nyw3NSwxNjQsOSwxODc=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .delete(rotaUrl)
            .set(headers);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
       // expect(response.body.Data).toHaveProperty("Status", "Rejeitado");
    });

    it("SCAF - Previdência - Cadastro - Processos - DELETE - ProcessoId Nulo - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Processos - DELETE - ProcessoId Nulo - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para DELETE - ItemProcessoId = 164483187 ProcessoId = null

        const sinqiaRequestHeader = 'MTQzLDIxNiwzNSwxMTgsMjMzLDEzMSwxNzYsMTE4LDEzMywxNjMsMTYzLDI4LDExNywyNSwyNDMsMjQ5LDIyMSw5MiwxNjEsMjIwLDUwLDExMSwxMTIsMjQxLDIzOSw4NCwyMDMsOTIsMTIsMTMxLDExMCw4Nyw3LDE3MiwxNzEsMTI0LDI0MCw4OSw0Miw4NywxMTMsODMsMTcwLDEyMCwxODksMzUsNzksMTg5LDIyMCwxMzAsMzcsMTY0LDEwOSw3NiwyMjksMTQyLDE2NCwxNTMsMzksNDUsMjAwLDIyMywxNDIsMTI2LDE3NiwxMyw2NSwxNDksMTUwLDcsMzMsNTEsMTgzLDMxLDEwOSwxMzEsMTIyLDE5NCwxMjEsMTIyLDEyOCwyMjQsMjQ3LDExMCwxNjMsMjExLDY1LDYwLDIyNywyNCwxODQsOTUsMjEsMTM0LDk5LDE3NCwxMiwyNyw3MSw4OCwxMTMsMjksMjI5LDE1NiwxNTAsMTY2LDg3LDE1NiwyMzksMTI3LDIxMyw4NSwyMjcsOTAsODAsOCwyMSwxMzUsNDUsNDQsMjQ1LDI0LDE1MiwyMzcsMCwyMDIsOTUsODA=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

      
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .delete(rotaUrl)
            .set(headers);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
       // expect(response.body.Data).toHaveProperty("Status", "Rejeitado");
    });

	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
